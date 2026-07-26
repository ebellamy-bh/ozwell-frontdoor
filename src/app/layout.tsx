import type { Metadata, Viewport } from 'next'
import { Lato, Plus_Jakarta_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import JsonLd from '@/components/sections/JsonLd'
import { organizationSchema, webSiteSchema } from '@/lib/schema'
import { SITE_NAME, SITE_URL } from '@/lib/metadata'
import './globals.css'

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

/**
 * Display face for headings. The wordmark is a geometric sans with a circular O,
 * which Lato — a humanist face — doesn't echo at large sizes; every headline read
 * as body copy scaled up.
 */
const display = Plus_Jakarta_Sans({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  /**
   * A plain fallback title, deliberately not a `{ default, template }` pair.
   *
   * `createMetadata` already appends " - Ozwell AI" (with a guard for titles that
   * name the site themselves). A `template` here appended it a second time, and
   * since a template applies to child segments but not to its own layout's page,
   * the result was "… - Ozwell AI - Ozwell AI" on every page *except* the
   * homepage — so the duplication was invisible exactly where anyone would look.
   */
  title: `${SITE_NAME} — AI medical assistant for clinical documentation`,
  authors: [{ name: 'BlueHive Health, LLC', url: 'https://bluehive.com/' }],
  creator: 'BlueHive Health, LLC',
  publisher: 'BlueHive Health, LLC',
  formatDetection: { telephone: false, address: false },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/blog/rss.xml', title: `${SITE_NAME} Blog` }],
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#27aae1',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${display.variable}`}>
      <body>
        {/* Organization and WebSite belong to the site, not to a page, so they're
            emitted once here with stable @ids that the per-page graphs reference. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />

        {/* Keyboard users had to tab through the whole header on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
