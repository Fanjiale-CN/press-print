import "./main.css";

import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Input } from "@openai/apps-sdk-ui/components/Input";
import { StrictMode, useEffect, useMemo, useRef, useState } from "react";
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

type Version = {
  id: string;
  label?: string;
  parentId?: string;
  kind?: "root" | "alternative" | "revision";
  direction?: DirectionId;
  structure?: number;
  intensity?: number;
  customDirection?: string;
  typographyMode?: TypographyMode;
  typographyText?: string;
  instruction?: string;
  active?: boolean;
  preferred?: boolean;
};

type ResultData = {
  kind?: string;
  resultSummary?: string;
  versionId?: string;
  preferredVersionId?: string;
  versions?: Version[];
  quickRefinements?: string[];
  preserveNotes?: string[];
};

const defaultChips = [
  "Make it flatter",
  "Less texture",
  "More abstract",
  "Keep more of original",
];

function versionItems(data: ResultData) {
  return Array.isArray(data.versions) ? data.versions : [];
}

function knownIds(data: ResultData) {
  return new Set(versionItems(data).map((version) => version.id));
}

function normalizeSelection(
  data: ResultData,
  activeVersion: string | null,
  preferredVersionId: string | null,
  preferNewest = false,
) {
  const items = versionItems(data);
  const known = knownIds(data);
  let active = activeVersion;
  let preferred = preferredVersionId;

  if (preferNewest && data.versionId && known.has(data.versionId)) {
    active = data.versionId;
  }
  if (!active || !known.has(active)) {
    active =
      (data.versionId && known.has(data.versionId) ? data.versionId : null) ??
      items.find((version) => version.active)?.id ??
      items[0]?.id ??
      data.versionId ??
      null;
  }

  const declared =
    data.preferredVersionId ?? items.find((version) => version.preferred)?.id ?? null;
  if (declared && known.has(declared)) preferred = declared;
  else if (preferred && !known.has(preferred)) preferred = null;

  return { active, preferred };
}

function versionContext(version: Version | null) {
  if (!version) return "the current Press Print result";
  const bits = [`version ${version.label ?? version.id} (id ${version.id})`];
  if (version.direction) bits.push(`direction ${version.direction}`);
  if (Number.isFinite(version.structure)) bits.push(`Structure ${version.structure}/100`);
  if (Number.isFinite(version.intensity)) bits.push(`Intensity ${version.intensity}/100`);
  if (version.direction === "custom" && version.customDirection) {
    bits.push(`custom direction “${version.customDirection}”`);
  }
  if (version.direction === "typography" && version.typographyMode) {
    bits.push(
      `Typography mode ${version.typographyMode}${
        version.typographyText ? ` with text/brief “${version.typographyText}”` : ""
      }`,
    );
  }
  return `Press Print ${bits.join(", ")}`;
}

function inheritedControlInstruction(version: Version | null) {
  if (!version) return "Use the most recent known creation controls.";
  const parts: string[] = [];
  if (version.direction) parts.push(`defaultDirection=${version.direction}`);
  if (Number.isFinite(version.structure)) parts.push(`structureDefault=${version.structure}`);
  if (Number.isFinite(version.intensity)) parts.push(`intensityDefault=${version.intensity}`);
  if (version.direction === "custom" && version.customDirection) {
    parts.push(`initialCustomDirection=${JSON.stringify(version.customDirection)}`);
  }
  if (version.direction === "typography" && version.typographyMode) {
    parts.push(`initialTypographyMode=${version.typographyMode}`);
  }
  if (version.direction === "typography" && typeof version.typographyText === "string") {
    parts.push(`initialTypographyText=${JSON.stringify(version.typographyText)}`);
  }
  return parts.length
    ? `Prefill the creation card with ${parts.join(", ")}.`
    : "Use the most recent known creation controls.";
}

