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

const CREATION_CARD_URI = "ui://press-print/creation-card.html";
const RESULT_CARD_URI = "ui://press-print/result-card.html";
const WIDGET_DOMAIN =
  process.env.PRESS_PRINT_WIDGET_DOMAIN ?? "https://press-print.galok.me";

const NOAUTH_SECURITY = [{ type: "noauth" as const }];
const WIDGET_CSP = {
  connectDomains: [] as string[],
  resourceDomains: [] as string[],
};

const directionIds = [
  "editorial-print",
  "flat-graphic",
  "collage",
  "typography",
  "restore",
  "custom",
] as const;

const directionIdSchema = z.enum(directionIds);

function readHtml(name: string): string {
  return fs.readFileSync(path.join(ASSETS_DIR, name), "utf8");
}

const creationCardHtml = readHtml("creation-card.html");
const resultCardHtml = readHtml("result-card.html");

const versionSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().min(1).max(24).optional(),
  parentId: z.string().min(1).max(64).optional(),
  direction: z.string().min(1).max(48).optional(),
  structure: z.number().int().min(0).max(100).optional(),
  intensity: z.number().int().min(0).max(100).optional(),
  active: z.boolean().optional(),
  preferred: z.boolean().optional(),
});

const creationOutputShape = {
  kind: z.literal("press-print-creation-card"),
  sourceSummary: z.string().optional(),
  recommendedDirection: directionIdSchema.optional(),
  recommendationReason: z.string().optional(),
  defaultDirection: directionIdSchema.optional(),
  structureDefault: z.number().int().min(0).max(100),
  intensityDefault: z.number().int().min(0).max(100),
  hardLocks: z.array(z.string()).max(6),
};

const resultOutputShape = {
  kind: z.literal("press-print-result-card"),
  resultSummary: z.string(),
  versionId: z.string().optional(),
  versions: z.array(versionSchema).max(8),
  quickRefinements: z.array(z.string()).max(4),
  preserveNotes: z.array(z.string()).max(6),
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
    "render_creation_card",
    {
      title: "Show Press Print creation controls",
      description:
        "Render the compact Press Print creation card for an active source image when the user wants an interactive choice of direction or has not already supplied a complete visual direction. The card exposes six direction choices plus only two primary controls: Structure (Original to Rebuild) and Intensity (Soft to Strong). Typography and Custom reveal their own minimal special fields. " +
        "Before calling this tool, inspect the source image and choose a source-specific recommended direction when one is useful. Do not expose internal analysis terminology. If the user's visual instruction is already explicit enough to execute immediately, generating directly is usually better than forcing the card. " +
        "Do not send the source image, full conversation history, personal names, precise locations, medical information, government identifiers, credentials or API keys, payment information, or other unnecessary sensitive data in these text fields.",
      inputSchema: {
        sourceSummary: z.string().min(1).max(260).optional(),
        recommendedDirection: directionIdSchema.optional(),
        recommendationReason: z.string().min(1).max(280).optional(),
        defaultDirection: directionIdSchema.default("editorial-print"),
        structureDefault: z.number().int().min(0).max(100).default(58),
        intensityDefault: z.number().int().min(0).max(100).default(58),
        hardLocks: z.array(z.string().max(100)).max(6).default([]),
      },
      outputSchema: creationOutputShape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
      _meta: {
        securitySchemes: NOAUTH_SECURITY,
        ui: { resourceUri: CREATION_CARD_URI },
        "openai/toolInvocation/invoking": "Preparing Press Print controls…",
        "openai/toolInvocation/invoked": "Press Print controls ready",
      },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "The Press Print creation card is shown above. Do not duplicate the controls in prose. Wait for the user's Generate action; it will arrive as a follow-up message containing the selected direction, Structure, Intensity, and any special-mode instructions.",
        },
      ],
      structuredContent: {
        kind: "press-print-creation-card" as const,
        ...args,
      },
    }),
  );

  registerAppTool(
    server,
    "render_result_card",
    {
      title: "Show Press Print result controls",
      description:
        "Render the compact Press Print result card after a generated result or revision exists. The primary actions are Refine, Try Another, and Use This. Refine should remain language-driven. Try Another creates a sibling from the same source without overwriting the current result. Use This marks the current result as the active baseline for future refinements. " +
        "Pass only lightweight version metadata and short source-safe summaries. Do not invent image comparison URLs. Original/Result comparison is an optional future enhancement when the host exposes usable media references. " +
        "Do not send the source image, full conversation history, personal names, precise locations, medical information, government identifiers, credentials or API keys, payment information, or other unnecessary sensitive data in these fields.",
      inputSchema: {
        resultSummary: z.string().min(1).max(260),
        versionId: z.string().min(1).max(64).optional(),
        versions: z.array(versionSchema).max(8).default([]),
        quickRefinements: z.array(z.string().min(1).max(80)).max(4).default([
          "Make it flatter",
          "Less texture",
          "More abstract",
          "Keep more of original",
        ]),
        preserveNotes: z.array(z.string().max(100)).max(6).default([]),
      },
      outputSchema: resultOutputShape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
      _meta: {
        securitySchemes: NOAUTH_SECURITY,
        ui: { resourceUri: RESULT_CARD_URI },
        "openai/toolInvocation/invoking": "Preparing result controls…",
        "openai/toolInvocation/invoked": "Result controls ready",
      },
    },
    async (args) => ({
      content: [
        {
          type: "text" as const,
          text:
            "The Press Print result card is shown above. Do not replace it with a parameter list. Refine, Try Another, or Use This will arrive as a follow-up instruction. Preserve successful design state across revisions unless the selected action explicitly changes it.",
        },
      ],
      structuredContent: {
        kind: "press-print-result-card" as const,
        ...args,
      },
    }),
  );

  registerAppResource(
    server,
    "Press Print creation card",
    CREATION_CARD_URI,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Compact direction and two-control creation UI for Press Print 2.0",
    },
    async () => ({
      contents: [
        {
          uri: CREATION_CARD_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: creationCardHtml,
          _meta: uiResourceMeta(
            "Lets the user select a Press Print direction, Structure, and Intensity for the current source image, with minimal special controls for Typography and Custom.",
          ),
        },
      ],
    }),
  );

  registerAppResource(
    server,
    "Press Print result card",
    RESULT_CARD_URI,
    {
      mimeType: RESOURCE_MIME_TYPE,
      description: "Compact result, refinement, and version-choice UI for Press Print 2.0",
    },
    async () => ({
      contents: [
        {
          uri: RESULT_CARD_URI,
          mimeType: RESOURCE_MIME_TYPE,
          text: resultCardHtml,
          _meta: uiResourceMeta(
            "Lets the user refine the active Press Print result in natural language, try a sibling version, or mark the current version as the baseline.",
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
    console.error("Press Print MCP error:", error);
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
    console.error("Press Print MCP GET error:", error);
    if (!res.headersSent) {
      res.status(500).end("MCP request failed");
    }
  }
});

const port = Number(process.env.PORT ?? 8000);
app.listen(port, () => {
  console.log(`Press Print 2.0 MCP App listening on port ${port}`);
});
