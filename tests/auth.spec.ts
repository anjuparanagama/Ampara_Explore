import { test, expect } from "@playwright/test";

test.describe("Authentication Workflows", () => {
  test.describe("Login Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/login");
      await expect(page.locator("h1")).toBeVisible();
    });

    test("renders all required login form controls", async ({ page }) => {
      await expect(page.locator("h1")).toContainText(/Sign in/i);

      // Input elements
      const emailInput = page.getByPlaceholder("you@example.com");
      const passwordInput = page.getByPlaceholder("Your password");
      const rememberCheckbox = page.getByRole("checkbox");
      const signInButton = page.locator('button[type="submit"]');

      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(rememberCheckbox).toBeVisible();
      await expect(signInButton).toBeVisible();
    });

    test("toggles password visibility", async ({ page }) => {
      const passwordInput = page.getByPlaceholder("Your password");
      await expect(passwordInput).toBeVisible();
      
      const toggleBtn = page.getByRole("button", {
        name: /Show password|Hide password/i,
      });
      await expect(toggleBtn).toBeVisible();

      await expect(passwordInput).toHaveAttribute("type", "password");
      await toggleBtn.click();
      await expect(passwordInput).toHaveAttribute("type", "text");
      await toggleBtn.click();
      await expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("displays error message on invalid credentials", async ({ page }) => {
      await page.getByPlaceholder("you@example.com").fill("nonexistent_user_999@test.com");
      await page.getByPlaceholder("Your password").fill("WrongPassword123!");
      await page.locator('button[type="submit"]').click();

      // Expect an error banner to appear
      const errorMessage = page.locator(".bg-rose-50, .text-rose-700, [role='alert']").or(
        page.getByText(/Invalid email or password|Unable to complete|Unable to sign you in/i)
      );
      await expect(errorMessage.first()).toBeVisible({ timeout: 15000 });
    });

    test("navigates to signup and forgot-password pages", async ({ page }) => {
      const forgotLink = page.getByRole("link", { name: /Forgot password\?/i });
      await expect(forgotLink).toHaveAttribute("href", "/forgot-password");

      const signUpLink = page.getByRole("link", { name: /Sign up/i }).first();
      await expect(signUpLink).toBeVisible();
    });
  });

  test.describe("Register Page", () => {
    test("renders registration form fields and validation", async ({ page }) => {
      await page.goto("/register");

      await expect(page.locator("h1")).toContainText(/Create your account|Sign up/i);

      const nameInput = page.getByPlaceholder("Your full name");
      const emailInput = page.getByPlaceholder("you@example.com");
      const passwordInput = page.getByPlaceholder("At least 8 characters");

      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
    });
  });

  test.describe("Forgot Password Page", () => {
    test("renders recovery wizard and request form", async ({ page }) => {
      await page.goto("/forgot-password");
      await expect(page.locator("h1, h2").first()).toBeVisible();
      await expect(page.getByRole("button", { name: /Send|Reset|Continue/i }).first()).toBeVisible();
    });
  });
});
