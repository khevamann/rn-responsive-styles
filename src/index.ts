import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import useResponsiveStyle from './useResponsiveStyle';
import { DEVICE_SIZES } from './types';

function CreateResponsiveStyle<GlobalStyles, OverrideStyles extends GlobalStyles>(
  webStyles: StyleSheet.NamedStyles<GlobalStyles>,
  styleOverrides: Partial<Record<DEVICE_SIZES, StyleSheet.NamedStyles<Partial<OverrideStyles>>>>,
) {
  const overrides: StyleSheet.NamedStyles<any> = {};
  const provided_sizes = {};

  // Create custom style names based on the device overrides
  Object.entries(styleOverrides).forEach(([key, value]) => {
    Object.entries(value).forEach(([className, value2]) => {
      provided_sizes[key] = true;
      overrides[`${key}_${className}`] = value2 as ViewStyle | TextStyle | ImageStyle;
    });
  });

  const styles = StyleSheet.create<StyleSheet.NamedStyles<GlobalStyles>>({ ...webStyles, ...overrides });
    
  return useResponsiveStyle<GlobalStyles>(styles, provided_sizes);
}

export { CreateResponsiveStyle, useResponsiveStyle, DEVICE_SIZES };
