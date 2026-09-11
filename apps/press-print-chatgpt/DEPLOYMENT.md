# Press-Print 2.0 MCP App — Deployment & ChatGPT Test Runbook

This service is the optional interactive layer for Press-Print 2.0. It renders direction and revision controls. It does not host the image model and its tool schemas do not accept raw source-image files.

## Production contract

A release deployment must provide:

- a stable public HTTPS origin;
- `POST /mcp` for Streamable HTTP MCP requests;
- `GET /mcp` for supported MCP handshake/stream behavior;
- `GET /health` for health checks;
- Node.js 22-compatible runtime or the included Dockerfile;
- no persistent user-content database;
- no intentional logging of MCP request bodies.

## Environment

### `PORT`

Runtime port. Hosting platforms normally inject this automatically.

Default:

```text
8000
```

### `PRESS_PRINT_WIDGET_DOMAIN`

Dedicated HTTPS origin used as the widget identity in MCP resource metadata.

Production must use an origin controlled by the publisher and dedicated to Press-Print UI, for example:

```text
https://press-print.galok.me
```

Do not submit a localhost, tunnel, preview, or unowned origin as the production widget domain.

## Build and run without Docker

From `apps/press-print-chatgpt/`:

```bash
npm install
npm run typecheck
npm run build
npm start
```

Health check:

```bash
curl --fail http://127.0.0.1:8000/health
```

Protocol smoke test:

```bash
npm run smoke:mcp
```

To test a deployed endpoint:

```bash
MCP_URL=https://YOUR-PRODUCTION-HOST/mcp npm run smoke:mcp
```

## Docker

Build from the app directory:

```bash
docker build -t press-print-mcp .
```

Run:

```bash
docker run --rm \
  -p 8000:8000 \
  -e PRESS_PRINT_WIDGET_DOMAIN=https://press-print.galok.me \
  press-print-mcp
```

## Recommended hosting shape

Use one small stateless web service rooted at:

```text
apps/press-print-chatgpt/
```

The repository already contains a production Dockerfile, so a provider can build directly from that directory.

No database, object storage, queue, cron job, or worker is required for the 2.0 interactive MVP.

## Post-deploy validation

A deployment is not considered ready merely because `/health` returns 200.

Run all of the following:

1. `GET /health` returns `ok: true` and version `2.0.0`.
2. `MCP_URL=https://HOST/mcp npm run smoke:mcp` passes.
3. Tool discovery returns exactly the intended UI tools.
4. Both tools expose an output schema, read-only/non-destructive annotations, no-auth metadata, and UI resource URIs.
5. Resource reads return both widgets with HTTPS widget-domain metadata and explicit CSP arrays.
6. Review hosting logs and confirm the application does not intentionally log request bodies.

## Connect to ChatGPT for end-to-end testing

After the endpoint is public over HTTPS:

1. Enable ChatGPT developer mode in the appropriate settings surface.
2. Add a Plugin/MCP connection using the full production URL ending in `/mcp`.
3. Confirm ChatGPT can discover both tools and both widget resources.
4. Start a fresh conversation and run the test cases in `submission/openai/test-cases.md`.

The minimum end-to-end tests are:

### Vague path

Attach a photograph and say:

```text
@Press-Print 处理一下这张。
```

Expected:

- Press-Print reads the image before proposing anything;
- a direction picker appears only if more than one useful direction exists;
- direction rows are source-specific rather than generic presets;
- selecting a row does not immediately generate;
- `Use this direction` sends the selected instruction back into the same conversation;
- `Surprise me` is the only secondary action when multiple directions exist.

### Explicit path

Attach a photograph and say:

```text
Make this flatter and more fragmented. Preserve the face and add no text.
```

Expected:

- no direction picker;
- direct reconstruction;
- the explicit locks are honored.

### Revision path

After a successful result, say:

```text
Keep this crop and the subject. Quiet the right side and reduce the tearing.
```

Expected:

- successful crop and subject treatment remain;
- only the requested axes change;
- optional result actions expose no more than two meaningful next steps.

## Release gate

Do not merge the 2.0 feature branch into `main` until:

- production HTTPS MCP is deployed;
- the protocol smoke test passes against production;
- all three ChatGPT paths above pass on desktop and mobile;
- light and dark theme widgets are readable;
- public Privacy and Terms pages match the deployed MCP architecture;
- representative visual regression tests pass.
