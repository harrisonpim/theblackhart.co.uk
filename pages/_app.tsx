import '../styles/app.css'

import { CartProvider } from 'use-shopping-cart'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider
      // mode="payment"
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="GBP"
      shouldPersist={true}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  )
}
