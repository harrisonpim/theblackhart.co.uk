import { baseUrl, blogUrl } from "./urls";

describe("As a researcher, I want to read the posts on the blog so that I can learn about jewellery and history", () => {
  test("Blog nav works", async () => {
    await page.goto(baseUrl);
    await page.click("text=blog");
    expect(await page.url()).toBe(blogUrl);
  });
  test("Can see blog posts", async () => {
    expect(await page.isVisible("h2")).toBeTruthy();
  });
  test("Blog posts match their titles", async () => {
    const blogTitle = await page.textContent("h2");
    await page.click("h2");
    expect(await page.textContent("h1")).toBe(blogTitle);
    expect(await page.title()).toBe(blogTitle);
  });
});
