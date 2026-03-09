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

2. **Show the fast path first — Ask Devin.** Before diving into the full analysis, demonstrate that simple questions can be answered without a full session. Tell the designer:

   > "Let's start with a quick question. You could answer this right now using **Ask Devin** instead of a full session. Here's how:
   > 1. Open [https://app.devin.ai](https://app.devin.ai)
   > 2. Use the **Ask Devin** quick-ask input
   > 3. Type: 'What validation rules exist in the Invoice module in erp-invoice-demo?'
   > 4. Devin reads the code and responds in seconds with a list of the 4 rules.
   >
   > Try it now if you'd like — you'll see how fast it is for straightforward questions."

   Then explain: "Ask Devin is great for quick lookups like this. But what it can't do well is go *beyond* the happy path — finding what's missing, not just what's there. That's where a full session shines. Let's do that now."

3. **Run the deep analysis (full session).** Tell the designer you're going to analyze the Invoice module in depth — something that requires a full session. Read `src/modules/invoices/services/invoice.service.ts` and the component files. Document:
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

7. **Reinforce the tool choice.** Recap when to use each tool for system analysis:
   - **Ask Devin**: "What validation rules exist?" (quick factual lookup)
   - **Full Session**: "What validation rules are *missing*? What edge cases aren't handled?" (requires deeper reasoning across multiple files)

8. **Wrap up.** Tell the designer to start a new session and invoke: `@skills:desktop-vs-web`

---

## Training Progress

**Estimated total training time: ~55 minutes**

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. **system-analysis** (~6 min) — You are here
3. desktop-vs-web (~4 min)

**Phase 2 — Design Workflows:**
4. research-benchmarking (~7 min)
5. figma-verification (~7 min)
6. ux-writing-review (~6 min)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
