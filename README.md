# :skull: theblackhart.co.uk

Jamstack site for [The Black Hart](theblackhart.co.uk), including a research blog and an ecommerce store.

Built and deployed with:

- [next.js](https://nextjs.org/) and [typescript](https://www.typescriptlang.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [stripe](https://stripe.com/) for handling payments
- [netlify](https://www.netlify.com/) for hosting the site (possibly switching to [vercel](https://vercel.com/) in the near future)

## Developing

I use `netlify-cli` for local development. Run `yarn add netlify-cli -g` to install it.

Then run `ntl dev` to get a local version of the site running. Environment variables for prismic etc will be pulled directly from netlify, assuming you have the correct access permissions.

## Deploying

The site is rebuilt and deployed automatically on netlify whenever:

- there's a change to the content in prismic (Ideally, changes are bundled together into a release)
- there's a new commit to the master branch of this repo (new PRs will generate a build which is deployed to a preview URL)

As changes on either side are relatively infrequent compared to the build time, we have no problem rebuilding the site from scratch on each change.

Tests are run as part of the build, ensuring that we never deploy a broken site.
