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
    { name: "press-print-smoke", version: "1.0.0" },
    { capabilities: {} },
  );
  const transport = new StreamableHTTPClientTransport(endpoint);

  await client.connect(transport);

  const listedTools = await client.listTools();
  const toolNames = new Set(listedTools.tools.map((tool) => tool.name));
  assert(toolNames.has("render_direction_picker"), "render_direction_picker is missing");
  assert(toolNames.has("render_result_actions"), "render_result_actions is missing");

  for (const tool of listedTools.tools) {
    const raw = asRecord(tool);
    assert(raw.outputSchema, `${tool.name} is missing outputSchema`);
    assert(raw.annotations?.readOnlyHint === true, `${tool.name} must be read-only`);
    assert(raw.annotations?.destructiveHint === false, `${tool.name} must be non-destructive`);
    assert(raw.annotations?.openWorldHint === false, `${tool.name} must be closed-world`);
    const schemes = raw.securitySchemes ?? raw._meta?.securitySchemes;
    assert(Array.isArray(schemes) && schemes.some((s: any) => s?.type === "noauth"), `${tool.name} is missing noauth security metadata`);
    assert(typeof raw._meta?.ui?.resourceUri === "string", `${tool.name} is missing its UI resource URI`);
  }

  const listedResources = await client.listResources();
  const resourceUris = new Set(listedResources.resources.map((resource) => resource.uri));
  assert(resourceUris.has("ui://press-print/direction-picker.html"), "direction picker resource is missing");
  assert(resourceUris.has("ui://press-print/result-actions.html"), "result actions resource is missing");

  const directionResult = await client.callTool({
    name: "render_direction_picker",
    arguments: {
      headline: "Three directions fit this image.",
      sourceSummary: "A small figure is set against a large architectural field.",
      opportunity: "Strengthen the scale tension while protecting the figure and facade rhythm.",
      directions: [
        {
          id: "editorial",
          title: "Editorial",
          summary: "Compress depth and strengthen planar hierarchy.",
          preserve: ["figure identity", "facade rhythm"],
          instruction: "Use planar compression, a stronger quiet field, and restrained materiality.",
          tone: "editorial",
        },
        {
          id: "deconstructed",
          title: "Deconstructed",
          summary: "Break continuity more aggressively without losing the subject.",
          preserve: ["figure identity"],
          instruction: "Increase fragmentation and overlap while keeping the subject legible.",
          tone: "deconstructed",
        },
      ],
      surprisePrompt: "Choose the strongest Press-Print direction and generate it now.",
    },
  });
  const directionStructured = directionResult.structuredContent as Record<string, unknown> | undefined;
  assert(directionStructured?.kind === "press-print-direction-picker", "direction tool returned the wrong structuredContent kind");

  const actionsResult = await client.callTool({
    name: "render_result_actions",
    arguments: {
      resultSummary: "The current crop and subject hierarchy work; refinement should preserve both.",
      preserveNotes: ["current crop", "subject identity"],
      actions: [
        {
          id: "restrained",
          label: "More restrained",
          prompt: "Keep the current crop and subject. Reduce fragmentation and material noise.",
          emphasis: "primary",
        },
        {
          id: "fragmented",
          label: "More fragmented",
          prompt: "Keep the current crop and subject. Increase controlled fragmentation only.",
          emphasis: "secondary",
        },
      ],
    },
  });
  const actionsStructured = actionsResult.structuredContent as Record<string, unknown> | undefined;
  assert(actionsStructured?.kind === "press-print-result-actions", "actions tool returned the wrong structuredContent kind");

  const expectedMarkers: Record<string, string> = {
    "ui://press-print/direction-picker.html": 'data-press-print-widget="direction-picker"',
    "ui://press-print/result-actions.html": 'data-press-print-widget="result-actions"',
  };

  for (const uri of resourceUris) {
    const resource = await client.readResource({ uri });
    const textual = resource.contents.find((content) => "text" in content);
    const text = textual && "text" in textual ? textual.text : undefined;
    assert(typeof text === "string" && text.includes(expectedMarkers[uri] ?? "data-press-print-widget"), `resource ${uri} did not return the expected widget HTML`);

    const meta = asRecord(textual?._meta);
    assert(typeof meta.ui?.domain === "string" && meta.ui.domain.startsWith("https://"), `resource ${uri} is missing an HTTPS widget domain`);
    assert(Array.isArray(meta.ui?.csp?.connectDomains), `resource ${uri} is missing CSP connectDomains`);
    assert(Array.isArray(meta.ui?.csp?.resourceDomains), `resource ${uri} is missing CSP resourceDomains`);
  }

  console.log(JSON.stringify({
    ok: true,
    endpoint: endpoint.toString(),
    tools: [...toolNames],
    resources: [...resourceUris],
  }, null, 2));

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
