import type { SyncDiagramCopy } from '@/content/projects/las-pos'
import type { SyncDiagramGeometry } from './sync-diagram-geometry'

const LABEL_SIZE = 13
const CROSS_SIZE = 18

type SyncDiagramDrawingProps = { geometry: SyncDiagramGeometry; copy: SyncDiagramCopy; className: string }

/**
 * One drawing of the two-lane sequence diagram. Colours come through currentColor (forced-colors safe);
 * arrowheads are polygons, so the drawing carries no ids. Text is emitted in the canvas's DOM order
 * (notes, message 1, ×, message 2, message 3, lanes) so the copy diff lines up.
 */
export function SyncDiagramDrawing({ geometry: g, copy, className }: SyncDiagramDrawingProps) {
  const { width, height } = g.viewBox
  const [tabletX, serverX] = g.lifelines.x
  const noteLines = [copy.note1, copy.note2, copy.note3] as const
  const messageLabel = (point: readonly [number, number], text: string, muted = false) => (
    <text
      x={point[0]}
      y={point[1]}
      fontSize={LABEL_SIZE}
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      className={muted ? 'text-muted' : 'text-ink'}
    >
      {text}
    </text>
  )
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${width} ${height}`} className={`h-auto w-full font-sans ${className}`}>
      <g className="text-muted" stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" strokeLinecap="butt">
        <line x1={tabletX} y1={g.lifelines.top} x2={tabletX} y2={height} />
        <line x1={serverX} y1={g.lifelines.top} x2={serverX} y2={height} />
      </g>
      <g className="text-ink" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1={g.message1.from[0]} y1={g.message1.from[1]} x2={g.message1.to[0]} y2={g.message1.to[1]} />
        <line x1={g.message3.from[0]} y1={g.message3.from[1]} x2={g.message3.to[0]} y2={g.message3.to[1]} />
      </g>
      <g className="text-ink" fill="currentColor" stroke="none">
        <polygon points={g.message1.head} />
        <polygon points={g.message3.head} />
      </g>
      <path
        d={g.lostReply.path}
        className="text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {g.notes.map((note, index) => (
        <rect key={index} className="sync-note" strokeWidth={1} {...note.rect} />
      ))}
      {g.notes.map((note, index) =>
        noteLines[index]!.map((line, lineIndex) => (
          <text
            key={`${index}-${lineIndex}`}
            x={note.x}
            y={note.lineY[lineIndex]}
            fontSize={g.noteTextSize}
            textAnchor={note.anchor}
            dominantBaseline="central"
            fill="currentColor"
            className="text-ink"
          >
            {line}
          </text>
        )),
      )}
      {messageLabel(g.message1.label, copy.message1)}
      <text
        x={g.lostReply.cross[0]}
        y={g.lostReply.cross[1]}
        fontSize={CROSS_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        className="text-muted"
      >
        ×
      </text>
      {messageLabel(g.lostReply.label, copy.message2, true)}
      {messageLabel(g.message3.label, copy.message3)}
      {copy.lanes.map((lane, index) => (
        <text
          key={lane}
          x={g.lifelines.x[index]}
          y={g.laneLabel.y}
          fontSize={g.laneLabel.size}
          fontWeight={600}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          className="text-ink"
        >
          {lane}
        </text>
      ))}
    </svg>
  )
}
