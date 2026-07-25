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
        style={{ backgroundImage: "url('/images/hero-pattern.webp')" }}
        aria-hidden="true"
      />

      <Container className="relative pb-32 pt-14 lg:pb-40 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Image + workflow chips — LEFT column (matches live layout) */}
          <div className="order-2 flex flex-col items-center lg:order-1">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              // max-w-sm on mobile: at max-w-md the composed mockup overflowed the 375px
              // viewport and the photo card was clipped off the left edge.
              className="w-full max-w-sm lg:max-w-md"
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
              {/* Body face here on purpose. Bricolage only ships 600–800 in our subset, so
                  `font-light` resolves to 600 and the supporting line ends up competing with the
                  headline above it. Lato carries the 300 and restores the weight contrast. */}
              <span className="mt-3 block font-sans text-2xl font-light sm:text-3xl lg:text-[40px]">
                {subheading}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/95">{description}</p>
            {/* Two stacked full-width pills gave the primary and secondary actions identical
                weight and ~500px of width each. Sized to their content and set side by side, the
                solid fill now reads as primary and the outline as secondary. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-600 shadow-lg transition hover:bg-ozwell-mist"
              >
                <PenSquare size={18} strokeWidth={2} aria-hidden="true" />
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-8 py-4 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
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
