# OpenAI Plugin Submission Materials — Press Print 2.0

This directory contains review-facing materials for the UI-independent Press Print 2.0 Plugin package.

## Architecture

**Skills-only / no MCP runtime**

Press Print 2.0 does not require:

- an MCP server,
- a custom ChatGPT host UI,
- authentication,
- an external account,
- a separate Press Print image-generation backend,
- reviewer credentials or private fixture data.

The Plugin supplies art-direction and visual-reconstruction instructions. The host platform performs image understanding and image generation/editing when those capabilities are available.

## Plugin identity

- Public name: `Press Print`
- Package name: `press-print`
- Publisher brand: `Galok`
- Developer identity: `Fan Jiale`
- Category: `Creativity`
- Short description: `AI art direction for existing imagery`
- Version: `2.0.0`
- Repository: `https://github.com/Fanjiale-CN/press-print`

## Package contents

The complete Plugin ZIP should preserve the repository-relative structure required by the submission portal, including the manifest and the Skill bundle.

Relevant files:

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

Do not package the abandoned `apps/press-print-chatgpt/` UI layer. It is not part of Press Print 2.0.

## Canonical behavior

Press Print 2.0 adds a research-backed decision layer around the established v1 visual language:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

Key reviewer expectations:

- clear requests execute directly,
- vague requests are handled with source-specific judgment rather than a generic menu,
- semantic identity and identity-bearing relations are protected,
- reconstruction is visibly compositional rather than filter-only,
- materiality is selective and causally justified,
- revisions preserve successful decisions,
- zero new text is added by default,
- source text is not translated or bilingual-duplicated by default.

## Public listing URLs

- Website: `https://www.galok.me/press-print/`
- Support: `https://www.galok.me/press-print/support/`
- Privacy: `https://www.galok.me/press-print/privacy/`
- Terms: `https://www.galok.me/press-print/terms/`

Fan Jiale is the individual developer; Galok is the public publishing brand.

## Submission files

- `listing-and-prompts.md` — 2.0 listing copy and starter prompts
- `test-cases.md` — positive and negative review tests
- `release-notes.md` — 2.0 release notes and availability guidance
- `final-checklist.md` — final packaging and portal checklist

## Reviewer setup

For positive tests, reviewers can attach any non-sensitive image they have permission to use. No Press Print account, API key, demo credentials, MFA, private-network access, or fixture database is required.
