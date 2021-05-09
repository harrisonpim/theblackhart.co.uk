import { baseUrl, blogUrl } from './urls'

describe('As a researcher, I want to read the posts on the blog so that I can learn about jewellery and history', () => {
  test('Nav works', async () => {
    await page.goto(baseUrl)
    await page.click('[aria-label="nav"] >> text=blog')
    expect(await page.url()).toBe(blogUrl)
  })
  test('Can see blog posts', async () => {
    await page.goto(blogUrl)
    expect(await page.isVisible('[aria-label="posts"]')).toBeTruthy()
    expect(await page.isVisible('h2')).toBeTruthy()
  })
  test('Links go to the correct blog posts', async () => {
    await page.goto(blogUrl)
    const blogTitle = await page.textContent('[aria-label="posts"] >> h2')
    await page.click(`"${blogTitle}"`)
    expect(await page.textContent('h1')).toBe(blogTitle)
    expect(await page.title()).toBe(blogTitle)
  })
})
