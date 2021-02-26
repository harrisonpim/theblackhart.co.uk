# Sitemaps

A sitemap is generated for the site every time we run `next build`, and stored in `public/sitemap.xml`.

Webpack is configured (through `./next.config.js`) to run `scripts/generate-sitemap.js` before every build. The script fetches every page, blog post and product from prismic and the local `pages/` directory, forming a complete list of URLs. The script also uses vercel's `VERCEL_ENV` environment variable to detect whether the build is happening on a local dev machine, in a branch preview in CI, or in production, and the sitemap's base url is changed accordingly.

The sitemap is used to run accessibility checks on the site with `pa11y-ci`. Changing the base url of the sitemap allows us to run the command with a completely up-to-date sitemap (and therefore complete a11y coverage of the site) in any environment.
