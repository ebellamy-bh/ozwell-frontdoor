'use client' // Client: IntersectionObserver over [data-reveal] elements

import { useEffect } from 'react'

/**
 * Reveal-on-scroll, mounted once for the whole app.
 *
 * Rather than making every animated section a client component, this observes any element carrying
 * `data-reveal` — so server components opt in with a single attribute and no client boundary.
 *
 * The hidden state lives behind a `reveal-ready` class that only this component sets, so content is
 * never invisible if JavaScript fails or hasn't run. Elements already in view when it mounts are
 * revealed on the first observer callback, which keeps above-the-fold content from flashing.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let observer: IntersectionObserver | undefined
    let failsafe: ReturnType<typeof setTimeout> | undefined

    const revealAll = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'))
    }

    const start = () => {
      // Browsers don't deliver IntersectionObserver callbacks for a hidden document, so enabling
      // the hidden state before the page is visible risks a permanently blank page — a tab restored
      // from the background, for instance. Wait until there's something to animate for.
      if (document.hidden) return

      root.classList.add('reveal-ready')

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-revealed')
            // One-shot: re-animating on every pass back up the page is noise, not polish.
            observer?.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
      )

      document.querySelectorAll('[data-reveal]').forEach((el) => observer?.observe(el))

      // Backstop: whatever goes wrong — a throttled callback, an unexpected layout — content is
      // visible within a couple of seconds. Nothing here is worth hiding copy over.
      failsafe = setTimeout(revealAll, 2000)
    }

    start()
    document.addEventListener('visibilitychange', start)

    return () => {
      document.removeEventListener('visibilitychange', start)
      if (failsafe) clearTimeout(failsafe)
      observer?.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])

  return null
}
