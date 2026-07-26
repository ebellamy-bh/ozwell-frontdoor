/**
 * HTML → Markdown, for the `llms-full.txt` corpus.
 *
 * Scope note, because this looks more general than it is: the input is our own
 * WordPress export, produced by one generator, and the output is a plain-text file
 * for language models. It is not a sanitiser and not a general HTML parser — it
 * must not be pointed at untrusted input, and nothing renders its output as HTML.
 *
 * A real parser was considered and rejected: the only consumer is a build-time
 * text file, and the alternative was adding a dependency plus its transitive tree
 * to a site that otherwise ships four.
 */

/** Block elements whose boundaries become blank lines. */
const BLOCK_TAGS =
  'p|div|section|article|header|footer|figure|figcaption|ul|ol|li|table|tr|blockquote|h[1-6]|pre'

function decodeEntities(text: string): string {
  return (
    text
      .replace(/&#8216;|&#8217;/g, "'")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&#8230;/g, '…')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&apos;/g, "'")
      // Ampersand last, or the replacements above would re-decode their own output.
      .replace(/&amp;/g, '&')
      .replace(/&#(\d+);/g, (_m, code: string) => String.fromCodePoint(Number(code)))
  )
}

/** Inline text with entities decoded and any remaining tags dropped. */
function inline(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()
}

export function htmlToMarkdown(html: string, baseUrl = ''): string {
  let out = html

  // Drop anything with no textual meaning.
  out = out.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, '')
  out = out.replace(/<!--[\s\S]*?-->/g, '')

  // Headings. `#` maps to h1, but article bodies start at h2, so the document
  // title supplied by the caller stays the only h1.
  out = out.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, level: string, inner: string) => {
    const text = inline(inner)
    return text ? `\n\n${'#'.repeat(Number(level))} ${text}\n\n` : '\n\n'
  })

  // Preformatted blocks, before generic inline handling eats the newlines.
  out = out.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, inner: string) => {
    const code = decodeEntities(inner.replace(/<\/?code[^>]*>/gi, '').replace(/<[^>]+>/g, ''))
    return `\n\n\`\`\`\n${code.replace(/^\n+|\n+$/g, '')}\n\`\`\`\n\n`
  })

  out = out.replace(
    /<code[^>]*>([\s\S]*?)<\/code>/gi,
    (_m, inner: string) => `\`${inline(inner)}\``
  )

  // Links: absolute, so a model reading the corpus can resolve them.
  out = out.replace(
    /<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href: string, inner: string) => {
      const text = inline(inner)
      if (!text) return ''
      const url = href.startsWith('/') && baseUrl ? `${baseUrl}${href}` : href
      return url ? `[${text}](${url})` : text
    }
  )

  // Images carry their alt text, which is often the only description of a figure.
  out = out.replace(/<img\b[^>]*>/gi, (tag: string) => {
    const alt = /\balt="([^"]*)"/.exec(tag)?.[1] ?? ''
    const src = /\bsrc="([^"]*)"/.exec(tag)?.[1] ?? ''
    if (!alt && !src) return ''
    const url = src.startsWith('/') && baseUrl ? `${baseUrl}${src}` : src
    return `\n\n![${decodeEntities(alt)}](${url})\n\n`
  })

  out = out.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner: string) => {
    const text = inline(inner)
    return text ? `**${text}**` : ''
  })
  out = out.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner: string) => {
    const text = inline(inner)
    return text ? `*${text}*` : ''
  })

  // List items. Ordered lists are rendered with `-` as well: numbering would
  // require tracking each list's position, and Markdown readers treat both as a
  // list. Not worth a stateful pass for a plain-text corpus.
  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner: string) => {
    const text = inline(inner)
    return text ? `\n- ${text}` : ''
  })

  out = out.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, inner: string) => {
    const text = inline(inner)
    return text ? `\n\n> ${text}\n\n` : '\n\n'
  })

  out = out.replace(/<br\s*\/?>/gi, '\n')
  out = out.replace(/<(?:tr|\/tr)[^>]*>/gi, '\n')
  out = out.replace(/<\/?(?:td|th)[^>]*>/gi, ' | ')

  // Remaining block boundaries become paragraph breaks, then every other tag goes.
  out = out.replace(new RegExp(`</?(?:${BLOCK_TAGS})[^>]*>`, 'gi'), '\n\n')
  out = out.replace(/<[^>]+>/g, '')

  out = decodeEntities(out)

  return (
    out
      // Collapse runs of spaces and tabs, but not newlines.
      .replace(/[^\S\n]+/g, ' ')
      .replace(/ ?\n ?/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  )
}
