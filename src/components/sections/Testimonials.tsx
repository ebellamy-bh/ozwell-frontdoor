import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface TestimonialsProps {
  title: string
  description: string
  image: { src: string; alt: string; width: number; height: number }
  youtubeId: string
}

export default function Testimonials({ title, description, image, youtubeId }: TestimonialsProps) {
  return (
    <section className="bg-gradient-to-b from-[#24c1fc] to-[#0b78de] py-16 text-white lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold sm:text-[38px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/90">{description}</p>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full rounded-2xl shadow-md"
          />
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-md">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
              title="Ozwell video testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
