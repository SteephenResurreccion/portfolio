// One-off: generates the smaller NoelAgriTV variants from the approved originals.
// The originals in assets/noelagritv/ are byte-identical copies of the vetted files; never re-encode them.
// sharp writes no metadata by default. Quality 85 keeps the screenshot text crisp (checked by eye).
// Usage: node scripts/make-image-variants.mjs
import sharp from 'sharp'

const QUALITY = 85
const jobs = [
  { from: 'assets/noelagritv/storefront-1280.webp', to: 'assets/noelagritv/storefront-640.webp', width: 640 },
  { from: 'assets/noelagritv/checkout-652.webp', to: 'assets/noelagritv/checkout-326.webp', width: 326 },
  { from: 'assets/noelagritv/lookup-652.webp', to: 'assets/noelagritv/lookup-326.webp', width: 326 },
]

for (const job of jobs) {
  const info = await sharp(job.from).resize({ width: job.width }).webp({ quality: QUALITY }).toFile(job.to)
  console.log(`${job.to}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`)
}
