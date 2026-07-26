import type { Metadata } from 'next'

const SITE_URL = 'https://ozwell.ai'
const SITE_NAME = 'Ozwell AI'

interface CreateMetadataOptions {
  title: string
  description: string
  path?: string
  openGraph?: {
    title?: string
    description?: string
    type?: 'website' | 'article'
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>
  }
  keywords?: string[]
  robots?: Metadata['robots']
}

/**
 * Standard metadata for a page.
 *
 * Appends "- Ozwell AI" to titles (matching the live site's Yoast pattern) unless
 * the title already names the site, and sets the canonical URL — which matters
 * more than usual here because `public/_redirects` funnels several legacy
 * WordPress URL shapes onto these pages.
 *
 * Social images are deliberately NOT defaulted here. `src/app/opengraph-image.tsx`
 * renders a card at build time, and Next's metadata file conventions cascade to
 * every route that doesn't define its own — but only when the route hasn't set
 * `openGraph.images` explicitly, which an unconditional default here would do,
 * silently shadowing the generated card on every page. Pages with better art of
 * their own (blog posts) still pass `openGraph.images`.
 */
export function createMetadata(options: CreateMetadataOptions): Metadata {
  const { title, description, path = '/', openGraph, keywords, robots } = options
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    keywords,
    robots,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': [{ url: '/blog/rss.xml', title: `${SITE_NAME} Blog` }],
      },
    },
    openGraph: {
      title: openGraph?.title ?? fullTitle,
      description: openGraph?.description ?? description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: openGraph?.type ?? 'website',
      ...(openGraph?.images && { images: openGraph.images }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ozwell_ai',
      title: openGraph?.title ?? fullTitle,
      description: openGraph?.description ?? description,
      ...(openGraph?.images && { images: openGraph.images.map((image) => image.url) }),
    },
  }
}

export { SITE_URL, SITE_NAME }
