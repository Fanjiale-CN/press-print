import "./main.css";

import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Checkbox } from "@openai/apps-sdk-ui/components/Checkbox";
import { Input } from "@openai/apps-sdk-ui/components/Input";
import { SegmentedControl } from "@openai/apps-sdk-ui/components/SegmentedControl";
import { Slider } from "@openai/apps-sdk-ui/components/Slider";
import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  applyHostTheme,
  saveWidgetState,
  sendFollowUpMessage,
  subscribeHostGlobals,
} from "./host";

type DirectionId =
  | "editorial-print"
  | "flat-graphic"
  | "collage"
  | "typography"
  | "restore"
  | "custom";

type TypographyMode = "keep" | "replace" | "generate";

type CreationData = {
  kind?: string;
  sourceSummary?: string;
  recommendedDirection?: DirectionId;
  recommendationReason?: string;
  defaultDirection?: DirectionId;
  structureDefault?: number;
  intensityDefault?: number;
  hardLocks?: string[];
  creationKind?: "new" | "alternative";
  seedVersionId?: string;
  initialCustomDirection?: string;
  initialTypographyMode?: TypographyMode;
  initialTypographyText?: string;
};

type CreationState = {
  direction: DirectionId;
  structure: number;
  intensity: number;
  textMode: TypographyMode;
  headline: string;
  customDirection: string;
  preserveSubject: boolean;
  preserveColors: boolean;
  preserveText: boolean;
};

const directions: Array<[DirectionId, string]> = [
  ["editorial-print", "Editorial Print"],
  ["flat-graphic", "Flat Graphic"],
  ["collage", "Collage"],
  ["typography", "Typography"],
  ["restore", "Restore"],
  ["custom", "Custom"],
];

const directionIds = new Set<DirectionId>(directions.map(([id]) => id));

function bounded(value: unknown, fallback: number) {
  const number = Number(value);
  return Number.isFinite(number)
    ? Math.max(0, Math.min(100, Math.round(number)))
    : fallback;
}

function validDirection(value: unknown): DirectionId | undefined {
  return directionIds.has(value as DirectionId) ? (value as DirectionId) : undefined;
}

function validTextMode(value: unknown): TypographyMode | undefined {
  return value === "keep" || value === "replace" || value === "generate"
    ? value
    : undefined;
}

function buildInitialState(data: CreationData): CreationState {
  const saved = window.openai?.widgetState ?? {};
  return {
    direction:
      validDirection(saved.direction) ??
      validDirection(data.recommendedDirection) ??
      validDirection(data.defaultDirection) ??
      "editorial-print",
    structure: bounded(saved.structure, bounded(data.structureDefault, 58)),
    intensity: bounded(saved.intensity, bounded(data.intensityDefault, 58)),
    textMode:
      validTextMode(saved.textMode) ?? validTextMode(data.initialTypographyMode) ?? "keep",
    headline:
      typeof saved.headline === "string"
        ? saved.headline
        : data.initialTypographyText ?? "",
    customDirection:
      typeof saved.customDirection === "string"
        ? saved.customDirection
        : data.initialCustomDirection ?? "",
    preserveSubject: Boolean(saved.preserveSubject),
    preserveColors: Boolean(saved.preserveColors),
    preserveText: Boolean(saved.preserveText),
  };
}

function normalizeState(state: CreationState): CreationState {
  if (state.direction === "typography" && state.textMode !== "keep") {
    return { ...state, preserveText: false };
  }
  return state;
}

function valueLabel(value: number) {
  if (value <= 25) return "Low";
  if (value <= 55) return "Medium";
  if (value <= 80) return "High";
  return "Max";
}

