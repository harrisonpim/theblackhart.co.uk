import { NextApiRequest, NextApiResponse } from 'next'

import { RichText } from 'prismic-reactjs'
import Stripe from 'stripe'
import { allowed_countries } from 'components/product'
import { queryRepeatableDocuments } from 'prismic'
import { validateCartItems } from 'use-shopping-cart/utilities'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const ringSizes = [
  'G',
  'G½',
  'H',
  'H½',
  'I',
  'I½',
  'J',
  'J½',
  'K',
  'K½',
  'L',
  'L½',
  'M',
  'M½',
  'N',
  'N½',
  'O',
  'O½',
  'P',
  'P½',
  'Q',
  'Q½',
  'R',
  'R½',
  'S',
  'S½',
  'T',
  'T½',
  'U',
  'U½',
]

const chainLengths = ['16"', '20"', '24"']

const topSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const products = await queryRepeatableDocuments(
        (doc) => doc.type === 'product'
      )

      // transform the data into the format used by use-shopping-cart and stripe
      const inventory = products
        .map((product) => {
          const isRing = product.data.sizing
            .map((size) => size.id)
            .includes('rings')
          const isNecklace = product.data.sizing
            .map((size) => size.id)
            .includes('necklaces')
          const isTop = product.data.sizing
            .map((size) => size.id)
            .includes('tops')

          const size = {
            ring: isRing ? ringSizes : null,
            necklace: isNecklace ? chainLengths : null,
            top: isTop ? topSizes : null,
          }
          const needsSize =
            Object.values(size).filter((s) => s !== null).length > 0

          if (needsSize) {
            const sizeArrays = Object.entries(size).filter((s) => s[1] !== null)
            const possibleSizes = sizeArrays
              .reduce(
                (acc, [key, value]) => {
                  return acc.flatMap((x) => value.map((y) => [...x, y]))
                },
                [[]]
              )
              .map((x) => x.join(' - '))

            const combinations = possibleSizes.map((sizeString) => ({
              id: `${product.uid}-${sizeString}`
                .toLowerCase()
                .replace(' ', '')
                .replace('"', ''),
              name: `${RichText.asText(product.data.name)} - ${sizeString}`,
              description: RichText.asText(product.data.description),
              price: product.data.price,
              currency: 'GBP',
              image: product.data.images[0].url,
            }))

            return combinations
          } else {
            return {
              id: product.uid,
              name: RichText.asText(product.data.name),
              description: RichText.asText(product.data.description),
              price: product.data.price,
              currency: 'GBP',
              image: product.data.images[0].url,
            }
          }
        })
        .flat()

      // add shipping options
      inventory.push(
        {
          id: 'shipping-untracked',
          name: 'Shipping',
          description: 'Royal Mail Tracked 48',
          price: 350,
          currency: 'GBP',
          image: null,
        },
        {
          id: 'shipping-tracked',
          name: 'Shipping',
          description: 'Royal Mail Special Delivery Guaranteed by 1pm',
          price: 670,
          currency: 'GBP',
          image: null,
        }
      )

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
          payment_method_types: ['card', 'klarna', 'afterpay_clearpay'],
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
