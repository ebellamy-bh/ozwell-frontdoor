import imageMapJson from '@/data/generated/image-map.json'
import postsJson from '@/data/generated/posts.json'
import docsJson from '@/data/generated/docs.json'
import docCategoriesJson from '@/data/generated/doc-categories.json'
import categoriesJson from '@/data/generated/categories.json'
import tagsJson from '@/data/generated/tags.json'
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
 * Original image path → WebP replacement, produced by `pnpm optimize:images`.
 *
 * Applied here rather than in the generated JSON so `pnpm migrate:wp` stays re-runnable: the
 * migration writes whatever WordPress holds, and this layer swaps in the optimized file when one
 * exists. An unconverted image simply passes through unchanged.
 */
const imageMap: Record<string, string> = imageMapJson

function optimizeImage(src: string | null): string | null {
  return src ? (imageMap[src] ?? src) : null
}

/**
 * Rewrite <img src> and srcset inside migrated HTML bodies. Longest paths first, so a shorter key
 * can never partially match inside a longer sibling (`foo.png` vs `foo-99x100.png`).
 */
const IMAGE_MAP_ENTRIES = Object.entries(imageMap).sort(([a], [b]) => b.length - a.length)

function optimizeHtmlImages(html: string): string {
  let out = html
  for (const [from, to] of IMAGE_MAP_ENTRIES) {
    out = out.split(from).join(to)
  }
  return out
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

/**
 * HTML entities in plain-text fields, decoded.
 *
 * The WordPress REST export encodes term names and author fields as if they were
 * going into HTML — `categories.json` literally holds `Healthcare Trends &amp;
 * Research`. Rendering that through JSX escapes the ampersand a second time and the
 * page shows "&amp;". It never surfaced before because the only consumer took the
 * *slug* and de-slugified it, which threw the punctuation away entirely.
 *
 * A fixed table rather than a DOM-based decode: this runs at build time in a Node
 * context with no `document`, and the input is our own CMS rather than arbitrary
 * markup. Numeric entities cover the smart quotes WordPress substitutes on save.
 */
const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&nbsp;': ' ',
  '&#039;': '’',
  '&#8216;': '‘',
  '&#8217;': '’',
  '&#8220;': '“',
  '&#8221;': '”',
  '&#8211;': '–',
  '&#8212;': '—',
}

/**
 * Tolerates a missing value on purpose. The generated JSON is cast with `as Term[]`
 * rather than validated, and `tags.json` has no `description` key at all — so the
 * declared `description: string` is a lie the compiler can't see through, and a
 * signature of `(text: string)` here throws at module load instead.
 */
