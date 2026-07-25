import { createMetadata } from '@/lib/metadata'
import BlogHero from '@/components/sections/BlogHero'
import BlogGrid from '@/components/sections/BlogGrid'
import RssBand from '@/components/sections/RssBand'
import { blogIndexPosts } from '@/data/blog'

export const metadata = createMetadata({
  title: 'Blog',
  description:
    'Insights on AI in healthcare, medical documentation, and Ozwell product updates from the BlueHive Health team.',
  path: '/blog/',
})

export default function Page() {
  return (
    <>
      <BlogHero
        title="The Ozwell Observer"
        description="Explore the latest release notes, real-world use cases, industry insights, and testimonials for Ozwell. Our informative articles highlight how Ozwell enhances clinical workflows, streamlines documentation, and automates repetitive tasks—saving valuable time while delivering actionable insights. Discover how AI-powered assistance can transform your practice today."
      />
      <BlogGrid title="All posts" posts={blogIndexPosts} />
      <RssBand />
    </>
  )
}
