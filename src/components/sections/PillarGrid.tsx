import {
  ShieldCheck,
  Stethoscope,
  BadgeCheck,
  Award,
  Eye,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import IconBadge from '@/components/ui/IconBadge'

const PILLAR_ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  certificate: BadgeCheck,
  badge: Award,
  eye: Eye,
  clipboard: ClipboardCheck,
}

export interface Pillar {
  icon: string
  title: string
  description: string
}

interface PillarGridProps {
  eyebrow: string
  title: string
  description: string
  items: Pillar[]
  tone?: 'white' | 'mist'
}

/**
 * Named controls on a trust page.
 *
 * Its own icon map rather than reusing `ValuesGrid`, which assigns icons by array
 * index — fine for company values, where the glyphs are decorative, but wrong here:
 * a reader scanning for the approval gate should be able to find the shield.
 */
export default function PillarGrid({
  eyebrow,
  title,
  description,
  items,
  tone = 'white',
}: PillarGridProps) {
  return (
    <Section tone={tone} spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = PILLAR_ICONS[item.icon]
          return (
            <Card key={item.title} as="li" tone={tone === 'mist' ? 'plain' : 'raised'} padding="md">
              {Icon ? <IconBadge icon={Icon} /> : null}
              <h3 className="mt-5 text-xl font-bold text-ozwell-ink-strong">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ozwell-slate">
                {item.description}
              </p>
            </Card>
          )
        })}
      </ul>
    </Section>
  )
}
