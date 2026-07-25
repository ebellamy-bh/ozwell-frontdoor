import { createMetadata } from '@/lib/metadata'
import DocsHero from '@/components/sections/DocsHero'
import DocsHub from '@/components/sections/DocsHub'
import DocsSearch from '@/components/sections/DocsSearch'
import { docsHub, docsSearchIndex, featuredDocsCategory } from '@/data/docs'

export const metadata = createMetadata({
  title: 'Help Center',
  description:
    'Guides, FAQs, and documentation for getting the most out of Ozwell — accounts, integrations, API, and more.',
  path: '/docs/',
})

export default function Page() {
  return (
    <>
      <DocsHero eyebrow="Help Center" title="How can we help?" />
      {/* The hub is the empty-query state: typing swaps it for results. */}
      <DocsSearch index={docsSearchIndex}>
        <DocsHub featured={featuredDocsCategory} categories={docsHub} />
      </DocsSearch>
    </>
  )
}
