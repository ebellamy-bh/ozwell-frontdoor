import Link from 'next/link'
import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

/**
 * The site's one card. It replaces three competing styles that appeared within a
 * single scroll: `rounded-3xl` gradient panels, `rounded-2xl shadow-md ring-1`
 * blog cards, and square flat panels with an off-scale
 * `shadow-[0_0_40px_10px_rgba(0,0,0,0.05)]` glow (ValuesGrid, DocsHub).
 */
const TONES = {
  /** White on a white or mist page. */
  plain: 'bg-white border border-ozwell-border',
  /** Slightly lifted — for grids that sit on a mist surface. */
  raised: 'bg-white border border-ozwell-border shadow-card',
  /** Tinted, for supporting/secondary information. */
  mist: 'bg-ozwell-mist border border-primary-100',
  /** On a gradient band. */
  onBrand: 'bg-white/10 border border-white/25 backdrop-blur-sm',
} as const

const PADDING = {
  none: '',
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-8 sm:p-10',
} as const

interface CardProps {
  children: ReactNode
  tone?: keyof typeof TONES
  padding?: keyof typeof PADDING
  /** Turns the whole card into a link and enables the hover lift. */
  href?: string
  /** Hover lift without making the card itself a link (for cards with inner links). */
  interactive?: boolean
  /** Semantic element when the card isn't a link — `article`, `li`, `figure`. */
  as?: ElementType
  className?: string
}

export default function Card({
  children,
  tone = 'raised',
  padding = 'md',
  href,
  interactive = false,
  as,
  className,
}: CardProps) {
  const lifts = interactive || Boolean(href)

  const classes = clsx(
    'rounded-2xl',
    TONES[tone],
    PADDING[padding],
    lifts &&
      'group transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover motion-reduce:hover:translate-y-0',
    className
  )

  if (href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    if (isInternal) {
      return (
        <Link href={href} className={clsx(classes, 'block')}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} rel="noopener" className={clsx(classes, 'block')}>
        {children}
      </a>
    )
  }

  const Tag = as ?? 'div'
  return <Tag className={classes}>{children}</Tag>
}
