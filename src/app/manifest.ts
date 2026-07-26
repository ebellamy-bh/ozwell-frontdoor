import type { MetadataRoute } from 'next'
import siteConfig from '@/data/site.json'

export const dynamic = 'force-static'

/**
 * Web app manifest. Not a PWA — there's no service worker and nothing to install
 * beyond the real iOS/Android apps. It's here so that a reader who does add the
 * site to their home screen gets the mascot and the brand colour instead of a
 * screenshot of the page, and so Android has a maskable icon to work from.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ozwell — AI medical assistant',
    short_name: 'Ozwell',
    description: siteConfig.aboutBlurb,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#27aae1',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
