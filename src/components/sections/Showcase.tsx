import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

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
    <section className="relative overflow-hidden bg-gradient-to-br from-ozwell-sky to-ozwell-sky-deep pb-40 pt-40 text-white lg:pb-64 lg:pt-72">
      {/* Live: smooth curve top (275px, flipped) and bottom (275px) */}
      <ShapeDivider shape="curve" position="top" flipped heightClass="h-24 lg:h-[275px]" />
      <ShapeDivider shape="curve" position="bottom" heightClass="h-24 lg:h-[275px]" />
      <Container className="relative">
        <h2 className="text-center text-3xl font-bold sm:text-[40px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-white/90">
          {description}
        </p>
      </Container>
      <div className="relative mt-12">
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
