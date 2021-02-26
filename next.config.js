module.exports = {
  images: {
    domains: ["images.prismic.io"],
  },
  webpack: (config) => {
    require("./scripts/generate-sitemap");
    require("./scripts/generate-products");
    return config;
  },
};
