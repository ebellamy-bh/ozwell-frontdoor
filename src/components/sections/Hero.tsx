import Image from 'next/image'
import { Play, PenSquare } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

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
            {/* The {' '} separators matter: without them the block spans concatenate and the
                accessible name / indexed text reads "Say hi toOzwell.Your AI medical assistant".
                Whitespace between block-level children doesn't render, so this is text-only. */}
            <h1 className="leading-none">
              <span className="block text-5xl font-medium sm:text-6xl lg:text-[81px]">
                {eyebrowLines[0]}
              </span>{' '}
              <span className="block text-7xl font-medium sm:text-8xl lg:text-[144px]">
                {eyebrowLines[1]}
              </span>{' '}
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

      {/* Live: waves bottom divider, 160px, flipped */}
      <ShapeDivider shape="waves" position="bottom" flipped heightClass="h-24 lg:h-40" />
    </section>
  )
}
