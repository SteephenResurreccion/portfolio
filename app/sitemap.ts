import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

// No lastModified, priority or changefreq: Google ignores the last two and distrusts drifting dates.
const ROUTES = ['/', '/noelagritv', '/las-pos', '/lipaaction', '/iris', '/about'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: new URL(path, SITE_URL).href }))
}
