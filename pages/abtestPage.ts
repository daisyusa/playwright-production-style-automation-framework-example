import {expect,Locator, Page} from '@playwright/test';

export default class AbtestPage {
    readonly heading: Locator;
    readonly paragraph: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.locator('.example h3');
        this.paragraph = page.locator('.example p');
    }

    async open() {
        await this.page.goto('/abtest');
    }

    async verifyHeading(text: string | RegExp) {
        await expect(this.heading).toHaveText(text);
    }

    async verifyParagraph(text: string) {
        await expect(this.paragraph).toContainText(text);
    }

    async verifyHeadingIsVisible() {
        await expect(this.heading).toBeVisible();
    }
}