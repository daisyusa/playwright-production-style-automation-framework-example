import {expect, test} from "@playwright/test";
import AbtestPage from '../../pages/abtestPage';

test("@regression A/B testing Control", async ({ page }) => {
    const abtestPage = new AbtestPage(page);
    await abtestPage.open();
    await abtestPage.verifyHeadingIsVisible();
    await abtestPage.verifyHeading(/^(A\/B Test Control|A\/B Test Variation \d+|No A\/B Test)$/);
    await abtestPage.verifyParagraph('Also known as split testing.');
});