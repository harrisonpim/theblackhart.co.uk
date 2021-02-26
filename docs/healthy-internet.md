# Healthy Internet

We want to contribute to an internet that works for everyone, following performance and accessibility best practices, and maintaining a high standard of internet citizenship.

## Accessibility

Every change to our codebase is run through our own suite of tests and [pa11y-ci](https://github.com/pa11y/pa11y-ci) - merging new code is blocked until both sets of lights go green.

## Third party tracking, cookies, etc

You can use [Blacklight](https://themarkup.org/blacklight?url=theblackhart.co.uk) to expose any user-tracking software on [theblackhart.co.uk](https://theblackhart.co.uk/).

Currently, the only third party software we use which can be construed as "tracking" is Stripe, the payments platform. We load `stripe.js` on every page for two reasons - keeping track of the user's basket before checkout with `use-shopping-cart`, and using stripe's anomaly detection to prevent fraud.
