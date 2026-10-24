import { test, expect } from "@playwright/test";
import CheckboxesPage from '../../pages/checkboxesPage';

test.describe("Checkboxes", () => {
    /**@type {import('../../pages/CheckboxesPage.js').default} */ 
    let checkboxesPage;

  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.open();
  });

  test("Default State @smoke", async () => {
    await expect(checkboxesPage.boxes).toHaveCount(2); //asserting that there are two checkboxes
    await expect(checkboxesPage.first).not.toBeChecked();
    await expect(checkboxesPage.second).toBeChecked();
  });

  test("First checkbox toggles independently @regression", async () => {
    await checkboxesPage.checkFirst();
    await expect(checkboxesPage.first).toBeChecked();

    await checkboxesPage.uncheckFirst();
    await expect(checkboxesPage.first).not.toBeChecked();
  });

  test("Second checkbox toggles independetly @regression", async () => {
    await checkboxesPage.uncheckSecond();
    await expect(checkboxesPage.second).not.toBeChecked();

    await checkboxesPage.checkSecond();
    await expect(checkboxesPage.second).toBeChecked();
  });
});
