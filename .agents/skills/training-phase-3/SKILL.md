---
name: training-phase-3
description: "Designer training Phase 3 — Building Reusable Automation. Covers: creating Knowledge entries, Playbooks, and Skills. Runs in a single session (~8 min)."
triggers: ["user"]
---

**CONTEXT**
This is the third and final training phase for UX designers who do not code. This phase teaches the three Devin primitives (Knowledge, Playbooks, Skills) in a single session. All instructions reference the Devin webapp UI only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again after completing the final lesson.

---

## Lesson 1 of 3: Knowledge (~3 min)

### Step 1 — Explain the concept
Knowledge is Devin's long-term memory. When you create a Knowledge entry, Devin can recall it in any future session when the topic is relevant. Think of it like onboarding notes for a new team member — things they should always know.

### Step 2 — Explain the three Devin primitives
Before diving in, give a quick overview of how Knowledge fits alongside the other two:
- **Knowledge** = facts and rules Devin should always know (design tokens, glossary, conventions). Created in the Devin web UI. Recalled automatically.
- **Playbooks** = step-by-step prompt templates for repeated tasks (UX review, audit). Created in the web UI. Attached manually to sessions.
- **Skills** = versioned procedures committed to the repo as SKILL.md files. Auto-discovered, support arguments.

This lesson covers Knowledge. The next two cover Playbooks and Skills.

### Step 3 — Walk through creating a Knowledge entry
Guide the designer step by step:
a. In the Devin webapp, click the gear icon or navigate to **Settings & Library**
b. Click the **Knowledge** tab
c. Click **Add Knowledge** in the top right
d. For the **Trigger Description**, enter: `when working with colors, spacing, typography, or design tokens`
e. For the **Content**, enter the following (read from `docs/design-system.md` and summarize the key token values):

```
Design System Token Rules for Comarch XL Web:
- Error color: #dc2626 (--color-error)
- Primary color: #1a56db (--color-primary)
- Modal padding: 32px (--modal-padding)
- Standard spacing scale: 4/8/16/24/32/48px
- Font family: Inter
- All error messages follow: [What happened]. [What to do next].
- Button labels must use action verbs, never "Submit"
```

f. **Pin it to the repo** — select the comarch-devin-demo repository so this Knowledge is always active when working in this codebase.
g. Click **Save**.

### Step 4 — Test it
Tell the designer to ask in this same session: "What color should I use for error states?" Devin should recall the Knowledge entry and answer `#dc2626`. If it doesn't, explain that Knowledge retrieval is based on trigger relevance — refining the trigger description can improve recall.

