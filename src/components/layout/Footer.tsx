import Link from 'next/link'
import Image from 'next/image'
import siteConfig from '@/data/site.json'

export function Footer() {
  return (
    <footer className="bg-ozwell-blue-dark text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold">About Us</h3>
            <p className="text-sm leading-relaxed text-white/85">{siteConfig.aboutBlurb}</p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Contact Info</h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-white/85 underline-offset-2 hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Socialize</h3>
            <ul className="space-y-2">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-sm text-white/85 underline-offset-2 hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold">Links</h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.map((l) =>
                l.href.startsWith('/') ? (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/85 underline-offset-2 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-white/85 underline-offset-2 hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-8">
          <h3 className="mb-3 text-lg font-bold">Be a Part of Ozwell&apos;s Story</h3>
          <p className="max-w-3xl text-sm leading-relaxed text-white/85">{siteConfig.storyBlurb}</p>
          <p className="mt-4 text-sm text-white/85">
            Ozwell – More time for care, less time on paperwork. AI designed for physicians, by{' '}
            <a href="https://bluehive.com/about" className="underline underline-offset-2">
              BlueHive Health.
            </a>
          </p>
          <div className="mt-6 flex gap-4">
            <a href={siteConfig.apps.appStore} rel="noopener noreferrer" target="_blank">
              <Image
                src="/images/white-app-store-buttons-6-1.png"
                alt="Download on the App Store"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </a>
            <a href={siteConfig.apps.googlePlay} rel="noopener noreferrer" target="_blank">
              <Image
                src="/images/white-app-store-buttons-7-1.png"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
