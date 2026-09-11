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

export function applyHostTheme(theme = window.openai?.theme) {
  if (theme !== "light" && theme !== "dark") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function subscribeHostGlobals(
  callback: (globals: HostGlobals) => void,
): () => void {
  const listener = (event: Event) => {
    const custom = event as CustomEvent<{ globals?: HostGlobals }>;
    callback(custom.detail?.globals ?? {});
  };

  window.addEventListener("openai:set_globals", listener);
  return () => window.removeEventListener("openai:set_globals", listener);
}

export async function saveWidgetState(state: Record<string, unknown>) {
  const setter = window.openai?.setWidgetState;
  if (!setter) return;
  await setter(state);
}

export async function sendFollowUpMessage(prompt: string) {
  const sender = window.openai?.sendFollowUpMessage;
  if (!sender) throw new Error("Host messaging unavailable");
  await sender({ prompt, scrollToBottom: true });
}
