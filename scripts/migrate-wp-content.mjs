#!/usr/bin/env node
/**
 * WordPress content migration for ozwell.ai → ozwell-frontdoor.
 *
 * Pulls posts, docs (BetterDocs CPT), doc categories, post categories, tags,
 * and authors from the live WP REST API. Writes JSON into src/data/generated/
 * and downloads every referenced wp-content image into public/images/wp/.
 *
 * URL modernization:
 *   /2025/02/11/slug/  →  /blog/slug/
 *   /docs/slug/        →  /docs/slug/   (unchanged)
 *
 * Usage: node scripts/migrate-wp-content.mjs
 */

import { mkdirSync, writeFileSync, existsSync, createWriteStream } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WP = 'https://ozwell.ai/wp-json/wp/v2'
const OUT_DATA = join(ROOT, 'src/data/generated')
const OUT_IMG = join(ROOT, 'public/images/wp')

mkdirSync(OUT_DATA, { recursive: true })
mkdirSync(OUT_IMG, { recursive: true })

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

async function fetchAll(path, params = '') {
  const out = []
  for (let page = 1; ; page++) {
    const batch = await fetchJson(`${WP}/${path}?per_page=100&page=${page}${params}`).catch(
      () => []
    )
    if (!Array.isArray(batch) || batch.length === 0) break
    out.push(...batch)
    if (batch.length < 100) break
  }
  return out
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) return resolve('cached')
    // Encode any raw Unicode characters (e.g. U+202F) left in the URL path
    const safe = encodeURI(url)
    https
      .get(safe, (res) => {
        if (res.statusCode !== 200) return reject(new Error(`${res.statusCode} ${safe}`))
        const f = createWriteStream(dest)
        res.pipe(f)
        f.on('finish', () => f.close(resolve))
      })
      .on('error', reject)
  })
}

/** Rewrite wp-content image URLs to local paths; collect downloads. */
const imageQueue = new Map()
function localizeImages(html) {
  if (!html) return html
  // Note: filenames may contain U+202F (narrow no-break space) from macOS
  // screenshots — only treat ASCII whitespace and delimiters as terminators.
  return html.replace(
    /https:\/\/ozwell\.ai\/wp-content\/uploads\/([^ \t\n\r"'<>)]+)/g,
    (m, rel) => {
      const clean = rel.split('?')[0]
      const name = decodeURIComponent(clean)
        .replace(/\//g, '-')
        .replace(/[\u202F\u00A0]/g, '_')
      imageQueue.set(m.split('?')[0], name)
      return `/images/wp/${name}`
    }
  )
}

/** Modernize internal links: date-based post URLs → /blog/slug/, strip domain. */
function modernizeLinks(html) {
  if (!html) return html
  return (
    html
      .replace(/https:\/\/ozwell\.ai\/20\d{2}\/\d{2}\/\d{2}\/([^/"']+)\/?/g, '/blog/$1/')
      .replace(/https:\/\/ozwell\.ai\/(docs|docs-category|about-us|blog)\/?/g, '/$1/')
      // The app moved off the legacy BlueHive host. Rewrite anchors only (href and
      // the visible label, including redirect params) — API endpoints in code
      // samples are left exactly as authored.
      .replace(/<a\b[^>]*>.*?<\/a>/gs, (a) => a.replace(/ai\.bluehive\.com/g, 'app.ozwell.ai'))
  )
}

function clean(html) {
  return modernizeLinks(localizeImages(html))
}

/** Decode common HTML entities for plain-text fields (titles, excerpts). */
function decodeEntities(text) {
  if (!text) return text
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201d')
    .replace(/&ldquo;/g, '\u201c')
}

const posts = await fetchAll('posts', '&_embed')
const docs = await fetchAll('docs', '&_embed')
const docCats = await fetchAll('doc_category')
const cats = await fetchAll('categories')
const tags = await fetchAll('tags')
const users = await fetchAll('users')

const postsOut = posts.map((p) => ({
  id: p.id,
  slug: p.slug,
  date: p.date,
  modified: p.modified,
  title: decodeEntities(p.title.rendered),
  excerpt: decodeEntities(
    p.excerpt.rendered
      .replace(/<[^>]+>/g, '')
      .replace(/&hellip;.*$/s, '…')
      .trim()
  ),
  content: clean(p.content.rendered),
  author: p._embedded?.author?.[0]?.slug ?? null,
  authorName: p._embedded?.author?.[0]?.name ?? null,
  categories: (p._embedded?.['wp:term']?.[0] ?? []).map((t) => t.slug),
  tags: (p._embedded?.['wp:term']?.[1] ?? []).map((t) => t.slug),
  featuredImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url
    ? clean(p._embedded['wp:featuredmedia'][0].source_url)
    : null,
  featuredImageAlt: p._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? '',
  wpUrl: p.link,
}))

const docsOut = docs.map((d) => ({
  id: d.id,
  slug: d.slug,
  date: d.date,
  modified: d.modified,
  title: decodeEntities(d.title.rendered),
  content: clean(d.content.rendered),
  categories: (d.doc_category ?? [])
    .map((id) => docCats.find((c) => c.id === id)?.slug)
    .filter(Boolean),
  wpUrl: d.link,
}))

const docCatsOut = docCats.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  description: c.description,
  count: c.count,
}))
const catsOut = cats.map((c) => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  description: c.description,
  count: c.count,
}))
const tagsOut = tags.map((t) => ({ id: t.id, slug: t.slug, name: t.name, count: t.count }))
const usersOut = users.map((u) => ({
  id: u.id,
  slug: u.slug,
  name: u.name,
  description: u.description,
  avatar: u.avatar_urls?.['96'] ?? null,
}))

writeFileSync(join(OUT_DATA, 'posts.json'), JSON.stringify(postsOut, null, 2))
writeFileSync(join(OUT_DATA, 'docs.json'), JSON.stringify(docsOut, null, 2))
writeFileSync(join(OUT_DATA, 'doc-categories.json'), JSON.stringify(docCatsOut, null, 2))
writeFileSync(join(OUT_DATA, 'categories.json'), JSON.stringify(catsOut, null, 2))
writeFileSync(join(OUT_DATA, 'tags.json'), JSON.stringify(tagsOut, null, 2))
writeFileSync(join(OUT_DATA, 'authors.json'), JSON.stringify(usersOut, null, 2))

console.log(
  `posts: ${postsOut.length}, docs: ${docsOut.length}, docCats: ${docCatsOut.length}, cats: ${catsOut.length}, tags: ${tagsOut.length}, authors: ${usersOut.length}`
)

let ok = 0,
  fail = 0
for (const [url, name] of imageQueue) {
  try {
    await download(url, join(OUT_IMG, name))
    ok++
  } catch (e) {
    console.warn(`image failed: ${url} (${e.message})`)
    fail++
  }
}
console.log(`images: ${ok} downloaded/cached, ${fail} failed`)
