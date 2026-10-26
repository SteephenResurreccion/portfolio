import { ExternalLink } from '@/components/links/ExternalLink'
import { EXTERNAL } from '@/content/links'
import { EMAIL } from '@/content/site'

/** Email (same tab, no arrow), LinkedIn ↗ and GitHub ↗. Used in the footer and in Home's intro. */
export function ContactLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 md:gap-x-6">
      <a
        href={`mailto:${EMAIL}`}
        className="inline-flex min-h-11 items-center text-link underline decoration-1 underline-offset-4 hover:text-link-hover"
      >
        {EMAIL}
      </a>
      <ExternalLink href={EXTERNAL.linkedin} variant="standalone">
        LinkedIn
      </ExternalLink>
      <ExternalLink href={EXTERNAL.github} variant="standalone">
        GitHub
      </ExternalLink>
    </div>
  )
}
