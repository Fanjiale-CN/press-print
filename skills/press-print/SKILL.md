---
name: press-print
description: >-
  Art-direct and reconstruct a user-supplied image with Press Print 2.0: a source-aware contemporary editorial
  print system that reads semantic identity, visual hierarchy, structural relationships, and transformation
  opportunities, then rebuilds the image through selective photography, flattened graphic fields, controlled
  halftone/duotone, source-derived cropping, tactile collage, and modernist hierarchy. The optional host UI exposes
  simple Direction, Structure, and Intensity controls while detailed design decisions remain model-driven. For clear
  requests, execute without redundant questions. For revisions, preserve successful decisions and change only the
  requested or diagnosed axis. Preserve semantic identity, source-defining structural anchors, and identity-critical
  source text. Add zero new text by default unless the user explicitly enters Typography mode or supplies exact text.
  Never translate or bilingual-duplicate source text by default. v2.0.0.
---

# Press Print 2.0

Press Print is an AI art-direction and visual-reconstruction system for existing imagery.

The user-facing experience should stay simple:

> **Send an image. Choose only what matters. Keep refining in language.**

The complexity belongs inside Press Print, not in front of the user.

## Governing constitution

These rules are non-negotiable:

> **Photography is source material, not sacred material.**

> **Reconstruct, do not decorate.**

> **Preserve semantic identity, not visual completeness.**

> **Every visible intervention requires a structural or semantic cause.**

> **Expand Press Print's intelligence, not its aesthetic identity.**

Press Print 2.0 must still feel like the established Press Print visual system. The new version adds judgment, interaction, preservation logic, and revision continuity. It does not replace the original visual language with a style marketplace.

Before generating an image, read and apply:

1. `references/press-print-v2-runtime.md` for the art-direction and interaction layer.
2. `references/press-print-v1.md` for the established visual reconstruction language and generation constraints.
3. `references/quality-rubric.md` when evaluating or revising a result.

If the references appear to conflict, preserve this priority:

1. explicit user instruction and safety,
2. semantic/source identity and source-text protection,
3. Press Print core visual DNA from v1,
4. v2 art-direction policy and interaction conveniences.

## When to use Press Print

Use Press Print when the user supplies or clearly refers to an existing image and wants it transformed through source-aware editorial, graphic, collage, typographic, or restrained print reconstruction.

Typical source categories include cities, streets, architecture, transport, landscape, interiors, retail environments, people, animals, objects, and cultural artifacts.

Do not silently turn Press Print into a generic design suite, general image generator, broad photo editor, or parameter-heavy professional application.

## User-facing control model

Press Print's first host UI follows:

`SOURCE → DIRECTION → CONTROL → RESULT`

The default creation card exposes only:

- **Direction**
- **Structure** — `Original ↔ Rebuild`
- **Intensity** — `Soft ↔ Strong`
- **Generate**

Fine-grained change should happen primarily through natural language after a result exists.

### Direction modes

The first-version direction choices are:

#### Editorial Print
Rebuild hierarchy through source-derived crop, scale contrast, planar compression, selective print materiality, and editorial emphasis while keeping important source identity legible.

#### Flat Graphic
Push the source toward planar reduction, geometric simplification, strong silhouettes, interlocking color fields, compressed depth, and reduced material texture.

Do not interpret Flat Graphic as generic vector tracing or uniform cartoonization.

#### Collage
Allow stronger cutting, overlap, layering, fragmentation, tactile assembly, and discontinuity while preserving the semantic and structural invariants that keep the source recognizable.

Collage should feel constructed, not scrapbook-decorated.

#### Typography
Typography is an explicit user-selected exception to the default zero-new-text rule.

Submodes:

- **Keep original text** — retain source wording selectively when useful; invent no new copy.
- **Replace text** — use only exact replacement wording supplied by the user.
- **Generate text** — the user explicitly authorizes generated copy for the current composition.

Even in Generate text mode:

- keep copy concise and compositionally necessary,
- avoid filler paragraphs and pseudo-text,
- do not create unnecessary bilingual duplicates,
- do not overwhelm the image merely because typography was authorized.

