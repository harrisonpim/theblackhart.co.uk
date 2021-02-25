module.exports = {
  images: {
    domains: ["images.prismic.io"],
  },
  webpack: (config) => {
    const a = require("./scripts/generate-sitemap");
    return config;
  },
};
