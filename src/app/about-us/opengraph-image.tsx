import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { aboutHero } from '@/data/about'

export const dynamic = 'force-static'
export const alt = aboutHero.title
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'About',
    title: aboutHero.title,
    subtitle: 'Built by BlueHive Health for the clinicians we work alongside.',
  })
}
