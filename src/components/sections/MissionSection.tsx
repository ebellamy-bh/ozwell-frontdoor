import { Container } from '@/components/ui/Container'

interface MissionSectionProps {
  title: string
  description: string
  pillars: Array<{ title: string; description: string }>
}

export default function MissionSection({ title, description, pillars }: MissionSectionProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold text-ozwell-ink sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">{description}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl bg-ozwell-mist p-8 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-xl font-bold text-primary-600">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-ozwell-slate">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
