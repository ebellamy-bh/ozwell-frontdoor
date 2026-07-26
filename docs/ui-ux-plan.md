# Ozwell frontdoor — UI/UX audit & improvement plan

Visual pass done against `pnpm dev` at 1440×1150 (desktop) and 375×812 (mobile), covering:
`/`, `/about-us`, `/blog`, `/blog/[slug]`, `/docs`, `/docs/[slug]`, `/docs-category/[slug]`.

## Verdict

The migration is structurally sound — good token system, clean section components, real
metadata/sitemap/RSS. What's holding it back is that it's still a **faithful reproduction of an
Elementor page**: the most important content on the homepage is baked into flat images and video
instead of markup, the design system has three competing visual languages, and the Help Center has
no way to find anything.

The single highest-leverage change: **turn the picture-of-content sections back into real
content.** Two of the homepage's three proof sections (testimonials, "How Ozwell Operates") are
currently unreadable on a phone, invisible to Google, and impossible to edit.

---

## P0 — Broken or embarrassing

### 1. Testimonials are a flat PNG

`src/components/sections/Testimonials.tsx:21` renders `/images/testimonials-1024x576.png` — a
screenshot of two testimonial cards — inside the gradient band.

- Desktop: quote text renders at ~9px, visibly soft.
- Mobile (375px): ~5px. **Completely illegible.**
- Not selectable, not indexable, not translatable, no responsive reflow.
- The quotes inside the image still say "BlueHive AI has been an absolute game changer…"

**Fix:** rebuild as real markup — 2–3 cards with quote text, avatar, name, credential. Data goes in
`src/data/home.ts`. Stack on mobile. This is a half-day change with an outsized payoff.

### 2. "How Ozwell Operates" is a 22 MB video of an infographic

`src/components/sections/FlowchartVideo.tsx` autoplays
`Copy-of-Ozwell-AI-Workflow-Flowchart.mp4` (22.4 MB) — a static 9-box flowchart.

- Box copy is unreadable at 1440px and ~4px tall on mobile.
- The only text a screen reader or crawler gets is `<h2 class="sr-only">`.
- Every box still says "BlueHive AI".
- Uses green arrows, which aren't in the brand palette.

**Fix:** replace with an HTML/SVG section. Nine steps is too many for a marketing page anyway —
collapse to 3–4 ("Listen → Understand → Act → Learn") as a responsive stepper, and keep the
long version for the Help Center if it's useful there.

### 3. ~50 MB of autoplaying video on one page

`public/videos/` totals 50.5 MB across three files, and all three render as
`<video autoPlay loop muted playsInline>` with **no `poster` and no `preload` hint**
(`FeatureRows.tsx:34`, `FlowchartVideo.tsx:14`).

Measured: 7.3 MB transferred before scrolling, 6.5 MB of it a single video. Full page view pulls
all three. They loop forever — a real battery and cellular-data cost.

**Fix, in order:** add `poster` + `preload="none"` and click-to-play; re-encode to <2 MB each
(these are screen-recordings — H.264 at a sane bitrate, plus WebM); consider replacing the
IVR-dashboard loop with a static screenshot.

### 4. FAQ eyebrow fails contrast

`FAQSection.tsx:14` uses `text-ozwell-gold` (`#fada00`) on white — roughly **1.3:1**, against a
4.5:1 AA requirement. "GET ANSWERS" is effectively invisible.

**Fix:** `text-primary-600` or `text-ozwell-ink-muted`. Audit the gold token generally — it only
works on dark surfaces.

### 5. Leftover BlueHive branding in user-facing copy

Initially scoped as "60 occurrences in `posts.json`, 25 in `docs.json` — sweep them." **On
inspection that was wrong, and a blind sweep would have done real damage.** Almost all of those
references are correct and must stay:

- **"BlueHive Health, LLC"** in `ozwell-pdsi-source-attributes` is the regulatory pDSI developer
  disclosure. Editing it would falsify a compliance document.
- **"BlueHive AI has been renamed to Ozwell"** in the release notes is the historical record.
- **`introduction-to-bluehive-healths-irm-practices`** (34 hits) is a company governance doc about
  BlueHive Health, not the product.
- Bibliography entries — "BlueHive. (2024, November 14)." — are citations.
- The migrated blog posts already use a **`BlueHive AI [Ozwell]`** bracketing convention.

