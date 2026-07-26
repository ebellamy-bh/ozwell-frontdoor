import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * Vertical rhythm scale. Section padding used to be chosen per-section — `py-10`, `py-12`, `py-14`,
 * `py-16`, `pb-4 pt-10`, `pb-24 pt-28` all appeared on the homepage — so the gaps between bands
 * were arbitrary and the page read as a stack of unrelated blocks.
 *
 * `tight` is for bands that are visually subordinate to their neighbour (a logo strip under a hero).
 * `normal` is the default. `loose` is for full-bleed gradient bands, which need more room because
 * their shape dividers eat into the padding.
 */
const SPACING = {
  tight: 'py-12 lg:py-16',
  normal: 'py-16 lg:py-24',
  loose: 'py-24 lg:py-32',
} as const

const TONES = {
  white: 'bg-white',
  mist: 'bg-ozwell-mist',
  gradient: 'bg-gradient-to-b from-ozwell-sky to-ozwell-sky-deep text-white',
} as const

interface SectionProps {
  children: ReactNode
  spacing?: keyof typeof SPACING
  tone?: keyof typeof TONES
  /** Set on bands carrying shape dividers or absolutely-positioned decoration. */
  overflowHidden?: boolean
  id?: string
  className?: string
}

export function Section({
  children,
  spacing = 'normal',
  tone = 'white',
  overflowHidden = false,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        'relative',
        SPACING[spacing],
        TONES[tone],
        overflowHidden && 'overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  )
}
