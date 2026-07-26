import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * The one card style.
 *
 * The site had three competing ones: `rounded-3xl` gradient panels on the homepage, `rounded-2xl`
 * shadow cards on the blog, and square flat cards with a `0 0 40px 10px` glow in ValuesGrid and
 * DocsHub. Three languages on one site reads as three sites.
 *
 * `plain` is the default surface. `interactive` adds the hover treatment for cards that are links.
 * `accent` is the brand-gradient panel, kept for the one or two places that genuinely need to
 * shout (the Drummond certification band) rather than as a general-purpose look.
 */
const VARIANTS = {
  plain: 'bg-white ring-1 ring-gray-100 shadow-md',
  interactive:
    'bg-white ring-1 ring-gray-100 shadow-md transition hover:shadow-lg hover:ring-primary-200',
  accent: 'bg-gradient-to-br from-ozwell-sky to-ozwell-sky-deep text-white shadow-lg',
} as const

const PADDING = {
  none: '',
  normal: 'p-6 sm:p-8',
  roomy: 'p-8 sm:p-12',
} as const

interface CardProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  padding?: keyof typeof PADDING
  as?: 'div' | 'article' | 'li' | 'figure'
  className?: string
}

export function Card({
  children,
  variant = 'plain',
  padding = 'normal',
  as: Tag = 'div',
  className,
}: CardProps) {
  return (
    <Tag className={clsx('rounded-2xl', VARIANTS[variant], PADDING[padding], className)}>
      {children}
    </Tag>
  )
}
