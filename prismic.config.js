import Prismic from '@prismicio/client'

export const Client = (req = null) =>
  Prismic.client(
    `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`,
    createClientOptions(req, process.env.PRISMIC_ACCESS_TOKEN)
  )

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {}
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}

export const linkResolver = (doc) => {
  if (doc.link_type === 'Web') {
    return doc.url
  }
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  if (doc.type === 'blog-post') {
    return `/blog/${doc.uid}`
  }
  if (doc.type === 'product') {
    return `/shop/${doc.uid}`
  }
  if (doc.type === 'shop') {
    return '/shop'
  }
  if (doc.type === 'blog-home') {
    return '/blog'
  }
  return '/'
}
