import clsx from 'clsx'
import { List } from 'lucide-react'
import type { Heading } from '@/lib/toc'

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

/**
 * In-page outline for long articles.
 *
 * Plain anchors, no JavaScript and no scroll-spy: the smooth-scroll and
 * `scroll-padding-top` in `globals.css` handle the movement, and a reader on a
 * 9-minute article mostly wants to see the shape of it and jump once.
 */
export default function TableOfContents({ headings, className }: TableOfContentsProps) {
  if (headings.length < 3) return null

  return (
    <nav
      aria-labelledby="toc-heading"
      className={clsx('rounded-2xl border border-ozwell-border bg-ozwell-mist p-5', className)}
    >
      <h2
        id="toc-heading"
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ozwell-slate"
      >
        <List size={14} strokeWidth={2.5} aria-hidden="true" />
        On this page
      </h2>
      <ol className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block leading-snug text-ozwell-ink underline-offset-2 hover:text-primary-700 hover:underline',
                heading.level === 3 ? 'text-[14px] text-ozwell-slate' : 'text-[15px] font-medium'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
