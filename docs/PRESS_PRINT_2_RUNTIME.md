# Press-Print 2.0 Runtime

## Goal

Press-Print 2.0 upgrades the existing source-aware reconstruction skill into a stronger AI art-direction workflow **without replacing its original visual identity**.

The product promise remains simple:

> **Send an image. Say what you want.**

Complexity stays behind the interaction.

## User modes

### 1. Vague request

Example: `@Press-Print process this.`

The model silently reads the source, identifies semantic and visual anchors, determines preservation constraints, stabilizes hierarchy when the source is diffuse / repetitive / sparse / ambiguous, forms the strongest source-specific direction, and executes.

If the image has multiple equally plausible readings whose choice would materially change the result, the model may present a small number of concise alternatives in normal language. Otherwise it should make the judgment itself.

### 2. Explicit request

Example: `Make it flatter and more fragmented. Keep the face unchanged. No typography.`

Execute directly using the existing Press-Print image language and the explicit locks.

### 3. Revision request

Example: `I like this version. Keep the crop, quiet the right side, and don't touch the face.`

Treat the current result as a design state, not a lottery ticket. Preserve successful decisions and modify only the requested axis or diagnosed failure cause.

### 4. Alternative request

If the user asks for another direction from the same source, return to the original source image unless they explicitly ask to build on the current result.

## Hidden reasoning model

The conceptual pipeline is:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

These are system concepts, not labels the ordinary user needs to see.

## Hierarchy stabilization

Before the final direction is formed, test whether the source provides a sufficiently useful hierarchy.

Do **not** inherit weak source hierarchy by default.

When many similar subjects compete at comparable visual weight:

- choose one dominant anchor or dominant cluster when appropriate,
- keep a small supporting set when useful,
- treat the remaining repetition as rhythm, field, mass, texture, or context,
- preserve group identity when the repeated group itself is semantically important.

When a substantial low-information field shapes the composition:

- assign it a role such as separation, pause, directional room, scale buffer, atmospheric release, semantic isolation, continuation, framing, or graphic mass,
- do not fill the region simply because it is quiet,
- crop, compress, suppress, or reduce it only when it is genuinely redundant.

No universal blank-area percentage or object-count threshold should trigger these behaviors. The question is whether the source hierarchy can carry the intended reconstruction.

The runtime implementation is detailed in `skills/press-print/references/hierarchy-stabilization.md`.

## Preservation contract

Before a substantial reconstruction, classify important source information into:

- `must preserve`
- `should preserve`
- `may transform`
- `may remove`

User locks always override defaults.

## Direction hypothesis

A good direction states:

- the central visual opportunity or problem,
- what to amplify,
- what to suppress,
- what to preserve,
- which structural operations solve it.

If hierarchy stabilization was required, the direction should also establish what is dominant, what supports it, what becomes field/rhythm/context, and what job major quiet regions perform.

Bad: `Swiss / Song / retro / Y2K`.

Good: `Preserve the cyclist and billboard relation, suppress edge clutter, flatten the shopfront depth, and use the empty left field to isolate the subject.`

## Natural-language control model

Direction, Structure, and Intensity remain useful abstractions inside Press-Print 2.0.

- **Direction** identifies the dominant reconstruction thesis.
- **Structure** describes how much original compositional continuity may be spent.
- **Intensity** describes the visible force of the treatment.

The user may state these directly, or the model may infer them from normal language. They are not dependent on a custom host interface.

## Division of responsibility

### Skill / host model

Owns:

- visual analysis,
- semantic preservation judgment,
- hierarchy stabilization,
- direction formation,
- Press-Print prompt and reconstruction behavior,
- image generation or editing when the host supports it,
- critique and revision reasoning.

### Future backend tools

May later own deterministic or specialized operations such as:

- decomposition,
- transparent asset extraction,
- salience / segmentation assistance when it materially improves difficult hierarchy cases,
- sticker packs,
- GIF or living-print motion,
- batch and export workflows.

They should be added only when they provide real computation rather than pretending conceptual stages are server tools.

## Product boundary

Press-Print 2.0 is not becoming a general design suite. Generic background removal, upscaling, resize, broad text-to-image generation, and a Photoshop-like canvas are not its core identity.

The core remains:

> Existing imagery in. Art-directed reconstruction out.
