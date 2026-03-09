---
name: learn-skills
description: Learn how to create SKILL.md files — version-controlled, auto-discovered procedures with arguments. The most powerful Devin primitive.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All instructions reference the Devin webapp UI. When creating the SKILL.md file, Devin will create it via a PR — the designer does not need to use an IDE or terminal.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Recall the three primitives and explain why Skills matter most.**
   - **Knowledge** = facts (created in web UI, recalled automatically)
   - **Playbooks** = prompt templates (created in web UI, attached manually)
   - **Skills** = step-by-step procedures stored as `SKILL.md` files in the repo
   
   Skills are the recommended path going forward. They're version-controlled (tracked in git alongside the code), auto-discovered (Devin finds them automatically), and support dynamic arguments. Cognition plans to consolidate Playbook features into Skills over time.

2. **Explain what a SKILL.md file looks like.** It's just a markdown file with:
   - A YAML header (name, description, optional argument-hint and triggers)
   - A body with step-by-step instructions
   
   Show the structure using this skill file itself as an example — the designer is running a SKILL.md right now!

3. **Create a skill together.** Tell the designer you're going to create a `figma-audit` skill together that codifies the Figma verification workflow from the earlier Figma lesson. Explain that normally the designer would describe what the procedure should check, and Devin writes the SKILL.md file and submits it as a PR.

   Present the following skill content, explaining each section as you go:

   ```markdown
   ---
   name: figma-audit
   description: Compare Figma design tokens against the implementation and produce a discrepancy report.
   argument-hint: <figma-file-url> <staging-url>
   triggers: ["user", "model"]
   ---

   ## Setup

   1. If a Figma URL is provided as $ARGUMENTS[0], read the Figma file via MCP to extract design tokens
   2. If no Figma URL is provided, read the spec from src/tokens/tokens.spec.json
   3. Read the implementation tokens from src/tokens/tokens.css

   ## Audit

   1. Compare every token value between spec and implementation
   2. For each mismatch, determine severity:
      - High: color mismatches, wrong typography (visible to users)
      - Medium: spacing differences (affects layout polish)
      - Low: sub-pixel rounding (may not be perceptible)
   3. Check that --modal-padding, --color-error, and all semantic colors match

   ## Report

   1. Produce a markdown table: Token | Spec Value | Implementation Value | Match? | Severity
   2. List total mismatches by severity
   3. If a staging URL is provided as $ARGUMENTS[1], open it in the browser and screenshot key states for visual verification
   ```

4. **Explain the key features.**
   - `$ARGUMENTS` — the designer can pass different Figma URLs each time: `@skills:figma-audit https://figma.com/file/XYZ`
   - `triggers: ["user", "model"]` — Devin can also invoke this skill automatically when it detects relevant work
   - The file lives at `.agents/skills/figma-audit/SKILL.md` in the repo — it's versioned, reviewable, and shared with the whole team

5. **Submit it.** Create the SKILL.md file and offer to open a PR. Explain that the designer doesn't need to use git — Devin handles the commit and PR creation. The team can review the skill just like they'd review any code change.

6. **Compare Skills vs. Playbooks vs. Knowledge.**

   | | Knowledge | Playbooks | Skills |
   | --- | --- | --- | --- |
   | Where it lives | Devin web UI | Devin web UI | Repo (`.agents/skills/`) |
   | How it's triggered | Auto-recalled | Manually attached | Auto or `@skills:name` |
   | Version controlled | No | No | Yes |
   | Supports arguments | No | No | Yes (`$ARGUMENTS`) |
   | Best for | Facts, rules, conventions | Reusable prompts, cross-repo tasks | Repo-specific procedures |
   | Who can edit | Anyone in the org (web UI) | Anyone in the org (web UI) | Anyone with repo access (via PR) |

   **Rule of thumb:** Use Knowledge for "what Devin should know," Playbooks for "how to do something across repos," and Skills for "how to do something in this repo."

7. **Congratulate and wrap up.** The designer has completed all 9 training lessons! They've learned to:
   - Talk to Devin and read the session timeline
   - Analyze systems beyond the happy path
   - Compare desktop vs. web implementations
   - Research competitors with computer use
   - Verify Figma against implementation
   - Audit UX writing consistency
   - Create Knowledge entries for persistent facts
   - Create Playbooks for reusable review tasks
   - Create Skills for version-controlled procedures

   Encourage them to start using these techniques in their daily work and to iterate on the Knowledge entries, Playbooks, and Skills they created.

---

## Training Progress

**Recommended:** Use the consolidated `@skills:training-phase-3` instead, which runs all three Phase 3 lessons in a single session.

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. ~~desktop-vs-web~~ (~4 min)

**Phase 2 — Design Workflows:**
4. ~~figma-verification~~ (~7 min)
5. ~~ux-writing-review~~ (~6 min)
6. ~~research-benchmarking~~ (~7 min, optional)

**Phase 3 — Building Reusable Automation:**
7. ~~learn-knowledge~~ (~5 min)
8. ~~learn-playbooks~~ (~7 min)
9. **learn-skills** (~8 min) — You are here

**You've completed all designer training!**
