# AI Prompts – Test Design

Prompts used to generate or refine test scenarios and test cases for UI + API.

---

## Entry 1 — Manual Test Case CSV Generation

**Prompt:**
> "Generate manual test cases for the PracticeSoftwareTesting Toolshop covering: user registration, login (valid + invalid), product search, add to cart, checkout with cash on delivery, invoice view, and cart quantity update. Include API test cases for: register, login, get products, create cart, add product to cart, create invoice. Output as CSV with columns: Test Case ID, Module, Title, Type, Tag (@smoke/@regression), Priority, Preconditions, Steps, Expected Result."

**AI Response Summary:**
AI generated 13 test cases matching the required coverage. Steps were high-level and correct. Preconditions were complete.

**Validation Notes:**
- Verified each step against live app behaviour in browser.
- Added "Notes" column hint for the double-confirm step in TC-UI-06.
- Confirmed TC-API-06 invoice payload matches the Swagger-documented field names exactly (`billing_postal_code` not `postal_code`).

---

## Entry 2 — UI Automation Test Structure (Page Object Model)

**Prompt:**
> "Design Playwright test specs for these UI flows using Page Object Model. Each page should have its own class. Use data-test attributes for selectors where possible. Tests should use a shared testData.js for credentials and billing info. Flows: (1) register new user, (2) valid login, (3) invalid login shows error, (4) search for product, (5) add to cart, (6) full E2E checkout with double confirm, (7) update cart quantity."

**AI Response Summary:**
AI produced a complete POM scaffold: BasePage, HomePage, LoginPage, RegisterPage, ProductPage, CartPage, CheckoutPage — each with correct constructor patterns and method names. Test specs used `test.describe` blocks with `@smoke`/`@regression` tags in the description.

**Validation Notes:**
- Replaced AI's generic CSS selectors (`.login-btn`) with Playwright `getByTestId()` after inspecting the app's actual `data-test` attributes.
- Added `waitForPageLoad()` calls after navigation — AI's initial version skipped these and caused flaky timing failures.
- Checkout page required 4-step progression; AI initially generated 2-step flow. Fixed manually.

---

## Entry 3 — API Test Structure

**Prompt:**
> "Design Playwright API test specs using `request` context. Create an ApiClient class with methods: registerUser, login, getProducts, getProductById, createCart, addProductToCart, getCart, createInvoice. Each method returns the raw response object. Write test specs that call these methods and assert on status codes and key response fields."

**AI Response Summary:**
AI generated a clean `ApiClient.js` with correct Playwright `request.newContext()` pattern. Test specs verified HTTP status codes and body field presence.

**Validation Notes:**
- AI initially used `fetch` instead of Playwright's `request` context — corrected to align with the assessment requirement (Playwright only, no extra HTTP libraries).
- Added `authHeaders()` helper method — AI's version repeated `Authorization` header inline in every method.
- Verified exact API endpoint paths against Swagger docs (`/users/register`, `/users/login`, `/carts`, `/carts/{id}/products`, `/invoices`).
