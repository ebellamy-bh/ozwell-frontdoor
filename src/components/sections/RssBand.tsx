import { Rss } from 'lucide-react'
import { Container } from '@/components/ui/Container'

/** Small band linking to the blog RSS feed. */
export default function RssBand() {
  return (
    <section className="border-t border-gray-100 bg-white pb-14">
      <Container>
        <h2 className="sr-only">Subscribe</h2>
        <div className="flex justify-center pt-10">
          <a
            href="/blog/rss.xml"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-6 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            <Rss size={16} strokeWidth={2} aria-hidden="true" />
            Subscribe via RSS
          </a>
        </div>
      </Container>
    </section>
  )
}
