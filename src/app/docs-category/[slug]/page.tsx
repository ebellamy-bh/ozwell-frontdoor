import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getDocCategory(slug)
  if (!category) return {}
  return createMetadata({
    title: `${category.name} — Help Center`,
    description:
      category.description || `Ozwell Help Center articles in the ${category.name} category.`,
    path: `/docs-category/${category.slug}/`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const category = getDocCategory(slug)
  if (!category) notFound()

  // Reuse the search index's plain-text excerpts rather than re-stripping the HTML here.
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
      <PageHero title={category.name} description={category.description || undefined} />
      <DocsCategory
        name={category.name}
        description={category.description}
        docs={docs}
        siblings={siblings}
      />
    </>
  )
}
