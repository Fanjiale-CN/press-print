# Press-Print Tool & Capability Specification
Version: 2.0  
Status: Canonical Engineering Layer  
Scope: Capability contracts for the current Skill runtime and future web runtime

## 0. Architecture rule

Press-Print 2.0 has six canonical **capabilities**:

1. `analyze_visual`
2. `propose_direction`
3. `reconstruct`
4. `critique`
5. `vary`
6. `decompose`

These names describe the product's reasoning and execution contract. They do **not** require six externally exposed tools.

The current runtime deliberately keeps image understanding, art-direction reasoning, reconstruction, critique, and revision inside the host model + Press-Print Skill when that is the strongest available environment.

```text
analyze_visual
  → propose_direction
    → reconstruct
      → critique
        → vary / decompose
```

Do not create fake server tools merely to mirror internal phase names.

---

## 1. `analyze_visual` capability

### Purpose
Read the actual source image and produce a structured understanding of:
- semantic anchors,
- visual anchors,
- structural relations,
- identity invariants,
- low-information fields,
- clutter and redundancy,
- transformation risks and opportunities.

### Current runtime
Model-native capability governed by `SKILL.md`, `PP_VISUAL_GRAMMAR.md`, and `PP_SYSTEM_SCHEMA.yaml`.

### Required behaviors
- separate semantic importance from raw salience,
- estimate source type,
- identify identity invariants,
- identify redundancy and clutter,
- estimate flattening risk and fragmentation tolerance,
- respect explicit user locks.

### Failure modes
- overfitting to visual salience,
- misidentifying subject in complex scenes,
- confusing culturally meaningful detail with clutter,
- collapsing multiple anchors into one.

---

## 2. `propose_direction` capability

### Purpose
Convert source understanding into one or more source-specific art-direction hypotheses.

### Current runtime
Model-native reasoning.

### Required behaviors
- create structural, source-derived direction theses,
- create a preservation contract,
- choose one dominant direction by default,
- produce concise alternatives only when genuine ambiguity warrants them.

### Direction vocabulary
Useful shorthand includes:
- editorial,
- deconstructed,
- restrained,
- graphic,
- quiet,
- assertive.

These are emphasis profiles, not style presets.

### Failure modes
- vague style adjectives,
- effect playlists,
- too many near-identical directions,
- forcing user choice when the system should make a judgment.

---

## 3. `reconstruct` capability

### Purpose
Execute a direction hypothesis and preservation contract to create a Press-Print image.

### Current runtime
The host's native image generation/editing capability, driven by the Press-Print rendering authority in `press-print-v1.md` plus the 2.0 preservation and direction context.

### Required behaviors
- honor hard locks,
- solve structure before surface materiality,
- preserve identity-bearing relations,
- transform through reconstruction rather than a uniform filter,
- retain Press-Print's established visual DNA,
- show visible compositional intervention in the default case.

### User-level controls
These may be expressed in ordinary language:
- direction,
- structure,
- intensity,
- preserve face / identity,
- preserve structure,
- preserve original colors,
- output intent when supported,
- typography, off by default unless exact user text or explicit generation permission is supplied.

### Internal controls
- crop aggression,
- planar bias,
- scale contrast,
- hierarchy rebuild,
- suppression strength,
- fragmentation strength,
- materiality enable/disable.

### Failure modes
- decorative output with no structural cause,
- identity collapse,
- under-reconstruction,
- unreadable over-reconstruction,
- cinematic realism drift.

---

## 4. `critique` capability

### Purpose
Evaluate whether the generated result achieved the intended direction while preserving source identity and Press-Print identity.

### Current runtime
Model-native self-critique governed by `PP_REGRESSION_BENCHMARK.md` and the existing quality rubric.

### Core dimensions
- semantic preservation,
- Press-Print identity,
- reconstruction strength,
- editorial hierarchy,
- planar coherence,
- material coherence,
- source specificity,
- generic AI penalty,
- decorative noise penalty,
- cinematic realism drift.

### Required behavior
Diagnose a **cause**, not merely describe a symptom.

---

## 5. `vary` capability

### Purpose
Generate controlled variations from an existing successful or partially successful result.

### Current runtime
Model-native revision using the prior result and explicit keep/change instructions.

### Approved variation axes
- more_restrained,
- more_aggressive,
- more_fragmented,
- more_graphic,
- more_quiet,
- more_photographic,
- more_planar,
- more_material.

### Required behaviors
- change one clear axis or a small compatible set,
- preserve useful decisions from the base result,
- avoid random re-roll behavior,
- distinguish revision-from-result from alternative-from-source.

If the user asks for an alternative from the original source, return to the original source image unless instructed otherwise.

---

## 6. `decompose` capability

### Purpose
Turn a successful reconstruction into reusable semantic assets for downstream formats such as transparent stickers, GIFs, or motion.

### Current runtime
Planned capability. Do not pretend it exists when the host cannot reliably return separated assets.

### Target outputs
- hero subject cutout,
- transparent sticker asset,
- fragment assets,
- background planes,
- texture layers,
- motion-ready semantic groups.

### Required behaviors
- preserve semantic grouping,
- separate along structurally meaningful boundaries,
- avoid meaningless segmentation debris.

---

## 7. Reference workflows

### A. Vague request
User: “Process this.”

1. analyze the source silently,
2. create preservation contract,
3. form strongest source-specific direction,
4. reconstruct,
5. critique,
6. revise only if needed.

If there are multiple genuinely consequential readings, offer a small number of concise alternatives in normal language before reconstruction.

### B. Explicit request
User: “Make this more fragmented and flat. Preserve the face. No text.”

1. analyze,
2. lock face + explicit constraints,
3. form one internal direction hypothesis,
4. reconstruct immediately,
5. critique.

### C. Revision
User: “Keep the crop, reduce the tearing.”

1. treat prior successful crop as a lock,
2. reduce only fragmentation/materiality as requested,
3. reconstruct from the prior state rather than restart,
4. critique the cause-level change.

### D. Alternative
User: “Try another direction from the original.”

1. return to the original source image,
2. preserve only useful semantic lessons or explicit locks,
3. form a new direction thesis,
4. reconstruct as an alternative rather than a child revision.

---

## 8. Deliberately excluded from the core identity

- generic background remover as a standalone identity,
- generic upscaler,
- generic resize utility,
- generic text-to-image engine,
- unconstrained generative fill,
- full freeform design canvas.

These may become supporting capabilities in a future studio, but they must not redefine Press-Print.

---

## 9. Integration notes

### Current Skill runtime
- conversation is the primary control surface,
- direct execution is preferred for explicit requests,
- vague requests should trigger judgment rather than menu-building,
- native host image capabilities should be used rather than duplicated without reason.

### Future Web Studio
- may implement the six capability contracts as explicit services,
- should share the same schema, preservation contract, critique taxonomy, and visual grammar,
- may expose Direction, Structure, and Intensity as interface controls without changing their semantics.

---

## 10. Final implementation rule

If a proposed tool or parameter does not make Press-Print better at:
- reading a source image,
- making an art-direction decision,
- reconstructing with identity and structure,
- revising intentionally,
- or exporting coherent assets,

it probably does not belong in the core product.
