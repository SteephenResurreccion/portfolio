import type { Route } from 'next'
import Link from 'next/link'
import { Qualifier } from '@/components/text/Qualifier'
import type { Title } from '@/content/types'

type EntryTitleProps = { title: Title; path?: Route; size: 'featured' | 'compact' }

/**
 * A Home entry title. When linked, the link is stretched over the whole article (::after); only the name
 * span is underlined, and the hidden " case study" comes after the qualifier (build note).
 */
export function EntryTitle({ title, path, size }: EntryTitleProps) {
  const underline =
    size === 'featured' ? 'decoration-2 underline-offset-5' : 'decoration-1 underline-offset-4'
  const qualifier = title.qualifier ? <Qualifier text={title.qualifier} placement="entry" /> : null
  if (!path) {
    return (
      <>
        {title.name}
        {qualifier && <> {qualifier}</>}
      </>
    )
  }
  return (
    <Link
      href={path}
      className="stretched-link group text-ink no-underline after:absolute after:inset-0 after:content-['']"
    >
      <span className={`underline decoration-link group-hover:decoration-link-hover ${underline}`}>
        {title.name}
      </span>
      {qualifier && <> {qualifier}</>}
      <span className="sr-only"> case study</span>
    </Link>
  )
}
