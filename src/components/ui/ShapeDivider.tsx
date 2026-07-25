import clsx from 'clsx'

/**
 * Elementor shape-divider paths used on the live ozwell.ai (viewBox 0 0 1000 100).
 * - waves: the hero/app-CTA organic wave
 * - wavesInverse: the mirrored waves variant (testimonials band)
 * - curve: the smooth arc (showcase band)
 */
const SHAPE_PATHS = {
  waves:
    'M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z',
  wavesInverse:
    'M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3 c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3 c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z',
  curve: 'M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z',
} as const

interface ShapeDividerProps {
  shape: keyof typeof SHAPE_PATHS
  /** Which edge of the parent section the divider sits on. */
  position: 'top' | 'bottom'
  /** Rotate the shape 180° (Elementor's "flip") — matches the live per-section settings. */
  flipped?: boolean
  /** Tailwind height classes, e.g. "h-16 lg:h-40". */
  heightClass: string
  className?: string
}

/** White shape divider matching the live Elementor sections. Parent must be `relative overflow-hidden`. */
export default function ShapeDivider({
  shape,
  position,
  flipped = false,
  heightClass,
  className,
}: ShapeDividerProps) {
  return (
    <svg
      className={clsx(
        'absolute left-0 w-full text-white',
        position === 'top' ? 'top-0' : 'bottom-0',
        flipped && 'rotate-180',
        heightClass,
        className
      )}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path fill="currentColor" d={SHAPE_PATHS[shape]} />
    </svg>
  )
}
