import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import siteConfig from '@/data/site.json'

interface CTASectionProps {
  title: string
  eyebrow?: string
  description?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  /** App Store / Google Play badges. Homepage close only. */
  showApps?: boolean
  /** `md` for the closing band, `sm` for mid-page and end-of-article use. */
  spacing?: 'sm' | 'md'
  dividers?: 'none' | 'top'
}

/**
 * Every conversion band on the site.
 *
 * Replaces two components that differed only in trim: `CTABand` (gradient, title,
 * one button) and `AppDownloadCTA` (same gradient, three stacked headings, store
 * badges, and `pt-64 pb-52` — about 900px of padding around 200px of content).
 * Both ran back to back at the bottom of the homepage, asking twice.
 */
export default function CTASection({
  title,
  eyebrow,
  description,
  primary = siteConfig.ctas.trial,
  secondary,
  showApps = false,
  spacing = 'sm',
  dividers = 'none',
}: CTASectionProps) {
  return (
    <Section tone="brand" spacing={spacing} dividers={dividers} pattern={showApps}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        size={showApps ? 'section' : 'sub'}
        onDark
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href={primary.href} variant="inverse" size="lg">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="inverse-outline" size="lg">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </SectionHeading>

      {showApps ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={siteConfig.apps.appStore}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Download Ozwell on the App Store"
          >
            <Image
              src="/images/white-app-store-buttons-6-1.webp"
              alt="Download on the App Store"
              width={480}
              height={144}
              className="h-14 w-auto rounded-lg"
            />
          </a>
          <a
            href={siteConfig.apps.googlePlay}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Get Ozwell on Google Play"
          >
            <Image
              src="/images/white-app-store-buttons-7-1.webp"
              alt="Get it on Google Play"
              width={480}
              height={144}
              className="h-14 w-auto rounded-lg"
            />
          </a>
        </div>
      ) : null}
    </Section>
  )
}
