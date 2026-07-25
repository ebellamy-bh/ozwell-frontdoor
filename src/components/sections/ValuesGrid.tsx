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

const VALUE_ICONS: LucideIcon[] = [HeartHandshake, Lightbulb, Eye, ShieldCheck, Users, LifeBuoy]

interface ValuesGridProps {
  title: string
  items: Array<{ title: string; description: string }>
}

/** Light values grid — left-aligned bold heading, soft-shadow white cards, pink line icons (matches live). */
export default function ValuesGrid({ title, items }: ValuesGridProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="text-4xl font-bold text-ozwell-ink sm:text-[48px]">{title}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = VALUE_ICONS[i % VALUE_ICONS.length]
            return (
              <div
                key={item.title}
                className="bg-white px-10 pb-10 pt-12 shadow-[0_0_40px_10px_rgba(0,0,0,0.05)]"
              >
                <Icon size={40} strokeWidth={1.5} className="text-fuchsia-400" aria-hidden="true" />
                <h3 className="mt-5 text-[25px] font-normal text-ozwell-ink-muted">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ozwell-slate">{item.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
