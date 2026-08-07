# Project Info — QA AI Practical Assessment

**Primary AI Tool(s) Used:** Cursor (with Claude Sonnet 4.6 for automation code; Auto/Composer for planning and docs)

**Application Under Test:** PracticeSoftwareTesting Toolshop — https://practicesoftwaretesting.com

**API Under Test:** https://api.practicesoftwaretesting.com/api/documentation

**Assessment Start Date:** 2026-08-06 | **Submission Date:** 2026-08-07

---

## Project Summary

Tested the PracticeSoftwareTesting Toolshop e-commerce application end-to-end, covering user registration/login, product search, cart management, and the full checkout → invoice generation flow (including the double-confirm behaviour). Also built an API automation layer covering user auth, product retrieval, cart lifecycle, and invoice generation.

---

## Tools Used

| Category | Tool |
|---|---|
| Automation Framework | Playwright (Node.js) — Prism/POM structure |
| AI Assistant | Cursor (Sonnet 4.6 for code, Auto for planning/docs) |
| Browser | Chromium (headless) |
| API Testing | Playwright `request` context |
| Test Data | Centralised `testData.js` with timestamp-based unique emails |
| Version Control | Git (iterative commits per phase) |
| Reporting | Playwright HTML Reporter |

---

## Setup Summary

### 1. How I Provided Project & SUT Context to AI

- Uploaded the full PDF assessment document to Cursor at session start.
- Provided the SUT URL, API docs URL, and the double-confirm quirk as explicit context before generating any code.
- Created a `testData.js` with all domain-specific values (billing address, credentials, API base URL) and referenced it as context in every automation prompt.

### 2. How I Used AI for Requirement Analysis

- Prompted Cursor to extract acceptance criteria from the PDF into a structured list (AC1, AC2 per flow).
- Asked AI to identify edge cases not explicitly listed (e.g., duplicate registration, empty cart checkout, invalid token).
- Cross-referenced AI output against the API Swagger docs manually before finalising scope.

### 3. How AI Was Used for Test Planning & Strategy

- Used AI to categorise test cases as Smoke vs Regression based on business criticality.
- Smoke = login, registration, product search, add to cart (fast, core path).
- Regression = negative login, cart update, full E2E checkout, API lifecycle flow.
- AI helped identify that API tests do not require browser, so they can run faster and in parallel with UI smoke tests.

### 4. How AI Was Used for Manual Test Case Design

- Prompted AI with: "Generate manual test cases for a Toolshop ecommerce app covering login, registration, product search, cart, checkout, and invoice. Include positive, negative, and edge scenarios. Output as CSV with columns: ID, Module, Title, Type, Tag, Priority, Preconditions, Steps, Expected Result."
- Validated AI output against actual application behaviour in browser.
- Added the double-confirm step manually after observing it in the app — AI initially missed it.

### 5. How AI Was Used for Automation Design

- Used Page Object Model (Prism pattern): each page has its own class extending `BasePage`.
- API calls encapsulated in `ApiClient.js` — one method per endpoint.
- AI generated initial page object skeletons; I refined selectors by inspecting the live app's `data-test` attributes.
- Centralised `testData.js` keeps all test data separate from test logic.

### 6. How I Validated and Refined AI-Generated Test Cases & Scripts

- Ran every generated test locally; fixed selector mismatches and timing issues.
- Reviewed AI assertions — replaced overly generic assertions with specific ones (e.g., checking `access_token` type and length, not just presence).
- Compared AI-generated test steps against actual UI flow in browser to catch missed steps (e.g., checkout requires 4 sub-steps).

### 7. How AI Was Used for Test Data Generation

- Prompted: "Generate realistic billing address data for an ecommerce checkout with fields: street, city, state, country, postal_code."
- Used timestamp suffix on emails to guarantee uniqueness per run: `qatest+{Date.now()}@mailinator.com`.
- API invoice payload verified against Swagger docs to match exact field names.

### 8. How AI Was Used for Debugging Failing Tests

- Pasted failing error output into Cursor chat with the question: "Why is this Playwright selector failing?"
- AI identified that `data-test` attributes differ from `id` or `class` selectors — switched to `getByTestId()`.
- For the invoice step, AI suggested waiting for `networkidle` after the second confirm — resolved flaky failure.

### 9. What I Avoided Sharing with AI Tools

- No real user passwords or production credentials shared.
- Test data uses mailinator/disposable emails and the app's public demo accounts only.
- No company-internal system URLs, tokens, or proprietary data passed to AI.

### 10. How This QA Workflow Would Be Reused on a Real Project

1. Maintain a `testData.js` (or JSON/env file) per environment — dev/staging/prod.
2. Extend `BasePage` with project-specific helpers (e.g., authentication fixture).
3. Add CI/CD pipeline step: `npm run test:smoke` on every PR, `npm run test:regression` nightly.
4. Archive AI prompt history in `ai-prompts/` as living documentation for onboarding.
5. Use Playwright's `--reporter=html` output as the execution evidence artefact in sprint reports.
