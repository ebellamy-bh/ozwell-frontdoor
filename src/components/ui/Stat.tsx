import clsx from 'clsx'

export interface StatItem {
  /** The number itself — kept short enough to read at display size. */
  value: string
  label: string
  /** Attribution. Every claim on the page is sourced. */
  source?: string
  sourceHref?: string
}

interface StatProps extends StatItem {
  onDark?: boolean
  className?: string
}

/**
 * A single sourced figure. Marketing stats without attribution read as invented,
 * which is the opposite of what a clinical audience needs — so the citation is
 * part of the component rather than something a caller can forget.
 */
export default function Stat({ value, label, source, sourceHref, onDark, className }: StatProps) {
  return (
    <div className={clsx('flex flex-col', className)}>
      <p
        className={clsx(
          'font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl',
          onDark ? 'text-white' : 'text-primary-700'
        )}
      >
        {value}
      </p>
      <p
        className={clsx(
          'mt-3 text-[15px] leading-relaxed',
          onDark ? 'text-white/85' : 'text-ozwell-slate'
        )}
      >
        {label}
      </p>
      {source ? (
        <p className={clsx('mt-2 text-xs', onDark ? 'text-white/60' : 'text-ozwell-slate/80')}>
          {sourceHref ? (
            <a href={sourceHref} className="underline decoration-dotted underline-offset-2">
              {source}
            </a>
          ) : (
            source
          )}
        </p>
      ) : null}
    </div>
  )
}
