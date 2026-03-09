---
name: cli-check-all
description: Run all design verification checks (tokens, UX writing, desktop parity) and output a combined summary. Reads all source files once for efficiency.
triggers: ["user"]
---

## Step 1 — Read all source files upfront

Read the following files in a single pass. These are the only files needed for all three checks:

1. `src/tokens/tokens.spec.json` — Figma token spec (source of truth)
2. `src/tokens/tokens.css` — CSS token implementation
3. `docs/ux-glossary.md` — UX writing rules
4. `legacy/validation-rules.html` — Desktop validation rules
5. `src/modules/invoices/services/invoice.service.ts` — Web validation implementation
6. All component files in `src/modules/invoices/components/` — UI strings

Keep all file contents in context for the checks below. Do NOT re-read any file.

---

## Step 2 — Token Audit

Using `tokens.spec.json` and `tokens.css` (already read above):

1. For each token in the spec, find the matching CSS custom property
2. Normalize formatting (strip spaces, lowercase hex) before comparing
3. Produce a markdown table:

   | Token | Figma Spec | Code Value | Match? | Severity |
   | --- | --- | --- | --- | --- |

   Severity guide:
   - **High** — color mismatches (visible to users, affects brand)
   - **Medium** — spacing or sizing differences (affects layout polish)
   - **Low** — sub-pixel rounding or formatting-only differences

4. Record the mismatch count for the summary

---

## Step 3 — UX Writing Review

Using `ux-glossary.md` and the Invoice module files (already read above):

1. Extract the key rules from the glossary:
   - Error messages must follow: `[What happened]. [What to do next].`
   - Button labels must use specific action verbs (never "Submit", "OK", or "Yes")
   - Terminology must match the glossary (Invoice not Bill, Customer not Client, etc.)
2. Find every user-facing string in the module: button labels, error messages, headings, placeholder text, status labels
3. Check each string against the glossary rules
4. Produce a markdown table:

   | File | Current Text | Issue | Suggested Fix |
   | --- | --- | --- | --- |

   Group violations by type: button labels, error messages, terminology.

5. Record the violation count for the summary

---

## Step 4 — Desktop Parity Check

Using `validation-rules.html` and `invoice.service.ts` (already read above):

1. Extract every rule from the desktop reference: rule ID, field, what it checks, desktop error message
2. Extract every validation rule from the web service
3. Produce a gap analysis table:

   | Rule | Field | Desktop | Web | Status |
   | --- | --- | --- | --- | --- |

   Status values:
   - **Implemented** — rule exists in both desktop and web
   - **Missing** — rule exists in desktop but not in web
   - **Web only** — rule exists in web but not in desktop (if any)

   For missing rules, include the desktop error message that should be replicated.

4. List desktop edge cases that have no web equivalent as a bullet list
5. Record the missing-rule count for the summary

---

## Step 5 — Combined Summary

Output each of the three reports above separated by a horizontal rule (`---`), then print the combined summary:

```
=== Design Check Summary ===
Tokens:          X mismatch(es)
UX Writing:      Y violation(s)
Desktop Parity:  Z missing rule(s)
```
