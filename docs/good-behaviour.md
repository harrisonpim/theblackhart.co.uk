# Good Behaviour

We want to build a site that works well for everyone, following performance and accessibility best practices, and maintaining a high standard of internet citizenship.

## Accessibility

We run pa11y-ci on every PR, and merging is blocked until the suite passes.

## Third party tracking, cookies, etc

You can use [Blacklight](https://themarkup.org/blacklight?url=theblackhart.co.uk) to expose any user-tracking software on [theblackhart.co.uk](https://theblackhart.co.uk/). Currently, the only third party software we use which can be construed as tracking is the [use-shopping-cart](https://useshoppingcart.com/) in conjunction with stripe, which are used to build users' baskets before they check out. We might move this check into CI with
