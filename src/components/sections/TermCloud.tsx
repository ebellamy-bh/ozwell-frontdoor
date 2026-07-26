import Link from 'next/link'
import Section from '@/components/ui/Section'
import type { Term } from '@/lib/content'

interface TermCloudProps {
  title: string
  /** Archive root, e.g. `/blog/tag` — the slug is appended with a trailing slash. */
  basePath: string
  terms: Term[]
  /** So two of these can sit next to each other without becoming one mist slab. */
  tone?: 'white' | 'mist'
}

/**
 * Sibling-term links at the foot of an archive.
 *
 * Archives that only link back to their own posts are crawl dead ends, which is
 * how the Help Center categories used to behave before `DocsCategory` grew a
 * sibling list. Post counts are shown because a term with one post and a term with
 * a dozen deserve different expectations from a reader.
 */
export default function TermCloud({ title, basePath, terms, tone = 'mist' }: TermCloudProps) {
  if (terms.length === 0) return null

  return (
    <Section tone={tone} spacing="sm">
      <h2 className="text-2xl font-bold text-ozwell-ink-strong">{title}</h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {terms.map((term) => (
          <li key={term.slug}>
            <Link
              href={`${basePath}/${term.slug}/`}
              className="flex items-center gap-2 rounded-full border border-ozwell-border bg-white px-4 py-2 text-[15px] font-semibold text-ozwell-ink transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              {term.name}
              <span className="text-sm font-normal text-ozwell-slate">{term.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
