import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface HeroProps {
  eyebrowLines: string[]
  subheading: string
  description: string
  image: { src: string; alt: string; width: number; height: number }
  chips: Array<{ label: string }>
  chipHref: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export default function Hero({ eyebrowLines, subheading, description, image, chips, chipHref, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#24c1fc] to-[#0890ed] py-16 text-white lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="leading-none">
              <span className="block text-5xl font-medium sm:text-6xl lg:text-[81px]">{eyebrowLines[0]}</span>
              <span className="block text-7xl font-medium sm:text-8xl lg:text-[144px]">{eyebrowLines[1]}</span>
              <span className="mt-2 block text-2xl font-light sm:text-3xl lg:text-[40px]">{subheading}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={primaryCta.href}
                className="rounded-full bg-ozwell-mist px-9 py-[18px] text-base font-semibold text-primary-500 shadow transition hover:bg-white"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="rounded-full border-[3px] border-white px-9 py-[15px] text-base font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="w-full rounded-2xl"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <a
                  key={chip.label}
                  href={chipHref}
                  className="rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-ozwell-ink shadow-md transition-shadow hover:shadow-lg"
                >
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
