import { HeartHandshake, TrendingUp, Puzzle, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { FeatureIcon } from '@/components/ui/FeatureIcon'

const PILLAR_ICONS: LucideIcon[] = [HeartHandshake, TrendingUp, Puzzle]

interface MissionSectionProps {
  title: string
  description: string
  pillars: Array<{ title: string; description: string }>
}

export default function MissionSection({ title, description, pillars }: MissionSectionProps) {
  return (
    <Section>
      <Container reveal>
        <h2 className="text-center font-heading text-3xl font-bold text-ozwell-ink-strong sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <FeatureIcon icon={PILLAR_ICONS[i % PILLAR_ICONS.length]} size="lg" />
              <h3 className="mt-5 text-xl font-bold leading-snug text-ozwell-ink-strong">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ozwell-slate">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
