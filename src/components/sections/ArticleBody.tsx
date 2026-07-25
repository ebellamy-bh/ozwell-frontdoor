import { Container } from '@/components/ui/Container'

interface ArticleBodyProps {
  /** Sanitized HTML migrated from our own WordPress content. */
  html: string
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <section className="bg-white py-12">
      <Container className="max-w-3xl">
        <h2 className="sr-only">Article content</h2>
        <div
          className="prose prose-lg max-w-none prose-headings:text-ozwell-ink prose-a:text-primary-600 prose-img:rounded-xl"
          // Content is our own migrated WordPress HTML (static, build-time)
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </section>
  )
}
