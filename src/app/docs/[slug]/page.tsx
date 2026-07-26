import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, LifeBuoy } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { articleSchema } from '@/lib/schema'
import { withHeadingIds } from '@/lib/toc'
import { Container } from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import TableOfContents from '@/components/ui/TableOfContents'
import JsonLd from '@/components/sections/JsonLd'
import ArticleBody from '@/components/sections/ArticleBody'
import DocsSidebar from '@/components/sections/DocsSidebar'
import { docs, getDoc, getDocCategory, getDocsInCategory, metaDescription } from '@/lib/content'
import { docsHub } from '@/data/docs'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return createMetadata({
    title: doc.title,
    description: metaDescription(doc.content),
    path: `/docs/${doc.slug}/`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  const category = doc.categories.length ? getDocCategory(doc.categories[0]) : undefined

  // Previous/next within the category, so readers can work through a topic in order.
  const siblings = category ? getDocsInCategory(category.slug) : []
  const position = siblings.findIndex((d) => d.slug === doc.slug)
  const previous = position > 0 ? siblings[position - 1] : undefined
  const next = position >= 0 && position < siblings.length - 1 ? siblings[position + 1] : undefined

  const { html, headings } = withHeadingIds(doc.content)

  return (
    <>
      <JsonLd
        data={articleSchema({
          // TechArticle rather than BlogPosting: these are procedural docs, and the
          // distinction is what lets search engines treat them as reference material.
          type: 'TechArticle',
          title: doc.title,
          description: metaDescription(doc.content),
          path: `/docs/${doc.slug}/`,
          datePublished: doc.date,
          dateModified: doc.modified,
          section: category?.name,
        })}
      />

      <section className="bg-ozwell-mist pb-8 pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Help Center', href: '/docs/' },
              ...(category
                ? [{ name: category.name, href: `/docs-category/${category.slug}/` }]
                : []),
              { name: doc.title },
            ]}
          />
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-ozwell-ink-strong sm:text-4xl">
            {doc.title}
          </h1>
        </Container>
      </section>

      {/* The sidebar keeps the whole Help Center reachable — previously a breadcrumb
          was the only navigation on an article page. */}
      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            <DocsSidebar categories={docsHub} currentSlug={doc.slug} />

            {/* Capped independently of the grid column: 1fr next to a 240px sidebar
                still leaves an ~81-character measure, past comfortable reading. */}
            <div className="min-w-0 max-w-[72ch]">
              <TableOfContents headings={headings} className="mb-9" />
              <ArticleBody html={html} bare />

              {previous || next ? (
                <nav
                  aria-label="More in this topic"
                  className="mt-12 grid gap-4 border-t border-ozwell-border pt-8 sm:grid-cols-2"
                >
                  {previous ? (
                    <Link
                      href={`/docs/${previous.slug}/`}
                      className="group rounded-xl border border-ozwell-border p-5 transition hover:border-primary-300 hover:bg-ozwell-mist"
                    >
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ozwell-slate">
                        <ArrowLeft size={14} strokeWidth={2.5} aria-hidden="true" />
                        Previous
                      </span>
                      <span className="mt-2 block font-semibold text-ozwell-ink-strong group-hover:text-primary-700">
                        {previous.title}
                      </span>
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  {next ? (
                    <Link
                      href={`/docs/${next.slug}/`}
                      className="group rounded-xl border border-ozwell-border p-5 text-right transition hover:border-primary-300 hover:bg-ozwell-mist"
                    >
                      <span className="flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wide text-ozwell-slate">
                        Next
                        <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span className="mt-2 block font-semibold text-ozwell-ink-strong group-hover:text-primary-700">
                        {next.title}
                      </span>
                    </Link>
                  ) : null}
                </nav>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-ozwell-mist p-6 ring-1 ring-ozwell-border">
                <LifeBuoy
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="shrink-0 text-primary-600"
                />
                <p className="text-[15px] text-ozwell-ink">
                  Still stuck?{' '}
                  <a
                    href="mailto:info@ozwell.ai"
                    className="font-semibold text-primary-700 underline underline-offset-2"
                  >
                    Email our team
                  </a>{' '}
                  and we&apos;ll help directly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
