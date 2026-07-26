import Image from 'next/image'
import clsx from 'clsx'
import {
  Mic,
  Settings,
  PhoneCall,
  UserRound,
  Plug,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import AutoPlayVideo from '@/components/ui/AutoPlayVideo'

const BULLET_ICONS: Record<string, LucideIcon> = {
  mic: Mic,
  gear: Settings,
  phone: PhoneCall,
  user: UserRound,
  plug: Plug,
  shield: ShieldCheck,
}

/** Video loop or still image. The EHR row has no recording, only a screenshot. */
type Media =
  | { kind: 'video'; src: string; poster: string }
  | { kind: 'image'; src: string; alt: string; width: number; height: number }

export interface FeatureRow {
  eyebrow: string
  title: string
  description: string
  bullets: Array<{ label: string; icon: string }>
  cta: { label: string; href: string }
  media: Media
  mediaSide: 'left' | 'right'
}

interface FeatureRowsProps {
  items: FeatureRow[]
}

/**
 * The differentiated capabilities, alternating media and copy.
 *
 * `media` replaced a required `video` + `poster` pair so a row can be illustrated
 * with a screenshot — otherwise adding the EHR-integration capability would have
 * meant either commissioning a third screen recording or duplicating this
 * component.
 */
export default function FeatureRows({ items }: FeatureRowsProps) {
  return (
    <Section spacing="md">
      {/* The rows are the content; a visible heading here would compete with each
          row's own H3. */}
      <h2 className="sr-only">What Ozwell does</h2>
      <div className="space-y-20 lg:space-y-28">
        {items.map((item) => (
          <div key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={clsx(item.mediaSide === 'right' && 'lg:order-2')}>
              {/* No card shadow on these: the assets are illustrations already
                  composited on white, so `shadow-card` didn't outline a card, it
                  drew a grey halo around a rectangle with no visible edge. They
                  float on the section background instead. */}
              {item.media.kind === 'video' ? (
                <AutoPlayVideo
                  src={item.media.src}
                  poster={item.media.poster}
                  label={item.title}
                  className="rounded-2xl"
                />
              ) : (
                /* Height-capped, not width-filled: the product shots are 900×1600
                   phone mockups, and at the column's full width one stood ~960px
                   tall next to ~380px of copy. */
                <Image
                  src={item.media.src}
                  alt={item.media.alt}
                  width={item.media.width}
                  height={item.media.height}
                  sizes="(max-width: 1024px) 60vw, 320px"
                  className="mx-auto max-h-[560px] w-auto rounded-2xl"
                />
              )}
            </div>

            <div className={clsx(item.mediaSide === 'right' && 'lg:order-1')}>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-700">
                {item.eyebrow}
              </p>
              {/* H3, not H2: these sit under the section's own heading. Previously
                  every row title was styled at 48px, larger than the page's real
                  section headings. */}
              <h3 className="mt-3 text-3xl font-bold leading-tight text-ozwell-ink-strong sm:text-4xl">
                {item.title}
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{item.description}</p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {item.bullets.map((bullet) => {
                  const Icon = BULLET_ICONS[bullet.icon]
                  return (
                    <li
                      key={bullet.label}
                      className="flex items-center gap-3 text-[15px] font-medium text-ozwell-ink"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                        {Icon ? <Icon size={17} strokeWidth={2} aria-hidden="true" /> : null}
                      </span>
                      {bullet.label}
                    </li>
                  )
                })}
              </ul>

              <Button
                href={item.cta.href}
                variant="secondary"
                size="md"
                icon={ArrowRight}
                iconAfter
                className="mt-8"
              >
                {item.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
