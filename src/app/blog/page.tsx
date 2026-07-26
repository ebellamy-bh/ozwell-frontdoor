import { Rss } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import Button from '@/components/ui/Button'
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

      {/* No category filter: with four posts, filtering to "Release Notes" would
          show exactly one, which is worse than showing everything. Add one when
          the archive is deep enough to need it. */}
      <BlogGrid title="All posts" posts={blogIndexPosts} featureFirst />
    </>
  )
}
