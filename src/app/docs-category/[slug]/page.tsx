import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import DocsHub from '@/components/sections/DocsHub'
import { docCategories, getDocCategory, getDocsInCategory } from '@/lib/content'

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

  const hubCategory = {
    slug: category.slug,
    name: category.name,
    description: category.description,
    docs: getDocsInCategory(category.slug).map((d) => ({ slug: d.slug, title: d.title })),
  }

  return (
    <>
      <PageHero title={category.name} description={category.description || undefined} />
      <DocsHub featured={hubCategory} categories={[]} />
    </>
  )
}
