import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import SupportingLogosBand from '@/components/sections/SupportingLogosBand'
import MissionSection from '@/components/sections/MissionSection'
import ValuesGrid from '@/components/sections/ValuesGrid'
import CTABand from '@/components/sections/CTABand'
import { aboutHero, mission, pillars, supportingLogos, values, aboutCta } from '@/data/about'

export const metadata = createMetadata({
  title: 'About Us',
  description:
    'At Ozwell, we believe technology should empower—not burden—healthcare professionals. Learn about our mission and values.',
  path: '/about-us/',
})

export default function Page() {
  return (
    <>
      <PageHero title={aboutHero.title} image={aboutHero.image} />
      <MissionSection title={mission.title} description={mission.description} pillars={pillars} />
      <SupportingLogosBand title={supportingLogos.title} logos={supportingLogos.logos} />
      <ValuesGrid title={values.title} items={values.items} />
      <CTABand title={aboutCta.title} cta={aboutCta.cta} />
    </>
  )
}
