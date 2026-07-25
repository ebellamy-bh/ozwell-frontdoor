import Image from 'next/image'
import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'

interface CertificationBandProps {
  eyebrow: string
  title: string
  description: string
  badges: string[]
  image: { src: string; alt: string; width: number; height: number }
}

export default function CertificationBand({
  eyebrow,
  title,
  description,
  badges,
  image,
}: CertificationBandProps) {
  return (
    <section className="bg-white py-10">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-ozwell-sky to-ozwell-sky-deep px-8 py-12 text-white sm:px-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-64 w-auto"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/90">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-black leading-snug sm:text-[37px]">{title}</h2>
              <p className="mt-4 leading-relaxed text-white/90">{description}</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {badges.map((badge) => (
                  <li key={badge} className="flex items-center gap-2 text-sm font-semibold">
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
