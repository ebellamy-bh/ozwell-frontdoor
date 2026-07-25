import { createMetadata } from '@/lib/metadata'
import PageHero from '@/components/sections/PageHero'
import DocsHub from '@/components/sections/DocsHub'
import { docsHub } from '@/data/docs'

export const metadata = createMetadata({
  title: 'Help Center',
  description: 'Guides, FAQs, and documentation for getting the most out of Ozwell — accounts, integrations, API, and more.',
  path: '/docs/',
})

export default function Page() {
  return (
    <>
      <PageHero title="Help Center" description="Guides, FAQs, and documentation for getting the most out of Ozwell." />
      <DocsHub categories={docsHub} />
    </>
  )
}
