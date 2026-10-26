// Plex Sans 400's own U+2197 and U+2190 outlines (IBM Plex is OFL), read once from
// IBMPlexSans-Regular with fontTools and hard-coded here. Google's latin subset lacks both
// glyphs, so drawing them keeps the arrow identical on every OS (spec §1.5 A).
// Box: the glyph's 820-unit advance by the 1300-unit content box (ascender 1025, descender −275),
// y flipped from the ascender, so the SVG occupies exactly the glyph's advance and content box.
const PATHS = {
  'up-right':
    'M650 704H582V582L588 517L585 516L521 588L172 937L124 889L473 540L545 476L544 473L479 479H357V411H650Z',
  left: 'M262 469 311 517 224 603 174 645 175 648 272 642H765V710H272L175 704L174 707L224 749L311 835L262 883L55 676Z',
} as const

type ArrowIconProps = { direction: 'up-right' | 'left' }

export function ArrowIcon({ direction }: ArrowIconProps) {
  // One Plex space (0.236em) sits where the canvas had a no-break space.
  const gap = direction === 'up-right' ? 'ml-[0.236em]' : 'mr-[0.236em]'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 820 1300"
      fill="currentColor"
      className={`inline-block h-[1.3em] w-[0.82em] align-[-0.275em] ${gap}`}
    >
      <path d={PATHS[direction]} />
    </svg>
  )
}
