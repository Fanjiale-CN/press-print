# Press Print 2.0 ChatGPT App layer

This directory is the optional interactive MCP App layer for Press Print 2.0.

## Architecture

Press Print 2.0 intentionally uses a hybrid architecture:

- **ChatGPT + the Press Print skill** perform visual reading, art-direction reasoning, preservation, revision logic, and native image generation/editing.
- **This MCP App server** provides compact inline UI for the decisions that benefit from direct manipulation.
- **The widget UI uses React and the official `@openai/apps-sdk-ui` component library**, so controls, states, typography, accessibility, and dark mode remain visually native to ChatGPT.
- **Apple HIG is an interaction influence, not a skin.** The app borrows progressive disclosure, segmented choice, continuous controls, and touch discipline while keeping OpenAI components as the actual implementation layer.
- The first release does **not** add a separate image-model API backend, so the interaction layer does not duplicate image-generation billing or replace ChatGPT's native image capabilities.

The target experience is:

`upload → choose only what matters → generate → refine in language`

The canonical interaction specification lives at `docs/PRESS_PRINT_HOST_UI_V1.md`.

## UI build

The source widgets live in `ui/`:

- `ui/creation-card.tsx`
- `ui/result-card.tsx`
- `ui/host.ts`
- `ui/main.css`

`npm run build:ui` uses Vite + Tailwind CSS 4 to bundle each React widget into a **self-contained MCP UI HTML resource**. JavaScript and CSS are inlined into:

- `assets/creation-card.html`
- `assets/result-card.html`

This keeps the runtime CSP intentionally small: the current cards do not require external script, stylesheet, image, or API domains.

The design rule is:

> OpenAI provides the interface language. Press Print provides the art-direction intelligence.

The cards therefore avoid duplicating the app logo or building a branded microsite inside ChatGPT. Press Print identity should come from its direction choices, visual judgment, revision behavior, and generated work rather than decorative chrome.

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

Typography and Custom reveal only the minimal additional fields they require. Typography uses a grouped Keep / Replace / Generate control. More Controls remains collapsed.

### `render_result_card`

Use after a Press Print result exists.

The card exposes:

- Refine
- Try Another
- Use This
- lightweight version state when multiple versions exist

Refine remains primarily natural-language driven. The result UI does not become a second parameter panel.

Neither tool generates images. The Press Print skill and ChatGPT remain the visual engine.

## State model

The UI keeps these concepts separate:

- selected/viewed version
- preferred baseline
- revision parent

`Refine` creates a child revision. `Try Another` returns to the original source image and carries forward only the selected version's control state. `Use This` changes the preferred baseline without generating a new image or changing pixels.

Widget state is a compact UI cache. The conversation/tool output remains authoritative for semantic lineage.

## Result comparison

Original / Result comparison is intentionally treated as an optional enhancement.

The widget must not fabricate image URLs or proxy images merely to show a comparison. When the ChatGPT host exposes usable media references for both source and result, the result card can add the comparison surface. Until then, the generated result remains in the normal conversation and the widget provides actions underneath it.

## Run locally

```bash
cd apps/press-print-chatgpt
npm install
npm run dev
```

`npm run dev` rebuilds the self-contained widget HTML before starting the MCP server.

For a production-style local build:

```bash
npm run build
npm start
```

Default endpoints:

- `GET /health`
- `POST /mcp`
- `GET /mcp`

Default port is `8000`; override with `PORT`.

## Validation

```bash
npm run typecheck
npm run build
npm start
npm run smoke:mcp
```

The smoke test checks tool/resource discovery, state/lineage contracts, source-text safeguards, CSP metadata, and that both widget resources are self-contained.

## Hosting

A public host is required only when testing or publishing the optional MCP UI layer from outside the local development environment. Railway is not a product dependency and is not required by Press Print itself.

For private development, the preferred path is local MCP + OpenAI Secure MCP Tunnel + ChatGPT Web Developer Mode.

## Mobile-first note

The v2.0 MVP is **inline-first**. It does not require a modal, fullscreen editor, layer panel, or dense professional controls to complete the core flow.

Responsive/narrow layouts can be validated in a browser. Actual custom MCP App host testing is currently performed in ChatGPT Web.

## Core rule

The UI may change. The Press Print visual constitution must not:

> Reconstruct, do not decorate. Preserve semantic identity, not visual completeness.
