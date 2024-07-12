import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
import { allowed_countries } from 'components/product'
import inventory from './inventory.json'
import { validateCartItems } from 'use-shopping-cart/utilities'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      let line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
      try {
        line_items = validateCartItems(inventory, req.body)
      } catch (err) {
        console.error(err)
        res.status(400).json({ statusCode: 400, message: err.message })
        return
      }
      
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: allowed_countries,
          },
          allow_promotion_codes: true,
          billing_address_collection: 'auto',
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/shop/basket`,
          line_items,
        })
      res.status(200).json({ sessionId: session.id })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
