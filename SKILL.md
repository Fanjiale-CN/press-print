---
name: press-print
description: >-
  Press Print 2.0 art-directs and reconstructs user-supplied imagery while preserving the established Press Print
  visual DNA. It reads semantic identity and visual structure before transformation, exposes a simple Direction +
  Structure + Intensity host UI when useful, executes clear requests directly, and preserves successful decisions
  across revisions. Results use source-aware cropping, flattened editorial composition, selective halftone/duotone,
  graphic fields, controlled tactile collage, and strict source-text protection. Add no new text by default unless the
  user explicitly selects Typography generated-text behavior or supplies exact wording. v2.0.0.
---

# Press Print 2.0

The canonical skill implementation lives at `skills/press-print/SKILL.md`.

When this repository-level skill entry is loaded, **read and follow `skills/press-print/SKILL.md` as the authoritative instructions before performing a Press Print transformation**.

Also use these canonical references when relevant:

- `skills/press-print/references/press-print-v2-runtime.md` — art-direction, interaction, preservation, and revision behavior.
- `skills/press-print/references/press-print-v1.md` — established Press Print visual reconstruction language. V2 must not replace or dilute it.
- `skills/press-print/references/quality-rubric.md` — evaluation and regression guidance.
- `docs/PRESS_PRINT_HOST_UI_V1.md` — canonical first-version ChatGPT host UI and version-state model.

## Non-negotiable identity

> Photography is source material, not sacred material.

> Reconstruct, do not decorate.

> Preserve semantic identity, not visual completeness.

> Every visible intervention requires a structural or semantic cause.

> Expand Press Print's intelligence, not its aesthetic identity.

## Interaction summary

Press Print should feel simple to ordinary users.

- **Clear request:** execute directly without forcing an unnecessary control round trip.
- **Vague or exploratory request:** inspect the actual image and use `render_creation_card` when available. The card exposes Direction, Structure, Intensity, and minimal special fields only.
- **Revision:** preserve successful crop, locks, hierarchy, identity, active version state, and useful material decisions; change the requested or diagnosed axis instead of re-randomizing everything.
- **After a result:** `render_result_card` may expose Refine, Try Another, and Use This. Refine remains language-driven.

The first-version Direction choices are Editorial Print, Flat Graphic, Collage, Typography, Restore, and Custom.

Typography is an explicit exception to the default zero-new-text rule. Restore is a source-preserving Press Print mode, not automatic archival photo restoration.

The user should not need to know internal concepts such as `READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`.

## Visual continuity

The established Press Print system remains the visual authority:

- strongly flattened, surface-first editorial composition,
- source-derived crop and scale shifts,
- selective photographic retention,
- visible but selective halftone and duotone,
- graphic planes and silhouettes,
- controlled cut/torn-paper collage,
- compressed/interrupted depth,
- active low-information fields,
- contemporary print energy rather than generic retro styling.

Do not turn Press Print into a generic photo editor, style marketplace, cinematic image model, or parameter-heavy design suite.

## Text continuity

Default behavior remains conservative:

- add zero new text unless the user explicitly supplies exact wording or enters Typography Generate text mode,
- preserve identity-critical source text when feasible,
- never invent approximate source wording,
- never translate source text by default,
- never create bilingual duplicates by default,
- if exact source text cannot be preserved reliably, obscure/crop it rather than hallucinate it.

For the full system, always defer to `skills/press-print/SKILL.md` and its references.
