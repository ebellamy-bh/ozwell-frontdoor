import Image from 'next/image'
import { Play, PenSquare } from 'lucide-react'
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

export default function Hero({
  eyebrowLines,
  subheading,
  description,
  image,
  chips,
  chipHref,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(150deg,#24c1fc_0%,#0890ed_100%)] text-white">
      {/* Network / bubble pattern overlay (same asset as the live site) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/bluehive-site-headers-25.png')" }}
        aria-hidden="true"
      />

      <Container className="relative pb-40 pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image + workflow chips — LEFT column (matches live layout) */}
          <div className="order-2 flex flex-col items-center lg:order-1">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="w-full max-w-md"
            />
            {/* Chips stacked and centered under the image (matches live) */}
            <div className="mt-6 flex w-full max-w-xs flex-col items-stretch gap-3">
              {chips.map((chip) => (
                <a
                  key={chip.label}
                  href={chipHref}
                  className="rounded-full border-2 border-white px-8 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {chip.label}
                </a>
              ))}
            </div>
          </div>

          {/* Copy + CTAs — RIGHT column (matches live layout) */}
          <div className="order-1 lg:order-2">
            <h1 className="leading-none">
              <span className="block text-5xl font-medium sm:text-6xl lg:text-[81px]">
                {eyebrowLines[0]}
              </span>
              <span className="block text-7xl font-medium sm:text-8xl lg:text-[144px]">
                {eyebrowLines[1]}
              </span>
              <span className="mt-2 block text-2xl font-light sm:text-3xl lg:text-[40px]">
                {subheading}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/95">{description}</p>
            {/* CTAs span the full text column width (matches live) */}
            <div className="mt-8 flex w-full flex-col gap-4">
              <a
                href={primaryCta.href}
                className="flex items-center justify-center gap-2 rounded-full bg-ozwell-mist px-9 py-[18px] text-base font-semibold text-primary-500 shadow transition hover:bg-white"
              >
                <PenSquare size={18} strokeWidth={2} aria-hidden="true" />
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="flex items-center justify-center gap-2 rounded-full border-[3px] border-white px-9 py-[15px] text-base font-semibold text-white transition hover:bg-white/10"
              >
                <Play size={18} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                {secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom white wave shape divider — same Elementor "waves" path as the live site, rotated 180° */}
      <svg
        className="absolute bottom-0 left-0 h-24 w-full rotate-180 text-white lg:h-40"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
        />
      </svg>
    </section>
  )
}
