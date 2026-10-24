import {expect,Locator, Page} from '@playwright/test';

export class SecureAreaPage {
    readonly logoutLink: Locator;
    readonly flashMessage: Locator;

    constructor (private page: Page) {
        this.logoutLink = page.getByRole('link', { name: /logout/i });
        this.flashMessage = page.locator('#flash');
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/secure/);
        await expect(this.flashMessage).toContainText('You logged into a secure area!');
        await expect(this.logoutLink).toBeVisible();
    }

    async logout() {
        await this.logoutLink.click();

    }
}