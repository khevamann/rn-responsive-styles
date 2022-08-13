import { DEVICE_SIZES, MEDIA_QUERY } from './types'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import useResponsiveStyle from './hooks/useResponsiveStyle'
import NamedStyles = StyleSheet.NamedStyles

type ReturnType<GlobalStyles> = () => GlobalStyles

function CreateResponsiveStyle<DefaultStyles extends NamedStyles<DefaultStyles>, OverrideStyles extends DefaultStyles>(
  webStyles: DefaultStyles,
  styleOverrides?: Record<DEVICE_SIZES | MEDIA_QUERY, Partial<NamedStyles<OverrideStyles>>>
): ReturnType<DefaultStyles> {
  const overrides: StyleSheet.NamedStyles<any> = {}

  // Create custom style names based on the device overrides if provided
  if (styleOverrides) {
    Object.entries(styleOverrides).forEach(([key, value]) => {
      Object.entries(value).forEach(([className, value2]) => {
        overrides[`$$${key}$$_${className}`] = value2 as ViewStyle | TextStyle | ImageStyle
      })
    })
  }

  // Merge the stylesheets example:
  // {
  //   container: {
  //     color: 'red'
  //   },
  //   large_container: {
  //     color: 'blue'
  //   },
  //   extrasmall+small_container: {
  //     color: 'green'
  //   },
  // }
  const styles = StyleSheet.create<StyleSheet.NamedStyles<DefaultStyles>>({ ...webStyles, ...overrides })

  return useResponsiveStyle<DefaultStyles>(styles)
}

export default CreateResponsiveStyle
