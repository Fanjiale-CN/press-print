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

## State A - Source ready / creation card

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

- **Editorial Print** - editorial hierarchy, print treatment, source-aware reconstruction
- **Flat Graphic** - stronger planar reduction, geometric simplification, reduced material texture
- **Collage** - cut, layer, overlap, fragment, tactile assembly
- **Typography** - explicitly opens text-led controls and authorizes typography behavior according to the selected text mode
- **Restore** - pulls the image toward source fidelity with restrained intervention; this is a Press Print source-preserving mode, not automatic archival photo restoration
- **Custom** - lets the user describe a direction in natural language

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
- any active special-mode fields
- Custom direction text when applicable
- all explicit user locks already present in the conversation
- creation lineage intent: new root or alternative

Generate must not ask the user to re-upload the image.

While generation is being submitted, creation controls are temporarily locked to avoid duplicate conflicting submissions. Do not show fake progress percentages.

## Typography special state

Typography controls remain hidden unless Typography is selected.

First-version text modes:

- **Keep original text** - source text may be preserved selectively; no new copy is invented
- **Replace text** - user supplies exact replacement wording
- **Generate text** - user explicitly authorizes generated copy for the current composition

Rules:
- Keep original text does not need a headline field.
- Replace text reveals an exact-text field and requires a non-empty value.
- Generate text may reveal an optional headline/brief field; it may be empty.
- Replace text and Generate text take precedence over the generic `Preserve source text` advanced control. That advanced control must be disabled or ignored while either mode is active so the UI cannot emit contradictory instructions.
- Generate text is explicit authorization to create copy, but the system should still avoid filler text, unnecessary bilingual duplication, and uncontrolled typographic density.
- Switching away from Typography may preserve the user's draft inside widget state, but inactive Typography fields must not leak into a non-Typography generation request.
- Typography mode does not turn Press Print into a general-purpose layout or publishing application.

## Custom special state

When Custom is selected, reveal one natural-language field:

`Describe the direction…`

Rules:
- Custom requires a non-empty description before Generate.
- Switching away from Custom may preserve the draft inside widget state, but inactive Custom text must not be sent with another direction.
- No additional style parameter matrix appears.

## Advanced controls

A collapsed `More Controls` affordance may exist, but the first release should not depend on it.

Candidates that belong there rather than the main card:
- preserve subject / face
- preserve source colors
- preserve text
- materiality emphasis
- crop/aspect-ratio override
- output format or downstream asset behavior

Do not surface these by default unless the source or explicit user request makes one of them essential.

Explicit conversation-level hard locks always outrank optional advanced toggles. Turning an optional toggle off does not cancel a hard lock the user already stated in language.

## Widget-state persistence

When the ChatGPT host exposes widget-state persistence, the card should use it for interaction continuity.

Persist only compact UI state such as:
- selected Direction
- Structure
- Intensity
- active Typography mode and draft
- Custom draft
- optional preserve toggles
- selected result version
- preferred baseline version

Do not treat widget state as the authoritative store for source pixels, generated image data, full conversation history, or hidden model reasoning.

On re-render, a valid persisted user choice should beat an unchanged default recommendation. A genuinely new result/tool payload may move the result selection to the newly created version.

## State B - Generating

After Generate:

- lock the creation controls temporarily
- show a compact generating/submitted state
- do not replace ChatGPT's own generation progress UI
- avoid fake progress percentages

The widget stores the submitted control state so it can be recovered for later alternatives.

## State C - Result

After a result exists, the interaction emphasis changes from creation controls to decision and refinement.

Primary result actions:

- **Refine**
- **Try Another**
- **Use This**

### Original / Result

When the host exposes usable image references for both the source and result, the result UI may display an Original / Result comparison.

When those references are not available to the widget, do not fabricate, proxy, or invent image URLs. The result image remains in the normal ChatGPT message while the widget provides result actions below it.

