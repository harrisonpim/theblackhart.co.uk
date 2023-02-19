import {
  AddToBasket,
  Details,
  ImageGallery,
  chainLengths,
  ringSizes,
  topSizes,
} from '../../components/product'
import { Client, linkResolver } from '../../prismic.config'

import Layout from '../../components/layout'
import { RichText } from 'prismic-reactjs'
import { formatCurrencyString } from 'use-shopping-cart'
import { queryRepeatableDocuments } from '../../lib/queries'
import { useState } from 'react'

export default function ProductPage({ product, details, uid }) {
  const title = RichText.asText(product.data.name)
  const description = RichText.asText(product.data.description)
  const images = product.data.body[0].items
  const displayPrice = formatCurrencyString({
    value: product.data.price,
    currency: 'GBP',
  })
  const isRing = product.data.type === 'ring'
  const isNecklace = product.data.type === 'necklace'
  const isTop = product.data.type === 'top'
  const sizes = isRing
    ? ringSizes
    : isNecklace
    ? chainLengths
    : isTop
    ? topSizes
    : null
  const [size, setSize] = useState(isRing || isNecklace ? sizes[0] : null)

  return (
    <Layout title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="top-0">
          <ImageGallery images={images} />
        </div>
        <div>
          <h1 className="leading-none">{title}</h1>
          <h2 className="text-silver pb-4">{displayPrice}</h2>
          <div className="prose">
            <RichText
              render={product.data.description}
              linkResolver={linkResolver}
            />

            {isRing || isNecklace || isTop ? (
              <div className="flex">
                <div className="pr-2">Size:</div>
                <select
                  className="w-20 mb-3 text-black text-sm"
                  name="sizes"
                  id="sizes"
                  title="sizes"
                  aria-label="sizes"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option key={sizes[0]} value={sizes[0]} selected>
                    {sizes[0]}
                  </option>
                  {sizes.slice(1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {['silver', 'ring', 'necklace'].includes(product.data.type) ? (
              <Details data={details.data} />
            ) : null}
          </div>
          <AddToBasket product={product} size={size} uid={uid} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const client = Client()
  const product = await client.getByUID('product', params.uid, {})
  const details = await client.getSingle('additional_information', {})

  return {
    props: {
      product,
      details,
      uid: params.uid,
    },
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === 'product'
  )
  return {
    paths: documents.map((doc) => `/shop/${doc.uid}`),
    fallback: false,
  }
}
