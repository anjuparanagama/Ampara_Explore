import { test, expect } from "@playwright/test";

test.describe("Attraction Details Page & Gallery Lightbox", () => {
  test("navigates to attraction details from home page", async ({ page }) => {
    await page.goto("/");

    const destinationsSection = page.locator("#destinations");
    await expect(destinationsSection).toBeVisible({ timeout: 15000 });

    const detailLink = destinationsSection.locator('a[href^="/attraction/"]').first();
    await expect(detailLink).toBeAttached({ timeout: 15000 });

    const attractionUrl = await detailLink.getAttribute("href");
    expect(attractionUrl).toBeTruthy();

    await page.goto(attractionUrl!);
    await page.waitForURL(/\/attraction\/.+/, { timeout: 15000 });

    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
  });

  test("attraction details direct route and gallery lightbox interaction", async ({
    page,
  }) => {
    await page.goto("/");
    const detailLink = page.locator('#destinations a[href^="/attraction/"]').first();
    await expect(detailLink).toBeAttached({ timeout: 15000 });
    const href = await detailLink.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    await page.waitForURL(/\/attraction\/.+/, { timeout: 15000 });

    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });

    const galleryItem = page.locator('button:has(.lucide-maximize-2), div.cursor-pointer:has(img)').first();
    if (await galleryItem.isVisible()) {
      await galleryItem.click();

      const lightboxModal = page.locator('.fixed.inset-0.z-50, div[role="dialog"]');
      await expect(lightboxModal.first()).toBeVisible({ timeout: 5000 });

      await page.keyboard.press("Escape");
      await expect(lightboxModal.first()).toBeHidden({ timeout: 5000 });
    }
  });

  test("displays friendly error message for non-existent destination URL", async ({
    page,
  }) => {
    await page.goto("/attraction/non-existent-place-slug-xyz");
    const notFoundHeading = page.getByText(/Destination Not Found|not found|Unable to load/i);
    await expect(notFoundHeading.first()).toBeVisible({ timeout: 15000 });
  });
});
