import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import TermCloud from '@/components/sections/TermCloud'
import { archiveRobots, categories, getCategory, getPostsInCategory } from '@/lib/content'
import { toPostCards } from '@/data/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

/**
 * WordPress left every term description blank, so the archive needs to describe
 * itself from what's actually filed under it. Naming the post titles gives a search
 * result something to match on and tells a reader what's inside before they click —
 * the same approach `/docs-category` already takes.
 */
function describe(name: string, description: string, titles: string[]): string {
  if (description) return description
  const lead = `${name} on the Ozwell blog — AI in clinical documentation, from the team building it.`
  return titles.length ? `${lead} Reading now: ${titles.join('; ')}.` : lead
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  const posts = getPostsInCategory(category.slug)
  return createMetadata({
    title: `${category.name} — The Ozwell Observer`,
    description: describe(
      category.name,
      category.description,
      posts.map((p) => p.title)
    ),
    path: `/blog/category/${category.slug}/`,
    robots: archiveRobots(posts.length),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const posts = getPostsInCategory(category.slug)
  const description = describe(
    category.name,
    category.description,
    posts.map((p) => p.title)
  )
  const path = `/blog/category/${category.slug}/`

  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: `${category.name} — The Ozwell Observer`,
          description,
          path,
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` })),
        })}
      />
      {/* `PageHero` → `Breadcrumbs` already emits the `BreadcrumbList`. */}
      <PageHero
        eyebrow="Category"
        title={category.name}
        description={category.description || undefined}
        breadcrumbs={[{ name: 'Blog', href: '/blog/' }, { name: category.name }]}
      />

      <BlogGrid
        title={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'} in ${category.name}`}
        posts={toPostCards(posts)}
        showTitle
      />

      <TermCloud
        title="Other categories"
        basePath="/blog/category"
        terms={categories.filter((c) => c.slug !== category.slug)}
      />
    </>
  )
}
