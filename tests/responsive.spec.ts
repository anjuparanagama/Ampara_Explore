import { test, expect } from "@playwright/test";

test.describe("Mobile & Responsive Experience Tests", () => {
  // Run on mobile viewport
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile hamburger menu opens and displays navigation links", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate mobile menu toggle button
    const mobileMenuButton = page.getByRole("button", { name: "Toggle Menu" });
    await expect(mobileMenuButton).toBeVisible();

    // Open mobile menu
    await mobileMenuButton.click();

    // Verify mobile navigation links inside menu
    const mobileExplore = page.getByRole("button", { name: /Explore/i });
    await expect(mobileExplore.first()).toBeVisible();

    // Close mobile menu
    await mobileMenuButton.click();
  });

  test("hero section renders without horizontal overflow on mobile", async ({
    page,
  }) => {
    await page.goto("/");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    // Assert that the page does not horizontally overflow the mobile viewport
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });
});
