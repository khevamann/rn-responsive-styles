import { StyleProp, StyleSheet } from 'react-native'
import useDeviceSize from './useDeviceSize'
import { DEVICE_SIZES } from '../types'

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

const buildCustomStyleMap = <Styles>(styles: StyleSheet.NamedStyles<any>, size: DEVICE_SIZES) => {
  const styleObj: StyleProp<any> = {}

  // Will match any string that contains the sizes (in any order) followed by the class name
  const matchOverrides = (defaultClass: string) =>
    new RegExp(`(^\\$\\$|.*\\+)${size}[a-zA-Z0-9+-]*\\$\\$_${defaultClass}$`)

  // Will get a list the base styles excluding all overrides
  const defaultKeys = Object.keys(styles).filter((style) => !style.startsWith('$$'))

  defaultKeys.forEach((key) => {
    // Get all overrides for a certain class
    const styleOverrides = Object.keys(styles).filter((style) => style.match(matchOverrides(key)))

    // Combine the base style and any overrides to get the computed style
    styleObj[key] = composeMultipleStyles(styles, [key, ...styleOverrides])
  })

  return styleObj
}

export default function useResponsiveStyle<Styles>(styles: StyleSheet.NamedStyles<any>) {
  return () => {
    const size = useDeviceSize()

    return buildCustomStyleMap(styles, size)
  }
}
