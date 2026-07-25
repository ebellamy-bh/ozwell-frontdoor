import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Container } from '@/components/ui/Container'

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
 * Previously this route reused `DocsHub`, which printed "Browse by Topic" above a heading repeating
 * the category name that the hero had already shown — the same words three times — then a bare list
 * of links with no way onward.
 */
export default function DocsCategory({ name, description, docs, siblings }: DocsCategoryProps) {
  return (
    <section className="bg-white py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/docs/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 underline-offset-2 hover:underline"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            All Help Center topics
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
          <div>
            <h2 className="text-2xl font-bold text-ozwell-ink-strong">
              {docs.length} article{docs.length === 1 ? '' : 's'} in {name}
            </h2>
            {description ? (
              <p className="mt-3 max-w-2xl leading-relaxed text-ozwell-slate">{description}</p>
            ) : null}

            <ul className="mt-8 space-y-3">
              {docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/docs/${doc.slug}/`}
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
                          {doc.title}
                        </p>
                        {doc.excerpt ? (
                          <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-ozwell-slate">
                            {doc.excerpt}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {siblings.length > 0 ? (
            <aside>
              <h2 className="text-xs font-bold uppercase tracking-widest text-ozwell-slate">
                Other topics
              </h2>
              <ul className="mt-4 space-y-1">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/docs-category/${sibling.slug}/`}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-[15px] text-ozwell-ink transition hover:bg-ozwell-mist hover:text-primary-700"
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
      </Container>
    </section>
  )
}
