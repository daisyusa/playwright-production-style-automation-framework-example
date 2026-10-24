import { Locator, Page } from '@playwright/test';

export default class DragAndDropPage {
  readonly heading: Locator;
  readonly columnA: Locator;
  readonly columnB: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Drag and Drop' });
    this.columnA = page.locator('#column-a');
    this.columnB = page.locator('#column-b');
  }

  async open() {
    await this.page.goto('/drag_and_drop');
  }

  async dragColumnAToB() {
    await this.columnA.dragTo(this.columnB);
  }
}
