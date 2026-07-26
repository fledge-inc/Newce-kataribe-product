import {expect, test} from "@playwright/test";

const pages = [
  {name: "language-selection", path: "/ja"},
  {name: "store-home", path: "/ja/store"},
  {name: "product-list", path: "/ja/products"},
  {name: "product-detail", path: "/ja/products/kayanoya-dashi"}
] as const;

for (const pageCase of pages) {
  test(`${pageCase.name} screenshot`, async ({page}) => {
    await page.goto(pageCase.path, {waitUntil: "networkidle"});
    await page.evaluate(() => document.fonts.ready);
    await page.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map((node) => {
          const image = node as HTMLImageElement;
          return image.complete
            ? Promise.resolve()
            : image.decode().catch(() => undefined);
        })
      );
    });
    await expect(page).toHaveScreenshot(`${pageCase.name}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.01
    });
  });
}

for (const width of [360, 390, 430]) {
  test(`no horizontal overflow at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 844});

    for (const pageCase of pages) {
      await page.goto(pageCase.path);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));
      expect(
        dimensions.scrollWidth,
        `${pageCase.name} overflows at ${width}px`
      ).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  });
}
