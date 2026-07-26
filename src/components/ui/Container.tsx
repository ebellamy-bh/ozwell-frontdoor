import clsx from 'clsx'
import type { ReactNode } from 'react'

/**
 * `default` is the marketing-page grid; `prose` is the reading measure for long-form article and
 * doc bodies (~65–70 characters at our 18px body size).
 */
const WIDTHS = {
  default: 'max-w-6xl',
  prose: 'max-w-3xl',
} as const

interface ContainerProps {
  children: ReactNode
  className?: string
  width?: keyof typeof WIDTHS
  /**
   * Opt this container's content into reveal-on-scroll. Deliberately not the default: it's applied
   * to section content rather than whole sections so gradient backgrounds and shape dividers stay
   * put while the copy inside them animates.
   */
  reveal?: boolean
}

/**
 * Layout wrapper — max width + horizontal padding, used by every section.
 *
 * Width is a prop rather than something callers pass through `className`. Passing `max-w-3xl` in
 * `className` looks like it works but doesn't: it collides with the base `max-w-6xl` at equal
 * specificity, and Tailwind emits the larger utility later, so the override silently lost. Every
 * article and doc body on the site was rendering at a ~130-character measure because of it.
 */
export function Container({
  children,
  className,
  width = 'default',
  reveal = false,
}: ContainerProps) {
  return (
    <div
      data-reveal={reveal ? '' : undefined}
      className={clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', WIDTHS[width], className)}
    >
      {children}
    </div>
  )
}
