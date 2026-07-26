import Link from 'next/link'
import clsx from 'clsx'
import { FileText, ArrowRight } from 'lucide-react'

export interface DocListItem {
  slug: string
  title: string
  excerpt?: string
  /** Small label under the excerpt — the category, on search results. */
  meta?: string
}

interface DocListProps {
  docs: DocListItem[]
  className?: string
}

/**
 * A list of Help Center articles as cards.
 *
 * The same list markup was written three times — in the hub, the category page,
 * and the search results — with three different card treatments, so identical
 * content looked different depending on how you arrived at it.
 */
export default function DocList({ docs, className }: DocListProps) {
  return (
    <ul className={clsx('grid gap-3 sm:grid-cols-2', className)}>
      {docs.map((doc) => (
        <li key={doc.slug}>
          <Link
            href={`/docs/${doc.slug}/`}
            className="group flex h-full items-start gap-3 rounded-2xl border border-ozwell-border bg-white p-5 transition-[box-shadow,border-color] hover:border-primary-300 hover:shadow-card"
          >
            <FileText
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-primary-600"
            />
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-snug text-ozwell-ink-strong group-hover:text-primary-700">
                {doc.title}
              </p>
              {doc.excerpt ? (
                <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-ozwell-slate">
                  {doc.excerpt}
                </p>
              ) : null}
              {doc.meta ? (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ozwell-slate">
                  {doc.meta}
                </p>
              ) : null}
            </div>
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-ozwell-border transition-all group-hover:translate-x-0.5 group-hover:text-primary-600 motion-reduce:transform-none"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
