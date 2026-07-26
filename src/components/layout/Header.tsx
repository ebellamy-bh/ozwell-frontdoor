'use client' // Client: mobile menu state, scroll lock, and active-route highlighting

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Menu, X, LogIn } from 'lucide-react'
import Button from '@/components/ui/Button'
import siteConfig from '@/data/site.json'

/** `/docs/` should stay lit while reading `/docs/creating-an-account/`. */
function isActive(pathname: string, href: string): boolean {
  if (href.startsWith('/#') || !href.startsWith('/')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const toggleRef = useRef<HTMLButtonElement>(null)

  /**
   * Close the sheet whenever the route changes.
   *
   * Every nav link already closes it on click, but browser back/forward changes
   * the route without one — and since Next doesn't remount the layout, the sheet
   * would stay open over the new page with `body` still scroll-locked.
   *
   * Adjusted during render rather than in an effect: setting state inside an
   * effect renders once with the stale value and then again to correct it, and
   * here the stale render is the visibly wrong one.
   */
  const [sheetPath, setSheetPath] = useState(pathname)
  if (sheetPath !== pathname) {
    setSheetPath(pathname)
    setOpen(false)
  }

  /**
   * While the sheet is open: lock the page behind it and let Escape dismiss it.
   * Without the lock, scrolling the sheet scrolls the page underneath on iOS.
   */
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      // Return focus to the control that opened it, or focus is left nowhere.
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-ozwell-border/70 bg-white/90 backdrop-blur-md">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        {/* py-1 lifts the logo link to a 44px target; the image alone was 36px. */}
        <Link href="/" className="flex shrink-0 items-center py-1" aria-label="Ozwell home">
          <Image
            src="/images/Ozwell-logo.webp"
            alt="Ozwell"
            width={330}
            height={150}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors',
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ozwell-ink hover:bg-primary-50/70 hover:text-primary-700'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop actions. The header previously offered Login only — the primary
            conversion path was invisible on every page but the homepage hero. */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button href={siteConfig.ctas.login.href} variant="ghost" size="sm" icon={LogIn}>
            {siteConfig.ctas.login.label}
          </Button>
          <Button href={siteConfig.ctas.trial.href} variant="primary" size="sm">
            {siteConfig.ctas.trial.label}
          </Button>
        </div>

        {/* Mobile: keep the primary CTA reachable without opening the menu. */}
        <div className="ml-auto flex items-center gap-1.5 lg:hidden">
          <Button
            href={siteConfig.ctas.trial.href}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {siteConfig.ctas.trial.label}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-xl text-ozwell-ink-strong transition-colors hover:bg-primary-50"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={24} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          /*
           * Positioned against the header, not the viewport.
           *
           * This was `fixed inset-x-0 top-[61px] bottom-0`, which measured 49px
           * tall and clipped the whole menu: the header carries `backdrop-blur`,
           * and a backdrop-filter establishes a containing block for fixed
           * descendants — so `bottom-0` resolved to the bottom of the 61px header
           * rather than the bottom of the screen.
           *
           * `top-full` on an absolute box uses that same containing block
           * deliberately, which also drops the hardcoded 61px/65px header heights.
           * `dvh` so mobile browser chrome doesn't cut off the last item.
           */
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-ozwell-border bg-white px-4 pb-10 pt-2 shadow-lg lg:hidden"
        >
          <ul>
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'flex min-h-[52px] items-center border-b border-ozwell-border/60 text-lg font-medium',
                      active ? 'text-primary-700' : 'text-ozwell-ink-strong'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-7 flex flex-col gap-3">
            <Button href={siteConfig.ctas.trial.href} variant="primary" size="lg" block>
              {siteConfig.ctas.trial.label}
            </Button>
            <Button href={siteConfig.ctas.demo.href} variant="secondary" size="lg" block>
              {siteConfig.ctas.demo.label}
            </Button>
            <Button href={siteConfig.ctas.login.href} variant="ghost" size="md" icon={LogIn} block>
              {siteConfig.ctas.login.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
