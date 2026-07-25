import { Container } from '@/components/ui/Container'

interface WorkSmarterProps {
  title: string
  description: string
}

/** Header-only band — heading + intro copy (media lives in the sections below, matching live). */
export default function WorkSmarter({ title, description }: WorkSmarterProps) {
  return (
    <section className="bg-white pb-4 pt-16">
      <Container>
        <h2 className="text-center text-3xl font-bold text-primary-600 sm:text-[35px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>
      </Container>
    </section>
  )
}
