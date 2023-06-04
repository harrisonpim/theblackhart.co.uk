import '../styles/app.css'

import { Analytics } from '@vercel/analytics/react'
import { CartProvider } from 'use-shopping-cart'

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="GBP"
      shouldPersist={true}
    >
      <Component {...pageProps} />
      <Analytics />
    </CartProvider>
  )
}
