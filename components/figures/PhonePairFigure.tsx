import type { ImageAsset } from '@/content/types'
import { Figure } from './Figure'
import { ResponsiveImage } from './ResponsiveImage'

type Shot = { image: ImageAsset; caption: string }
const SIZES = '(min-width: 768px) 302px, 326px'
// Each figure is capped at 328px on phones; from md both sit in a subgrid so the captions share a row.
const FIGURE_CLASSES = 'max-w-82 md:row-span-2 md:grid md:max-w-none md:grid-rows-subgrid'

export function PhonePairFigure({ checkout, lookup }: { checkout: Shot; lookup: Shot }) {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-3">
      <Figure caption={checkout.caption} className={FIGURE_CLASSES}>
        <ResponsiveImage image={checkout.image} sizes={SIZES} className="self-start" />
      </Figure>
      <Figure caption={lookup.caption} className={FIGURE_CLASSES}>
        <ResponsiveImage image={lookup.image} sizes={SIZES} className="self-start" />
      </Figure>
    </div>
  )
}
