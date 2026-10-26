import { ExternalLink } from '@/components/links/ExternalLink'
import { RichText } from '@/components/text/RichText'
import type { CaseStudy, Inline } from '@/content/types'

function ListLink({ link }: { link: Inline }) {
  if (typeof link === 'string' || link.kind !== 'external') {
    throw new Error('"Where it is now" links must be external links')
  }
  return (
    <ExternalLink href={link.href} srContext={link.srContext} variant="standalone">
      {link.text}
    </ExternalLink>
  )
}

export function WhereItIsNow({ content }: { content: CaseStudy['whereItIsNow'] }) {
  return (
    <section className="flex flex-col gap-2.5 md:gap-3">
      <h2 className="text-section-title font-semibold">Where it is now</h2>
      {content.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-pretty">
          <RichText value={paragraph} />
        </p>
      ))}
      {content.links && (
        <ul role="list" className="flex flex-col text-body">
          {content.links.map((link, index) => (
            <li key={index} className="flex">
              <ListLink link={link} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
