# Changelog

## Unreleased — OpenAI Plugin packaging

### Added

- `.codex-plugin/plugin.json` for OpenAI plugin packaging
- `skills/press-print/SKILL.md` as the OpenAI-packaged Skill entry point
- self-contained bundled references for the v1.0 master prompt and quality rubric
- OpenAI host behavior for missing-image handling and direct image-generation/editing execution when available

### Architecture

- remains a Skills-only plugin with no MCP server, authentication layer, or external runtime dependency
- root `SKILL.md` remains the canonical universal Agent Skill entry point
- packaged references are synchronized copies of the frozen v1.0 prompt and quality rubric
- OpenAI-specific packaging must not alter the frozen v1.0 reconstruction logic

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

- v1.0.0 is the frozen image-only core baseline for future platform packaging
- the root `SKILL.md` remains the canonical universal Agent Skill entry point
- platform-specific packaging may add manifests, metadata, assets, or synchronized Skill copies, but must not silently change the v1.0 core behavior
- behavioral changes require a versioned release and a changelog entry

### Intentionally excluded

- generated typography
- inferred place names
- captions and metadata
- typography-led poster layouts
