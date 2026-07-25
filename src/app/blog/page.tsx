import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import RssBand from '@/components/sections/RssBand'
import { blogIndexPosts } from '@/data/blog'

export const metadata = createMetadata({
  title: 'Blog',
  description: 'Insights on AI in healthcare, medical documentation, and Ozwell product updates from the BlueHive Health team.',
  path: '/blog/',
})

export default function Page() {
  return (
    <>
      <PageHero title="Blog" description="Insights on AI in healthcare, medical documentation, and Ozwell product updates." />
      <BlogGrid title="All posts" posts={blogIndexPosts} />
      <RssBand />
    </>
  )
}
