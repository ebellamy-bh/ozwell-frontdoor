import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Calendar, Clock, RefreshCw } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { articleSchema } from '@/lib/schema'
import { withHeadingIds } from '@/lib/toc'
import { Container } from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ShareLinks from '@/components/ui/ShareLinks'
import TableOfContents from '@/components/ui/TableOfContents'
import JsonLd from '@/components/sections/JsonLd'
import ArticleBody from '@/components/sections/ArticleBody'
import BlogGrid from '@/components/sections/BlogGrid'
import CTASection from '@/components/sections/CTASection'
import {
  posts,
  tags,
  getPost,
  getRelatedPosts,
  getAuthor,
  getAdjacentPosts,
  displayCategories,
  termName,
  formatDate,
  metaDescription,
  wordCount,
  readingTime,
} from '@/lib/content'
import { toPostCards } from '@/data/blog'

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
    keywords: post.tags.length ? post.tags.map((t) => t.replace(/-/g, ' ')) : undefined,
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

  // Anchors and an outline for bodies that run to 20 headings.
  const { html, headings } = withHeadingIds(post.content)

  const related = toPostCards(getRelatedPosts(slug))

  // Only the tags that resolve to a real archive, in the order the term list holds.
  const postTags = tags.filter((t) => post.tags.includes(t.slug))

  return (
    <article>
      <JsonLd
        data={articleSchema({
          type: 'BlogPosting',
          title: post.title,
          description: post.excerpt || metaDescription(post.content),
          path: `/blog/${post.slug}/`,
          datePublished: post.date,
          dateModified: post.modified,
          image: post.featuredImage,
          authorName: post.authorName,
          authorDescription: author?.description,
          authorImage: author?.avatar,
          wordCount: wordCount(post.content),
          section: post.categories.find((c) => c !== 'uncategorized'),
          keywords: post.tags,
        })}
      />

      <section className="bg-ozwell-mist pb-10 pt-10">
        <Container width="prose">
          <Breadcrumbs
            items={[{ name: 'Blog', href: '/blog/' }, { name: post.title }]}
            className="mb-7"
          />

          {/* Chips are links now: they were the one place a post named its own
              topic, and they went nowhere. */}
          {displayCategories(post).length > 0 ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {displayCategories(post).map((cat) => (
                <Link
                  key={cat}
                  href={`/blog/category/${cat}/`}
                  className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-800 transition-colors hover:bg-primary-200"
                >
                  {termName(cat)}
                </Link>
              ))}
            </div>
          ) : null}

          <h1 className="text-3xl font-extrabold leading-tight text-ozwell-ink-strong sm:text-[2.5rem]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{post.excerpt}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ozwell-slate">
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
                {/* Only linked when the author has an archive to land on. */}
                {author ? (
                  <Link
                    href={`/blog/author/${author.slug}/`}
                    className="font-semibold text-ozwell-ink hover:text-primary-700"
                  >
                    {post.authorName}
                  </Link>
                ) : (
                  <span className="font-semibold text-ozwell-ink">{post.authorName}</span>
                )}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Calendar size={15} strokeWidth={2} aria-hidden="true" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {wasUpdated ? (
              <span className="flex items-center gap-1.5">
                <RefreshCw size={15} strokeWidth={2} aria-hidden="true" />
                Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time>
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Clock size={15} strokeWidth={2} aria-hidden="true" />
              {minutes} min read
            </span>
          </div>

          <div className="mt-6 border-t border-ozwell-border pt-5">
            <ShareLinks title={post.title} slug={post.slug} />
          </div>

          {/* The featured image is intentionally not rendered here. Our header art
              has the post title, the category label, and a decorative "learn more"
              button baked into the artwork, so inlining it directly under the real
              H1 and category chip stuttered all three. It is still used for Open
              Graph cards and the index grid, where it's the only place the title
              appears. Restore this once we have header art without type burned in. */}
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container width="prose">
          <TableOfContents headings={headings} className="mb-10" />
          <ArticleBody html={html} bare />

          {/* Tags were carried through the migration, used for `keywords` and the
              `BlogPosting` graph, and then never shown — so a reader had no way to
              find the other posts on the same subject. Only tags with an archive
              behind them are linked; the WordPress theme's demo tags have none. */}
          {postTags.length > 0 ? (
            <div className="mt-12 border-t border-ozwell-border pt-7">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ozwell-slate">
                Filed under
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {postTags.map((tag) => (
                  <li key={tag.slug}>
                    <Link
                      href={`/blog/tag/${tag.slug}/`}
                      className="inline-block rounded-full border border-ozwell-border px-3.5 py-1.5 text-sm font-medium text-ozwell-ink transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                    >
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>

      {/* Readers who finish a 9-minute article had nowhere to go — there was no
          conversion point between the header and the footer. */}
      <CTASection
        title="See what Ozwell can do for your practice"
        description="Start free on the web, no install required."
      />

      <section className="border-t border-ozwell-border bg-white py-10">
        <Container width="prose">
          <h2 className="sr-only">More posts</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}/`}
                className="group rounded-xl border border-ozwell-border p-5 transition-colors hover:border-primary-300 hover:bg-ozwell-mist"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ozwell-slate">
                  <ArrowLeft size={14} strokeWidth={2.5} aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-2 block font-semibold text-ozwell-ink-strong group-hover:text-primary-700">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}/`}
                className="group rounded-xl border border-ozwell-border p-5 text-right transition-colors hover:border-primary-300 hover:bg-ozwell-mist"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-bold uppercase tracking-wide text-ozwell-slate">
                  Next
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="mt-2 block font-semibold text-ozwell-ink-strong group-hover:text-primary-700">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <BlogGrid title="Related posts" posts={related} tone="mist" showTitle />
    </article>
  )
}
