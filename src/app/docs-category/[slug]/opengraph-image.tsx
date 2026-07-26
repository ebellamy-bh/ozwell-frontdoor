import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { docCategories, getDocCategory, getDocsInCategory } from '@/lib/content'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return docCategories.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getDocCategory(slug)
  const count = category ? getDocsInCategory(category.slug).length : 0

  return ogCard({
    eyebrow: 'Help Center',
    title: category?.name ?? 'Ozwell Help Center',
    subtitle:
      category && count ? `${count} article${count === 1 ? '' : 's'} in this topic.` : undefined,
  })
}
