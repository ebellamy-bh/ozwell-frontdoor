import { Plus, ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'

interface FAQSectionProps {
  eyebrow: string
  title: string
  description: string
  items: Array<{ question: string; answer: string }>
}

/**
 * FAQ accordion.
 *
 * Native `<details>`/`<summary>`: keyboard-operable, findable by in-page search,
 * and zero JavaScript — worth keeping. The eyebrow used `text-ozwell-gold`
 * (#fada00) on white, about 1.3:1 against a 4.5:1 AA floor, so "GET ANSWERS" was
 * effectively invisible; gold now only appears on dark surfaces.
 */
export default function FAQSection({ eyebrow, title, description, items }: FAQSectionProps) {
  return (
    <Section id="faq" spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-ozwell-border bg-white transition-colors open:border-primary-200 hover:border-primary-300"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-[17px] font-bold text-ozwell-ink-strong">
              {item.question}
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              >
                <Plus size={15} strokeWidth={3} />
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-ozwell-slate">{item.answer}</p>
          </details>
        ))}
      </div>

      {/* The FAQ was previously a dead end, though a 10-article Help Center sits
          one click away. */}
      <div className="mt-10 text-center">
        <Button href="/docs/" variant="secondary" size="md" icon={ArrowRight} iconAfter>
          Browse the Help Center
        </Button>
      </div>
    </Section>
  )
}
