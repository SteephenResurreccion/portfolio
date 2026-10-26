type QualifierProps = { text: string; placement: 'page-title' | 'entry' }

/**
 * The muted "(…)" after a title. In a page h1 it is an inline-block with normal white-space, so it moves
 * to the next line whole and wraps inside itself only when it cannot fit the column (spec §5.4).
 */
export function Qualifier({ text, placement }: QualifierProps) {
  const layout = placement === 'page-title' ? 'inline-block' : 'whitespace-nowrap'
  return <span className={`${layout} font-normal text-muted`}>{text}</span>
}
