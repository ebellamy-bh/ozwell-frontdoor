import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import PillarGrid from '@/components/sections/PillarGrid'
import CTASection from '@/components/sections/CTASection'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import siteConfig from '@/data/site.json'
import { securityHero, securityPillars, SOURCE_ATTRIBUTES_POST, IRM_POST } from '@/data/trust'

const DESCRIPTION =
  'How Ozwell handles the patient record: a clinician approves everything before it files, the AI is designed to augment rather than replace clinical judgment, and its risk management is independently certified under ASTP/ONC § 170.315(b)(11).'

export const metadata = createMetadata({
  title: 'Security and clinical control',
  description: DESCRIPTION,
  path: '/security/',
  keywords: [
    'HIPAA compliant AI scribe',
    'clinical AI safety',
    'human in the loop clinical documentation',
    'healthcare AI governance',
    'AI medical scribe security',
  ],
})

/**
 * Security and trust page.
 *
 * `/#security` was an anchor onto a marketing band about the Drummond badge — it
 * could not rank, could not be linked to as a subject, and answered none of the
 * questions a buyer brings to a page with that name.
 *
 * Scoped deliberately to claims this site already publishes: the approval gate, the
 * disclosed augment-not-replace design role, HIPAA compliance, the certification, and
 * the published limits. Encryption specifics, model-provider retention, subprocessors,
 * and BAAs are *not* asserted here, because we have nothing published to back them
 * and inventing reassurance on exactly those five points is the one thing that would
 * make this page worse than no page. `securityGaps` in `src/data/trust.ts` has the
 * copy for naming them out loud once that's a decision someone has made.
 */
export default function Page() {
  return (
    <>
      {/* `PageHero` → `Breadcrumbs` emits the `BreadcrumbList`. This page adds no
          schema of its own: it makes no claim a `FAQPage` or `Product` would carry. */}
      <PageHero
        eyebrow={securityHero.eyebrow}
        title={securityHero.title}
        description={securityHero.description}
        breadcrumbs={[{ name: 'Security' }]}
      />

      <PillarGrid
        eyebrow={securityPillars.eyebrow}
        title={securityPillars.title}
        description={securityPillars.description}
        items={securityPillars.items}
      />

      <Section tone="mist" spacing="md">
        <SectionHeading
          eyebrow="The approval gate"
          title="A clinician is always the last step before the chart"
          description="This is the single most important thing to understand about how Ozwell works, so it is worth stating on its own rather than as one bullet among six."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-ozwell-slate">
          <p>
            Ozwell listens to the encounter, drafts a structured note, and queues the orders,
            referrals, and follow-ups it identified. All of it arrives as a reviewable action.
            Nothing is written to the patient record until a clinician reads it and approves it.
          </p>
          <p>
            That is a design constraint, not a setting. Our published intended decision-making role
            under ONC&rsquo;s source attribute requirements is to{' '}
            <strong className="font-semibold text-ozwell-ink">
              inform and augment decision-making, not to replace clinical management
            </strong>{' '}
            — which means the boundary is part of what was independently reviewed during
            certification, not a preference we could quietly change.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/certification/" variant="primary" size="md" icon={ArrowRight} iconAfter>
            How the certification works
          </Button>
          <Button href={SOURCE_ATTRIBUTES_POST} variant="secondary" size="md">
            Read the full disclosure
          </Button>
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeading
          eyebrow="Where Ozwell should not be used"
          title="The limits are published, not buried"
          description="A tool that never states its boundaries is asking you to discover them in production. Ours are part of the certified disclosure."
        />
        <ul className="mx-auto mt-10 max-w-3xl space-y-4">
          {[
            'Emergency or critical care settings where real-time clinical decision-making is required.',
            'As a substitute for professional medical judgment or expertise.',
            'Highly specialized or nuanced care, such as advanced pain management or rare disease treatment.',
            'Self-treating complex medical conditions without professional oversight.',
          ].map((limit) => (
            <li
              key={limit}
              className="rounded-xl border border-ozwell-border bg-white p-5 leading-relaxed text-ozwell-ink"
            >
              {limit}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl text-center text-[15px] text-ozwell-slate">
          The known risks and limitations behind these, including the limits of our fairness and
          validity testing, are set out in the{' '}
          <Link
            href={SOURCE_ATTRIBUTES_POST}
            className="font-semibold text-primary-700 hover:text-primary-800"
          >
            source attribute disclosure
          </Link>{' '}
          and our{' '}
          <Link href={IRM_POST} className="font-semibold text-primary-700 hover:text-primary-800">
            intervention risk management practices
          </Link>
          .
        </p>
      </Section>

      <CTASection
        eyebrow="Questions we have not answered here"
        title="Ask us directly"
        description="For security reviews, data processing questions, or anything this page does not cover, email info@ozwell.ai and we will get you a real answer."
        secondary={siteConfig.ctas.demo}
      />
    </>
  )
}
