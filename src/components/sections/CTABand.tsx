import { Container } from '@/components/ui/Container'

interface CTABandProps {
  title: string
  cta: { label: string; href: string }
}

export default function CTABand({ title, cta }: CTABandProps) {
  return (
    <section className="bg-gradient-to-r from-[#0f77cf] to-[#23d0fb] py-16 text-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <h2 className="text-center text-3xl font-bold md:text-left sm:text-4xl">{title}</h2>
          <a
            href={cta.href}
            className="rounded-full bg-white px-9 py-4 text-base font-semibold text-primary-600 shadow transition hover:bg-ozwell-mist"
          >
            {cta.label}
          </a>
        </div>
      </Container>
    </section>
  )
}
