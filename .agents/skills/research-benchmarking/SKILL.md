---
name: research-benchmarking
description: Use Devin's computer use to browse competitor ERP systems, capture screenshots of key flows, and produce structured comparison reports.
triggers: ["user"]
---

**CONTEXT**
This is a training skill for UX designers. The designer does not code. All output should be in plain language. Use the Devin webapp only.

**IMPORTANT:** Display the Training Progress section (at the bottom of this skill) as the FIRST thing when this skill is invoked, and again as the LAST thing before directing the designer to the next skill.

## Steps

1. **Explain the use case.** When designing new features, the team researches how other ERP systems handle the same workflows — invoice creation, list views, error handling, empty states. Devin can do this research using computer use (browsing the web, taking screenshots).

2. **Set expectations.** Be upfront about what Devin can and cannot produce:
   - **Can do:** Browse web apps, capture screenshots, describe what it sees, produce markdown comparison tables, annotate findings
   - **Cannot do:** Create Figma designs, produce interactive prototypes, generate visual mockups
   - Output is documentation and screenshots — a starting point and inspiration, not a finished design artifact

3. **Demo the research flow.** Tell the designer you're going to research how other systems handle invoice list views. Using computer use, browse 2-3 publicly accessible ERP demo sites or screenshots. For each, note:
   - Layout pattern (table vs. cards vs. hybrid)
   - Column/field choices
   - How they handle empty states
   - Sorting and filtering UI
   - Status indicator design

   If live demos are unavailable, search for screenshots of ERP invoice interfaces and describe what you find.

4. **Produce a comparison table.** Organize findings into a structured table:
   | Feature | System A | System B | System C | XL Web (current) |
   | --- | --- | --- | --- | --- |
   | Empty state | ... | ... | ... | None (blank table) |
   | Status indicators | ... | ... | ... | Colored badges |
   | etc. | | | | |

5. **Discuss the boundaries.** Explain that the designer should treat Devin's research output as:
   - A time-saver for initial research
   - A structured starting point for design discussions
   - NOT a replacement for their own design judgment
   - Screenshots and tables go into their analysis docs, not directly into Figma

6. **Wrap up.** Tell the designer to continue to the next lesson. If running standalone, invoke `@skills:figma-verification`. If running as part of the consolidated curriculum, this skill is an optional bonus — return to `@skills:training-phase-2` for the main flow.

   **Note:** A pre-cached comparison table is also available at `docs/competitor-benchmarks.md` for immediate reference without the browser overhead.

---

## Training Progress

**Note:** This skill is optional and not required for the main training flow. The consolidated `@skills:training-phase-2` covers figma-verification and ux-writing-review without browser overhead. Run this skill separately when you want live competitive research.

**Phase 1 — Foundations:**
1. ~~designer-intro~~ (~5 min)
2. ~~system-analysis~~ (~6 min)
3. ~~desktop-vs-web~~ (~4 min)

**Phase 2 — Design Workflows:**
4. figma-verification (~7 min)
5. ux-writing-review (~6 min)
6. **research-benchmarking** (~7 min, optional) — You are here

**Phase 3 — Building Reusable Automation:**
7. learn-knowledge (~5 min)
8. learn-playbooks (~7 min)
9. learn-skills (~8 min)
