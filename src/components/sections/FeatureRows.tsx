import { Mic, Settings, PhoneCall, UserRound, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'

const BULLET_ICONS: Record<string, LucideIcon> = {
  mic: Mic,
  gear: Settings,
  phone: PhoneCall,
  user: UserRound,
}

interface FeatureRow {
  eyebrow: string
  title: string
  description: string
  bullets: Array<{ label: string; icon: string }>
  cta: { label: string; href: string }
  video: string
  poster: string
  mediaSide: 'left' | 'right'
}

interface FeatureRowsProps {
  items: FeatureRow[]
}

export default function FeatureRows({ items }: FeatureRowsProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container reveal>
        <h2 className="sr-only">How Ozwell helps your practice</h2>
        <div className="space-y-20">
          {items.map((item) => (
            <div key={item.title} className="grid items-center gap-12 lg:grid-cols-2">
              <div className={item.mediaSide === 'right' ? 'lg:order-2' : ''}>
                <AutoPlayVideo
                  src={item.video}
                  poster={item.poster}
                  label={item.title}
                  className="rounded-2xl"
                />
              </div>
              <div className={item.mediaSide === 'right' ? 'lg:order-1' : ''}>
                <p className="text-lg font-bold text-primary-600">{item.eyebrow}</p>
                <h3 className="mt-2 text-3xl font-bold leading-tight text-ozwell-ink sm:text-5xl">
                  {item.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{item.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.bullets.map((bullet) => {
                    const Icon = BULLET_ICONS[bullet.icon]
                    return (
                      <li
                        key={bullet.label}
                        className="flex items-center gap-3 font-medium text-ozwell-ink"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600">
                          {Icon ? <Icon size={16} strokeWidth={2} aria-hidden="true" /> : null}
                        </span>
                        {bullet.label}
                      </li>
                    )
                  })}
                </ul>
                <a
                  href={item.cta.href}
                  className="mt-8 inline-block rounded-full border-2 border-primary-500 px-8 py-4 text-xs font-bold uppercase tracking-wide text-ozwell-ink transition hover:bg-primary-50"
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
