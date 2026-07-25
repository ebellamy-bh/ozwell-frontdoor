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

/** All posts, newest first. */
export const posts: Post[] = (postsJson as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date))

/** All help-center docs, alphabetical. */
export const docs: Doc[] = (docsJson as Doc[]).slice().sort((a, b) => a.title.localeCompare(b.title))

/** Doc categories that actually contain published docs. */
export const docCategories: Term[] = (docCategoriesJson as Term[])
  .filter((c) => docs.some((d) => d.categories.includes(c.slug)))
  .sort((a, b) => a.name.localeCompare(b.name))

/** Blog categories with at least one post. */
export const categories: Term[] = (categoriesJson as Term[]).filter((c) => c.count > 0)

export const authors: Author[] = authorsJson as Author[]

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

/** Strip HTML tags for plain-text needs (descriptions). */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

/** First ~155 chars of a post/doc body for meta descriptions. */
export function metaDescription(html: string): string {
  const text = stripHtml(html)
  return text.length > 155 ? `${text.slice(0, 152)}…` : text
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
