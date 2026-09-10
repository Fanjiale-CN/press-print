# Press-Print 2.0 Art-Direction Runtime

This reference adds the decision and interaction layer for Press-Print 2.0. It does **not** replace the visual language in `press-print-v1.md`.

## Product rule

The visible experience should feel like:

> **Send an image. Say what you want.**

The user should not need to know the internal names `analyze_visual`, `propose_direction`, `reconstruct`, `critique`, `vary`, or `decompose`.

## Core constitution

The following are invariant:

- Photography is source material, not sacred material.
- Reconstruct, do not decorate.
- Preserve semantic identity, not visual completeness.
- Preserve identity-bearing relationships before optical continuity.
- Every visible intervention needs a structural or semantic cause.
- Solve structure before adding material effects.
- Expand Press-Print's intelligence, not its aesthetic identity.

The original Press-Print visual DNA remains authoritative: planar composition, source-aware cropping, selective halftone/duotone, graphic fields, controlled tactile collage, modernist hierarchy, compressed depth, active negative space, and strict source-text control.

## Hidden reasoning sequence

For substantial image requests, reason internally in this order:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

### READ
Observe the source before prescribing effects. Identify:

- semantic anchors,
- visual anchors,
- figure/ground,
- structural edges,
- directional forces,
- density/clutter,
- low-information fields,
- color anchors,
- existing flatness/depth.

Semantic importance and visual salience are different. Do not blindly preserve the most visually loud element.

### UNDERSTAND
Determine what makes the source *this particular image*:

- primary subject,
- identity invariants,
- essential subject/context relations,
- source-defining geometry,
- identity-bearing source text,
- redundant detail that can be spent.

### PROTECT
Form an internal preservation contract:

- **must preserve** — identity or meaning collapses if lost,
- **should preserve** — significant source specificity is lost,
- **may transform** — can be cropped, flattened, simplified, fragmented, or re-stated,
- **may remove** — low-value redundancy or clutter.

Explicit user locks outrank defaults.

Default spend order:
1. peripheral clutter,
2. repetitive low-value detail,
3. redundant depth continuity,
4. secondary context,
5. only then non-core specifics.

### DIRECT
Before execution, form one dominant direction thesis. A direction is a source-specific structural hypothesis, not a generic style preset.

Good direction:
> Preserve the cyclist and billboard relation, suppress right-edge signage, compress shopfront depth, and use the left quiet field to isolate the rider.

Bad direction:
> Make it Swiss / Japanese / retro / Y2K.

A result may have multiple reading events, but one directional thesis should dominate.

### RECONSTRUCT
Prefer structural operations before decorative ones:

1. crop / reframe,
2. isolate,
3. suppress,
4. scale contrast,
5. planar compression,
6. controlled fragmentation / overlap / repetition when justified.

Do not force tearing, dots, or collage onto every source.

### MATERIALIZE
Print materiality is causal, not cosmetic. Halftone, torn edges, misregistration, paper, photocopy noise, and ink-like behavior should appear only when they support hierarchy, separation, rupture, compression, or artifact-ness.

A successful Press-Print result may contain little or no torn paper when the source/direction does not need it.

### CRITIQUE
Before accepting a result, ask internally:

1. Does the source still remain itself?
2. Is hierarchy more intentional?
3. Is the directional thesis visible?
4. Did any intervention appear only because it looks fashionable?
5. Is the result reconstructed rather than filtered?
6. Is materiality bounded and coherent?
7. Does it still look recognizably Press-Print rather than generic AI polish?
8. Did cinematic realism or excessive 3D depth creep back in?

### REVISE
Revision changes causes, not symptoms. Preserve successful decisions from the current version unless the user asks to change them.

Do not treat revision as a fresh random generation.

## Interaction policy

### A. Explicit request → execute directly

If the user gives a clear direction, do not show a direction chooser and do not ask a redundant question.

Examples:

- `Make it flatter and more fragmented. Keep the face unchanged. No typography.`
- `Turn this into a restrained Press-Print reconstruction.`
- `Keep the current crop and reduce the tearing.`

Silently perform the visual reading/preservation reasoning, then generate or revise.

### B. Vague request → make a judgment, then offer directions

If the user supplies an image and says only something like:

- `process this`,
- `handle this`,
- `do your thing`,
- `make it Press-Print`,

first inspect the image. Do **not** ask the user to choose generic functions such as crop vs color vs sticker.

Instead form 1–3 meaningfully different art-direction hypotheses. When the MCP UI tool `render_direction_picker` is available, call it. Otherwise present the same choices concisely in text.

Typical public-facing direction labels may include:

- **Editorial** — source identity remains strong; rebuild hierarchy and depth more carefully.
- **Deconstructed** — preserve identity but spend more continuity through fragmentation/displacement.
- **Restrained** — fewer material interventions, quieter fields, controlled reconstruction.

These labels are only UI shorthand. Every direction still needs a source-specific thesis and instruction.

When using `render_direction_picker`, pass:

- a short source summary,
- the main visual opportunity,
- 1–3 direction objects,
- for each direction: title, concise summary, preservation promise, and a concrete instruction that can be sent back into the conversation.

After the user clicks a direction, treat the widget's follow-up instruction as approval to generate from the same source image. Do not ask them to upload the image again.

### C. Revision request → preserve state

When the user refers to the current/previous Press-Print result:

- preserve the successful crop unless requested otherwise,
- preserve explicit locks,
- preserve useful hierarchy and visual relationships,
- change the named axis or the diagnosed failure cause,
- do not restart from a generic default composition.

Examples:

`This one works. Keep the crop, make the right side quieter.`

`More aggressive, but don't touch the face.`

`Keep everything except reduce the paper tearing.`

If `render_result_actions` is available after a result, it may show a small set of useful next steps. Those actions should modify one clear axis at a time.

## Low-information fields

Do not think about negative space as a target percentage. A quiet field must have a job, such as:

- separation,
- pause,
- directional room,
- scale buffer,
- atmospheric release,
- semantic isolation,
- framing.

## External visual traditions

Press-Print may learn spatial or organizational logic from different traditions, including Song painting and Japanese editorial design, but must import **logic, not costume**.

Do not turn those references into style switches, historical props, cultural symbols, antique paper, seals, or decorative clichés.

## Text policy remains strict

V2 interaction does not loosen the v1 source-text system.

- No new text unless the user explicitly supplies exact wording.
- Preserve identity-critical source text when feasible.
- Never invent, translate, bilingual-duplicate, or approximately reconstruct uncertain source text.
- If exact source text cannot be preserved, obscure/crop it rather than hallucinate it.

## Final principle

The system should feel smarter while the images still feel like the Press-Print users already recognize.

> Stable judgment preference, variable surface outcome.
