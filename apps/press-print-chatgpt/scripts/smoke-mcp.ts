import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const endpoint = new URL(process.env.MCP_URL ?? "http://127.0.0.1:8000/mcp");

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
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

  for (const uri of resourceUris) {
    const resource = await client.readResource({ uri });
    const text = resource.contents.find((content) => "text" in content)?.text;
    assert(typeof text === "string" && text.includes("PRESS—PRINT"), `resource ${uri} did not return the expected widget HTML`);
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
