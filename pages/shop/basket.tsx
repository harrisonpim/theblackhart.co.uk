import {
  CartEntry,
  formatCurrencyString,
  useShoppingCart,
} from 'use-shopping-cart'
import { FormEventHandler, useEffect, useState } from 'react'

import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import { fetchPostJSON } from '../../lib/api'
import { useRouter } from 'next/router'

export default function Basket() {
  const [cartEmpty, setCartEmpty] = useState(true)
  const router = useRouter()
  const {
    totalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const basketNeedsTrackedShipping =
    !cartEmpty &&
    Object.values(cartDetails).some(
      (product) => product.metadata.needsTrackedShipping
    )
  const shippingCost = !cartEmpty ? (basketNeedsTrackedShipping ? 670 : 350) : 0

  const handleCheckout: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const shippingItem: CartEntry = {
      sku: 'shipping',
      name: 'Shipping',
      description: 'Shipping',
      price: shippingCost,
      currency: 'GBP',
      value: shippingCost,
      quantity: 1,
      formattedValue: formatCurrencyString({
        value: shippingCost,
        currency: 'GBP',
      }),
    }

    const { sessionId } = await fetchPostJSON('/api/checkout', {
      ...cartDetails,
      shipping: shippingItem,
    })
    redirectToCheckout({ sessionId })
  }

  return (
    <Layout title="Basket">
      <form onSubmit={handleCheckout}>
        <div className="space-y-2">
          <ul className="border-t border-b divide-y" aria-label="basket items">
            {Object.values(cartDetails).map((product) => {
              return (
                <li key={product.name}>
                  <Link href={product.metadata.url}>
                    <a className="no-underline">
                      <div className="flex items-center py-2">
                        <div className="w-20">
                          <div className="relative pb-7/5">
                            <Image
                              className="absolute rounded-sm"
                              layout="fill"
                              objectFit="cover"
                              src={product.metadata.image.url}
                              alt={product.metadata.image.alt}
                            />
                          </div>
                        </div>
                        <div className="pl-3 text-left">
                          <h2 className="text-base font-crimson">
                            {product.name}
                          </h2>
                          <div className="text-sm">
                            <div>x{product.quantity}</div>
                            <div>{product.formattedValue}</div>
                          </div>
                        </div>
                      </div>
                    </a>
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
              <button type="submit" disabled={cartEmpty}>
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
      </form>
    </Layout>
  )
}
