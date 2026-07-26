import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

/**
 * Surface treatments. Three, not five — every band on the site is one of these,
 * so two neighbouring sections can never be almost-but-not-quite the same blue.
 *
 * `on-dark` is a marker class, not a style: `globals.css` uses it to switch the
 * focus ring to white, and components use it to pick light-on-dark text.
 */
const TONES = {
  white: 'bg-white',
  mist: 'bg-ozwell-mist',
  /** The one gradient. Used by hero, proof bands, and the closing CTA. */
  brand:
    'on-dark bg-[linear-gradient(145deg,var(--color-ozwell-sky)_0%,var(--color-ozwell-sky-deep)_100%)] text-white',
  /** Deep navy, for when a band needs weight without competing with the hero. */
  navy: 'on-dark bg-[linear-gradient(145deg,var(--color-ozwell-navy)_0%,var(--color-ozwell-navy-deep)_100%)] text-white',
} as const

/**
 * Vertical rhythm. The site previously used py-10, py-12, py-14, py-16,
 * `pb-4 pt-10`, and `pb-24 pt-28` — no scale, so nothing lined up and adjacent
 * sections collided or drifted apart at random.
 */
const SPACING = {
  none: '',
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-24',
  lg: 'py-20 lg:py-32',
} as const

export interface SectionProps {
  children: ReactNode
  id?: string
  tone?: keyof typeof TONES
  spacing?: keyof typeof SPACING
  width?: 'default' | 'prose'
  /**
   * Wave dividers, kept to a budget: only on a white→gradient transition, and
   * only on the edge that actually meets white. The legacy build put them on
   * every band, which cost ~330px of empty blue above the FAQ alone.
   */
  dividers?: 'none' | 'top' | 'bottom' | 'both'
  /** Skip the Container — for full-bleed children. */
  bleed?: boolean
  /**
   * The bubble-network brand texture, for gradient bands that carry a lot of
   * empty colour (hero, closing CTA). Purely decorative.
   */
  pattern?: boolean
  className?: string
  innerClassName?: string
}

/**
 * Every band on the site. Owns the surface, the vertical rhythm, the container,
 * and the divider budget so that no individual section has to decide — which is
 * what let three visual languages grow in the first place.
 */
export default function Section({
  children,
  id,
  tone = 'white',
  spacing = 'md',
  width = 'default',
  dividers = 'none',
  bleed = false,
  pattern = false,
  className,
  innerClassName,
}: SectionProps) {
  const showTop = dividers === 'top' || dividers === 'both'
  const showBottom = dividers === 'bottom' || dividers === 'both'
  const hasDividers = showTop || showBottom

  const body = bleed ? (
    <div className={clsx('relative', innerClassName)}>{children}</div>
  ) : (
    <Container width={width} className={clsx('relative', innerClassName)}>
      {children}
    </Container>
  )

  return (
    <section
      id={id}
      className={clsx(
        TONES[tone],
        SPACING[spacing],
        (hasDividers || pattern) && 'relative overflow-hidden',
        // Dividers eat into the band, so the content needs to clear them.
        showTop && 'pt-24 lg:pt-40',
        showBottom && 'pb-24 lg:pb-40',
        className
      )}
    >
      {pattern ? (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/bluehive-site-headers-25.webp')" }}
          aria-hidden="true"
        />
      ) : null}
      {showTop ? <ShapeDivider shape="waves" position="top" heightClass="h-12 lg:h-24" /> : null}
      {body}
      {showBottom ? (
        <ShapeDivider shape="waves" position="bottom" flipped heightClass="h-12 lg:h-24" />
      ) : null}
    </section>
  )
}
