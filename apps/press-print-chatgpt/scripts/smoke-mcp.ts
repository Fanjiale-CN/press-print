import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const endpoint = new URL(process.env.MCP_URL ?? "http://127.0.0.1:8000/mcp");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function asRecord(value: unknown): Record<string, any> {
  return (value && typeof value === "object" ? value : {}) as Record<string, any>;
}

async function main() {
  const client = new Client(
    { name: "press-print-smoke", version: "2.0.0" },
    { capabilities: {} },
  );
  const transport = new StreamableHTTPClientTransport(endpoint);

  await client.connect(transport);

  const listedTools = await client.listTools();
  const toolNames = new Set(listedTools.tools.map((tool) => tool.name));
  assert(toolNames.has("render_creation_card"), "render_creation_card is missing");
  assert(toolNames.has("render_result_card"), "render_result_card is missing");

  for (const tool of listedTools.tools) {
    const raw = asRecord(tool);
    assert(raw.outputSchema, `${tool.name} is missing outputSchema`);
    assert(raw.annotations?.readOnlyHint === true, `${tool.name} must be read-only`);
    assert(raw.annotations?.destructiveHint === false, `${tool.name} must be non-destructive`);
    assert(raw.annotations?.openWorldHint === false, `${tool.name} must be closed-world`);
    const schemes = raw.securitySchemes ?? raw._meta?.securitySchemes;
    assert(
      Array.isArray(schemes) && schemes.some((s: any) => s?.type === "noauth"),
      `${tool.name} is missing noauth security metadata`,
    );
    assert(
      typeof raw._meta?.ui?.resourceUri === "string",
      `${tool.name} is missing its UI resource URI`,
    );
  }

  const listedResources = await client.listResources();
  const resourceUris = new Set(listedResources.resources.map((resource) => resource.uri));
  assert(
    resourceUris.has("ui://press-print/creation-card.html"),
    "creation card resource is missing",
  );
  assert(
    resourceUris.has("ui://press-print/result-card.html"),
    "result card resource is missing",
  );

  const creationResult = await client.callTool({
    name: "render_creation_card",
    arguments: {
      sourceSummary: "A small figure is set against a large architectural field.",
      recommendedDirection: "editorial-print",
      recommendationReason:
        "The strongest opportunity is to emphasize the scale contrast without losing the figure.",
      defaultDirection: "editorial-print",
      structureDefault: 64,
      intensityDefault: 58,
      hardLocks: ["preserve figure identity", "preserve facade rhythm"],
    },
  });
  const creationStructured = creationResult.structuredContent as
    | Record<string, unknown>
    | undefined;
  assert(
    creationStructured?.kind === "press-print-creation-card",
    "creation tool returned the wrong structuredContent kind",
  );
  assert(
    creationStructured?.recommendedDirection === "editorial-print",
    "creation tool lost the recommended direction",
  );

  const resultCardResult = await client.callTool({
    name: "render_result_card",
    arguments: {
      resultSummary:
        "The current crop and figure-to-building scale relationship work; refinement should preserve both.",
      versionId: "v2",
      versions: [
        {
          id: "v1",
          label: "V1",
          direction: "Editorial Print",
          structure: 58,
          intensity: 52,
        },
        {
          id: "v2",
          label: "V2",
          parentId: "v1",
          direction: "Editorial Print",
          structure: 64,
          intensity: 58,
          active: true,
          preferred: true,
        },
      ],
      quickRefinements: [
        "Make it flatter",
        "Less texture",
        "More abstract",
        "Keep more of original",
      ],
      preserveNotes: ["current crop", "figure identity", "scale relationship"],
    },
  });
  const resultStructured = resultCardResult.structuredContent as
    | Record<string, unknown>
    | undefined;
  assert(
    resultStructured?.kind === "press-print-result-card",
    "result card tool returned the wrong structuredContent kind",
  );

  const expectedMarkers: Record<string, string> = {
    "ui://press-print/creation-card.html": 'data-press-print-widget="creation-card"',
    "ui://press-print/result-card.html": 'data-press-print-widget="result-card"',
  };

  for (const uri of resourceUris) {
    const resource = await client.readResource({ uri });
    const textual = resource.contents.find((content) => "text" in content);
    const text = textual && "text" in textual ? textual.text : undefined;
    assert(
      typeof text === "string" &&
        text.includes(expectedMarkers[uri] ?? "data-press-print-widget"),
      `resource ${uri} did not return the expected widget HTML`,
    );

    const meta = asRecord(textual?._meta);
    assert(
      typeof meta.ui?.domain === "string" && meta.ui.domain.startsWith("https://"),
      `resource ${uri} is missing an HTTPS widget domain`,
    );
    assert(
      Array.isArray(meta.ui?.csp?.connectDomains),
      `resource ${uri} is missing CSP connectDomains`,
    );
    assert(
      Array.isArray(meta.ui?.csp?.resourceDomains),
      `resource ${uri} is missing CSP resourceDomains`,
    );
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        endpoint: endpoint.toString(),
        tools: [...toolNames],
        resources: [...resourceUris],
      },
      null,
      2,
    ),
  );

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
