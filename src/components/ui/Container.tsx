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
}

/**
 * Layout wrapper — max width + horizontal padding, used by every section.
 *
 * Width is a prop rather than something callers pass through `className`. Passing `max-w-3xl` in
 * `className` looks like it works but doesn't: it collides with the base `max-w-6xl` at equal
 * specificity, and Tailwind emits the larger utility later, so the override silently lost. Every
 * article and doc body on the site was rendering at a ~130-character measure because of it.
 *
 * (A `reveal` prop lived here briefly, driving a scroll-reveal observer. Both are gone — see the
 * note in `globals.css` for why reveal-on-scroll was removed rather than fixed.)
 */
export function Container({ children, className, width = 'default' }: ContainerProps) {
  return (
    <div className={clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', WIDTHS[width], className)}>
      {children}
    </div>
  )
}
