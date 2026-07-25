import postsJson from '@/data/generated/posts.json'
import docsJson from '@/data/generated/docs.json'
import docCategoriesJson from '@/data/generated/doc-categories.json'
import categoriesJson from '@/data/generated/categories.json'
import authorsJson from '@/data/generated/authors.json'

export interface Post {
  id: number
  slug: string
  date: string
  modified: string
  title: string
  excerpt: string
  content: string
  author: string | null
  authorName: string | null
  categories: string[]
  tags: string[]
  featuredImage: string | null
  featuredImageAlt: string
  wpUrl: string
}

export interface Doc {
  id: number
  slug: string
  date: string
  modified: string
  title: string
  content: string
  categories: string[]
  wpUrl: string
}

export interface Term {
  id: number
  slug: string
  name: string
  description: string
  count: number
}

export interface Author {
  id: number
  slug: string
  name: string
  description: string
  avatar: string | null
}

/**
 * Display names for authors whose WordPress profile never had one set, so the migration carried the
 * login through to the byline. The durable fix is setting the display name in WordPress and
 * re-running `pnpm migrate:wp`; until then these keep usernames off the site.
 */
const AUTHOR_DISPLAY_NAMES: Record<string, string> = {
  wreiske: 'William Reiske',
}

function displayName(slug: string | null, name: string | null): string | null {
  if (slug && AUTHOR_DISPLAY_NAMES[slug]) return AUTHOR_DISPLAY_NAMES[slug]
  return name
}

/** All posts, newest first. */
export const posts: Post[] = (postsJson as Post[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((p) => ({ ...p, authorName: displayName(p.author, p.authorName) }))

/** All help-center docs, alphabetical. */
export const docs: Doc[] = (docsJson as Doc[])
  .slice()
  .sort((a, b) => a.title.localeCompare(b.title))

/** Doc categories that actually contain published docs. */
export const docCategories: Term[] = (docCategoriesJson as Term[])
  .filter((c) => docs.some((d) => d.categories.includes(c.slug)))
  .sort((a, b) => a.name.localeCompare(b.name))

/** Blog categories with at least one post. */
export const categories: Term[] = (categoriesJson as Term[]).filter((c) => c.count > 0)

export const authors: Author[] = (authorsJson as Author[]).map((a) => ({
  ...a,
  name: displayName(a.slug, a.name) ?? a.name,
}))

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getDoc(slug: string): Doc | undefined {
  return docs.find((d) => d.slug === slug)
}

export function getDocCategory(slug: string): Term | undefined {
  return docCategories.find((c) => c.slug === slug)
}

export function getDocsInCategory(slug: string): Doc[] {
  return docs.filter((d) => d.categories.includes(slug))
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  return posts.filter((p) => p.slug !== slug).slice(0, limit)
}

export function getAuthor(slug: string | null): Author | undefined {
  if (!slug) return undefined
  return authors.find((a) => a.slug === slug)
}

/** Previous (older) and next (newer) posts for sequential navigation. */
export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { previous: null, next: null }
  return {
    // posts are newest-first: next index = older post
    previous: posts[idx + 1] ?? null,
    next: posts[idx - 1] ?? null,
  }
}

export function wordCount(html: string): number {
  return stripHtml(html).split(/\s+/).filter(Boolean).length
}

/** Estimated reading time in minutes (225 wpm, matching bluehive.com). */
export function readingTime(html: string): number {
  return Math.max(1, Math.round(wordCount(html) / 225))
}

/** Strip HTML tags for plain-text needs (descriptions). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** First ~155 chars of a post/doc body for meta descriptions. */
export function metaDescription(html: string): string {
  const text = stripHtml(html)
  return text.length > 155 ? `${text.slice(0, 152)}…` : text
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
