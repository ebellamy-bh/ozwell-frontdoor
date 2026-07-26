import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'

export interface Principle {
  /** Single letter of the acronym, used as the visual marker. */
  letter: string
  title: string
  /** What the principle requires — someone else's standard, in their terms. */
  principle: string
  /** What we have published against it. This is the half that makes the card mean anything. */
  disclosure: string
}

interface PrincipleGridProps {
  eyebrow: string
  title: string
  description: string
  items: Principle[]
}

/**
 * The FAVES principles, each paired with the evidence for it.
 *
 * Deliberately two-part per row: the principle as the standard defines it, then what
 * we disclose against it. A grid of five adjectives with our logo next to them would
 * be worth nothing — the value is entirely in the second half, so it gets the larger
 * column on desktop rather than being a caption.
 */
export default function PrincipleGrid({ eyebrow, title, description, items }: PrincipleGridProps) {
  return (
    <Section spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <ul className="mx-auto mt-12 max-w-4xl space-y-5">
        {items.map((item) => (
          <li
            key={item.letter}
            className="rounded-2xl border border-ozwell-border bg-white p-6 sm:p-7"
          >
            <div className="flex items-start gap-5">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-2xl font-extrabold text-white"
              >
                {item.letter}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-ozwell-ink-strong">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ozwell-slate">{item.principle}</p>
                <p className="mt-4 border-t border-ozwell-border pt-4 text-[15px] leading-relaxed text-ozwell-ink">
                  <span className="font-bold text-primary-800">What we publish: </span>
                  {item.disclosure}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
