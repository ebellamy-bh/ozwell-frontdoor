import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface WorkSmarterProps {
  title: string
  description: string
  images: Array<{ src: string; alt: string; width: number; height: number }>
  video: string
  phoneImage: { src: string; alt: string; width: number; height: number }
}

export default function WorkSmarter({
  title,
  description,
  images,
  video,
  phoneImage,
}: WorkSmarterProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl font-bold text-primary-600 sm:text-[35px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>

        <div className="mt-12 grid items-center gap-8 md:grid-cols-3">
          <div className="space-y-8">
            {images.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full rounded-2xl shadow-sm"
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Image
              src={phoneImage.src}
              alt={phoneImage.alt}
              width={phoneImage.width}
              height={phoneImage.height}
              className="w-full max-w-xs"
            />
          </div>
          <div>
            <video
              className="w-full rounded-2xl shadow-sm"
              src={video}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Ozwell AI workflow flowchart animation"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
