import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import ShapeDivider from '@/components/ui/ShapeDivider'

interface SupportingLogosBandProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

/** Blue gradient band with wavy edges, uppercase eyebrow, and white partner logos. */
export default function SupportingLogosBand({ title, logos }: SupportingLogosBandProps) {
  return (
    <Section tone="gradient" overflowHidden>
      {/*
        The top divider was `waves` + `flipped`, which fills the *bottom* of its box — so the white
        wave rendered stranded inside the blue with a band of blue above it, instead of continuing
        the white section overhead. Mirroring one shape (`wavesInverse`, flipped on top) matches the
        Testimonials band and keeps both edges of this band the same silhouette.
      */}
      <ShapeDivider shape="wavesInverse" position="top" flipped heightClass="h-8 lg:h-12" />
      <ShapeDivider shape="wavesInverse" position="bottom" heightClass="h-8 lg:h-12" />

      <Container reveal className="relative">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] sm:text-base">
          {title}
        </h2>
        {/* Sized to keep all five marks on one row at desktop — at h-14 with gap-x-20 they wrapped
            to 3 + 2 and left an orphan. */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <li key={logo.src} className="flex h-9 items-center lg:h-11">
              {/*
                These are the white-knockout variants, but WebChart's mark keeps mid-grey panels
                that read muddy against the gradient. brightness-0 + invert forces every mark to
                the same white while preserving each one's alpha, so overlapping shapes keep their
                definition through opacity rather than through colour.
              */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={360}
                height={90}
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
