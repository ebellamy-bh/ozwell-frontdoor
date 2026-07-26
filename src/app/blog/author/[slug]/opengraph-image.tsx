import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { authorsWithPosts, getAuthor, getPostsByAuthor } from '@/lib/content'

export const dynamic = 'force-static'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return authorsWithPosts.map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = getAuthor(slug)
  const count = author ? getPostsByAuthor(author.slug).length : 0

  return ogCard({
    eyebrow: 'Author',
    title: author?.name ?? 'The Ozwell Observer',
    subtitle: count ? `${count} post${count === 1 ? '' : 's'} on the Ozwell blog.` : undefined,
  })
}