The genuinely wrong one is a single line of marketing copy:

- `src/data/home.ts` — "**BlueHive** offers a range of features designed to boost your
  productivity…" in the "Work Smarter, Not Harder" section.

And two are **product facts, not copy bugs** — the fix is a product decision, not an edit:

- The Help Center's install guide says "search the App Store for **BlueHive AI**" because the
  listing is still named that (`apps.apple.com/us/app/bluehive-ai`, bundle `com.bluehive.mobile`).
  The instructions are accurate; renaming them would send users looking for an app that
  doesn't exist under that name. Rename the store listing first.
- ~~The hero's **Start Free Trial** points at `ai.bluehive.com` — the primary conversion path leaves
  the brand. Needs a redirect or a real `ozwell.ai` entry point.~~ Resolved: all app entry points
  now target `app.ozwell.ai`.

Also cosmetic: the release-notes post's header art reads "2021.01 – 2021.05" for a 2025.01–2025.05
post.

**Fix:** the one copy line (done), then treat the app-listing rename and the trial URL as product
tickets. Leave the regulatory, historical, and citation references alone.

### 6. The Help Center has no search

`/docs` is a page headed "How can we help?" with no search input anywhere, and article pages
(`/docs/[slug]`) have **no sidebar, no TOC, no related articles, no "was this helpful"** — a
breadcrumb is the only navigation. 10 articles across 12 categories.

**Fix:** client-side search over the generated docs JSON (10 articles — a filtered list is plenty,
no need for a search service), plus a persistent category sidebar on article pages.

---

## P1 — Structure and information architecture

### 7. `/docs-category/[slug]` is a dead end

Renders: hero "Getting Started" → heading "Browse by Topic" → heading "Getting Started" again →
two links → footer. It reuses `DocsHub` verbatim, so the label is wrong and the category name
appears three times. No sibling categories, no descriptions, no way onward.

### 8. `/docs` duplicates itself

The flat "Getting Started" list at the top lists the same articles as the "Getting Started" card in
the "Topics" grid below. Pick one pattern — I'd suggest: search, then "Popular articles", then the
category grid with one-line descriptions.

### 9. Article line length is ~130 characters

Both `blog/[slug]` and `docs/[slug]` rendered at a 1088px measure with 18px type. Optimal is 65–75
characters.

**Root cause was not `max-w-none`, as originally diagnosed.** The pages already asked for the right
width — `<Container className="max-w-3xl">`. It silently never applied: `Container` hardcoded
`max-w-6xl`, and two max-width utilities at equal specificity are resolved by their order in the
generated stylesheet, where Tailwind emits the larger one last. So `max-w-6xl` won every time, on
every page that tried to override it.

This is the kind of bug that survives review indefinitely, because the calling code reads correctly.

**Fix:** width is now a `Container` prop (`width="prose"`) rather than something passed through
`className`, so it can't be defeated by class-order roulette. Measure is now 71 characters on blog
posts and 68 in the Help Center.

### 10. The homepage has no narrative arc

9,700px desktop / 12,300px mobile across 12 sections, with three overlapping feature sections
(`FeatureRows`, `WorkSmarter` + `FeatureCardsPhone`, `Showcase`) and generic copy — "Communication
Tools", "User-Centric Design", "Seamless Integration" say nothing a competitor couldn't say.

**Suggested shape:** Hero → logos → the one-sentence problem → 3 differentiated capabilities
(scribing, phone/IVR, EHR-native) → Drummond/HIPAA proof → real testimonials → how it works →
FAQ → CTA. Roughly 8 sections, ~40% shorter, each one earning its scroll.

### 11. Blog index

- Posts categorised `uncategorized` render no category chip, so date/title baselines don't align
  across the row (2 of 4 cards). Cards end up ragged and unequal height.
- The 4th post sits alone on its own row.
- No featured post, no category filter, no search, no pagination scaffolding.
- One author renders as a raw username, `wreiske`, instead of a display name.

### 12. Blog post page

The featured image already contains the post title, the category label, and a decorative "learn
more" button — and the page repeats the H1 and category chip immediately above it. Also missing: a
TOC on a 9-minute read, an author bio, and any end-of-article CTA. The migrated blockquote has
doubled quote marks (`""Sometimes I don't know…""`).

### 13. No CTA on the homepage body

`/about-us` gets the `CTABand`; the homepage doesn't. The only conversion points are the hero and
the app-store band 9,000px down.

