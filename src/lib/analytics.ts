/**
 * Analytics/tag configuration.
 *
 * Every id is a build-time constant because the site is a static export — there
 * is no server to read config at request time, so `next build` inlines whatever
 * is set here. Set the env vars in the Cloudflare build settings (or a local
 * `.env.local`) to override; the defaults below are what production ships.
 *
 * A tag renders only when its id is non-empty *and* `TAGS_ENABLED` — set an id to
 * the empty string to drop that tag from a build entirely.
 */

/**
 * Tags stay off in `pnpm dev`, because the ids below are the real production
 * properties: localhost page views would land in GA alongside real traffic, and
 * Clarity would record session replays of the dev server. Set
 * `NEXT_PUBLIC_ENABLE_TAGS_IN_DEV=1` to load them anyway when working on the tag
 * wiring itself.
 *
 * This keys off the build, not the hostname, so `pnpm preview` — a production
 * build served locally — does send real data.
 */
export const TAGS_ENABLED =
  process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_TAGS_IN_DEV === '1'

/**
 * HubSpot portal — the one tag ozwell.ai actually serves today, via the HubSpot
 * WordPress plugin. Same portal, so contacts and page views keep landing in the
 * same place after the cutover.
 */
export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '45533062'

/** GA4 measurement id. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-YLP9MW52CC'

/** Microsoft Clarity project id — the code from the tag snippet. */
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? 'xsajbfrv07'
