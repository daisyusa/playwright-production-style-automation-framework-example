// Verify that user can input numbers


import {test, expect} from '@playwright/test';

test.describe('Inputs (type=number) - @smoke @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/inputs');
  });

  test('sets value to 10 when user types 10 - @smoke', async ({ page }) => {
    const input = page.locator('input[type="number"]');

    await input.fill('10');

    await expect(input).toHaveValue('10');
  });

  test('increments value from 10 to 11 when ArrowUp key is pressed - @regression', async ({ page }) => {
    const input = page.locator('input[type="number"]');

    await input.fill('10');
    await input.press('ArrowUp');

    await expect(input).toHaveValue('11');
  });

  test('decrements value from 10 to 9 when ArrowDown key is pressed - @regression', async ({ page }) => {
    const input = page.locator('input[type="number"]');

    await input.fill('10');
    await input.press('ArrowDown');

    await expect(input).toHaveValue('9');
  });
});