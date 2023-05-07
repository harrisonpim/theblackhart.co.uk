const fs = require('fs')
const prismic = require('@prismicio/client')
const { RichText } = require('prismic-reactjs')
require('dotenv').config()

const ringSizes = [
  'G',
  'G½',
  'H',
  'H½',
  'I',
  'I½',
  'J',
  'J½',
  'K',
  'K½',
  'L',
  'L½',
  'M',
  'M½',
  'N',
  'N½',
  'O',
  'O½',
  'P',
  'P½',
  'Q',
  'Q½',
  'R',
  'R½',
  'S',
  'S½',
  'T',
  'T½',
  'U',
  'U½',
]

const chainLengths = ['16"', '20"', '24"']

const topSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

const client = prismic.client(
  `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`,
  {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  }
)

async function fetchDocs(page = 1, routes = []) {
  const response = await client.query('', { pageSize: 100, lang: '*', page })
  const allRoutes = routes.concat(response.results)
  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes)
  }
  return [...new Set(allRoutes)]
}

async function queryRepeatableDocuments(filter) {
  const allRoutes = await fetchDocs()
  return allRoutes.filter(filter)
}

;(async () => {
  const products = await queryRepeatableDocuments(
    (doc) => doc.type === 'product'
  )

  // transform the data into the format used by use-shopping-cart and stripe
  const inventory = products
    .map((product) => {
      const isRing = product.data.sizing
        .map((size) => size.id)
        .includes('rings')
      const isNecklace = product.data.sizing
        .map((size) => size.id)
        .includes('necklaces')
      const isTop = product.data.sizing.map((size) => size.id).includes('tops')

      const size = {
        ring: isRing ? ringSizes : null,
        necklace: isNecklace ? chainLengths : null,
        top: isTop ? topSizes : null,
      }
      const needsSize = Object.values(size).filter((s) => s !== null).length > 0

      if (needsSize) {
        const sizeArrays = Object.entries(size).filter((s) => s[1] !== null)
        const possibleSizes = sizeArrays
          .reduce(
            (acc, [key, value]) => {
              return acc.flatMap((x) => value.map((y) => [...x, y]))
            },
            [[]]
          )
          .map((x) => x.join(' - '))

        const combinations = possibleSizes.map((sizeString) => ({
          id: `${product.uid}-${sizeString
            .toLowerCase()
            .replace(' ', '')
            .replace(' ', '')
            .replace('"', '')}`,
          name: `${RichText.asText(product.data.name)} - ${sizeString}`,
          description: RichText.asText(product.data.description),
          price: product.data.price,
          currency: 'GBP',
          image: product.data.images[0].url,
        }))

        return combinations
      } else {
        return {
          id: product.uid,
          name: RichText.asText(product.data.name),
          description: RichText.asText(product.data.description),
          price: product.data.price,
          currency: 'GBP',
          image: product.data.images[0].url,
        }
      }
    })
    .flat()

  // add shipping options
  inventory.push(
    {
      id: 'shipping-untracked',
      name: 'Shipping',
      description: 'Royal Mail Tracked 48',
      price: 350,
      currency: 'GBP',
    },
    {
      id: 'shipping-tracked',
      name: 'Shipping',
      description: 'Royal Mail Special Delivery Guaranteed by 1pm',
      price: 670,
      currency: 'GBP',
    }
  )

  fs.writeFileSync('pages/api/inventory.json', JSON.stringify(inventory))
})()
