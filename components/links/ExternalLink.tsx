import type { ExternalHref } from '@/content/links'
import { ArrowIcon } from './ArrowIcon'

type ExternalLinkProps = {
  href: ExternalHref
  children: string
  /** Hidden context before "(opens in new tab)", e.g. "for NoelAgriTV". */
  srContext?: string
  variant: 'in-text' | 'standalone'
}

const VARIANT_CLASSES = {
  'in-text': 'text-link underline decoration-1 underline-offset-3 hover:text-link-hover',
  standalone: 'inline-flex min-h-11 items-center text-link underline decoration-1 underline-offset-4 hover:text-link-hover',
} as const

/**
 * A new-tab link. The last word and the ↗ share a nowrap span (the canvas's "&#160;↗"), so the arrow
 * never wraps alone while multi-word labels still wrap where the canvas wraps them. One inner span keeps
 * the label a single flex item in the standalone variant.
 */
export function ExternalLink({ href, children, srContext, variant }: ExternalLinkProps) {
  const lastSpace = children.lastIndexOf(' ')
  const head = lastSpace === -1 ? '' : children.slice(0, lastSpace + 1)
  const lastWord = lastSpace === -1 ? children : children.slice(lastSpace + 1)
  const hidden = srContext ? ` ${srContext} (opens in new tab)` : ' (opens in new tab)'
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={VARIANT_CLASSES[variant]}>
      <span>
        {head}
        <span className="whitespace-nowrap">
          {lastWord}
          <ArrowIcon direction="up-right" />
        </span>
        <span className="sr-only">{hidden}</span>
      </span>
    </a>
  )
}
