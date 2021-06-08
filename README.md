# :skull: [The Black Hart](https://theblackhart.co.uk/)

A site for The Black Hart including a store and a blog, following [jamstack](https://jamstack.org/) principles.

Built and deployed with:

- [next.js](https://nextjs.org/) and [typescript](https://www.typescriptlang.org/) for structuring the content
- [tailwind css](https://tailwindcss.com/) for styling the content
- [prismic](https://prismic.io/) for writing and managing the content
- [stripe](https://stripe.com/) for handling payments
- [vercel](https://vercel.com/) for deploying and hosting the site

## Developing

- Clone this repo
- Run `yarn install --include=dev` to install dependencies.
- Run `yarn link` to link your local repo to the project on vercel
- Run `yarn env` to populate a local `.env` file with dev versions of all of the project's secrets.
- Finally, run `yarn dev` to get a local version of the site running.

## Testing

Follow the instructions above to get the site running locally. Then run `yarn test` to run integration tests, or `yarn pa11y` to run the accessibility tests.

These tests are automatically run in a github action for each PR, ensuring that we never deploy a broken site.

## Deploying

The site is rebuilt and deployed automatically on vercel whenever:

- there's a change to the content in prismic (Ideally, changes are bundled together into a release)
- there's a new commit to the `main` branch of this repo. New PRs will generate a preview build which is deployed to a secondary URL.

As changes on either side are relatively infrequent compared to the build time, we have no problem rebuilding the site from scratch on each change.
