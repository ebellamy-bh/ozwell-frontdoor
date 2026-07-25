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
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p>
        <h2 className="mt-2 text-center text-3xl font-normal text-[#515151] sm:text-[35px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ozwell-slate">{description}</p>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-gray-100">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-ozwell-ink">
                {item.question}
                <span aria-hidden="true" className="ml-4 text-primary-500 transition-transform group-open:rotate-45">
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
