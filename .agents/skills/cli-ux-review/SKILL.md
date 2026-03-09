---
name: cli-ux-review
description: Audit user-facing strings in a module for UX writing consistency. Designed for CLI use by designers.
argument-hint: <module-name>
triggers: ["user", "model"]
---

> **Quick alternative:** For a quick lookup of specific error messages or button labels, use **Ask Devin**: open [app.devin.ai](https://app.devin.ai), use the Ask Devin input, and type: *"What error messages does the Invoice service return in erp-invoice-demo?"* — Devin will list them in seconds. To look up the UX writing rules themselves, use **DeepWiki**: go to [deepwiki.com](https://deepwiki.com), paste the repo URL, and ask *"What are the UX writing rules?"* Use this full skill when you need a comprehensive audit across all components with a violations table.

## Steps

1. Read the UX writing guidelines from `docs/ux-glossary.md`. Extract the key rules:
   - Error messages must follow: `[What happened]. [What to do next].`
   - Button labels must use specific action verbs (never "Submit", "OK", or "Yes")
   - Terminology must match the glossary (Invoice not Bill, Customer not Client, etc.)

2. Determine which module to review:
   - If an argument is provided (`$ARGUMENTS[0]`), search for that module under `src/modules/`.
   - If no argument is provided, default to the Invoice module at `src/modules/invoices/`.

3. Read all component and service files in the module. Find every user-facing string: button labels, error messages, headings, placeholder text, status labels.

4. Check each string against the glossary rules.

5. Output a markdown table of violations:

   | File | Current Text | Issue | Suggested Fix |
   | --- | --- | --- | --- |

   Group violations by type: button labels, error messages, terminology.

6. Print a one-line summary: `X user-facing strings checked, Y violation(s) found.`
