import type { ReactNode } from 'react'

/**
 * Inline links inside the copy that lives in `src/data`.
 *
 * Those modules hold plain strings deliberately: the same sentence is rendered as
 * React on a page, as markdown in `/llms.txt` and `/llms-full.txt`, and as text in
 * JSON-LD, so it cannot be JSX. Markdown link syntax is the one notation all three
 * surfaces can carry — the text files ship it verbatim, `richText` turns it into
 * anchors, `linkedHtml` gives structured data the anchor Google's FAQPage spec
 * allows, and `plainText` strips it for anywhere that takes text only (metadata
 * descriptions, OG images, alt text).
 */

/** `[label](href)` — href stops at the closing paren, so no nested parens. */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

const LINK_CLASS =
  'font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800'

function isExternal(href: string): boolean {
  return href.startsWith('http') || href.startsWith('mailto:')
}

export function richText(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(LINK)) {
    const [raw, label, href] = match
    const start = match.index
    if (start > last) nodes.push(text.slice(last, start))
    nodes.push(
      <a
        key={`${href}-${start}`}
        href={href}
        className={LINK_CLASS}
        {...(isExternal(href) && { target: '_blank', rel: 'noopener' })}
      >
        {label}
      </a>
    )
    last = start + raw.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function plainText(text: string): string {
  return text.replace(LINK, '$1')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Anchors for JSON-LD. `<a>` is on Google's list of tags permitted inside an
 * `acceptedAnswer`, so an answer engine keeps the reference rather than reading a
 * sentence with the destination stripped out. Everything outside a link is escaped
 * because the surrounding prose is not authored as HTML.
 */
export function linkedHtml(text: string): string {
  let out = ''
  let last = 0

  for (const match of text.matchAll(LINK)) {
    const [raw, label, href] = match
    const start = match.index
    out += escapeHtml(text.slice(last, start))
    out += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`
    last = start + raw.length
  }

  return out + escapeHtml(text.slice(last))
}
