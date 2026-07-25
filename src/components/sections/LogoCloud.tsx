import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface LogoCloudProps {
  title: string
  logos: Array<{ src: string; alt: string }>
}

export default function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <section className="border-y border-gray-100 bg-white py-14">
      <Container>
        <h2 className="text-center text-3xl font-normal text-[#515151] sm:text-[35px]">{title}</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
