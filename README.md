# :skull: theblackhart.co.uk

Static landing page, store, and research blog for The Black Hart.

## How does it all fit together?

Site is built on [Jekyll](https://jekyllrb.com/), allowing Jess to just write content in markdown and render it nicely on the blog etc.

It's continuously built, tested, and deployed from the master branch this repo via [Netlify](https://www.netlify.com/). We test for accessibility with [pa11y](https://pa11y.org/), broken links, etc.

Product catalogue is exported from [Square](https://squareup.com/). We let Square handle orders and payments securely, off site, using [online checkout links](https://squareup.com/online-checkout).  
This set up might switched for Stripe eventually, to shave off another 1% in fees.

For the time being, this gets us close enough to the dream Jamstack website.
