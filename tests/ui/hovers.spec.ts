// Verify that user info becomes visible when hovering over avatar image.

import { test, expect } from '@playwright/test';

test.describe('Hovers Feature', () => {
  test('type: @regression - user info appears on hover for all users', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    const avatars = page.locator('.figure');
    const count = await avatars.count();

    for (let i=0; i< count; i++) {
        const avatar = avatars.nth(i);
        const caption = avatar.locator('.figcaption');

        await avatar.hover();
        
        await expect (caption).toBeVisible();
        await expect (caption).toContainText(`name: user${i+1}`);
    }
  });
});
