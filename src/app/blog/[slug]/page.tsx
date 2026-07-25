import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { Container } from '@/components/ui/Container'
import ArticleBody from '@/components/sections/ArticleBody'
import BlogGrid from '@/components/sections/BlogGrid'
import { posts, getPost, getRelatedPosts, formatDate, metaDescription } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return createMetadata({
    title: post.title,
    description: post.excerpt || metaDescription(post.content),
    path: `/blog/${post.slug}/`,
    openGraph: {
      type: 'article',
      images: post.featuredImage ? [{ url: post.featuredImage, width: 915, height: 515, alt: post.featuredImageAlt || post.title }] : undefined,
    },
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    dateFormatted: formatDate(p.date),
    authorName: p.authorName,
    featuredImage: p.featuredImage,
    featuredImageAlt: p.featuredImageAlt,
  }))

  return (
    <>
      <section className="bg-ozwell-mist pb-8 pt-14">
        <Container className="max-w-3xl">
          <p className="text-sm text-ozwell-slate">
            {formatDate(post.date)}
            {post.authorName ? ` · ${post.authorName}` : ''}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ozwell-ink sm:text-4xl">{post.title}</h1>
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              width={915}
              height={515}
              priority
              className="mt-8 w-full rounded-2xl shadow-md"
            />
          ) : null}
        </Container>
      </section>
      <ArticleBody html={post.content} />
      <section className="bg-ozwell-mist py-4">
        <Container>
          <h2 className="pt-8 text-center text-2xl font-bold text-ozwell-ink">Related Posts</h2>
        </Container>
      </section>
      <BlogGrid title="Related posts" posts={related} />
    </>
  )
}
