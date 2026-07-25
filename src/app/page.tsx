import { createMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/Hero'
import LogoCloud from '@/components/sections/LogoCloud'
import FeatureVideo from '@/components/sections/FeatureVideo'
import CertificationBand from '@/components/sections/CertificationBand'
import FeatureRows from '@/components/sections/FeatureRows'
import Testimonials from '@/components/sections/Testimonials'
import WorkSmarter from '@/components/sections/WorkSmarter'
import FeatureCardsPhone from '@/components/sections/FeatureCardsPhone'
import FlowchartVideo from '@/components/sections/FlowchartVideo'
import Showcase from '@/components/sections/Showcase'
import FAQSection from '@/components/sections/FAQSection'
import AppDownloadCTA from '@/components/sections/AppDownloadCTA'
import siteConfig from '@/data/site.json'
import {
  hero,
  logoCloud,
  featureVideo,
  certification,
  featureRows,
  testimonials,
  workSmarter,
  featureCards,
  flowchartVideo,
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

export default function Page() {
  return (
    <>
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
      <FeatureVideo youtubeId={featureVideo.youtubeId} title={featureVideo.title} />
      <CertificationBand
        eyebrow={certification.eyebrow}
        title={certification.title}
        description={certification.description}
        badges={certification.badges}
        image={certification.image}
      />
      <FeatureRows items={featureRows} />
      <Testimonials
        title={testimonials.title}
        description={testimonials.description}
        image={testimonials.image}
      />
      <WorkSmarter title={workSmarter.title} description={workSmarter.description} />
      <FeatureCardsPhone
        left={featureCards.left}
        right={featureCards.right}
        phoneImage={featureCards.phoneImage}
      />
      <FlowchartVideo video={flowchartVideo.video} title={flowchartVideo.title} />
      <Showcase
        title={showcase.title}
        description={showcase.description}
        screenshots={showcase.screenshots}
      />
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
