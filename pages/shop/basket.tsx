import { FormEventHandler, useEffect, useState } from 'react'

import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import { fetchPostJSON } from '../../lib/api'
import imageLoader from 'lib/images'
import { linkResolver } from 'prismic.config'
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
                              loader={imageLoader}
                              className="absolute rounded-sm"
                              layout="fill"
                              objectFit="cover"
                              src={product.metadata.image.url}
                              alt={product.metadata.image.alt}
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
              <a
                className="no-underline"
                href="/shop"
                onClick={() => clearCart()}
              >
                Clear basket
              </a>
            </div>
            <div className="space-y-3">
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
