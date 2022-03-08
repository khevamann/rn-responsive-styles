import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'
import { DEVICE_SIZES } from './types'

/**
 * Hook to watch changes in screenSize and report the dimensions whenever the device size changes
 * @param breakpoints a function that returns the device size given a width
 */
export default function useWindowSizes(breakpoints: (width: number) => DEVICE_SIZES) {
  const [dims, setDims] = useState(() => Dimensions.get('window'))

  useEffect(() => {
    function handleChange({ window }: { window: ScaledSize }) {
      // Only update the dimensions when the device size changes
      setDims((prev) => (breakpoints(prev.width) === breakpoints(window.width) ? prev : window))
    }

    const listener = Dimensions.addEventListener('change', handleChange)
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    setDims(Dimensions.get('window'))
    return listener && listener.remove
  }, [])

  return dims
}
