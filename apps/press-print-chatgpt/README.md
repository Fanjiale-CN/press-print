# Press-Print 2.0 ChatGPT App layer

This directory is the interactive MCP App layer for Press-Print 2.0.

## Architecture

Press-Print 2.0 intentionally uses a hybrid architecture:

- **ChatGPT + the Press-Print skill** perform visual reading, art-direction reasoning, and native image generation/editing.
- **This MCP App server** provides compact inline UI for direction selection and result/revision actions.
- The first release does **not** add a separate image-model API backend, so the interaction layer does not duplicate image-generation billing or replace ChatGPT's native image capabilities.

The visible user experience stays simple:

`upload → say one sentence → choose a direction when needed → generate → revise`

## Tools

### `render_direction_picker`
Use only for genuinely vague or underspecified image requests. The model first inspects the source and sends 1–3 source-specific direction hypotheses to an inline widget.

### `render_result_actions`
Use after a Press-Print result exists. It offers small, cause-aware revision actions instead of random regeneration.

Neither tool generates images. The existing Press-Print skill remains the visual engine.

## Run locally

```bash
cd apps/press-print-chatgpt
npm install
npm start
```

Default endpoints:

- `GET /health`
- `POST /mcp`
- `GET /mcp`

Default port is `8000`; override with `PORT`.

## Public ChatGPT testing

Deploy this directory to a stable public HTTPS host and expose `/mcp`. Configure the plugin/App MCP connection to that URL. The widgets are served as MCP App resources.

## Mobile-first note

The v2.0 MVP is intentionally **inline-first**. It does not depend on modal or fullscreen UI to complete the core flow. Larger display modes can be added later without changing the art-direction contract.

## Core rule

The UI may change. The Press-Print visual constitution must not:

> Reconstruct, do not decorate. Preserve semantic identity, not visual completeness.
