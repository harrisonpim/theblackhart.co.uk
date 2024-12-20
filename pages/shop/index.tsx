import { Client, linkResolver } from '../../prismic.config'

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import { formatCurrencyString } from 'use-shopping-cart'
import { queryRepeatableDocuments } from '../../prismic'

const Shop = ({ index, products, categories, category }) => {
  return (
    <Layout
      description={RichText.asText(index.data.description)}
      title={RichText.asText(index.data.title)}
    >
      <div className="flex md:justify-between flex-col md:flex-row border-y py-1 uppercase text-xs gap-y-1">
        <div className="flex md:gap-3 justify-between" key="categories">
          {categories.map((c) => {
            return (
              <Link
                href={`/shop?category=${c}`}
                key={c}
                className={` ${c === category ? null : 'text-silver'}`}
              >
                {c}
              </Link>
            )
          })}
        </div>

        <Link href="/shop/basket" key="basket" className="text-right">
          Basket
        </Link>
      </div>

      <ul
        className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4"
        aria-label="products"
      >
        {products.map((product) => {
          return (
            <li key={RichText.asText(product.data.name)}>
              <Link as={linkResolver(product)} href={linkResolver(product)}>
                <div className="relative pb-6/5">
                  <Image
                    className="absolute w-full h-full rounded-sm object-cover"
                    src={product.data.images[0].image.url}
                    alt={product.data.images[0].image.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                  />
                  {product.data.one_of_a_kind ? (
                    <div className="text-xs bg-dark-gray -mr-2 absolute top-0 right-0 rounded p-1 transform rotate-12">
                      One of a kind
                    </div>
                  ) : null}
                  {product.data.ships_in_time_for_christmas ? (
                    <div className="text-xs bg-red-900 -mr-2 absolute top-0 right-0 rounded p-1 transform rotate-12">
                      Ships in time for Christmas
                    </div>
                  ) : null}
                </div>
                <div className="pt-1 text-center w-11/12 mx-auto">
                  <h2 className="text-base font-crimson leading-4 py-1">
                    {RichText.asText(product.data.name)}
                  </h2>
                  <p className="text-silver">
                    {formatCurrencyString({
                      value: product.data.price,
                      currency: 'GBP',
                    })}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category } = query
  const index = await Client().getSingle('shop', {})
  const products = await queryRepeatableDocuments(
    (doc) => doc.type === 'product'
  )

  const uniqueCategories = products
    .flatMap((product) => {
      return product.data.category.map((c) => c.id)
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    .filter((value) => value)
    .sort()

  const categoryIsValid = uniqueCategories.includes(category)

  const filteredProducts = products.filter((product) => {
    if (categoryIsValid) {
      return product.data.category.map((c) => c.id).includes(category)
    } else {
      return true
    } // if no category is selected, show all products
  })

  // sort products by first category
  const sortedProducts = filteredProducts.sort((a, b) => {
    const aCategory = a.data.category[0].id
    const bCategory = b.data.category[0].id
    return (
      uniqueCategories.indexOf(aCategory) - uniqueCategories.indexOf(bCategory)
    )
  })

  return {
    props: {
      index,
      products: sortedProducts,
      categories: uniqueCategories,
      category: categoryIsValid ? category : null,
    },
  }
}

export default Shop
