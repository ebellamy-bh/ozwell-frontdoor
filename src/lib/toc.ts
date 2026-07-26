export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/** Decode the handful of entities WordPress leaves in heading text. */
function decodeEntities(text: string): string {
  return text
    .replace(/&#8217;|&#8216;/g, '’')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[’'"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'section'
  )
}

/**
 * Extracts an outline from migrated article HTML and gives every heading a stable
 * `id` to link to.
 *
 * The content is WordPress output with no anchors, so nothing in a 9-minute
 * article was linkable or navigable — a reader who wanted "The Real Cost" had to
 * scroll and hope. Rather than parse the HTML properly (no DOM at build time, and
 * a parser dependency for one job), this rewrites the opening tags of `h2`/`h3`
 * with a regex.
 *
 * That's safe here for a specific reason: the corpus is our own build-time content
 * from a single generator, and the pattern only touches `<h2 …>`/`<h3 …>` opening
 * tags. It is not a general-purpose HTML transform, and it must not be pointed at
 * untrusted input.
 */
export function withHeadingIds(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = []
  const used = new Set<string>()

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (_match, levelStr: string, attrs: string, inner: string) => {
      const level = Number(levelStr) as 2 | 3
      const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).trim()
      if (!text) return _match

      // An author-supplied id wins, so existing deep links keep working.
      const existing = /\bid="([^"]+)"/.exec(attrs)
      let id = existing?.[1] ?? slugify(text)

      // Two sections can share a title ("Overview"); ids can't.
      if (used.has(id)) {
        let n = 2
        while (used.has(`${id}-${n}`)) n += 1
        id = `${id}-${n}`
      }
      used.add(id)

      headings.push({ id, text, level })

      // Rebuild the attribute list rather than appending to it: appending a second
      // `class` (or `id`) would emit a duplicate attribute, and browsers keep the
      // first — silently dropping whichever one came later.
      const existingClass = /\bclass="([^"]*)"/.exec(attrs)?.[1] ?? ''
      const rest = attrs.replace(/\s*\bclass="[^"]*"/, '').replace(/\s*\bid="[^"]*"/, '')
      // `scroll-mt-28` clears the sticky header when an in-page anchor is followed.
      const className = `${existingClass} scroll-mt-28`.trim()

      return `<h${level}${rest} id="${id}" class="${className}">${inner}</h${level}>`
    }
  )

  return { html: out, headings }
}
