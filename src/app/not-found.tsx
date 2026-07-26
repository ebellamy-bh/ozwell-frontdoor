import { Home, LifeBuoy, Newspaper } from 'lucide-react'
import type { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  // Spelled out rather than relying on a layout title template — there isn't one.
  title: 'Page not found - Ozwell AI',
  // A 404 has nothing worth indexing, and letting it in dilutes the rest.
  robots: { index: false, follow: true },
}

/**
 * 404.
 *
 * There was no `not-found`, so a mistyped or retired URL fell through to Next's
 * bare default: black Helvetica on white, no header, no footer, no way back into
 * the site. That matters more than usual here, since `public/_redirects` is
 * rewriting a WordPress URL structure and anything it misses lands on this page.
 */
export default function NotFound() {
  return (
    <Section spacing="lg">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-6xl font-extrabold text-primary-200">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-ozwell-ink-strong sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ozwell-slate">
          The link may be out of date, or the page may have moved when we rebuilt the site. Here are
          the places most people are looking for.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="md" icon={Home}>
            Go to the homepage
          </Button>
          <Button href="/docs/" variant="secondary" size="md" icon={LifeBuoy}>
            Help Center
          </Button>
          <Button href="/blog/" variant="secondary" size="md" icon={Newspaper}>
            Blog
          </Button>
        </div>
        <p className="mt-8 text-[15px] text-ozwell-slate">
          Still stuck?{' '}
          <a
            href="mailto:info@ozwell.ai"
            className="font-semibold text-primary-700 underline underline-offset-2"
          >
            Email us
          </a>{' '}
          and we&apos;ll point you the right way.
        </p>
      </div>
    </Section>
  )
}
