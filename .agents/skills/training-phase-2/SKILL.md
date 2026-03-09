---
name: training-phase-2
description: "Designer training Phase 2 — Design Workflows. Covers: Figma token verification and UX writing review. Competitive research is available as an optional bonus. Runs in a single session (~12 min)."
triggers: ["user"]
---

**CONTEXT**
This is the second of three training phases for UX designers who do not code. This phase teaches two core design verification workflows (Figma tokens and UX writing) in a single session. Competitive research is available as a separate optional skill (`@skills:research-benchmarking`) and does not block this training flow.

Keep all explanations non-technical. Never ask the designer to write code, use a terminal, or open an IDE.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again after completing the final lesson.

---

## Lesson 1 of 2: Figma Token Verification (~7 min)

### Step 1 — Explain the use case
After developers implement a design, the UX team needs to verify it matches the Figma spec. This is tedious — checking spacing pixel by pixel, comparing colors, verifying states. Devin can automate much of this.

### Step 2 — Explain the Figma MCP
Devin can connect to Figma through an MCP (Model Context Protocol) integration. This lets Devin read design files directly — extracting colors, spacing values, typography, and layout information from the Figma source of truth.

### Step 3 — Walk through the setup
For this training exercise, we'll work with the token spec file (`src/tokens/tokens.spec.json`) as a stand-in for the Figma source of truth. In a real workflow with Figma MCP connected, Devin would read the actual Figma file. Explain to the designer that connecting Figma MCP is done through the Devin webapp settings under integrations.

### Step 4 — Run the comparison
Read `src/tokens/tokens.spec.json` (the Figma spec) and `src/tokens/tokens.css` (the implementation). Compare them and produce a discrepancy report:

| Token | Figma Spec | Implementation | Match? | Severity |
| --- | --- | --- | --- | --- |
| `--color-error` | `#dc2626` | `#e53e3e` | MISMATCH | High — affects all error states |
| `--modal-padding` | `32px` | `24px` | MISMATCH | Medium — affects modal layout |
| `--color-primary` | `#1a56db` | `#1a56db` | Match | — |
| (etc.) | | | | |

### Step 5 — Explain severity ratings
Walk through the severity framework:
- **High:** Color mismatches, wrong typography — visible to users, affects brand consistency
- **Medium:** Spacing differences — affects layout polish, noticeable on careful inspection
- **Low:** Minor rounding, sub-pixel differences — may not be perceptible

### Step 6 — Discuss the real workflow
In production, the designer would:
- Connect Figma MCP in Devin settings
- Provide the Figma file URL and staging app URL
- Devin reads the Figma file, opens the staging app via computer use, screenshots key states, and compares
- This can be scheduled to run automatically after each deploy (see Devin's Scheduled Sessions feature)

Tell the designer: "Now let's move to Lesson 2: UX Writing Review — still in this same session."

---

## Lesson 2 of 2: UX Writing Review (~5 min)

### Step 1 — Explain the use case
UX writing consistency is a constant challenge — especially when multiple developers implement UI text independently. Devin can scan the codebase, find all user-facing strings, and check them against the team's UX writing guidelines.

### Step 2 — Show the guidelines
Read `docs/ux-glossary.md` and summarize the key rules:
- Error messages must follow: `[What happened]. [What to do next].`
- Button labels must use action verbs (never "Submit")
- Specific terminology rules (Invoice, not Bill; Customer, not Client; etc.)

### Step 3 — Run the audit
Read the Invoice module components and the validation service. Find all user-facing strings: button labels, error messages, headings, placeholder text. For each, check against the glossary rules.

### Step 4 — Present findings as a report
Produce a structured table:

| Location | Current Text | Issue | Suggested Fix |
| --- | --- | --- | --- |
| invoice-list.component.ts — Create button | "Submit" | Not an action verb | "Create Invoice" |
| invoice-detail.component.ts — Delete button | "Submit" | Not an action verb | "Delete Invoice" |
| invoice-detail.component.ts — Confirm button | "Submit" | Not an action verb | "Confirm Delete" |
| invoice.service.ts — V1 error | "Invalid customer name" | Missing guidance | "Customer name is required. Please select a customer from the registry." |
| invoice.service.ts — V3 error | "Invalid due date" | Missing guidance | "Due date must be after the issue date. Please correct the payment terms." |
| invoice-create.component.ts — Submit button | "Submit" | Not an action verb | "Create Invoice" |

### Step 5 — Discuss the value
This kind of audit would take a designer 30+ minutes of reading code manually. Devin found 6 violations in seconds. More importantly, the designer didn't need to understand Angular or TypeScript — Devin translated the code into a UX-focused report.

### Step 6 — Preview what's next
Explain that in Phase 3, the designer will learn how to encode these UX writing rules into Devin's Knowledge and Playbooks so that violations are caught automatically in every session — not just when someone remembers to check.

---

## Bonus: Competitive Research (Optional)

Competitive ERP research using Devin's browser is available as a separate skill. It takes ~7 minutes and uses computer use to browse competitor demos, capture screenshots, and produce comparison tables.

To run it: start a new session and invoke `@skills:research-benchmarking`

Alternatively, a pre-cached comparison table is available at `docs/competitor-benchmarks.md` for immediate reference without the browser overhead.

---

## Phase 2 Complete

Congratulate the designer on finishing Phase 2. They've learned to:
- Verify Figma tokens against the implementation
- Audit UX writing for consistency
- (Optional) Research competitor ERP systems

Tell the designer to start a new session and invoke: `@skills:training-phase-3`

---

## Training Progress

**Estimated total training time: ~35 minutes** (down from ~55 min with consolidated phases)

**Phase 1 — Foundations (~15 min):**
- ~~Lesson 1: Meet Devin~~
- ~~Lesson 2: System Analysis~~
- ~~Lesson 3: Desktop vs. Web~~

**Phase 2 — Design Workflows (~12 min):**
- Lesson 4: Figma Verification (~7 min)
- Lesson 5: UX Writing Review (~5 min)
- Bonus: Competitive Research (optional, async)
- **You are here**

**Phase 3 — Building Reusable Automation (~8 min):**
- Lesson 6: Knowledge (~3 min)
- Lesson 7: Playbooks (~3 min)
- Lesson 8: Skills (~2 min)
