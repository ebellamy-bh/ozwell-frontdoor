import Script from 'next/script'
import { HUBSPOT_PORTAL_ID, TAGS_ENABLED } from '@/lib/analytics'

/**
 * HubSpot tracking / chat loader.
 *
 * The WordPress plugin on ozwell.ai emits this same loader (plus a `_hsq`
 * `setContentType` push, which only labels WP page types and has no equivalent
 * here). HubSpot records page views for History API navigations itself, so the
 * loader is all the App Router needs.
 */
export default function HubSpot() {
  if (!TAGS_ENABLED || !HUBSPOT_PORTAL_ID) return null

  return (
    <Script
      id="hs-script-loader"
      src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  )
}
