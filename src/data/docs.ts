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
    description: cat.description,
    docs: getDocsInCategory(cat.slug).map((d) => ({ slug: d.slug, title: d.title })),
  }))

/** Curated featured list shown above the topic cards — mirrors the live "Getting Started" list. */
const FEATURED_SLUGS = [
  'creating-an-account',
  'who-is-ozwell',
  'how-to-download-and-install-the-bluehive-ai-app-powered-by-ozwell-from-the-app-store',
  'how-to-reset-your-password',
  'webchart-ozwell-integration-user-guide',
]

export const featuredDocsCategory = {
  slug: 'getting-started',
  name: 'Getting Started',
  description: '',
  docs: FEATURED_SLUGS.map((slug) => docs.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({ slug: d.slug, title: d.title })),
}

/** Flat list for search/sitemap surfaces. */
export const allDocs = docs.map((d) => ({ slug: d.slug, title: d.title }))
