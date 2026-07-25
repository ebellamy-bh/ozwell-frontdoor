import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface FeatureCard {
  title: string
  description: string
}

interface FeatureCardsPhoneProps {
  left: FeatureCard[]
  right: FeatureCard[]
  phoneImage: { src: string; alt: string; width: number; height: number }
}

/** Six feature cards flanking the centered phone image — matches the live layout. */
export default function FeatureCardsPhone({ left, right, phoneImage }: FeatureCardsPhoneProps) {
  return (
    <section className="bg-white py-12">
      <Container>
        <h2 className="sr-only">Ozwell features</h2>
        <div className="grid items-center gap-10 md:grid-cols-3">
          <div className="space-y-10">
            {left.map((card) => (
              <div key={card.title} className="text-center md:text-right">
                <h3 className="text-lg font-bold text-ozwell-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ozwell-slate">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Image
              src={phoneImage.src}
              alt={phoneImage.alt}
              width={phoneImage.width}
              height={phoneImage.height}
              className="w-full max-w-[375px]"
            />
          </div>
          <div className="space-y-10">
            {right.map((card) => (
              <div key={card.title} className="text-center md:text-left">
                <h3 className="text-lg font-bold text-ozwell-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ozwell-slate">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