function CreationCard() {
  const initialData = (window.openai?.toolOutput ?? {}) as CreationData;
  const [data, setData] = useState<CreationData>(initialData);
  const [state, setState] = useState<CreationState>(() =>
    normalizeState(buildInitialState(initialData)),
  );
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [validation, setValidation] = useState("");
  const userTouched = useRef(false);
  const hasToolOutput = useRef(Boolean(initialData.kind));

  useEffect(() => {
    applyHostTheme();
    return subscribeHostGlobals((globals) => {
      if (globals.theme) applyHostTheme(globals.theme);
      if (globals.toolOutput) {
        const next = globals.toolOutput as CreationData;
        const first = !hasToolOutput.current;
        hasToolOutput.current = true;
        setData(next);
        if (first && !userTouched.current) {
          setState(normalizeState(buildInitialState(next)));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!userTouched.current) return;
    const timer = window.setTimeout(() => {
      void saveWidgetState({ ...state }).catch(console.warn);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [state]);

  function commit(patch: Partial<CreationState>) {
    userTouched.current = true;
    setValidation("");
    setState((current) => normalizeState({ ...current, ...patch }));
  }

  function validate() {
    if (state.direction === "custom" && !state.customDirection.trim()) {
      setValidation("Describe the direction first.");
      return false;
    }
    if (
      state.direction === "typography" &&
      state.textMode === "replace" &&
      !state.headline.trim()
    ) {
      setValidation("Enter the exact replacement text.");
      return false;
    }
    setValidation("");
    return true;
  }

  function buildPrompt() {
    const name = directions.find(([id]) => id === state.direction)?.[1] ?? state.direction;
    const extras: string[] = [];
    if (state.preserveSubject) extras.push("preserve the subject/face");
    if (state.preserveColors) extras.push("preserve the source colors");
    if (state.preserveText) {
      extras.push("preserve important source text exactly when feasible");
    }
    if (Array.isArray(data.hardLocks)) extras.push(...data.hardLocks);

    let special = "";
    if (state.direction === "custom") {
      special = ` Custom direction: ${state.customDirection.trim()}.`;
    }
    if (state.direction === "typography") {
      const text = state.headline.trim();
      if (state.textMode === "keep") {
        special =
          " Typography mode: keep original source text selectively and do not invent new copy.";
      }
      if (state.textMode === "replace") {
        special = ` Typography mode: replace text using only this exact wording: “${text}”. Do not add companion copy.`;
      }
      if (state.textMode === "generate") {
        special = ` Typography mode: the user explicitly authorizes generated typography.${
          text ? ` Use this headline or brief as the starting point: “${text}”.` : ""
        } Keep copy concise and compositionally necessary.`;
      }
    }
    if (state.direction === "restore") {
      special =
        " Restore means source-preserving Press Print treatment: keep more source structure and reduce destructive/material intervention; do not interpret this as archival restoration unless the user explicitly asks for that.";
    }

    const locks = extras.length
      ? ` Preserve/lock: ${[...new Set(extras)].join("; ")}.`
      : "";
    const isAlternative = data.creationKind === "alternative";
    const lineage = isAlternative
      ? ` This is a new alternative from the original source image. ${
          data.seedVersionId
            ? `Version ${data.seedVersionId} is a control-state seed only. `
            : ""
        }Do not use the previous result image as visual source and do not overwrite it. The alternative is not a child revision of the seed.`
      : " This is a new root version from the original source image.";
    const modeMetadata =
      state.direction === "custom"
        ? ` Custom direction metadata: ${state.customDirection.trim()}.`
        : state.direction === "typography"
          ? ` Typography metadata: mode ${state.textMode}${
              state.headline.trim() ? `, text/brief “${state.headline.trim()}”` : ""
            }.`
          : "";

    return `Generate a Press Print reconstruction of the same active original source image. Direction: ${name} (${state.direction}). Structure: ${state.structure}/100, where 0 means preserve the original camera composition and 100 means rebuild the composition aggressively. Intensity: ${state.intensity}/100, where 0 means soft treatment and 100 means strong visible treatment.${special}${locks}${lineage} Use the Press Print visual grammar and preservation logic. Do not ask for the source image again. When showing result controls, retain version metadata for direction ${state.direction}, Structure ${state.structure}, Intensity ${state.intensity}.${modeMetadata}`;
  }

  async function generate() {
    if (!validate()) return;
    setBusy(true);
    setStatus("Generating…");
    try {
      await saveWidgetState({ ...state });
      await sendFollowUpMessage(buildPrompt());
      setStatus("Sent");
    } catch (error) {
      console.error(error);
      setBusy(false);
      setStatus("Couldn’t continue. Use chat instead.");
    }
  }

  const typographyConflict = state.direction === "typography" && state.textMode !== "keep";

  return (
    <main className="pp-root" aria-label="Press Print creation controls">
      {data.sourceSummary ? (
        <p className="mb-4 max-w-[68ch] text-xs leading-5 text-secondary">
          {data.sourceSummary}
        </p>
      ) : null}

      <section className="mb-5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h2 className="m-0 text-xs font-semibold">Direction</h2>
          {data.recommendedDirection ? (
            <span className="text-[11px] text-tertiary">
              {directions.find(([id]) => id === data.recommendedDirection)?.[1]} · suggested
            </span>
          ) : null}
        </div>

        <div className="pp-direction-grid">
          {directions.map(([id, label]) => {
            const recommended = data.recommendedDirection === id;
            return (
              <Button
                key={id}
                color="secondary"
                variant="soft"
                size="sm"
                pill={false}
                block
                selected={state.direction === id}
                disabled={busy}
                className="pp-direction-button"
                onClick={() => commit({ direction: id })}
              >
                <span className="pp-direction-copy">
                  <span>{label}</span>
                  {recommended ? (
                    <span className="text-[10px] font-normal text-tertiary">Suggested</span>
                  ) : null}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="mb-5 grid gap-5">
        <div>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold">Structure</span>
            <span className="text-[11px] text-tertiary">{valueLabel(state.structure)}</span>
          </div>
          <Slider
            value={state.structure}
            min={0}
            max={100}
            step={1}
            label=""
            marks={[
              { value: 0, label: "Original" },
              { value: 100, label: "Rebuild" },
            ]}
            disabled={busy}
            onChange={(value) => commit({ structure: Math.round(value) })}
          />
        </div>

        <div>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold">Intensity</span>
            <span className="text-[11px] text-tertiary">{valueLabel(state.intensity)}</span>
          </div>
          <Slider
            value={state.intensity}
            min={0}
            max={100}
            step={1}
            label=""
            marks={[
              { value: 0, label: "Soft" },
              { value: 100, label: "Strong" },
            ]}
            disabled={busy}
            onChange={(value) => commit({ intensity: Math.round(value) })}
          />
        </div>
      </section>

      {state.direction === "typography" ? (
        <section className="mb-5 rounded-xl border border-subtle p-3">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold">Typography</span>
            <span className="text-[11px] text-tertiary">Text handling</span>
          </div>
          <SegmentedControl<TypographyMode>
            value={state.textMode}
            onChange={(textMode) => commit({ textMode })}
            aria-label="Typography mode"
            size="sm"
            block
            disabled={busy}
          >
            <SegmentedControl.Option value="keep">Keep</SegmentedControl.Option>
            <SegmentedControl.Option value="replace">Replace</SegmentedControl.Option>
            <SegmentedControl.Option value="generate">Generate</SegmentedControl.Option>
          </SegmentedControl>
          {state.textMode !== "keep" ? (
            <div className="mt-2">
              <Input
                value={state.headline}
                onChange={(event) => commit({ headline: event.target.value })}
                placeholder={
                  state.textMode === "replace"
                    ? "Exact replacement text"
                    : "Headline or brief (optional)"
                }
                invalid={Boolean(
                  validation && state.textMode === "replace" && !state.headline.trim(),
                )}
                disabled={busy}
                size="sm"
                variant="outline"
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {state.direction === "custom" ? (
        <section className="mb-5 rounded-xl border border-subtle p-3">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold">Custom direction</span>
            <span className="text-[11px] text-tertiary">Natural language</span>
          </div>
          <Input
            value={state.customDirection}
            onChange={(event) => commit({ customDirection: event.target.value })}
            placeholder="Describe the direction…"
            invalid={Boolean(validation && !state.customDirection.trim())}
            disabled={busy}
            size="sm"
            variant="outline"
          />
        </section>
      ) : null}

      {validation ? (
        <div className="mb-2 text-[11px] leading-4 text-secondary" aria-live="polite">
          {validation}
        </div>
      ) : null}

      <details className="pp-disclosure mb-4 border-t border-subtle pt-2">
        <summary>More Controls</summary>
        <div className="grid gap-2 pb-2 pt-1 sm:grid-cols-2">
          <Checkbox
            label="Preserve subject / face"
            checked={state.preserveSubject}
            disabled={busy}
            onCheckedChange={(checked) => commit({ preserveSubject: Boolean(checked) })}
          />
          <Checkbox
            label="Preserve source colors"
            checked={state.preserveColors}
            disabled={busy}
            onCheckedChange={(checked) => commit({ preserveColors: Boolean(checked) })}
          />
          <Checkbox
            label="Preserve source text"
            checked={state.preserveText}
            disabled={busy || typographyConflict}
            onCheckedChange={(checked) => commit({ preserveText: Boolean(checked) })}
          />
        </div>
      </details>

      <footer className="border-t border-subtle pt-3">
        <div className="flex items-center gap-3">
          <Button color="primary" size="sm" loading={busy} onClick={() => void generate()}>
            Generate
          </Button>
          <span className="text-[11px] text-tertiary" aria-live="polite">
            {status}
          </span>
        </div>
        <p className="mb-0 mt-2 text-[10px] leading-4 text-tertiary">
          Fine-tune the result in normal language after generation.
        </p>
      </footer>
    </main>
  );
}

applyHostTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CreationCard />
  </StrictMode>,
);
