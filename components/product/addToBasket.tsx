import { Product, useShoppingCart } from 'use-shopping-cart'

import { FC } from 'react'
import { RichText } from 'prismic-reactjs'

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
    sku: uid,
  } as Product
  return (
    <a href="/shop/basket">
      <button onClick={() => addItem(productData)}>Add to basket</button>
    </a>
  )
}

export default AddToBasket
