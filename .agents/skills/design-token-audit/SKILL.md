---
name: design-token-audit
description: Compare design tokens in src/tokens/tokens.css against the Figma spec in src/tokens/tokens.spec.json, report mismatches, and optionally fix them.
triggers: ["user", "model"]
---

## Setup

1. Read the Figma spec values from `src/tokens/tokens.spec.json`
2. Read the implementation values from `src/tokens/tokens.css`

## Audit

1. For each token in the spec, find the corresponding CSS custom property. Normalize formatting (strip spaces, lowercase hex) before comparing.
2. Compare values — flag any mismatches.
3. Output a markdown table:

   | Token | Figma Spec | Code Value | Match? | Severity |
   | --- | --- | --- | --- | --- |

   Severity guide:
   - **High** — color mismatches (visible to users, affects brand)
   - **Medium** — spacing or sizing differences (affects layout polish)
   - **Low** — sub-pixel rounding or formatting-only differences

4. Below the table, print a one-line summary: `X tokens checked, Y mismatch(es).`

## Fix (if requested or if invoked with model trigger)

1. For each mismatch, update `src/tokens/tokens.css` to match the spec value
2. Search the codebase for any hardcoded values that should reference the token instead

## Verify

1. Run `npm run verify-tokens` to confirm all tokens now match (if available)
2. If the dev server is running, refresh and visually verify error states and modals
