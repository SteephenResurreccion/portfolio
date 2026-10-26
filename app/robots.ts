import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

// Allow all, answer-engine crawlers included (his spec review, Q10).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', SITE_URL).href,
  }
}
