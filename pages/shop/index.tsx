import { Client, linkResolver } from '../../prismic.config'

import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatCurrencyString } from 'use-shopping-cart'
import imageLoader from 'lib/images'
import { queryRepeatableDocuments } from '../../lib/queries'

const Shop = ({ index, products }) => {
  return (
    <Layout
      description={RichText.asText(index.data.description)}
      title={RichText.asText(index.data.title)}
    >
      <ul className="grid grid-cols-2 row-gap-2 border-b border-t py-1 uppercase text-xs">
        <div className="flex gap-3 mx-0 lg:text-left" key="categories">
          {/* <li key="merch">
            <a href="/shop?category=merch" className="no-underline">
              Merch
            </a>
          </li>
          <li key="silver">
            <a href="/shop?category=silver" className="no-underline">
              Silver
            </a>
          </li> */}
        </div>
        <li className="mx-0 text-right" key="basket">
          <a className="no-underline" href="/shop/basket">
            Basket
          </a>
        </li>
      </ul>
      <ul
        className="grid gap-3 grid-cols-2 lg:grid-cols-4 pt-4"
        aria-label="products"
      >
        {products.map((product) => {
          const image = product.data.body[0].items[0].image
          return (
            <li key={product.data.name}>
              <Link as={linkResolver(product)} href={linkResolver(product)}>
                <a className="no-underline">
                  <div className="relative pb-6/5">
                    <Image
                      loader={imageLoader}
                      className="absolute w-full h-full rounded-sm"
                      src={image.url}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="pt-1 text-center w-11/12 mx-auto">
                    <h2 className="text-base">
                      {RichText.asText(product.data.name)}
                    </h2>
                    <p className="text-silver">
                      {formatCurrencyString({
                        value: product.data.price,
                        currency: 'GBP',
                      })}
                    </p>
                  </div>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const index = await Client().getSingle('shop', {})
  const products = await queryRepeatableDocuments(
    (doc) => doc.type === 'product'
  )

  return {
    props: {
      index,
      products: products,
    },
  }
}

export default Shop
