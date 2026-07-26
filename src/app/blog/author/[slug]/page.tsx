import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { collectionSchema, personSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import BlogGrid from '@/components/sections/BlogGrid'
import Section from '@/components/ui/Section'
import { archiveRobots, authorsWithPosts, getAuthor, getPostsByAuthor } from '@/lib/content'
import { toPostCards } from '@/data/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return authorsWithPosts.map((a) => ({ slug: a.slug }))
}

function describe(name: string, description: string, count: number): string {
  if (description) return description
  return `${count} ${count === 1 ? 'post' : 'posts'} by ${name} on the Ozwell blog, covering AI in clinical documentation, product releases, and healthcare technology research.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) return {}
  const posts = getPostsByAuthor(author.slug)
  return createMetadata({
    title: `${author.name} — The Ozwell Observer`,
    description: describe(author.name, author.description, posts.length),
    path: `/blog/author/${author.slug}/`,
    /**
     * Author pages would ideally always be indexable — they're the site's clearest
     * experience signal and the one place a byline becomes a real entity. But the
     * migration carried no bios across, so right now each one is a name, an avatar,
     * and a single post card. Writing the bios into WordPress and re-running
     * `pnpm migrate:wp` is most of what these pages need to earn indexing.
     */
    robots: archiveRobots(posts.length),
  })
}

/**
 * Author archive.
 *
 * Bylines previously existed only as a `Person` nested inside each `BlogPosting`,
 * so the same writer was a fresh anonymous node on every post with no URL to be a
 * consistent entity at. Named authors with real bios are also the clearest
 * experience signal a site like this has, and they were invisible.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()

  const posts = getPostsByAuthor(author.slug)
  const description = describe(author.name, author.description, posts.length)
  const path = `/blog/author/${author.slug}/`

  return (
    <>
      <JsonLd
        data={personSchema({
          name: author.name,
          description: author.description || undefined,
          image: author.avatar,
          path,
        })}
      />
      <JsonLd
        data={collectionSchema({
          name: `Posts by ${author.name}`,
          description,
          path,
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` })),
        })}
      />
      {/* `PageHero` → `Breadcrumbs` already emits the `BreadcrumbList`. */}
      <PageHero
        eyebrow="Author"
        title={author.name}
        breadcrumbs={[{ name: 'Blog', href: '/blog/' }, { name: author.name }]}
      />

      {author.avatar || author.description ? (
        <Section spacing="sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt=""
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            ) : null}
            <div>
              <h2 className="text-2xl font-bold text-ozwell-ink-strong">About {author.name}</h2>
              {author.description ? (
                <p className="mt-3 max-w-2xl leading-relaxed text-ozwell-slate">
                  {author.description}
                </p>
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      <BlogGrid
        title={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'} by ${author.name}`}
        posts={toPostCards(posts)}
        tone={author.avatar || author.description ? 'mist' : 'white'}
        showTitle
      />
    </>
  )
}
