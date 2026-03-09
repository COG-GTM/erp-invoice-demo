---
name: cli-token-audit
description: Compare design tokens in code against the Figma spec and output a mismatch report. Designed for CLI use by designers.
triggers: ["user", "model"]
---

> **Quick alternative:** For a fast yes/no check without running this full skill, use **Ask Devin**: open [app.devin.ai](https://app.devin.ai), use the Ask Devin input, and type: *"Are there any mismatches between tokens.spec.json and tokens.css in erp-invoice-demo?"* — Devin will list mismatches in seconds. Use this full skill when you need a structured report with severity ratings.

## Steps

1. Read the Figma spec values from `src/tokens/tokens.spec.json`.
2. Read the implementation values from `src/tokens/tokens.css`.
3. For each token in the spec, find the matching CSS custom property. Normalize formatting (strip spaces, lowercase hex) before comparing.
4. Output a markdown table:

   | Token | Figma Spec | Code Value | Match? | Severity |
   | --- | --- | --- | --- | --- |

   Severity guide:
   - **High** — color mismatches (visible to users, affects brand)
   - **Medium** — spacing or sizing differences (affects layout polish)
   - **Low** — sub-pixel rounding or formatting-only differences

5. Below the table, print a one-line summary: `X tokens checked, Y mismatch(es).`
6. If `npm run verify-tokens` is available, run it and include its output as confirmation.
