import Image from 'next/image'
import Section from '@/components/ui/Section'

interface LogoCloudProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

/**
 * Customer logo strip.
 *
 * Two fixes: the title was a 35px H2 — larger than several real section headings
 * — for what is a caption, and the logos were raw vendor PNGs at wildly different
 * visual weights, so the row read as clutter rather than a set. Desaturating them
 * to a common weight is the standard treatment and lets the eye scan the row.
 */
export default function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <Section spacing="sm">
      <h2 className="text-center text-sm font-bold uppercase tracking-[0.14em] text-ozwell-slate">
        {title}
      </h2>
      <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {logos.map((logo) => (
          <li key={logo.src}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={240}
              height={80}
              /* Desaturated but not dimmed much: at opacity-60 the already-light
                 marks in this set (WebChart, Enterprise Health) faded into the
                 white background and read as smudges. */
              className="h-9 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-11"
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
