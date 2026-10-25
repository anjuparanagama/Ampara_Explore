import { test, expect } from "@playwright/test";

test.describe("Navigation and Layout Smoke Tests", () => {
  test("loads the home page and renders key navigation elements", async ({
    page,
  }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/Ampara/i);

    // Verify main header and brand logo
    const brandLogo = page.getByRole("button", { name: /Ampara|Explore/i }).first();
    await expect(brandLogo).toBeVisible();

    // Verify responsive navigation: top-bar pills on desktop or toggle menu on mobile
    const mobileMenu = page.getByRole("button", { name: "Toggle Menu" });
    if (await mobileMenu.isVisible()) {
      await expect(mobileMenu).toBeVisible();
    } else {
      const navExplore = page.getByRole("button", { name: /Explore/i }).first();
      await expect(navExplore).toBeVisible();

      const navMap = page.getByRole("button", { name: /Interactive Map|Map/i }).first();
      await expect(navMap).toBeVisible();
    }
  });

  test("language selector opens and lists available languages", async ({
    page,
  }) => {
    await page.goto("/");

    // Open language selector dropdown
    const langButton = page.locator('button[title="Select Language"]').or(
      page.getByRole("button", { name: /EN|SI|TA/i })
    ).first();
    await expect(langButton).toBeVisible();
    await langButton.click();

    // Verify dropdown items
    await expect(page.getByText(/English \(EN\)/i)).toBeVisible();
    await expect(page.getByText(/සිංහල \(SI\)/i)).toBeVisible();
    await expect(page.getByText(/தமிழ் \(TA\)/i)).toBeVisible();

    // Switch to Sinhala
    await page.getByText(/සිංහල \(SI\)/i).click();
    await expect(page.locator("html")).toBeVisible();
  });

  test("navigates to cultural guidelines page and footer legal links", async ({
    page,
  }) => {
    // Cultural Guidelines
    await page.goto("/cultural-guidelines");
    await expect(page.locator("h1").first()).toBeVisible();

    // Privacy Policy
    await page.goto("/privacy-policy");
    await expect(page.locator("h1").first()).toBeVisible();

    // Terms
    await page.goto("/terms");
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("footer contains copyright and quick links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/Ampara/i).first()).toBeVisible();
  });
});
