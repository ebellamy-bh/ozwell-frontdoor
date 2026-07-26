import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRight, Clock } from 'lucide-react'
import Section from '@/components/ui/Section'

export interface PostCard {
  slug: string
  title: string
  excerpt: string
  date: string
  dateFormatted: string
  readingMinutes: number
  authorName: string | null
  featuredImage: string | null
  featuredImageAlt: string
  categories?: string[]
}

interface BlogGridProps {
  title: string
  posts: PostCard[]
  /**
   * Give the newest post a full-width card. Also tidies the grid: four posts split
   * into one feature plus a clean row of three instead of a row of three and an
   * orphan on its own line.
   */
  featureFirst?: boolean
  tone?: 'white' | 'mist'
  /** Show the heading rather than hiding it — related-post rails need it visible. */
  showTitle?: boolean
}

function CategoryChip({ category, overlay }: { category: string; overlay?: boolean }) {
  return (
    <span
      className={clsx(
        'rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide',
        overlay
          ? 'bg-white/95 text-primary-700 shadow-sm backdrop-blur'
          : 'bg-primary-50 text-primary-700'
      )}
    >
      {category.replace(/-/g, ' ')}
    </span>
  )
}

/**
 * Card layout keeps one meta line in a fixed position for every post. The category
 * chip previously sat above the date, so posts filed as `uncategorized` rendered no
 * chip and their dates and titles fell out of line with the rest of the row. The
 * chip now overlays the image, where its presence or absence can't shift anything.
 */
function Card({ post, feature = false }: { post: PostCard; feature?: boolean }) {
  const categories = post.categories?.filter(Boolean) ?? []

  return (
    <article
      className={clsx(
        'group overflow-hidden rounded-2xl border border-ozwell-border bg-white shadow-card transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover motion-reduce:hover:translate-y-0',
        feature ? 'flex flex-col' : 'flex h-full flex-col'
      )}
    >
      <Link
        href={`/blog/${post.slug}/`}
        className={clsx('flex flex-1', feature ? 'flex-col md:flex-row' : 'flex-col')}
      >
        {post.featuredImage ? (
          <div className={clsx('relative shrink-0 overflow-hidden', feature && 'md:w-1/2')}>
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              width={915}
              height={515}
              sizes={
                feature ? '(max-width: 768px) 100vw, 560px' : '(max-width: 768px) 100vw, 380px'
              }
              className={clsx(
                'w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none',
                feature ? 'aspect-[16/10] md:h-full' : 'aspect-[16/9]'
              )}
            />
            {categories.length > 0 ? (
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <CategoryChip key={cat} category={cat} overlay />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className={clsx('flex flex-1 flex-col p-6', feature && 'md:justify-center md:p-9')}>
          {/* No image to overlay: fall back to an inline chip. */}
          {!post.featuredImage && categories.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryChip key={cat} category={cat} />
              ))}
            </div>
          ) : null}

          <p className="flex flex-wrap items-center gap-x-2 text-sm text-ozwell-slate">
            <time dateTime={post.date}>{post.dateFormatted}</time>
            {post.authorName ? <span aria-hidden="true">·</span> : null}
            {post.authorName ? <span>{post.authorName}</span> : null}
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} strokeWidth={2} aria-hidden="true" />
              {post.readingMinutes} min
            </span>
          </p>

          <h3
            className={clsx(
              'mt-2.5 font-bold leading-snug text-ozwell-ink-strong transition-colors group-hover:text-primary-700',
              feature ? 'text-2xl sm:text-[1.75rem]' : 'text-xl'
            )}
          >
            {post.title}
          </h3>
          <p
            className={clsx(
              'mt-3 leading-relaxed text-ozwell-slate',
              feature ? 'line-clamp-4' : 'line-clamp-3'
            )}
          >
            {post.excerpt}
          </p>
          {/* mt-auto pins this to the bottom so it lines up across a row of
              uneven excerpts. */}
          <p className="mt-auto flex items-center gap-1.5 pt-5 text-[15px] font-semibold text-primary-700">
            Read more
            <ArrowRight
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </p>
        </div>
      </Link>
    </article>
  )
}

export default function BlogGrid({
  title,
  posts,
  featureFirst = false,
  tone = 'white',
  showTitle = false,
}: BlogGridProps) {
  const [first, ...rest] = posts
  const feature = featureFirst ? first : undefined
  const grid = featureFirst ? rest : posts

  return (
    <Section tone={tone} spacing="md">
      <h2
        className={showTitle ? 'text-2xl font-bold text-ozwell-ink-strong sm:text-3xl' : 'sr-only'}
      >
        {title}
      </h2>
      {feature ? (
        <div className={showTitle ? 'mt-8' : ''}>
          <Card post={feature} feature />
        </div>
      ) : null}
      <div
        className={clsx(
          'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
          (feature || showTitle) && 'mt-8'
        )}
      >
        {grid.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  )
}
