---
name: ux-writing-review
description: Audit all user-facing strings in the Invoice module for consistency with UX writing guidelines and the glossary.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All output should be in plain language. Use the Devin webapp only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Explain the use case.** UX writing consistency is a constant challenge — especially when multiple developers implement UI text independently. Devin can scan the codebase, find all user-facing strings, and check them against the team's UX writing guidelines.

2. **Show what you can learn without a full session.** Before running the audit, point out the faster alternatives:

   > "If you just want to review the UX writing guidelines themselves, you don't need a session at all:
   >
   > **Using DeepWiki** (instant, no session):
   > 1. Go to [https://deepwiki.com](https://deepwiki.com)
   > 2. Paste the repo URL and ask: 'What are the UX writing rules in this project?'
   > 3. DeepWiki will summarize the glossary from `docs/ux-glossary.md` — including error message format, button label rules, and terminology standards.
   >
   > **Using Ask Devin** (seconds, no full session):
   > 1. Open [https://app.devin.ai](https://app.devin.ai)
   > 2. Use the **Ask Devin** quick-ask input
   > 3. Type: 'What error messages does the Invoice service return in erp-invoice-demo?'
   > 4. Devin reads the file and lists the messages in seconds.
   >
   > But for a full audit that scans *every* user-facing string across *all* components and checks each one against the glossary — that's a multi-step task that needs a full session. Let's do that now."

3. **Show the guidelines.** Read `docs/ux-glossary.md` and summarize the key rules:
   - Error messages must follow: `[What happened]. [What to do next].`
   - Button labels must use action verbs (never "Submit")
   - Specific terminology rules (Invoice, not Bill; Customer, not Client; etc.)

4. **Run the audit.** Read the Invoice module components and the validation service. Find all user-facing strings: button labels, error messages, headings, placeholder text. For each, check against the glossary rules.

5. **Present findings as a report.** Produce a structured table:

   | Location | Current Text | Issue | Suggested Fix |
   | --- | --- | --- | --- |
   | invoice-list.component.ts — Create button | "Submit" | Not an action verb | "Create Invoice" |
   | invoice-detail.component.ts — Delete button | "Submit" | Not an action verb | "Delete Invoice" |
   | invoice-detail.component.ts — Confirm button | "Submit" | Not an action verb | "Confirm Delete" |
   | invoice.service.ts — V1 error | "Invalid customer name" | Missing guidance | "Customer name is required. Please select a customer from the registry." |
   | invoice.service.ts — V3 error | "Invalid due date" | Missing guidance | "Due date must be after the issue date. Please correct the payment terms." |
   | invoice-create.component.ts — Submit button | "Submit" | Not an action verb | "Create Invoice" |

6. **Discuss the value.** This kind of audit would take a designer 30+ minutes of reading code manually. Devin found 6 violations in seconds. More importantly, the designer didn't need to understand Angular or TypeScript — Devin translated the code into a UX-focused report.

7. **Reinforce the tool choice for UX writing work:**
   - **DeepWiki**: "What are our UX writing rules?" (documentation lookup)
   - **Ask Devin**: "What error messages does this service return?" (quick code lookup)
   - **Full Session + Skill**: Full audit across all components with violations table (use `@skills:cli-ux-review` or this workflow)

8. **Preview what's next.** Explain that in the next phase of training, the designer will learn how to encode these UX writing rules into Devin's Knowledge and Playbooks so that violations are caught automatically in every session — not just when someone remembers to check.

9. **Wrap up.** Tell the designer to start a new session and invoke: `@skills:learn-knowledge`

---

## Training Progress

**Estimated total training time: ~55 minutes**

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. ~~desktop-vs-web~~ (~4 min)

**Phase 2 — Design Workflows:**
4. ~~research-benchmarking~~ (~7 min)
5. ~~figma-verification~~ (~7 min)
6. **ux-writing-review** (~6 min) — You are here

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
