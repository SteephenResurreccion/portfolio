import Link from 'next/link'
import { nextCaseStudy } from '@/content/case-studies'
import type { CaseStudySlug } from '@/content/types'

const NBSP = '\u00A0'

/** "Next: <title>". Spaces inside the qualifier become no-break spaces so it never splits (R61). */
export function NextCaseStudy({ current }: { current: CaseStudySlug }) {
  const next = nextCaseStudy(current)
  const qualifier = next.title.qualifier ? ` ${next.title.qualifier.replaceAll(' ', NBSP)}` : ''
  // One string, so the title is one text node (and one block for the copy diff).
  const title = `${next.title.name}${qualifier}`
  return (
    <nav aria-label="Next case study" className="border-t border-rule pt-3 md:pt-4">
      <Link href={next.path} className="group inline-block min-h-11 pt-2 text-body text-ink no-underline">
        <span className="text-muted">Next:</span>{' '}
        <span className="font-semibold underline decoration-link decoration-2 underline-offset-5 group-hover:decoration-link-hover">
          {title}
        </span>
      </Link>
    </nav>
  )
}
