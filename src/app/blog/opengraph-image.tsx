import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'The Ozwell Observer'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'Blog',
    title: 'The Ozwell Observer',
    subtitle: 'Release notes, real-world use cases, and research on AI in clinical documentation.',
  })
}