function ResultCard() {
  const initialData = (window.openai?.toolOutput ?? {}) as ResultData;
  const saved = window.openai?.widgetState ?? {};
  const initialSelection = normalizeSelection(
    initialData,
    typeof saved.activeVersion === "string" ? saved.activeVersion : null,
    typeof saved.preferredVersionId === "string" ? saved.preferredVersionId : null,
  );

  const [data, setData] = useState<ResultData>(initialData);
  const [activeVersion, setActiveVersion] = useState<string | null>(initialSelection.active);
  const [preferredVersionId, setPreferredVersionId] = useState<string | null>(
    initialSelection.preferred,
  );
  const [refineOpen, setRefineOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const activeRef = useRef(activeVersion);
  const preferredRef = useRef(preferredVersionId);
  const hasToolOutput = useRef(Boolean(initialData.kind));
  const lastResultVersionId = useRef(
    typeof initialData.versionId === "string" ? initialData.versionId : null,
  );

  useEffect(() => {
    activeRef.current = activeVersion;
  }, [activeVersion]);
  useEffect(() => {
    preferredRef.current = preferredVersionId;
  }, [preferredVersionId]);

  useEffect(() => {
    applyHostTheme();
    return subscribeHostGlobals((globals) => {
      if (globals.theme) applyHostTheme(globals.theme);
      if (!globals.toolOutput) return;

      const next = globals.toolOutput as ResultData;
      const nextId = typeof next.versionId === "string" ? next.versionId : null;
      const preferNewest = Boolean(
        hasToolOutput.current && nextId && nextId !== lastResultVersionId.current,
      );
      hasToolOutput.current = true;
      lastResultVersionId.current = nextId;

      const normalized = normalizeSelection(
        next,
        activeRef.current,
        preferredRef.current,
        preferNewest,
      );
      setData(next);
      setActiveVersion(normalized.active);
      setPreferredVersionId(normalized.preferred);
      setStatus("");
    });
  }, []);

  const versions = useMemo(() => versionItems(data), [data]);
  const current = useMemo(() => {
    return (
      versions.find((version) => version.id === activeVersion) ??
      versions.find((version) => version.id === data.versionId) ??
      versions[0] ??
      (data.versionId ? ({ id: data.versionId } as Version) : null)
    );
  }, [activeVersion, data.versionId, versions]);

  const preferred = useMemo(
    () => versions.find((version) => version.id === preferredVersionId) ?? null,
    [preferredVersionId, versions],
  );
  const isBaseline = Boolean(current?.id && current.id === preferredVersionId);

  async function save(extra: Record<string, unknown> = {}) {
    await saveWidgetState({ activeVersion, preferredVersionId, ...extra });
  }

  async function follow(prompt: string, label = "Continuing…", unlockAfter = false) {
    setStatus(label);
    setBusy(true);
    try {
      await sendFollowUpMessage(prompt);
      setStatus("Sent");
      if (unlockAfter) setBusy(false);
    } catch (error) {
      console.error(error);
      setBusy(false);
      setStatus("Couldn’t continue. Use chat instead.");
    }
  }

  async function refine() {
    const text = instruction.trim();
    if (!text) {
      setStatus("Describe one change first.");
      return;
    }
    const version = current;
    await save({ lastAction: "refine", lastRefine: text });
    const lineage = version?.id
      ? `Create a new child revision with parentId ${version.id} and kind revision. Do not overwrite version ${version.id}.`
      : "Create a new revision without overwriting the current result.";
    const inheritance = version
      ? "Inherit its direction, Structure, Intensity, special-mode state, hard locks, successful crop, hierarchy, identity, and other successful decisions unless this instruction explicitly requires changing one of them."
      : "Preserve all successful state that is not implicated by the instruction.";
    await follow(
      `Refine ${versionContext(version)}. User instruction: ${text}. ${lineage} ${inheritance} Change only the requested or clearly necessary axis. Generate the revision now, then show result controls with complete lineage metadata.`,
    );
  }

  async function tryAnother() {
    const version = current;
    await save({ lastAction: "try-another" });
    const seed = version?.id
      ? `Set creationKind=alternative and seedVersionId=${version.id}.`
      : "Set creationKind=alternative.";
    await follow(
      `Open the Press Print creation card for a new alternative from the same original source image. ${seed} ${inheritedControlInstruction(version)} The seed version supplies control values only. Do not use the seed result image as visual input, do not overwrite it, and do not treat the alternative as a child revision. Let the user adjust Direction, Structure, Intensity, and any active special-mode fields before Generate.`,
    );
  }

  async function useThis() {
    if (!current?.id || isBaseline) return;
    const nextPreferred = current.id;
    setPreferredVersionId(nextPreferred);
    preferredRef.current = nextPreferred;
    await saveWidgetState({
      activeVersion,
      preferredVersionId: nextPreferred,
      lastAction: "use-this",
    });
    await follow(
      `Mark Press Print version ${current.id} as the user's preferred active baseline. Do not generate a new image, do not create a new version, and do not alter any pixels. Future refinements should default to this version unless the user selects another version or explicitly returns to the original source.`,
      "Using this version…",
      true,
    );
  }

  const chips =
    Array.isArray(data.quickRefinements) && data.quickRefinements.length
      ? data.quickRefinements.slice(0, 4)
      : defaultChips;

  const meta = current
    ? `${current.label ?? current.id}${
        current.direction ? ` · ${String(current.direction).replaceAll("-", " ")}` : ""
      }`
    : "";

  return (
    <main className="pp-root" aria-label="Press Print result controls">
      <div className="flex items-start justify-between gap-4 max-[620px]:block">
        <p className="m-0 max-w-[62ch] text-[13px] leading-5 text-secondary">
          {data.resultSummary ?? "Keep what works. Change only what needs changing."}
        </p>
        {meta ? (
          <div className="pt-0.5 text-[10px] capitalize text-tertiary max-[620px]:mt-1">
            {meta}
          </div>
        ) : null}
      </div>

      {versions.length || data.versionId ? (
        <div className="pp-version-row my-3 border-y border-subtle py-2.5">
          <div className="pp-version-list" style={{ display: versions.length > 1 ? "flex" : "none" }}>
            {versions.map((version, index) => (
              <Button
                key={version.id}
                color="secondary"
                variant="soft"
                size="2xs"
                pill
                selected={version.id === activeVersion}
                disabled={busy}
                onClick={() => {
                  setActiveVersion(version.id);
                  activeRef.current = version.id;
                  void saveWidgetState({
                    activeVersion: version.id,
                    preferredVersionId,
                  }).catch(console.warn);
                }}
              >
                {version.label ?? `V${index + 1}`}
              </Button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isBaseline && preferredVersionId ? (
              <span className="text-[10px] text-tertiary">
                Baseline: {preferred?.label ?? preferredVersionId}
              </span>
            ) : null}
            <Button
              color="secondary"
              variant="ghost"
              size="2xs"
              pill
              selected={isBaseline}
              disabled={busy || !current?.id || isBaseline}
              onClick={() => void useThis()}
            >
              {isBaseline ? "Baseline" : "Use This"}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          color="primary"
          size="sm"
          loading={busy}
          onClick={() => setRefineOpen((open) => !open)}
        >
          Refine
        </Button>
        <Button
          color="secondary"
          variant="soft"
          size="sm"
          disabled={busy}
          onClick={() => void tryAnother()}
        >
          Try Another
        </Button>
      </div>

      {refineOpen ? (
        <section className="mt-3 border-t border-subtle pt-3">
          <div className="mb-2 text-xs font-semibold">What should change?</div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <Button
                key={chip}
                color="secondary"
                variant="soft"
                size="2xs"
                pill
                disabled={busy}
                onClick={() => setInstruction(chip)}
              >
                {chip}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 max-[360px]:flex-col max-[360px]:items-stretch">
            <Input
              className="min-w-0 flex-1"
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void refine();
              }}
              placeholder="Tell Press Print what to change…"
              disabled={busy}
              size="sm"
              variant="outline"
            />
            <Button color="primary" size="sm" loading={busy} onClick={() => void refine()}>
              Apply
            </Button>
          </div>
        </section>
      ) : null}

      <div className="mt-2 min-h-4 text-[11px] leading-4 text-tertiary" aria-live="polite">
        {status}
      </div>
    </main>
  );
}

applyHostTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResultCard />
  </StrictMode>,
);
