'use client' // Client: controlled search input filtering the docs index

import { useMemo, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import Section from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import DocList from '@/components/sections/DocList'
import type { DocSearchEntry } from '@/data/docs'

interface DocsSearchProps {
  index: DocSearchEntry[]
  /** The normal hub, shown whenever the query is empty. */
  children: ReactNode
}

/**
 * Search across every Help Center article.
 *
 * Every term in the query has to appear somewhere in the title or body, so "reset
 * password" and "password reset" behave the same; title matches sort above
 * body-only matches. The whole corpus is a few KB of text, so this filters
 * instantly on the client with no search service involved.
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
      <div className="bg-ozwell-mist pb-2 pt-10">
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
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ozwell-slate transition hover:bg-primary-50 hover:text-ozwell-ink"
                >
                  <X size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="sr-only">Clear search</span>
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {trimmed ? (
        <Section tone="mist" spacing="sm">
          {/* The region announces its own result count, so a screen-reader user
              hears how many articles matched without leaving the input. */}
          <div aria-live="polite">
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
                  className="font-semibold text-primary-700 underline underline-offset-2"
                >
                  email us
                </a>{' '}
                and we&apos;ll help directly.
              </p>
            ) : (
              <DocList
                className="mt-6"
                docs={results.map((entry) => ({
                  slug: entry.slug,
                  title: entry.title,
                  excerpt: entry.excerpt,
                  meta: entry.category,
                }))}
              />
            )}
          </div>
        </Section>
      ) : (
        children
      )}
    </>
  )
}
