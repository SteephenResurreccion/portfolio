import type { Route } from 'next'
import Link from 'next/link'

type TextLinkProps = { href: Route; children: string }

/** An internal in-text link (About's thesis link, the 404's two links). */
export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link href={href} className="text-link underline decoration-1 underline-offset-3 hover:text-link-hover">
      {children}
    </Link>
  )
}
