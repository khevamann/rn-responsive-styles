import * as React from 'react'
import { CreateResponsiveStyle, DEVICE_SIZES } from '../src'
import { Text, View } from 'react-native'

export default function OverwriteStyle() {
  const styles = useStyles()

  return (
    <View>
      <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    text: {
      fontSize: 40,
    },
    textBold: {
      fontWeight: '700',
    },
  },
  {
    [DEVICE_SIZES.MEDIUM_DEVICE]: {
      textBold: {
        fontWeight: '700',
      },
    },
  },
)
