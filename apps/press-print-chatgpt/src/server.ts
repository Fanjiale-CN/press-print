import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const SERVER_VERSION = "2.0.0";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.resolve(APP_DIR, "assets");

const DIRECTION_PICKER_URI = "ui://press-print/direction-picker.html";
const RESULT_ACTIONS_URI = "ui://press-print/result-actions.html";

function readHtml(name: string): string {
  return fs.readFileSync(path.join(ASSETS_DIR, name), "utf8");
}

const directionPickerHtml = readHtml("direction-picker.html");
const resultActionsHtml = readHtml("result-actions.html");

const directionSchema = z.object({
  id: z.string().min(1).max(64),
  title: z.string().min(1).max(48),
  summary: z.string().min(1).max(220),
  preserve: z.array(z.string().max(100)).max(4).default([]),
  instruction: z.string().min(1).max(900),
  tone: z.enum(["editorial", "deconstructed", "restrained", "graphic", "quiet", "assertive"]).optional(),
});

const actionSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().min(1).max(40),
  prompt: z.string().min(1).max(900),
  emphasis: z.enum(["primary", "secondary"]).optional(),
});

function createPressPrintServer(): McpServer {
  const server = new McpServer({ name: "press-print", version: SERVER_VERSION });

  registerAppTool(
    server,
    "render_direction_picker",
    {
      title: "Show Press-Print art directions",
      description:
        "Render an inline Press-Print direction picker after you have inspected a user-supplied image and the user's request is genuinely vague or underspecified. " +
        "First make a source-specific visual judgment. Pass one to three meaningfully different art-direction hypotheses. Do NOT use this tool when the user already gave a clear direction; execute the Press-Print reconstruction directly instead. " +
        "Directions must describe what to preserve, amplify, suppress, crop, flatten, or fragment. They must not be generic style labels or effect presets.",
      inputSchema: {
        headline: z.string().min(1).max(100).default("I found a few strong directions."),
        sourceSummary: z.string().min(1).max(260),
        opportunity: z.string().min(1).max(320),
        directions: z.array(directionSchema).min(1).max(3),
        surprisePrompt: z.string().min(1).max(900).optional(),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
      _meta: { ui: { resourceUri: DIRECTION_PICKER_URI } },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "Press-Print direction picker rendered. Do not repeat the full choices in prose unless the widget is unavailable. Wait for the user's selection; a selection will arrive as a follow-up message.",
        },
      ],
      structuredContent: {
        kind: "press-print-direction-picker",
        ...args,
      },
    }),
  );

  registerAppTool(
    server,
    "render_result_actions",
    {
      title: "Show Press-Print result actions",
      description:
        "Render compact next-step actions for an existing Press-Print result. Use only after a result or revision exists. Actions should preserve successful decisions from the current result and change one clear axis at a time. " +
        "Prefer useful actions such as refine, more restrained, more assertive, more planar, more fragmented, or prepare as a sticker asset. Do not use this tool as a substitute for generating the image itself.",
      inputSchema: {
        resultSummary: z.string().min(1).max(240),
        preserveNotes: z.array(z.string().max(100)).max(4).default([]),
        actions: z.array(actionSchema).min(1).max(5),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
      _meta: { ui: { resourceUri: RESULT_ACTIONS_URI } },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "Press-Print result actions rendered. A button press will send a follow-up instruction into the conversation. Preserve the existing result's successful decisions unless the selected action explicitly changes them.",
        },
      ],
      structuredContent: {
        kind: "press-print-result-actions",
        ...args,
      },
    }),
  );

  registerAppResource(
    server,
    "Press-Print direction picker",
    DIRECTION_PICKER_URI,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Inline art-direction chooser for Press-Print 2.0",
    },
    async () => ({
      contents: [
        {
          uri: DIRECTION_PICKER_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: directionPickerHtml,
        },
      ],
    }),
  );

  registerAppResource(
    server,
    "Press-Print result actions",
    RESULT_ACTIONS_URI,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Inline revision and asset actions for Press-Print 2.0",
    },
    async () => ({
      contents: [
        {
          uri: RESULT_ACTIONS_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: resultActionsHtml,
        },
      ],
    }),
  );

  return server;
}

const app = express();
app.use(
  cors({
    origin: "*",
    exposedHeaders: ["Mcp-Session-Id"],
    allowedHeaders: ["Content-Type", "Mcp-Session-Id"],
  }),
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "press-print", version: SERVER_VERSION });
});

app.post("/mcp", async (req, res) => {
  const server = createPressPrintServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on("close", () => {
    transport.close().catch(() => undefined);
    server.close().catch(() => undefined);
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Press-Print MCP error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "MCP request failed" });
    }
  }
});

app.get("/mcp", async (req, res) => {
  const server = createPressPrintServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on("close", () => {
    transport.close().catch(() => undefined);
    server.close().catch(() => undefined);
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (error) {
    console.error("Press-Print MCP GET error:", error);
    if (!res.headersSent) {
      res.status(500).end("MCP request failed");
    }
  }
});

const port = Number(process.env.PORT ?? 8000);
app.listen(port, () => {
  console.log(`Press-Print 2.0 MCP App listening on http://localhost:${port}`);
  console.log(`MCP endpoint: http://localhost:${port}/mcp`);
});
