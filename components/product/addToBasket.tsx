import { Product, useShoppingCart } from 'use-shopping-cart'

import { FC } from 'react'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from 'prismic.config'

type Props = {
  product
  size: {
    ringSize?: string
    chainLength?: string
    topSize?: string
  }
  uid: string
}

const AddToBasket: FC<Props> = ({ product, size, uid }) => {
  const { addItem } = useShoppingCart()
  const name = RichText.asText(product.data.name)
  const needsSize = Object.values(size).filter((s) => s !== null).length > 0
  const sizeString = needsSize
    ? ' - ' +
      Object.values(size)
        .filter((s) => s !== null)
        .join(' - ')
    : ''

  const needsTrackedShipping =
    product.data.category
      .map((c) => c.id)
      .filter((value) =>
        ['necklaces', 'earrings', 'rings', 'sets'].includes(value)
      ).length > 0

  const productData = {
    name: `${name}${sizeString}`,
    description: RichText.asText(product.data.description),
    price: product.data.price,
    image: product.data.body[0].items[0].image.url,
    currency: 'GBP',
    sku: `${uid}${sizeString ? sizeString.replace(/\s/g, '') : ''}`,
    metadata: {
      uid,
      url: linkResolver(product),
      image: product.data.body[0].items[0].image,
      needsTrackedShipping,
    },
  } as Product

  return (
    <Link href="/shop/basket">
      <a>
        <button onClick={() => addItem(productData)}>Add to basket</button>
      </a>
    </Link>
  )
}

export default AddToBasket
