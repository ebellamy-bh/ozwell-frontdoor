import { posts, stripHtml } from '@/lib/content'
import { SITE_URL, SITE_NAME } from '@/lib/metadata'

// Force static generation for RSS feed
export const dynamic = 'force-static'

/** Escape special XML characters to prevent injection */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** RSS feed of all blog posts. */
export async function GET() {
  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(post.date).toUTCString()
      const link = `${SITE_URL}/blog/${post.slug}/`
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${stripHtml(post.excerpt)}]]></description>
      ${post.categories.map((c) => `<category>${escapeXml(c)}</category>`).join('')}
      ${post.authorName ? `<author>${escapeXml(post.authorName)}</author>` : ''}
      ${post.featuredImage ? `<enclosure url="${escapeXml(SITE_URL + post.featuredImage)}" type="image/png" />` : ''}
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Insights on AI in healthcare, medical documentation, and Ozwell product updates.</description>
    <language>en-US</language>
    <lastBuildDate>${posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/icon.png</url>
      <title>${SITE_NAME} Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
