import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { categories, getCategory, getPostsInCategory } from '@/lib/content'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  const count = category ? getPostsInCategory(category.slug).length : 0

  return ogCard({
    eyebrow: 'Blog',
    title: category?.name ?? 'The Ozwell Observer',
    subtitle: count ? `${count} post${count === 1 ? '' : 's'} in this category.` : undefined,
  })
}
