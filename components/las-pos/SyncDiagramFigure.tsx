import type { SyncDiagramCopy } from '@/content/projects/las-pos'
import { SyncDiagramDrawing } from './SyncDiagramDrawing'
import { DESKTOP, PHONE } from './sync-diagram-geometry'

/**
 * Two drawings, one per side of md (approved deviation, Q14): one viewBox can't serve both widths without
 * shrinking the labels to about 6px. Screen readers get the text alternative once and the caption once.
 */
export function SyncDiagramFigure({ diagram }: { diagram: SyncDiagramCopy }) {
  return (
    <figure className="flex flex-col gap-2.5 md:gap-3">
      <SyncDiagramDrawing geometry={DESKTOP} copy={diagram} className="hidden md:block" />
      <SyncDiagramDrawing geometry={PHONE} copy={diagram} className="max-w-82 md:hidden" />
      <p className="sr-only">{diagram.textAlternative}</p>
      <figcaption className="text-small text-muted text-pretty">{diagram.caption}</figcaption>
    </figure>
  )
}
