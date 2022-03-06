import { StyleProp, StyleSheet } from 'react-native'
import { deviceSize } from './helpers'
import useWindowSizes from './useWindowSizes'
import { DEVICE_SIZES } from './types'

// Will recursively combine all the styles as StyleSheet.compose only takes two arguments
const composeMultipleStyles = <Styles>(
  styles: StyleSheet.NamedStyles<any>,
  classNames: (keyof Styles)[],
): StyleProp<any> => {
  // Base cases to return the style if there are not two for a composition
  if (classNames.length === 1) return styles[classNames[0]]

  // Recursively combine the rest of the styles
  const nextIteration = composeMultipleStyles(styles, classNames.slice(1))
  return StyleSheet.compose(styles[classNames[0]], nextIteration)
}

const getCustomStyles = <Styles>(styles: StyleSheet.NamedStyles<any>, size: DEVICE_SIZES, className: keyof Styles) => {
  // Will match any string that contains the size (in any order) followed by the style name
  const regex = new RegExp(`(^|\\+)${size}[a-zA-Z0-9+-]*_${className}`)

  // Will get a list of all style keys that are matching either with a sie prefix or the base class
  const styleKeys = Object.keys(styles).filter((style) => style.match(regex) || style === className)

  if (styleKeys.length === 0) return null

  // Will merge the styles given the key constraints defined above
  return composeMultipleStyles(styles, styleKeys)
}

export default function useResponsiveStyle<Styles>(styles: StyleSheet.NamedStyles<any>) {
  return () => {
    const layout = useWindowSizes(deviceSize)
    const size = deviceSize(layout.width)

    return {
      styles: (style: keyof Styles) => getCustomStyles<Styles>(styles, size, style),
      deviceSize: size,
    }
  }
}
