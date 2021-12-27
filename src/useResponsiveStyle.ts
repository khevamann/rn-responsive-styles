import { StyleSheet } from 'react-native'
import { deviceSize } from './helpers'
import useWindowSizes from './useWindowSizes'

export default function useResponsiveStyle<T>(styles: StyleSheet.NamedStyles<any>) {
  return () => {
    const layout = useWindowSizes(deviceSize)
    const size = deviceSize(layout.width)

    return {
      styles: (style: keyof T) => StyleSheet.compose(styles[style], styles[`${size}_${style}`]),
      deviceSize: size,
    }
  }
}
