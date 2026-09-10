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
const WIDGET_DOMAIN =
  process.env.PRESS_PRINT_WIDGET_DOMAIN ?? "https://press-print.galok.me";

const NOAUTH_SECURITY = [{ type: "noauth" as const }];
const WIDGET_CSP = {
  connectDomains: [] as string[],
  resourceDomains: [] as string[],
};

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
  tone: z
    .enum([
      "editorial",
      "deconstructed",
      "restrained",
      "graphic",
      "quiet",
      "assertive",
    ])
    .optional(),
});

const actionSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().min(1).max(40),
  prompt: z.string().min(1).max(900),
  emphasis: z.enum(["primary", "secondary"]).optional(),
});

const directionOutputShape = {
  kind: z.literal("press-print-direction-picker"),
  headline: z.string(),
  sourceSummary: z.string(),
  opportunity: z.string(),
  directions: z.array(directionSchema).min(1).max(3),
  surprisePrompt: z.string().optional(),
};

const resultActionsOutputShape = {
  kind: z.literal("press-print-result-actions"),
  resultSummary: z.string(),
  preserveNotes: z.array(z.string()).max(4),
  actions: z.array(actionSchema).min(1).max(2),
};

function uiResourceMeta(description: string) {
  return {
    ui: {
      domain: WIDGET_DOMAIN,
      prefersBorder: false,
      csp: WIDGET_CSP,
    },
    "openai/widgetDescription": description,
  } as const;
}

function createPressPrintServer(): McpServer {
  const server = new McpServer({ name: "press-print", version: SERVER_VERSION });

  registerAppTool(
    server,
    "render_direction_picker",
    {
      title: "Show Press-Print art directions",
      description:
        "Render an inline Press-Print direction picker only after inspecting the user's supplied image and only when the visual request is genuinely vague or underspecified. " +
        "First make a source-specific visual judgment, then pass one to three meaningfully different art-direction hypotheses. Do not use this tool when the user already gave a clear direction; reconstruct directly instead. " +
        "Directions must describe what to preserve, amplify, suppress, crop, flatten, or fragment. Do not send the source image, full conversation history, personal names, precise locations, medical information, government identifiers, credentials or API keys, payment information, or other unnecessary sensitive data in these text fields. Use minimal non-sensitive visual descriptions.",
      inputSchema: {
        headline: z
          .string()
          .min(1)
          .max(100)
          .default("I found a few strong directions."),
        sourceSummary: z.string().min(1).max(260),
        opportunity: z.string().min(1).max(320),
        directions: z.array(directionSchema).min(1).max(3),
        surprisePrompt: z.string().min(1).max(900).optional(),
      },
      outputSchema: directionOutputShape,
      securitySchemes: NOAUTH_SECURITY,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
      _meta: {
        securitySchemes: NOAUTH_SECURITY,
        ui: { resourceUri: DIRECTION_PICKER_URI },
        "openai/toolInvocation/invoking": "Preparing art directions…",
        "openai/toolInvocation/invoked": "Art directions ready",
      },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "A compact direction picker is shown above. Do not repeat every option in prose. Wait for the user's selection; the selected direction will arrive as a follow-up message.",
        },
      ],
      structuredContent: {
        kind: "press-print-direction-picker" as const,
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
        "Render one or two compact next-step actions only after a Press-Print result or revision exists. Each action should use the user's language, preserve successful decisions from the current result, and change one clear axis at a time, such as restraint, planar compression, fragmentation, or hierarchy. " +
        "Do not use this tool as a substitute for generating the image. Do not send the source image, full conversation history, personal names, precise locations, medical information, government identifiers, credentials or API keys, payment information, or other unnecessary sensitive data in these text fields. Use minimal non-sensitive revision descriptions.",
      inputSchema: {
        resultSummary: z.string().min(1).max(240),
        preserveNotes: z.array(z.string().max(100)).max(4).default([]),
        actions: z.array(actionSchema).min(1).max(2),
      },
      outputSchema: resultActionsOutputShape,
      securitySchemes: NOAUTH_SECURITY,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
      _meta: {
        securitySchemes: NOAUTH_SECURITY,
        ui: { resourceUri: RESULT_ACTIONS_URI },
        "openai/toolInvocation/invoking": "Preparing refinements…",
        "openai/toolInvocation/invoked": "Refinements ready",
      },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "Compact revision actions are shown above. A selection will arrive as a follow-up instruction. Preserve the current result's successful decisions unless that selected action explicitly changes them.",
        },
      ],
      structuredContent: {
        kind: "press-print-result-actions" as const,
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
          _meta: uiResourceMeta(
            "Lets the user choose one of up to three source-specific Press-Print art directions without leaving the conversation.",
          ),
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
      description: "Inline revision actions for Press-Print 2.0",
    },
    async () => ({
      contents: [
        {
          uri: RESULT_ACTIONS_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: resultActionsHtml,
          _meta: uiResourceMeta(
            "Offers one or two controlled follow-up refinements for the current Press-Print result.",
          ),
        },
      ],
    }),
  );

  return server;
}

const app = express();
app.disable("x-powered-by");
app.use(
  cors({
    origin: "*",
    exposedHeaders: ["Mcp-Session-Id"],
    allowedHeaders: ["Content-Type", "Mcp-Session-Id"],
  }),
);
app.use(express.json({ limit: "256kb" }));

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
  console.log(`Press-Print 2.0 MCP App listening on port ${port}`);
});
