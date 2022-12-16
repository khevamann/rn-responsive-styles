import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/dist/pages/_app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>rn-responsive-styles Nexpo Example</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
