import { FormEventHandler, useEffect, useState } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

import { CartEntry } from 'use-shopping-cart/core'
import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import inventory from '../api/inventory.json'
import { useRouter } from 'next/router'

type CartEntryWithMetadata = CartEntry & {
  product_data: {
    size: string
    url: string
    image_url: string
    image_alt: string
    needsTrackedShipping: boolean
  }
}

export default function Basket() {
  const [cartEmpty, setCartEmpty] = useState(true)
  const router = useRouter()
  const { totalPrice, cartCount, clearCart, cartDetails, redirectToCheckout } =
    useShoppingCart()

  // console.log(Object.values(cartDetails))

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const basketNeedsTrackedShipping =
    !cartEmpty &&
    Object.values(cartDetails).some(
      (product: CartEntryWithMetadata) =>
        product.product_data.needsTrackedShipping
    )

  const shipping = basketNeedsTrackedShipping
    ? inventory.find((item) => item.id === 'shipping-tracked')
    : inventory.find((item) => item.id === 'shipping-untracked')

  const shippingItem: CartEntry = {
    ...shipping,
    quantity: 1,
    value: shipping.price,
    formattedValue: formatCurrencyString({
      value: shipping.price,
      currency: shipping.currency,
    }),
  }

  const shippingCost = !cartEmpty ? shippingItem.price : 0

  const handleCheckout: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    let response: { sessionId: string }
    try {
      response = await fetch('/api/checkout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          ...cartDetails,
          [shippingItem.id]: shippingItem,
        }),
      }).then((res) => res.json())
    } catch (err) {
      throw new Error(err.message)
    }

    redirectToCheckout(response.sessionId)
  }

  return (
    <Layout title="Basket">
      <div className="space-y-2">
        <ul className="border-t border-b divide-y" aria-label="basket items">
          {Object.values(cartDetails).map((product: CartEntryWithMetadata) => {
            return (
              <li key={product.name}>
                <Link href={product.product_data.url}>
                  <div className="flex items-center py-2">
                    <div className="w-20">
                      <div className="relative pb-7/5">
                        <Image
                          className="absolute rounded-sm object-cover"
                          fill
                          sizes="(min-width: 1024px) 100px, (min-width: 768px) 100px, 100px"
                          src={product.product_data.image_url}
                          alt={product.product_data.image_alt}
                        />
                      </div>
                    </div>
                    <div className="pl-3 text-left">
                      <h2 className="text-base font-crimson">
                        {product.name}
                        {product.product_data.size
                          ? ` - ${product.product_data.size}`
                          : ''}
                      </h2>
                      <div className="text-sm">
                        <div>x{product.quantity}</div>
                        <div>{product.formattedValue}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p>
              Shipping:{' '}
              {formatCurrencyString({
                value: shippingCost,
                currency: 'GBP',
              })}
            </p>
            <p>
              Total:{' '}
              {formatCurrencyString({
                value: totalPrice + shippingCost,
                currency: 'GBP',
              })}
            </p>
            <p className="text-sm">
              For orders within the UK, orders which include jewellery are
              shipped by{' '}
              <span className="italic">
                Royal Mail Special Delivery Guaranteed by 1pm
              </span>
              , at a cost of £6.70. All other orders are shipped by{' '}
              <span className="italic">Royal Mail Tracked 48</span>, at a cost
              of £3.50.
            </p>
          </div>
          <div className="space-y-3">
            <button onClick={handleCheckout} disabled={cartEmpty}>
              Checkout
            </button>
            <button
              onClick={() => {
                clearCart()
                router.push('/shop')
              }}
            >
              Clear basket
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
