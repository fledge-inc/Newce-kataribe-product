import {expect, test} from "@playwright/test";

test("opens a product from a store-map pin", async ({page}) => {
  await page.goto("/en/store");

  const pin = page.getByRole("button", {
    name: "Open product: Kayanoya Dashi"
  });
  await expect(pin).toBeVisible();
  await pin.click();

  const sheet = page.getByRole("complementary", {name: "Kayanoya Dashi"});
  await expect(sheet).toBeVisible();
  await expect(sheet.getByText("Dashi & Seasoning corner")).toBeVisible();

  const details = sheet.getByRole("link", {name: "View product details"});
  await expect(details).toHaveAttribute(
    "href",
    "/en/products/kayanoya-dashi"
  );
});

test("closes the product sheet and returns to the map", async ({page}) => {
  await page.goto("/en/store");
  await page
    .getByRole("button", {name: "Open product: Kayanoya Dashi"})
    .click();

  await page.getByRole("button", {name: "Back to map"}).click();
  await expect(
    page.getByRole("complementary", {name: "Kayanoya Dashi"})
  ).toBeHidden();
});
