---
name: training-phase-1
description: "Designer training Phase 1 — Foundations. Covers: meeting Devin, system analysis, and desktop-vs-web gap analysis. Runs in a single session (~15 min)."
triggers: ["user"]
---

**CONTEXT**
This is the first of three training phases for UX designers who do not code. The goal is to make them comfortable interacting with Devin and show them how it can analyze codebases. Keep all explanations non-technical. Never ask the designer to write code, use a terminal, or open an IDE. You are guiding them through the Devin webapp only.

This phase consolidates three lessons (designer-intro, system-analysis, desktop-vs-web) into one session so the designer doesn't need to start multiple sessions. All three lessons run back-to-back below.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again after completing the final lesson.

---

## Lesson 1 of 3: Meet Devin (~5 min)

### Step 1 — Welcome the designer
Explain that Devin is an AI assistant that can read code, run applications, browse the web, and produce documentation — all from natural-language prompts. Designers don't need to write code to use it. Their role is to ask good questions and guide Devin toward the information they need.

### Step 2 — Explain sessions
A session is a single conversation with Devin. Everything Devin does — reading files, running commands, browsing — appears in the session timeline on the left side of the webapp. Tell the designer to look at the timeline as you work to understand what Devin is doing behind the scenes.

### Step 3 — First prompt exercise
Ask the designer to send you the following prompt (or something similar): "What does this application do?" Then explore the repository and explain in plain, non-technical language:
- It's an ERP invoicing application (like a digital version of creating and managing business invoices)
- There's a web version (Angular) and legacy desktop version stubs
- The web version has an invoice list, detail view, and creation form
- There are design system tokens and shared UI components

### Step 4 — Point out the timeline
After your exploration, ask the designer to look at the session timeline. Explain what each step was — "I searched for files," "I read the main app file," "I read the invoice module." The point: Devin shows its work, so the designer can always see what happened.

### Step 5 — Summarize Lesson 1
- You talk to Devin in plain language
- Devin explores the codebase and explains what it finds
- The timeline shows every step
- No coding required — Devin does the technical work, you ask the questions

Tell the designer: "Great — now let's move directly to Lesson 2: System Analysis. No need to start a new session."

---

## Lesson 2 of 3: System Analysis (~6 min)

### Step 1 — Set the stage
Explain that one of the most valuable things Devin can do for designers is analyze a codebase and document how features actually work — including edge cases that are easy to miss when looking only at the UI.

### Step 2 — Time context
Manually documenting every validation rule, error state, and edge case in an invoicing module by reading code or clicking through the desktop app would typically take a designer 2-4 hours. Watch Devin do it in under 2 minutes.

### Step 3 — Run the analysis
Tell the designer you're going to analyze the Invoice module now. Read `src/modules/invoices/services/invoice.service.ts` and the component files. Document:
- All validation rules currently implemented (there are 4)
- The exact error messages for each rule
- What happens when the invoice list is empty (hint: nothing — there's no empty state)
- What the form looks like when submitted with invalid data

### Step 4 — Go beyond the happy path
Now demonstrate the key technique: prompting for what's missing. Ask these questions out loud and answer them:
- "What happens if someone enters a negative amount?" (caught by rule 4)
- "What happens if someone enters an invoice number in the wrong format?" (NOT validated — this is a gap)
- "What happens if someone creates an invoice with zero line items?" (NOT validated — another gap)
- "What does the user see when there are no invoices yet?" (blank table — no empty state)

### Step 5 — Teach the prompting pattern
Explain to the designer that the key to getting Devin past the happy path is to ask specific "what if" questions:
- "What happens when [field] is empty/invalid/negative?"
- "What happens when there are zero [items]?"
- "What error does the user see when [action] fails?"
- "What's missing compared to [reference]?"

### Step 6 — Show the time comparison
You just produced a comprehensive analysis in under 2 minutes that would take hours manually. This is the core value of Devin for design research.

Tell the designer: "Now let's move to Lesson 3: Desktop vs. Web comparison — still in this same session."

---

## Lesson 3 of 3: Desktop vs. Web Gap Analysis (~4 min)

### Step 1 — Explain the use case
One of the biggest challenges in the XL desktop-to-web rewrite is ensuring the web version doesn't silently drop business rules from the desktop app. Devin can read both codebases and produce a gap analysis.

### Step 2 — Read the desktop reference
Read `legacy/validation-rules.html` and list all 6 validation rules defined for the desktop Invoice module. Present them in a simple table: Rule #, Field, What it checks.

### Step 3 — Read the web implementation
Read `src/modules/invoices/services/invoice.service.ts` and list the 4 validation rules currently implemented.

### Step 4 — Produce the gap analysis
Create a comparison table showing:
- Rules implemented in both (V1, V2, V3, V4)
- Rules missing from web (V5: invoice number format, V6: at least one line item)
- For each missing rule, note the desktop error message that should be replicated

### Step 5 — Highlight edge cases
Also note the desktop edge cases from `legacy/validation-rules.html` that have no equivalent in the web app:
- Deleted customer handling
- Cancelled invoice restrictions
- Duplicate invoice number detection
- Weekend/holiday due date adjustment
- Zero-quantity line items for credit notes

### Step 6 — Teach the pattern
Explain that the designer can use this same approach for any module: "Compare the desktop [Module] against the web implementation and tell me what validation rules and edge cases are missing." This saves enormous time vs. manually clicking through both applications.

---

## Phase 1 Complete

Congratulate the designer on finishing Phase 1. They've learned to:
- Talk to Devin and read the session timeline
- Analyze systems beyond the happy path
- Compare desktop vs. web implementations

Tell the designer to start a new session and invoke: `@skills:training-phase-2`

---

## Training Progress

**Estimated total training time: ~35 minutes** (down from ~55 min with consolidated phases)

**Phase 1 — Foundations (~15 min):**
- Lesson 1: Meet Devin (~5 min)
- Lesson 2: System Analysis (~6 min)
- Lesson 3: Desktop vs. Web (~4 min)
- **You are here**

**Phase 2 — Design Workflows (~12 min):**
- Lesson 4: Figma Verification (~7 min)
- Lesson 5: UX Writing Review (~5 min)
- Bonus: Competitive Research (optional, async)

**Phase 3 — Building Reusable Automation (~8 min):**
- Lesson 6: Knowledge (~3 min)
- Lesson 7: Playbooks (~3 min)
- Lesson 8: Skills (~2 min)
