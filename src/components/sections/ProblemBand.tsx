import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Stat, { type StatItem } from '@/components/ui/Stat'
import Button from '@/components/ui/Button'

interface ProblemBandProps {
  eyebrow: string
  title: string
  description: string
  stats: StatItem[]
  cta: { label: string; href: string }
}

/**
 * The one section that states the problem.
 *
 * The homepage went from "say hi to Ozwell" straight into feature lists, so
 * nothing on the page established why documentation software is worth a
 * clinician's attention. Navy rather than the blue gradient: it reads as the
 * serious beat in the page, and keeps two blue bands from sitting back to back.
 *
 * Every figure is attributed. For a clinical audience an unsourced statistic is
 * worse than none, so `Stat` takes the citation as part of its data.
 */
export default function ProblemBand({ eyebrow, title, description, stats, cta }: ProblemBandProps) {
  return (
    <Section tone="navy" spacing="md">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
            onDark
          />
          <Button
            href={cta.href}
            variant="inverse-outline"
            size="md"
            icon={ArrowRight}
            iconAfter
            className="mt-8"
          >
            {cta.label}
          </Button>
        </div>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {stats.map((stat) => (
            <li key={stat.value}>
              <Stat {...stat} onDark />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
