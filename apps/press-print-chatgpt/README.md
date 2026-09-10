# Press Print 2.0 ChatGPT App layer

This directory is the optional interactive MCP App layer for Press Print 2.0.

## Architecture

Press Print 2.0 intentionally uses a hybrid architecture:

- **ChatGPT + the Press Print skill** perform visual reading, art-direction reasoning, preservation, revision logic, and native image generation/editing.
- **This MCP App server** provides compact inline UI for the decisions that benefit from direct manipulation.
- The first release does **not** add a separate image-model API backend, so the interaction layer does not duplicate image-generation billing or replace ChatGPT's native image capabilities.

The target experience is:

`upload → choose only what matters → generate → refine in language`

The canonical interaction specification lives at `docs/PRESS_PRINT_HOST_UI_V1.md`.

## Tools

### `render_creation_card`

Use when the user has an active source image and wants an interactive Press Print setup, especially for vague or exploratory requests.

The card exposes:

- Direction
  - Editorial Print
  - Flat Graphic
  - Collage
  - Typography
  - Restore
  - Custom
- Structure: Original ↔ Rebuild
- Intensity: Soft ↔ Strong
- Generate

Typography and Custom reveal only the minimal additional fields they require. More Controls remains collapsed.

### `render_result_card`

Use after a Press Print result exists.

The card exposes:

- Refine
- Try Another
- Use This
- lightweight version state when multiple versions exist

Refine remains primarily natural-language driven. The result UI does not become a second parameter panel.

Neither tool generates images. The Press Print skill and ChatGPT remain the visual engine.

## Result comparison

Original / Result comparison is intentionally treated as an optional enhancement.

The widget must not fabricate image URLs or proxy images merely to show a comparison. When the ChatGPT host exposes usable media references for both source and result, the result card can add the comparison surface. Until then, the generated result remains in the normal conversation and the widget provides actions underneath it.

## Run locally

```bash
cd apps/press-print-chatgpt
npm install
npm run build
npm start
```

Default endpoints:

- `GET /health`
- `POST /mcp`
- `GET /mcp`

Default port is `8000`; override with `PORT`.

## Hosting

A public host is required only when testing or publishing the optional MCP UI layer from outside the local development environment. Railway is not a product dependency and is not required by Press Print itself.

## Mobile-first note

The v2.0 MVP is **inline-first**. It does not require a modal, fullscreen editor, layer panel, or dense professional controls to complete the core flow.

## Core rule

The UI may change. The Press Print visual constitution must not:

> Reconstruct, do not decorate. Preserve semantic identity, not visual completeness.
