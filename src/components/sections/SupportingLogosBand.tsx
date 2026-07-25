import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

interface SupportingLogosBandProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

/** Blue gradient band with wavy edges, uppercase eyebrow, and white partner logos — matches live About page. */
export default function SupportingLogosBand({ title, logos }: SupportingLogosBandProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(170deg,#24c1fc_0%,#0890ed_100%)] py-28 text-white lg:py-32">
      <ShapeDivider shape="waves" position="top" flipped heightClass="h-8 lg:h-12" />
      <ShapeDivider shape="wavesInverse" position="bottom" heightClass="h-8 lg:h-12" />
      <Container className="relative">
        <h2 className="text-center text-lg font-semibold uppercase tracking-[0.2em] sm:text-[22px]">
          {title}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-20 gap-y-10">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={360}
              height={90}
              className="h-14 w-auto object-contain lg:h-16"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
