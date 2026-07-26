import { createMetadata } from '@/lib/metadata'
import { faqSchema, howToSchema, softwareApplicationSchema, videoObjectSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import Hero from '@/components/sections/Hero'
import LogoCloud from '@/components/sections/LogoCloud'
import ProblemBand from '@/components/sections/ProblemBand'
import FeatureVideo from '@/components/sections/FeatureVideo'
import FeatureRows from '@/components/sections/FeatureRows'
import ComparisonTable from '@/components/sections/ComparisonTable'
import CertificationBand from '@/components/sections/CertificationBand'
import Testimonials from '@/components/sections/Testimonials'
import HowItWorks from '@/components/sections/HowItWorks'
import FeatureGrid from '@/components/sections/FeatureGrid'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import siteConfig from '@/data/site.json'
import {
  hero,
  logoCloud,
  problem,
  featureVideo,
  featureRows,
  comparison,
  certification,
  testimonials,
  howItWorks,
  featureCards,
  faqs,
  closingCta,
} from '@/data/home'

export const metadata = createMetadata({
  title: 'Ozwell — the AI medical assistant that writes your notes',
  description:
    'Ozwell transcribes patient visits, writes structured SOAP notes, and answers your phone lines — HIPAA compliant and the only Drummond pDSI-Risk certified AI health IT solution. Built for physicians by BlueHive Health.',
  path: '/',
  keywords: [
    'AI medical scribe',
    'ambient clinical documentation',
    'AI medical assistant',
    'automated SOAP notes',
    'EHR documentation automation',
    'physician burnout',
    'medical transcription AI',
    'AI phone assistant for medical practices',
  ],
})

/**
 * Homepage.
 *
 * The narrative was rebuilt. The legacy page ran 12 sections and ~9,700px on
 * desktop (~12,300px on mobile) across three overlapping feature sections, and
 * never stated the problem it solves.
 *
 * The arc now: hook → who trusts it → why it matters → see it → what it does →
 * why trust it → who says so → how it works → what else → objections → act.
 *
 * Two sections were cut rather than restyled. "Work Smarter" was a heading and a
 * paragraph with no content of its own, so it became the `FeatureGrid` heading;
 * the screenshot marquee slid the same five product shots past too fast to read,
 * inside ~1,400px of gradient and 275px shape dividers, and those shots now
 * appear at legible size in `FeatureRows` and `FeatureGrid` instead.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={softwareApplicationSchema({
          description:
            'AI medical assistant that transcribes patient visits, writes structured clinical notes, and handles inbound calls for healthcare practices.',
          audience: 'Physicians, clinicians, and healthcare practices',
        })}
      />
      {/* Mirrors the on-page accordion, so the Q&As are eligible as rich results
          and answer engines can quote them directly. */}
      <JsonLd data={faqSchema(faqs.items)} />

      {/* The four-step flow below is a HowTo in all but markup. */}
      <JsonLd
        data={howToSchema({
          name: howItWorks.title,
          description: howItWorks.description,
          steps: howItWorks.steps,
        })}
      />

      {/* Three videos on this page described none of themselves to a crawler. */}
      <JsonLd
        data={videoObjectSchema({
          name: featureVideo.title,
          description: featureVideo.description,
          uploadDate: featureVideo.uploadDate,
          duration: featureVideo.duration,
          thumbnailUrl: featureVideo.thumbnailUrl,
          embedUrl: `https://www.youtube.com/embed/${featureVideo.youtubeId}`,
        })}
      />
      {featureRows.map((row) =>
        row.media.kind === 'video' ? (
          <JsonLd
            key={row.media.src}
            data={videoObjectSchema({
              name: row.media.name,
              description: row.media.description,
              uploadDate: row.media.uploadDate,
              duration: row.media.duration,
              thumbnailUrl: row.media.poster,
              contentUrl: row.media.src,
            })}
          />
        ) : null
      )}

      <Hero
        eyebrowLines={hero.eyebrowLines}
        subheading={hero.subheading}
        description={hero.description}
        trustPoints={hero.trustPoints}
        image={hero.image}
        chips={hero.chips}
        chipHref={hero.chipHref}
        primaryCta={siteConfig.ctas.trial}
        secondaryCta={siteConfig.ctas.watchDemo}
      />

      <LogoCloud title={logoCloud.title} logos={logoCloud.logos} />

      <ProblemBand
        eyebrow={problem.eyebrow}
        title={problem.title}
        description={problem.description}
        stats={problem.stats}
        cta={problem.cta}
      />

      <FeatureVideo
        eyebrow={featureVideo.eyebrow}
        youtubeId={featureVideo.youtubeId}
        title={featureVideo.title}
        description={featureVideo.description}
      />

      <FeatureRows items={featureRows} />

      <CertificationBand
        eyebrow={certification.eyebrow}
        title={certification.title}
        description={certification.description}
        badges={certification.badges}
        image={certification.image}
        cta={certification.cta}
      />

      <ComparisonTable
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        description={comparison.description}
        columns={comparison.columns}
        rows={comparison.rows}
      />

      <Testimonials
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        description={testimonials.description}
        items={testimonials.items}
      />

      <HowItWorks
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        description={howItWorks.description}
        steps={howItWorks.steps}
      />

      <FeatureGrid
        eyebrow={featureCards.eyebrow}
        title={featureCards.title}
        description={featureCards.description}
        cards={featureCards.cards}
        phoneImage={featureCards.phoneImage}
      />

      <FAQSection
        eyebrow={faqs.eyebrow}
        title={faqs.title}
        description={faqs.description}
        items={faqs.items}
      />

      <CTASection
        eyebrow={closingCta.eyebrow}
        title={closingCta.title}
        description={closingCta.description}
        secondary={siteConfig.ctas.demo}
        showApps
        spacing="md"
        dividers="top"
      />
    </>
  )
}
