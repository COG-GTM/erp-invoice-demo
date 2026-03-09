---
name: system-analysis
description: Learn to prompt Devin for deep system analysis that goes beyond the happy path — documenting validation rules, error states, and edge cases.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All output should be in plain language. Use the Devin webapp only — no IDE instructions.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Set the stage.** Explain that one of the most valuable things Devin can do for designers is analyze a codebase and document how features actually work — including edge cases that are easy to miss when looking only at the UI.

2. **Time context.** Manually documenting every validation rule, error state, and edge case in an invoicing module by reading code or clicking through the desktop app would typically take a designer 2-4 hours. Watch Devin do it in under 2 minutes.

3. **Run the analysis.** Tell the designer you're going to analyze the Invoice module now. Read `src/modules/invoices/services/invoice.service.ts` and the component files. Document:
   - All validation rules currently implemented (there are 4)
   - The exact error messages for each rule
   - What happens when the invoice list is empty (hint: nothing — there's no empty state)
   - What the form looks like when submitted with invalid data

4. **Go beyond the happy path.** Now demonstrate the key technique: prompting for what's missing. Ask these questions out loud and answer them:
   - "What happens if someone enters a negative amount?" (caught by rule 4)
   - "What happens if someone enters an invoice number in the wrong format?" (NOT validated — this is a gap)
   - "What happens if someone creates an invoice with zero line items?" (NOT validated — another gap)
   - "What does the user see when there are no invoices yet?" (blank table — no empty state)

5. **Teach the prompting pattern.** Explain to the designer that the key to getting Devin past the happy path is to ask specific "what if" questions:
   - "What happens when [field] is empty/invalid/negative?"
   - "What happens when there are zero [items]?"
   - "What error does the user see when [action] fails?"
   - "What's missing compared to [reference]?"

6. **Show the time comparison.** You just produced a comprehensive analysis in under 2 minutes that would take hours manually. This is the core value of Devin for design research.

7. **Wrap up.** Tell the designer to continue to the next lesson. If running standalone, invoke `@skills:desktop-vs-web`. If running as part of the consolidated curriculum, invoke `@skills:training-phase-1` which includes this lesson.

---

## Training Progress

**Recommended:** Use the consolidated `@skills:training-phase-1` instead, which runs designer-intro, this lesson, and desktop-vs-web in a single session.

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. **system-analysis** (~6 min) — You are here
3. desktop-vs-web (~4 min)

**Phase 2 — Design Workflows:**
4. figma-verification (~7 min)
5. ux-writing-review (~6 min)
6. research-benchmarking (~7 min, optional)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
