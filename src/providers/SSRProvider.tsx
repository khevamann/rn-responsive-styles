import * as React from 'react'
import { ReactNode, useEffect, useState } from 'react'
import { Platform } from 'react-native'

type Props = {
  children: ReactNode
  /* A placeholder to show while the content is being rendered on the server */
  placeholder?: ReactNode
}

// Will return true on the client and false otherwise
const useIsClient = () => {
  // Will set ready to false on web and true on mobile as mobile does not have SSR
  const [isClient, setIsClient] = useState(Platform.OS !== 'web')

  // Use effect will only run on the client, so we can use that to signal we have reached the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export function SSRProvider({ placeholder = null, children }: Props) {
  const isClient = useIsClient()

  if (!isClient) return <>{placeholder}</>

  return <>{children}</>
}
