# OpenAI Plugin Submission Materials

This directory contains review-facing materials for the first public OpenAI Plugin submission of Press-Print.

## Submission type

**Skills only**

Press-Print is a Skills-only Plugin. It does not include an MCP server, authentication flow, external runtime, or separate backend service.

## Plugin identity

- Plugin name: `Press-Print`
- Publisher brand: `Galok`
- Developer identity: `Fan Jiale` (verified individual identity to select in the OpenAI Platform submission portal)
- Category: `Creativity`
- Short description: `Editorial photo reconstruction`
- Version: `1.0.0`
- Repository: `https://github.com/Fanjiale-CN/press-print`

## Skill bundle to upload

Upload the final bundle from:

```text
skills/press-print/
├── SKILL.md
└── references/
    ├── press-print-v1.md
    └── quality-rubric.md
```

Use this exact tested tree for the Skills tab. Do not replace it with the repository-root `SKILL.md`; the packaged copy contains the OpenAI host behavior used during local Plugin testing.

## Public listing URLs

- Website: `https://www.galok.me/press-print/`
- Support: `https://www.galok.me/press-print/support/`
- Privacy: `https://www.galok.me/press-print/privacy/`
- Terms: `https://www.galok.me/press-print/terms/`

The website, support page, privacy policy, and terms use the same publisher relationship: Fan Jiale is the individual developer and Galok is the public publishing brand.

## Submission files

- `listing-and-prompts.md` — final copy for the Info and Prompts tabs
- `test-cases.md` — five positive and three negative review tests
- `release-notes.md` — initial-submission release notes and availability recommendation
- `final-checklist.md` — readiness check and remaining portal actions

## Reviewer setup

Press-Print needs a user-supplied source photograph for supported transformations. It does not require an account, API key, demo credentials, MFA, private-network access, or fixture database.

For positive tests, reviewers can attach any non-sensitive photograph that matches the requested source category. For negative tests, no Press-Print-specific account or setup is required.
