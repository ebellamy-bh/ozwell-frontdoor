import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Calendar, Clock, RefreshCw, Rss } from 'lucide-react'
import { createMetadata, SITE_URL, SITE_NAME } from '@/lib/metadata'
import { Container } from '@/components/ui/Container'
import ShareLinks from '@/components/ui/ShareLinks'
import JsonLd from '@/components/sections/JsonLd'
import ArticleBody from '@/components/sections/ArticleBody'
import BlogGrid from '@/components/sections/BlogGrid'
import CTABand from '@/components/sections/CTABand'
import siteConfig from '@/data/site.json'
import {
  posts,
  getPost,
  getRelatedPosts,
  getAuthor,
  getAdjacentPosts,
  formatDate,
  metaDescription,
  wordCount,
  readingTime,
} from '@/lib/content'

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
  const base = createMetadata({
    title: post.title,
    description: post.excerpt || metaDescription(post.content),
    path: `/blog/${post.slug}/`,
    openGraph: {
      type: 'article',
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 915,
              height: 515,
              alt: post.featuredImageAlt || post.title,
            },
          ]
        : undefined,
    },
  })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: post.authorName ? [post.authorName] : undefined,
      tags: post.tags,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const author = getAuthor(post.author)
  const { previous, next } = getAdjacentPosts(slug)
  const minutes = readingTime(post.content)
  const wasUpdated = post.modified && post.modified.slice(0, 10) !== post.date.slice(0, 10)

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Person',
      name: post.authorName ?? SITE_NAME,
      ...(author?.avatar && { image: author.avatar }),
      ...(author?.description && { description: author.description }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/Ozwell-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}/` },
    wordCount: wordCount(post.content),
    ...(post.categories.length > 0 && { articleSection: post.categories[0] }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(', ') }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}/`,
      },
    ],
  }

  return (
    <article>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="bg-ozwell-mist pb-8 pt-14">
        <Container width="prose">
          {/* Breadcrumb / back link */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 underline-offset-2 hover:underline"
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
              Back to Blog
            </Link>
          </nav>

          {/* Category badges */}
          {post.categories.length > 0 ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories
                .filter((c) => c !== 'uncategorized')
                .map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700"
                  >
                    {cat.replace(/-/g, ' ')}
                  </span>
                ))}
            </div>
          ) : null}

          <h1 className="text-3xl font-bold leading-tight text-ozwell-ink sm:text-4xl">
            {post.title}
          </h1>

          {/* Byline: author avatar, dates, reading time */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ozwell-slate">
            {post.authorName ? (
              <span className="flex items-center gap-2">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : null}
                <span className="font-medium text-ozwell-ink">{post.authorName}</span>
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Calendar size={15} strokeWidth={2} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            {wasUpdated ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw size={15} strokeWidth={2} aria-hidden="true" />
                Updated {formatDate(post.modified)}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Clock size={15} strokeWidth={2} aria-hidden="true" />
              {minutes} min read
            </span>
          </div>

          <div className="mt-5">
            <ShareLinks title={post.title} slug={post.slug} />
          </div>

          {/* The featured image is intentionally not rendered here. Our header art has the post
              title, category label, and a decorative "learn more" button baked into the artwork, so
              inlining it directly under the real H1 and category chip stuttered all three — and cost
              ~600 KB to do it. The image is still used for Open Graph cards and the index grid,
              where it's the only place the title appears. Restore this once we have header art
              without type burned in. */}
        </Container>
      </section>

      <ArticleBody html={post.content} />

      {/* Readers who finish a 9-minute article had nowhere to go — no conversion point existed
          between the header and the footer. */}
      <CTABand title="See what Ozwell can do for your practice" cta={siteConfig.ctas.trial} />

      {/* Prev / next navigation */}
      <section className="border-t border-gray-100 bg-white py-10">
        <Container width="prose">
          <h2 className="sr-only">More posts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}/`}
                className="group rounded-xl border border-gray-100 p-5 transition-colors hover:border-primary-200 hover:bg-ozwell-mist"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ozwell-slate">
                  <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-2 block font-semibold text-ozwell-ink group-hover:text-primary-600">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}/`}
                className="group rounded-xl border border-gray-100 p-5 text-right transition-colors hover:border-primary-200 hover:bg-ozwell-mist"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wide text-ozwell-slate">
                  Next
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="mt-2 block font-semibold text-ozwell-ink group-hover:text-primary-600">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-ozwell-mist py-4">
        <Container>
          <div className="flex items-center justify-between pt-8">
            <h2 className="text-center text-2xl font-bold text-ozwell-ink">Related Posts</h2>
            <a
              href="/blog/rss.xml"
              className="flex items-center gap-1.5 text-sm font-medium text-primary-600 underline-offset-2 hover:underline"
            >
              <Rss size={16} strokeWidth={2} aria-hidden="true" />
              RSS feed
            </a>
          </div>
        </Container>
      </section>
      <BlogGrid title="Related posts" posts={related} />
    </article>
  )
}
