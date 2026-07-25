import { Container } from '@/components/ui/Container'

interface BlogHeroProps {
  title: string
  description: string
}

/** Light blog header — left-aligned blue title with rule and intro copy (matches live "The Ozwell Observer"). */
export default function BlogHero({ title, description }: BlogHeroProps) {
  return (
    <section className="bg-white pt-20">
      <Container>
        <h1 className="text-5xl font-semibold text-primary-800 sm:text-6xl">{title}</h1>
        <hr className="mt-10 border-gray-200" />
        <p className="mt-8 max-w-none text-lg leading-relaxed text-ozwell-ink">{description}</p>
      </Container>
    </section>
  )
}
