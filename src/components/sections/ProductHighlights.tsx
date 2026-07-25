import Image from 'next/image'
import { ShieldCheck, Stethoscope, Workflow, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { FeatureIcon } from '@/components/ui/FeatureIcon'

const CARD_ICONS: Record<string, LucideIcon> = {
  workflow: Workflow,
  stethoscope: Stethoscope,
  shield: ShieldCheck,
}

interface ProductHighlightsProps {
  eyebrow: string
  title: string
  description: string
  cards: Array<{ icon: string; title: string; description: string }>
  phoneImage: { src: string; alt: string; width: number; height: number }
}

/**
 * Replaces the six-cards-flanking-a-phone layout.
 *
 * That version split three cards to each side of the phone and right-aligned the left column, so
 * half the copy on the page was ragged-left — hard to read for no reason beyond symmetry. Three
 * cards in a single column beside the image keeps one consistent left edge.
 */
export default function ProductHighlights({
  eyebrow,
  title,
  description,
  cards,
  phoneImage,
}: ProductHighlightsProps) {
  return (
    <Section>
      <Container reveal>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1">
            <Image
              src={phoneImage.src}
              alt={phoneImage.alt}
              width={phoneImage.width}
              height={phoneImage.height}
              className="w-full max-w-[320px]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-600">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ozwell-ink-strong sm:text-[40px]">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ozwell-slate">{description}</p>

            <ul className="mt-10 space-y-8">
              {cards.map((card) => {
                const Icon = CARD_ICONS[card.icon]
                return (
                  <li key={card.title} className="flex gap-5">
                    {Icon ? <FeatureIcon icon={Icon} /> : null}
                    <div>
                      <h3 className="text-lg font-bold text-ozwell-ink-strong">{card.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ozwell-slate">{card.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
