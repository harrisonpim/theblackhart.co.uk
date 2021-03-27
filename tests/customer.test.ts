import { baseUrl, basketUrl, commissionsUrl, shopUrl } from "./urls";

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

describe("As a customer, I want to add products to my basket so that I can buy them", () => {
  test("Can add an item to the basket", async () => {
    await page.goto(`${shopUrl}/ring-sizer`);
    await page.click("text=add to basket");
    expect(await page.url()).toBe(basketUrl);
    await page.waitForSelector('[aria-label="basket items"] >> li', {
      state: "attached",
    });
    const basketItems = await page.$$('[aria-label="basket items"] >> li');
    expect(basketItems.length).toBe(1);
  });
  test("Can view basket", async () => {
    await page.goto(shopUrl);
    await page.click("text=basket");
    expect(await page.url()).toBe(basketUrl);
  });
  test("Can add a second item to the basket", async () => {
    await page.goto(`${shopUrl}/ring-sizer`);
    await page.click("text=add to basket");
    await page.goto(`${shopUrl}/small-skull-ring`);
    await page.click("text=add to basket");
    expect(await page.url()).toBe(basketUrl);
    await page.waitForSelector('[aria-label="basket items"] >> li', {
      state: "attached",
    });
    const basketItems = await page.$$('[aria-label="basket items"] >> li');
    expect(basketItems.length).toBe(2);
    expect(
      await page.innerText('[aria-label="basket items"] >> li >> h2')
    ).toBe("Ring Sizer");
  });
});

describe("As a customer, I want to clear my basket so that I can start my journey again", () => {
  test("Can add an item to the basket", async () => {
    await page.goto(`${shopUrl}/ring-sizer`);
    await page.click("text=add to basket");
    expect(await page.url()).toBe(basketUrl);
    await page.waitForSelector('[aria-label="basket items"] >> li', {
      state: "attached",
    });
    await page.click("text=clear basket");
    expect(await page.url()).toBe(shopUrl);
    await page.goto(basketUrl);
    await page.waitForSelector('[aria-label="basket items"]', {
      state: "attached",
    });
    const basketItems = await page.$$('[aria-label="basket items"] >> li');
    expect(basketItems.length).toBe(0);
  });
});

describe("As a customer, I want to check out so that I can pay", () => {});
