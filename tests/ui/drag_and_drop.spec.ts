import { expect, test } from '@playwright/test';
import DragAndDropPage from '../../pages/dragAndDropPage';

test('@regression Drag and Drop swaps the two columns', async ({ page }) => {
  const dragAndDropPage = new DragAndDropPage(page);

  await dragAndDropPage.open();
  await expect(dragAndDropPage.heading).toBeVisible();
  await expect(dragAndDropPage.columnA).toContainText('A');
  await expect(dragAndDropPage.columnB).toContainText('B');

  await dragAndDropPage.dragColumnAToB();

  await expect(dragAndDropPage.columnA).toContainText('B');
  await expect(dragAndDropPage.columnB).toContainText('A');
});
