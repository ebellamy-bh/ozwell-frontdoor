import { BrainCircuit, ClipboardCheck, Mic, RefreshCw, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

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
 * Four-step flow, replacing the legacy flowchart video. Renders as a horizontal track with a
 * connecting rail on desktop and a vertical rail on mobile — real text at every breakpoint.
 */
export default function HowItWorks({ eyebrow, title, description, steps }: HowItWorksProps) {
  // Tinted to break up the run of consecutive white sections above it.
  return (
    <Section tone="mist">
      <Container reveal>
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary-600">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold text-ozwell-ink-strong sm:text-[38px]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-ozwell-slate">
          {description}
        </p>

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Connecting rail: vertical behind the mobile stack, horizontal across the desktop row. */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-primary-200 via-primary-200 to-transparent lg:left-0 lg:right-0 lg:top-6 lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-primary-200 lg:via-primary-200 lg:to-transparent"
          />

          {steps.map((step, i) => {
            const Icon = STEP_ICONS[step.icon]
            return (
              <li key={step.title} className="relative pl-20 lg:pl-0">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-md ring-4 ring-white lg:relative lg:mb-6">
                  {Icon ? <Icon size={22} strokeWidth={2} aria-hidden="true" /> : null}
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-600">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-xl font-bold text-ozwell-ink-strong">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ozwell-slate">{step.description}</p>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
