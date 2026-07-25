import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import siteConfig from '@/data/site.json'

interface AppDownloadCTAProps {
  title: string
  subtitle: string
  banner: string
}

export default function AppDownloadCTA({ title, subtitle, banner }: AppDownloadCTAProps) {
  return (
    <section className="bg-gradient-to-r from-[#0f77cf] to-[#23d0fb] py-20 text-white">
      <Container>
        <h2 className="text-center text-2xl font-normal text-white/95 sm:text-[38px]">{banner}</h2>
        <p className="mt-6 text-center text-3xl font-bold sm:text-[50px]">{title}</p>
        <p className="mt-4 text-center text-xl text-white/90">{subtitle}</p>
        <div className="mt-8 flex justify-center gap-4">
          <a href={siteConfig.apps.appStore} rel="noopener noreferrer" target="_blank">
            <Image src="/images/white-app-store-buttons-6-1.png" alt="Download on the App Store" width={180} height={54} className="h-14 w-auto" />
          </a>
          <a href={siteConfig.apps.googlePlay} rel="noopener noreferrer" target="_blank">
            <Image src="/images/white-app-store-buttons-7-1.png" alt="Get it on Google Play" width={180} height={54} className="h-14 w-auto" />
          </a>
        </div>
      </Container>
    </section>
  )
}
