import { Rss } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import TermCloud from '@/components/sections/TermCloud'
import Button from '@/components/ui/Button'
import { categories, tags } from '@/lib/content'
import { blogIndexPosts } from '@/data/blog'

const DESCRIPTION =
  'Release notes, real-world use cases, and industry research on AI in clinical documentation — how Ozwell fits into clinical workflows and what the evidence says about the documentation burden.'

export const metadata = createMetadata({
  title: 'The Ozwell Observer — AI in healthcare, from the clinic',
  description: DESCRIPTION,
  path: '/blog/',
  keywords: [
    'AI in healthcare blog',
    'clinical documentation research',
    'Ozwell release notes',
    'physician burnout research',
  ],
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: 'The Ozwell Observer',
          description: DESCRIPTION,
          path: '/blog/',
          items: blogIndexPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` })),
        })}
      />

      <PageHero
        eyebrow="Blog"
        title="The Ozwell Observer"
        description={DESCRIPTION}
        breadcrumbs={[{ name: 'Blog' }]}
      >
        <Button href="/blog/rss.xml" variant="inverse-outline" size="md" icon={Rss}>
          Subscribe via RSS
        </Button>
      </PageHero>

      {/* No category filter above the grid: with four posts, filtering to "Release
          Notes" would show exactly one, which is worse than showing everything. The
          archives are linked below instead — they exist mainly so the taxonomy is
          crawlable and every term has one canonical URL. */}
      <BlogGrid title="All posts" posts={blogIndexPosts} featureFirst />

      <TermCloud title="Browse by category" basePath="/blog/category" terms={categories} />
      <TermCloud title="Browse by tag" basePath="/blog/tag" terms={tags} tone="white" />
    </>
  )
}
