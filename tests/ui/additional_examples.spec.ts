import { expect, test } from '@playwright/test';

const examples = [
  { name: 'A/B Testing', path: '/abtest' },
  { name: 'Broken Images', path: '/broken_images' },
  { name: 'Canvas', path: '/canvas' },
  { name: 'Challenging DOM', path: '/challenging_dom' },
  { name: 'Disappearing Elements', path: '/disappearing_elements' },
  { name: 'Dynamic Content', path: '/dynamic_content' },
  { name: 'Dynamic Loading', path: '/dynamic_loading' },
  { name: 'Entry Ad', path: '/entry_ad' },
  { name: 'Exit Intent', path: '/exit_intent' },
  { name: 'File Download', path: '/download' },
  { name: 'File Upload', path: '/upload' },
  { name: 'Forgot Password', path: '/forgot_password' },
  { name: 'Frames', path: '/frames' },
  { name: 'Geolocation', path: '/geolocation' },
  { name: 'Infinite Scroll', path: '/infinite_scroll' },
  { name: 'JQuery UI Menus', path: '/jqueryui/menu' },
  { name: 'JavaScript onload event error', path: '/javascript_error' },
  { name: 'Large & Deep DOM', path: '/large' },
  { name: 'Large Form', path: '/large_form' },
  { name: 'Multiple Windows', path: '/windows' },
  { name: 'Notification Messages', path: '/notification_message' },
  { name: 'Redirect Link', path: '/redirector' },
  { name: 'Shifting Content', path: '/shifting_content' },
  { name: 'Slow Resources', path: '/slow' },
  { name: 'Subdirectories', path: '/subdirectories' },
  { name: 'Two-Factor Login', path: '/two_factor' },
  { name: 'Typos', path: '/typos' },
  { name: 'WYSIWYG Editor', path: '/tinymce' },
];

for (const example of examples) {
  test(`@regression ${example.name} example page loads`, async ({ page }) => {
    const response = await page.goto(example.path, { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

test('@regression Basic Auth accepts the published demo credentials', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  try {
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('#content')).toContainText('Congratulations');
  } finally {
    await context.close();
  }
});

test('@regression Digest Authentication accepts the published demo credentials', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  try {
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/digest_auth');
    await expect(page.locator('#content')).toContainText('Congratulations');
  } finally {
    await context.close();
  }
});

test('@regression Secure File Download is protected', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  try {
    const page = await context.newPage();
    const response = await page.goto('https://the-internet.herokuapp.com/download_secure');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  } finally {
    await context.close();
  }
});

test('@regression Context Menu opens a browser dialog on right-click', async ({ page }) => {
  await page.goto('/context_menu');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('You selected a context menu');
    await dialog.accept();
  });
  await page.locator('#hot-spot').click({ button: 'right' });
});

test('@regression Drag and Drop swaps the two columns', async ({ page }) => {
  await page.goto('/drag_and_drop');
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');

  await columnA.dragTo(columnB);

  await expect(columnA).toContainText('B');
  await expect(columnB).toContainText('A');
});

test('@regression Floating Menu remains available while scrolling', async ({ page }) => {
  await page.goto('/floating_menu');
  await page.locator('#page-footer').scrollIntoViewIfNeeded();

  await expect(page.locator('#menu')).toBeVisible();
});

test('@regression Horizontal Slider updates its displayed value', async ({ page }) => {
  await page.goto('/horizontal_slider');
  const slider = page.locator('input[type="range"]');

  await slider.focus();
  await slider.press('Home');
  for (let step = 0; step < 6; step += 1) {
    await slider.press('ArrowRight');
  }

  await expect(page.locator('#range')).toHaveText('3');
});

test('@regression Key Presses reports the key typed', async ({ page }) => {
  await page.goto('/key_presses');
  await page.locator('body').press('A');

  await expect(page.locator('#result')).toHaveText('You entered: A');
});

test('@regression Multiple Select Dropdown selects both options', async ({ page }) => {
  await page.goto('/multiple_dropdown');
  const select = page.locator('#multiple-dropdown');

  await select.selectOption(['1', '2']);

  await expect(select.locator('option:checked')).toHaveCount(2);
});

test('@regression Radio Buttons allows selecting an available option', async ({ page }) => {
  await page.goto('/radio_buttons');
  const radio = page.locator('input[type="radio"]:not([disabled])').first();

  await radio.check();

  await expect(radio).toBeChecked();
});

test('@regression Read-only Inputs cannot be edited', async ({ page }) => {
  await page.goto('/readonly');
  const input = page.locator('#always-readonly');

  await expect(input).toHaveAttribute('readonly', '');
  await expect(input).not.toBeEditable();
});

test('@regression Sortable Data Tables expose the expected table data', async ({ page }) => {
  await page.goto('/tables');

  await expect(page.locator('#table1')).toContainText('Smith');
  await expect(page.locator('#table1')).toContainText('John');
});

test('@regression Status Codes links to the requested response code', async ({ page }) => {
  await page.goto('/status_codes');
  await page.getByRole('link', { name: '200' }).click();

  await expect(page).toHaveURL(/\/status_codes\/200$/);
  await expect(page.locator('#content')).toContainText('200');
});

test('@regression Redirect Link redirects to the status codes example', async ({ page }) => {
  await page.goto('/redirector');
  await page.getByRole('link', { name: /here/i }).click();

  await expect(page).toHaveURL(/\/status_codes$/);
});

test('@regression Shadow DOM exposes its text through Playwright locators', async ({ page }) => {
  await page.goto('/shadowdom');

  await expect(page.locator('my-paragraph').first()).toContainText("Let's have some different text!");
});

test('@regression Subdirectories navigates to a nested path', async ({ page }) => {
  await page.goto('/subdirectories');
  await page.getByRole('link', { name: '/subdirectories/one' }).click();

  await expect(page).toHaveURL(/\/subdirectories\/one$/);
});

test('@regression Nested Frames render their frame content', async ({ page }) => {
  await page.goto('/nested_frames');

  await expect(page.frameLocator('frame[name="frame-bottom"]').locator('body')).toHaveText('BOTTOM');
});

test('@regression File Upload displays the uploaded filename', async ({ page }) => {
  await page.goto('/upload');
  await page.locator('#file-upload').setInputFiles({
    name: 'playwright-upload.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Playwright upload example'),
  });
  await page.locator('#file-submit').click();

  await expect(page.locator('#uploaded-files')).toHaveText('playwright-upload.txt');
});

test('@regression Dynamic Loading reveals the completed hidden element', async ({ page }) => {
  await page.goto('/dynamic_loading/2');
  await page.getByRole('button', { name: 'Start' }).click();

  await expect(page.locator('#finish h4')).toHaveText('Hello World!', { timeout: 15000 });
});

test('@regression Multiple Windows opens a new window', async ({ page }) => {
  await page.goto('/windows');
  const newPagePromise = page.context().waitForEvent('page');
  await page.getByRole('link', { name: 'Click Here' }).click();
  const newPage = await newPagePromise;

  await expect(newPage).toHaveURL(/\/windows\/new$/);
  await expect(newPage.locator('h3')).toHaveText('New Window');
});

test('@regression Geolocation displays the granted location', async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 37.422, longitude: -122.084 });
  await page.goto('/geolocation');
  await page.getByRole('button', { name: /where am i/i }).click();

  await expect(page.locator('#lat-value')).toHaveText('37.422');
  await expect(page.locator('#long-value')).toHaveText('-122.084');
});
