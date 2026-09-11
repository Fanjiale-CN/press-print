import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";

export type HostTheme = "light" | "dark";

export type OpenAIHost = {
  toolOutput?: unknown;
  widgetState?: Record<string, unknown>;
  theme?: HostTheme;
  setWidgetState?: (state: Record<string, unknown>) => Promise<void> | void;
  sendFollowUpMessage?: (args: {
    prompt: string;
    scrollToBottom?: boolean;
  }) => Promise<void> | void;
};

declare global {
  interface Window {
    openai?: OpenAIHost;
  }
}

export type HostGlobals = {
  toolOutput?: unknown;
  widgetState?: Record<string, unknown>;
  theme?: HostTheme;
};

const STORAGE_KEY = "press-print:widget-state";
const legacyHost = window.openai;
const compatHost: OpenAIHost = legacyHost ?? {};

if (!window.openai) {
  window.openai = compatHost;
}

function readStoredState(): Record<string, unknown> | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

function writeStoredState(state: Record<string, unknown>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sandboxed hosts may block storage. The in-memory copy still works.
  }
}

let globals: HostGlobals = {
  toolOutput: compatHost.toolOutput,
  widgetState: compatHost.widgetState ?? readStoredState(),
  theme: compatHost.theme,
};

compatHost.widgetState = globals.widgetState;

const subscribers = new Set<(globals: HostGlobals) => void>();

function snapshot(): HostGlobals {
  return {
    toolOutput: globals.toolOutput,
    widgetState: globals.widgetState,
    theme: globals.theme,
  };
}

function broadcast() {
  const current = snapshot();
  for (const subscriber of subscribers) {
    subscriber(current);
  }
}

function applyHostContext(context: McpUiHostContext) {
  if (context.theme === "light" || context.theme === "dark") {
    globals.theme = context.theme;
    compatHost.theme = context.theme;
    applyDocumentTheme(context.theme);
    document.documentElement.dataset.theme = context.theme;
    document.documentElement.style.colorScheme = context.theme;
  }

  if (context.styles?.variables) {
    applyHostStyleVariables(context.styles.variables);
  }
  if (context.styles?.css?.fonts) {
    applyHostFonts(context.styles.css.fonts);
  }

  broadcast();
}

const app = new App({ name: "Press Print", version: "2.0.0" });

app.ontoolresult = (result) => {
  globals.toolOutput = result.structuredContent ?? {};
  compatHost.toolOutput = globals.toolOutput;
  broadcast();
};

app.onhostcontextchanged = (context) => {
  applyHostContext(context);
};

app.onerror = (error) => {
  console.error("Press Print MCP App host error:", error);
};

const appReady = app
  .connect()
  .then(() => {
    const context = app.getHostContext();
    if (context) applyHostContext(context);
    return app;
  })
  .catch((error) => {
    console.error("Press Print MCP App connection failed:", error);
    return null;
  });

export function applyHostTheme(theme = globals.theme ?? compatHost.theme) {
  if (theme !== "light" && theme !== "dark") return;
  applyDocumentTheme(theme);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function subscribeHostGlobals(
  callback: (globals: HostGlobals) => void,
): () => void {
  subscribers.add(callback);
  queueMicrotask(() => callback(snapshot()));
  return () => subscribers.delete(callback);
}

export async function saveWidgetState(state: Record<string, unknown>) {
  globals.widgetState = state;
  compatHost.widgetState = state;
  writeStoredState(state);

  if (legacyHost?.setWidgetState) {
    await legacyHost.setWidgetState(state);
  }
}

export async function sendFollowUpMessage(prompt: string) {
  if (legacyHost?.sendFollowUpMessage) {
    await legacyHost.sendFollowUpMessage({ prompt, scrollToBottom: true });
    return;
  }

  const connectedApp = await appReady;
  if (!connectedApp) throw new Error("Host messaging unavailable");

  const result = await connectedApp.sendMessage({
    role: "user",
    content: [{ type: "text", text: prompt }],
  });

  if (result.isError) {
    throw new Error("Host rejected follow-up message");
  }
}