### 14. Footer is unfinished

White-on-white and low contrast, no logo, and `footerLinks` has only three entries — **Blog and
Help Center aren't linked from the footer at all**. No Privacy, no Terms, no copyright line.

### 15. Structured data only on blog posts

`JsonLd` is used in `blog/[slug]/page.tsx` only. Missing `Organization` /
`SoftwareApplication` on the homepage and — easy win — `FAQPage` for the 10 homepage Q&As.
(The FAQ itself uses native `<details>/<summary>`: accessible, zero JS. Keep that.)

### 16. H1 has no spaces and no keywords

Renders as `Say hi toOzwell.Your AI medical assistant` — three lines concatenated without
separators, which is what crawlers and screen readers get. It's also pure brand voice: nothing says
"AI medical scribe" or "ambient clinical documentation".

---

## P2 — Visual system

Right now there are three visual languages competing. Worth one consolidation pass:

| Issue                                                                                                                                                                                                                                                               | Where                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Icons in three unrelated styles** — navy line icons, `text-fuchsia-400` (fully off-palette), blue-in-tinted-circle                                                                                                                                                | `MissionSection`, `ValuesGrid.tsx:33`, `FeatureRows` |
| **Three card styles** — `rounded-3xl` gradient, `rounded-2xl` shadow, and square flat                                                                                                                                                                               | homepage vs `ValuesGrid` / `DocsHub`                 |
| **Shape dividers on every band.** The ellipse above the FAQ burns ~330px of empty blue; About Us stacks two waves back-to-back                                                                                                                                      | `ShapeDivider` usage                                 |
| **Logo cloud** uses raw vendor PNGs at wildly different weights and sizes; its heading is 35px — larger than some section titles — for what should be a small eyebrow. The white-knockout set on About Us is inconsistently sized and WebChart reads as a grey blob | `LogoCloud`, `SupportingLogosBand`                   |
| **Hero CTAs** are two ~500px full-width stacked pills with no primary/secondary hierarchy                                                                                                                                                                           | `Hero`                                               |
| **Hero mockup is cropped off the left edge on mobile**; mobile hero is 1,187px tall with ~400px of empty blue between the CTAs and the mockup                                                                                                                       | `Hero`                                               |
| **Left column is right-aligned**, so that copy is ragged-left and harder to read                                                                                                                                                                                    | `FeatureCardsPhone`                                  |
| **Ad-hoc section padding** — `py-10`, `py-12`, `py-14`, `py-16`, `pb-4 pt-10`, `pb-24 pt-28`. No rhythm scale                                                                                                                                                       | all sections                                         |
| **Asset hygiene** — `Ozwell-Branding-Whiteboard-2.png` is 3.7 MB; several 600–950 KB PNGs; WP-era names like `1-scaled.png`, `company-logos-2.png`                                                                                                                  | `public/images`                                      |
| **One typeface, one weight range** (Lato) with no display face — large headlines read generic                                                                                                                                                                       | `globals.css:55`                                     |

---

## Suggested sequencing

**Phase 1 — stop the bleeding (~1 week).** Items 1–6. Real testimonials, replace the flowchart
video, video posters + re-encode, fix the gold contrast, sweep BlueHive copy, add docs search.
This is where nearly all the perceived-quality gain lives.

**Phase 2 — IA and reading experience (~1 week).** Items 7–9 and 11–16. Fix the measure, rebuild
`/docs-category`, de-duplicate `/docs`, tidy the blog index and post template, finish the footer,
add JSON-LD.

**Phase 3 — design system pass (~1 week).** Item 10 plus the P2 table. Define one card style, one
icon style, a spacing scale, and a divider budget (my suggestion: dividers only on
white→gradient transitions, max three per page). Then restructure the homepage against the
narrative above.

**Phase 4 — the "beautiful" pass.** Once the system is consistent: a display typeface for
headlines, motion on scroll (respecting `prefers-reduced-motion`, as the marquee already does),
a real interactive product demo in place of the static phone PNGs, and dark-mode support
(`globals.css` already has the `dark` variant wired but unused).

## Worth keeping

The `@theme` token system, native `<details>` FAQ, `sitemap.ts` / `robots.ts` / `rss.xml`, the
`createMetadata` helper, the section-component split, and the `prefers-reduced-motion` guard on the
marquee — all good foundations.
