import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'

interface Testimonial {
  /** The one line a skimmer should take away, pulled out above the full quote. */
  highlight: string
  quote: string
  name: string
  title: string
  avatar: string
}

interface TestimonialsProps {
  eyebrow: string
  title: string
  description: string
  items: Testimonial[]
}

/**
 * Physician testimonials.
 *
 * These were a flat 1024×576 PNG of two cards: ~9px type on desktop, ~5px on a
 * phone, unselectable and invisible to search. Now real markup — and each quote
 * leads with its own strongest sentence, because these run 90 words and nobody
 * reads a wall of italics on a marketing page.
 */
export default function Testimonials({ eyebrow, title, description, items }: TestimonialsProps) {
  return (
    <Section tone="brand" spacing="lg" dividers="both">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} onDark />

      <ul className="mt-14 grid gap-8 lg:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="flex">
            <figure className="flex flex-1 flex-col rounded-2xl bg-white p-7 shadow-card sm:p-9">
              <blockquote className="flex-1">
                <p className="font-display text-xl font-bold leading-snug text-ozwell-ink-strong sm:text-[1.375rem]">
                  “{item.highlight}”
                </p>
                <p className="mt-5 text-[15px] leading-relaxed text-ozwell-slate">{item.quote}</p>
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-ozwell-border pt-6">
                <Image
                  src={item.avatar}
                  alt=""
                  width={120}
                  height={120}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-ozwell-ink-strong">{item.name}</p>
                  <p className="mt-0.5 text-sm text-ozwell-slate">{item.title}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
