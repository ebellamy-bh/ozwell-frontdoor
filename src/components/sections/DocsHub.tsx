import Link from 'next/link'
import { FolderOpen, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import IconBadge from '@/components/ui/IconBadge'
import DocList from '@/components/sections/DocList'

interface DocsHubProps {
  featured: {
    name: string
    docs: Array<{ slug: string; title: string }>
  }
  categories: Array<{
    slug: string
    name: string
    description: string
    docs: Array<{ slug: string; title: string }>
  }>
}

/**
 * Help Center hub: a shortlist of popular articles, then the topic grid.
 *
 * The two used to sit under a single "Browse by Topic" H2, which made the
 * shortlist look like a topic — and it listed the same articles as the "Getting
 * Started" card directly beneath it, so the page appeared to repeat itself. They
 * are two different things and are now two labelled sections.
 */
export default function DocsHub({ featured, categories }: DocsHubProps) {
  return (
    <Section tone="mist" spacing="md">
      <h2 className="text-2xl font-bold text-ozwell-ink-strong">{featured.name}</h2>
      <DocList
        className="mt-6"
        docs={featured.docs.map((doc) => ({ slug: doc.slug, title: doc.title }))}
      />

      {categories.length > 0 ? (
        <>
          <h2 className="mt-16 text-2xl font-bold text-ozwell-ink-strong">Browse by topic</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Card key={cat.slug} as="li" tone="plain" padding="md" interactive>
                <div className="flex items-start justify-between gap-3">
                  <IconBadge icon={FolderOpen} size="sm" />
                  <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">
                    {cat.docs.length} article{cat.docs.length === 1 ? '' : 's'}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">
                  <Link
                    href={`/docs-category/${cat.slug}/`}
                    className="text-ozwell-ink-strong transition-colors hover:text-primary-700"
                  >
                    {cat.name}
                  </Link>
                </h3>
                {cat.description ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-ozwell-slate">
                    {cat.description}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2 border-t border-ozwell-border pt-4">
                  {cat.docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}/`}
                        className="flex items-start gap-1.5 text-[15px] leading-snug text-primary-700 underline-offset-2 hover:underline"
                      >
                        <ArrowRight
                          size={15}
                          strokeWidth={2.5}
                          className="mt-1 shrink-0"
                          aria-hidden="true"
                        />
                        {doc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>
        </>
      ) : null}
    </Section>
  )
}
