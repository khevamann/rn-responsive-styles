import { Text, View } from 'react-native';
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles';

const DEVICE_COLOR: Record<DEVICE_SIZES, string> = {
  extra_large: 'orange',
  large: 'blue',
  medium: 'green',
  small: 'red',
};

export default function App() {
  const { styles, deviceSize, layout } = useResponsiveStyle();

  return (
    <View style={styles('container')}>
      <Text style={styles('text')}>Device Size: {deviceSize}</Text>
      <Text style={styles('text')}>Color: {DEVICE_COLOR[deviceSize]}</Text>
      <Text style={styles('text')}>App is {layout.width}px wide</Text>
    </View>
  );
}

const useResponsiveStyle = CreateResponsiveStyle(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 30,
      color: 'white',
    },
  },
  {
    [DEVICE_SIZES.EXTRA_LARGE_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.EXTRA_LARGE_DEVICE],
      },
      text: {
        color: 'black',
      },
    },
    [DEVICE_SIZES.LARGE_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.LARGE_DEVICE],
      },
    },
    [DEVICE_SIZES.MEDIUM_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.MEDIUM_DEVICE],
      },
      text: {
        fontSize: 20,
      },
    },
    [DEVICE_SIZES.SMALL_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.SMALL_DEVICE],
      },
      text: {
        fontSize: 20,
      },
    },
  },
);
