import siteConfig from '@/data/site.json'
import { SITE_NAME, SITE_URL } from '@/lib/metadata'

/**
 * JSON-LD builders.
 *
 * These were previously written inline, so `Organization` and `SoftwareApplication`
 * existed only on the homepage, `BreadcrumbList` only on blog posts, and the
 * publisher block was duplicated with slightly different values in each place.
 * Every graph the site emits is assembled here instead.
 */

type Json = Record<string, unknown>

/** Stable @id so every graph references one Organization node, not many copies. */
const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

/**
 * The generated 512×512 mascot mark, not the wordmark lockup.
 *
 * It has to be a PNG: several structured-data and feed consumers still don't
 * decode WebP, so pointing this at the optimized lockup would break the logo in
 * exactly the places that only ever read machine-readable output. `icon.png` is
 * already built for the favicon, so this needs no separate asset.
 */
const LOGO = `${SITE_URL}/icon.png`
const LOGO_SIZE = 512

function abs(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: 'Ozwell',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO, width: LOGO_SIZE, height: LOGO_SIZE },
    email: siteConfig.email,
    description: siteConfig.aboutBlurb,
    parentOrganization: {
      '@type': 'Organization',
      name: 'BlueHive Health, LLC',
      url: 'https://bluehive.com/',
    },
    sameAs: siteConfig.social.map((s) => s.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      availableLanguage: 'English',
    },
  }
}

export function webSiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: siteConfig.tagline,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

interface SoftwareOptions {
  description: string
  /** Named audience helps AI answer engines place the product correctly. */
  audience?: string
}

export function softwareApplicationSchema({ description, audience }: SoftwareOptions): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ozwell',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'AI medical scribe and clinical documentation assistant',
    operatingSystem: 'iOS, Android, Web',
    url: SITE_URL,
    description,
    softwareHelp: `${SITE_URL}/docs/`,
    publisher: { '@id': ORG_ID },
    ...(audience && { audience: { '@type': 'Audience', audienceType: audience } }),
    offers: {
      '@type': 'Offer',
      category: 'Free trial',
      url: siteConfig.ctas.trial.href,
      availability: 'https://schema.org/InStock',
    },
  }
}

export function faqSchema(items: Array<{ question: string; answer: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(trail: Array<{ name: string; href?: string }>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.href && { item: abs(crumb.href) }),
    })),
  }
}

interface ArticleOptions {
  title: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  image?: string | null
  authorName?: string | null
  authorDescription?: string
  authorImage?: string | null
  wordCount?: number
  section?: string
  keywords?: string[]
  /** `TechArticle` for Help Center docs, `BlogPosting` for posts. */
  type?: 'BlogPosting' | 'TechArticle'
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
  authorName,
  authorDescription,
  authorImage,
  wordCount,
  section,
  keywords,
  type = 'BlogPosting',
}: ArticleOptions): Json {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    ...(image && { image: abs(image) }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
          ...(authorImage && { image: authorImage }),
          ...(authorDescription && { description: authorDescription }),
        }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
    isPartOf: { '@id': SITE_ID },
    ...(wordCount && { wordCount }),
    ...(section && { articleSection: section }),
    ...(keywords?.length && { keywords: keywords.join(', ') }),
    inLanguage: 'en-US',
  }
}

interface ItemListOptions {
  name: string
  description: string
  path: string
  items: Array<{ name: string; path: string }>
}

/**
 * Index pages (blog, Help Center) as an explicit ordered list. Search and answer
 * engines otherwise have to infer the collection from link soup.
 */
export function collectionSchema({ name, description, path, items }: ItemListOptions): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: abs(path),
    isPartOf: { '@id': SITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: abs(item.path),
      })),
    },
  }
}
