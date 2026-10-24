// What to test (high-signal, low-flake)
// 1) Add one element, then remove it
// Click Add Element
// Assert Delete button count = 1
// Click Delete
// Assert count = 0

// 2) Add N elements and verify count
// Click Add 5 times
// Assert count = 5
// This tests loops + locator collections cleanly.

// 3) Remove all elements and verify empty
// Add 3
// Remove all (loop over buttons)
// Assert count = 0

import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements - @regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
  });

  test('adds one element then removes it - @smoke', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteBtns = page.getByRole('button', { name: 'Delete' });

    await addBtn.click();
    await expect(deleteBtns).toHaveCount(1);

    await deleteBtns.first().click();
    await expect(deleteBtns).toHaveCount(0);
  });

  test('adds 5 elements and shows 5 delete buttons - @regression', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteBtns = page.getByRole('button', { name: 'Delete' });

    for (let i = 0; i < 5; i++) {
      await addBtn.click();
    }

    await expect(deleteBtns).toHaveCount(5);
  });

  test('removes all elements after adding 3 - @regression', async ({ page }) => {
    const addBtn = page.getByRole('button', { name: 'Add Element' });
    const deleteBtns = page.getByRole('button', { name: 'Delete' });

    for (let i = 0; i < 3; i++) {
      await addBtn.click();
    }
    await expect(deleteBtns).toHaveCount(3);

    // Remove all dynamically (don’t cache handles; DOM is changing)
    while (await deleteBtns.count()) {
      await deleteBtns.first().click();
    }

    await expect(deleteBtns).toHaveCount(0);
  });
});
