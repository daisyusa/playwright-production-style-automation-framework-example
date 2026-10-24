import { test, expect } from "@playwright/test";


/*"page.once(event, listener): This is the event listener pattern in Node.js/Playwright.
 'once' means that this listener will only execute one time.
  Once it detects and handles a single popup, it will automatically destroy itself 
  and will not affect any subsequent popups."
*/

test.describe("JS Alerts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  });

  test.describe("JS Alert button", () => {
    test("OK @smoke", async ({ page }) => {
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");
        await dialog.accept();
      });
      await page.click("text=Click for JS Alert");
      await expect(page.locator("#result")).toHaveText ("You successfully clicked an alert");
    });
  });

  test.describe("JS Confirm button", () => {
    test("OK @regression", async ({ page }) => {
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");
        await dialog.accept();
      });
      await page.click("text=Click for JS Confirm");
      await expect(page.locator("#result")).toHaveText("You clicked: Ok");
    });

    test("Cancel @regression", async ({ page }) => {
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("I am a JS Confirm");
        await dialog.dismiss();
      });
      await page.click("text=Click for JS Confirm");
      await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
    });
  });

  test.describe("JS Prompt button", () => {
    test("OK with input @regression", async ({ page }) => {
      const inputText = "Playwright Test";
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");
        await dialog.accept(inputText);
      });
      await page.click("text=Click for JS Prompt");
      await expect(page.locator("#result")).toHaveText(`You entered: ${inputText}`);
    });

    test("Cancel @regression", async ({ page }) => {
      page.once("dialog", async (dialog) => {
        expect(dialog.type()).toBe("prompt");
        expect(dialog.message()).toBe("I am a JS prompt");
        await dialog.dismiss();
      });
      await page.click("text=Click for JS Prompt");
      await expect(page.locator("#result")).toHaveText("You entered: null");
    });
  });
});
