import { createMetadata } from '@/lib/metadata'
import { collectionSchema } from '@/lib/schema'
import JsonLd from '@/components/sections/JsonLd'
import PageHero from '@/components/sections/PageHero'
import DocsHub from '@/components/sections/DocsHub'
import DocsSearch from '@/components/sections/DocsSearch'
import CTASection from '@/components/sections/CTASection'
import { allDocs, docsHub, docsSearchIndex, featuredDocsCategory } from '@/data/docs'

const DESCRIPTION =
  'Guides, FAQs, and API reference for Ozwell — creating an account, customizing your assistant, connecting WebChart and your EHR, and building on the completions API.'

export const metadata = createMetadata({
  title: 'Ozwell Help Center — guides, setup, and API reference',
  description: DESCRIPTION,
  path: '/docs/',
  keywords: ['Ozwell help', 'Ozwell documentation', 'Ozwell API', 'WebChart integration'],
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={collectionSchema({
          name: 'Ozwell Help Center',
          description: DESCRIPTION,
          path: '/docs/',
          items: allDocs.map((d) => ({ name: d.title, path: `/docs/${d.slug}/` })),
        })}
      />

      <PageHero
        eyebrow="Help Center"
        title="How can we help?"
        description="Search every guide, or browse by topic below."
        breadcrumbs={[{ name: 'Help Center' }]}
      />

      {/* The hub is the empty-query state: typing swaps it for results. */}
      <DocsSearch index={docsSearchIndex}>
        <DocsHub featured={featuredDocsCategory} categories={docsHub} />
      </DocsSearch>

      <CTASection
        title="Can't find what you need?"
        description="Email our team at info@ozwell.ai and we'll help directly."
        primary={{ label: 'Email support', href: 'mailto:info@ozwell.ai' }}
      />
    </>
  )
}
