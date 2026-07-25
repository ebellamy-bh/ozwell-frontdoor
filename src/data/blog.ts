import { posts, formatDate } from '@/lib/content'
import type { PostCard } from '@/components/sections/BlogGrid'

/** Post cards for the blog index, newest first. */
export const blogIndexPosts: PostCard[] = posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  date: p.date,
  dateFormatted: formatDate(p.date),
  authorName: p.authorName,
  featuredImage: p.featuredImage,
  featuredImageAlt: p.featuredImageAlt,
  categories: p.categories.filter((c) => c !== 'uncategorized'),
}))
