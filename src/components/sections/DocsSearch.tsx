'use client' // Client: controlled search input filtering the docs index

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { FileText, Search, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import type { DocSearchEntry } from '@/data/docs'

interface DocsSearchProps {
  index: DocSearchEntry[]
  /** The normal hub, shown whenever the query is empty. */
  children: ReactNode
}

/**
 * Search across every Help Center article. Every term in the query has to appear somewhere in the
 * title or body, so "reset password" and "password reset" behave the same; title matches sort above
 * body-only matches.
 */
export default function DocsSearch({ index, children }: DocsSearchProps) {
  const [query, setQuery] = useState('')
  const trimmed = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!trimmed) return []
    const terms = trimmed.split(/\s+/)
    return index
      .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
      .sort((a, b) => {
        const aTitle = terms.every((t) => a.title.toLowerCase().includes(t))
        const bTitle = terms.every((t) => b.title.toLowerCase().includes(t))
        if (aTitle !== bTitle) return aTitle ? -1 : 1
        return a.title.localeCompare(b.title)
      })
  }, [index, trimmed])

  return (
    <>
      <div className="bg-white pt-10">
        <Container>
          <div className="mx-auto max-w-2xl">
            <label htmlFor="docs-search" className="sr-only">
              Search the Help Center
            </label>
            <div className="relative">
              <Search
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ozwell-slate"
              />
              <input
                id="docs-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for an article — try “password” or “API”"
                autoComplete="off"
                className="w-full rounded-full border border-ozwell-border bg-white py-4 pl-12 pr-12 text-base text-ozwell-ink shadow-sm outline-none transition placeholder:text-ozwell-slate focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-ozwell-slate transition hover:bg-gray-50 hover:text-ozwell-ink"
                >
                  <X size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {trimmed ? (
        <section className="bg-white py-12" aria-live="polite">
          <Container>
            <p className="text-sm text-ozwell-slate">
              {results.length === 0
                ? 'No articles matched'
                : `${results.length} article${results.length === 1 ? '' : 's'} matched`}{' '}
              <span className="font-semibold text-ozwell-ink">“{query.trim()}”</span>
            </p>

            {results.length === 0 ? (
              <p className="mt-6 max-w-xl leading-relaxed text-ozwell-slate">
                Try a broader term, or{' '}
                <a
                  href="mailto:info@ozwell.ai"
                  className="text-primary-700 underline underline-offset-2"
                >
                  email us
                </a>{' '}
                and we&apos;ll help directly.
              </p>
            ) : (
              <ul className="mt-6 space-y-3">
                {results.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/docs/${entry.slug}/`}
                      className="group block rounded-2xl border border-ozwell-border p-5 transition hover:border-primary-500 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <FileText
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-primary-600"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-ozwell-ink group-hover:text-primary-700">
                            {entry.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-ozwell-slate">
                            {entry.excerpt}
                          </p>
                          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ozwell-slate">
                            {entry.category}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      ) : (
        children
      )}
    </>
  )
}
