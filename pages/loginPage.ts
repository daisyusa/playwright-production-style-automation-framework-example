import {expect, Locator, Page} from '@playwright/test';
import {SecureAreaPage} from './secureAreaPage';

export const flashMessages = {
    INVALID_USERNAME: 'Your username is invalid!',
    INVALID_PASSWORD: 'Your password is invalid!',
    LOGOUT_SUCCESS: 'You logged out of the secure area!',
    LOGIN_SUCCESS: 'You logged into a secure area!',
};

export const TestInputs = {
    INVALID_USERNAME: "WrongUsername",
    INVALID_PASSWORD: "WrongPassword",
}

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly heading: Locator;
    readonly descriptionText: Locator
    readonly flashMessage: Locator


    constructor (private page: Page) {
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.heading = page.getByRole('heading', {name:'Login Page'});
        this.descriptionText = page.getByText('This is where you can log into the secure area.');
        this.flashMessage = page.locator('#flash');
    }

    async goto() {
        await this.page.goto('/login'); // will resolve against baseURL
    }
    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/login/i);
        await expect(this.heading).toBeVisible();
        await expect(this.descriptionText).toBeVisible();
    }

    async verifyFlashMessage(text: string) {
        await expect (this.flashMessage).toContainText(text); 
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new SecureAreaPage(this.page);
    }
}

