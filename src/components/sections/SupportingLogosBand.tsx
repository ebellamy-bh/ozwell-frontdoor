import Image from 'next/image'
import Section from '@/components/ui/Section'

interface SupportingLogosBandProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

/**
 * Partner logos, white knockout on the brand gradient.
 *
 * The band previously stacked a `waves` divider on top of a `wavesInverse` divider
 * on the bottom, back to back with the About hero's own divider — three wave edges
 * within ~200px. It's now a flat band, and the logos share one height so the row
 * reads as a set rather than five differently scaled files.
 */
export default function SupportingLogosBand({ title, logos }: SupportingLogosBandProps) {
  return (
    <Section tone="brand" spacing="sm">
      <h2 className="text-center text-sm font-bold uppercase tracking-[0.16em] text-white/80">
        {title}
      </h2>
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-9 sm:gap-x-16">
        {logos.map((logo) => (
          <li key={logo.src}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={280}
              height={80}
              className="h-10 w-auto object-contain lg:h-12"
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
