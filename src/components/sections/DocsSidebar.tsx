import Link from 'next/link'
import clsx from 'clsx'

interface DocsSidebarProps {
  categories: Array<{
    slug: string
    name: string
    docs: Array<{ slug: string; title: string }>
  }>
  /** The article currently being read, highlighted in place. */
  currentSlug: string
}

/**
 * Whole-Help-Center navigation for article pages, which previously offered nothing
 * but a breadcrumb. Ten articles fit comfortably, so every one is listed rather
 * than collapsed behind disclosure widgets; on mobile the aside simply stacks
 * above the article.
 */
export default function DocsSidebar({ categories, currentSlug }: DocsSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ozwell-slate">
        Help Center
      </h2>
      <nav aria-label="Help Center articles" className="mt-4 space-y-6">
        {categories.map((category) => (
          <div key={category.slug}>
            <Link
              href={`/docs-category/${category.slug}/`}
              className="text-sm font-bold text-ozwell-ink-strong underline-offset-2 hover:underline"
            >
              {category.name}
            </Link>
            <ul className="mt-2 space-y-0.5 border-l border-ozwell-border">
              {category.docs.map((doc) => {
                const current = doc.slug === currentSlug
                return (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}/`}
                      aria-current={current ? 'page' : undefined}
                      className={clsx(
                        '-ml-px block border-l-2 py-1.5 pl-3 text-sm leading-snug transition',
                        current
                          ? 'border-primary-500 font-semibold text-primary-700'
                          : 'border-transparent text-ozwell-slate hover:border-primary-200 hover:text-ozwell-ink'
                      )}
                    >
                      {doc.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
