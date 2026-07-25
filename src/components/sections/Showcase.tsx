import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface ShowcaseProps {
  title: string
  description: string
  screenshots: Array<{ src: string; alt: string; width: number; height: number }>
}

/**
 * Blue gradient band with an auto-scrolling marquee of product screenshots.
 *
 * The curve dividers are gone. They were 275px tall top and bottom, and the band carried
 * `pt-40 pb-40 lg:pt-72 lg:pb-64` on top of that to clear them — which rendered as roughly 550px of
 * empty blue wrapped around the content, and read as a giant lens rather than a section. With the
 * band square-edged it sits between the two wave transitions on the page and gives them rhythm
 * instead of competing with them.
 */
export default function Showcase({ title, description, screenshots }: ShowcaseProps) {
  // Duplicate the strip so the CSS loop is seamless
  const strip = [...screenshots, ...screenshots]

  return (
    <Section tone="gradient" spacing="loose" overflowHidden>
      <Container reveal>
        <h2 className="text-center font-heading text-3xl font-bold sm:text-[40px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-white/90">
          {description}
        </p>
      </Container>
      <div className="relative mt-14">
        <div className="marquee flex w-max gap-6" aria-label="Ozwell product screenshots">
          {strip.map((shot, i) => (
            <Image
              key={`${shot.src}-${i}`}
              src={shot.src}
              alt={i < screenshots.length ? shot.alt : ''}
              aria-hidden={i >= screenshots.length}
              width={shot.width}
              height={shot.height}
              className="w-[260px] rounded-xl shadow-md sm:w-[320px]"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
