# OpenAI Plugin Submission Materials — Press-Print 2.0

This directory contains review-facing materials for the Press-Print 2.0 Plugin update. The 2.0 code and MCP protocol foundation are implemented on the feature branch; production deployment, ChatGPT end-to-end validation, public legal-page synchronization, final packaging, and portal submission remain release-gated follow-up actions.

## Submission architecture

Press-Print 2.0 combines:

- a **Skill** for visual reconstruction, art-direction behavior, source-text rules, and host orchestration;
- a small **MCP App** for optional inline direction and revision controls; and
- the compatible host platform's own image generation/editing capability for image output.

Press-Print does not operate a separate image-generation model, user account system, payment system, or persistent user-content database.

## Plugin identity

- Plugin name: `Press-Print`
- Publisher brand: `Galok`
- Developer identity: `Fan Jiale`
- Category: `Creativity`
- Short description: `AI art direction for photo reconstruction`
- Version: `2.0.0`
- Repository: `https://github.com/Fanjiale-CN/press-print`

## Skill bundle

The active Skill lives at:

```text
skills/press-print/
├── SKILL.md
└── references/
    ├── press-print-v1.md
    ├── press-print-v2-runtime.md
    └── quality-rubric.md
```

`press-print-v1.md` remains the visual reconstruction authority. `press-print-v2-runtime.md` adds the READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE orchestration layer.

## MCP App

The interactive service lives at:

```text
apps/press-print-chatgpt/
├── src/server.ts
├── assets/
│   ├── direction-picker.html
│   └── result-actions.html
├── scripts/smoke-mcp.ts
├── package.json
├── tsconfig.json
└── Dockerfile
```

Current external MCP tools:

- `render_direction_picker`
- `render_result_actions`

The service exposes:

- `GET /health`
- `POST /mcp`
- `GET /mcp` for supported Streamable HTTP handshake behavior

The service is intentionally stateless and its current tool schemas do not accept raw source-image files.

## Product behavior under review

Reviewers should verify three primary user paths:

1. **Vague request** → Press-Print reads the source and may show 1–3 source-specific art-direction choices.
2. **Explicit request** → Press-Print skips unnecessary UI and reconstructs directly.
3. **Revision** → Press-Print preserves successful crop, subject treatment, hierarchy, and hard locks while changing the requested axis.

The user experience should remain simple: upload an image, say what you want, choose only if useful, generate, and continue refining.

## Public listing URLs

- Website: `https://www.galok.me/press-print/`
- Support: `https://www.galok.me/press-print/support/`
- Privacy: `https://www.galok.me/press-print/privacy/`
- Terms: `https://www.galok.me/press-print/terms/`

The public privacy and terms pages must be synchronized with the 2.0 repository versions before final submission because 2.0 adds an MCP interaction service.

## Submission files

- `listing-and-prompts.md` — 2.0 listing copy and starter prompts
- `test-cases.md` — interaction, reconstruction, revision, UI, source-text, and negative-routing review cases
- `release-notes.md` — 2.0 release notes and availability recommendation
- `final-checklist.md` — release gates and remaining portal actions

## Reviewer setup

Press-Print does not require a Press-Print account, API key, demo credentials, MFA, payment method, private-network access, or fixture database.

For positive tests, reviewers can attach any non-sensitive photograph they have permission to use. The production MCP endpoint must be available over stable HTTPS for the interactive tests.
