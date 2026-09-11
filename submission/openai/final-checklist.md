# Final Submission Readiness Checklist — Press Print 2.0

This checklist covers the UI-independent Skills-only Press Print 2.0 package.

## Repository readiness

- [x] Public product name is `Press Print`.
- [x] Package version is `2.0.0`.
- [x] Plugin manifest is present at `.codex-plugin/plugin.json`.
- [x] Packaged Skill is present at `skills/press-print/`.
- [x] Packaged references include `press-print-v1.md`, `press-print-v2-runtime.md`, and `quality-rubric.md`.
- [x] The seven canonical 2.0 research/system outputs are retained.
- [x] ChatGPT host UI source code has been removed from the active product architecture.
- [x] Host-UI specification documents have been removed from the active product architecture.
- [x] The Skill no longer depends on creation/result cards, widgets, or MCP UI tools.
- [x] Direction / Structure / Intensity remain available as natural-language product semantics.
- [x] Revision continuity remains part of the 2.0 behavior.
- [x] Source-text protection remains strict.
- [x] Light and dark Press Print logo assets are present.
- [x] Privacy and Terms describe a Skills-only architecture with no separate Press Print MCP service.

## Behavior checks

- [ ] Re-test default vague invocation with representative source images.
- [ ] Confirm vague requests produce autonomous source-specific judgment rather than a menu or generic preset list.
- [ ] Confirm explicit requests execute directly.
- [ ] Confirm a revision preserves successful crop, identity, hierarchy, locks, and useful material decisions.
- [ ] Confirm an alternative-from-source returns to the original source image unless the user requests otherwise.
- [ ] Confirm default results are visibly reconstructed rather than ordinary photo styling.
- [ ] Confirm material effects remain selective and causally justified.
- [ ] Confirm zero new text is added by default.
- [ ] Confirm uncertain source text is obscured/cropped rather than hallucinated.
- [ ] Confirm source text is not translated or bilingual-duplicated by default.
- [ ] Run representative cases from `docs/system/PP_REGRESSION_BENCHMARK.md`.

## Submission package

The final ZIP should preserve this relevant structure:

```text
.codex-plugin/
└── plugin.json

skills/
└── press-print/
    ├── SKILL.md
    └── references/
        ├── press-print-v1.md
        ├── press-print-v2-runtime.md
        └── quality-rubric.md

assets/
├── press-print-logo-light.svg
└── press-print-logo-dark.svg
```

Do not include the retired `apps/press-print-chatgpt/` implementation as an active runtime dependency.

## Review materials

- [x] 2.0 listing copy prepared.
- [x] Three 2.0 starter prompts prepared.
- [x] Positive and negative review-test framework prepared.
- [x] 2.0 release notes prepared.
- [x] Public website, support, privacy, and terms URLs are listed.
- [x] Developer / publisher relationship remains `Fan Jiale` / `Galok`.

## Portal actions

- [ ] Build the final Plugin ZIP from the reviewed repository state.
- [ ] Upload that exact ZIP to the OpenAI submission flow.
- [ ] Confirm the portal parses `.codex-plugin/plugin.json` successfully.
- [ ] Copy the finalized listing details and starter prompts.
- [ ] Add the positive and negative tests from `test-cases.md`.
- [ ] Confirm country / region availability at submission time.
- [ ] Review all policy attestations before submission.

## Go / no-go status

**Status: 2.0 UI-FREE REPOSITORY STRUCTURE READY; VISUAL REGRESSION RETEST + FINAL ZIP BUILD PENDING.**
