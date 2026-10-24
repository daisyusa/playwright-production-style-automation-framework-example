# Playwright UI Automation Framework
[![Playwright Tests](https://github.com/daisyusa/playwright-production-style-automation-framework-example/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/daisyusa/playwright-production-style-automation-framework-example/actions/workflows/playwright.yml)

**Project Strategy & Evolution**
Built as a production-style framework to demonstrate modern Playwright/TS automation practices. Focused on stabilizing mission-critical smoke tests for enterprise analytics platforms. It demonstrates a transition from initial core-flow validation to a fully scalable architecture, utilizing **Page Object Model (POM)** and data-driven patterns to handle complex web behaviors. The primary objective is to prove **CI/CD readiness** and maintainable automation design, ensuring high-confidence releases with minimal manual intervention.

Target Free Demo Applications:  
👉 UI https://the-internet.herokuapp.com/
👉 API https://jsonplaceholder.typicode.com

---

## Tech Stack

- Playwright (JavaScript/TypeScript)
- Node.js
- Page Object Model (POM)
- Data-Driven Testing
- GitHub Actions (CI)
- Playwright HTML reports

---

## Test Coverage

**Auth**

- Valid login and logout (`@smoke`)
- Invalid username / invalid password / empty fields (data-driven, `@regression`)

**UI Components**

- Dropdown selection and value verification (`@regression`)
- Checkbox default state and independent toggling (`@smoke`, `@regression`)
- Add/Remove Elements — dynamic DOM assertions (`@smoke`, `@regression`)
- Dynamic Controls — enable/disable checkbox and input (`@smoke`, `@regression`)
- Hover interactions — user info visibility (`@regression`)
- Number inputs — keyboard interaction (ArrowUp/ArrowDown) (`@smoke`, `@regression`)
- JS Alerts, Confirms, and Prompts — dialog handling (`@smoke`, `@regression`)
- A/B Testing — validates the displayed variation, both directly and through the page object (`tests/ui/abtest_control.spec.ts`, `tests/ui/abtest_control_POM.spec.ts`, `@regression`)
- Drag and Drop — swaps columns using the page object (`tests/ui/drag_and_drop.spec.ts`, `@regression`)
- Additional The Internet examples — page-response checks and focused interactions for authentication, context menus, file upload, frames, geolocation, keyboard input, sliders, tables, and windows (`tests/ui/additional_examples.spec.ts`, `@regression`)

**API**

- GET a post and filter posts by user
- POST, PATCH, and DELETE example requests using [JSONPlaceholder](https://jsonplaceholder.typicode.com)

---

## Project Structure

```bash
pages/        → Page Objects (UI interactions only)
tests/        → Test logic and assertions
test-data/    → Centralized test data
utils/        → Helpers and shared logic
.github/      → CI configuration (GitHub Actions)
```

## Framework Design Principles

### Page Object Model (POM)

Separates test logic from UI interactions for maintainability and reuse.

### Data-driven approach

Enables easy expansion of test scenarios without duplicating code.

### Stable selector strategy

Preference for semantic locators such as getByLabel() to improve test stability and resilience to UI changes.

### Test tagging

Supports selective execution using tags such as @smoke and @regression.

## Authentication Approaches

The demo application does **not persist login sessions across browser contexts**. The framework supports two ways to authenticate UI tests:

1. **Log in within each test (current setup).** Tests such as the login smoke test use the login page directly, so they start unauthenticated and exercise the login flow themselves. This is the default with the current Playwright configuration.
2. **Reuse a saved login state (optional setup).** `global-setup.mjs` can log in once and save the browser context's authentication state to `auth.json`. To use this approach, enable `globalSetup: './global-setup.mjs'` in `playwright.config.ts` and set `storageState: 'auth.json'` on the UI project's `use` configuration. Playwright will then load that state into each UI test's browser context. The `auth.json` file is gitignored and should not be committed.

The global setup is kept in the repository as an alternative; it is **not enabled by default**. Keep the per-test login approach when tests need to verify authentication behavior, and use saved state when tests need to begin already logged in.

### API Test Service

The API examples use [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free public fake REST API that requires no signup, API key, or test account. Its POST, PATCH, and DELETE endpoints return simulated responses; they do not persist created, updated, or deleted resources. Set `API_BASE_URL` to use a compatible API endpoint instead. API tests can run independently of the UI login credentials:

```bash
npx playwright test --project=api
```

### Continuous Integration

- Automated execution via GitHub Actions
- Fails fast on regressions
- Generates Playwright HTML reports on test completion

### Running Tests Locally

#### Install dependencies:

```bash
npm install
```

#### Run all tests:

```bash
npx playwright test
```

#### Run in headed mode:

```bash
npx playwright test --headed
```

#### Debug mode:

```bash
npx playwright test --debug
```

Run a specific test:

```bash
npx playwright test dropdown.spec.ts
```

### Sample Test

```typescript
test("@regression Login with invalid credentials", async () => {
  await loginPage.login("wrongUser", "wrongPass");
  await loginPage.verifyFlashMessage("Your username is invalid!");
});
```

## Purpose of This Repository

This repository serves as a **production-style automation framework** demonstrating:

- Scalable UI test architecture
- Maintainable Playwright design patterns
- CI-integrated automated testing
- Senior-level automation practices
