import { useCallback, useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";
import { deviceSize } from "../helpers";
import { useBreakpoints } from "../provider";

/**
 * Hook to watch changes in screenSize and report the device size whenever it changes
 */
export default function useDeviceSize() {
  const breakpoints = useBreakpoints()
  const [dims, setDims] = useState(() => Dimensions.get('window'))
  const size = useCallback(deviceSize(breakpoints), [breakpoints])

  useEffect(() => {
    function handleChange({ window }: { window: ScaledSize }) {
      // Only update the dimensions when the device size changes
      setDims((prev) => (size(prev.width) === size(window.width) ? prev : window))
    }

    const listener = Dimensions.addEventListener('change', handleChange)
    // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.
    setDims(Dimensions.get('window'))
    return () => {
      if (listener) listener.remove()
    }
  }, [size])

  return size(dims.width)
}
