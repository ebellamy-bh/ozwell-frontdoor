import Link from 'next/link'
import { Linkedin, Facebook, Instagram, Youtube, Twitter, Mail } from 'lucide-react'
import siteConfig from '@/data/site.json'

const SOCIAL_ICONS = {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} as const

/** Light footer — dark headings with thin rules, icon social links, Get Started pill (matches live). */
export function Footer() {
  return (
    <footer className="bg-white text-ozwell-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="border-b border-gray-200 pb-3 text-[19px] font-medium text-[#1a1a1a]">
              About Us
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-ozwell-slate">
              {siteConfig.aboutBlurb}
            </p>
          </div>

          <div>
            <h3 className="border-b border-gray-200 pb-3 text-[19px] font-medium text-[#1a1a1a]">
              Contact Info
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 flex items-center gap-2 text-[15px] text-ozwell-slate transition-colors hover:text-primary-600"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <h3 className="mt-9 border-b border-gray-200 pb-3 text-[19px] font-medium text-[#1a1a1a]">
              Socialize
            </h3>
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
                    className="text-[#1a1a1a] transition-colors hover:text-primary-600"
                  >
                    {Icon ? <Icon size={22} strokeWidth={1.75} aria-hidden="true" /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="border-b border-gray-200 pb-3 text-[19px] font-medium text-[#1a1a1a]">
              Links
            </h3>
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
            <h3 className="border-b border-gray-200 pb-3 text-[19px] font-medium text-[#1a1a1a]">
              Be a Part of Ozwell&apos;s Story
            </h3>
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

        {/* Centered bottom tagline */}
        <p className="mt-14 text-center text-[15px] text-ozwell-slate">
          Ozwell – More time for care, less time on paperwork. AI designed for physicians, by{' '}
          <a
            href="https://bluehive.com/about"
            className="text-primary-600 underline-offset-2 hover:underline"
          >
            BlueHive Health.
          </a>
        </p>
      </div>
    </footer>
  )
}
