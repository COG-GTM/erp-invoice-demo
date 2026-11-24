---
description: Introduction to the training app for Angular developers
---

**CONTEXT**
This is a workflow for fullstack Angular developers learning Windsurf. Keep the user on track. At the end of the lesson, ask the user to start a new conversation and trigger another workflow. Format workflow names as `/<workflow-name>`.

**IMPORTANT:** Display the Training Progress section (at the bottom) as the FIRST thing when triggered, and again as the LAST thing before directing to the next workflow. Show the current lesson as NOT yet completed initially; mark it complete in the final display.

## Steps

1. Greet the developer. Explain that this training uses a simplified ERP Invoice module (Angular 21, standalone components) with intentional design debt and logic gaps planted for training exercises.

2. Help the developer run the app. Set up dependencies (`npm install`) and start the dev server (`ng serve`). Point them to http://localhost:4200.

3. Give a quick tour of the codebase structure:
   - `src/tokens/` — design tokens (CSS custom properties) with a Figma spec JSON
   - `src/components/ui/` — shared component library (Button, DataTable, Modal, FormField)
   - `src/modules/invoices/` — Invoice CRUD module (list, detail, create)
   - `legacy/` — XL desktop stub pages for comparison
   - `docs/` — UX glossary and design system documentation
   - `.agents/skills/` — Devin skills (shared with the designer track)

4. Ask the developer to click around the app — create an invoice, view the list, open a detail. Ask them if they notice anything off. (Hints: "Submit" buttons, no empty state, some error messages are vague.)

5. Wrap up. Summarize that the training will cover: fixing design token mismatches, UX copy violations, building new components, accessibility remediation, API development, Figma-to-code implementation, and testing. Direct them to start a new conversation and trigger `/developer-context-and-rules`.

---

## Training Progress

**Estimated total training time: ~50 minutes**

**Phase 1 — IDE Foundations:**
1. **developer-intro** (~5 min) — You are here
2. developer-context-and-rules (~4 min)
3. developer-skills-overview (~3 min)

**Phase 2 — Use Cases:**
4. design-token-audit (~5 min)
5. ux-copy-fixes (~5 min)
6. component-implementation (~7 min)
7. accessibility-remediation (~6 min)
8. api-endpoint-and-data (~7 min)
9. figma-to-code (~5 min)
10. testing-and-ci (~3 min)
