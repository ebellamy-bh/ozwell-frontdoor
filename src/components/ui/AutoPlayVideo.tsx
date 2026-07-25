'use client' // Client: IntersectionObserver + prefers-reduced-motion gating

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Play } from 'lucide-react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/** Subscribes to the media query as external state, so there's no setState-in-effect cascade. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false // Server snapshot: assume motion is fine, correct on hydration.
  )
}

interface AutoPlayVideoProps {
  src: string
  poster: string
  label: string
  className?: string
}

/**
 * Decorative product loop that costs nothing until it matters.
 *
 * The legacy markup was a bare `<video autoPlay loop muted>` with no poster and no preload hint,
 * so every visit downloaded ~28 MB of video whether or not the reader ever scrolled to it. Here
 * the poster carries the layout, `src` is only attached once the element nears the viewport, and
 * playback pauses when it leaves again. Readers who ask for reduced motion get a still with an
 * explicit play control and download nothing unless they choose to.
 */
export default function AutoPlayVideo({ src, poster, label, className }: AutoPlayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  /** Whether playback is currently wanted, so the attach effect below knows what to do. */
  const wantsPlay = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        wantsPlay.current = entry.isIntersecting
        if (entry.isIntersecting) {
          // First time through this is a no-op — src isn't attached yet, so the effect below
          // starts playback once React has rendered it. On re-entry the src is already there.
          setLoaded(true)
          void el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  // Playback can only start after `src` is on the element, which is a render later than the
  // decision to load. Calling play() inside the observer alone would always reject.
  useEffect(() => {
    const el = ref.current
    if (!el || !loaded || !wantsPlay.current) return
    void el.play().catch(() => {})
  }, [loaded])

  const startManually = () => {
    wantsPlay.current = true
    setLoaded(true)
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <video
        ref={ref}
        // Attaching src only once visible is what keeps the bytes off the initial load.
        src={loaded ? src : undefined}
        poster={poster}
        preload="none"
        loop
        muted
        playsInline
        controls={reduced && loaded}
        aria-label={label}
        className="aspect-square w-full"
      />
      {reduced && !loaded && (
        <button
          type="button"
          onClick={startManually}
          className="absolute inset-0 flex items-center justify-center bg-ozwell-ink-strong/10 transition hover:bg-ozwell-ink-strong/20"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-lg">
            <Play size={26} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="sr-only">Play video: {label}</span>
        </button>
      )}
    </div>
  )
}
