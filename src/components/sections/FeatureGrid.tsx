import Image from 'next/image'
import {
  GraduationCap,
  SlidersHorizontal,
  Stethoscope,
  PhoneCall,
  Smartphone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import IconBadge from '@/components/ui/IconBadge'

const CARD_ICONS: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  sliders: SlidersHorizontal,
  stethoscope: Stethoscope,
  phone: PhoneCall,
  smartphone: Smartphone,
  shield: ShieldCheck,
}

interface FeatureCard {
  icon: string
  title: string
  description: string
}

interface FeatureGridProps {
  eyebrow: string
  title: string
  description: string
  cards: FeatureCard[]
  phoneImage: { src: string; alt: string; width: number; height: number }
}

/**
 * Capability grid, absorbing the former standalone "Work Smarter" band — which was
 * a heading and a paragraph with no content of its own, immediately above this.
 *
 * The old layout put three cards left of the phone and three right, with the left
 * column set `md:text-right`. That made a whole column ragged-left, which is
 * measurably harder to read, and the two columns' cards never aligned because
 * their descriptions differ in length. Media left, one aligned grid right.
 */
export default function FeatureGrid({
  eyebrow,
  title,
  description,
  cards,
  phoneImage,
}: FeatureGridProps) {
  return (
    <Section tone="mist" spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
        <Image
          src={phoneImage.src}
          alt={phoneImage.alt}
          width={phoneImage.width}
          height={phoneImage.height}
          sizes="(max-width: 1024px) 70vw, 300px"
          className="mx-auto w-full max-w-[280px] lg:sticky lg:top-28 lg:max-w-none"
        />

        <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = CARD_ICONS[card.icon]
            return (
              <li key={card.title}>
                {Icon ? <IconBadge icon={Icon} size="sm" /> : null}
                <h3 className="mt-4 text-lg font-bold text-ozwell-ink-strong">{card.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ozwell-slate">
                  {card.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
