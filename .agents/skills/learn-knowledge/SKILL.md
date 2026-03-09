---
name: learn-knowledge
description: Learn how to create Knowledge entries in the Devin web UI so Devin automatically recalls design system rules and terminology in every session.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All instructions reference the Devin webapp UI only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Explain the concept.** Knowledge is Devin's long-term memory. When you create a Knowledge entry, Devin can recall it in any future session when the topic is relevant. Think of it like onboarding notes for a new team member — things they should always know.

2. **Explain the three Devin primitives.** Before diving in, give a quick overview of how Knowledge fits alongside the other two:
   - **Knowledge** = facts and rules Devin should always know (design tokens, glossary, conventions). Created in the Devin web UI. Recalled automatically.
   - **Playbooks** = step-by-step prompt templates for repeated tasks (UX review, audit). Created in the web UI. Attached manually to sessions.
   - **Skills** = versioned procedures committed to the repo as SKILL.md files. Auto-discovered, support arguments.
   
   This lesson covers Knowledge. The next two cover Playbooks and Skills.

3. **Walk through creating a Knowledge entry.** Guide the designer step by step:
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

4. **Test it with Ask Devin.** Tell the designer they can test the Knowledge entry instantly without starting a full session:

   > "To verify your Knowledge entry works:
   > 1. Open [https://app.devin.ai](https://app.devin.ai)
   > 2. Use the **Ask Devin** quick-ask input
   > 3. Type: 'What color should I use for error states?'
   > 4. Devin should recall your Knowledge entry and answer `#dc2626`.
   >
   > This is a perfect example of when Ask Devin is the right tool — you're asking a quick factual question that Knowledge can answer instantly. No need for a full session."

   If it doesn't recall the Knowledge, explain that retrieval is based on trigger relevance — refining the trigger description can improve recall.

5. **Tips for good Knowledge entries.**
   - Keep each entry focused on one topic (don't combine design tokens with UX writing rules)
   - Write trigger descriptions that match how you'd naturally phrase a question
   - Pin to specific repos when the knowledge is project-specific
   - You can create multiple Knowledge entries — Devin retrieves whichever are relevant

6. **Mention Knowledge suggestions.** Devin can also suggest Knowledge entries based on your interactions. If Devin learns something useful during a session, it will offer to save it as Knowledge. The designer should accept and edit these suggestions when they appear.

7. **Wrap up.** Tell the designer to start a new session and invoke: `@skills:learn-playbooks`

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
6. ~~ux-writing-review~~ (~6 min)

**Phase 3 — Building Reusable Automation:**
7. **learn-knowledge** (~5 min) — You are here
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
