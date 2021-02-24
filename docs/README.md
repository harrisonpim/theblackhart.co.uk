# Docs

![architecture](./architecture.png)

## Build process

- Code is hosted in github
- Content is hosted in prismic
- Webhooks kick off builds whenever a change is detected in github or prismic
- At build time, vercel grabs the code and content, and combines them into a mix of static HTML and serverless javascript functions. These are then served to users by vercel's CDN.

## Checkouts with stripe

- A user builds a basket of items and clicks the checkout button. The basket state is managed by [use-shopping-cart](https://useshoppingcart.com/).
- The checkout button sends a POST request to a serverless checkout function with quantities and IDs of the cart items
- The function has access to our secret keys for stripe and prismic
- The function checks the price, title, description etc of each item against the records in prismic, and assembles a new cart in the format which stripe accepts.
- Depending on the contents of the basket, shipping costs are added to the basket total.
- The function makes a request to stripe for a unique checkout session with the product details. Stripe responds with a redirect instruction.
- The redirect object is then sent back to the user, sending them to stripe to check out.

## Previews

## Branch URLs
