import { Container } from '@/components/ui/Container'

/**
 * Reading styles for migrated WordPress bodies.
 *
 * `max-w-none` is deliberate — the measure comes from the `Container` or grid
 * column above, so this can be dropped into either a prose page or the Help
 * Center's sidebar layout without fighting it.
 */
const PROSE_CLASSES = [
  'prose prose-lg max-w-none',
  'prose-headings:font-display prose-headings:text-ozwell-ink-strong prose-headings:tracking-tight',
  'prose-h2:mt-12 prose-h2:text-[1.75rem] prose-h3:mt-9 prose-h3:text-xl',
  'prose-p:text-ozwell-ink prose-li:text-ozwell-ink',
  'prose-a:text-primary-700 prose-a:underline-offset-2 hover:prose-a:text-primary-800',
  'prose-strong:text-ozwell-ink-strong',
  'prose-img:rounded-xl prose-img:shadow-card',
  // Pull quotes read as an aside rather than as body copy in italics.
  'prose-blockquote:border-l-4 prose-blockquote:border-primary-300 prose-blockquote:bg-ozwell-mist',
  'prose-blockquote:not-italic prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:pr-5',
  'prose-figcaption:text-ozwell-slate',
].join(' ')

interface ArticleBodyProps {
  /** Sanitized HTML migrated from our own WordPress content. */
  html: string
  /**
   * Render just the prose, without the wrapping section and container — for
   * callers that already provide their own layout column (the Help Center's
   * sidebar grid), where the column width is what sets the reading measure.
   */
  bare?: boolean
}

export default function ArticleBody({ html, bare = false }: ArticleBodyProps) {
  const prose = (
    <div
      className={PROSE_CLASSES}
      // Content is our own migrated WordPress HTML (static, build-time).
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
