import { Container } from '@/components/ui/Container'

interface DocsHeroProps {
  eyebrow: string
  title: string
}

/** Light Help Center hero — uppercase eyebrow over a large centered heading (matches live). */
export default function DocsHero({ eyebrow, title }: DocsHeroProps) {
  return (
    <section className="bg-white pb-6 pt-20">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ozwell-ink">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-center text-5xl font-bold text-ozwell-ink sm:text-6xl">{title}</h1>
      </Container>
    </section>
  )
}
