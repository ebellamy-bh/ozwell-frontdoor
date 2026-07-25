'use client'

import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { Link2, Check, Linkedin, Mail } from 'lucide-react'

// Client: required for clipboard API and window.location access

/** X (Twitter) logo — no Lucide icon exists for the rebrand */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface ShareLinksProps {
  title: string
  slug: string
}

export default function ShareLinks({ title, slug }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://ozwell.ai/blog/${slug}/`
  const encodedUrl = encodeURIComponent(pageUrl)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — ignore
    }
  }, [])

  const links = [
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      label: 'Share via Email',
      href: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      icon: Mail,
    },
  ]

  return (
    <div className="flex items-center gap-2" aria-label="Share this post">
      <span className="text-xs font-semibold uppercase tracking-wider text-ozwell-slate">Share</span>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className={clsx(
          'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
          copied ? 'bg-ozwell-green/15 text-ozwell-green' : 'text-ozwell-slate hover:bg-primary-50 hover:text-primary-600'
        )}
      >
        {copied ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Link2 size={16} strokeWidth={2} aria-hidden="true" />}
      </button>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ozwell-slate transition-colors hover:bg-primary-50 hover:text-primary-600"
        >
          <link.icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
