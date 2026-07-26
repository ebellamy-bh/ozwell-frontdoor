import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'Drummond pDSI-Risk certification'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'Certification',
    title: 'Drummond pDSI-Risk certified',
    subtitle:
      'The first AI-powered health IT product certified for predictive decision support risk.',
  })
}
