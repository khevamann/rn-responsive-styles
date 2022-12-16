import { Text, View } from 'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES, maxSize } from 'rn-responsive-styles'

export default function App() {
  const styles = useStyles()
  console.log(styles.link)
  return (
    <View>
      <Text
        style={styles.link}
        accessibilityRole="link"
        //@ts-ignore
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
      color: 'blue',
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
