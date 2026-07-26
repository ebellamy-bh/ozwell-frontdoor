import Image from 'next/image'
import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

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
    <Section spacing="tight">
      <Container reveal>
        <Card variant="accent" padding="roomy">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-56 w-auto"
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/90">{eyebrow}</p>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-[32px]">
                {title}
              </h2>
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
        </Card>
      </Container>
    </Section>
  )
}
