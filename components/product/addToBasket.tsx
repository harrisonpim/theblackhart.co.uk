import { Product, useShoppingCart } from 'use-shopping-cart'

import { FC } from 'react'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from 'prismic.config'

type Props = {
  product
  size: string
  uid: string
}

const AddToBasket: FC<Props> = ({ product, size, uid }) => {
  const { addItem } = useShoppingCart()
  const name = RichText.asText(product.data.name)

  const productData = {
    name: size ? `${name} - ${size}` : name,
    description: RichText.asText(product.data.description),
    price: product.data.price,
    image: product.data.body[0].items[0].image.url,
    currency: 'GBP',
    sku: size ? `${uid}-${size}` : uid,
    metadata: {
      uid,
      url: linkResolver(product),
      image: product.data.body[0].items[0].image,
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
