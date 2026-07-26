import Image from 'next/image'
import { Play, PenSquare, Check, Sparkles, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

interface HeroProps {
  eyebrowLines: string[]
  subheading: string
  description: string
  trustPoints: string[]
  image: { src: string; alt: string; width: number; height: number }
  chips: Array<{ label: string }>
  chipHref: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

/**
 * Homepage hero.
 *
 * Changes from the legacy build, each addressing something visible:
 * - Copy leads and the illustration follows, so DOM order matches reading order.
 *   Previously the image came first in the source and was pulled left with
 *   `order-*`, which put the artwork ahead of the H1 for screen readers.
 * - The two CTAs were ~500px stacked pills of identical weight, with no
 *   primary/secondary hierarchy. Now filled + outlined, side by side above `sm`.
 * - Mobile was 1,187px tall with ~400px of empty blue and the mockup cropped off
 *   the left edge.
 */
export default function Hero({
  eyebrowLines,
  subheading,
  description,
  trustPoints,
  image,
  chips,
  chipHref,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <Section tone="brand" spacing="none" dividers="bottom" pattern className="pt-12 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white ring-1 ring-white/25 backdrop-blur-sm">
            <Sparkles size={14} strokeWidth={2.5} aria-hidden="true" />
            AI medical scribe
          </p>

          {/* One H1 in three parts. The {' '} separators are load-bearing: block
              children don't render whitespace between them, so without these the
              indexed and announced text is
              "Say hi toOzwell.Your AI medical assistant." */}
          <h1 className="mt-6 font-extrabold leading-[0.95] text-white">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">{eyebrowLines[0]}</span>{' '}
            <span className="block text-6xl sm:text-7xl lg:text-8xl">{eyebrowLines[1]}</span>{' '}
            <span className="mt-3 block text-2xl font-semibold text-white/90 sm:text-3xl lg:text-[2.125rem]">
              {subheading}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={primaryCta.href} variant="inverse" size="lg" icon={PenSquare}>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="inverse-outline" size="lg" icon={Play}>
              {secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-white/85">
                <Check size={16} strokeWidth={3} aria-hidden="true" className="text-ozwell-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pb-8">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 1024px) 90vw, 480px"
            className="mx-auto w-full max-w-md lg:max-w-none"
          />

          {/* Example prompts. The illustration above ends in an empty rounded input
              bar, which is what these were drawn to sit beneath; as loose outlined
              pills they read as three unlabelled navigation buttons. */}
          <div className="mx-auto mt-6 w-full max-w-md rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
              Try asking Ozwell
            </p>
            <ul className="mt-3 space-y-2">
              {chips.map((chip) => (
                <li key={chip.label}>
                  <a
                    href={chipHref}
                    rel="noopener"
                    className="group flex items-center justify-between gap-3 rounded-xl bg-white/90 px-4 py-3 text-[15px] font-medium text-ozwell-ink-strong transition hover:bg-white"
                  >
                    <span>“{chip.label}”</span>
                    <ArrowRight
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="shrink-0 text-primary-600 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
