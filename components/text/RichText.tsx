import { ExternalLink } from '@/components/links/ExternalLink'
import { TextLink } from '@/components/links/TextLink'
import type { Inline, Rich } from '@/content/types'

function renderInline(part: Inline, index: number) {
  if (typeof part === 'string') return part
  switch (part.kind) {
    case 'external':
      return (
        <ExternalLink key={index} href={part.href} srContext={part.srContext} variant="in-text">
          {part.text}
        </ExternalLink>
      )
    case 'internal':
      return (
        <TextLink key={index} href={part.href}>
          {part.text}
        </TextLink>
      )
    case 'nowrap':
      return (
        <span key={index} className="whitespace-nowrap">
          {part.text}
        </span>
      )
  }
}

/** Renders one Rich line: strings, links and nowrap spans. The caller supplies the element. */
export function RichText({ value }: { value: Rich }) {
  return <>{value.map(renderInline)}</>
}
