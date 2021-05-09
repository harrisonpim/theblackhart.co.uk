import { baseUrl, legalUrl } from './urls'

describe('As a regulator, I want to see required legal statements', () => {
  test('Can find the legal page', async () => {
    await page.goto(baseUrl)
    await page.click('text=Legal')
    expect(await page.url()).toBe(legalUrl)
  })
  test('Can find the dealers notice', async () => {
    await page.goto(legalUrl)
    await page.click('text=Dealers Notice')
    expect(await page.url()).toContain(
      'https://images.prismic.io/theblackhart/'
    )
  })
})
