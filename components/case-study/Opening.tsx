import { RichText } from '@/components/text/RichText'
import type { Rich } from '@/content/types'

/** The unheaded opening paragraphs. */
export function Opening({ paragraphs }: { paragraphs: readonly Rich[] }) {
  return (
    <div className="flex flex-col gap-3.5 md:gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-pretty">
          <RichText value={paragraph} />
        </p>
      ))}
    </div>
  )
}
