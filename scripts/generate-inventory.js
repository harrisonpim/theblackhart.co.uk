const fs = require('fs')
const prismic = require('@prismicio/client')
const { RichText } = require('prismic-reactjs')
require('dotenv').config()

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
  const inventory = products.map((product) => {
    return {
      id: product.uid,
      name: RichText.asText(product.data.name),
      description: RichText.asText(product.data.description),
      price: product.data.price,
      currency: 'GBP',
      image: product.data.body[0].items[0].image.url,
    }
  })

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