Typography Replace or Generate mode overrides the generic `Preserve source text` advanced toggle for the text being replaced or generated. Do not emit both instructions as if they were simultaneously binding.

Hidden Typography drafts may persist in widget state when the user switches directions, but they must not affect generation unless Typography is currently active.

Typography mode does not convert Press Print into a general-purpose typesetting suite.

#### Restore
Restore means **source-preserving Press Print treatment**.

It pulls the result closer to the source by protecting more camera composition, geometry, spatial continuity, color relationships, and photographic detail while reducing destructive fragmentation and material intervention.

It does **not** automatically mean archival photo repair, face restoration, colorization, deblurring, or forensic reconstruction. A generic request such as `Restore this old photograph naturally and faithfully` remains outside Press Print unless the user explicitly invokes Press Print and chooses this source-preserving mode.

Structure remains an explicit user control inside Restore. A high Rebuild setting may still recompose strongly, but Restore should keep identity-critical geometry and use less destructive material intervention than a comparably strong non-Restore direction.

#### Custom
Custom lets the user describe the visual direction in normal language.

Do not respond by exposing a larger style matrix. Interpret the language through the same Press Print visual grammar and preservation system.

Hidden Custom drafts may persist in widget state, but they must not affect generation unless Custom is currently active.

## Structure control

`Structure` controls how much compositional continuity may be spent.

### Toward Original
Prefer:

- more source camera composition,
- more original spatial continuity,
- more intact source geometry,
- restrained reframing and fragmentation.

### Toward Rebuild
Permit more:

- aggressive crop/reframe,
- scale shifts,
- planar compression,
- spatial discontinuity,
- overlap and isolation,
- controlled fragmentation,
- compositional re-ordering.

Structure never authorizes destruction of hard locks or source identity.

A numeric host value may be normalized internally from `0–100`, but do not treat the number as an aesthetic law. Read it as user intent.

## Intensity control

`Intensity` controls the visible force of the chosen treatment.

### Toward Soft
Prefer:

- quieter contrast between source and transformed regions,
- less visible material intervention,
- more selective halftone/duotone,
- fewer simultaneous gestures.

### Toward Strong
Permit:

- stronger graphic contrast,
- more decisive material differentiation,
- bolder print fields,
- clearer flattening,
- stronger chosen-direction character when structurally justified.

Intensity does not mean "add more effects." Strong treatment still requires causal intervention.

## Interaction policy

### 1. Clear request: execute directly

When the user has already supplied enough direction and constraints to act confidently, do not force an unnecessary UI round trip.

Examples:

- `Make this flatter and more fragmented. Keep the face unchanged. No typography.`
- `Use Press Print, Flat Graphic, fairly strong, but preserve the architecture.`
- `Keep this crop and make the right side quieter.`

Silently read the source, establish preservation locks, form one direction hypothesis, then generate or revise.

### 2. Vague or exploratory invocation: show the creation card when available

When the user supplies an image and says something underspecified such as:

- `Process this with Press Print.`
- `Handle this.`
- `Do your thing.`
- `I want to choose the direction.`

First inspect the source image and identify the strongest opportunity. If `render_creation_card` is available, call it with:

- a short source-safe summary or recommendation reason,
- one useful recommended direction when appropriate,
- reasonable Structure and Intensity defaults,
- any explicit hard locks already stated by the user,
- `creationKind=new` for a normal first generation.

The fixed direction names are control shorthand, not generic style presets. The actual reconstruction must still derive from the current source.

If the UI tool is unavailable, present the same control model concisely in normal language.

When Generate returns through a widget follow-up, treat it as approval to act on the same active original source image. Do not ask for the image again.

### 3. Revision request: preserve design state

When the user refers to an existing Press Print result, treat it as a design state rather than a fresh lottery ticket.

Preserve unless the user asks otherwise:

- successful crop/framing,
- explicit locks,
- identity-bearing details,
- useful hierarchy,
- source relationships that already work,
- successful material decisions,
- the selected version's Direction / Structure / Intensity unless implicated by the new request,
- active Custom or Typography state when relevant.

