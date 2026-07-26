import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface ShowcaseProps {
  title: string
  description: string
  screenshots: Array<{ src: string; alt: string; width: number; height: number }>
}

/**
 * Auto-scrolling marquee of product screenshots.
 *
 * Two changes from the Elementor original, both about the band's edges:
 *
 * The curve dividers are gone. They were 275px tall top and bottom, and the band carried
 * `pt-40 pb-40 lg:pt-72 lg:pb-64` on top of that to clear them — roughly 550px of empty blue
 * wrapped around the content, which read as a giant lens rather than a section.
 *
 * And the band is light rather than gradient. Testimonials, this section, and the CTA stripe were
 * three consecutive gradient bands, so Testimonials' closing wave — which transitions blue *to
 * white* — rendered as a white wave stranded between two blue slabs. Alternating here gives every
 * gradient band white on both sides, which is what the wave dividers assume. The dark phone
 * screenshots also carry better on a light ground than they did on blue.
 */
export default function Showcase({ title, description, screenshots }: ShowcaseProps) {
  // Duplicate the strip so the CSS loop is seamless
  const strip = [...screenshots, ...screenshots]

  return (
    <Section tone="mist" spacing="loose" overflowHidden>
      <Container reveal>
        <h2 className="text-center font-heading text-3xl font-bold text-ozwell-ink-strong sm:text-[40px]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>
      </Container>
      <div className="relative mt-14">
        <div className="marquee flex w-max gap-6" aria-label="Ozwell product screenshots">
          {strip.map((shot, i) => (
            /*
              No `shadow-*` or `rounded-*` here on purpose. These are phone renders on a fully
              transparent canvas, so a box-shadow draws around the image's rectangle rather than the
              phone silhouette — which is what put a hard grey panel behind each screenshot — and a
              border radius rounds corners nobody can see. The artwork already carries its own
              bezel and shadow. If depth is ever wanted here it has to be `drop-shadow-*`, which
              follows the alpha channel.
            */
            <Image
              key={`${shot.src}-${i}`}
              src={shot.src}
              alt={i < screenshots.length ? shot.alt : ''}
              aria-hidden={i >= screenshots.length}
              width={shot.width}
              height={shot.height}
              className="w-[260px] sm:w-[320px]"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
