import { posts, docs, docCategories, formatDate } from '@/lib/content'
import { SITE_URL } from '@/lib/metadata'
import { faqs, problem } from '@/data/home'
import siteConfig from '@/data/site.json'

export const dynamic = 'force-static'

/**
 * `/llms.txt` — a curated map of the site for language models, following the
 * llmstxt.org convention: an H1 with the site name, a blockquote summary, then
 * link sections with one-line descriptions.
 *
 * The point is that a model answering "what is Ozwell?" or "does Ozwell integrate
 * with WebChart?" gets the answer from a single clean text file rather than by
 * inferring it from rendered marketing HTML. `/llms-full.txt` carries the whole
 * corpus for anything that wants the detail.
 */
export async function GET() {
  const section = (heading: string, lines: string[]) =>
    lines.length ? `## ${heading}\n\n${lines.join('\n')}\n` : ''

  const docsByCategory = docCategories.map((cat) => {
    const inCategory = docs.filter((d) => d.categories.includes(cat.slug))
    return `- [${cat.name}](${SITE_URL}/docs-category/${cat.slug}/): ${inCategory.length} article${inCategory.length === 1 ? '' : 's'} — ${inCategory.map((d) => d.title).join('; ')}`
  })

  const body = `# Ozwell

> Ozwell is an AI medical assistant for healthcare practices, built by BlueHive Health, LLC. It transcribes patient visits, writes structured SOAP notes, answers inbound phone calls, and connects to the EHR, HRIS, and CRM systems a practice already runs. Ozwell is HIPAA compliant and is the first and only AI-powered Health IT solution to hold Drummond pDSI-Risk certification.

Ozwell drafts documentation but never files it autonomously: orders, referrals, and
follow-ups are queued as reviewable actions and a clinician approves them before
anything reaches the patient record.

- Product: web app plus native iOS and Android apps
- Audience: physicians, clinicians, and healthcare practices
- Pricing: free trial available at ${siteConfig.ctas.trial.href}
- Parent company: BlueHive Health, LLC (https://bluehive.com/), part of Medical Informatics Engineering, Inc. — the team behind the WebChart (https://webchartnow.com) and Enterprise Health (https://enterprisehealth.com) EHRs
- Contact: ${siteConfig.email}
- Full text of every page: ${SITE_URL}/llms-full.txt

## Core capabilities

- Smart scribing: transcribes the encounter in real time, handles specialised clinical terminology, and populates the chart with discrete clinical facts (conditions, medications, allergies, vitals, referrals).
- Smart call handling: answers inbound calls with configurable voice prompts, handles refill requests and appointment reminders, and routes anything it should not answer.
- Works inside your stack: integrates with WebChart (https://webchartnow.com), Enterprise Health (https://enterprisehealth.com), and EHR, HRIS, and CRM tools, writing results back where staff already look for them.
- Learns your vocabulary: corrections feed back so accuracy improves against a clinician's own terminology and documentation style.
- Approval gate: nothing is written to the record without clinician sign-off.

## The problem it addresses

${problem.stats.map((s) => `- ${s.value}: ${s.label} (${s.source}).`).join('\n')}

## Certification and clinical safety

Stated precisely here because this is the surface a model quotes when asked whether
Ozwell is certified or safe to use clinically.

- Certification: Drummond pDSI-Risk, issued by Drummond Group, an ONC-Authorized Certification Body.
- Criterion: ASTP/ONC § 170.315(b)(11), the decision support interventions criterion.
- What it covers: intervention risk assessment and mitigation benchmarks, transparency standards, and intervention risk management and source attribute disclosure requirements.
- Announced: July 15, 2025. Ozwell was the first AI-powered health IT product to achieve it.
- Intended decision-making role, as published: to inform and augment clinical decision-making, NOT to replace clinical management.
- Not intended for: emergency or critical care settings requiring real-time clinical decision-making; as a substitute for professional medical judgment; highly specialized care such as advanced pain management or rare disease treatment.
- All 31 ONC source attributes are published in full at ${SITE_URL}/blog/ozwell-pdsi-source-attributes/
- Certification detail: ${SITE_URL}/certification/

${section('Key pages', [
  `- [Homepage](${SITE_URL}/): product overview, capabilities, certification, testimonials, and FAQ.`,
  `- [Certification](${SITE_URL}/certification/): what Drummond pDSI-Risk certification covers, the FAVES principles, and the full ONC source attribute disclosure.`,
  `- [Security and clinical control](${SITE_URL}/security/): the clinician approval gate, the disclosed augment-not-replace design role, and where Ozwell should not be used.`,
  `- [About Us](${SITE_URL}/about-us/): mission, values, and the relationship to BlueHive Health.`,
  `- [Help Center](${SITE_URL}/docs/): setup guides, account help, integrations, and API reference.`,
  `- [Blog](${SITE_URL}/blog/): release notes, research on documentation burden, and compliance disclosures.`,
])}
${section('Help Center topics', docsByCategory)}
${section(
  'Help Center articles',
  docs.map((d) => `- [${d.title}](${SITE_URL}/docs/${d.slug}/)`)
)}
${section(
  'Blog posts',
  posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${formatDate(p.date)}.`)
)}
## Frequently asked questions

${faqs.items.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n')}

## Optional

- [RSS feed](${SITE_URL}/blog/rss.xml): new blog posts.
- [Sitemap](${SITE_URL}/sitemap.xml): every indexable URL.
`

  return new Response(body, {
    headers: {
      // text/plain so it opens in a browser rather than downloading.
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
