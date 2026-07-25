import { Container } from '@/components/ui/Container'

interface ValuesGridProps {
  title: string
  items: Array<{ title: string; description: string }>
}

export default function ValuesGrid({ title, items }: ValuesGridProps) {
  return (
    <section className="bg-gradient-to-br from-[#24c1fc] to-[#0b78de] py-16 text-white lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{title}</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-white/90">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
