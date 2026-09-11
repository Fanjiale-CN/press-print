import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const endpoint = new URL(process.env.MCP_URL ?? "http://127.0.0.1:8000/mcp");
const CREATION_URI = "ui://press-print/creation-card-v2.html";
const RESULT_URI = "ui://press-print/result-card-v2.html";

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

  try {
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
      assert(
        typeof raw._meta?.ui?.resourceUri === "string",
        `${tool.name} is missing its UI resource URI`,
      );
    }

    const listedResources = await client.listResources();
    const resourceUris = new Set(listedResources.resources.map((resource) => resource.uri));
    assert(resourceUris.has(CREATION_URI), "creation card v2 resource is missing");
    assert(resourceUris.has(RESULT_URI), "result card v2 resource is missing");

    const creationResult = await client.callTool({
      name: "render_creation_card",
      arguments: {
        sourceSummary: "A small figure is set against a large architectural field.",
        recommendedDirection: "editorial-print",
        defaultDirection: "editorial-print",
        structureDefault: 64,
        intensityDefault: 58,
        hardLocks: ["preserve figure identity", "preserve facade rhythm"],
        creationKind: "new",
      },
    });
    const creationStructured = asRecord(creationResult.structuredContent);
    assert(
      creationStructured.kind === "press-print-creation-card",
      "creation tool returned the wrong structuredContent kind",
    );
    assert(
      creationStructured.recommendedDirection === "editorial-print",
      "creation tool lost the recommended direction",
    );

    const typographyResult = await client.callTool({
      name: "render_creation_card",
      arguments: {
        defaultDirection: "typography",
        structureDefault: 44,
        intensityDefault: 62,
        hardLocks: ["preserve subject identity"],
        creationKind: "alternative",
        seedVersionId: "v2",
        initialTypographyMode: "replace",
        initialTypographyText: "CITY AFTER DARK",
      },
    });
    const typographyStructured = asRecord(typographyResult.structuredContent);
    assert(
      typographyStructured.creationKind === "alternative" &&
        typographyStructured.seedVersionId === "v2" &&
        typographyStructured.initialTypographyMode === "replace",
      "Typography alternative state was not preserved",
    );

    const customResult = await client.callTool({
      name: "render_creation_card",
      arguments: {
        defaultDirection: "custom",
        structureDefault: 72,
        intensityDefault: 48,
        creationKind: "alternative",
        seedVersionId: "v3",
        initialCustomDirection: "Flatten the buildings but keep the figures photographic.",
      },
    });
    const customStructured = asRecord(customResult.structuredContent);
    assert(
      customStructured.defaultDirection === "custom" &&
        customStructured.initialCustomDirection ===
          "Flatten the buildings but keep the figures photographic.",
      "Custom state was not preserved",
    );

    const resultCardResult = await client.callTool({
      name: "render_result_card",
      arguments: {
        resultSummary: "The current crop and scale relationship work.",
        versionId: "v3",
        preferredVersionId: "v2",
        versions: [
          {
            id: "v2",
            kind: "alternative",
            direction: "typography",
            structure: 44,
            intensity: 62,
            typographyMode: "replace",
            typographyText: "CITY AFTER DARK",
            preferred: true,
          },
          {
            id: "v3",
            kind: "revision",
            parentId: "v2",
            direction: "typography",
            structure: 44,
            intensity: 62,
            active: true,
          },
        ],
      },
    });
    const resultStructured = asRecord(resultCardResult.structuredContent);
    assert(
      resultStructured.kind === "press-print-result-card",
      "result tool returned the wrong structuredContent kind",
    );
    assert(
      resultStructured.versionId === "v3" && resultStructured.preferredVersionId === "v2",
      "selected result and preferred baseline were collapsed",
    );

    const expectedMarkers: Record<string, string> = {
      [CREATION_URI]: 'data-press-print-widget="creation-card"',
      [RESULT_URI]: 'data-press-print-widget="result-card"',
    };

    for (const uri of [CREATION_URI, RESULT_URI]) {
      const resource = await client.readResource({ uri });
      const textual = resource.contents.find((content) => "text" in content);
      const text = textual && "text" in textual ? textual.text : undefined;
      assert(
        typeof text === "string" && text.includes(expectedMarkers[uri]),
        `resource ${uri} did not return the expected widget HTML`,
      );
      assert(
        text.includes('<script type="module">'),
        `resource ${uri} is missing its inline module bundle`,
      );

      const meta = asRecord(textual?._meta);
      assert(
        typeof meta.ui?.domain === "string" && meta.ui.domain.startsWith("https://"),
        `resource ${uri} is missing an HTTPS widget domain`,
      );
      assert(
        Array.isArray(meta.ui?.csp?.connectDomains) &&
          Array.isArray(meta.ui?.csp?.resourceDomains),
        `resource ${uri} is missing CSP metadata`,
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
  } finally {
    await client.close().catch(() => undefined);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
