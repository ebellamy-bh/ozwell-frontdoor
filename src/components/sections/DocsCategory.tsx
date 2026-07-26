import Link from 'next/link'
import Section from '@/components/ui/Section'
import DocList from '@/components/sections/DocList'

interface DocsCategoryProps {
  name: string
  description: string
  docs: Array<{ slug: string; title: string; excerpt: string }>
  /** Other categories, so this page isn't a dead end. */
  siblings: Array<{ slug: string; name: string; count: number }>
}

/**
 * A single Help Center category.
 *
 * This route used to reuse `DocsHub` verbatim, so it rendered a hero with the
 * category name, then "Browse by Topic", then the category name again, then two
 * links — the same words three times, with no descriptions and no way onward.
 */
export default function DocsCategory({ name, description, docs, siblings }: DocsCategoryProps) {
  return (
    <Section spacing="md">
      <div className="grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold text-ozwell-ink-strong">
            {docs.length} article{docs.length === 1 ? '' : 's'} in {name}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl leading-relaxed text-ozwell-slate">{description}</p>
          ) : null}
          <DocList className="mt-8 sm:grid-cols-1" docs={docs} />
        </div>

        {siblings.length > 0 ? (
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ozwell-slate">
              Other topics
            </h2>
            <ul className="mt-4 space-y-1">
              {siblings.map((sibling) => (
                <li key={sibling.slug}>
                  <Link
                    href={`/docs-category/${sibling.slug}/`}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] text-ozwell-ink transition hover:bg-ozwell-mist hover:text-primary-700"
                  >
                    {sibling.name}
                    <span className="text-xs text-ozwell-slate">{sibling.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </Section>
  )
}
