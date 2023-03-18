import { baseUrl, legalUrl } from './urls'
import { expect, test } from '@playwright/test'

test.describe('As a regulator, I want to see required legal statements', () => {
  test('Can find the legal page', async ({ page }) => {
    await page.goto(baseUrl)
    await page.click('text=Legal')
    expect(await page.url()).toBe(legalUrl)
  })
  test('Can find the dealers notice', async ({ page }) => {
    await page.goto(legalUrl)
    await page.click('text=Dealers Notice')
    expect(await page.url()).toContain(
      'https://images.prismic.io/theblackhart/'
    )
  })
})
