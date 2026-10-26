import Link from 'next/link'
import { ArrowIcon } from '@/components/links/ArrowIcon'

/** "← All work", the first child of main on case studies. self-start keeps it content-width. */
export function BackLink() {
  return (
    <Link
      href="/#work"
      className="inline-flex min-h-11 items-center self-start text-ui text-link underline decoration-1 underline-offset-4 hover:text-link-hover"
    >
      <span>
        <ArrowIcon direction="left" />
        All work
      </span>
    </Link>
  )
}
