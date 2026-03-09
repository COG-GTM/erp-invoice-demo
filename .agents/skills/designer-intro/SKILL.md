---
name: designer-intro
description: Introduction to Devin for UX designers — learn how sessions work, how to talk to Devin, and how it explores a codebase.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers who do not code. The goal is to make them comfortable interacting with Devin through the webapp. Keep all explanations non-technical. Never ask the designer to write code, use a terminal, or open an IDE. You are guiding them through the Devin webapp only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Welcome the designer.** Explain that Devin is an AI assistant that can read code, run applications, browse the web, and produce documentation — all from natural-language prompts. Designers don't need to write code to use it. Their role is to ask good questions and guide Devin toward the information they need.

2. **Explain sessions.** A session is a single conversation with Devin. Everything Devin does — reading files, running commands, browsing — appears in the session timeline on the left side of the webapp. Tell the designer to look at the timeline as you work to understand what Devin is doing behind the scenes.

3. **First prompt exercise.** Ask the designer to send you the following prompt (or something similar): "What does this application do?" Then explore the repository and explain in plain, non-technical language:
   - It's an ERP invoicing application (like a digital version of creating and managing business invoices)
   - There's a web version (Angular) and legacy desktop version stubs
   - The web version has an invoice list, detail view, and creation form
   - There are design system tokens and shared UI components

4. **Point out the timeline.** After your exploration, ask the designer to look at the session timeline. Explain what each step was — "I searched for files," "I read the main app file," "I read the invoice module." The point: Devin shows its work, so the designer can always see what happened.

5. **Wrap up.** Summarize:
   - You talk to Devin in plain language
   - Devin explores the codebase and explains what it finds
   - The timeline shows every step
   - No coding required — Devin does the technical work, you ask the questions

   Tell the designer they can continue to the next lesson. If running standalone, invoke `@skills:system-analysis`. If running as part of the consolidated curriculum, invoke `@skills:training-phase-1` which includes this lesson.

---

## Training Progress

**Recommended:** Use the consolidated `@skills:training-phase-1` instead, which runs this lesson plus system-analysis and desktop-vs-web in a single session (~15 min total), avoiding cold-start overhead between sessions.

**Phase 1 — Foundations:**
1. **designer-intro** (~5 min) — You are here
2. system-analysis (~6 min)
3. desktop-vs-web (~4 min)

**Phase 2 — Design Workflows:**
4. figma-verification (~7 min)
5. ux-writing-review (~6 min)
6. research-benchmarking (~7 min, optional)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
