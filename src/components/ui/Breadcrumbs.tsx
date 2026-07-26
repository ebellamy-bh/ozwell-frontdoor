import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from '@/components/sections/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

export interface Crumb {
  name: string
  /** Omit on the current page — it renders as plain text. */
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

/**
 * Visible breadcrumb trail plus its `BreadcrumbList` JSON-LD, emitted together so
 * the two can't drift apart. Previously the schema existed only on blog posts
 * while the visible trail was hand-rolled differently on each inner page.
 *
 * "Home" is prepended here, so callers only pass the meaningful levels.
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }, ...items]

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ozwell-slate">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1
            return (
              <li key={crumb.name} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-ozwell-border"
                  />
                ) : null}
                {crumb.href && !last ? (
                  <Link
                    href={crumb.href}
                    className="font-medium text-primary-700 underline-offset-2 hover:underline"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  /* Truncated rather than wrapped: article titles are long and a
                     three-line breadcrumb pushes the H1 off a phone screen. */
                  <span aria-current="page" className="max-w-[16rem] truncate sm:max-w-md">
                    {crumb.name}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
