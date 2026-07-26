import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

/**
 * The one icon treatment: a brand-blue glyph on a tinted disc.
 *
 * Icons previously appeared in three unrelated styles — dark navy line icons in MissionSection,
 * `text-fuchsia-400` in ValuesGrid (a colour that appears nowhere in the brand palette; it was
 * carried over from the WordPress theme), and blue-in-a-tinted-circle in FeatureRows. Only the
 * third belonged to this site, so it becomes the rule.
 *
 * `onAccent` inverts for use on the brand gradient, where the tinted disc would disappear.
 */
const SIZES = {
  sm: { box: 'h-10 w-10', glyph: 18 },
  md: { box: 'h-12 w-12', glyph: 22 },
  lg: { box: 'h-14 w-14', glyph: 26 },
} as const

interface FeatureIconProps {
  icon: LucideIcon
  size?: keyof typeof SIZES
  onAccent?: boolean
  className?: string
}

export function FeatureIcon({
  icon: Icon,
  size = 'md',
  onAccent = false,
  className,
}: FeatureIconProps) {
  const { box, glyph } = SIZES[size]
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        box,
        onAccent ? 'bg-white/15 text-white' : 'bg-primary-500/10 text-primary-600',
        className
      )}
    >
      <Icon size={glyph} strokeWidth={2} aria-hidden="true" />
    </span>
  )
}
