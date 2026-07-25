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
}

export default function BlogGrid({ title, posts }: BlogGridProps) {
  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="sr-only">{title}</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-shadow hover:shadow-lg"
            >
              <Link href={`/blog/${post.slug}/`}>
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    width={915}
                    height={515}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : null}
                <div className="p-6">
                  {post.categories && post.categories.length > 0 ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-700"
                        >
                          {cat.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="text-sm text-ozwell-slate">
                    {post.dateFormatted}
                    {post.authorName ? ` · ${post.authorName}` : ''}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-ozwell-ink transition-colors group-hover:text-primary-600">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-ozwell-slate">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 font-semibold text-primary-600">Read more →</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
