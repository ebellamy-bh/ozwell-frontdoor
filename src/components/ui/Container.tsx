import clsx from 'clsx'
import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Layout wrapper — max width + horizontal padding, used by every section. */
export function Container({ children, className }: ContainerProps) {
  return <div className={clsx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
