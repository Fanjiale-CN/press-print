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
      const schemes = raw.securitySchemes ?? raw._meta?.securitySchemes;
      assert(
        Array.isArray(schemes) && schemes.some((scheme: any) => scheme?.type === "noauth"),
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
        creationKind: "new",
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
    assert(
      creationStructured?.creationKind === "new",
      "creation tool lost root creation lineage",
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
    const typographyStructured = typographyResult.structuredContent as
      | Record<string, unknown>
      | undefined;
    assert(
      typographyStructured?.defaultDirection === "typography",
      "Typography alternative lost its direction",
    );
    assert(
      typographyStructured?.creationKind === "alternative" &&
        typographyStructured?.seedVersionId === "v2",
      "Try Another seed lineage was not preserved",
    );
    assert(
      typographyStructured?.initialTypographyMode === "replace" &&
        typographyStructured?.initialTypographyText === "CITY AFTER DARK",
      "Typography state was not preserved",
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
    const customStructured = customResult.structuredContent as
      | Record<string, unknown>
      | undefined;
    assert(
      customStructured?.defaultDirection === "custom" &&
        customStructured?.initialCustomDirection ===
          "Flatten the buildings but keep the figures photographic.",
      "Custom state was not preserved",
    );

    const resultCardResult = await client.callTool({
      name: "render_result_card",
      arguments: {
        resultSummary:
          "The current crop and figure-to-building scale relationship work; refinement should preserve both.",
        versionId: "v3",
        preferredVersionId: "v2",
        versions: [
          {
            id: "v1",
            label: "V1",
            kind: "root",
            direction: "editorial-print",
            structure: 58,
            intensity: 52,
          },
          {
            id: "v2",
            label: "V2",
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
            label: "V3",
            kind: "revision",
            parentId: "v2",
            direction: "typography",
            structure: 44,
            intensity: 62,
            typographyMode: "replace",
            typographyText: "CITY AFTER DARK",
            instruction: "Less texture",
            active: true,
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
      | Record<string, any>
      | undefined;
    assert(
      resultStructured?.kind === "press-print-result-card",
      "result card tool returned the wrong structuredContent kind",
    );
    assert(
      resultStructured?.versionId === "v3" && resultStructured?.preferredVersionId === "v2",
      "selected result and preferred baseline were collapsed",
    );
    const returnedVersions = Array.isArray(resultStructured?.versions)
      ? resultStructured.versions
      : [];
    const revision = returnedVersions.find((version: any) => version.id === "v3");
    assert(
      revision?.kind === "revision" && revision?.parentId === "v2",
      "revision parent lineage was not preserved",
    );
    const alternative = returnedVersions.find((version: any) => version.id === "v2");
    assert(
      alternative?.kind === "alternative" && !alternative?.parentId,
      "alternative version must not acquire a revision parent from its seed",
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

      if (typeof text === "string") {
        assert(
          !/<script\s+[^>]*src=/i.test(text) &&
            !/<link\s+[^>]*rel=["']?stylesheet/i.test(text),
          `resource ${uri} must be self-contained with inline JS and CSS`,
        );
      }

      if (typeof text === "string" && uri === "ui://press-print/creation-card.html") {
        assert(
          text.includes("widgetState") &&
            text.includes("creationKind") &&
            text.includes("control-state seed only"),
          "creation widget is missing persisted/alternative-state safeguards",
        );
        assert(
          text.includes("preserveText") && text.includes("Typography mode"),
          "Typography/source-text conflict safeguard is missing",
        );
      }

      if (typeof text === "string" && uri === "ui://press-print/result-card.html") {
        assert(
          text.includes("preferredVersionId") &&
            text.includes("parentId") &&
            text.includes("same original source image"),
          "result widget is missing version-lineage safeguards",
        );
        assert(
          !text.includes("originalImageUrl") && !text.includes("resultImageUrl"),
          "result widget must not depend on fabricated comparison image URLs",
        );
      }

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
          coveredStates: [
            "new creation",
            "typography replace",
            "custom",
            "try-another seed",
            "revision parent",
            "preferred baseline",
            "widget persistence markers",
            "self-contained OpenAI UI bundle",
          ],
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
