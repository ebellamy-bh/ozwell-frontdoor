# Ozwell frontdoor — design system & conventions

Replaces the earlier `ui-ux-plan.md` audit, whose P0–P2 items are now done. This
documents what the system _is_, so new sections compose instead of inventing.

## The rule

**Build sections out of the primitives in `src/components/ui/`. Don't hand-roll a
band, a card, a button, or a heading.**

The previous build had three competing visual languages because every section made
its own decisions: eight pill styles, three card treatments, three icon styles, and
section padding spread across `py-10`, `py-12`, `py-14`, `py-16`, `pb-4 pt-10`, and
`pb-24 pt-28` with no scale. Consolidating those is most of this revamp.

## Primitives

| Component         | Owns                                                        | Notes                                                                              |
| ----------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Section`         | Surface, vertical rhythm, container, wave dividers, pattern | Every band. `tone`: white / mist / brand / navy. `spacing`: sm / md / lg.          |
| `SectionHeading`  | Eyebrow + title + description, one type scale               | `size`: hero / section / sub. `onDark` for gradient bands.                         |
| `Button`          | The only button                                             | Routes internal hrefs through `next/link` automatically. Min-heights are explicit. |
| `Card`            | The only card                                               | `tone`: plain / raised / mist / onBrand.                                           |
| `IconBadge`       | The only icon treatment                                     | `tone`: brand / solid / onBrand.                                                   |
| `Container`       | Max width + gutters                                         | `width="prose"` for reading measure. Never pass `max-w-*` via `className`.         |
| `Breadcrumbs`     | Visible trail **and** its `BreadcrumbList` JSON-LD          | Prepends Home. Emitting both together stops them drifting apart.                   |
| `Stat`            | A sourced figure                                            | Attribution is a required part of the data, not optional trim.                     |
| `TableOfContents` | Article outline                                             | Renders nothing under 3 headings. Pairs with `withHeadingIds` from `lib/toc.ts`.   |
| `YouTubeEmbed`    | Click-to-play video facade                                  | Thumbnail (~20 KB) instead of ~1 MB of player JS on load.                          |
| `AutoPlayVideo`   | Decorative product loop                                     | Poster carries layout; `src` attaches near the viewport; honours reduced motion.   |

## Colour

Four families from the logo (gold octopus, iridescent bubble, navy linework), each
with exactly one job:

- **blue** — primary. Every interactive element and gradient band.
- **navy** — authority. Deep headings, the footer, the problem band.
- **gold** — accent, **on dark surfaces only**. `#fada00` is ~1.3:1 on white.
- **iris** — the bubble's sheen. Decorative gradients only, never text or icons.
  The old `text-fuchsia-400` value icons came from here and read as an unrelated
  third icon style.

Two greens exist deliberately: `ozwell-green` (`#00b682`, dark surfaces) and
`ozwell-green-dark` (`#00805d`, light surfaces). The bright one is 2.5:1 on white —
below the 3:1 floor for meaningful graphics.

### Contrast floors that are easy to trip

- `primary-600` on white is **3.81:1** — fine for icons (3:1), fails for text.
  Label and eyebrow text uses `primary-700` (5.54:1).
- All body ramps pass AA: ink 11.5:1, ink-muted 7.1:1, slate 5.5:1 on white.

## Motion

Attached to **interaction only** — hover lift on cards, image scale, icon nudges.

There is deliberately no scroll-reveal animation. A CSS-only fade-up via
`animation-timeline: view()` was built and removed: the `entry` range only completes
once a subject has fully entered the viewport, which never happens for a section
taller than the viewport, so whole bands sat at `opacity: 0`. Following `#faq` or
`#security` from the footer landed readers on invisible content. Don't reintroduce it
without solving that.

## SEO / AI surfaces

- `lib/schema.ts` — every JSON-LD graph. `Organization` and `WebSite` are emitted
  once in the root layout with stable `@id`s that per-page graphs reference.
- `/llms.txt` — curated site map for language models (llmstxt.org convention).
- `/llms-full.txt` — the whole corpus as Markdown, assembled from the same
  `src/data` modules the pages render, so it can't drift from what humans see.
- `opengraph-image.tsx` per route, sharing `lib/og.tsx`. **Metadata file conventions
  do not cascade** to child routes that declare their own `openGraph` block, which
  every page does via `createMetadata` — hence one card file per route.
- `createMetadata` deliberately does **not** default `openGraph.images`; an
  unconditional default there silently shadows the generated cards.
- Titles: `createMetadata` appends `- Ozwell AI`. The root layout must **not** also
  set a `title.template`, or every page except the homepage doubles the suffix.
- `public/_headers` sets `Content-Type: image/png` on the extensionless
  `/**/opengraph-image` paths. Without it Cloudflare Pages serves them as
  `application/octet-stream` and every scraper rejects them.

## Assets

Sources live in `assets/images/` (repo only, never deployed). `pnpm` →
`node scripts/optimize-images.mjs` writes WebP into `public/images/`. Marketing
images went 7.4 MB → 716 KB this way; the hero PNG alone was 3.6 MB with `priority`.

`public/images/wp/` belongs to `scripts/migrate-wp-content.mjs`. Don't touch it here.

## Migrated WordPress content

Authored for a fixed-width desktop theme, so `globals.css` contains a containment
block for it: embeds carry hardcoded pixel widths (one YouTube iframe at
`width="1140"` set a 1,156px page minimum on mobile), tables and `pre` scroll in
their own box, and bare URLs used as link text get `overflow-wrap`.

`lib/toc.ts` adds heading ids with a regex rather than a parser. That is safe _only_
because the input is our own build-time content from a single generator. Do not point
it at untrusted input.

---

## Known follow-ups

1. **`public/images/wp/` is 46 MB — 79% of the deploy.** 248 PNG srcset variants for
   four blog posts. The fix is to teach `migrate-wp-content.mjs` to emit WebP and
   rewrite the `srcset`/`src` attributes it generates, then re-run the migration.
   Not done here because this pass doesn't own that script, and a partial change
   would break article images.
2. **Dark mode is not implemented.** Scoped out rather than half-shipped: the brand
   raster assets (logo lockup, the white-knockout partner logos, the illustrations)
   have light backgrounds baked in, so it needs new assets before it needs CSS. The
   footer's white-wordmark variant shows the pattern to follow.
3. **Author bios.** Every `description` in `authors.json` is empty, so the byline is
   a name only. Fill them in WordPress and re-run `pnpm migrate:wp`.
4. **`wreiske` display name** is patched in `lib/content.ts`. The durable fix is
   setting the display name in WordPress.
5. **Blog category filter.** Deliberately absent: with four posts, filtering to
   "Release Notes" shows one. Add it when the archive justifies it.
6. **Partner logo assets** are vendor PNGs at inconsistent weights; the homepage
   cloud desaturates them to compensate. Proper single-colour marks would be better.
7. **Product decisions, not copy bugs** (carried over from the original audit): the
   iOS listing is still named "BlueHive AI", so the install guide correctly says so;
   and `Start Free Trial` points at `ai.bluehive.com`, so the primary conversion path
   leaves the brand.
