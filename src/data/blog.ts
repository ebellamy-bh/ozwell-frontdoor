import { posts, formatDate, readingTime } from '@/lib/content'
import type { PostCard } from '@/components/sections/BlogGrid'

/** Post cards for the blog index and related-post rails, newest first. */
export const blogIndexPosts: PostCard[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  dateFormatted: formatDate(p.date),
  readingMinutes: readingTime(p.content),
  authorName: p.authorName,
  featuredImage: p.featuredImage,
  featuredImageAlt: p.featuredImageAlt,
  // `uncategorized` is WordPress's default, not a label anyone chose.
  categories: p.categories.filter((c) => c !== 'uncategorized'),
}))
