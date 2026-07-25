import { Container } from '@/components/ui/Container'

const PROSE_CLASSES =
  'prose prose-lg max-w-none prose-headings:text-ozwell-ink prose-a:text-primary-600 prose-img:rounded-xl'

interface ArticleBodyProps {
  /** Sanitized HTML migrated from our own WordPress content. */
  html: string
  /**
   * Render just the prose, without the wrapping section and container. For callers that already
   * provide their own layout column (the Help Center's sidebar grid), where the column width is
   * what sets the reading measure.
   */
  bare?: boolean
}

export default function ArticleBody({ html, bare = false }: ArticleBodyProps) {
  // max-w-none is deliberate: the measure comes from the container or column above.
  const prose = (
    <div
      className={PROSE_CLASSES}
      // Content is our own migrated WordPress HTML (static, build-time)
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  if (bare) return prose

  return (
    <section className="bg-white py-12">
      <Container width="prose">
        <h2 className="sr-only">Article content</h2>
        {prose}
      </Container>
    </section>
  )
}
