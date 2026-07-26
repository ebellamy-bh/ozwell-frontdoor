import { HeartHandshake, TrendingUp, Puzzle, type LucideIcon } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import IconBadge from '@/components/ui/IconBadge'

const PILLAR_ICONS: LucideIcon[] = [HeartHandshake, TrendingUp, Puzzle]

interface MissionSectionProps {
  title: string
  description: string
  pillars: Array<{ title: string; description: string }>
}

export default function MissionSection({ title, description, pillars }: MissionSectionProps) {
  return (
    <Section spacing="md">
      <SectionHeading title={title} description={description} />
      <ul className="mt-14 grid gap-10 md:grid-cols-3">
        {pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]
          return (
            <li key={pillar.title}>
              <IconBadge icon={Icon} size="lg" />
              <h3 className="mt-5 text-xl font-bold leading-snug text-ozwell-ink-strong">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ozwell-slate">{pillar.description}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
