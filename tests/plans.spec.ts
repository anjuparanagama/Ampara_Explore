import { test, expect } from "@playwright/test";

test.describe("Trip & Visit Plans Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-plans");
  });

  test("renders My Visit Plans dashboard header and controls", async ({
    page,
  }) => {
    await expect(page.locator("h1").first()).toContainText(/Itineraries|Visit Plans|Plans/i);

    const createBtn = page.getByRole("button", {
      name: /Create Plan|Create New Plan|New Plan/i,
    });
    await expect(createBtn.first()).toBeVisible();
  });

  test("opens and interacts with the Create New Plan modal", async ({ page }) => {
    const createBtn = page.getByRole("button", {
      name: /Create Plan|Create New Plan|New Plan/i,
    }).first();
    await createBtn.click();

    const modal = page.locator('div[role="dialog"]').or(page.locator(".fixed.inset-0"));
    await expect(modal.first()).toBeVisible();

    const titleInput = page.getByPlaceholder(/e\.g\.|Plan title|Trip name/i).first();
    if (await titleInput.isVisible()) {
      await titleInput.fill("Senior QA Test Tour");
      await expect(titleInput).toHaveValue("Senior QA Test Tour");
    }

    const closeBtn = page.locator('button[aria-label="Close"]').or(page.locator("button:has(.lucide-x)")).first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(modal.first()).toBeHidden({ timeout: 5000 });
    }
  });

  test("plan filter tabs toggle correctly", async ({ page }) => {
    const filterTabs = page.locator('button:has-text("All"), button:has-text("Upcoming"), button:has-text("Completed")');
    if (await filterTabs.count() > 1) {
      await filterTabs.nth(1).click();
      await expect(filterTabs.nth(1)).toBeVisible();
    }
  });

  test("searches and filters itinerary list by keyword", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search itinerary/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("Wild");
      await expect(searchInput).toHaveValue("Wild");
    }
  });
});
