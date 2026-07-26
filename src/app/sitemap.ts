import type { MetadataRoute } from 'next'
import {
  posts,
  docs,
  docCategories,
  categories,
  tags,
  authorsWithPosts,
  isIndexableArchive,
  getPostsInCategory,
  getPostsWithTag,
  getPostsByAuthor,
} from '@/lib/content'
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
    /**
     * Above About and level with the section indexes: the certification is the one
     * thing this site can claim that no competitor can, and `/security/` answers the
     * questions that decide a clinical-AI purchase.
     */
    {
      url: `${SITE_URL}/certification/`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/security/`,
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

  /**
   * Blog archives.
   *
   * `lastModified` is the newest post in the archive rather than the site-wide date,
   * so a term nobody has filed against in a year doesn't keep claiming to be fresh —
   * the one thing a crawler will notice and discount.
   *
   * Only archives past `MIN_INDEXABLE_ARCHIVE_POSTS` are listed. The thin ones ship
   * `noindex, follow`, and submitting a URL you've asked not to be indexed is a
   * contradiction a crawler resolves by trusting neither signal.
   */
  const newestIn = (list: Array<{ date: string; modified: string }>) =>
    new Date(
      list
        .map((p) => p.modified || p.date)
        .sort()
        .at(-1) ?? siteUpdated
    )

  const archive = (
    url: string,
    list: Array<{ date: string; modified: string }>,
    priority: number
  ) =>
    isIndexableArchive(list.length)
      ? [
          {
            url: `${SITE_URL}${url}`,
            lastModified: newestIn(list),
            changeFrequency: 'monthly' as const,
            priority,
          },
        ]
      : []

  const archiveRoutes: MetadataRoute.Sitemap = [
    ...categories.flatMap((c) =>
      archive(`/blog/category/${c.slug}/`, getPostsInCategory(c.slug), 0.5)
    ),
    // Below categories: tags are a finer, less deliberate grouping.
    ...tags.flatMap((t) => archive(`/blog/tag/${t.slug}/`, getPostsWithTag(t.slug), 0.4)),
    ...authorsWithPosts.flatMap((a) =>
      archive(`/blog/author/${a.slug}/`, getPostsByAuthor(a.slug), 0.5)
    ),
  ]

  return [...staticRoutes, ...postRoutes, ...docRoutes, ...docCategoryRoutes, ...archiveRoutes]
}
