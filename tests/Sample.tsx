import * as React from 'react'
import { Text, View } from 'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES, maxSize, minSize } from '../src'

const DEVICE_COLOR: Record<DEVICE_SIZES, string> = {
  [DEVICE_SIZES.EXTRA_LARGE_DEVICE]: 'orange',
  [DEVICE_SIZES.LARGE_DEVICE]: 'blue',
  [DEVICE_SIZES.MEDIUM_DEVICE]: 'green',
  [DEVICE_SIZES.SMALL_DEVICE]: 'red',
  [DEVICE_SIZES.EXTRA_SMALL_DEVICE]: 'purple',
}

export default function Sample() {
  const { styles, deviceSize } = useResponsiveStyle()

  return (
    <View style={styles('container')}>
      <Text style={styles('text')}>Device Size: {deviceSize}</Text>
      <Text style={styles('text')}>Color: {DEVICE_COLOR[deviceSize]}</Text>
    </View>
  )
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
    },
    [DEVICE_SIZES.SMALL_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.SMALL_DEVICE],
      },
    },
    [DEVICE_SIZES.EXTRA_SMALL_DEVICE]: {
      container: {
        backgroundColor: DEVICE_COLOR[DEVICE_SIZES.EXTRA_SMALL_DEVICE],
      },
    },
    // Will apply the size 30 font to large and extra large devices
    [minSize(DEVICE_SIZES.LARGE_DEVICE)]: {
      text: {
        fontSize: 30,
      },
    },
    // Will apply the size 20 to medium, small and extra small devices
    [maxSize(DEVICE_SIZES.MEDIUM_DEVICE)]: {
      text: {
        fontSize: 20,
      },
    },
  },
)
