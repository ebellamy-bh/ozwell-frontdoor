import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

interface Testimonial {
  quote: string
  name: string
  title: string
  avatar: string
}

interface TestimonialsProps {
  title: string
  description: string
  items: Testimonial[]
}

export default function Testimonials({ title, description, items }: TestimonialsProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ozwell-sky to-ozwell-sky-deep pb-24 pt-28 text-white lg:pb-28 lg:pt-32">
      {/* Live: waves-inverse top (69px, flipped) and bottom (45px) */}
      <ShapeDivider shape="wavesInverse" position="top" flipped heightClass="h-10 lg:h-[69px]" />
      <ShapeDivider shape="wavesInverse" position="bottom" heightClass="h-7 lg:h-[45px]" />
      <Container reveal className="relative">
        <h2 className="text-center text-3xl font-bold sm:text-[38px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/90">{description}</p>

        {/* Stacked, the gap has to clear the next card's overhanging avatar (h-20 pulled up 40px). */}
        <ul className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <li key={item.name} className="flex">
              <figure className="flex flex-1 flex-col rounded-3xl bg-white p-8 pt-0 shadow-lg sm:p-10 sm:pt-0">
                {/* Avatar straddles the card's top edge, as on the legacy design. */}
                <Image
                  src={item.avatar}
                  alt=""
                  width={128}
                  height={128}
                  className="-mt-10 mb-6 h-20 w-20 self-center rounded-full object-cover shadow-md"
                />
                <Quote
                  size={28}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="mb-3 shrink-0 text-primary-200"
                />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-ozwell-ink sm:text-base">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-ozwell-border pt-5">
                  <p className="font-bold text-ozwell-ink-strong">{item.name}</p>
                  <p className="mt-0.5 text-sm text-ozwell-slate">{item.title}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
