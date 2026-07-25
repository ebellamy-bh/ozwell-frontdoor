import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import ShapeDivider from '@/components/ui/ShapeDivider'

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
      <ShapeDivider shape="waves" position="bottom" flipped heightClass="h-12 lg:h-20" />
    </section>
  )
}
