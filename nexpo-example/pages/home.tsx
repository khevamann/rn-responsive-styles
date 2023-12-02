import { Text, View } from 'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES, maxSize } from 'rn-responsive-styles'

export default function Home() {
  const styles = useStyles()

  return (
    <View>
      <Text
        style={styles.link}
        // @ts-expect-error: href does not exist on Text attribute
        href={`/alternate`}
      >
        A universal link
      </Text>
    </View>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    link: {
      color: 'green',
    },
  },
  {
    [maxSize(DEVICE_SIZES.SM)]: {
      link: {
        color: 'red',
      },
    },
  }
)
