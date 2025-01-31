import useDeviceSize from './useDeviceSize'
import { DEVICE_SIZES } from '../types'
import { sizeOrder } from '../helpers'
import { useCallback, useMemo } from 'react'

/**
 * useSizeRender will return two helpers that can be used to conditionally render based on the size of the device
 */
export default function useSizeRender() {
  const currSize = useDeviceSize()
  const currSizeIndex = sizeOrder.indexOf(currSize)

  const isSmallerThan = useCallback(
    (size: DEVICE_SIZES) => {
      const sizeIndex = sizeOrder.indexOf(size)
      return currSizeIndex < sizeIndex
    },
    [currSizeIndex]
  )
  const isLargerThan = useCallback(
    (size: DEVICE_SIZES) => {
      const sizeIndex = sizeOrder.indexOf(size)
      return currSizeIndex > sizeIndex
    },
    [currSizeIndex]
  )
  const isSize = useCallback(
    (size: DEVICE_SIZES) => {
      const sizeIndex = sizeOrder.indexOf(size)
      return currSizeIndex === sizeIndex
    },
    [currSizeIndex]
  )

  return useMemo(() => ({ isSmallerThan, isLargerThan, isSize }), [isSmallerThan, isLargerThan, isSize])
}
