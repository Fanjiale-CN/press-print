# Press Print Host UI v1

Status: Canonical interaction specification for the first ChatGPT host UI

## Product intent

Press Print should feel like a small creative instrument inside ChatGPT, not a miniature Photoshop.

The default experience is:

`SOURCE → DIRECTION → CONTROL → RESULT`

The UI should expose only the decisions that benefit from direct manipulation. Detailed art-direction reasoning, source analysis, preservation logic, critique, and most reconstruction parameters remain hidden inside the Skill and model.

## Core principles

1. **Simple choice first.** A first-time user should understand the card without onboarding copy.
2. **Two primary controls.** Structure and Intensity are the only persistent numeric controls in the default creation state.
3. **Language absorbs complexity.** Fine-grained revision happens primarily through natural language.
4. **No parameter wall.** Advanced options stay collapsed and appear only when they materially help.
5. **State continuity.** Revisions inherit successful choices from the current result instead of rerolling the whole design.
6. **UI is optional acceleration.** Every action must remain expressible in normal ChatGPT language if the widget is unavailable.

## State A — Source ready / creation card

Shown after a source image is available and the user invokes Press Print or asks for a Press Print transformation.

### Source

The card should acknowledge that a source image is active, but should not repeat a large preview if the image is already directly above in ChatGPT.

Optional compact source information:
- source available
- short source-specific visual opportunity, if useful

Do not expose internal analysis terms such as semantic anchors, preservation contracts, or transformation budgets.

### Direction

Exactly one direction is selected at a time.

First version directions:

- **Editorial Print** — editorial hierarchy, print treatment, source-aware reconstruction
- **Flat Graphic** — stronger planar reduction, geometric simplification, reduced material texture
- **Collage** — cut, layer, overlap, fragment, tactile assembly
- **Typography** — explicitly opens text-led controls and authorizes typography behavior according to the selected text mode
- **Restore** — pulls the image toward source fidelity with restrained intervention; this is a Press Print source-preserving mode, not automatic archival photo restoration
- **Custom** — lets the user describe a direction in natural language

The system may recommend one direction based on the source, but recommendations must not prevent the user from selecting any other direction.

### Control

Two primary parameters only:

#### Structure

`Original ↔ Rebuild`

Meaning:
- Original: preserve more camera composition, spatial continuity, source geometry, and existing relations
- Rebuild: allow stronger crop, planar compression, re-ordering, fragmentation, overlap, and recomposition

Suggested internal normalized range: `0–100`.

The number does not need to be shown to the user by default.

#### Intensity

`Soft ↔ Strong`

Meaning:
- Soft: restrained contrast between transformed and source-retained regions; less visible material intervention
- Strong: stronger graphic contrast, bolder halftone/duotone, more decisive material or compositional treatment when justified

Suggested internal normalized range: `0–100`.

The number does not need to be shown to the user by default.

### Generate

Primary action: **Generate**

Generate converts the card state into one concise instruction for the same active source image.

It should include:
- chosen direction
- Structure value/intent
- Intensity value/intent
- any special mode fields
- Custom direction text when applicable
- all explicit user locks already present in the conversation

Generate must not ask the user to re-upload the image.

## Typography special state

Typography controls remain hidden unless Typography is selected.

First-version text modes:

- **Keep original text** — source text may be preserved selectively; no new copy is invented
- **Replace text** — user supplies exact replacement wording
- **Generate text** — user explicitly authorizes generated copy for the current composition

Optional field:
- **Headline**

Rules:
- Replace text requires user-provided exact wording.
- Generate text is explicit authorization to create copy, but the system should still avoid filler text, unnecessary bilingual duplication, and uncontrolled typographic density.
- Typography mode does not turn Press Print into a general-purpose layout or publishing application.

## Custom special state

When Custom is selected, reveal one natural-language field:

`Describe the direction…`

No additional style parameter matrix appears.

## Advanced controls

A collapsed `More Controls` affordance may exist later, but the first release should not depend on it.

Candidates that belong there rather than the main card:
- preserve subject / face
- preserve source colors
- preserve text
- materiality emphasis
- crop/aspect-ratio override
- output format or downstream asset behavior

Do not surface these by default unless the source or explicit user request makes one of them essential.

## State B — Generating

After Generate:

- lock the creation controls temporarily
- show a compact generating state
- do not replace ChatGPT's own generation progress UI
- avoid fake progress percentages

The widget may store the submitted control state so it can be restored for Try Another.

## State C — Result

After a result exists, the interaction emphasis changes from creation controls to decision and refinement.

Primary result actions:

- **Refine**
- **Try Another**
- **Use This**

### Original / Result

When the host exposes usable image references for both the source and result, the result UI may display an Original / Result comparison.

When those references are not available to the widget, do not fabricate or proxy them. The result image can remain in the normal ChatGPT message while the widget provides result actions below it.

The comparison is therefore an enhancement, not a prerequisite for the workflow.

### Refine

Refine is primarily language-driven.

Selecting Refine should reveal a compact natural-language input or move the user naturally back into ChatGPT conversation.

Useful quick suggestions may appear as optional prompts, for example:
- Make it flatter
- Less texture
- More abstract
- Keep more of original

These are shortcuts, not a parameter panel.

A refinement instruction should inherit:
- current source
- current chosen direction
- current successful crop and hierarchy
- explicit preservation locks
- current version as the revision baseline

Only requested or diagnosed axes should change.

### Try Another

Try Another creates a sibling version from the same source.

Default behavior:
- restore the most recent creation controls
- allow the user to change Direction, Structure, or Intensity
- do not destroy or overwrite the current result

### Use This

Use This marks the current result as the active baseline.

It means:
- this is the version the user currently prefers
- future refinement should build from it unless the user explicitly switches versions or returns to the source

It does not need to export or download anything by itself.

## Multi-version management

Keep version management deliberately lightweight.

Recommended first-version model:
- `V1`, `V2`, `V3`… compact version chips or a small `Version x of y` control
- one version is active at a time
- Try Another creates a sibling
- Refine creates a child revision of the active version
- Use This marks one version as preferred/current

Do not build a layer tree, node graph, or full history timeline.

Minimum version state should retain:
- version id
- parent version id when refined
- chosen direction
- Structure
- Intensity
- short custom/refine instruction
- preferred/current state

## First-use comprehension

A new user should be able to understand the card from familiar nouns and controls alone.

Avoid tutorial blocks such as:
- "Step 1"
- "How to use Press Print"
- long explanatory tooltips

Prefer self-explanatory labels:
- Direction
- Structure
- Intensity
- Generate
- Refine
- Try Another
- Use This

If a control needs a paragraph to explain it, it does not belong in the default card.

## Interaction contract with the Skill

The UI provides intent. The Skill supplies visual judgment.

The UI must not encode all design intelligence in sliders or presets.

For every Generate or Refine request, Press Print still performs its hidden sequence:

`READ → UNDERSTAND → PROTECT → DIRECT → RECONSTRUCT → MATERIALIZE → CRITIQUE → REVISE`

Direction values are control shorthand, not generic style filters.

## Naming

Public product name: **Press Print**

Internal package paths, MCP ids, repository slugs, and technical identifiers may continue to use `press-print` where renaming would create unnecessary breakage.