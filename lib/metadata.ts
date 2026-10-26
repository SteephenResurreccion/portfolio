import type { Metadata } from 'next'
import { SITE_NAME } from '@/content/site'
import type { Seo } from '@/content/types'

/**
 * The complete metadata object for one indexable route. Every route passes the whole openGraph object,
 * because Next merges metadata shallowly; the canonical is set per route so none inherits "/".
 */
export function buildPageMetadata(seo: Seo, path: string): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: path,
      title: seo.title,
      description: seo.description,
    },
    twitter: { card: 'summary', title: seo.title, description: seo.description },
  }
}
