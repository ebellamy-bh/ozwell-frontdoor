import Image from 'next/image'
import { Container } from '@/components/ui/Container'

interface PageHeroProps {
  title: string
  image?: { src: string; alt: string; width: number; height: number }
  description?: string
}

/** Gradient page hero used by inner pages (About, Blog, Docs). */
export default function PageHero({ title, image, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(150deg,#24c1fc_0%,#0890ed_100%)] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/bluehive-site-headers-25.png')" }}
        aria-hidden="true"
      />
      <Container className="relative pb-20 pt-14 lg:pt-16">
        <div className={image ? 'grid items-center gap-10 lg:grid-cols-2' : ''}>
          <div>
            <h1 className="text-5xl font-bold sm:text-6xl">{title}</h1>
            {description ? (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/95">{description}</p>
            ) : null}
          </div>
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="w-full max-w-md justify-self-center"
            />
          ) : null}
        </div>
      </Container>
      <svg
        className="absolute bottom-0 left-0 h-12 w-full rotate-180 text-white lg:h-20"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
        />
      </svg>
    </section>
  )
}
