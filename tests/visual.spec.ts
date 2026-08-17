import {expect, test} from "@playwright/test";

const pages = [
  {name: "store-map", path: "/ja"},
  {name: "store-map-en", path: "/en"},
  {name: "product-story", path: "/ja/products/kayanoya-dashi"},
  {name: "product-story-en", path: "/en/products/shiro-dashi"}
] as const;

for (const pageCase of pages) {
  test(`${pageCase.name} screenshot`, async ({page}) => {
    await page.goto(pageCase.path, {waitUntil: "networkidle"});
    await page.evaluate(() => document.fonts.ready);

    // スクロール出現待ちの要素を全て表示済みにして、全画面撮影を安定させる
    await page.evaluate(() => {
      for (const element of document.querySelectorAll(".reveal")) {
        element.classList.add("is-revealed");
      }
    });

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

// 440px は iPhone 16/17 Pro Max の幅。シェルの letterbox が帯として
// 露出した回帰があったため、検証幅に含めている。
for (const width of [360, 390, 430, 440]) {
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
