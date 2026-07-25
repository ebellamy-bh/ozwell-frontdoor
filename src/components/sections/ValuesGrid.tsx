import {
  HeartHandshake,
  Lightbulb,
  Eye,
  ShieldCheck,
  Users,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { FeatureIcon } from '@/components/ui/FeatureIcon'

const VALUE_ICONS: LucideIcon[] = [HeartHandshake, Lightbulb, Eye, ShieldCheck, Users, LifeBuoy]

interface ValuesGridProps {
  title: string
  items: Array<{ title: string; description: string }>
}

export default function ValuesGrid({ title, items }: ValuesGridProps) {
  return (
    <Section>
      <Container reveal>
        <h2 className="font-heading text-4xl font-bold text-ozwell-ink-strong sm:text-[44px]">
          {title}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Card as="li" key={item.title} padding="roomy">
              <FeatureIcon icon={VALUE_ICONS[i % VALUE_ICONS.length]} size="lg" />
              <h3 className="mt-5 text-xl font-bold text-ozwell-ink-strong">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ozwell-slate">{item.description}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
