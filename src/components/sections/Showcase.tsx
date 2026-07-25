import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface ShowcaseProps {
  title: string
  description: string
  screenshots: Array<{ src: string; alt: string; width: number; height: number }>
}

/** Blue gradient band with an auto-scrolling horizontal marquee of product screenshots — matches live. */
export default function Showcase({ title, description, screenshots }: ShowcaseProps) {
  // Duplicate the strip so the CSS loop is seamless
  const strip = [...screenshots, ...screenshots]

  return (
    <section className="overflow-hidden bg-gradient-to-br from-[#24c1fc] to-[#0b78de] py-16 text-white lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold sm:text-[40px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-white/90">
          {description}
        </p>
      </Container>
      <div className="mt-12">
        <div className="marquee flex w-max gap-6" aria-label="Ozwell product screenshots">
          {strip.map((shot, i) => (
            <Image
              key={`${shot.src}-${i}`}
              src={shot.src}
              alt={i < screenshots.length ? shot.alt : ''}
              aria-hidden={i >= screenshots.length}
              width={shot.width}
              height={shot.height}
              className="w-[300px] rounded-xl shadow-md sm:w-[378px]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
