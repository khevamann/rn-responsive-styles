import Document, { Head, Html, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native";
import config from "../app.json";
import * as React from "react";
import { Children } from "react";
import { DocumentContext } from "next/dist/shared/lib/utils";
// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: DocumentContext) {
    AppRegistry.registerComponent(config.name, () => Main)
    //@ts-expect-error: getApplication is a react-native-web prop
    const { getStyleElement } = AppRegistry.getApplication(config.name)
    const page = await renderPage()
    const styles = [<style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />, getStyleElement()]
    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <title>rn-responsive-styles Nexpo Example</title>
        </Head>
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
