import { RichText } from '@/components/text/RichText'
import type { CompactEntry as CompactEntryContent } from '@/content/types'
import { EntryTitle } from './EntryTitle'
import { EntryTitleRow } from './EntryTitleRow'

export function CompactEntry({ entry }: { entry: CompactEntryContent }) {
  return (
    <article className={`flex flex-col gap-1 ${entry.path ? 'relative' : ''}`}>
      <EntryTitleRow
        heading={
          <h3 className="text-compact-title font-semibold">
            <EntryTitle title={entry.title} path={entry.path} size="compact" />
          </h3>
        }
        dates={entry.dates}
      />
      <p className="text-compact-body text-pretty [&_a]:relative [&_a]:z-1">
        <RichText value={entry.body} />
      </p>
    </article>
  )
}
