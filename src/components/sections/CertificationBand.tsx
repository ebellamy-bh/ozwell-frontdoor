import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface CertificationBandProps {
  title: string
  image: { src: string; alt: string; width: number; height: number }
}

export default function CertificationBand({ title, image }: CertificationBandProps) {
  return (
    <section className="bg-ozwell-green py-14 text-white">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className="h-36 w-auto" />
          <h2 className="max-w-2xl text-center text-2xl font-black leading-snug md:text-left sm:text-[37px]">{title}</h2>
        </div>
      </Container>
    </section>
  )
}
