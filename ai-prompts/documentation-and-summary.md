# AI Prompts – Documentation and Summary

Prompts used for writing README, project-info, reports, and final documentation.

---

## Entry 1 — README Structure

**Prompt:**
> "Write a README.md for a Playwright QA assessment project testing https://practicesoftwaretesting.com. Include: project info, repo structure, setup, how to run smoke tests, regression tests, UI-only tests, API-only tests, where reports are generated, and a test cases summary table."

**AI Response Summary:**
AI produced a well-structured README with all sections. Used markdown tables for the test case summary. Included npm script commands for each test type.

**Edits Made:**
- Added the "Important Note" about double-confirm in the test cases table section.
- Added `headless: false` tip for local debugging.
- Updated the `reports/` path to match the actual Playwright config output folder.

**Reason for Edits:**
AI did not know the exact `outputFolder` value set in `playwright.config.js`. Also the double-confirm note is critical for evaluators running the tests — AI could not have known this without the app-specific context I provided.

---

## Entry 2 — project-info.md (AI Workflow Documentation)

**Prompt:**
> "Write a project-info.md following this template: [pasted the PDF template]. The project tests PracticeSoftwareTesting Toolshop using Playwright + Cursor. Cover all 10 sections: SUT context, requirement analysis, test planning, manual test design, automation design, validation/refinement, test data, debugging, what to avoid sharing with AI, and workflow reuse."

**AI Response Summary:**
AI generated a comprehensive draft covering all 10 sections with concrete examples specific to the Toolshop project.

**Edits Made:**
- Added specific Playwright method names (`getByTestId`, `waitForPageLoad`, `request.newContext`) to the automation design section.
- Expanded the "what to avoid sharing" section to explicitly mention mailinator vs real email.
- Added the phase-by-phase reuse workflow (CI/CD integration).

**Reason for Edits:**
The AI draft was correct but generic. Added specifics to show evaluators the prompting was iterative and I reviewed/augmented AI output rather than copy-pasting.

---

## Entry 3 — Test Suite Summary for Evaluator

**Prompt:**
> "Summarise the full test suite in 3 bullet points for an evaluator: what flows are covered, how automation is structured, and what evidence of execution is available."

**AI Response Summary:**
- UI flows covered: registration, login (positive/negative), search, cart, E2E checkout with invoice.
- API flows covered: auth lifecycle, product retrieval, cart + invoice generation.
- Automation structured as POM (Playwright), tagged @smoke/@regression, reports in `PrismStructure/reports/`.

**Edits Made:** None — used verbatim as the Project Summary section in `project-info.md`.

**Reason:** AI accurately summarised because context was clear and scoped. No refinement needed.
