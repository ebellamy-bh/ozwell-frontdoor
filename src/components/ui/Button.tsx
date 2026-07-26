import Link from 'next/link'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

/**
 * Five button treatments, replacing the eight hand-rolled pill styles the site
 * had grown — each with its own radius, border width, padding, and casing, and
 * with no consistent primary/secondary hierarchy (the hero shipped two
 * full-width pills of equal visual weight).
 *
 * `inverse*` are the on-gradient variants.
 */
const VARIANTS = {
  primary:
    'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 border border-transparent',
  secondary:
    'bg-white text-ozwell-ink-strong border border-ozwell-border hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50',
  inverse: 'bg-white text-primary-700 shadow-sm hover:bg-ozwell-mist border border-transparent',
  'inverse-outline':
    'bg-transparent text-white border-2 border-white/70 hover:border-white hover:bg-white/10',
  ghost: 'text-primary-700 hover:text-primary-800 hover:bg-primary-50 border border-transparent',
} as const

/**
 * Explicit min-heights rather than relying on padding + line-height, which left
 * the small variant at 38px — under the 44px comfortable touch target, and the
 * header's mobile CTA used it.
 */
const SIZES = {
  sm: 'min-h-10 px-4 py-2 text-sm gap-1.5',
  md: 'min-h-11 px-6 py-3 text-[15px] gap-2',
  lg: 'min-h-[3.25rem] px-8 py-4 text-base gap-2.5',
} as const

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  icon?: LucideIcon
  /** Put the icon after the label — for "onward" affordances. */
  iconAfter?: boolean
  /** Open in a new tab. Off by default: leaving is usually the reader's choice. */
  newTab?: boolean
  /** Stretch to the container. Used in the mobile menu and stacked hero CTAs. */
  block?: boolean
  className?: string
  /** Overrides the accessible name when the visible label isn't specific enough. */
  ariaLabel?: string
}

/**
 * The site's only button. Routes internal hrefs through `next/link` and leaves
 * external ones and same-page anchors as plain anchors, so callers never have to
 * remember which is which.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconAfter = false,
  newTab = false,
  block = false,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center rounded-full font-semibold transition-colors',
    VARIANTS[variant],
    SIZES[size],
    block && 'w-full',
    className
  )

  const iconEl = Icon ? (
    <Icon
      size={size === 'sm' ? 15 : 18}
      strokeWidth={2.25}
      aria-hidden="true"
      className="shrink-0"
    />
  ) : null

  const body = (
    <>
      {!iconAfter ? iconEl : null}
      {children}
      {iconAfter ? iconEl : null}
    </>
  )

  // Internal route: `/docs/`, but not the protocol-relative `//host`.
  const isInternal = href.startsWith('/') && !href.startsWith('//')

  if (isInternal) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {body}
      </Link>
    )
  }

  const isAnchor = href.startsWith('#')

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(!isAnchor && { rel: newTab ? 'noopener noreferrer' : 'noopener' })}
      {...(newTab && { target: '_blank' })}
    >
      {body}
    </a>
  )
}
