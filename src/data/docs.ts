import { docs, docCategories, getDocsInCategory } from '@/lib/content'

/** Topic order matching the live Help Center hub. */
const CATEGORY_ORDER = [
  'getting-started',
  'setup-process',
  'accounts',
  'integrations',
  'experiments',
  'api',
  'developers',
]

/**
 * One-line descriptions for the topic cards. WordPress left every term description blank except
 * `api`, so a card was just a name and a count with no sense of what was inside. Set these in
 * WordPress if you'd rather they come from the CMS.
 */
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'getting-started': 'Install the app, create an account, and meet Ozwell.',
  'setup-process': 'Tailor Ozwell to how you work — name, title, and custom instructions.',
  accounts: 'Sign-in, passwords, and using your account across devices.',
  integrations: 'Connect Ozwell to WebChart and the rest of your clinical stack.',
  experiments: 'Opt into features we are still building, and what they do.',
  api: 'Endpoints, payloads, and examples for building on Ozwell.',
  developers: 'Reference material for engineers integrating with Ozwell.',
}

/** Help-center categories with their docs, for the /docs/ hub (live topic order). */
export const docsHub = docCategories
  .slice()
  .sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.slug)
    const bi = CATEGORY_ORDER.indexOf(b.slug)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
  .map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    description: cat.description || CATEGORY_DESCRIPTIONS[cat.slug] || '',
    docs: getDocsInCategory(cat.slug).map((d) => ({ slug: d.slug, title: d.title })),
  }))

/**
 * Hand-picked starting points, shown above the topic grid.
 *
 * These used to be labelled "Getting Started" — the same heading as the first topic card directly
 * below, listing overlapping articles, so the page appeared to repeat itself. They are a
 * cross-category "most people need these" list, and are now labelled as such.
 */
const FEATURED_SLUGS = [
  'creating-an-account',
  'who-is-ozwell',
  'how-to-download-and-install-the-bluehive-ai-app-powered-by-ozwell-from-the-app-store',
  'how-to-reset-your-password',
  'webchart-ozwell-integration-user-guide',
]

export const featuredDocsCategory = {
  slug: 'getting-started',
  name: 'Popular articles',
  description: '',
  docs: FEATURED_SLUGS.map((slug) => docs.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({ slug: d.slug, title: d.title })),
}

/** Flat list for search/sitemap surfaces. */
export const allDocs = docs.map((d) => ({ slug: d.slug, title: d.title }))

/**
 * Search index for the Help Center. With ten articles there is nothing to gain from a search
 * service — the whole corpus ships as a few KB of text and filters instantly on the client.
 */
export interface DocSearchEntry {
  slug: string
  title: string
  category: string
  categorySlug: string
  excerpt: string
  /** Pre-lowercased title + body, so filtering doesn't re-normalize on every keystroke. */
  haystack: string
}

function toPlainText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&quot;|&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export const docsSearchIndex: DocSearchEntry[] = docs.map((doc) => {
  const body = toPlainText(doc.content)
  const category = docCategories.find((c) => doc.categories.includes(c.slug))
  return {
    slug: doc.slug,
    title: doc.title,
    category: category?.name ?? 'Help Center',
    categorySlug: category?.slug ?? '',
    excerpt: body.slice(0, 180).trimEnd() + (body.length > 180 ? '…' : ''),
    haystack: `${doc.title} ${body}`.toLowerCase(),
  }
})
