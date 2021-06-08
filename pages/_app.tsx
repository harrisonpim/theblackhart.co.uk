import '../styles/app.css'

import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import Head from 'next/head'
import getStripe from '../lib/stripe'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider mode="checkout-session" stripe={getStripe()} currency="GBP">
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </>
    </CartProvider>
  )
}
