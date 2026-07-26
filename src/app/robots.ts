import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/metadata'

export const dynamic = 'force-static'

/**
 * Named AI crawlers.
 *
 * A bare `User-agent: *  Allow: /` already permits these, so listing them changes
 * nothing mechanically — it's an explicit statement of intent. Several of these
 * agents are blocked by default in shared hosting configs and boilerplate
 * robots.txt files, and an explicit allow is what keeps a well-behaved crawler
 * from erring on the side of skipping the site. This is a public marketing site;
 * being quotable by answer engines is the entire point.
 *
 * Note that `Google-Extended` is not a crawler: it's Google's opt-out token for
 * Gemini training and grounding. Listing it here opts in.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'Bingbot',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
