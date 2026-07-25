import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Linkedin, Facebook, Instagram, Youtube, Twitter, Mail } from 'lucide-react'
import siteConfig from '@/data/site.json'

const SOCIAL_ICONS = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} as const

/** Footer column heading — dark label over a thin rule. */
function FooterHeading({ children, className }: { children: string; className?: string }) {
  return (
    <h3
      className={clsx(
        'border-b border-gray-200 pb-3 text-[19px] font-medium text-ozwell-ink-strong',
        className
      )}
    >
      {children}
    </h3>
  )
}

/** Light footer — dark headings with thin rules, icon social links, Get Started pill (matches live). */
export function Footer() {
  return (
    <footer className="bg-white text-ozwell-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <FooterHeading>About Us</FooterHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-ozwell-slate">
              {siteConfig.aboutBlurb}
            </p>
          </div>

          <div>
            <FooterHeading>Contact Info</FooterHeading>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 flex items-center gap-2 text-[15px] text-ozwell-slate transition-colors hover:text-primary-600"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <FooterHeading className="mt-9">Socialize</FooterHeading>
            <div className="mt-5 flex items-center gap-4">
              {siteConfig.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    aria-label={s.label}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-ozwell-ink-strong transition-colors hover:text-primary-600"
                  >
                    {Icon ? <Icon size={22} strokeWidth={1.75} aria-hidden="true" /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <FooterHeading>Links</FooterHeading>
            <ul className="mt-5 space-y-3">
              {siteConfig.footerLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith('/') ? (
                    <Link
                      href={l.href}
                      className="text-[15px] text-ozwell-slate transition-colors hover:text-primary-600"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="text-[15px] text-ozwell-slate transition-colors hover:text-primary-600"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Be a Part of Ozwell&apos;s Story</FooterHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-ozwell-slate">
              {siteConfig.storyBlurb}
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=Be%20a%20Part%20of%20Ozwell%27s%20Story`}
              className="mt-6 inline-block rounded-full border border-primary-500 px-7 py-2.5 text-sm font-semibold text-ozwell-ink transition-colors hover:bg-primary-50"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Bottom bar: logo, tagline, copyright. */}
        <div className="mt-14 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <Link href="/" aria-label="Ozwell home">
              <Image
                src="/images/Ozwell-logo.png"
                alt="Ozwell"
                width={150}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[15px] text-ozwell-slate">
              Ozwell – More time for care, less time on paperwork. AI designed for physicians, by{' '}
              <a
                href="https://bluehive.com/about"
                className="text-primary-600 underline-offset-2 hover:underline"
              >
                BlueHive Health.
              </a>
            </p>
            {/* Rendered at build time; this is a static export, so the year is the build year. */}
            <p className="text-sm text-ozwell-slate">
              © {new Date().getFullYear()} BlueHive Health, LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
