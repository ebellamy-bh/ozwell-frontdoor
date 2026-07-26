# ozwell-frontdoor

Ozwell.ai marketing site — static Next.js App Router build using the BlueHive marketing framework

## Analytics

Third-party tags mount once in the root layout via `src/components/analytics/`, and their ids live in
[`src/lib/analytics.ts`](src/lib/analytics.ts). Because the site is a static export, the ids are
build-time constants — changing one requires a rebuild. The defaults ship as-is, so a normal deploy
needs no configuration; the env vars exist to point a build at a different property, or to blank a
tag out by setting it to the empty string.

| Tag                | Env var                          | Default        |
| ------------------ | -------------------------------- | -------------- |
| Google Analytics 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | `G-YLP9MW52CC` |
| Microsoft Clarity  | `NEXT_PUBLIC_CLARITY_PROJECT_ID` | `xsajbfrv07`   |
| HubSpot            | `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`  | `45533062`     |

All three are **suppressed in `pnpm dev`**, so localhost page views stay out of the real GA property
and Clarity never records the dev server. Set `NEXT_PUBLIC_ENABLE_TAGS_IN_DEV=1` in `.env.local` to
load them anyway. The gate keys off the build rather than the hostname, so `pnpm preview` — a
production build served locally — does send real data.
