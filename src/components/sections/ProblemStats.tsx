import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

interface ProblemStatsProps {
  eyebrow: string
  title: string
  description: string
  stats: Array<{ value: string; label: string; source: string }>
  link: { label: string; href: string }
}

/**
 * States the problem before the page starts selling against it.
 *
 * The homepage previously went hero → logos → product video, so a reader never encountered the case
 * for why any of this matters. Figures carry their citation inline; the link goes to our own
 * write-up where each is sourced properly.
 */
export default function ProblemStats({
  eyebrow,
  title,
  description,
  stats,
  link,
}: ProblemStatsProps) {
  return (
    <Section tone="mist">
      <Container reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-600">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-ozwell-ink-strong sm:text-[40px]">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">{description}</p>
        </div>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading text-5xl font-bold text-primary-600 sm:text-6xl">
                  {stat.value}
                </span>
                <span className="mx-auto mt-3 block max-w-[22ch] leading-relaxed text-ozwell-ink">
                  {stat.label}
                </span>
                <span className="mt-2 block text-xs text-ozwell-slate">{stat.source}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-center">
          <Link
            href={link.href}
            className="inline-flex items-center gap-2 font-semibold text-primary-700 underline-offset-4 hover:underline"
          >
            {link.label}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  )
}
