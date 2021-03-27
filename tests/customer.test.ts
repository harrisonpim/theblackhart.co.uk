import { baseUrl, commissionsUrl, shopUrl } from "./urls";

describe("As a customer, I want to browse products so that I know what's available", () => {
  test("Nav works", async () => {
    await page.goto(baseUrl);
    await page.click('[aria-label="nav"] >> text=shop');
    expect(await page.url()).toBe(shopUrl);
  });
  test("Can see products", async () => {
    await page.goto(shopUrl);
    expect(await page.isVisible('[aria-label="products"] >> h2')).toBeTruthy();
  });
  test("Links go to the correct products", async () => {
    page.goto(shopUrl);
    const productName = await page.textContent('[aria-label="products"] >> h2');
    await page.click(`"${productName}"`);
    expect(await page.textContent("h1")).toBe(productName);
    expect(await page.title()).toBe(productName);
  });
});

describe("As a customer, I want to read about the commissions process so that I can have something custom made", () => {
  test("Nav works", async () => {
    await page.goto(baseUrl);
    await page.click('[aria-label="nav"] >> text=commissions');
    expect(await page.url()).toBe(commissionsUrl);
  });
  test("Can order a ring sizer", async () => {
    page.goto(commissionsUrl);
    await page.click("text=ring sizer");
    expect(await page.url()).toBe(`${baseUrl}/ring-sizing`);
    await page.click("text=order a ring sizer");
    expect(await page.url()).toBe(`${shopUrl}/ring-sizer`);
    await page.click("text=here");
    expect(await page.url()).toBe(`${baseUrl}/ring-sizing`);
  });
});

describe("As a customer, I want to add products to my basket so that I can buy them", () => {});

describe("As a customer, I want to check out so that I can pay", () => {});
