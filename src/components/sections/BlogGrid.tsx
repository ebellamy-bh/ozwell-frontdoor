import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export interface PostCard {
  slug: string
  title: string
  excerpt: string
  date: string
  dateFormatted: string
  authorName: string | null
  featuredImage: string | null
  featuredImageAlt: string
  categories?: string[]
}

interface BlogGridProps {
  title: string
  posts: PostCard[]
  /**
   * Give the newest post a full-width card. Also tidies the grid: four posts split into one
   * feature plus a clean row of three instead of a row of three and an orphan.
   */
  featureFirst?: boolean
}

function CategoryChip({ category }: { category: string }) {
  return (
    <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm backdrop-blur">
      {category.replace(/-/g, ' ')}
    </span>
  )
}

function Meta({ post }: { post: PostCard }) {
  return (
    <p className="text-sm text-ozwell-slate">
      {post.dateFormatted}
      {post.authorName ? ` · ${post.authorName}` : ''}
    </p>
  )
}

/**
 * Card layout keeps one meta line in a fixed position for every post. Previously the category chip
 * sat above the date, so posts filed as `uncategorized` rendered no chip and their dates and titles
 * fell out of line with the rest of the row. The chip now overlays the image instead, where its
 * presence or absence can't shift anything below it.
 */
function Card({ post, feature = false }: { post: PostCard; feature?: boolean }) {
  const categories = post.categories?.filter(Boolean) ?? []

  return (
    <article
      className={
        'group flex h-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow hover:shadow-lg ' +
        (feature ? 'flex-col md:flex-row' : 'flex-col')
      }
    >
      <Link
        href={`/blog/${post.slug}/`}
        className={feature ? 'flex flex-col md:flex-row' : 'flex flex-1 flex-col'}
      >
        {post.featuredImage ? (
          <div className={'relative shrink-0 ' + (feature ? 'md:w-1/2' : '')}>
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              width={915}
              height={515}
              className={
                'w-full object-cover ' + (feature ? 'aspect-[16/9] md:h-full' : 'aspect-[16/9]')
              }
            />
            {categories.length > 0 ? (
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <CategoryChip key={cat} category={cat} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className={'flex flex-1 flex-col p-6 ' + (feature ? 'md:justify-center md:p-10' : '')}>
          {/* No image to overlay: fall back to an inline chip. */}
          {!post.featuredImage && categories.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-700"
                >
                  {cat.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          ) : null}

          <Meta post={post} />
          <h3
            className={
              'mt-2 font-bold text-ozwell-ink transition-colors group-hover:text-primary-600 ' +
              (feature ? 'text-2xl sm:text-3xl' : 'text-xl')
            }
          >
            {post.title}
          </h3>
          <p
            className={
              'mt-3 leading-relaxed text-ozwell-slate ' +
              (feature ? 'line-clamp-4' : 'line-clamp-3')
            }
          >
            {post.excerpt}
          </p>
          {/* mt-auto pins this to the bottom so it lines up across a row of uneven excerpts. */}
          <p className="mt-auto pt-4 font-semibold text-primary-600">Read more →</p>
        </div>
      </Link>
    </article>
  )
}

export default function BlogGrid({ title, posts, featureFirst = false }: BlogGridProps) {
  const [first, ...rest] = posts
  const feature = featureFirst ? first : undefined
  const grid = featureFirst ? rest : posts

  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="sr-only">{title}</h2>
        {feature ? (
          <div className="mb-10">
            <Card post={feature} feature />
          </div>
        ) : null}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
