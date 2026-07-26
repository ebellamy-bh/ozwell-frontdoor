import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { tags, getTag, getPostsWithTag } from '@/lib/content'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return tags.map((t) => ({ slug: t.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = getTag(slug)
  const count = tag ? getPostsWithTag(tag.slug).length : 0

  return ogCard({
    eyebrow: 'Blog',
    title: tag?.name ?? 'The Ozwell Observer',
    subtitle: count ? `${count} post${count === 1 ? '' : 's'} tagged this way.` : undefined,
  })
}
