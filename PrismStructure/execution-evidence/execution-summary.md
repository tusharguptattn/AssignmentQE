# Execution Evidence — Test Run Summary

**Run Date:** 2026-08-07  
**Total Tests:** 15  
**Passed:** 15  
**Failed:** 0  
**Duration:** ~1m 32s  
**Browser:** Chromium (headless)

---

## Results by Test Case

| Test ID | Title | Tag | Status | Duration |
|---------|-------|-----|--------|----------|
| TC-API-01 | User Registration via API | @smoke | ✅ PASSED | 1.2s |
| TC-API-02 | Valid Login via API | @smoke | ✅ PASSED | 0.7s |
| TC-API-03 | Invalid Login via API | @regression | ✅ PASSED | 0.6s |
| TC-API-04 | Get Products List | @smoke | ✅ PASSED | 0.6s |
| TC-API-05 | Get Product by ID | @regression | ✅ PASSED | 1.3s |
| TC-API-06a | Create Cart | @regression | ✅ PASSED | 1.3s |
| TC-API-06b | Add Product to Cart + Verify | @regression | ✅ PASSED | 3.4s |
| TC-API-06c | Generate Invoice (full lifecycle) | @regression | ✅ PASSED | 3.3s |
| TC-UI-01 | User Registration | @smoke | ✅ PASSED | 6.5s |
| TC-UI-02 | Valid Login | @smoke | ✅ PASSED | 7.5s |
| TC-UI-03 | Invalid Login | @regression | ✅ PASSED | 6.3s |
| TC-UI-04 | Product Search | @smoke | ✅ PASSED | 5.7s |
| TC-UI-05 | Add Product to Cart | @smoke | ✅ PASSED | 15.0s |
| TC-UI-06 | E2E Checkout + Invoice | @regression | ✅ PASSED | 23.7s |
| TC-UI-07 | Cart Quantity Update | @regression | ✅ PASSED | 16.9s |

---

## Smoke Suite Results

```
Smoke tests: 7 passed, 0 failed
Run command: npm run test:smoke
```

| TC-API-01 | TC-API-02 | TC-API-04 | TC-UI-01 | TC-UI-02 | TC-UI-04 | TC-UI-05 |
|-----------|-----------|-----------|----------|----------|----------|----------|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Regression Suite Results

```
Regression tests: 8 passed, 0 failed
Run command: npm run test:regression
```

| TC-API-03 | TC-API-05 | TC-API-06 | TC-UI-03 | TC-UI-06 | TC-UI-07 |
|-----------|-----------|-----------|----------|----------|----------|
| ✅ | ✅ | ✅ (3 specs) | ✅ | ✅ | ✅ |

---

## Key Notes

- **testIdAttribute**: `data-test` (not default `data-testid`) — configured in `playwright.config.js`
- **E2E Checkout (TC-UI-06)**: Confirm button pressed twice as per app behaviour
- **API Invoice endpoint**: `POST /invoices` returns `invoice_number` field (not `status`)
- **Cart add-product endpoint**: `POST /carts/{id}` returns 200 (not 201)
- **Full JSON report**: `execution-evidence/results.json`
