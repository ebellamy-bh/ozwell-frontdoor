import { createMetadata, SITE_NAME, SITE_URL } from '@/lib/metadata'
import JsonLd from '@/components/sections/JsonLd'
import Hero from '@/components/sections/Hero'
import LogoCloud from '@/components/sections/LogoCloud'
import FeatureVideo from '@/components/sections/FeatureVideo'
import CertificationBand from '@/components/sections/CertificationBand'
import FeatureRows from '@/components/sections/FeatureRows'
import Testimonials from '@/components/sections/Testimonials'
import ProblemStats from '@/components/sections/ProblemStats'
import ProductHighlights from '@/components/sections/ProductHighlights'
import HowItWorks from '@/components/sections/HowItWorks'
import Showcase from '@/components/sections/Showcase'
import FAQSection from '@/components/sections/FAQSection'
import AppDownloadCTA from '@/components/sections/AppDownloadCTA'
import CTABand from '@/components/sections/CTABand'
import siteConfig from '@/data/site.json'
import {
  hero,
  logoCloud,
  featureVideo,
  certification,
  featureRows,
  testimonials,
  problem,
  productHighlights,
  howItWorks,
  showcase,
  faqs,
  appCta,
} from '@/data/home'

export const metadata = createMetadata({
  title: "Meet Ozwell – The Extra Set of Hands You've Always Needed",
  description:
    'Ozwell automates medical documentation so you can focus on what truly matters. Your AI medical assistant — designed for physicians, by BlueHive Health.',
  path: '/',
})

/** Structured data — the site previously emitted JSON-LD on blog posts only. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/Ozwell-logo.png`,
  email: siteConfig.email,
  description: siteConfig.aboutBlurb,
  parentOrganization: { '@type': 'Organization', name: 'BlueHive Health, LLC' },
  sameAs: siteConfig.social.map((s) => s.href),
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ozwell',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android, Web',
  url: SITE_URL,
  description:
    'AI medical assistant that transcribes patient visits, writes structured clinical notes, and handles inbound calls for healthcare practices.',
  publisher: { '@type': 'Organization', name: 'BlueHive Health, LLC' },
  offers: { '@type': 'Offer', category: 'free trial', url: siteConfig.ctas.trial.href },
}

/** Mirrors the on-page accordion, so the Q&As are eligible as rich results. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <Hero
        eyebrowLines={hero.eyebrowLines}
        subheading={hero.subheading}
        description={hero.description}
        image={hero.image}
        chips={hero.chips}
        chipHref={hero.chipHref}
        primaryCta={siteConfig.ctas.trial}
        secondaryCta={siteConfig.ctas.watchDemo}
      />
      <LogoCloud title={logoCloud.title} logos={logoCloud.logos} />

      {/* Narrative order: state the problem, show the product, explain how it works, then prove it.
          Previously the page went hero → logos → product video, so a reader met the solution before
          the problem and the proof (certification, testimonials) trailed the feature list. */}
      <ProblemStats
        eyebrow={problem.eyebrow}
        title={problem.title}
        description={problem.description}
        stats={problem.stats}
        link={problem.link}
      />
      <FeatureVideo youtubeId={featureVideo.youtubeId} title={featureVideo.title} />
      <FeatureRows items={featureRows} />
      <ProductHighlights
        eyebrow={productHighlights.eyebrow}
        title={productHighlights.title}
        description={productHighlights.description}
        cards={productHighlights.cards}
        phoneImage={productHighlights.phoneImage}
      />
      <HowItWorks
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        description={howItWorks.description}
        steps={howItWorks.steps}
      />
      <CertificationBand
        eyebrow={certification.eyebrow}
        title={certification.title}
        description={certification.description}
        badges={certification.badges}
        image={certification.image}
      />
      <Testimonials
        title={testimonials.title}
        description={testimonials.description}
        items={testimonials.items}
      />
      <Showcase
        title={showcase.title}
        description={showcase.description}
        screenshots={showcase.screenshots}
      />
      <CTABand title="Ready to get your evenings back?" cta={siteConfig.ctas.trial} />
      <FAQSection
        eyebrow={faqs.eyebrow}
        title={faqs.title}
        description={faqs.description}
        items={faqs.items}
      />
      <AppDownloadCTA title={appCta.title} subtitle={appCta.subtitle} banner={appCta.banner} />
    </>
  )
}
