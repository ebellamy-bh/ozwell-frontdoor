import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { docs, getDoc, getDocCategory } from '@/lib/content'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

/** Required for a static export: one card is written per article at build time. */
export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  const category = doc?.categories.length ? getDocCategory(doc.categories[0]) : undefined

  return ogCard({
    eyebrow: category?.name ?? 'Help Center',
    title: doc?.title ?? 'Ozwell Help Center',
  })
}