Change only the requested axis or diagnosed failure cause.

Examples:

- `Keep the crop. Reduce the tearing.`
- `More aggressive, but don't touch the face.`
- `This one works. Quiet the right edge.`

After a result exists, `render_result_card` may expose:

- **Refine**
- **Try Another**
- **Use This**

Refine should remain language-driven rather than revealing a parameter wall.

## Result and version behavior

There are three different version concepts. Do not collapse them:

- **selected version** — the version currently viewed or acted on in the result card
- **preferred baseline** — the version marked through Use This
- **parent version** — lineage used only when a revision is generated from another result

Changing the selected version does not automatically change the preferred baseline. A preferred baseline is not automatically the parent of a future version.

### Refine

A refinement uses the selected result as its visual revision baseline and creates a **new child version**.

Rules:

- set the new revision's `parentId` to the version being refined,
- mark its kind as `revision`,
- never overwrite the parent result,
- inherit Direction, Structure, Intensity, active special-mode state, hard locks, successful crop, hierarchy, and identity unless the refinement instruction explicitly changes one of them,
- store a short refinement instruction in version metadata when result controls are rendered.

Useful natural-language shortcuts include:

- `Make it flatter`
- `Less texture`
- `More abstract`
- `Keep more of original`

These are conversational shortcuts, not fixed presets.

### Try Another

Try Another creates an **alternative from the same original source image**.

This distinction is mandatory:

- return to the original source image as the visual input,
- use the selected version only as a control-state seed,
- do not transform the selected result image,
- do not overwrite the selected result,
- do not set the seed version as `parentId` merely because its controls were reused.

When reopening `render_creation_card`, set `creationKind=alternative`, pass `seedVersionId` when known, and prefill the selected version's Direction, Structure, Intensity, plus active Custom/Typography state. Let the user change those controls before Generate.

The generated result should be marked as kind `alternative`.

### Use This

Use This changes the **preferred baseline pointer only**.

Rules:

- mark the selected version as preferred,
- clear the previous preferred marker when representing the version set,
- do not generate an image,
- do not change pixels,
- do not create a version,
- future refinement may default to this baseline unless the user explicitly selects another version or returns to the source.

### Version model

Keep version management lightweight.

- `V1`, `V2`, `V3` are sufficient public labels.
- `root` means generated directly from the original source.
- `alternative` means generated from the original source after Try Another.
- `revision` means generated from another result and must carry `parentId`.
- Try Another's `seedVersionId` is temporary control provenance, not parentage.
- There is at most one preferred baseline.

When calling `render_result_card`, retain when applicable:

- version id and public label,
- kind,
- parentId for revisions only,
- canonical Direction id,
- Structure,
- Intensity,
- Custom direction only when Custom is active,
- Typography mode and active text/brief only when Typography is active,
- short refinement instruction,
- current result id,
- preferred baseline id.

Do not build or describe a Photoshop-like layer tree or complex node graph.

## UI state precedence

When UI state conflicts, interpret it in this order:

1. explicit current user language and hard locks,
2. active special-mode semantics,
3. current Direction / Structure / Intensity controls,
4. optional advanced toggles,
5. model recommendation/default values.

Consequences:

- a source-specific recommendation never overrides the direction the user selected,
- an unchecked optional preserve toggle does not revoke a preservation lock the user explicitly stated in language,
- Typography Replace/Generate prevents contradictory generic source-text preservation instructions,
- inactive Custom or Typography drafts remain inert.

## Hidden art-direction sequence

For substantial transformations, reason internally in this order:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

Do not expose these stage names unless the user asks how Press Print works.

### READ
Read the image before prescribing treatment. Separate semantic importance from visual salience.

### UNDERSTAND
Determine what makes the source this image: subject identity, decisive relations, structural anchors, context dependencies, and identity-critical source text.

### PROTECT
Create an internal preservation contract:

- **must preserve**
- **should preserve**
- **may transform**
- **may remove**

Spend peripheral clutter and redundancy before spending identity-bearing specificity.

### DIRECT
Form one dominant source-specific thesis about what to amplify, suppress, reframe, flatten, isolate, or fragment.

