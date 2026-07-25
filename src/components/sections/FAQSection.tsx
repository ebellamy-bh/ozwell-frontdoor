import { Container } from '@/components/ui/Container'

interface FAQSectionProps {
  eyebrow: string
  title: string
  description: string
  items: Array<{ question: string; answer: string }>
}

export default function FAQSection({ eyebrow, title, description, items }: FAQSectionProps) {
  return (
    <section id="faq" className="bg-white py-16 lg:py-20">
      <Container reveal>
        {/* Not ozwell-gold: #fada00 on white is ~1.3:1, well under the 4.5:1 AA floor.
            The gold token only carries enough contrast on dark surfaces. */}
        <p className="text-center text-base font-bold uppercase tracking-wide text-primary-600">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-center text-3xl font-normal text-ozwell-ink-muted sm:text-[35px]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ozwell-slate">
          {description}
        </p>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-md border border-ozwell-border px-4 py-[15px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-ozwell-ink">
                {item.question}
                <span
                  aria-hidden="true"
                  className="ml-4 text-primary-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ozwell-slate">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
