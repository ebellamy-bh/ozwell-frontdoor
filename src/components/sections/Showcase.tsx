import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface ShowcaseProps {
  title: string
  description: string
  screenshots: Array<{ src: string; alt: string; width: number; height: number }>
}

export default function Showcase({ title, description, screenshots }: ShowcaseProps) {
  return (
    <section className="bg-gradient-to-br from-[#24c1fc] to-[#0b78de] py-16 text-white lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold sm:text-[40px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-white/90">{description}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((shot) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className="w-full rounded-xl shadow-md ring-1 ring-gray-100"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
