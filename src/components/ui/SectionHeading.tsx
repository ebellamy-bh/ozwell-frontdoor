import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * One type scale for section headings. Previously every section picked its own
 * size — `sm:text-[35px]`, `sm:text-[37px]`, `sm:text-[38px]`, `sm:text-[40px]`,
 * `sm:text-[48px]` — and weights ranged from `font-normal` to `font-black`, so
 * the page had no visible hierarchy: a logo-cloud label was larger than a
 * section title.
 */
const SIZES = {
  /** Page titles. One per page. */
  hero: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold',
  /** Standard section heading. */
  section: 'text-3xl sm:text-4xl lg:text-[2.75rem] font-bold',
  /** Sub-band inside a section, or a minor page header. */
  sub: 'text-2xl sm:text-3xl font-bold',
} as const

interface SectionHeadingProps {
  title: ReactNode
  eyebrow?: string
  description?: ReactNode
  /** `h1` for page titles, `h2` for bands. Defaults to `h2`. */
  as?: 'h1' | 'h2' | 'h3'
  size?: keyof typeof SIZES
  align?: 'center' | 'left'
  /** Light-on-dark, for the gradient bands. */
  onDark?: boolean
  /** Extra content below the description — usually a Button pair. */
  children?: ReactNode
  className?: string
}

export default function SectionHeading({
  title,
  eyebrow,
  description,
  as: Tag = 'h2',
  size = 'section',
  align = 'center',
  onDark = false,
  children,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={clsx(centered && 'text-center', className)}>
      {eyebrow ? (
        <p
          className={clsx(
            'text-sm font-bold uppercase tracking-[0.14em]',
            onDark ? 'text-primary-100' : 'text-primary-700'
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={clsx(
          SIZES[size],
          'leading-[1.1]',
          eyebrow && 'mt-3',
          onDark ? 'text-white' : 'text-ozwell-ink-strong'
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={clsx(
            'mt-5 text-lg leading-relaxed',
            centered && 'mx-auto max-w-2xl',
            onDark ? 'text-white/85' : 'text-ozwell-slate'
          )}
        >
          {description}
        </p>
      ) : null}
      {children ? (
        <div className={clsx('mt-8', centered && 'flex justify-center')}>{children}</div>
      ) : null}
    </div>
  )
}
