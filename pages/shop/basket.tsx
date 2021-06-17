import { FormEventHandler, useEffect, useState } from 'react'

import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import { fetchPostJSON } from '../../lib/api'
import { useShoppingCart } from 'use-shopping-cart'

export default function Basket() {
  const [cartEmpty, setCartEmpty] = useState(true)

  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const handleCheckout: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const { sessionId } = await fetchPostJSON('/api/checkout', cartDetails)
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
                              placeholder="blur"
                              blurDataURL={`${product.metadata.image.url}&w=30`}
                            />
                          </div>
                        </div>
                        <div className="pl-3 text-left">
                          <h2 className="text-base">{product.name}</h2>
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
            <div>
              <p suppressHydrationWarning>Total: {formattedTotalPrice}</p>
              <Link href="/shop">
                <a className="no-underline" onClick={() => clearCart()}>
                  Clear basket
                </a>
              </Link>
            </div>
            <div className="space-y-3">
              <p className="text-sm">
                Shipping costs are added when you check out. For orders within
                the UK, silver items are shipped by{' '}
                <span className="italic">
                  Royal Mail Special Delivery Guaranteed by 1pm
                </span>
                , at a cost of £6.70. <p></p>For merch items, the cost of
                shipping is included in the price of the item.
              </p>
              <button type="submit" disabled={cartEmpty}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  )
}
