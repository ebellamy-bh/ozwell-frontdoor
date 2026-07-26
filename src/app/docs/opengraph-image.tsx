import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'Ozwell Help Center'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'Help Center',
    title: 'How can we help?',
    subtitle: 'Setup guides, account help, integrations, and the completions API.',
  })
}
