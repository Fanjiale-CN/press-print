import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { build, type RollupOutput } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, "..");
const uiDir = path.join(appDir, "ui");
const assetsDir = path.join(appDir, "assets");

const widgets = [
  {
    name: "creation-card",
    entry: path.join(uiDir, "creation-card.tsx"),
    marker: 'data-press-print-widget="creation-card"',
  },
  {
    name: "result-card",
    entry: path.join(uiDir, "result-card.tsx"),
    marker: 'data-press-print-widget="result-card"',
  },
] as const;

fs.mkdirSync(assetsDir, { recursive: true });

function normalizeBuildOutput(result: RollupOutput | RollupOutput[]) {
  return (Array.isArray(result) ? result : [result]).flatMap((item) => item.output);
}

function escapeInlineScript(code: string) {
  return code.replace(/<\/script/gi, "<\\/script");
}

function escapeInlineStyle(code: string) {
  return code.replace(/<\/style/gi, "<\\/style");
}

for (const widget of widgets) {
  const result = (await build({
    configFile: false,
    root: appDir,
    plugins: [react(), tailwindcss()],
    build: {
      write: false,
      minify: "esbuild",
      target: "es2022",
      cssCodeSplit: false,
      lib: {
        entry: widget.entry,
        formats: ["es"],
        fileName: "widget",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  })) as RollupOutput | RollupOutput[];

  const outputs = normalizeBuildOutput(result);
  const javascript = outputs
    .filter((output) => output.type === "chunk")
    .map((output) => output.code)
    .join("\n");
  const css = outputs
    .filter(
      (output) => output.type === "asset" && output.fileName.toLowerCase().endsWith(".css"),
    )
    .map((output) => String(output.source))
    .join("\n");
  const unexpectedAssets = outputs.filter(
    (output) =>
      output.type === "asset" && !output.fileName.toLowerCase().endsWith(".css"),
  );

  if (!javascript) throw new Error(`No JavaScript bundle emitted for ${widget.name}`);
  if (!css) throw new Error(`No CSS bundle emitted for ${widget.name}`);
  if (unexpectedAssets.length) {
    throw new Error(
      `${widget.name} emitted unsupported external assets: ${unexpectedAssets
        .map((asset) => asset.fileName)
        .join(", ")}`,
    );
  }

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>${escapeInlineStyle(css)}</style>
</head>
<body>
  <div id="root" ${widget.marker}></div>
  <script type="module">${escapeInlineScript(javascript)}</script>
</body>
</html>
`;

  fs.writeFileSync(path.join(assetsDir, `${widget.name}.html`), html, "utf8");
  console.log(`Built ${widget.name}.html (${Buffer.byteLength(html)} bytes)`);
}
