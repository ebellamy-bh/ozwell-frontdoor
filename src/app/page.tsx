import { createMetadata } from '@/lib/metadata'
import Hero from '@/components/sections/Hero'
import LogoCloud from '@/components/sections/LogoCloud'
import CertificationBand from '@/components/sections/CertificationBand'
import ValuePropVideos from '@/components/sections/ValuePropVideos'
import Testimonials from '@/components/sections/Testimonials'
import WorkSmarter from '@/components/sections/WorkSmarter'
import Showcase from '@/components/sections/Showcase'
import FAQSection from '@/components/sections/FAQSection'
import AppDownloadCTA from '@/components/sections/AppDownloadCTA'
import siteConfig from '@/data/site.json'
import {
  hero,
  logoCloud,
  certification,
  valueProps,
  testimonials,
  workSmarter,
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
      <CertificationBand title={certification.title} image={certification.image} />
      <ValuePropVideos items={valueProps} />
      <Testimonials
        title={testimonials.title}
        description={testimonials.description}
        image={testimonials.image}
        youtubeId={testimonials.youtubeId}
      />
      <WorkSmarter
        title={workSmarter.title}
        description={workSmarter.description}
        images={workSmarter.images}
        video={workSmarter.video}
        phoneImage={workSmarter.phoneImage}
      />
      <Showcase title={showcase.title} description={showcase.description} screenshots={showcase.screenshots} />
      <FAQSection eyebrow={faqs.eyebrow} title={faqs.title} description={faqs.description} items={faqs.items} />
      <AppDownloadCTA
        title={appCta.title}
        subtitle={appCta.subtitle}
        banner={appCta.banner}
      />
    </>
  )
}
