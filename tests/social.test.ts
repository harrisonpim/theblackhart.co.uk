import { socialUrl } from "./urls";

describe("As a visitor from a social channel, I want to know where to find tbh on other platforms", () => {
  test("Can see products", async () => {
    await page.goto(socialUrl);
    expect(await page.isVisible("ul >> li")).toBeTruthy();
  });
});
