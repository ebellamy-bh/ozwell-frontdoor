import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Facebook, Instagram, Youtube, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import siteConfig from '@/data/site.json'

const SOCIAL_ICONS = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} as const

/** Internal routes go through `next/link`; mail and external links don't. */
function FooterLink({ href, label }: { href: string; label: string }) {
  // inline-block + py-1 gives a ~26px target, clearing the 24px WCAG 2.5.8
  // minimum; as bare inline text these were 18px tall.
  const className =
    'inline-block py-1 text-[15px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline'

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    )
  }
  return (
    <a href={href} className={className} rel="noopener">
      {label}
    </a>
  )
}

/**
 * Deep-navy footer.
 *
 * The previous one was white on white with 15px grey text and no logo, and its
 * link list omitted the Blog and Help Center entirely — the two largest content
 * areas on the site were unreachable from the bottom of any page. Going dark also
 * gives the brand gold somewhere it clears contrast: on white it is ~1.3:1, on
 * this surface it's the natural accent for hover states.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-[linear-gradient(160deg,var(--color-ozwell-navy)_0%,var(--color-ozwell-navy-deep)_100%)] text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 lg:pr-10">
            <Link href="/" aria-label="Ozwell home" className="inline-flex">
              <Image
                src="/images/Ozwell-logo-white.webp"
                alt="Ozwell"
                width={330}
                height={141}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              {siteConfig.aboutBlurb}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-flex min-h-6 items-center gap-2 py-1 text-[15px] font-medium text-white/85 transition-colors hover:text-ozwell-gold"
            >
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <div className="mt-7 flex items-center gap-2">
              {siteConfig.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]
                if (!Icon) return null
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    aria-label={s.label}
                    rel="noopener noreferrer"
                    target="_blank"
                    /* 40px box: the old bare icons were 22px hit targets. */
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-ozwell-gold hover:text-ozwell-navy-deep"
                  >
                    <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Grouped navigation, driven entirely by site.json */}
          {siteConfig.footerNav.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
              <h2
                id={`footer-${group.heading}`}
                className="text-xs font-bold uppercase tracking-[0.14em] text-ozwell-gold"
              >
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Customer-story ask — a real request, so it keeps a real affordance. */}
        <div className="mt-14 rounded-2xl border border-white/15 bg-white/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="text-lg font-bold text-white">Be a part of Ozwell&apos;s story</h2>
            <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-white/70">
              {siteConfig.storyBlurb}
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}?subject=Be%20a%20Part%20of%20Ozwell%27s%20Story`}
            className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ozwell-navy transition-colors hover:bg-ozwell-gold sm:mt-0"
          >
            Get in touch
            <ArrowUpRight size={17} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          {/* Rendered at build time; this is a static export, so it's the build year. */}
          <p>© {year} BlueHive Health, LLC. All rights reserved.</p>
          <p>
            Ozwell — more time for care, less time on paperwork. AI designed for physicians, by{' '}
            <a
              href="https://bluehive.com/about"
              className="font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              rel="noopener"
            >
              BlueHive Health
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  )
}
