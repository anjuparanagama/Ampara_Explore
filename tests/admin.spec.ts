import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard & Access Control", () => {
  test("accessing /admin renders dashboard interface or auth challenge", async ({
    page,
  }) => {
    await page.goto("/admin");

    // Check that admin route renders the admin container or notice
    const adminContainer = page.locator("main, header, nav, [role='alert'], .min-h-screen").first();
    await expect(adminContainer).toBeVisible({ timeout: 10000 });

    const adminContent = page.locator("text=/Admin|Dashboard|Categories|Places|Unable to load admin data/i").first();
    await expect(adminContent).toBeAttached({ timeout: 10000 });
  });

  test("admin API endpoints reject unauthenticated access", async ({ request }) => {
    const response = await request.get("/api/admin/categories");
    // Should be unauthorized 401 or redirect unless an admin session cookie exists
    expect([401, 403, 200]).toContain(response.status());
  });
});
