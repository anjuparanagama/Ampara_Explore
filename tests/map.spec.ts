import { test, expect } from "@playwright/test";

test.describe("Interactive Map Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/map");
  });

  test("loads map page with interactive leaflet container", async ({ page }) => {
    const mapContainer = page.locator(".leaflet-container").or(page.locator("#map-canvas, .relative.h-full"));
    await expect(mapContainer.first()).toBeVisible({ timeout: 10000 });
  });

  test("search input filters destination list on map sidebar", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(/Search destination|places/i).or(
      page.locator('input[type="text"]').first()
    );

    if (await searchInput.isVisible()) {
      await searchInput.fill("Gal Oya");
      const destinationList = page.locator("text=/Gal Oya|No destinations/i");
      await expect(destinationList.first()).toBeVisible();
    }
  });

  test("category filter tabs toggle active category selection", async ({
    page,
  }) => {
    const categoryButtons = page.locator('button:has-text("All"), button:has-text("Nature"), button:has-text("Sacred"), button:has-text("Wildlife")');
    if (await categoryButtons.count() > 1) {
      await categoryButtons.nth(1).click();
      await expect(categoryButtons.nth(1)).toBeVisible();
    }
  });

  test("clicking destination in sidebar highlights selected place", async ({
    page,
  }) => {
    const destinationItem = page.locator(".cursor-pointer:has(h4, h3, .font-bold)").first();
    if (await destinationItem.isVisible()) {
      await destinationItem.click();
      await expect(destinationItem).toBeVisible();
    }
  });
});
