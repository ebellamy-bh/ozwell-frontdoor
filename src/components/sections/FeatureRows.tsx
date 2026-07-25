import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'

interface FeatureRow {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  cta: { label: string; href: string }
  video: string
  mediaSide: 'left' | 'right'
}

interface FeatureRowsProps {
  items: FeatureRow[]
}

export default function FeatureRows({ items }: FeatureRowsProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="sr-only">How Ozwell helps your practice</h2>
        <div className="space-y-20">
          {items.map((item) => (
            <div key={item.title} className="grid items-center gap-12 lg:grid-cols-2">
              <div className={item.mediaSide === 'right' ? 'lg:order-2' : ''}>
                <video
                  className="w-full rounded-2xl"
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={item.title}
                />
              </div>
              <div className={item.mediaSide === 'right' ? 'lg:order-1' : ''}>
                <p className="text-lg font-bold text-primary-600">{item.eyebrow}</p>
                <h3 className="mt-2 text-3xl font-bold leading-tight text-ozwell-ink sm:text-5xl">
                  {item.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{item.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 font-semibold text-ozwell-ink"
                    >
                      <Check
                        size={20}
                        strokeWidth={2.5}
                        className="text-primary-500"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.cta.href}
                  className="mt-8 inline-block rounded-full bg-primary-500 px-8 py-3.5 font-semibold text-white transition hover:bg-primary-700"
                >
                  {item.cta.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
