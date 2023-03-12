import { NextApiRequest, NextApiResponse } from 'next'

import { CartEntry } from 'use-shopping-cart'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const lineItems = Object.values(req.body).map((product: CartEntry) => {
        return {
          price_data: {
            unit_amount: product.price,
            currency: 'gbp',
            product_data: {
              name: product.name,
              description: product.description,
              images: product.image ? [product.image] : [],
            },
          },
          quantity: product.quantity,
        }
      })

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
