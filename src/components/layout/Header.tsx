'use client' // Client: required for mobile menu toggle

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import siteConfig from '@/data/site.json'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex items-center" aria-label="Ozwell home">
          <Image src="/images/Ozwell-logo.png" alt="Ozwell" width={150} height={40} priority className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ozwell-ink transition-colors hover:text-primary-600">
              {item.label}
            </Link>
          ))}
          <a href={siteConfig.ctas.demo.href} className="text-sm font-medium text-ozwell-ink transition-colors hover:text-primary-600">
            {siteConfig.ctas.demo.label}
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.ctas.login.href}
            className="rounded-full border border-[#323232] px-6 py-2 text-sm font-medium text-[#323232] transition-colors hover:bg-gray-50"
          >
            {siteConfig.ctas.login.label}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded p-2 text-ozwell-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.75} aria-hidden="true" /> : <Menu strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-2 md:hidden">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base font-medium text-ozwell-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a href={siteConfig.ctas.demo.href} className="block py-3 text-base font-medium text-ozwell-ink">
              {siteConfig.ctas.demo.label}
            </a>
            <a href={siteConfig.ctas.login.href} className="rounded-full border border-[#323232] px-5 py-2.5 text-center text-sm font-medium text-[#323232]">
              {siteConfig.ctas.login.label}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
