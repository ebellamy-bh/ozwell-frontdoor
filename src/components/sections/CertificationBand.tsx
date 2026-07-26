import Image from 'next/image'
import { Check, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

interface CertificationBandProps {
  eyebrow: string
  title: string
  description: string
  badges: string[]
  image: { src: string; alt: string; width: number; height: number }
  cta: { label: string; href: string }
}

/**
 * Drummond pDSI-Risk certification — the strongest differentiator on the site, so
 * it gets the mist surface and a real link to the source-attribute disclosures
 * rather than being a claim with nowhere to go.
 *
 * The badge image previously sat inside a gradient card at `font-black` 37px,
 * shouting louder than the section headings around it.
 */
export default function CertificationBand({
  eyebrow,
  title,
  description,
  badges,
  image,
  cta,
}: CertificationBandProps) {
  return (
    <Section id="security" tone="mist" spacing="md">
      <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="flex justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-48 w-auto lg:h-64"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-700">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-snug text-ozwell-ink-strong sm:text-3xl lg:text-[2.125rem]">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{description}</p>
          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
            {badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2 text-[15px] font-semibold text-ozwell-ink"
              >
                <Check
                  size={17}
                  strokeWidth={3}
                  aria-hidden="true"
                  className="text-ozwell-green-dark"
                />
                {badge}
              </li>
            ))}
          </ul>
          <Button
            href={cta.href}
            variant="ghost"
            size="md"
            icon={ArrowRight}
            iconAfter
            className="mt-7 -ml-4"
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </Section>
  )
}
