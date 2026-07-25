import { HeartHandshake, TrendingUp, Puzzle, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const PILLAR_ICONS: LucideIcon[] = [HeartHandshake, TrendingUp, Puzzle]

interface MissionSectionProps {
  title: string
  description: string
  pillars: Array<{ title: string; description: string }>
}

export default function MissionSection({ title, description, pillars }: MissionSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-normal text-[#515151] sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]
            return (
              <div key={pillar.title}>
                <Icon
                  size={44}
                  strokeWidth={1.5}
                  className="text-ozwell-blue-dark"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-2xl font-normal leading-snug text-ozwell-ink">
                  {pillar.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ozwell-slate">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
