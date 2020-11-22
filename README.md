# :skull: theblackhart.co.uk

Jamstack site for [The Black Hart](theblackhart.co.uk), including a research blog and an ecommerce store.

Built and deployed with:

- [next.js](https://nextjs.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [square](https://squareup.com/gb/en) for managing the product catalogue and handling payments (likely switching to [stripe](https://stripe.com/) in the near future)
- [netlify](https://www.netlify.com/) for hosting the site

## Developing

First, you'll need to populate `blank.env.local` with the relevant environment variables and rename it `env.local`.

Run `make serve` to install the relevant packages etc, build an optimised production version of the site, and serve it locally at `localhost:3000`.

To serve a live-updating development version of the site, run `make dev`

## Deploying

The site is rebuilt and deployed automatically on netlify whenever:

- there's a change to the content in prismic (Ideally, changes are bundled together into a release)
- there's a new commit to the master branch of this repo (new PRs will generate a build which is deployed to a preview URL)

As changes on either side are relatively infrequent compared to the build time, we have no problem rebuilding the site from scratch on each change.

Tests are run as part of the build, ensuring that we never deploy a broken site.
