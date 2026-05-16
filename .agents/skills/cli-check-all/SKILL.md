---
name: cli-check-all
description: Run all design verification checks (tokens, UX writing, desktop parity) and output a combined summary. Designed for CLI use by designers.
triggers: ["user"]
---

## Steps

1. Run the **token audit**: follow the procedure in `.agents/skills/design-token-audit/SKILL.md` (Audit section only — do not fix). Capture the mismatch count.

2. Run the **UX writing review**: follow the procedure in `.agents/skills/cli-ux-review/SKILL.md` for the Invoice module. Capture the violation count.

3. Run the **desktop parity check**: follow the procedure in `.agents/skills/cli-desktop-parity/SKILL.md`. Capture the missing-rule count.

4. Output each report in sequence, separated by a horizontal rule (`---`).

5. At the end, print a combined summary:

   ```
   === Design Check Summary ===
   Tokens:          X mismatch(es)
   UX Writing:      Y violation(s)
   Desktop Parity:  Z missing rule(s)
   ```
