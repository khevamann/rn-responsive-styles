import { DEVICE_SIZES } from './types';

export function deviceSize(width: number) {
  if (width > 1200) return DEVICE_SIZES.EXTRA_LARGE_DEVICE;
  if (width > 992) return DEVICE_SIZES.LARGE_DEVICE;
  if (width > 768) return DEVICE_SIZES.MEDIUM_DEVICE;
  if (width > 540) return DEVICE_SIZES.SMALL_DEVICE;
  return DEVICE_SIZES.EXTRA_SMALL_DEVICE;
}
