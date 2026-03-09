---
name: learn-playbooks
description: Learn how to create Playbooks in the Devin web UI — reusable prompt templates for repeated UX review tasks.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All instructions reference the Devin webapp UI only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Recall the three primitives.** Quick recap:
   - **Knowledge** = facts Devin always knows (you created one in the last lesson)
   - **Playbooks** = reusable prompt templates attached to sessions (this lesson)
   - **Skills** = versioned procedures in the repo (next lesson)

2. **Explain Playbooks.** A Playbook is like a custom instruction set for a specific type of task. Instead of writing the same detailed prompt every time you want Devin to review UX writing, you write it once as a Playbook and reuse it. Playbooks are shared across your organization — once one designer creates a good one, the whole team benefits.

3. **Walk through creating a Playbook.** Guide the designer:
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

4. **Use the Playbook.** Tell the designer to start a new session. When starting the session, they should attach the "UX Writing Review" Playbook (they'll see a blue pill appear confirming it's attached). Then simply type: "Review the Invoice module."

5. **See the results.** Devin will follow the Playbook's procedure and produce the same violations report from the earlier `ux-writing-review` skill — but now it's driven by a reusable Playbook rather than a one-off prompt.

6. **Explain sharing.** Playbooks are org-wide — any team member can attach any Playbook to any session. Once this Playbook is proven, other designers can use it for their own modules without rewriting the prompt.

7. **Iteration tip.** If the results aren't quite right, the designer can chat with Devin to refine, then update the Playbook with improved instructions. Running 2+ sessions in parallel with the same Playbook is a great way to quickly identify issues with the instructions.

8. **Wrap up.** Tell the designer to continue to the next lesson. If running standalone, invoke `@skills:learn-skills`. If running as part of the consolidated curriculum, invoke `@skills:training-phase-3` which includes this lesson.

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
8. **learn-playbooks** (~7 min) — You are here
9. learn-skills (~8 min)
