import type { Route } from 'next'
import type { StaticImageData } from 'next/image'
import type { ExternalHref } from './links'

// One run of text inside a paragraph or line.
export type Inline =
  | string
  | { kind: 'external'; text: string; href: ExternalHref; srContext?: string } // srContext: "for NoelAgriTV"
  | { kind: 'internal'; text: string; href: Route }
  | { kind: 'nowrap'; text: string }

/** One paragraph or line. */
export type Rich = readonly Inline[]

/** qualifier includes its parentheses, e.g. "(team project)". */
export type Title = { name: string; qualifier?: string }

/** The full <title> and the meta description. */
export type Seo = { title: string; description: string }

export type Decision = { heading: string; paragraphs: readonly Rich[] }

/** variants in ascending width; the largest is the original file. */
export type ImageAsset = { variants: readonly StaticImageData[]; alt: string }

export type CaseStudySlug = 'noelagritv' | 'las-pos' | 'lipaaction' | 'iris'

export type CaseStudy = {
  slug: CaseStudySlug
  path: Route
  title: Title
  seo: Seo
  dek: string
  status: Rich
  /** Rendered "dates · item · item". */
  meta: { dates: string; items: readonly Rich[] }
  /** Rendered joined with " · " (ordinary spaces). */
  stack: readonly string[]
  opening: readonly Rich[]
  whereItIsNow: { paragraphs: readonly Rich[]; links?: readonly Inline[] }
  structuredData: { name: string; role: 'creator' | 'contributor' }
}

export type FeaturedEntry = {
  title: Title
  path: Route
  dates: string
  status: Rich
  body: Rich
  stack: readonly string[]
}

export type CompactEntry = { title: Title; path?: Route; dates: string; body: Rich }
