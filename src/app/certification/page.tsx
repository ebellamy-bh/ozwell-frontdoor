import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { faqSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import FactGrid from '@/components/sections/FactGrid'
import PrincipleGrid from '@/components/sections/PrincipleGrid'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import siteConfig from '@/data/site.json'
import {
  certificationHero,
  certificationFacts,
  pdsiExplainer,
  favesPrinciples,
  disclosureMap,
  certificationFaqs,
  SOURCE_ATTRIBUTES_POST,
  IRM_POST,
} from '@/data/trust'

const DESCRIPTION =
  'Ozwell is the first AI-powered health IT product to hold Drummond pDSI-Risk certification, under ASTP/ONC § 170.315(b)(11). What was certified, what FAVES requires, and our full ONC source attribute disclosure.'

export const metadata = createMetadata({
  title: 'Drummond pDSI-Risk certification',
  description: DESCRIPTION,
  path: '/certification/',
  keywords: [
    'Drummond pDSI-Risk certification',
    'predictive decision support intervention',
    'ONC 170.315(b)(11)',
    'FAVES principles',
    'AI source attributes',
    'intervention risk management',
    'certified healthcare AI',
  ],
})

/**
 * Certification page.
 *
 * The strongest differentiator the company has was, until now, a badge on the
 * homepage and a claim in the FAQ. The thirty-one published source attributes behind
 * it sat in a blog post that nothing linked to except one CTA, and "FAVES" — the
 * framework a careful buyer will actually check us against — appeared nowhere on the
 * site at all.
 *
 * "First and only" is stated here as "the first", which is what Drummond's own
 * announcement supports; whether we are still the only one is a claim that decays
 * without anyone editing the page.
 */
export default function Page() {
  return (
    <>
      {/* No `BreadcrumbList` here: `PageHero` renders `Breadcrumbs`, which emits the
          trail and its schema together. Adding one would put two on the page. */}
      <JsonLd data={faqSchema(certificationFaqs.items)} />

      <PageHero
        eyebrow={certificationHero.eyebrow}
        title={certificationHero.title}
        description={certificationHero.description}
        breadcrumbs={[{ name: 'Certification' }]}
      />

      <FactGrid
        eyebrow={certificationFacts.eyebrow}
        title={certificationFacts.title}
        description={certificationFacts.description}
        facts={certificationFacts.items}
      />

      {/* The badge, next to the definition it certifies against — the homepage band
          shows the badge but never says what a pDSI is. */}
      <Section spacing="md">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={pdsiExplainer.eyebrow}
              title={pdsiExplainer.title}
              description={pdsiExplainer.description}
              align="left"
            />
            <ol className="mt-9 space-y-5">
              {pdsiExplainer.tests.map((test, i) => (
                <li key={test.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-extrabold text-primary-800"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-ozwell-ink-strong">{test.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ozwell-slate">{test.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Image
            src="/images/thumb-Drummond-Certified-pDSI-RISK-2025.webp"
            alt="Drummond Certified pDSI-RISK 2025 certification badge"
            width={600}
            height={600}
            className="mx-auto h-52 w-auto lg:h-64"
          />
        </div>
      </Section>

      <PrincipleGrid
        eyebrow={favesPrinciples.eyebrow}
        title={favesPrinciples.title}
        description={favesPrinciples.description}
        items={favesPrinciples.items}
      />

      <Section tone="mist" spacing="md">
        <SectionHeading
          eyebrow={disclosureMap.eyebrow}
          title={disclosureMap.title}
          description={disclosureMap.description}
        />

        {/* A map into the disclosure, not a copy of it. Reproducing 34,000 characters
            of a regulatory document here would create a second version that can
            silently drift from the dated one. */}
        <dl className="mt-12 grid gap-6 sm:grid-cols-2">
          {disclosureMap.groups.map((group) => (
            <Card key={group.title} tone="plain" padding="md">
              <dt className="font-bold text-ozwell-ink-strong">{group.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ozwell-slate">
                {group.description}
              </dd>
            </Card>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href={SOURCE_ATTRIBUTES_POST}
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconAfter
          >
            Read all 31 source attributes
          </Button>
          <Button href={IRM_POST} variant="secondary" size="md">
            Our risk management practices
          </Button>
        </div>
      </Section>

      <FAQSection
        eyebrow={certificationFaqs.eyebrow}
        title={certificationFaqs.title}
        description={certificationFaqs.description}
        items={certificationFaqs.items}
      />

      <CTASection
        eyebrow="Certified, and still supporting"
        title="See what a clinician-approved draft looks like"
        description="Start free on the web. Nothing reaches a patient record until you approve it."
        secondary={siteConfig.ctas.demo}
      />

      {/* A trust page that doesn't lead anywhere else on the subject is a dead end. */}
      <Section spacing="sm">
        <p className="text-center text-[15px] text-ozwell-slate">
          Also worth reading:{' '}
          <Link href="/security/" className="font-semibold text-primary-700 hover:text-primary-800">
            how Ozwell handles the record
          </Link>
          .
        </p>
      </Section>
    </>
  )
}
