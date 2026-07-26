import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

interface OgCardOptions {
  /** Small label above the title — the section the page belongs to. */
  eyebrow: string
  title: string
  subtitle?: string
}

/**
 * The social card, rendered at build time.
 *
 * One renderer, called from a three-line `opengraph-image.tsx` in each route, so
 * every page gets a card that names *that* page. Next's metadata file conventions
 * do not cascade a parent `opengraph-image` down to child routes that declare
 * their own `openGraph` block — which every page here does, via `createMetadata` —
 * so a single root card would have left About, Blog, and the Help Center with no
 * social image at all.
 *
 * Typographic rather than illustrated: drawing the mascot would mean inlining it
 * as a base64 data URI in every card, and the wordmark on the brand gradient is
 * recognisable at the size these are actually seen.
 */
export function ogCard({ eyebrow, title, subtitle }: OgCardOptions) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: 'linear-gradient(145deg, #24c1fc 0%, #0b78de 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div
          style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fada00' }}
        />
        <div
          style={{
            fontSize: '34px',
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          Ozwell
        </div>
        <div style={{ display: 'flex', fontSize: '26px', color: 'rgba(255,255,255,0.55)' }}>/</div>
        <div
          style={{
            display: 'flex',
            fontSize: '24px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            // Long doc titles need to stay inside 630px of height, so the size
            // steps down once a title gets past a headline's worth of words.
            fontSize: title.length > 64 ? '54px' : '70px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: '26px',
              fontSize: '30px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', gap: '30px', fontSize: '23px', color: 'white' }}>
        <div style={{ display: 'flex' }}>HIPAA compliant</div>
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</div>
        <div style={{ display: 'flex' }}>Drummond pDSI-Risk certified</div>
        <div style={{ display: 'flex', color: 'rgba(255,255,255,0.4)' }}>·</div>
        <div style={{ display: 'flex' }}>ozwell.ai</div>
      </div>
    </div>,
    OG_SIZE
  )
}
