import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'
import siteConfig from '@/data/site.json'

interface AppDownloadCTAProps {
  title: string
  subtitle: string
  banner: string
}

/**
 * Tall blue-gradient app-download band with the network pattern, a white
 * wave curving in from the top, and bordered white store buttons — matches live.
 */
export default function AppDownloadCTA({ title, subtitle, banner }: AppDownloadCTAProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(105deg,#0f77cf_5%,#23d0fb_100%)] text-white">
      {/* Network / bubble pattern overlay (same asset as the hero) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/hero-pattern.webp')" }}
        aria-hidden="true"
      />

      {/* Live: waves top divider, 220px, not flipped */}
      <ShapeDivider shape="waves" position="top" heightClass="h-24 lg:h-[220px]" />

      <Container className="relative pb-40 pt-48 lg:pb-52 lg:pt-64">
        <h2 className="text-center text-2xl font-normal sm:text-[38px]">{banner}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-4xl font-bold leading-tight sm:text-[50px]">
          {title}
        </p>
        <p className="mt-5 text-center text-lg font-bold sm:text-[23px]">{subtitle}</p>
        <div className="mt-8 flex justify-center gap-5">
          <a href={siteConfig.apps.appStore} rel="noopener noreferrer" target="_blank">
            <Image
              src="/images/white-app-store-buttons-6-1.png"
              alt="Download on the App Store"
              width={207}
              height={62}
              className="h-[62px] w-auto rounded-lg"
            />
          </a>
          <a href={siteConfig.apps.googlePlay} rel="noopener noreferrer" target="_blank">
            <Image
              src="/images/white-app-store-buttons-7-1.png"
              alt="Get it on Google Play"
              width={207}
              height={62}
              className="h-[62px] w-auto rounded-lg"
            />
          </a>
        </div>
      </Container>
    </section>
  )
}
