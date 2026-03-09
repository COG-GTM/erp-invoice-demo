---
name: figma-verification
description: Compare Figma designs against the running implementation using Figma MCP, capturing screenshots and producing a discrepancy report with severity ratings.
argument-hint: <figma-file-url> <staging-app-url>
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All output should be in plain language. Use the Devin webapp only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Explain the use case.** After developers implement a design, the UX team needs to verify it matches the Figma spec. This is tedious — checking spacing pixel by pixel, comparing colors, verifying states. Devin can automate much of this.

2. **Show the quick-check alternative first.** Before running a full verification, point out that a quick token check doesn't require a full session:

   > "If you just want to know whether there are any token mismatches, you can use **Ask Devin**:
   > 1. Open [https://app.devin.ai](https://app.devin.ai)
   > 2. Use the **Ask Devin** quick-ask input
   > 3. Type: 'Are there any mismatches between tokens.spec.json and tokens.css in erp-invoice-demo?'
   > 4. Devin reads both files and tells you the mismatches in seconds.
   >
   > This is perfect for a quick daily check. But for a full verification with severity ratings, Figma MCP integration, and staging app screenshots — you need a full session. Let's do that now."

3. **Explain the Figma MCP.** Devin can connect to Figma through an MCP (Model Context Protocol) integration. This lets Devin read design files directly — extracting colors, spacing values, typography, and layout information from the Figma source of truth.

4. **Walk through the setup.** For this training exercise, we'll work with the token spec file (`src/tokens/tokens.spec.json`) as a stand-in for the Figma source of truth. In a real workflow with Figma MCP connected, Devin would read the actual Figma file. Explain to the designer that connecting Figma MCP is done through the Devin webapp settings under integrations.

5. **Run the comparison.** Read `src/tokens/tokens.spec.json` (the Figma spec) and `src/tokens/tokens.css` (the implementation). Compare them and produce a discrepancy report:

   | Token | Figma Spec | Implementation | Match? | Severity |
   | --- | --- | --- | --- | --- |
   | `--color-error` | `#dc2626` | `#e53e3e` | MISMATCH | High — affects all error states |
   | `--modal-padding` | `32px` | `24px` | MISMATCH | Medium — affects modal layout |
   | `--color-primary` | `#1a56db` | `#1a56db` | Match | — |
   | (etc.) | | | | |

6. **Explain severity ratings.** Walk through the severity framework:
   - **High:** Color mismatches, wrong typography — visible to users, affects brand consistency
   - **Medium:** Spacing differences — affects layout polish, noticeable on careful inspection
   - **Low:** Minor rounding, sub-pixel differences — may not be perceptible

7. **Discuss the real workflow.** In production, the designer would:
   - Connect Figma MCP in Devin settings
   - Provide the Figma file URL and staging app URL
   - Devin reads the Figma file, opens the staging app via computer use, screenshots key states, and compares
   - This can be scheduled to run automatically after each deploy (see Devin's Scheduled Sessions feature)

8. **Reinforce the tool choice for design verification:**
   - **Ask Devin**: "Are there any token mismatches?" (quick yes/no check)
   - **Full Session + Skill**: Full discrepancy report with severity ratings, Figma MCP, staging screenshots (use `@skills:cli-token-audit` or this workflow)

9. **Wrap up.** Tell the designer to start a new session and invoke: `@skills:ux-writing-review`

---

## Training Progress

**Estimated total training time: ~55 minutes**

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. ~~desktop-vs-web~~ (~4 min)

**Phase 2 — Design Workflows:**
4. ~~research-benchmarking~~ (~7 min)
5. **figma-verification** (~7 min) — You are here
6. ux-writing-review (~6 min)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
