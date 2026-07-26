'use client' // Client: scroll-driven reveal for [data-reveal] elements

import { useEffect } from 'react'

/** Reveal once the element's top is within this fraction of the viewport height. */
const TRIGGER_RATIO = 0.92

/**
 * Reveal-on-scroll, mounted once for the whole app.
 *
 * Server components opt in with a `data-reveal` attribute, so no section has to become a client
 * component to animate.
 *
 * The governing constraint is that **content must never be able to end up permanently invisible**,
 * which drove two decisions:
 *
 * 1. The hidden state is applied per-element (`reveal-armed`) and only to elements that are below
 *    the fold at the moment they're found — never to `[data-reveal]` wholesale. Anything already in
 *    view is marked revealed immediately and simply renders. Elements this code never reaches are
 *    never hidden in the first place.
 * 2. Reveal is driven by scroll position rather than IntersectionObserver. IO looks like the right
 *    tool but has a hole: it fires on threshold crossings, and an element that goes from below the
 *    viewport to above it in a single frame never crosses one — its ratio is 0 on both sides. Jump
 *    to a `#faq` anchor, or let the browser restore scroll on a back-navigation, and everything
 *    skipped over stays hidden forever. A position check has no such gap.
 *
 * An earlier version put the hidden state behind one class on <html> and used IO. That broke on
 * client-side navigation: this component lives in the root layout, so its effect never re-ran, the
 * incoming page's elements were never observed, and the stale class left the page blank.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /** Below-fold elements waiting to be revealed. */
    const pending = new Set<Element>()
    let frame = 0

    const reveal = (el: Element) => {
      el.classList.add('is-revealed')
      pending.delete(el)
    }

    const sweep = () => {
      frame = 0
      const limit = window.innerHeight * TRIGGER_RATIO
      for (const el of pending) {
        if (el.getBoundingClientRect().top < limit) reveal(el)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep)
    }

    const claimNewTargets = () => {
      const limit = window.innerHeight * TRIGGER_RATIO
      document
        .querySelectorAll('[data-reveal]:not(.reveal-armed):not(.is-revealed)')
        .forEach((el) => {
          if (el.getBoundingClientRect().top < limit) {
            // Already on screen: show it outright rather than animating content the reader is
            // looking at, and keep it out of the first paint's critical path.
            reveal(el)
            return
          }
          el.classList.add('reveal-armed')
          pending.add(el)
        })
    }

    claimNewTargets()

    // Route changes and conditional rendering (the Help Center swapping search results for the hub,
    // say) both mount fresh targets without remounting this component.
    const mutations = new MutationObserver(claimNewTargets)
    mutations.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      mutations.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      // Leave nothing armed-but-unrevealed behind on teardown.
      document
        .querySelectorAll('[data-reveal].reveal-armed')
        .forEach((el) => el.classList.remove('reveal-armed'))
    }
  }, [])

  return null
}
