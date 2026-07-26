import type { MetadataRoute } from 'next'
import { posts, docs, docCategories } from '@/lib/content'
import { SITE_URL } from '@/lib/metadata'

export const dynamic = 'force-static'

/**
 * Sitemap.
 *
 * `lastModified` is now set on the static routes too. Previously only posts and
 * docs carried one, so a crawler had no signal that the homepage or About page had
 * ever changed. The newest content date stands in for the marketing pages, which
 * are rebuilt whenever anything else is.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const newestContent = [...posts, ...docs]
    .map((item) => item.modified || item.date)
    .sort()
    .at(-1)
  const siteUpdated = new Date(newestContent ?? Date.now())

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: siteUpdated, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/about-us/`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(posts[0]?.date ?? siteUpdated),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/docs/`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: new Date(p.modified || p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const docRoutes: MetadataRoute.Sitemap = docs.map((d) => ({
    url: `${SITE_URL}/docs/${d.slug}/`,
    lastModified: new Date(d.modified || d.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const docCategoryRoutes: MetadataRoute.Sitemap = docCategories.map((c) => ({
    url: `${SITE_URL}/docs-category/${c.slug}/`,
    lastModified: siteUpdated,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...docRoutes, ...docCategoryRoutes]
}
