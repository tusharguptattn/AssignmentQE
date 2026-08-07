# AI Prompts – Requirements and Planning

Prompts used for understanding the Toolshop flow, identifying risks, and drafting the test plan.

---

## Entry 1 — Understanding the SUT

**Prompt:**
> "I am testing an e-commerce web app at https://practicesoftwaretesting.com. It also has a REST API at https://api.practicesoftwaretesting.com. The app supports user registration, login, product search, cart management, checkout with Cash on Delivery, and invoice generation. The key quirk is: the Confirm button must be pressed TWICE to generate an invoice. Give me a risk-based test scope covering UI flows, API flows, positive, negative, and edge scenarios."

**AI Response (Summary):**
AI produced a risk-prioritised list: auth flows (high risk — security + access), checkout/invoice (critical path — revenue), cart operations (medium risk — data integrity), product search (low risk — read-only). Also flagged: session expiry, concurrent cart updates, and the double-confirm as a known defect/quirk to explicitly cover.

**Validation Notes:**
Manually browsed the app to confirm the flows exist. Verified the double-confirm behaviour. Added "search with no results" and "registration with duplicate email" as edge cases AI missed.

---

## Entry 2 — Test Planning: Smoke vs Regression Classification

**Prompt:**
> "Classify these flows into @smoke (fast, critical path, run on every PR) and @regression (full coverage, run nightly): Registration, Valid Login, Invalid Login, Product Search, Add to Cart, E2E Checkout + Invoice, Cart Quantity Update, API Register, API Login valid/invalid, API Get Products, API Cart + Invoice."

**AI Response (Summary):**
- Smoke: Registration, Valid Login, Product Search, Add to Cart, API Register, API Login (valid), API Get Products.
- Regression: Invalid Login, E2E Checkout, Cart Update, API Login (invalid), API Cart + Invoice lifecycle.

**Validation Notes:**
Agreed with classification. Moved E2E Checkout to regression since it is slow (full flow) — correct call. Invalid login is regression because it's a negative path, not critical-path blocking.

---

## Entry 3 — Risk Identification

**Prompt:**
> "What are the top 5 risks for a practice e-commerce testing app with public demo accounts? Consider test isolation, data cleanup, and shared state."

**AI Response (Summary):**
1. Shared user state — multiple test runs using same account simultaneously can conflict.
2. Product inventory state — if products run out of stock, add-to-cart tests fail.
3. Invoice generation quirk — double confirm; automation must explicitly handle.
4. Token expiry — bearer tokens in API tests should be fetched fresh per test.
5. Email uniqueness — registration tests must use timestamp-based emails.

**Validation Notes:**
All 5 risks addressed in implementation. Used `Date.now()` timestamp in emails. Each API test creates its own `ApiClient` instance with fresh login.
