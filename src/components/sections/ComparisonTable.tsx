import { Check, Minus } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'

export interface ComparisonRow {
  /** The capability being compared — the row header. */
  capability: string
  /** How a general-purpose assistant handles it. */
  generic: string
  /** How Ozwell handles it. */
  ozwell: string
}

interface ComparisonTableProps {
  eyebrow: string
  title: string
  description: string
  /** Column headers, so the framing lives with the content rather than in here. */
  columns: { generic: string; ozwell: string }
  rows: ComparisonRow[]
}

/**
 * Purpose-built vs. general-purpose, as a real table.
 *
 * A genuine `<table>` with `<th scope>` rather than a CSS grid of divs: this is
 * tabular data, screen readers need the row/column association to read a cell
 * meaningfully, and answer engines quote comparison tables far more readily than
 * they reconstruct one from styled markup.
 *
 * The Ozwell column is deliberately the only one that carries a check glyph — the
 * point of the band is asymmetry, and giving both columns equal visual weight
 * would undercut it.
 */
export default function ComparisonTable({
  eyebrow,
  title,
  description,
  columns,
  rows,
}: ComparisonTableProps) {
  return (
    /* White, and placed after the mist certification band: the band sequence on
       this page alternates, and the table supplies its own surface via the border
       and the tinted Ozwell column, so it doesn't need a tinted section behind it. */
    <Section id="comparison" tone="white" spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />

      {/* Nine rows of three columns don't fit a phone, so the table scrolls inside
          its own bounds instead of forcing the page body sideways. */}
      <div className="mt-12 overflow-x-auto rounded-2xl border border-ozwell-border bg-white">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            {title} — {description}
          </caption>
          <thead>
            <tr className="border-b border-ozwell-border">
              <th
                scope="col"
                className="w-1/4 px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-ozwell-slate"
              >
                Capability
              </th>
              <th scope="col" className="w-[37.5%] px-5 py-4 text-sm font-bold text-ozwell-slate">
                {columns.generic}
              </th>
              {/* Tinted so the eye lands on the column that matters. */}
              <th
                scope="col"
                className="w-[37.5%] bg-primary-50 px-5 py-4 text-sm font-bold text-primary-800"
              >
                {columns.ozwell}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.capability} className="border-b border-ozwell-border last:border-b-0">
                <th
                  scope="row"
                  className="px-5 py-4 align-top text-[15px] font-bold text-ozwell-ink-strong"
                >
                  {row.capability}
                </th>
                <td className="px-5 py-4 align-top text-[15px] leading-relaxed text-ozwell-slate">
                  <span className="flex gap-2.5">
                    <Minus
                      size={16}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ozwell-slate/50"
                    />
                    {row.generic}
                  </span>
                </td>
                <td className="bg-primary-50/40 px-5 py-4 align-top text-[15px] leading-relaxed text-ozwell-ink">
                  <span className="flex gap-2.5">
                    <Check
                      size={16}
                      strokeWidth={3}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ozwell-green-dark"
                    />
                    {row.ozwell}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
