---
name: cli-desktop-parity
description: Compare legacy desktop validation rules against the web implementation and output a gap analysis. Designed for CLI use by designers.
triggers: ["user", "model"]
---

> **Quick alternative:** For a quick lookup of individual rule sets, use **Ask Devin**: open [app.devin.ai](https://app.devin.ai), use the Ask Devin input, and type: *"What validation rules exist in the Invoice module web implementation in erp-invoice-demo?"* or *"What validation rules are in legacy/validation-rules.html?"* — Devin will list them in seconds. Use **DeepWiki** at [deepwiki.com](https://deepwiki.com) to browse what a specific file contains. Use this full skill when you need a structured side-by-side gap analysis with edge cases.

## Steps

1. Read the desktop validation rules from `legacy/validation-rules.html`. Extract every rule: rule ID, field, what it checks, and the desktop error message.

2. Read the web implementation from `src/modules/invoices/services/invoice.service.ts`. Extract every validation rule currently implemented.

3. Output a gap analysis table:

   | Rule | Field | Desktop | Web | Status |
   | --- | --- | --- | --- | --- |

   Status values:
   - **Implemented** — rule exists in both desktop and web
   - **Missing** — rule exists in desktop but not in web
   - **Web only** — rule exists in web but not in desktop (if any)

   For missing rules, include the desktop error message that should be replicated.

4. List desktop edge cases from `legacy/validation-rules.html` that have no web equivalent. Present as a bullet list with a brief description of each.

5. Print a one-line summary: `X rules in desktop, Y implemented in web, Z missing.`
