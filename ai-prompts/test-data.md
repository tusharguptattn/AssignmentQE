# AI Prompts – Test Data

Prompts used to generate test data for UI and API tests.

---

## Entry 1 — Billing Address Data

**Prompt:**
> "Generate a realistic billing address for an e-commerce checkout test. Fields needed: street, city, state, country (2-letter code), postal_code."

**AI Response Summary:**
AI proposed: `123 Main Street, Springfield, Illinois, US, 62701`.

**Validation Notes:**
The assessment PDF explicitly specified the required billing data for the invoice API:
```json
{
  "billing_street": "Zoey Shore",
  "billing_city": "Hesselbury",
  "billing_state": "Florida",
  "billing_country": "TG",
  "billing_postal_code": "1234AA"
}
```
Replaced AI-generated data with the PDF-specified values. Country code `TG` is non-standard (Togo ISO 3166-1) but accepted by the app.

---

## Entry 2 — New User Registration Data

**Prompt:**
> "Generate test user registration data for an ecommerce app. Fields: firstName, lastName, dob (YYYY-MM-DD), address, city, state, country, postcode, phone (10-digit), email (disposable), password (meets requirements: 8+ chars, mixed case, number, special char)."

**AI Response Summary:**
AI generated a complete user object. Used `mailinator.com` for disposable email.

**Validation Notes:**
- Added `Date.now()` timestamp to email to ensure uniqueness per test run: `tushar.qatest+${timestamp}@mailinator.com`.
- Verified password `Test@1234` meets the app's password policy (confirmed by successful manual registration).
- Country value required trial-and-error: app uses country name in dropdown (e.g., "India"), not ISO code. Added `.selectOption({ label: 'India' })` with fallback.

---

## Entry 3 — API Test Data Strategy

**Prompt:**
> "What is the best strategy for managing test data in Playwright API tests where: (1) registration creates a user once per email, (2) cart and invoice are created per test, (3) bearer tokens expire? Give a pattern for testData.js."

**AI Response Summary:**
AI recommended: use a fixed existing account for all tests requiring authentication (avoids registration race conditions), create fresh carts per test in `beforeEach`, fetch fresh bearer token per test, and use timestamped emails only for registration tests.

**Validation Notes:**
Adopted this pattern exactly. `testData.existingUser` uses the app's built-in demo account (`customer@practicesoftwaretesting.com`). Fresh `ApiClient` instance per test ensures no token sharing or state leakage between tests.