The comparison is an enhancement, not a prerequisite for the workflow. The first implementation must not contain fake or unreachable comparison state merely to reserve visual space.

### Refine

Refine is primarily language-driven.

Selecting Refine reveals a compact natural-language input or moves the user naturally back into ChatGPT conversation.

Useful quick suggestions may appear as optional prompts, for example:
- Make it flatter
- Less texture
- More abstract
- Keep more of original

These are shortcuts, not a parameter panel.

A refinement instruction inherits:
- original source association
- selected result as visual revision baseline
- selected direction
- Structure and Intensity
- active special-mode state
- successful crop and hierarchy
- explicit preservation locks

Only requested or diagnosed axes should change.

A successful Refine creates a **child revision**. Its `parentId` is the version being refined. The parent result is never overwritten.

### Try Another

Try Another creates an **alternative from the same original source image**.

This distinction is strict:
- the selected version supplies remembered control values
- the selected version does not become the visual image input
- the original source image remains the visual source
- the previous result is not overwritten
- the new alternative is not a child revision of the seed version

When Try Another opens the creation card, prefill Direction, Structure, Intensity, and the applicable Custom/Typography state from the selected version. The user may change them before Generate.

The temporary `seedVersionId` exists only to explain where the control defaults came from. It is not a revision parent relationship.

### Use This

Use This marks the selected result as the **preferred baseline**.

It means:
- this is the version the user currently prefers
- future refinement may default to it
- the pixel content does not change
- no new image is generated
- no new version is created

Use This should update the local baseline indicator immediately when possible.

## Multi-version state model

Keep version management deliberately lightweight, but distinguish three concepts:

### 1. Selected / active version

The version currently being viewed or acted on inside the result card.

Changing the selected version does not automatically change the preferred baseline.

### 2. Preferred baseline

The version chosen through Use This.

There is at most one preferred baseline at a time.

### 3. Parent version

A lineage relationship used only for Refine-created revisions.

`parentId` must not be used to represent selection, preference, or Try Another control seeding.

### Version kinds

- **root** - generated directly from the original source
- **alternative** - generated from the original source after Try Another; may inherit control defaults from a seed version but has no revision parent because of that seed
- **revision** - generated by refining another result and therefore has `parentId`

### Minimum version metadata

Retain when applicable:
- version id
- public label such as `V1`, `V2`, `V3`
- kind: root / alternative / revision
- parent version id for revisions only
- Direction id
- Structure
- Intensity
- Custom direction when Custom is active
- Typography mode and active text/brief when Typography is active
- short refinement instruction for revisions
- selected/current state
- preferred baseline state

Do not build a layer tree, node graph, or full history timeline.

## State transitions

Canonical first-version transitions:

```text
SOURCE READY
  → Creation Card
  → Generate
  → RESULT (root)

RESULT
  → Refine
  → Generate revision
  → RESULT (child revision)

RESULT
  → Try Another
  → Creation Card (alternative, controls seeded)
  → Generate
  → RESULT (alternative from original source)

RESULT
  → Use This
  → RESULT (same pixels, preferred baseline pointer changes)

RESULT
  → select V1/V2/V3
  → RESULT (view/operation target changes only)
```

## State precedence and conflict rules

When controls appear to conflict, use this order:

1. explicit current user language and hard locks
2. active special-mode semantics such as Typography Replace/Generate
3. current direct UI controls such as Direction, Structure, and Intensity
4. optional advanced toggles
5. system recommendation/default values

Examples:
- A hard lock to preserve a face survives even if `Preserve subject / face` is unchecked later, unless the user explicitly revokes that lock in language.
- Typography Replace text overrides `Preserve source text` for the text being replaced.
- A recommended Editorial Print direction never overrides the user's selected Collage direction.
- Hidden Custom or Typography draft state does not affect generation when another Direction is active.

## First-use comprehension

A new user should be able to understand the card from familiar nouns and controls alone.

Avoid tutorial blocks such as:
- `Step 1`
- `How to use Press Print`
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
