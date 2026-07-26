import { BrainCircuit, ClipboardCheck, Mic, RefreshCw, type LucideIcon } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import IconBadge from '@/components/ui/IconBadge'

const STEP_ICONS: Record<string, LucideIcon> = {
  mic: Mic,
  brain: BrainCircuit,
  clipboard: ClipboardCheck,
  refresh: RefreshCw,
}

interface Step {
  icon: string
  title: string
  description: string
}

interface HowItWorksProps {
  eyebrow: string
  title: string
  description: string
  steps: Step[]
}

/**
 * Four-step flow, replacing a 22 MB autoplaying MP4 of a nine-box flowchart whose
 * labels were unreadable at every viewport and whose only accessible text was an
 * `sr-only` heading.
 *
 * A connecting rail runs vertically behind the mobile stack and horizontally
 * across the desktop row, so the sequence reads as one process either way.
 */
export default function HowItWorks({ eyebrow, title, description, steps }: HowItWorksProps) {
  return (
    <Section id="how-it-works" spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-6 top-3 w-px bg-gradient-to-b from-primary-200 via-primary-200 to-transparent lg:bottom-auto lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-primary-200 lg:via-primary-200 lg:to-transparent"
        />

        {steps.map((step, i) => {
          const Icon = STEP_ICONS[step.icon]
          return (
            <li key={step.title} className="relative pl-20 lg:pl-0">
              {Icon ? (
                <IconBadge
                  icon={Icon}
                  tone="solid"
                  className="absolute left-0 top-0 ring-4 ring-white lg:relative lg:mb-6"
                />
              ) : null}
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-700">
                Step {i + 1}
              </p>
              <h3 className="mt-1.5 text-xl font-bold text-ozwell-ink-strong">{step.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ozwell-slate">{step.description}</p>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
