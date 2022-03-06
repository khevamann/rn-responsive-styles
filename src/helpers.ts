import { DEVICE_SIZES } from './types'

// Used to determine what sizes should be included in media queries
const sizeOrder = [
  DEVICE_SIZES.EXTRA_SMALL_DEVICE,
  DEVICE_SIZES.SMALL_DEVICE,
  DEVICE_SIZES.MEDIUM_DEVICE,
  DEVICE_SIZES.LARGE_DEVICE,
  DEVICE_SIZES.EXTRA_LARGE_DEVICE,
]

// Default breakpoint sizes
export function deviceSize(width: number) {
  if (width > 1200) return DEVICE_SIZES.EXTRA_LARGE_DEVICE
  if (width > 992) return DEVICE_SIZES.LARGE_DEVICE
  if (width > 768) return DEVICE_SIZES.MEDIUM_DEVICE
  if (width > 540) return DEVICE_SIZES.SMALL_DEVICE
  return DEVICE_SIZES.EXTRA_SMALL_DEVICE
}

// Will include styling for all sizes equal to or larger than the size
export function minSize(size: DEVICE_SIZES) {
  const sizeIndex = sizeOrder.indexOf(size)
  const sizeArr = sizeOrder.slice(sizeIndex)
  return sizeArr.join('+')
}

// Will include styling for all sizes equal to or smaller than the size
export function maxSize(size: DEVICE_SIZES) {
  const sizeIndex = sizeOrder.indexOf(size)
  const sizeArr = sizeOrder.slice(0, sizeIndex + 1)
  return sizeArr.join('+')
}
