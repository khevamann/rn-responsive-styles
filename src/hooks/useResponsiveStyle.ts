import { StyleProp, StyleSheet } from 'react-native'
import useDeviceSize from './useDeviceSize'
import { DEVICE_SIZES } from '../types'

// Will match any string that contains the sizes (in any order) followed by the class name
export const matchOverrides = (defaultClass: string, size: string) => {
  // Sanitize the defaultClass by escaping special regex characters
  const sanitizedClass = defaultClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // See regexPatternMatching.test.ts for examples on what should match and not
  return new RegExp(`^\\$\\$(.*\\+)?${size}(\\+.*)?\\$\\$_${sanitizedClass}$`)
}

// Will recursively combine all the styles as StyleSheet.compose only takes two arguments
const composeMultipleStyles = <Styles>(
  styles: StyleSheet.NamedStyles<any>,
  classNames: (keyof Styles)[]
): StyleProp<any> => {
  // Base cases to return the style if there are not two for a composition
  if (classNames.length === 1) return styles[classNames[0]]

  return classNames.map((className) => styles[className])
}

const buildCustomStyleMap = (styles: StyleSheet.NamedStyles<any>, size: DEVICE_SIZES) => {
  const styleObj: StyleProp<any> = {}

  // Will get a list of the base styles excluding all overrides
  const defaultKeys = Object.keys(styles).filter((style) => !style.startsWith('$$'))

  defaultKeys.forEach((key) => {
    // Get all overrides for a certain class
    const styleOverrides = Object.keys(styles).filter((style) => style.match(matchOverrides(key, size)))

    // Combine the base style and any overrides to get the computed style
    styleObj[key] = composeMultipleStyles(styles, [key, ...styleOverrides])
  })

  return styleObj
}

export default function useResponsiveStyle<Styles extends StyleSheet.NamedStyles<Styles>>(styles: Styles) {
  return () => {
    const size = useDeviceSize()

    return buildCustomStyleMap(styles, size)
  }
}
