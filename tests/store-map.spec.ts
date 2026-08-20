import {expect, test} from "@playwright/test";

test("a map pin opens the product story directly", async ({page}) => {
  await page.goto("/en");

  const pin = page.getByRole("button", {
    name: "Open product: Kayanoya Dashi"
  });
  await expect(pin).toBeVisible();
  await pin.click();

  // カードを挟まず、ものがたり画面へ直接遷移する
  await expect(page).toHaveURL(/\/en\/products\/kayanoya-dashi$/);
  await expect(page.locator('div[aria-live="polite"]')).toHaveText(
    /01\s*\/\s*06/
  );
});

test("switches language from the header pill", async ({page}) => {
  await page.goto("/ja");

  await page.getByRole("button", {name: "言語を変更"}).click();
  await page.getByRole("option", {name: /English/}).click();

  await expect(page).toHaveURL(/\/en$/);
  await expect(
    page.getByRole("button", {name: "Open product: Kayanoya Dashi"})
  ).toBeVisible();
});

test("offers French and keeps the selected locale", async ({page}) => {
  await page.goto("/ja");

  await page.getByRole("button", {name: "言語を変更"}).click();
  await expect(page.getByRole("option", {name: /Français/})).toBeVisible();
  await page.getByRole("option", {name: /Français/}).click();

  await expect(page).toHaveURL(/\/fr$/);
  await page.getByRole("button", {name: /Open product|Ouvrir le produit/}).first().click();
  await expect(page).toHaveURL(/\/fr\/products\/kayanoya-dashi$/);
});

test("story counter follows the scroll position", async ({page}) => {
  await page.goto("/ja/products/kayanoya-dashi");

  const counter = page.locator('[aria-live="polite"]');
  await expect(counter).toHaveText(/01\s*\/\s*07/);

  // ハイドレーション前は scrollHeight がビューポート高のままなので、
  // 本文が展開されてから末尾へスクロールする。画像読込で高さが伸びても
  // 追従できるよう、成功するまでスクロールし直す。
  await expect(async () => {
    await page.evaluate(() =>
      window.scrollTo({top: document.body.scrollHeight, behavior: "instant"})
    );
    await expect(counter).toHaveText(/07\s*\/\s*07/, {timeout: 1000});
  }).toPass({timeout: 10_000});
});
