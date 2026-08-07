# QA AI Practical Assessment — PracticeSoftwareTesting Toolshop

## Project Information

**Framework:** Playwright (Node.js) — Page Object Model (Prism Pattern)

**SUT (UI):** https://practicesoftwaretesting.com

**SUT (API):** https://api.practicesoftwaretesting.com

**AI Tool:** Cursor (Sonnet 4.6 for automation, Auto for planning/docs)

---

## Repository Structure

```
qa-ai-practical-assessment/
├── FunctionalTestCase.csv          # Manual test cases (all types)
├── project-info.md                 # AI workflow documentation
├── readme.md                       # This file
├── PrismStructure/                 # Playwright automation project
│   ├── playwright.config.js
│   ├── package.json
│   ├── pages/                      # Page Object Model classes
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── api/
│   │   └── ApiClient.js            # Reusable API helper (all endpoints)
│   ├── tests/
│   │   ├── ui/                     # UI automation specs (TC-UI-*)
│   │   └── api/                    # API automation specs (TC-API-*)
│   ├── test-data/
│   │   └── testData.js             # Centralised test data
│   └── reports/                    # Generated HTML + JSON reports
└── ai-prompts/                     # Prompt history per phase
    ├── requirements-and-planning.md
    ├── test-design.md
    ├── test-data.md
    ├── automation-and-debugging.md
    └── documentation-and-summary.md
```

---

## Setup & Prerequisites

- **Node.js** >= 18
- **npm** >= 9

```bash
cd PrismStructure
npm install
npx playwright install chromium
```

---

## Running Tests

### All Tests
```bash
cd PrismStructure
npm test
```

### Smoke Tests Only
```bash
npm run test:smoke
```

### Regression Tests Only
```bash
npm run test:regression
```

### UI Tests Only
```bash
npm run test:ui
```

### API Tests Only
```bash
npm run test:api
```

---

## Test Data

All test data lives in `PrismStructure/test-data/testData.js`.

| Field | Value |
|---|---|
| Existing user email | customer@practicesoftwaretesting.com |
| Existing user password | welcome01 |
| Search term | hammer |
| New user email | auto-generated with timestamp suffix |
| Billing country | TG (required by API) |

---

## Reports

Reports are generated in `PrismStructure/reports/`.

- **HTML report:** `reports/html-report/index.html`
- **JSON report:** `reports/results.json`

View HTML report:
```bash
npm run test:report
```

---

## Test Cases Summary

| ID | Title | Type | Tag |
|---|---|---|---|
| TC-UI-01 | User Registration | Functional | @smoke |
| TC-UI-02 | Valid Login | Functional | @smoke |
| TC-UI-03 | Invalid Login (negative) | Negative | @regression |
| TC-UI-04 | Product Search | Functional | @smoke |
| TC-UI-05 | Add Product to Cart | Functional | @smoke |
| TC-UI-06 | E2E Checkout + Invoice | E2E | @regression |
| TC-UI-07 | Cart Quantity Update | Functional | @regression |
| TC-API-01 | Register User via API | Functional | @smoke |
| TC-API-02 | Login via API (valid) | Functional | @smoke |
| TC-API-03 | Login via API (invalid) | Negative | @regression |
| TC-API-04 | Get Products List | Functional | @smoke |
| TC-API-05 | Get Product by ID | Functional | @regression |
| TC-API-06 | Cart + Invoice lifecycle | E2E | @regression |

**Important Note:** TC-UI-06 presses the Confirm button twice. This is the documented application behaviour — invoice is only generated after the second confirmation.

---

## Notes

- Tests run headless (Chromium) by default. Set `headless: false` in `playwright.config.js` to debug visually.
- API tests use Playwright's built-in `request` context — no additional HTTP library needed.
- Retries set to 0 locally, 1 on CI.
