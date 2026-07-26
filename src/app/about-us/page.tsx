import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import SupportingLogosBand from '@/components/sections/SupportingLogosBand'
import MissionSection from '@/components/sections/MissionSection'
import ValuesGrid from '@/components/sections/ValuesGrid'
import CTASection from '@/components/sections/CTASection'
import siteConfig from '@/data/site.json'
import { aboutHero, mission, pillars, supportingLogos, values, aboutCta } from '@/data/about'

export const metadata = createMetadata({
  title: 'About Ozwell — AI built for clinicians, by BlueHive Health',
  description:
    'Ozwell is an AI medical assistant built by BlueHive Health. Our mission, our values, and why we think documentation software should get out of a clinician’s way.',
  path: '/about-us/',
  keywords: ['about Ozwell', 'BlueHive Health', 'healthcare AI company', 'clinical AI mission'],
})

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
        image={aboutHero.image}
        breadcrumbs={[{ name: 'About Us' }]}
      />
      <MissionSection title={mission.title} description={mission.description} pillars={pillars} />
      <SupportingLogosBand title={supportingLogos.title} logos={supportingLogos.logos} />
      <ValuesGrid title={values.title} description={values.description} items={values.items} />
      <CTASection
        title={aboutCta.title}
        description={aboutCta.description}
        secondary={siteConfig.ctas.demo}
      />
    </>
  )
}
