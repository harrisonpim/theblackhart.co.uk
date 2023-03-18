import { expect, test } from '@playwright/test'

import { socialUrl } from './urls'

test.describe(
  'As a visitor from a social channel, I want to know where to find tbh on other platforms',
  () => {
    test('Can see links', async ({ page }) => {
      await page.goto(socialUrl)
      expect(await page.isVisible('ul >> li')).toBeTruthy()
    })
  }
)
