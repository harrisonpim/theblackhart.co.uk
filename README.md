# :skull: The Black Hart

Jamstack site for [The Black Hart](https://theblackhart.co.uk/), including a research blog and an ecommerce store.

Built and deployed with:

- [next.js](https://nextjs.org/) and [typescript](https://www.typescriptlang.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [stripe](https://stripe.com/) for handling payments
-  [vercel](https://vercel.com/) for deploying and hosting the site

## Developing

I use [the vercel cli](https://vercel.com/docs/cli) for local development. Run `npm install --include=dev` to install it along with the other dependencies.

Then run `npm run dev` to get a local version of the site running. Environment variables for prismic, stripe, etc should be stored in a `.env.local` file.

## Testing

Run `npm run test` to run the tests.

The tests are also run as a github action for each PR, ensuring that we never deploy a broken site.

## Deploying

The site is rebuilt and deployed automatically on vercel whenever:

- there's a change to the content in prismic (Ideally, changes are bundled together into a release)
- there's a new commit to the master branch of this repo. New PRs will generate a preview build which is deployed to a secondary URL.

As changes on either side are relatively infrequent compared to the build time, we have no problem rebuilding the site from scratch on each change.
