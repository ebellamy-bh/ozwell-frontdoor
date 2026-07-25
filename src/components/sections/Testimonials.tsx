import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

interface TestimonialsProps {
  title: string
  description: string
  image: { src: string; alt: string; width: number; height: number }
}

export default function Testimonials({ title, description, image }: TestimonialsProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#24c1fc] to-[#0b78de] pb-24 pt-28 text-white lg:pb-28 lg:pt-32">
      {/* Live: waves-inverse top (69px, flipped) and bottom (45px) */}
      <ShapeDivider shape="wavesInverse" position="top" flipped heightClass="h-10 lg:h-[69px]" />
      <ShapeDivider shape="wavesInverse" position="bottom" heightClass="h-7 lg:h-[45px]" />
      <Container className="relative">
        <h2 className="text-center text-3xl font-bold sm:text-[38px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/90">{description}</p>
        <div className="mx-auto mt-10 max-w-4xl">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full rounded-2xl shadow-md"
          />
        </div>
      </Container>
    </section>
  )
}
