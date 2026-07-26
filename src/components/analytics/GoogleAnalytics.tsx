'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { GA_MEASUREMENT_ID, TAGS_ENABLED } from '@/lib/analytics'

const enabled = TAGS_ENABLED && Boolean(GA_MEASUREMENT_ID)

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * GA4 via gtag.js.
 *
 * `send_page_view: false` on config, with the page view sent from the effect
 * below instead. The App Router navigates client-side, so gtag's own automatic
 * page view would only fire on a hard load; letting the effect own every view —
 * including the first — keeps one code path and avoids double-counting the
 * landing page.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!enabled || !window.gtag) return
    // Read the query off the location rather than `useSearchParams`, which would
    // pull this component into a Suspense boundary under static export.
    window.gtag('event', 'page_view', {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`}
      </Script>
    </>
  )
}
