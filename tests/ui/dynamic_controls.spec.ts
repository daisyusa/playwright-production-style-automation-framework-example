import {test, expect} from '@playwright/test';


test.describe('Dynamic Controls Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/dynamic_controls');
    });
    
    test('Should enable and disable checkbox @smoke', async ({ page }) => {
        test.info().annotations.push({ type: 'smoke', description: 'Positive test for enabling and disabling checkbox @smoke' });

        const checkbox = page.locator('#checkbox-example input[type="checkbox"]');
        // Enable checkbox
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        // Disable checkbox
        await checkbox.uncheck();
        await expect (checkbox).not.toBeChecked();
    });

    test('Should remove and add checkbox @regression', async ({ page }) => {
        test.info().annotations.push({ type: '@regression', description: 'Regression test for removing and adding checkbox @regression' });

        const checkbox = page.locator('#checkbox');
        const message = page.locator('#message');
        const toggleButton = page.locator('#checkbox-example button');

        // Remove checkbox
        await toggleButton.click();
        await expect(checkbox).toBeHidden();
        await expect(message).toHaveText('It\'s gone!');

        // Add checkbox back
        await toggleButton.click();
        await expect(checkbox).toBeVisible();
        await expect(message).toHaveText('It\'s back!');
    });
    
    test('Should enable and disable input field @regression', async ({ page }) => {
        test.info().annotations.push({ type: '@regression', description: 'Regression test for enabling and disabling input field @regression' });

        const inputField = page.locator('#input-example input');
        const toggleButton = page.locator('#input-example button');
        
        // Enable input field
        await toggleButton.click();
        await expect(inputField).toBeEnabled();

        //Type text into the input field
        await inputField.fill('Test input');
        await expect(inputField).toHaveValue('Test input');

        // Disable input field
        await toggleButton.click();
        await expect(inputField).toBeDisabled();
        await expect(inputField).toHaveValue('Test input'); // Ensure the value remains unchanged after disabling

    });
});