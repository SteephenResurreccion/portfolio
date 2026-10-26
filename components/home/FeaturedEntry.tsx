import { RichText } from '@/components/text/RichText'
import type { FeaturedEntry as FeaturedEntryContent } from '@/content/types'
import { EntryTitle } from './EntryTitle'
import { EntryTitleRow } from './EntryTitleRow'

// Links inside the paragraphs sit above the stretched title link's overlay.
const RAISE_LINKS = '[&_a]:relative [&_a]:z-1'

export function FeaturedEntry({ entry }: { entry: FeaturedEntryContent }) {
  return (
    <article className="relative flex flex-col gap-2">
      <EntryTitleRow
        heading={
          <h2 className="text-featured-title font-semibold">
            <EntryTitle title={entry.title} path={entry.path} size="featured" />
          </h2>
        }
        dates={entry.dates}
      />
      <p className={`text-status font-semibold ${RAISE_LINKS}`}>
        <RichText value={entry.status} />
      </p>
      <p className={`text-body text-pretty ${RAISE_LINKS}`}>
        <RichText value={entry.body} />
      </p>
      <p className="font-mono text-stack text-muted">{entry.stack.join(' · ')}</p>
    </article>
  )
}
