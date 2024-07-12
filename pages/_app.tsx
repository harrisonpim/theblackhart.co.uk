import '../styles/app.css'

import { CartProvider } from'use-shopping-cart'
import Head from 'next/head'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
  })
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/icons/favicon/32.ico" type="image/png" />
        <link rel="icon" href="/icons/favicon/tbh.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href="/icons/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <PostHogProvider client={posthog}>
        <CartProvider
          cartMode="checkout-session"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          currency="GBP"
          shouldPersist={true}
        >
          <Component {...pageProps} />
        </CartProvider>
      </PostHogProvider>
    </>
  )
}
