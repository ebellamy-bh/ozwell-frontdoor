'use client' // Client: swaps the poster facade for the real iframe on click

import { useState } from 'react'
import { Play } from 'lucide-react'

interface YouTubeEmbedProps {
  id: string
  title: string
  className?: string
}

/**
 * Click-to-play YouTube embed.
 *
 * A bare `<iframe>` near the top of the homepage pulled roughly a megabyte of
 * player JavaScript and set third-party cookies on every visit, whether or not
 * anyone pressed play — and it competed with the hero image for LCP. This renders
 * YouTube's own thumbnail (~20 KB) as a button and only mounts the iframe once
 * the reader asks for it, with `autoplay=1` so the click still starts playback.
 */
export default function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-ozwell-navy-deep shadow-card ${className ?? ''}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Plain img, not next/image: this is a third-party host and the export
              runs unoptimized anyway, so next/image would only add a
              remotePatterns entry for no benefit. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ozwell-navy-deep/70 via-transparent to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary-700 shadow-lg transition group-hover:scale-110 group-hover:bg-white motion-reduce:transform-none sm:h-20 sm:w-20">
              <Play size={28} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left text-sm font-semibold text-white sm:p-6 sm:text-base">
            {title}
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  )
}
