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

  const isRing = product.data.sizing.map((size) => size.id).includes('rings')
  const isNecklace = product.data.sizing
    .map((size) => size.id)
    .includes('necklaces')
  const isTop = product.data.sizing.map((size) => size.id).includes('tops')

  const [ringSize, setRingSize] = useState(isRing ? ringSizes[0] : null)
  const [chainLength, setChainLength] = useState(
    isNecklace ? chainLengths[0] : null
  )
  const [topSize, setTopSize] = useState(isTop ? topSizes[0] : null)

  return (
    <Layout title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="top-0">
          <ImageGallery images={images} />
        </div>
        <div>
          <h1 className="leading-none lg:pt-2">{title}</h1>
          <h2 className="text-silver pb-4 text-lg font-crimson">
            {displayPrice}
          </h2>
          <div className="prose">
            <RichText
              render={product.data.description}
              linkResolver={linkResolver}
            />

            {isRing ? (
              <div className="flex">
                <div className="pr-2">Ring size:</div>
                <select
                  className="w-20 mb-3 text-black text-sm"
                  name="ringSizes"
                  id="ringSizes"
                  title="ringSizes"
                  aria-label="ringSizes"
                  onChange={(e) => setRingSize(e.target.value)}
                >
                  <option key={ringSizes[0]} value={ringSizes[0]} selected>
                    {ringSizes[0]}
                  </option>
                  {ringSizes.slice(1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {isNecklace ? (
              <div className="flex">
                <div className="pr-2">Chain length:</div>
                <select
                  className="w-20 mb-3 text-black text-sm"
                  name="chainLengths"
                  id="chainLengths"
                  title="chainLengths"
                  aria-label="chainLengths"
                  onChange={(e) => setChainLength(e.target.value)}
                >
                  <option
                    key={chainLengths[0]}
                    value={chainLengths[0]}
                    selected
                  >
                    {chainLengths[0]}
                  </option>
                  {chainLengths.slice(1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {isTop ? (
              <div className="flex">
                <div className="pr-2">Size:</div>
                <select
                  className="w-20 mb-3 text-black text-sm"
                  name="topSizes"
                  id="topSizes"
                  title="topSizes"
                  aria-label="topSizes"
                  onChange={(e) => setTopSize(e.target.value)}
                >
                  <option key={topSizes[0]} value={topSizes[0]} selected>
                    {topSizes[0]}
                  </option>
                  {topSizes.slice(1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <Details data={details.data} />
          </div>
          <div className="pt-3">
            <AddToBasket
              product={product}
              size={{
                ringSize,
                chainLength,
                topSize,
              }}
              uid={uid}
            />
          </div>
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
