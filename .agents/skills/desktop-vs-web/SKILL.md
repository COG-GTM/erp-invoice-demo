---
name: desktop-vs-web
description: Compare legacy XL desktop validation rules against the web implementation to produce a structured gap analysis.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All output should be in plain language. Use the Devin webapp only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Explain the use case.** One of the biggest challenges in the XL desktop-to-web rewrite is ensuring the web version doesn't silently drop business rules from the desktop app. Devin can read both codebases and produce a gap analysis.

2. **Read the desktop reference.** Read `legacy/validation-rules.html` and list all 6 validation rules defined for the desktop Invoice module. Present them in a simple table: Rule #, Field, What it checks.

3. **Read the web implementation.** Read `src/modules/invoices/services/invoice.service.ts` and list the 4 validation rules currently implemented.

4. **Produce the gap analysis.** Create a comparison table showing:
   - Rules implemented in both (V1, V2, V3, V4)
   - Rules missing from web (V5: invoice number format, V6: at least one line item)
   - For each missing rule, note the desktop error message that should be replicated

5. **Highlight edge cases.** Also note the desktop edge cases from `legacy/validation-rules.html` that have no equivalent in the web app:
   - Deleted customer handling
   - Cancelled invoice restrictions
   - Duplicate invoice number detection
   - Weekend/holiday due date adjustment
   - Zero-quantity line items for credit notes

6. **Teach the pattern.** Explain that the designer can use this same approach for any module: "Compare the desktop [Module] against the web implementation and tell me what validation rules and edge cases are missing." This saves enormous time vs. manually clicking through both applications.

7. **Wrap up.** Tell the designer to continue to the next phase. If running standalone, invoke `@skills:figma-verification` (or optionally `@skills:research-benchmarking` for competitive research). If running as part of the consolidated curriculum, invoke `@skills:training-phase-2`.

---

## Training Progress

**Recommended:** Use the consolidated `@skills:training-phase-1` instead, which runs all three Phase 1 lessons in a single session.

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. **desktop-vs-web** (~4 min) — You are here

**Phase 2 — Design Workflows:**
4. figma-verification (~7 min)
5. ux-writing-review (~6 min)
6. research-benchmarking (~7 min, optional)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