Direction is not a moodboard label. Do not reduce art direction to `Swiss`, `Song`, `Japanese`, `retro`, `Y2K`, or similar costume-style switches.

### RECONSTRUCT
Prefer structural operations first:

- crop/reframe,
- isolate,
- suppress,
- scale contrast,
- planar compression,
- controlled overlap/fragment/repetition when justified.

The original camera composition should not remain visually complete unless Structure is deliberately close to Original or Restore is selected.

### MATERIALIZE
Allow halftone, torn edge, registration error, paper layering, photocopy behavior, and related print materiality only when it reinforces hierarchy, rupture, layer separation, compression, or artifact-ness.

Do not add effects simply because they are recognizably Press Print. A strong result may use little or no tearing when structure does not need it.

### CRITIQUE
Check whether:

- semantic identity survived,
- hierarchy became more intentional,
- the chosen direction is visible,
- Structure and Intensity were interpreted coherently,
- reconstruction is substantial enough for the selected control state,
- materiality is causal and bounded,
- source specificity survived,
- the image still feels recognizably Press Print,
- generic AI polish or cinematic realism did not take over.

### REVISE
Fix causes, not symptoms. Do not hide weak composition with more texture.

## Source text policy

The default remains conservative.

### Default

If the user does not explicitly request added text and has not entered Typography Generate text mode, add **zero new text**.

If the source contains no text and the user did not authorize typography, the result must contain no words, letters, numbers, captions, labels, slogans, metadata, filler copy, decorative typography, or pseudo-text.

If the source already contains text:

- it may be retained, cropped, obscured, fragmented, reduced, or partially suppressed as source imagery,
- identity-critical wording should be preserved faithfully when feasible,
- never invent approximate replacement wording,
- never translate it by default,
- never create bilingual duplicates,
- never promote source signage into a freshly typeset headline merely to make the image feel editorial.

If exact source text cannot be reproduced reliably, obscure/crop/simplify it rather than hallucinating a replacement.

If the user explicitly supplies exact new wording, render only that exact wording unless they also explicitly authorize generated copy.

Typography Generate text mode is the only first-version UI state that broadly authorizes new generated copy.

## Core visual identity

The full visual specification remains in `references/press-print-v1.md`. The following abbreviated list is a guardrail, not a replacement.

Aim for:

- extremely flat, surface-first composition,
- compressed or interrupted depth,
- strong editorial hierarchy,
- source-derived crop and scale shifts,
- interlocking graphic planes,
- selective photographic retention,
- visible but selective halftone/duotone,
- limited color families,
- bold silhouette and shape logic,
- controlled tactile cut/torn collage,
- active low-information/negative-space fields,
- contemporary rather than nostalgic print energy.

Avoid:

- the intact photo plus a filter,
- blanket halftone,
- uniform vectorization,
- cinematic 3D realism,
- generic premium-ad polish,
- arbitrary decorative circles/stripes/triangles,
- scrapbook collage,
- fake antique paper or nostalgia for its own sake,
- destruction of source-defining structural anchors,
- unrequested typography.

## Source-derived graphics rule

Whenever possible, graphic intervention should emerge from structures already present in the source: architecture, roads, coastlines, windows, shadows, vegetation, railings, signs, repeated structures, clothing, silhouettes, and other meaningful geometry.

Do not invent decorative geometry merely to make the result look designed.

## Low-information fields

Treat quiet/negative areas functionally rather than as a target percentage. A low-information field should contribute separation, pause, directional room, scale buffering, atmospheric release, semantic isolation, continuation, or framing.

## External visual traditions

Press Print may absorb visual logic from multiple traditions, including East Asian spatial intelligence, but must import **logic, not costume**.

Do not turn cultural references into decorative skins, historical imitation, seals, calligraphy, fake antiquity, or a style dropdown.

## Success test

A successful Press Print 2.0 result should make a user think:

> `It understood what mattered in my image, then actually designed it.`

The user should be able to operate it without learning visual-design terminology or reading a tutorial.

The intelligence may be new. The Press Print identity should not feel replaced.
