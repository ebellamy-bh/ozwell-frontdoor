import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

/**
 * One icon treatment. The site had three unrelated ones — bare navy line icons
 * (MissionSection), `text-fuchsia-400` line icons (ValuesGrid, off-palette), and
 * blue glyphs in tinted circles (FeatureRows) — which read as three different
 * design systems on the same scroll.
 */
const TONES = {
  /** Default: blue glyph on a tinted blue square. */
  brand: 'bg-primary-50 text-primary-600 ring-1 ring-primary-100',
  /** Filled, for numbered or sequential steps that need to read as markers. */
  solid: 'bg-primary-600 text-white shadow-sm',
  /** On a gradient band. */
  onBrand: 'bg-white/15 text-white ring-1 ring-white/25',
} as const

const SIZES = {
  sm: { box: 'h-10 w-10 rounded-xl', glyph: 18 },
  md: { box: 'h-12 w-12 rounded-xl', glyph: 22 },
  lg: { box: 'h-14 w-14 rounded-2xl', glyph: 26 },
} as const

interface IconBadgeProps {
  icon: LucideIcon
  tone?: keyof typeof TONES
  size?: keyof typeof SIZES
  className?: string
}

export default function IconBadge({
  icon: Icon,
  tone = 'brand',
  size = 'md',
  className,
}: IconBadgeProps) {
  const { box, glyph } = SIZES[size]
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center justify-center',
        box,
        TONES[tone],
        className
      )}
    >
      <Icon size={glyph} strokeWidth={2} aria-hidden="true" />
    </span>
  )
}
