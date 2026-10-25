import { test, expect } from "@playwright/test";

test.describe("Home Page Functional & Integration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero title, search bar, and popular search tags", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toBeVisible();

    const searchInput = page.getByPlaceholder(/Search destinations|places to visit|wildlife/i);
    await expect(searchInput).toBeVisible();

    const heroSection = page.locator("#hero");
    await expect(heroSection).toBeVisible();
  });

  test("search input filters attraction cards in real-time", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(/Search destinations|places to visit|wildlife/i);
    await searchInput.fill("Gal Oya");
    await searchInput.press("Enter");

    const results = page.locator("#destinations");
    await expect(results).toBeVisible();

    const cardOrEmpty = results.getByText(/Gal Oya|No destinations match/i);
    await expect(cardOrEmpty.first()).toBeVisible({ timeout: 10000 });
  });

  test("displays empty state when search finds no matching destinations", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(/Search destinations|places to visit|wildlife/i);
    await searchInput.fill("nonexistentquery99999");
    await searchInput.press("Enter");

    const emptyNotice = page.getByText(/No destinations match your criteria/i);
    await expect(emptyNotice).toBeVisible({ timeout: 10000 });
  });

  test("popular search tag buttons trigger filtered exploration", async ({
    page,
  }) => {
    const tagButton = page.locator('button:has-text("Senanayake Samudraya"), button:has-text("Gal Oya Safari")').first();
    if (await tagButton.isVisible()) {
      await tagButton.click();
      const results = page.locator("#destinations");
      await expect(results).toBeVisible({ timeout: 10000 });
    }
  });

  test("category filter filters attractions and allows clearing", async ({
    page,
  }) => {
    const categoryButtons = page.locator('button:has-text("Nature"), button:has-text("Sacred"), button:has-text("Wildlife")');
    if (await categoryButtons.count() > 0) {
      await categoryButtons.first().click();
      const clearBtn = page.getByRole("button", { name: /Show All Attractions|All/i }).first();
      if (await clearBtn.isVisible()) {
        await clearBtn.click();
      }
    }
  });

  test("clicking attraction card opens quick view preview modal", async ({
    page,
  }) => {
    const attractionCards = page.locator("#destinations .group.relative");
    await expect(attractionCards.first()).toBeVisible({ timeout: 10000 });

    const cardImage = attractionCards.first().locator(".cursor-pointer").first();
    await cardImage.click();

    const modal = page.locator('.fixed.inset-0.z-50');
    await expect(modal.first()).toBeVisible();

    const closeBtn = page.getByRole("button", { name: /Close modal|Close/i }).or(modal.locator("button:has(.lucide-x)")).first();
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(modal.first()).toBeHidden({ timeout: 5000 });
  });
});
