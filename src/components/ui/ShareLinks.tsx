'use client' // Client: clipboard API for the copy-link button

import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { Link2, Check, Linkedin, Mail } from 'lucide-react'
import { SITE_URL } from '@/lib/metadata'

/** X (Twitter) logo — Lucide has no mark for the rebrand. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface ShareLinksProps {
  title: string
  /** Blog post slug. These links are only used on `/blog/[slug]`. */
  slug: string
}

export default function ShareLinks({ title, slug }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)

  /**
   * Always the canonical production URL, never `window.location.href`.
   *
   * This used to read `typeof window !== 'undefined' ? window.location.href : …`
   * during render, which is a hydration mismatch by construction: the server
   * emitted the canonical URL and the client emitted the current one, and React
   * reported it as unpatchable. It was also wrong on its own terms — from a
   * preview deploy or a local build it produced share links and copied URLs
   * pointing at a host nobody else can reach.
   */
  const pageUrl = `${SITE_URL}/blog/${slug}/`
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable or permission denied — nothing useful to do.
    }
  }, [pageUrl])

  const links = [
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      newTab: true,
    },
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
      newTab: true,
    },
    {
      label: 'Share via Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
      // A mail client isn't a tab; opening a blank one and leaving it is noise.
      newTab: false,
    },
  ]

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-1 text-xs font-bold uppercase tracking-[0.12em] text-ozwell-slate">
        Share
      </span>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link to this post'}
        className={clsx(
          'inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
          copied
            ? 'bg-ozwell-green-dark/10 text-ozwell-green-dark'
            : 'text-ozwell-slate hover:bg-primary-50 hover:text-primary-700'
        )}
      >
        {copied ? (
          <Check size={16} strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <Link2 size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          {...(link.newTab && { target: '_blank', rel: 'noopener noreferrer' })}
          aria-label={link.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ozwell-slate transition-colors hover:bg-primary-50 hover:text-primary-700"
        >
          <link.icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
