import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import DocsCategory from '@/components/sections/DocsCategory'
import { docCategories, getDocCategory, getDocsInCategory } from '@/lib/content'
import { docsSearchIndex } from '@/data/docs'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return docCategories.map((c) => ({ slug: c.slug }))
}

/**
 * WordPress left every term description blank, and the old fallback —
 * "Ozwell Help Center articles in the Accounts category." — was 53 characters of
 * nothing. Listing the actual article titles gives a search result something to
 * match against and tells a reader what's inside before they click.
 */
function describe(name: string, description: string, titles: string[]): string {
  if (description) return description
  if (titles.length === 0) return `Ozwell Help Center articles about ${name.toLowerCase()}.`
  return `${name} guides in the Ozwell Help Center: ${titles.join('; ')}.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getDocCategory(slug)
  if (!category) return {}
  const titles = getDocsInCategory(category.slug).map((d) => d.title)
  return createMetadata({
    title: `${category.name} — Ozwell Help Center`,
    description: describe(category.name, category.description, titles),
    path: `/docs-category/${category.slug}/`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const category = getDocCategory(slug)
  if (!category) notFound()

  // Reuse the search index's plain-text excerpts rather than re-stripping HTML here.
  const docs = getDocsInCategory(category.slug).map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    excerpt: docsSearchIndex.find((entry) => entry.slug === doc.slug)?.excerpt ?? '',
  }))

  const siblings = docCategories
    .filter((c) => c.slug !== category.slug)
    .map((c) => ({ slug: c.slug, name: c.name, count: getDocsInCategory(c.slug).length }))

  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: `${category.name} — Ozwell Help Center`,
          description:
            category.description || `Ozwell Help Center articles in the ${category.name} category.`,
          path: `/docs-category/${category.slug}/`,
          items: docs.map((d) => ({ name: d.title, path: `/docs/${d.slug}/` })),
        })}
      />
      <PageHero
        eyebrow="Help Center"
        title={category.name}
        description={category.description || undefined}
        breadcrumbs={[{ name: 'Help Center', href: '/docs/' }, { name: category.name }]}
      />
      <DocsCategory
        name={category.name}
        description={category.description}
        docs={docs}
        siblings={siblings}
      />
    </>
  )
}
