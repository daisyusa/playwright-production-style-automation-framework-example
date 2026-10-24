// tests/login/login.spec.ts
import { test } from "@playwright/test";
import { flashMessages, LoginPage } from "../../pages/loginPage";
import { invalidLoginCases } from "../../test-data/login.data";

test.describe("Login page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
      throw new Error(
        "Missing TEST_USERNAME or TEST_PASSWORD. Set them in .env or .dotenv/config/.env to run UI login tests."
      );
    }

    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
  });

  // ============================
  // Valid login + logout (smoke)
  // ============================
  test('@smoke - User can log in with valid credentials', async () => {
    const secureAreaPage = await loginPage.login(
      process.env.TEST_USERNAME!,
      process.env.TEST_PASSWORD!,
    );

    // verify secure area page loaded
    await secureAreaPage.verifyPageLoaded?.(); // optional, if your SecureAreaPage has it
    await loginPage.verifyFlashMessage(flashMessages.LOGIN_SUCCESS);

    // logout after successful login
    await secureAreaPage.logout();
    await loginPage.verifyPageLoaded();
    await loginPage.verifyFlashMessage(flashMessages.LOGOUT_SUCCESS);
  });

  // ============================
  // Data-driven invalid login tests
  // ============================
  test.describe("Invalid login", () => {
    invalidLoginCases.forEach(({ name, username, password, expectedMessage }) => {
      test(`${name} login test`, async () => {
        // no SecureAreaPage returned, just verify flash
        await loginPage.login(username, password);
        await loginPage.verifyFlashMessage(expectedMessage);
      });
    });
  });
});