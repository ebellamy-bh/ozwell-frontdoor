import Link from 'next/link'
import { FolderOpen, FileText } from 'lucide-react'
import { Container } from '@/components/ui/Container'

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

/** Help Center hub — featured category list plus topic cards with folder icons and count badges. */
export default function DocsHub({ featured, categories }: DocsHubProps) {
  return (
    <section className="bg-white py-14">
      <Container>
        {/* The old "Browse by Topic" H2 wrapped both the shortlist and the topic grid, which made
            the shortlist look like a topic. They're two different things, so they're two sections. */}
        <h2 className="text-2xl font-bold text-ozwell-ink">{featured.name}</h2>
        <ul className="mt-5 space-y-4">
          {featured.docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}/`}
                className="inline-flex items-center gap-2 text-primary-700 underline-offset-2 hover:underline"
              >
                <FileText size={16} strokeWidth={1.75} aria-hidden="true" />
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* All topics as cards */}
        {categories.length > 0 ? (
          <>
            <h2 className="mt-14 text-2xl font-bold text-ozwell-ink">Browse by topic</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="bg-white p-7 shadow-[0_0_40px_10px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center justify-between border-b-2 border-primary-500 pb-4">
                    <h3>
                      <Link
                        href={`/docs-category/${cat.slug}/`}
                        className="flex items-center gap-3 text-xl font-medium text-ozwell-ink transition-colors hover:text-primary-600"
                      >
                        <FolderOpen
                          size={26}
                          strokeWidth={1.5}
                          className="text-ozwell-ink"
                          aria-hidden="true"
                        />
                        {cat.name}
                      </Link>
                    </h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500/10 text-sm font-semibold text-primary-700">
                      {cat.docs.length}
                    </span>
                  </div>
                  {cat.description ? (
                    <p className="mt-4 text-[15px] leading-relaxed text-ozwell-slate">
                      {cat.description}
                    </p>
                  ) : null}
                  <ul className="mt-4 space-y-3">
                    {cat.docs.map((doc) => (
                      <li key={doc.slug}>
                        <Link
                          href={`/docs/${doc.slug}/`}
                          className="flex items-start gap-2 text-[15px] text-primary-700 underline-offset-2 hover:underline"
                        >
                          <FileText
                            size={16}
                            strokeWidth={1.75}
                            className="mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </section>
  )
}
