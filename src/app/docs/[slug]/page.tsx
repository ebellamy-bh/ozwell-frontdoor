import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { Container } from '@/components/ui/Container'
import ArticleBody from '@/components/sections/ArticleBody'
import { docs, getDoc, getDocCategory, metaDescription } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return createMetadata({
    title: doc.title,
    description: metaDescription(doc.content),
    path: `/docs/${doc.slug}/`,
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  const category = doc.categories.length ? getDocCategory(doc.categories[0]) : undefined

  return (
    <>
      <section className="bg-ozwell-mist pb-8 pt-14">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ozwell-slate">
            <Link href="/docs/" className="text-primary-600 underline-offset-2 hover:underline">
              Help Center
            </Link>
            {category ? (
              <>
                {' / '}
                <Link
                  href={`/docs-category/${category.slug}/`}
                  className="text-primary-600 underline-offset-2 hover:underline"
                >
                  {category.name}
                </Link>
              </>
            ) : null}
          </nav>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-ozwell-ink sm:text-4xl">
            {doc.title}
          </h1>
        </Container>
      </section>
      <ArticleBody html={doc.content} />
    </>
  )
}
