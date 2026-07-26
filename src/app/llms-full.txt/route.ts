import { posts, docs, docCategories, formatDate } from '@/lib/content'
import { htmlToMarkdown } from '@/lib/markdown'
import { SITE_URL } from '@/lib/metadata'
import {
  faqs,
  problem,
  featureRows,
  certification,
  testimonials,
  howItWorks,
  featureCards,
} from '@/data/home'
import { mission, pillars, values } from '@/data/about'
import siteConfig from '@/data/site.json'

export const dynamic = 'force-static'

/**
 * `/llms-full.txt` — every page of the site as one Markdown document.
 *
 * `/llms.txt` is the index; this is the corpus, so a model can answer a detailed
 * question ("how do I reset my Ozwell password?") from the actual article text
 * instead of guessing from a title. The marketing copy is assembled from the same
 * `src/data` modules the pages render, so the file cannot drift out of sync with
 * what a human reader sees.
 */
export async function GET() {
  const marketing = `# Ozwell — complete site content

> Ozwell is an AI medical assistant for healthcare practices, built by BlueHive
> Health, LLC. It transcribes patient visits, writes structured SOAP notes, answers
> inbound calls, and integrates with the EHR and other systems a practice runs.
> HIPAA compliant; the first and only Drummond pDSI-Risk certified AI-powered
> Health IT solution.

Source: ${SITE_URL} · Contact: ${siteConfig.email} · Free trial: ${siteConfig.ctas.trial.href}

---

# Product overview

## What Ozwell does

${featureRows
  .map(
    (row) =>
      `### ${row.eyebrow}: ${row.title}\n\n${row.description}\n\n${row.bullets.map((b) => `- ${b.label}`).join('\n')}`
  )
  .join('\n\n')}

## How it works

${howItWorks.description}

${howItWorks.steps.map((step, i) => `### Step ${i + 1}: ${step.title}\n\n${step.description}`).join('\n\n')}

## Capabilities in detail

${featureCards.description}

${featureCards.cards.map((card) => `### ${card.title}\n\n${card.description}`).join('\n\n')}

## Security and certification

${certification.title}

${certification.description}

Verified attributes: ${certification.badges.join(', ')}.

## The documentation burden Ozwell addresses

${problem.description}

${problem.stats.map((s) => `- **${s.value}** — ${s.label}. Source: ${s.source}.`).join('\n')}

## Customer testimonials

${testimonials.items
  .map(
    (t) =>
      `### ${t.name}, ${t.title}\n\n> ${t.quote}\n\n(Quotes predate the BlueHive AI → Ozwell rename; the bracketed name marks the current product name.)`
  )
  .join('\n\n')}

## Frequently asked questions

${faqs.items.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n')}

---

# About Ozwell

## ${mission.title}

${mission.description}

${pillars.map((p) => `### ${p.title}\n\n${p.description}`).join('\n\n')}

## ${values.title}

${values.items.map((v) => `### ${v.title}\n\n${v.description}`).join('\n\n')}

---

# Help Center

${docCategories
  .map((cat) => {
    const inCategory = docs.filter((d) => d.categories.includes(cat.slug))
    return `## Topic: ${cat.name}\n\n${inCategory
      .map(
        (doc) =>
          `### ${doc.title}\n\nURL: ${SITE_URL}/docs/${doc.slug}/\n\n${htmlToMarkdown(doc.content, SITE_URL)}`
      )
      .join('\n\n')}`
  })
  .join('\n\n')}

---

# Blog

${posts
  .map(
    (post) =>
      `## ${post.title}\n\nURL: ${SITE_URL}/blog/${post.slug}/\nPublished: ${formatDate(post.date)}${
        post.authorName ? `\nAuthor: ${post.authorName}` : ''
      }${post.tags.length ? `\nTags: ${post.tags.map((t) => t.replace(/-/g, ' ')).join(', ')}` : ''}\n\n${htmlToMarkdown(
        post.content,
        SITE_URL
      )}`
  )
  .join('\n\n---\n\n')}
`

  return new Response(marketing, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
