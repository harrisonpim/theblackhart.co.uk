module.exports = {
  images: {
    // loader: 'imgix',
    // path: '',
    domains: ['images.prismic.io'],
  },
  async redirects() {
    return [
      {
        source: '/research-blog/:uid',
        destination: '/blog/:uid',
        permanent: true,
      },
      {
        source: '/bespoke',
        destination: '/commissions',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    require('./scripts/generate-sitemap')
    require('./scripts/generate-products')
    return config
  },
}
