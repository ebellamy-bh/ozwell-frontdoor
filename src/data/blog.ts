import { posts, displayCategories, formatDate, readingTime, type Post } from '@/lib/content'
import type { PostCard } from '@/components/sections/BlogGrid'

/**
 * Post → card. Extracted because the blog index, the related-post rail, and the
 * three taxonomy archives all need the same shape, and it had been open-coded in
 * each of them with the `uncategorized` filter applied inconsistently.
 */
export function toPostCards(list: Post[]): PostCard[] {
  return list.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    dateFormatted: formatDate(p.date),
    readingMinutes: readingTime(p.content),
    authorName: p.authorName,
    featuredImage: p.featuredImage,
    featuredImageAlt: p.featuredImageAlt,
    categories: displayCategories(p),
  }))
}

/** Post cards for the blog index, newest first. */
export const blogIndexPosts: PostCard[] = toPostCards(posts)