### Step 5 — Tips for good Knowledge entries
- Keep each entry focused on one topic (don't combine design tokens with UX writing rules)
- Write trigger descriptions that match how you'd naturally phrase a question
- Pin to specific repos when the knowledge is project-specific
- You can create multiple Knowledge entries — Devin retrieves whichever are relevant

### Step 6 — Mention Knowledge suggestions
Devin can also suggest Knowledge entries based on your interactions. If Devin learns something useful during a session, it will offer to save it as Knowledge. The designer should accept and edit these suggestions when they appear.

Tell the designer: "Now let's move to Lesson 2: Playbooks — still in this same session."

---

## Lesson 2 of 3: Playbooks (~3 min)

### Step 1 — Recall the three primitives
Quick recap:
- **Knowledge** = facts Devin always knows (you created one in the last lesson)
- **Playbooks** = reusable prompt templates attached to sessions (this lesson)
- **Skills** = versioned procedures in the repo (next lesson)

### Step 2 — Explain Playbooks
A Playbook is like a custom instruction set for a specific type of task. Instead of writing the same detailed prompt every time you want Devin to review UX writing, you write it once as a Playbook and reuse it. Playbooks are shared across your organization — once one designer creates a good one, the whole team benefits.

### Step 3 — Walk through creating a Playbook
Guide the designer:
a. In the Devin webapp, navigate to **Settings & Library**
b. Click the **Playbooks** tab
c. Click **Create a new Playbook**
d. Name it: `UX Writing Review`
e. Enter the following content:

```
## Procedure

1. Read the UX glossary at docs/ux-glossary.md
2. Find all user-facing strings in the specified module (button labels, error messages, headings, placeholder text, status labels)
3. Check each string against the glossary rules:
   - Error messages follow: [What happened]. [What to do next].
   - Button labels use specific action verbs (never "Submit", "OK", or "Yes")
   - Terminology matches the glossary (Invoice not Bill, Customer not Client)
4. Produce a table of violations with: Location, Current Text, Issue, Suggested Fix
5. Summarize the total number of violations found

## Specifications

- Output should be a markdown table, easy to copy into a wiki or ticket
- Include the file path and approximate location for each violation so developers can find it
- Group violations by type (button labels, error messages, terminology)

## Advice

- Be thorough — check template HTML, TypeScript strings, and any i18n files
- Don't flag strings that are only used internally (variable names, comments)
- When suggesting fixes, match the tone and style of the correct examples in the glossary

## Required from User

- Which module to review (e.g., "the Invoice module")
```

f. Click **Save**.

### Step 4 — Explain how to use the Playbook
Tell the designer: to use it, start a new session, attach the "UX Writing Review" Playbook (they'll see a blue pill appear confirming it's attached), then simply type: "Review the Invoice module." Devin follows the Playbook's procedure and produces the same violations report from Phase 2.

### Step 5 — Explain sharing
Playbooks are org-wide — any team member can attach any Playbook to any session. Once this Playbook is proven, other designers can use it for their own modules without rewriting the prompt.

### Step 6 — Iteration tip
If the results aren't quite right, the designer can chat with Devin to refine, then update the Playbook with improved instructions. Running 2+ sessions in parallel with the same Playbook is a great way to quickly identify issues with the instructions.

Tell the designer: "Finally, let's cover Lesson 3: Skills — the most powerful primitive."

---

## Lesson 3 of 3: Skills (~2 min)

### Step 1 — Recall the three primitives and explain why Skills matter most
- **Knowledge** = facts (created in web UI, recalled automatically)
- **Playbooks** = prompt templates (created in web UI, attached manually)
- **Skills** = step-by-step procedures stored as `SKILL.md` files in the repo

Skills are the recommended path going forward. They're version-controlled (tracked in git alongside the code), auto-discovered (Devin finds them automatically), and support dynamic arguments. Cognition plans to consolidate Playbook features into Skills over time.

### Step 2 — Explain what a SKILL.md file looks like
It's just a markdown file with:
- A YAML header (name, description, optional argument-hint and triggers)
- A body with step-by-step instructions

Show the structure using this skill file itself as an example — the designer is running a SKILL.md right now!

### Step 3 — Create a skill together
Tell the designer you're going to create a `figma-audit` skill together that codifies the Figma verification workflow from Phase 2. Explain that the designer describes what the procedure should be, and Devin will write the SKILL.md file and submit it as a PR.

Present the following skill content directly to the designer, explaining each section:

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

### Step 4 — Explain the key features
- `$ARGUMENTS` — the designer can pass different Figma URLs each time: `@skills:figma-audit https://figma.com/file/XYZ`
- `triggers: ["user", "model"]` — Devin can also invoke this skill automatically when it detects relevant work
- The file lives at `.agents/skills/figma-audit/SKILL.md` in the repo — it's versioned, reviewable, and shared with the whole team

### Step 5 — Submit it
Create the SKILL.md file and offer to open a PR. Explain that the designer doesn't need to use git — Devin handles the commit and PR creation. The team can review the skill just like they'd review any code change.

### Step 6 — Compare Skills vs. Playbooks vs. Knowledge

| | Knowledge | Playbooks | Skills |
| --- | --- | --- | --- |
| Where it lives | Devin web UI | Devin web UI | Repo (`.agents/skills/`) |
| How it's triggered | Auto-recalled | Manually attached | Auto or `@skills:name` |
| Version controlled | No | No | Yes |
| Supports arguments | No | No | Yes (`$ARGUMENTS`) |
| Best for | Facts, rules, conventions | Reusable prompts, cross-repo tasks | Repo-specific procedures |
| Who can edit | Anyone in the org (web UI) | Anyone in the org (web UI) | Anyone with repo access (via PR) |

**Rule of thumb:** Use Knowledge for "what Devin should know," Playbooks for "how to do something across repos," and Skills for "how to do something in this repo."

---

## Training Complete!

Congratulate the designer on completing all training! They've learned to:
- Talk to Devin and read the session timeline
- Analyze systems beyond the happy path
- Compare desktop vs. web implementations
- Verify Figma tokens against implementation
- Audit UX writing consistency
- Create Knowledge entries for persistent facts
- Create Playbooks for reusable review tasks
- Create Skills for version-controlled procedures

Encourage them to start using these techniques in their daily work and to iterate on the Knowledge entries, Playbooks, and Skills they created.

---

## Training Progress

**Estimated total training time: ~35 minutes** (down from ~55 min with consolidated phases)

**Phase 1 — Foundations (~15 min):**
- ~~Lesson 1: Meet Devin~~
- ~~Lesson 2: System Analysis~~
- ~~Lesson 3: Desktop vs. Web~~

**Phase 2 — Design Workflows (~12 min):**
- ~~Lesson 4: Figma Verification~~
- ~~Lesson 5: UX Writing Review~~
- ~~Bonus: Competitive Research (optional, async)~~

**Phase 3 — Building Reusable Automation (~8 min):**
- Lesson 6: Knowledge (~3 min)
- Lesson 7: Playbooks (~3 min)
- Lesson 8: Skills (~2 min)
- **You are here**

**You've completed all designer training!**
