import {expect, test} from "@playwright/test";

test("@regression A/B Testing displays an available variation", async ({ page }) => {
    await page.goto("/abtest");
    const heading = page.locator('.example h3');
    const paragraph = page.locator('.example p');

    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/^(A\/B Test Control|A\/B Test Variation \d+|No A\/B Test)$/);
    await expect(paragraph).toContainText('Also known as split testing.');
});