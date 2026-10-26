// Every number is copied from design-system-v20 §4.13 (canvas version 20, seq_diagram.py layout).
// Text y values are line-box centres; rects are inset 0.5px so the 1px stroke is crisp.

type Point = readonly [number, number]
type Rect = { x: number; y: number; width: number; height: number }
type Note = { rect: Rect; x: number; anchor: 'start' | 'end'; lineY: readonly [number, number] }
type Message = { label: Point; from: Point; to: Point; head: string }

export type SyncDiagramGeometry = {
  viewBox: { width: number; height: number }
  lifelines: { x: readonly [number, number]; top: number }
  laneLabel: { y: number; size: number }
  noteTextSize: number
  notes: readonly [Note, Note, Note]
  message1: Message
  lostReply: { label: Point; path: string; cross: Point }
  message3: Message
}

export const DESKTOP: SyncDiagramGeometry = {
  viewBox: { width: 640, height: 424 },
  lifelines: { x: [112, 528], top: 28 },
  laneLabel: { y: 12, size: 15 },
  noteTextSize: 14,
  notes: [
    { rect: { x: 0.5, y: 40.5, width: 231, height: 55 }, x: 13, anchor: 'start', lineY: [58, 78] },
    { rect: { x: 408.5, y: 172.5, width: 231, height: 55 }, x: 627, anchor: 'end', lineY: [190, 210] },
    { rect: { x: 408.5, y: 360.5, width: 231, height: 55 }, x: 627, anchor: 'end', lineY: [378, 398] },
  ],
  message1: { label: [320, 124], from: [112, 144], to: [526, 144], head: '519.6,140 527.6,144 519.6,148' },
  lostReply: { label: [320, 256], path: 'M320 276 H528', cross: [320, 276] },
  message3: { label: [320, 312], from: [112, 332], to: [526, 332], head: '519.6,328 527.6,332 519.6,336' },
}

export const PHONE: SyncDiagramGeometry = {
  viewBox: { width: 328, height: 412 },
  lifelines: { x: [40, 288], top: 28 },
  laneLabel: { y: 12, size: 14 },
  noteTextSize: 13,
  notes: [
    { rect: { x: 0.5, y: 40.5, width: 195, height: 51 }, x: 13, anchor: 'start', lineY: [57, 75] },
    { rect: { x: 132.5, y: 168.5, width: 195, height: 51 }, x: 315, anchor: 'end', lineY: [185, 203] },
    { rect: { x: 132.5, y: 352.5, width: 195, height: 51 }, x: 315, anchor: 'end', lineY: [369, 387] },
  ],
  message1: { label: [164, 120], from: [40, 140], to: [286, 140], head: '279.6,136 287.6,140 279.6,144' },
  lostReply: { label: [164, 248], path: 'M164 268 H288', cross: [164, 268] },
  message3: { label: [164, 304], from: [40, 324], to: [286, 324], head: '279.6,320 287.6,324 279.6,328' },
}
