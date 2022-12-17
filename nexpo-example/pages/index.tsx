import { ActivityIndicator } from 'react-native'
import Home from './home'
import { SSRProvider } from 'rn-responsive-styles'

export default function App() {
  return (
    <SSRProvider placeholder={<ActivityIndicator />}>
      <Home />
    </SSRProvider>
  )
}
