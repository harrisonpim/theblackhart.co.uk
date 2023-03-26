import '../styles/app.css'

import { CartProvider } from 'use-shopping-cart'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="GBP"
      shouldPersist={true}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* local schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": "The Black Hart",
            "image": "https://images.prismic.io/theblackhart/44cd81bf-c071-4c6f-84aa-e29299741872_616f657c-82b5-4bc9-ae55-c44dc45a72ba_tbh.jpg?auto=compress,format",
            "url": "https://theblackhart.co.uk",
            "priceRange": "££",
            "sameAs": [
              "https://www.instagram.com/tbh_jewellery/",
              "https://www.tiktok.com/@tbh_jewellery",
              "https://www.youtube.com/channel/UCfUqXisYyNzQcRDPxP_SizQ"
            ],
            "image": [
              "https://images.prismic.io/theblackhart/d503a6cb-67d2-436d-8ab0-a93fd7e23c61_IMG_7694.JPG?auto=compress,format"
            ],
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom"
            }
          }`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  )
}
