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

2. **Show what DeepWiki and Ask Devin can handle.** Before running the full comparison, point out the faster alternatives:

   > "If you just want to know what validation rules exist in the desktop version or the web version individually, you don't need a full session:
   >
   > **Using DeepWiki** (instant, no session):
   > 1. Go to [https://deepwiki.com](https://deepwiki.com)
   > 2. Paste the repo URL and ask: 'What validation rules are in legacy/validation-rules.html?'
   > 3. DeepWiki will describe the rules it indexed from that file.
   >
   > **Using Ask Devin** (seconds, no full session):
   > 1. Open [https://app.devin.ai](https://app.devin.ai)
   > 2. Use the **Ask Devin** quick-ask input
   > 3. Type: 'What validation rules exist in the Invoice module web implementation in erp-invoice-demo?'
   > 4. Devin reads the code and lists the 4 rules.
   >
   > But for a *structured side-by-side comparison* with a gap analysis table and edge case identification — that's a multi-step task that needs a full session. That's what we'll do now."

3. **Read the desktop reference.** Read `legacy/validation-rules.html` and list all 6 validation rules defined for the desktop Invoice module. Present them in a simple table: Rule #, Field, What it checks.

4. **Read the web implementation.** Read `src/modules/invoices/services/invoice.service.ts` and list the 4 validation rules currently implemented.

5. **Produce the gap analysis.** Create a comparison table showing:
   - Rules implemented in both (V1, V2, V3, V4)
   - Rules missing from web (V5: invoice number format, V6: at least one line item)
   - For each missing rule, note the desktop error message that should be replicated

6. **Highlight edge cases.** Also note the desktop edge cases from `legacy/validation-rules.html` that have no equivalent in the web app:
   - Deleted customer handling
   - Cancelled invoice restrictions
   - Duplicate invoice number detection
   - Weekend/holiday due date adjustment
   - Zero-quantity line items for credit notes

7. **Teach the pattern.** Explain that the designer can use this same approach for any module: "Compare the desktop [Module] against the web implementation and tell me what validation rules and edge cases are missing." This saves enormous time vs. manually clicking through both applications.

   Also reinforce the tool choice:
   - **DeepWiki**: "What rules does [file] contain?" (single-file factual lookup)
   - **Ask Devin**: "What validation rules exist in [module]?" (quick cross-file lookup)
   - **Full Session**: "Compare [desktop] vs [web] and produce a gap analysis with edge cases" (multi-step structured output)

8. **Wrap up.** Tell the designer to start a new session and invoke: `@skills:research-benchmarking`

---

## Training Progress

**Estimated total training time: ~55 minutes**

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. **desktop-vs-web** (~4 min) — You are here

**Phase 2 — Design Workflows:**
4. research-benchmarking (~7 min)
5. figma-verification (~7 min)
6. ux-writing-review (~6 min)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
