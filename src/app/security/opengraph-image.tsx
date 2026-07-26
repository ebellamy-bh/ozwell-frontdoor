import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'Security and clinical control at Ozwell'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'Security',
    title: 'A clinician is always the last step before the chart',
    subtitle: 'How Ozwell handles the patient record, and where control stays with you.',
  })
}
