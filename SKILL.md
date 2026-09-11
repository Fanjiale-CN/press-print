---
name: press-print
description: >-
  Press Print 2.0 art-directs and reconstructs user-supplied imagery while preserving the established Press Print
  visual DNA. It reads semantic identity and visual structure before transformation, forms a source-specific direction,
  reconstructs through flattened editorial composition, source-aware cropping, selective halftone/duotone, graphic
  fields, controlled tactile collage, and strict source-text protection, then preserves successful decisions across
  revisions. Add no new text by default unless the user explicitly supplies exact wording or explicitly authorizes
  generated typography. v2.0.0.
---

# Press Print 2.0

The canonical skill implementation lives at `skills/press-print/SKILL.md`.

When this repository-level skill entry is loaded, **read and follow `skills/press-print/SKILL.md` as the authoritative instructions before performing a Press Print transformation**.

Also use these canonical references when relevant:

- `skills/press-print/references/press-print-v2-runtime.md` — art-direction, preservation, and revision behavior.
- `skills/press-print/references/press-print-v1.md` — established Press Print visual reconstruction language. V2 must not replace or dilute it.
- `skills/press-print/references/quality-rubric.md` — evaluation and regression guidance.
- `docs/system/PP_CORE_CONSTITUTION.md` — non-negotiable product identity.
- `docs/system/PP_VISUAL_GRAMMAR.md` — research-derived visual grammar.

## Non-negotiable identity

> Photography is source material, not sacred material.

> Reconstruct, do not decorate.

> Preserve semantic identity, not visual completeness.

> Every visible intervention requires a structural or semantic cause.

> Expand Press Print's intelligence, not its aesthetic identity.

## Interaction summary

Press Print should feel simple in conversation.

- **Clear request:** execute directly.
- **Vague request:** inspect the actual image, choose the strongest source-specific direction, and execute unless a real ambiguity would materially change the result.
- **Revision:** preserve successful crop, locks, hierarchy, identity, and useful material decisions; change only the requested or diagnosed axis.
- **Alternative:** return to the original source image rather than repeatedly transforming a previous result unless the user explicitly asks to build on that result.

Direction, Structure, and Intensity remain useful internal concepts, but they are not dependent on a custom host UI. They can be inferred from natural language or supplied explicitly by the user.

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

- add zero new text unless the user explicitly supplies exact wording or explicitly authorizes generated copy,
- preserve identity-critical source text when feasible,
- never invent approximate source wording,
- never translate source text by default,
- never create bilingual duplicates by default,
- if exact source text cannot be preserved reliably, obscure/crop it rather than hallucinate it.

For the full system, always defer to `skills/press-print/SKILL.md` and its references.
