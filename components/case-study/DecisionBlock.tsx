import { RichText } from '@/components/text/RichText'
import type { Decision } from '@/content/types'

export function DecisionBlock({ decision }: { decision: Decision }) {
  return (
    <div className="flex flex-col gap-2 md:gap-2.5">
      <h3 className="text-block-title font-semibold">{decision.heading}</h3>
      {decision.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body text-pretty">
          <RichText value={paragraph} />
        </p>
      ))}
    </div>
  )
}
