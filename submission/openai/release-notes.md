# Release Notes and Availability

## Release notes

### Press-Print v2.0.0 — Art direction, interaction, and intentional revision

Press-Print 2.0 upgrades the product from a reconstruction Skill into an AI art-direction and visual-reconstruction system while preserving the established Press-Print visual language.

The main user-facing change is intentionally simple:

> upload an image → say what you want → choose only if useful → generate → keep refining

New behavior includes:

- source-aware visual reading before reconstruction;
- an internal preservation contract for identity-bearing subjects, structures, relations, colors, and gestures;
- one to three source-specific art-direction choices when the user's request is genuinely vague;
- direct execution when the user already supplied a clear direction;
- compact interactive direction and revision controls through the Press-Print MCP App layer;
- revision behavior that preserves successful crop, subject treatment, hierarchy, and explicit locks instead of restarting from scratch;
- cause-level critique focused on semantic preservation, hierarchy, reconstruction strength, planar coherence, material coherence, and Press-Print identity;
- a formal system constitution, visual grammar, schema, art-direction policy, capability contract, and regression benchmark.

The established visual reconstruction authority remains intact: selective cropping, planar compression, graphic hierarchy, visible halftone/duotone, controlled collage, tactile print logic, and strict source-text control.

Press-Print 2.0 continues to add zero new typography by default. Source text is not translated or duplicated into bilingual layouts, and only exact user-supplied wording may be newly rendered.

### Interactive architecture

Press-Print 2.0 includes a small MCP service used for optional inline UI:

- `render_direction_picker`
- `render_result_actions`

The MCP service does not provide a separate image-generation model and its current tool schema does not accept source-image files. Compatible host image generation/editing remains responsible for the image output.

The interactive layer uses a stateless Streamable HTTP `/mcp` endpoint and is designed to remain optional: a clear request can proceed directly without forcing the user through a menu.

### Press-Print v1.0.2 — Planar reconstruction and source-text control

Press-Print v1.0.2 strengthened the visual system around flat 2D composition, interlocking color planes, visible structural halftone, tactile torn-paper collage, and explicit source-text handling.

It formalized zero new text by default, no translation or bilingual duplication, controlled readable-text footprint, handling for dense signage environments, and an exception permitting only exact wording explicitly supplied by the user.

### Press-Print v1.0.0 — Initial public submission

Press-Print v1.0.0 was the initial public Skills-only submission for source-aware visual reconstruction of user-supplied photographs.

## Reviewer setup for v2.0.0

No Press-Print account, demo credentials, MFA, SMS verification, payment method, or private fixture data are required.

For positive image tests:

1. attach any non-sensitive photograph the reviewer has permission to use;
2. use the prompts in `submission/openai/test-cases.md`;
3. verify both the vague-request interactive path and the explicit-request direct path;
4. create at least one follow-up revision to confirm successful decisions are preserved.

The production MCP endpoint must be available over stable HTTPS before final submission. The repository's CI validates the MCP server, tool discovery, resource discovery, both interactive tool calls, widget resource reads, TypeScript build, and health endpoint.

## Availability recommendation

**Target:** all countries and regions selectable in the OpenAI Plugin submission portal where the relevant ChatGPT / Codex Plugin, MCP App, and image-generation capabilities are available.

Rationale:

- Press-Print does not require a region-specific account or payment system;
- the interactive MCP layer uses a narrow, stateless schema and no persistent user-content database;
- public support, privacy, terms, and product pages are provided under `galok.me`;
- source-image generation/editing remains a host capability.

During submission, select only countries or regions that the portal makes available and where the publisher is comfortable supporting the Plugin. OpenAI product availability and policy restrictions remain authoritative.
