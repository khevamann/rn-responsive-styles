import { StyleSheet, useWindowDimensions } from 'react-native';
import { deviceSize } from './helpers';

export default function useResponsiveStyle<T>(styles: StyleSheet.NamedStyles<any>) {
  return () => {
    const layout = useWindowDimensions();

    return {
      styles: (style: keyof T) => StyleSheet.compose(styles[style], styles[`${deviceSize(layout.width)}_${style}`]),
      deviceSize: deviceSize(layout.width),
      layout,
    };
  };
}
