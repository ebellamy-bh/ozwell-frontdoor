import { docs, docCategories, getDocsInCategory } from '@/lib/content'

/** Help-center categories with their docs, for the /docs/ hub. */
export const docsHub = docCategories.map((cat) => ({
  slug: cat.slug,
  name: cat.name,
  description: cat.description,
  docs: getDocsInCategory(cat.slug).map((d) => ({ slug: d.slug, title: d.title })),
}))

/** Flat list for search/sitemap surfaces. */
export const allDocs = docs.map((d) => ({ slug: d.slug, title: d.title }))
