import * as React from 'react'
import { Text, View } from 'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES, maxSize, minSize, useDeviceSize } from 'rn-responsive-styles'

const DEVICE_COLOR: Record<DEVICE_SIZES, string> = {
  [DEVICE_SIZES.XL]: 'orange',
  [DEVICE_SIZES.LG]: 'blue',
  [DEVICE_SIZES.MD]: 'green',
  [DEVICE_SIZES.SM]: 'red',
  [DEVICE_SIZES.XS]: 'purple',
}

export default function App() {
  const styles = useStyles()
  const deviceSize = useDeviceSize()
  console.log('RERENBDER')
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Device Size: {deviceSize}</Text>
      <Text style={styles.text}>Color: {DEVICE_COLOR[deviceSize]}</Text>
    </View>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      alignItems: 'center',
      color: 'white',
    },
  },
  {
    [DEVICE_SIZES.XL]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.XL],
      },
      text: {
        color: 'black',
      },
    },
    [DEVICE_SIZES.LG]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.LG],
      },
    },
    [DEVICE_SIZES.MD]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.MD],
      },
    },
    [DEVICE_SIZES.SM]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.SM],
      },
    },
    [DEVICE_SIZES.XS]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.XS],
      },
    },
    // Will apply the size 30 font to large and extra large devices
    [minSize(DEVICE_SIZES.LG)]: {
      text: {
        fontSize: 30,
      },
    },
    // Will apply the size 20 to medium, small and extra-small devices
    [maxSize(DEVICE_SIZES.MD)]: {
      text: {
        fontSize: 20,
      },
    },
  },
)
