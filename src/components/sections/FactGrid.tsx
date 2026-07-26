import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import { richText } from '@/lib/inline'

export interface Fact {
  label: string
  value: string
  detail: string
}

interface FactGridProps {
  eyebrow: string
  title: string
  description: string
  facts: Fact[]
}

/**
 * The checkable specifics of a claim, as a description list.
 *
 * `<dl>` rather than a card grid of headings: these are label/value pairs, and the
 * association is the content. A certification page whose facts are styled divs is
 * asking to be taken on trust, which is the opposite of the point.
 */
export default function FactGrid({ eyebrow, title, description, facts }: FactGridProps) {
  return (
    <Section tone="mist" spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-2xl border border-ozwell-border bg-white p-6 shadow-card"
          >
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-primary-700">
              {fact.label}
            </dt>
            <dd>
              <p className="mt-3 text-xl font-bold leading-snug text-ozwell-ink-strong">
                {fact.value}
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ozwell-slate">
                {richText(fact.detail)}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
