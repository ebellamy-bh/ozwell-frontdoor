import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface LogoCloudProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

export default function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <Section spacing="tight">
      <Container reveal>
        {/* Was a 35px heading — larger than several real section titles — for what is a caption
            over a trust strip. Demoted to an eyebrow so it stops competing with the hero. */}
        <h2 className="text-center text-sm font-bold uppercase tracking-widest text-ozwell-slate">
          {title}
        </h2>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {logos.map((logo) => (
            <li key={logo.src} className="flex h-10 items-center">
              {/*
                Vendor logos arrive at wildly different aspect ratios and optical weights. Bounding
                them to a common height and letting width follow keeps the strip even; the slight
                desaturation stops the two full-colour marks from dominating the row.
              */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={60}
                className="h-full w-auto object-contain opacity-80 saturate-[0.85] transition hover:opacity-100 hover:saturate-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
