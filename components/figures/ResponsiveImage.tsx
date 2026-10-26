import type { ImageAsset } from '@/content/types'

type ResponsiveImageProps = { image: ImageAsset; sizes: string; priority?: boolean; className?: string }

/**
 * A plain <img srcset> over pre-sized WebP variants (spec §1.3 A): the screenshots are never re-encoded,
 * so small UI text stays crisp and the shipped bytes are the vetted ones.
 */
export function ResponsiveImage({ image, sizes, priority = false, className = '' }: ResponsiveImageProps) {
  const largest = image.variants[image.variants.length - 1]
  if (!largest) throw new Error(`Image has no variants: ${image.alt}`)
  const srcSet = image.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized variants; next/image would re-encode the screenshots
    <img
      src={largest.src}
      srcSet={srcSet}
      sizes={sizes}
      width={largest.width}
      height={largest.height}
      alt={image.alt}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`block h-auto w-full border border-rule ${className}`}
    />
  )
}
