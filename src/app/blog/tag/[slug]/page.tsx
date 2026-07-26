import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import TermCloud from '@/components/sections/TermCloud'
import { archiveRobots, tags, getTag, getPostsWithTag } from '@/lib/content'
import { toPostCards } from '@/data/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return tags.map((t) => ({ slug: t.slug }))
}

function describe(name: string, titles: string[]): string {
  const lead = `Ozwell blog posts tagged ${name.toLowerCase()}.`
  return titles.length ? `${lead} ${titles.join('; ')}.` : lead
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = getTag(slug)
  if (!tag) return {}
  const posts = getPostsWithTag(tag.slug)
  return createMetadata({
    title: `${tag.name} — The Ozwell Observer`,
    description:
      tag.description ||
      describe(
        tag.name,
        posts.map((p) => p.title)
      ),
    path: `/blog/tag/${tag.slug}/`,
    keywords: [tag.name],
    robots: archiveRobots(posts.length),
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const tag = getTag(slug)
  if (!tag) notFound()

  const posts = getPostsWithTag(tag.slug)
  const description =
    tag.description ||
    describe(
      tag.name,
      posts.map((p) => p.title)
    )
  const path = `/blog/tag/${tag.slug}/`

  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: `Posts tagged ${tag.name}`,
          description,
          path,
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` })),
        })}
      />
      {/* `PageHero` → `Breadcrumbs` already emits the `BreadcrumbList`. */}
      <PageHero
        eyebrow="Tag"
        title={tag.name}
        description={tag.description || undefined}
        breadcrumbs={[{ name: 'Blog', href: '/blog/' }, { name: tag.name }]}
      />

      <BlogGrid
        title={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'} tagged ${tag.name}`}
        posts={toPostCards(posts)}
        showTitle
      />

      <TermCloud
        title="Other tags"
        basePath="/blog/tag"
        terms={tags.filter((t) => t.slug !== tag.slug)}
      />
    </>
  )
}