function decodeEntities(text: string | null | undefined): string {
  if (!text) return ''
  return text.replace(
    /&(?:amp|lt|gt|quot|nbsp|#039|#8216|#8217|#8220|#8221|#8211|#8212);/g,
    (m) => ENTITIES[m] ?? m
  )
}

/** All posts, newest first. */
export const posts: Post[] = (postsJson as Post[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((p) => ({
    ...p,
    authorName: displayName(p.author, p.authorName),
    featuredImage: optimizeImage(p.featuredImage),
    content: optimizeHtmlImages(p.content),
  }))

/** All help-center docs, alphabetical. */
export const docs: Doc[] = (docsJson as Doc[])
  .slice()
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((d) => ({ ...d, content: optimizeHtmlImages(d.content) }))

/** Doc categories that actually contain published docs. */
export const docCategories: Term[] = (docCategoriesJson as Term[])
  .filter((c) => docs.some((d) => d.categories.includes(c.slug)))
  .map((c) => ({ ...c, name: decodeEntities(c.name), description: decodeEntities(c.description) }))
  .sort((a, b) => a.name.localeCompare(b.name))

/**
 * WordPress's default category. Nobody chose it, so it is never rendered as a
 * label and never gets an archive page of its own.
 */
const DEFAULT_CATEGORY = 'uncategorized'

/**
 * Taxonomy terms that actually have posts behind them.
 *
 * Filtering on the migrated `count` alone is not enough. The WordPress install
 * carried the tags from a purchased theme's demo content — `bootstrap`,
 * `parallax`, `retina-ready`, `1000-icons` — and a term whose archive would render
 * an empty grid is worse than no archive at all: it's a thin page inviting a
 * crawler in to find nothing. Membership is derived from the posts themselves so
 * that a stale `count` in the export can't produce one.
 */
function termsInUse(terms: Term[], slugsFor: (post: Post) => string[]): Term[] {
  return terms
    .filter((term) => term.slug !== DEFAULT_CATEGORY)
    .map((term) => ({
      ...term,
      name: decodeEntities(term.name),
      description: decodeEntities(term.description),
      count: posts.filter((p) => slugsFor(p).includes(term.slug)).length,
    }))
    .filter((term) => term.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** Blog categories with at least one post. */
export const categories: Term[] = termsInUse(categoriesJson as Term[], (p) => p.categories)

/** Blog tags with at least one post. */
export const tags: Term[] = termsInUse(tagsJson as Term[], (p) => p.tags)

export const authors: Author[] = (authorsJson as Author[]).map((a) => ({
  ...a,
  name: decodeEntities(displayName(a.slug, a.name) ?? a.name),
  description: decodeEntities(a.description),
}))

/** Authors with at least one published post — the only ones worth an archive page. */
export const authorsWithPosts: Author[] = authors.filter((a) =>
  posts.some((p) => p.author === a.slug)
)

export function getCategory(slug: string): Term | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getTag(slug: string): Term | undefined {
  return tags.find((t) => t.slug === slug)
}

export function getPostsInCategory(slug: string): Post[] {
  return posts.filter((p) => p.categories.includes(slug))
}

export function getPostsWithTag(slug: string): Post[] {
  return posts.filter((p) => p.tags.includes(slug))
}

export function getPostsByAuthor(slug: string): Post[] {
  return posts.filter((p) => p.author === slug)
}

/**
 * Posts an archive needs before it's worth indexing.
 *
 * The archives are built for structure — one canonical URL per term, crawlable
 * paths between related posts, and a `CollectionPage` graph — but with four posts
 * in the blog every one of them currently lists a single article, and all nine tags
 * belong to the *same* article. Nine URLs that each show one identical post is
 * index bloat, not coverage: it's the shape a crawler learns to discount a site
 * for, and it competes with the post itself for the same queries.
 *
 * So thin archives ship as `noindex, follow` and stay out of the sitemap, while
 * still passing crawl signal to the posts. They become indexable on their own once
 * the archive is deep enough to be a better answer than any single post in it —
 * no code change needed, just more writing.
 */
export const MIN_INDEXABLE_ARCHIVE_POSTS = 2

export function isIndexableArchive(postCount: number): boolean {
  return postCount >= MIN_INDEXABLE_ARCHIVE_POSTS
}

/** `robots` for an archive of `postCount` posts. `undefined` means "index normally". */
export function archiveRobots(postCount: number) {
  return isIndexableArchive(postCount) ? undefined : { index: false, follow: true }
}

/** Category slugs worth showing as labels — i.e. everything but WordPress's default. */
export function displayCategories(post: Post): string[] {
  return post.categories.filter((c) => c !== DEFAULT_CATEGORY)
}

/** Human-readable name for a term slug, falling back to the de-slugified form. */
export function termName(slug: string): string {
  return (
    categories.find((c) => c.slug === slug)?.name ??
    tags.find((t) => t.slug === slug)?.name ??
    slug.replace(/-/g, ' ')
  )
}

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

/**
 * Related posts, by shared taxonomy.
 *
 * This used to return the first two posts in the archive regardless of what the
 * current one was about, so the rail was identical on every page and — on the two
 * newest posts — linked to itself's neighbours by date alone. Overlap is scored
 * with categories weighted above tags, since a shared category is a deliberate
 * editorial grouping and a shared tag is often incidental. Recency breaks ties and
 * backfills when nothing overlaps, so the rail is never short.
 */
export function getRelatedPosts(slug: string, limit = 2): Post[] {
  const current = getPost(slug)
  if (!current) return posts.filter((p) => p.slug !== slug).slice(0, limit)

  const currentCategories = displayCategories(current)
  const shared = (a: string[], b: string[]) => a.filter((item) => b.includes(item)).length

  return posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      score:
        shared(displayCategories(post), currentCategories) * 2 + shared(post.tags, current.tags),
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post)
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
