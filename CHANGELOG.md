# Changelog

## 1.0.2 — 2026-09-10

### Changed

- rebuilt the master prompt around stronger flat, planar, and designed-2D-surface composition
- added the default zero-new-text rule for sources with and without visible text
- prohibited translation, parallel bilingual versions, and second-language equivalents of monolingual source text
- added explicit handling for source content that is already bilingual
- added the exact-user-wording exception without permitting extra copy, translation, or unrequested bilingual variants
- added text-footprint guidance of about 15% total readable area and about 8% for any single readable block unless the user explicitly requests larger treatment of their exact supplied text
- added high text-density scene guidance that preserves typographic density rather than typographic completeness
- strengthened halftone as a clearly visible, intentionally varied structural device
- strengthened torn-paper collage through visible tears, cut-paper overlaps, rough interruptions, pasted fragments, and deliberate paper-layer transitions
- synchronized the universal Skill, OpenAI-packaged Skill, master prompt, packaged prompt reference, quality rubric, manifest, listing copy, and review tests
- bumped OpenAI plugin metadata to `1.0.2`

### Text-control contract

A compliant v1.0.2 result adds zero new text by default. Source text remains in its original language and may be retained, cropped, obscured, fragmented, or reduced. When a user explicitly supplies text to add, only that exact wording may appear; no translation, bilingual duplication, subtitle, caption, label, or filler copy may be added.

## 1.0.1 — 2026-09-10

### Changed

- replaced the ambiguous `text-free` wording with an explicit no-new-typography rule
- added a four-part source-text policy for incidental, scene-identifying, identity-critical, and text-dominant sources
- added the governing principle: `Source text is content. New typography is generation.`
- added a fallback rule: if exact source text cannot be preserved reliably, crop, obscure, simplify, or retain it as photographic texture rather than hallucinating a replacement
- strengthened hard failures for pseudo-text, filler editorial copy, translated/rewritten/duplicated source text, enlarged source-text headlines, and approximate hallucinated replacements
- reduced prompt language that strongly implied typography-led poster or magazine-cover design
- clarified that Press-Print hierarchy must come from crop, scale, color, texture, source-derived geometry, overlap, and negative space rather than generated headlines or body copy
- synchronized the universal Skill, OpenAI-packaged Skill, master prompt, packaged reference, and quality rubric around the same text policy
- updated OpenAI starter prompts to explicitly prohibit new text while allowing source text to survive selectively
- bumped OpenAI plugin metadata to `1.0.1`
- aligned manifest developer name with the verified public developer identity `Fan Jiale`

### Regression target

The v1.0.1 hotfix specifically addresses a failure pattern observed after the initial public release: source photographs containing signage could trigger newly invented editorial headlines, filler copy, duplicated source words, or pseudo-text even though v1.0 prohibited generated typography.

A compliant v1.0.1 result may retain original source signage when it contributes to semantic identity, but must not generate new typography.

## Unreleased — OpenAI Plugin packaging

### Added

- `.codex-plugin/plugin.json` for OpenAI plugin packaging
- `skills/press-print/SKILL.md` as the OpenAI-packaged Skill entry point
- self-contained bundled references for the master prompt and quality rubric
- OpenAI host behavior for missing-image handling and direct image-generation/editing execution when available
- compact Press-Print plugin icon based on the canonical Galok mark
- dark and light SVG variants of the publisher mark
- `BRAND.md` defining the Press-Print / Galok publisher relationship and listing copy
- `PRIVACY.md`, `TERMS.md`, and `SUPPORT.md` for public review and distribution
- public Press-Print landing, privacy, terms, and support routes on `galok.me`
- repo-scoped development marketplace at `.agents/plugins/marketplace.json`
- `eval/openai-plugin-test-plan.md` covering direct, indirect, follow-up, negative, boundary, and image-tool execution tests
- starter prompts and public support contact metadata in the OpenAI plugin manifest

### Listing metadata

- public display name: `Press-Print`
- developer / publisher brand: `Galok`
- verified individual publisher identity: `Fan Jiale`
- category: `Creativity`
- short description: `Editorial photo reconstruction`
- current prepared submission version: `1.0.2`
- website: `https://www.galok.me/press-print/`
- privacy: `https://www.galok.me/press-print/privacy/`
- terms: `https://www.galok.me/press-print/terms/`
- support: `https://www.galok.me/press-print/support/`
- brand color: `#111111`

### Architecture

- remains a Skills-only plugin with no MCP server, authentication layer, or external runtime dependency
- root `SKILL.md` remains the canonical universal Agent Skill entry point
- packaged references carry equivalent reconstruction and source-text rules for the OpenAI host
- behavioral changes require a versioned release and a changelog entry
- development marketplace exposes the repository-root plugin for local ChatGPT desktop installation and testing

## 1.0.0 — 2026-09-09

Initial Press-Print image-only release.

### Added

- source-aware reconstruction workflow
- structural anchor preservation
- Disassemble / Recompose / Reassign / Reduce / Hierarchize method
- selective photographic, printed, graphic, and collaged visual states
- source-derived graphics rule
- limited-palette print language
- selective halftone guidance
- collage discipline rules
- explicit failure modes
- 100-point quality rubric
- 10 canonical high-resolution before/after showcase plates across multiple source categories

### Baseline status

- v1.0.0 established the initial image-only core baseline
- the root `SKILL.md` remains the canonical universal Agent Skill entry point
- platform-specific packaging may add manifests, metadata, assets, or synchronized Skill copies
- behavioral changes require a versioned release and a changelog entry

### Intentionally excluded

- generated typography
- inferred place names
- captions and metadata
- typography-led poster layouts
