---
name: init-design-checks
description: Set up design verification skills in a new repo. Creates the .agents/skills directory and starter skill files, then customizes paths based on your project.
triggers: ["user"]
---

## Context

This skill is meant to be run inside a repo that does not yet have design verification skills. It scaffolds the folder structure and skill files so the designer can immediately start using `design-token-audit`, `cli-ux-review`, `cli-desktop-parity`, and `cli-check-all`.

## Steps

1. **Check for existing setup.** Look for `.agents/skills/` in the current repo. If it already exists and contains CLI skills, let the user know and ask if they want to overwrite or skip.

2. **Ask the designer about their project.** Collect these answers conversationally (plain language, no jargon):

   - "Where are your design tokens defined?" (e.g., a CSS file, a JSON file, a Tailwind config)
   - "Do you have a spec or source-of-truth file for token values?" (e.g., a JSON export from Figma, a style guide)
   - "Do you have a UX writing glossary or copy guidelines?" (e.g., a markdown file, a wiki page)
   - "Is there a legacy or reference version of the app you want to compare against?" (e.g., old HTML pages, a desktop app, documentation of existing behavior)
   - "Which folder contains your main UI modules or features?" (e.g., `src/modules/`, `src/features/`, `app/`)

   If the designer doesn't have something (no glossary, no legacy reference), skip that skill — only create the ones that apply.

3. **Create the directory structure.** For each applicable skill, create:
   ```
   .agents/skills/design-token-audit/SKILL.md
   .agents/skills/cli-ux-review/SKILL.md
   .agents/skills/cli-desktop-parity/SKILL.md
   .agents/skills/cli-check-all/SKILL.md
   ```

4. **Write the skill files.** Use the same structure as the templates in this repo, but replace paths with the answers from step 2:

   - **design-token-audit**: Replace `src/tokens/tokens.spec.json` and `src/tokens/tokens.css` with the designer's token spec and implementation paths.
   - **cli-ux-review**: Replace `docs/ux-glossary.md` with the designer's glossary path. Replace `src/modules/` with their modules path.
   - **cli-desktop-parity**: Replace `legacy/validation-rules.html` and `src/modules/invoices/services/invoice.service.ts` with the designer's legacy reference and web implementation paths.
   - **cli-check-all**: References the other three skills, no path changes needed.

   If a skill was skipped (no glossary, no legacy reference), omit it from `cli-check-all` as well.

5. **Print the cheat sheet.** After creating the files, output:

   ```
   Setup complete! Here are your commands:

   devin "@skills:design-token-audit"     Check tokens against the design spec
   devin "@skills:cli-ux-review"         Review UX writing in a module
   devin "@skills:cli-desktop-parity"    Compare legacy vs. web implementation
   devin "@skills:cli-check-all"         Run all checks at once

   Tip: Add these aliases to your shell profile for quick access:

   alias check-tokens='devin "@skills:design-token-audit"'
   alias check-ux='devin "@skills:cli-ux-review"'
   alias check-parity='devin "@skills:cli-desktop-parity"'
   alias check-all='devin "@skills:cli-check-all"'
   ```

   Only list the skills that were actually created.

6. **Offer to commit.** Ask the designer if they'd like to commit the new skill files to the repo so the rest of the team can use them.
