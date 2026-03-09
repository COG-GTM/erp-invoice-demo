# ERP Invoice Demo

A training application for learning [Devin](https://app.devin.ai) and [Windsurf](https://windsurf.com/) through hands-on exercises with a realistic ERP invoice module.

The app is a simplified Angular recreation of an ERP invoicing system with intentional design debt and logic gaps for training purposes.

## Getting Started (for Designers)

You have **two options** to access the running app — choose whichever is easier for you:

### Option A: Use the Live Demo (no install needed)

A hosted version of the app is available at:

> **https://cog-gtm.github.io/erp-invoice-demo/**

Open the link in any browser. No downloads, no terminal, no setup required.

### Option B: Run Locally on Your Machine

If you prefer to run the app on your own computer, follow these steps. If you've never used a terminal before, don't worry — just follow each step exactly as written.

#### Step 1: Install Node.js

Node.js is the tool that runs the app. You only need to install it once.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the **LTS** (Long Term Support) button — this downloads the installer
3. Open the downloaded file and follow the installer prompts (click "Next" / "Continue" through each step, accepting defaults)
4. **Verify it worked:** Open your terminal and type:
   ```bash
   node --version
   ```
   You should see a version number like `v18.x.x` or higher. If you see an error, restart your terminal and try again.

**How to open a terminal:**
- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Windows:** Press the Windows key, type "Command Prompt" or "PowerShell", press Enter

#### Step 2: Install Git (if you don't have it)

Git is used to download the project. Many computers already have it.

1. **Check if you already have Git:** In your terminal, type:
   ```bash
   git --version
   ```
   If you see a version number, skip to Step 3. If you see an error, continue below.

2. **Install Git:**
   - **Mac:** When you ran `git --version`, macOS may have prompted you to install Command Line Tools. Click "Install" if prompted. Otherwise, download from [https://git-scm.com/downloads](https://git-scm.com/downloads).
   - **Windows:** Download from [https://git-scm.com/downloads](https://git-scm.com/downloads). Run the installer with default settings.

#### Step 3: Download the Project

In your terminal, type these commands one at a time, pressing Enter after each:

```bash
git clone https://github.com/doristian23/erp-invoice-demo.git
```

```bash
cd erp-invoice-demo
```

#### Step 4: Install Dependencies

This downloads all the libraries the app needs. It may take a minute or two.

```bash
npm install
```

If you see warnings (yellow text), that's normal — you can ignore them. Only red "ERROR" text means something went wrong.

#### Step 5: Install Angular CLI

Angular CLI is the tool that starts the development server:

```bash
npm install -g @angular/cli
```

#### Step 6: Start the App

```bash
ng serve
```

Wait until you see a message like: `** Angular Live Development Server is listening on localhost:4200 **`

Then open your browser and go to: **http://localhost:4200**

You should see the ERP Invoice application!

**To stop the app:** Go back to your terminal and press `Ctrl + C`.

**To restart later:** Open your terminal, navigate to the project folder, and run `ng serve` again:
```bash
cd erp-invoice-demo
ng serve
```

---

## Two Tracks, One Repo

### Track A: Designers (Devin webapp)

9 guided skills teaching designers how to use Devin for UX research, system analysis, and building reusable automation — no coding required.

**Before you start**, familiarize yourself with the three ways to interact with Devin:

| Tool | What it's for | How to access |
| --- | --- | --- |
| **DeepWiki** | Instant answers about the codebase — "What is this app?", "What tokens exist?" | Go to [deepwiki.com](https://deepwiki.com), paste the repo URL, ask a question |
| **Ask Devin** | Quick code lookups — "What validation rules exist?", "Any token mismatches?" | Open [app.devin.ai](https://app.devin.ai), use the Ask Devin input |
| **Full Session** | Multi-step work, skills, file changes, web browsing, screenshots | Open [app.devin.ai](https://app.devin.ai), click New Session, select the repo |

**Rule of thumb:** Use DeepWiki for "what is X?", Ask Devin for "what does the code say about X?", and Full Sessions for multi-step tasks.

Trigger skills in the Devin webapp with `@skills:<skill-name>`:

**Phase 1 — Foundations (~15 min)**
1. `designer-intro` — What Devin is, how sessions work, choosing the right tool
2. `system-analysis` — Analyze the codebase beyond the happy path
3. `desktop-vs-web` — Compare legacy desktop vs. web implementation

**Phase 2 — Design Workflows (~20 min)**
4. `research-benchmarking` — Competitive research with computer use
5. `figma-verification` — Figma vs. implementation discrepancy reports
6. `ux-writing-review` — Audit user-facing strings for consistency

**Phase 3 — Building Reusable Automation (~20 min)**
7. `learn-knowledge` — Create Knowledge entries in the Devin web UI
8. `learn-playbooks` — Create Playbooks for repeatable UX reviews
9. `learn-skills` — Author SKILL.md files for version-controlled procedures

### Track B: Developers (Windsurf IDE)

10 guided workflows for fullstack Angular developers.

Trigger workflows in Windsurf with `/<workflow-name>`:

**Phase 1 — IDE Foundations (~12 min)**
1. `/developer-intro`
2. `/developer-context-and-rules`
3. `/developer-skills-overview`

**Phase 2 — Use Cases (~38 min)**
4. `/design-token-audit`
5. `/ux-copy-fixes`
6. `/component-implementation`
7. `/accessibility-remediation`
8. `/api-endpoint-and-data`
9. `/figma-to-code`
10. `/testing-and-ci`

## Project Structure

```
src/
  tokens/           Design tokens (colors, spacing, typography)
  components/ui/    Shared UI component library
  modules/invoices/ Invoice CRUD module (list, detail, create, errors)
legacy/             Simplified desktop stub pages
docs/               UX glossary, design system documentation
.agents/skills/     Devin skills (both tracks)
.windsurf/workflows/ Windsurf workflows (developer track)
scripts/            Verification utilities
```

## Planted Defects (for training)

This repo contains intentional issues that training exercises discover and fix:

- **Missing validation rules**: Desktop has 6 invoice validation rules; web implements only 4
- **Token mismatch**: `--color-error` is `#e53e3e` in code but `#dc2626` in Figma spec
- **Modal padding**: `24px` in code vs `32px` in Figma spec
- **Inconsistent error messages**: Mix of "Invalid X" and "[What happened] + [What to do]" formats
- **Bad button labels**: 3 buttons use "Submit" instead of action verbs
- **Missing empty state**: Invoice list shows blank space when no invoices exist
