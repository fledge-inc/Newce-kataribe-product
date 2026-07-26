import {expect, test} from "@playwright/test";

const pages = [
  {name: "language-selection", path: "/ja"},
  {name: "store-home", path: "/ja/store"},
  {name: "product-list", path: "/ja/products"},
  {name: "product-detail", path: "/ja/products/kayanoya-dashi"},
  {name: "product-staff", path: "/ja/products/kayanoya-dashi/staff"},
  {name: "recipes", path: "/ja/recipes"},
  {name: "recipe-detail", path: "/ja/recipes/misoshiru"},
  {
    name: "compare",
    path: "/ja/compare?ids=product-kayanoya-dashi,product-vegetable-dashi,product-niboshi-dashi"
  },
  {name: "survey", path: "/ja/survey"},
  {name: "favorites", path: "/ja/favorites"}
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

// 440px は iPhone 16/17 Pro Max の幅。ここでシェルの letterbox が
// 墨色の帯として露出していたため、回帰しないよう検証幅に含める。
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

// スマホ幅では全幅、640px 以上でのみ額装される、という前提を固定する。
test("shell is full width on phones and framed only on desktop", async ({
  page
}) => {
  for (const width of [360, 390, 430, 440, 639]) {
    await page.setViewportSize({width, height: 844});
    await page.goto("/ja/store");
    const shell = await page
      .locator(".mobile-shell")
      .evaluate((node) => node.getBoundingClientRect().width);
    expect(shell, `shell should fill the viewport at ${width}px`).toBe(width);
  }

  await page.setViewportSize({width: 1280, height: 900});
  await page.goto("/ja/store");
  const framed = await page.locator(".mobile-shell").evaluate((node) => {
    const shellRect = node.getBoundingClientRect();
    const nav = document.querySelector('nav[aria-label="Primary"]');
    const navRect = nav?.getBoundingClientRect();
    return {
      width: shellRect.width,
      navWidth: navRect?.width ?? 0,
      navLeft: navRect?.left ?? 0,
      left: shellRect.left
    };
  });
  expect(framed.width).toBeLessThan(1280);
  // 固定要素がシェルとぴったり重なっていないとナビと CTA が本体からずれる
  expect(framed.navWidth).toBe(framed.width);
  expect(framed.navLeft).toBe(framed.left);
});
