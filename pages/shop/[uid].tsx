import { Client, linkResolver } from '../../prismic.config'
import { chainLengths, ringSizes, topSizes } from '../../components/product'

import ImageGallery from 'components/imageGallery'
import Layout from '../../components/layout'
import { RichText } from 'prismic-reactjs'
import { formatCurrencyString } from 'use-shopping-cart'
import { queryRepeatableDocuments } from '../../prismic'
import { useRouter } from 'next/router'
import { useShoppingCart } from 'use-shopping-cart'
import { useState } from 'react'

export default function ProductPage({ product, details, uid }) {
  const router = useRouter()
  const title = RichText.asText(product.data.name)
  const description = RichText.asText(product.data.description)
  const images = product.data.images

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
  const { addItem } = useShoppingCart()

  const size = {
    ringSize,
    chainLength,
    topSize,
  }
  const needsSize = Object.values(size).filter((s) => s !== null).length > 0
  const sizeString = needsSize
    ? Object.values(size)
        .filter((s) => s !== null)
        .join(' - ')
    : ''

  const needsTrackedShipping =
    product.data.category
      .map((c) => c.id)
      .filter((value) =>
        ['necklaces', 'earrings', 'rings', 'sets'].includes(value)
      ).length > 0

  const handleAddToBasket = () => {
    const productData = {
      id: product.uid,
      name: RichText.asText(product.data.name),
      description: RichText.asText(product.data.description),
      price: product.data.price,
      currency: 'GBP',
      image: images[0].url,
    }

    const options = {
      count: 1,
      product_metadata: {
        uid,
        size: sizeString,
        url: linkResolver(product),
        image: images[0].url,
        needsTrackedShipping,
      },
    }

    addItem(productData, options)
    router.push('/shop/basket')
  }

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
                  name="ringSizes"
                  id="ringSizes"
                  title="ringSizes"
                  aria-label="ringSizes"
                  defaultValue={ringSizes[0]}
                  onChange={(e) => setRingSize(e.target.value)}
                >
                  {ringSizes.map((size) => (
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
                  name="chainLengths"
                  id="chainLengths"
                  title="chainLengths"
                  aria-label="chainLengths"
                  defaultValue={chainLengths[0]}
                  onChange={(e) => setChainLength(e.target.value)}
                >
                  {chainLengths.map((size) => (
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
                  name="topSizes"
                  id="topSizes"
                  title="topSizes"
                  aria-label="topSizes"
                  defaultValue={topSizes[0]}
                  onChange={(e) => setTopSize(e.target.value)}
                >
                  {topSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <details>
              <summary className="font-bold">
                {RichText.asText(details.data.title)}
              </summary>
              <div className="text-sm pt-2">
                <RichText
                  render={details.data.text}
                  linkResolver={linkResolver}
                />
              </div>
            </details>{' '}
          </div>
          <div className="pt-3">
            <button onClick={handleAddToBasket}>Add to basket</button>
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
