import { StyleSheet } from 'react-native'
import { deviceSize } from './helpers'
import useWindowSizes from './useWindowSizes'

export default function useResponsiveStyle<T>(styles: StyleSheet.NamedStyles<any>, provided_sizes) {
  return () => {
    const layout = useWindowSizes(deviceSize, provided_sizes)
    const size = deviceSize(layout.width, provided_sizes);    
    
    return {
      styles: (style: keyof T) => StyleSheet.compose(styles[style], styles[`${size}_${style}`]),
      deviceSize: size,
    }
  }
}
