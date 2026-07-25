import Image from 'next/image'
import { Container } from '@/components/ui/Container'
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
        style={{ backgroundImage: "url('/images/bluehive-site-headers-25.png')" }}
        aria-hidden="true"
      />

      {/* Top white wave curving down into the band (matches live shape-top) */}
      <svg
        className="absolute left-0 top-0 h-20 w-full text-white lg:h-36"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
        />
      </svg>

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
