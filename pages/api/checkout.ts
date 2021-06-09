import { NextApiRequest, NextApiResponse } from 'next'

import { RichText } from 'prismic-reactjs'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const inventory = require(`./products.json`)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const products = Object.values(req.body)
      const validatedProducts = products.map(({ quantity, name, sku }) => {
        return {
          quantity,
          name,
          ...inventory.find((p) => p.uid === sku),
        }
      })
      const lineItems = validatedProducts.map((product) => {
        return {
          price_data: {
            unit_amount: product.data.price,
            currency: 'gbp',
            product_data: {
              name: product.name, // for now, we take the unvalidated product name to allow for size variations
              description: RichText.asText(product.data.description),
              images: [product.data.body[0].items[0].image.url],
            },
          },
          quantity: product.quantity,
        }
      })

      const needsShipping = validatedProducts.some((product) =>
        ['silver', 'ring', 'necklace'].includes(product.data.type)
      )

      if (needsShipping === true) {
        lineItems.push({
          price_data: {
            unit_amount: 670,
            currency: 'gbp',
            product_data: {
              name: 'Shipping cost',
              description:
                'For orders within the UK, items are shipped by Royal Mail Special Delivery Guaranteed by 1pm',
              images: [],
            },
          },
          quantity: 1,
        })
      }

      const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        {
          mode: 'payment',
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: [
              'AU',
              'AT',
              'BE',
              'BG',
              'BR',
              'CA',
              'CY',
              'CZ',
              'DK',
              'EE',
              'FI',
              'FR',
              'DE',
              'GR',
              'HK',
              'HU',
              'IN',
              'IE',
              'IT',
              'JP',
              'LV',
              'LT',
              'LU',
              'MY',
              'MT',
              'MX',
              'NL',
              'NZ',
              'NO',
              'PL',
              'PT',
              'RO',
              'SG',
              'SK',
              'SI',
              'ES',
              'SE',
              'CH',
              'GB',
              'US',
            ],
          },
          allow_promotion_codes: true,
          billing_address_collection: 'auto',
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/shop/basket`,
          line_items: lineItems,
        }
      )

      res.status(200).json({ sessionId: session.id })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
