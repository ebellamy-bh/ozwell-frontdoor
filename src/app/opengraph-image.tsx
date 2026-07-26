import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const dynamic = 'force-static'
export const alt = 'Ozwell — the AI medical assistant that writes your notes'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogCard({
    eyebrow: 'AI medical scribe',
    title: 'Your AI medical assistant',
    subtitle:
      'Ozwell listens to the visit, writes the note, and queues the orders — so charting stops following you home.',
  })
}
