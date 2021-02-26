# Build process

![architecture](./architecture.png)

- Code is hosted in github
- Content is hosted in prismic
- Webhooks kick off builds whenever a change is detected in github or prismic
- At build time, vercel grabs the code and content, and combines them into a mix of static HTML and serverless javascript functions. These are then served to users by vercel's CDN.
