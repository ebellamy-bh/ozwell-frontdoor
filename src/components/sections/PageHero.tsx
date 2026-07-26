import Image from 'next/image'
import type { ReactNode } from 'react'
import Section from '@/components/ui/Section'
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs'

interface PageHeroProps {
  title: string
  eyebrow?: string
  description?: string
  image?: { src: string; alt: string; width: number; height: number }
  /** Meaningful levels only — `Breadcrumbs` prepends Home. */
  breadcrumbs?: Crumb[]
  /** Extra content below the copy, e.g. the Help Center search field. */
  children?: ReactNode
}

/**
 * The header for every inner page.
 *
 * There were four of these: `PageHero` (gradient, About), `BlogHero` (white, a
 * 60px blue title over a horizontal rule), `DocsHero` (white, centred, uppercase
 * eyebrow), and an inline one on `/docs-category`. Four page types, four
 * unrelated headers, so moving between them felt like moving between sites.
 */
export default function PageHero({
  title,
  eyebrow,
  description,
  image,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <Section tone="brand" spacing="none" dividers="bottom" pattern className="pt-8 lg:pt-10">
      {breadcrumbs ? (
        <Breadcrumbs
          items={breadcrumbs}
          /* Inverted for the gradient: the shared component's default ink and
             primary-700 are close to unreadable on blue. */
          className="mb-7 [&_a]:text-white/80 [&_a:hover]:text-white [&_li]:text-white/70 [&_svg]:text-white/40"
        />
      ) : null}

      <div className={image ? 'grid items-center gap-10 lg:grid-cols-2' : 'max-w-3xl'}>
        <div>
          {eyebrow ? (
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-100">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={`text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl ${eyebrow ? 'mt-3' : ''}`}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{description}</p>
          ) : null}
        </div>

        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 1024px) 88vw, 460px"
            className="mx-auto w-full max-w-md"
          />
        ) : null}
      </div>

      {children ? <div className="mt-9">{children}</div> : null}
    </Section>
  )
}
