# AI Prompts – Automation and Debugging

Prompts used for automation structure, assertions, and analysing failures/logs.

---

## Entry 1 — Selector Strategy for Toolshop App

**Prompt:**
> "The Toolshop app uses data-test attributes like data-test='login-submit', data-test='nav-cart'. How should I select these in Playwright? What is the best practice?"

**AI Response Summary:**
AI recommended `page.getByTestId('login-submit')` which maps to `[data-test="login-submit"]`. This is Playwright's idiomatic approach and is more readable than raw CSS selectors.

**Debugging Outcome:**
Applying `getByTestId()` immediately fixed selector failures. The app consistently uses `data-test` attributes making this approach reliable across all pages.

---

## Entry 2 — Checkout Steps Mapping

**Prompt:**
> "My checkout test fails at step 3. The Toolshop checkout has multiple steps: cart → login confirmation → billing address → payment → confirm. Each step has a different 'proceed' button with data-test attributes: proceed-1, proceed-2, proceed-3, finish, proceed-4. How do I map these to my CheckoutPage methods?"

**AI Response Summary:**
AI mapped each button to a step:
- `proceed-1` = initial cart proceed
- `proceed-2` = post-login proceed
- `proceed-3` = after billing address
- `finish` = payment/confirm (first confirm)
- `proceed-4` = final confirm (invoice generation — the second confirm)

**Debugging Outcome:**
Using this mapping the E2E checkout test passes. The key insight is `proceed-4` is the second confirm that actually triggers invoice creation. Documented this in `CheckoutPage.js` with a comment.

---

## Entry 3 — Flaky Test on Cart Counter

**Prompt:**
> "My TC-UI-05 test intermittently fails: the cart counter shows 0 after add-to-cart. The `addToCart()` method clicks the button and immediately checks the counter. Playwright reports the counter text is '0'. How do I fix this?"

**AI Response Summary:**
AI identified a race condition: the click triggers an API call to add the item; the counter updates only after the API responds. Suggested adding `await page.waitForTimeout(1000)` or waiting for network idle after the click.

**Debugging Outcome:**
Added `await this.page.waitForTimeout(1000)` inside `ProductPage.addToCart()`. Flakiness eliminated. A more robust approach would be to `waitForResponse` on the cart API endpoint — noted as a future improvement.

---

## Entry 4 — API Response Body Assertion Depth

**Prompt:**
> "In my API tests I'm only checking `response.status() === 200`. What additional assertions should I add to the login response and invoice response to improve test quality?"

**AI Response Summary:**
For login: assert `access_token` exists, is a string, and has length > 0. Also assert `token_type` is `bearer`.
For invoice: assert `id` exists, `status` is not null, and `cart_id` matches the one sent in the request.

**Debugging Outcome:**
Enhanced assertions now catch cases where the API returns 200 with an error body (which the Toolshop API does not do, but is a common real-world issue). Added `typeof body.access_token === 'string'` and `body.access_token.length > 0` checks as AI suggested.
