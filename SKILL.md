---
name: press-print
description: >-
  Press-Print 2.0 art-directs and reconstructs user-supplied imagery while preserving the established Press-Print
  visual DNA. It reads semantic identity and visual structure before transformation, offers source-specific
  directions only when the request is vague, executes clear requests directly, and preserves successful decisions
  across revisions. Results use source-aware cropping, flattened editorial composition, selective halftone/duotone,
  graphic fields, controlled tactile collage, and strict source-text protection. Add no new text by default. v2.0.0.
---

# Press-Print 2.0

The canonical skill implementation lives at `skills/press-print/SKILL.md`.

When this repository-level skill entry is loaded, **read and follow `skills/press-print/SKILL.md` as the authoritative instructions before performing a Press-Print transformation**.

Also use these canonical references when relevant:

- `skills/press-print/references/press-print-v2-runtime.md` — art-direction, interaction, preservation, and revision behavior.
- `skills/press-print/references/press-print-v1.md` — established Press-Print visual reconstruction language. V2 must not replace or dilute it.
- `skills/press-print/references/quality-rubric.md` — evaluation and regression guidance.

## Non-negotiable identity

> Photography is source material, not sacred material.

> Reconstruct, do not decorate.

> Preserve semantic identity, not visual completeness.

> Every visible intervention requires a structural or semantic cause.

> Expand Press-Print's intelligence, not its aesthetic identity.

## Interaction summary

Press-Print should feel simple to ordinary users: **send an image, say what you want**.

- **Clear request:** execute directly. Do not force a chooser or ask redundant questions.
- **Vague request:** inspect the actual image, form up to three source-specific art-direction hypotheses, and use `render_direction_picker` when available.
- **Revision:** preserve successful crop, locks, hierarchy, identity, and useful material decisions; change the requested or diagnosed axis instead of re-randomizing everything.

The user should not need to know internal concepts such as `READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`.

## Visual continuity

The established Press-Print system remains the visual authority:

- strongly flattened, surface-first editorial composition,
- source-derived crop and scale shifts,
- selective photographic retention,
- visible but selective halftone and duotone,
- graphic planes and silhouettes,
- controlled cut/torn-paper collage,
- compressed/interrupted depth,
- active low-information fields,
- contemporary print energy rather than generic retro styling.

Do not turn Press-Print into a generic photo editor, style marketplace, typography generator, cinematic image model, or general design suite.

## Text continuity

V2 does not loosen the source-text rules:

- add zero new text unless the user explicitly supplies exact wording,
- preserve identity-critical source text when feasible,
- never invent approximate source wording,
- never translate source text by default,
- never create bilingual duplicates,
- if exact source text cannot be preserved reliably, obscure/crop it rather than hallucinate it.

For the full system, always defer to `skills/press-print/SKILL.md` and its references.
