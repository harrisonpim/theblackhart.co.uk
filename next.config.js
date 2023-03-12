module.exports = {
  images: {
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
    return config
  },
}
