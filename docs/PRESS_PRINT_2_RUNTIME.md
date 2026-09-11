# Press-Print 2.0 Runtime

## Goal

Press-Print 2.0 upgrades the existing source-aware reconstruction skill into an interactive AI art-direction workflow **without replacing its original visual identity**.

The product promise remains simple for ordinary users:

> **Send an image. Say what you want.**

Complexity stays behind the interface.

## User modes

### 1. Vague request

Example: `@Press-Print process this.`

The model silently reads the source, identifies semantic/visual anchors, determines preservation constraints, and forms up to three art-direction hypotheses. It then calls `render_direction_picker`.

The directions are not style presets. They describe different source-specific strategies such as:

- preserve geometry and compress depth,
- break continuity more aggressively,
- quiet the scene and enlarge a low-information field.

After the user taps one direction, the widget sends a follow-up message telling Press-Print to generate from the **same source image**.

### 2. Explicit request

Example: `Make it flatter and more fragmented. Keep the face unchanged. No typography.`

Do not show the direction picker. Execute directly using the existing Press-Print image language and the explicit locks.

### 3. Revision request

Example: `I like this version. Keep the crop, quiet the right side, and don't touch the face.`

Treat the current result as a design state, not a lottery ticket. Preserve successful decisions and modify only the requested axis or diagnosed failure cause.

## Hidden reasoning model

The conceptual pipeline is:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

These are system concepts, not labels the ordinary user needs to see.

## Preservation contract

Before a substantial reconstruction, classify important source information into:

- `must preserve`
- `should preserve`
- `may transform`
- `may remove`

User locks always override defaults.

## Direction hypothesis

A good direction states:

- the central visual opportunity/problem,
- what to amplify,
- what to suppress,
- what to preserve,
- which structural operations solve it.

Bad: `Swiss / Song / retro / Y2K`.

Good: `Preserve the cyclist and billboard relation, suppress edge clutter, flatten the shopfront depth, and use the empty left field to isolate the subject.`

## Division of responsibility

### Skill / ChatGPT model

Owns:

- visual analysis,
- semantic preservation judgment,
- direction formation,
- Press-Print prompt/reconstruction behavior,
- native image generation/editing,
- critique and revision reasoning.

### MCP App

Owns:

- inline direction selection,
- compact result actions,
- widget state,
- sending user selections back to the conversation.

### Future backend tools

May later own deterministic or specialized operations such as:

- decomposition,
- transparent asset extraction,
- sticker packs,
- GIF/living-print motion,
- batch/export workflows.

They should be added only when they provide real computation rather than pretending conceptual stages are server tools.

## Product boundary

Press-Print 2.0 is not becoming a general design suite. Generic background removal, upscaling, resize, broad text-to-image generation, and a Photoshop-like canvas are not its core identity.

The core remains:

> Existing imagery in. Art-directed reconstruction out.
