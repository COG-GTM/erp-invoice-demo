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

3. **Introduce the three ways to talk to Devin.** Before the first exercise, teach the designer that Devin offers three interaction modes — each suited to different tasks. Present this clearly:

   **DeepWiki** — For instant answers about the codebase (no session needed)
   - What it is: An auto-generated wiki that indexes the entire repository. It already knows the structure, purpose, and key files of the project.
   - When to use it: When you want to understand what something is or how the project is organized. Think "reference lookup."
   - How to use it:
     1. Go to [https://deepwiki.com](https://deepwiki.com)
     2. Paste the repository URL (e.g., `https://github.com/COG-GTM/erp-invoice-demo`) into the search bar
     3. Browse the auto-generated wiki pages, or type a question in the search/chat box (e.g., "What does this application do?")
     4. You get an instant answer — no session, no waiting
   - Best for: "What is this app?", "What files make up the invoice module?", "What design tokens exist?"

   **Ask Devin** — For quick questions that need light analysis (no full session needed)
   - What it is: A quick-answer chat in the Devin webapp. Devin reads the code and answers your question without spinning up a full session with a timeline.
   - When to use it: When you need Devin to look something up or do a quick comparison, but you don't need a multi-step workflow.
   - How to use it:
     1. Open the Devin webapp at [https://app.devin.ai](https://app.devin.ai)
     2. Look for the **"Ask Devin"** option (it may appear as a quick-ask input or a toggle near the new session button)
     3. Type your question (e.g., "What validation rules exist in the Invoice module?")
     4. Devin reads the relevant files and responds in seconds
   - Best for: "What validation rules exist?", "Are there any token mismatches?", "What error messages does this service return?"

   **Full Session** — For multi-step work, file changes, and complex analysis
   - What it is: A full conversation with a timeline showing every action Devin takes. This is the most powerful mode.
   - When to use it: When you need Devin to do multi-step analysis, create files, browse the web, take screenshots, or run skills.
   - How to use it:
     1. Open [https://app.devin.ai](https://app.devin.ai)
     2. Click **"New Session"**
     3. Select the repository you want to work with
     4. Type your prompt or invoke a skill with `@skills:<skill-name>`
   - Best for: Running skills, competitive research with screenshots, creating Knowledge/Playbooks/Skills, anything that modifies files

   **Quick rule of thumb:**
   | Question type | Use |
   | --- | --- |
   | "What is X?" / "How is Y structured?" | DeepWiki |
   | "What does the code say about X?" / quick lookup | Ask Devin |
   | Multi-step analysis, file changes, browsing, skills | Full Session |

4. **First prompt exercise — try DeepWiki first.** Walk the designer through trying DeepWiki:
   - "Go to deepwiki.com, paste the repo URL, and ask: 'What does this application do?' — notice you get an instant answer with no session needed."
   
   Then explain that in this current session (which is a full session because we're running a skill), you'll also explore the repo live to show the difference. Explore the repository and explain in plain, non-technical language:
   - It's an ERP invoicing application (like a digital version of creating and managing business invoices)
   - There's a web version (Angular) and legacy desktop version stubs
   - The web version has an invoice list, detail view, and creation form
   - There are design system tokens and shared UI components
   
   Point out: "See how DeepWiki answered that same question instantly? For simple 'what is this?' questions, DeepWiki is faster. But for the deeper exploration we're about to do in later lessons, you'll need full sessions."

5. **Point out the timeline.** After your exploration, ask the designer to look at the session timeline. Explain what each step was — "I searched for files," "I read the main app file," "I read the invoice module." The point: Devin shows its work, so the designer can always see what happened.

6. **Wrap up.** Summarize:
   - You talk to Devin in plain language
   - Use **DeepWiki** for instant repo knowledge, **Ask Devin** for quick code questions, and **Full Sessions** for multi-step work
   - The timeline shows every step in a full session
   - No coding required — Devin does the technical work, you ask the questions

   Tell the designer to start a new session and invoke the next skill: `@skills:system-analysis`

---

## Training Progress

**Estimated total training time: ~55 minutes**

**Phase 1 — Foundations:**
1. **designer-intro** (~5 min) — You are here
2. system-analysis (~6 min)
3. desktop-vs-web (~4 min)

**Phase 2 — Design Workflows:**
4. research-benchmarking (~7 min)
5. figma-verification (~7 min)
6. ux-writing-review (~6 min)

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
