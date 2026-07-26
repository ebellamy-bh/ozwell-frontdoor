import {
  HeartHandshake,
  Lightbulb,
  Eye,
  ShieldCheck,
  Users,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import IconBadge from '@/components/ui/IconBadge'

const VALUE_ICONS: LucideIcon[] = [HeartHandshake, Lightbulb, Eye, ShieldCheck, Users, LifeBuoy]

interface ValuesGridProps {
  title: string
  description?: string
  items: Array<{ title: string; description: string }>
}

/**
 * Company values.
 *
 * Was square flat panels with a 40px `shadow-[0_0_40px_10px_rgba(0,0,0,0.05)]`
 * glow and `text-fuchsia-400` icons — a third card style and a third icon style,
 * neither in the palette. The fuchsia came from the iridescent bubble in the logo,
 * but read as an unrelated accent colour on white.
 */
export default function ValuesGrid({ title, description, items }: ValuesGridProps) {
  return (
    <Section tone="mist" spacing="md">
      <SectionHeading title={title} description={description} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
          return (
            <Card key={item.title} as="li" tone="plain" padding="md">
              <IconBadge icon={Icon} />
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
