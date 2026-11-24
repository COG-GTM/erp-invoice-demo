# ERP Invoice Demo

A training application for learning [Devin](https://app.devin.ai) and [Windsurf](https://windsurf.com/) through hands-on exercises with a realistic ERP invoice module.

The app is a simplified Angular recreation of an ERP invoicing system with intentional design debt and logic gaps for training purposes.

## Two Tracks, One Repo

### Track A: Designers (Devin webapp)

9 guided skills teaching designers how to use Devin for UX research, system analysis, and building reusable automation — no coding required.

Trigger skills in the Devin webapp with `@skills:<skill-name>`:

**Phase 1 — Foundations (~15 min)**
1. `designer-intro` — What Devin is, how sessions work
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

## Prerequisites

- Node.js 20.19+, 22.12+ or 24+ and npm (required by Angular 21)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

```bash
git clone <repository-url>
cd erp-invoice-demo
npm install
ng serve
```

Open http://localhost:4200 in your browser.

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
