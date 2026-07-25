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
 * Creates standardized metadata for pages.
 * Automatically appends "- Ozwell AI" to titles (matching the live site's Yoast pattern).
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
    alternates: { canonical: url },
    openGraph: {
      title: openGraph?.title ?? fullTitle,
      description: openGraph?.description ?? description,
      url,
      siteName: SITE_NAME,
      type: openGraph?.type ?? 'website',
      images: openGraph?.images ?? [
        {
          url: '/images/Ozwell-Branding-Whiteboard-2.png',
          width: 1200,
          height: 630,
          alt: 'Ozwell — Your AI medical assistant',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ozwell_ai',
    },
  }
}

export { SITE_URL, SITE_NAME }
