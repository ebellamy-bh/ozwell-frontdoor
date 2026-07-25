import Link from 'next/link'
import { Container } from '@/components/ui/Container'

interface DocsHubProps {
  categories: Array<{
    slug: string
    name: string
    description: string
    docs: Array<{ slug: string; title: string }>
  }>
}

export default function DocsHub({ categories }: DocsHubProps) {
  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="sr-only">Help Center categories</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.slug} className="rounded-2xl bg-ozwell-mist p-7 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-bold text-ozwell-ink">
                <Link href={`/docs-category/${cat.slug}/`} className="transition-colors hover:text-primary-600">
                  {cat.name}
                </Link>
              </h3>
              {cat.description ? <p className="mt-2 text-sm text-ozwell-slate">{cat.description}</p> : null}
              <ul className="mt-4 space-y-2">
                {cat.docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/docs/${doc.slug}/`} className="text-sm font-medium text-primary-600 underline-offset-2 hover:underline">
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
