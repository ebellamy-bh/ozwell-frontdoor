import type { MetadataRoute } from 'next'
import { posts, docs, docCategories } from '@/lib/content'
import { SITE_URL } from '@/lib/metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about-us/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/docs/`, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: new Date(p.modified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const docRoutes: MetadataRoute.Sitemap = docs.map((d) => ({
    url: `${SITE_URL}/docs/${d.slug}/`,
    lastModified: new Date(d.modified),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const docCategoryRoutes: MetadataRoute.Sitemap = docCategories.map((c) => ({
    url: `${SITE_URL}/docs-category/${c.slug}/`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...docRoutes, ...docCategoryRoutes]
}
