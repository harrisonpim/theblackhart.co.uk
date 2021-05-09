const fs = require('fs')
const prismic = require('@prismicio/client')
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
  const inventory = await queryRepeatableDocuments(
    (doc) => doc.type === 'product'
  )

  fs.writeFileSync('pages/api/products.json', JSON.stringify(inventory))
})()
