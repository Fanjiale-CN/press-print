# OpenAI Review Test Cases — Press-Print 2.0

These cases cover the Press-Print 2.0 interaction model, source-aware art direction, revision behavior, and the source-text protections carried forward from v1.0.2.

Press-Print requires no account, authentication, demo credentials, or private fixture data.

For positive tests, attach any non-sensitive photograph matching the requested source category. Unless the user requests a different crop or format, preserve the source aspect ratio.

## Core 2.0 interaction tests

### P1 — Vague request should produce source-specific direction choices

**User prompt**

`@Press-Print 处理一下这张。`

**Fixture**

Attach a non-sensitive street, architecture, portrait, transport, or public-space photograph with enough structure to support more than one reasonable reconstruction strategy.

**Expected behavior**

Press-Print should first inspect the actual source image and form a preservation contract internally.

Because the request is genuinely vague, Press-Print may render an inline direction picker with **one to three** source-specific art-direction hypotheses. The choices should describe meaningful structural differences such as:

- stronger planar hierarchy,
- more aggressive but controlled fragmentation,
- quieter negative-space treatment,
- different crop / scale emphasis.

The choices must not be generic style presets or an unrelated list of effects.

Each direction should identify what it intends to preserve. The system should not ask the user to manually diagnose the photograph before offering useful judgment.

After the user selects a direction, Press-Print should proceed to reconstruction without asking the same question again.

### P2 — Explicit request should execute directly

**User prompt**

`Use Press-Print on this image. Make it flatter and more fragmented, preserve the face and current aspect ratio, and add no text.`

**Fixture**

Attach a non-sensitive portrait or street portrait.

**Expected behavior**

The request already supplies a clear direction and hard locks.

Press-Print should **not force the user through the direction picker**. It should analyze the source silently, treat face identity and aspect ratio as preservation locks, form one internal direction hypothesis, and reconstruct directly.

The output should be visibly transformed rather than merely filtered, while the face remains recognizable.

### P3 — Revision should preserve successful decisions instead of rerolling

**Prerequisite**

Generate a Press-Print result first.

**User prompt**

`这一版裁切很好，人物也别动。把右边再压一点，撕裂感收一点。`

**Expected behavior**

Press-Print should treat the existing successful crop and subject treatment as locks for the revision.

The new result should primarily:

- suppress the right side more strongly,
- reduce fragmentation / torn-paper intensity,
- preserve the successful crop,
- preserve subject identity and the existing central art-direction thesis.

It should not silently restart from the original source with an unrelated layout.

### P4 — Surprise me should still remain source-specific

**User prompt**

`@Press-Print 处理这个，Surprise me.`

**Fixture**

Attach a non-sensitive photograph.

**Expected behavior**

Press-Print may skip a chooser and commit to the strongest source-specific direction, or show directions with a usable Surprise me action depending on host behavior.

In either case, “Surprise me” means **choose the strongest Press-Print reconstruction strategy for this actual source**, not randomize the style.

The result must preserve semantic identity and explicit user constraints.

### P5 — Single obvious direction should not manufacture three choices

**User prompt**

`处理一下这张，主要突出这个人和后面巨大建筑之间的尺度差。其他你决定。`

**Expected behavior**

The user has already supplied the central directional thesis. Press-Print should normally execute directly or, at most, expose one clearly useful interpretation if a user decision remains necessary.

It should not invent three artificial choices merely because the UI supports up to three.

## Source-aware reconstruction tests

### P6 — Direct English invocation

**User prompt**

`Transform this photograph with Press-Print. Do not add new text or typography.`

**Fixture**

Attach a non-sensitive city, transport, or public-space photograph.

**Expected behavior**

Press-Print should identify source-defining anchors, disassemble and recompose the photograph, and use selective photographic, printed, graphic, and/or collaged states rather than a single whole-image filter.

If the request remains visually underspecified, a source-specific direction picker is acceptable before generation. If one direction is clearly strongest, Press-Print may execute it directly.

If the source contains text, existing source text may be retained selectively when it contributes to scene identity, but no new headline, caption, filler copy, label, pseudo-text, or decorative typography should be created.

### P7 — Chinese invocation with dense source signage

**User prompt**

`用 Press-Print 重构这张照片，保留最重要的结构特征，不要新增文字。`

**Fixture**

Attach a non-sensitive metro, railway, street, storefront, or public-space photograph containing visible signage.

**Expected behavior**

The workflow should run naturally in Chinese.

Scene-identifying or identity-critical source text may remain as source imagery when feasible. The model should not translate, rewrite, duplicate, materially respell, enlarge, or promote source signage into new typography.

For dense signage, preserve typographic density rather than typographic completeness. Keep only a small number of identity-bearing source texts readable and reduce the rest into fragments, halftone, texture, or occlusion. Do not make monolingual signs bilingual.

If exact source text cannot be preserved reliably, crop, obscure, simplify, or retain it as image texture rather than hallucinating replacement wording.

### P8 — Portrait preservation contract

**User prompt**

`Reconstruct this portrait with Press-Print. Keep the person's identity and pose recognizable. No new typography.`

**Fixture**

Attach a non-sensitive portrait the reviewer has permission to use.

**Expected behavior**

Face identity, head-body relation, and decisive pose should be treated as high-priority invariants. Background detail may be spent more aggressively.

The output may reorganize crop, scale, graphic fields, halftone, and controlled collage without turning the person into an unrelated face or generic illustrated character.

### P9 — Architecture relation preservation

**User prompt**

`Use Press-Print on this architecture photo. Keep the structure recognizable but rebuild the composition.`

**Fixture**

Attach a non-sensitive architecture or streetscape photograph.

**Expected behavior**

Press-Print should protect identity-bearing silhouette, major proportional logic, façade rhythm, and any decisive human-scale relation.

It may compress perspective, suppress repetitive detail, crop aggressively, or create planar fields when those changes support the direction.

The result should not add arbitrary decorative geometry merely to appear designed.

### P10 — Exact user-requested text

**User prompt**

`Use Press-Print to reconstruct this photograph and add only the exact text “地铁”.`

**Fixture**

Attach a non-sensitive photograph.

**Expected behavior**

The result may add `地铁` and no other new text. It must not add `Metro`, `Subway`, `地铁 / Metro`, a subtitle, caption, date, label, pseudo-text, or any parallel translation.

If size and placement are unspecified, the requested text should remain visually controlled rather than taking over the reconstruction.

## Interactive UI tests

### UI1 — Direction picker data quality

When `render_direction_picker` is used, verify:

- 1–3 direction cards are visible,
- each card has a concise title and source-specific summary,
- directions are meaningfully different,
- preservation notes are reflected in the follow-up instruction,
- selecting a card sends the chosen instruction back into the same conversation,
- `Surprise me` is not shown when there is only one direction,
- mobile layout remains usable as a single-column stack.

### UI2 — Result actions are revision actions, not style roulette

After a Press-Print result exists, `render_result_actions` may expose a small set of useful next steps.

Verify that each action changes one clear axis, for example:

- More restrained
- More assertive
- More planar
- More fragmented
- Prepare as sticker asset, only when the host can actually support the requested asset workflow

The follow-up instruction should preserve successful decisions from the current result unless the action explicitly changes them.

### UI3 — Theme adaptation

Verify both widgets remain readable in ChatGPT light and dark modes.

The UI should feel native and compact rather than opening a separate editor for a simple choice.

## Negative routing tests

### N1 — Faithful restoration

**User prompt**

`Restore this old photograph naturally and faithfully.`

**Expected behavior**

Press-Print should not be selected because faithful restoration is outside its reconstruction workflow.

### N2 — Watercolor conversion

**User prompt**

`Turn this image into a watercolor painting.`

**Expected behavior**

Press-Print should not be selected.

### N3 — Typography-led poster from scratch

**User prompt**

`Design a typography-heavy exhibition poster with a large headline, date, and editorial copy.`

**Expected behavior**

Press-Print should not be selected automatically for this request.

If Press-Print is explicitly invoked and a source photograph is attached, it may reconstruct the source and add only exact wording explicitly supplied by the user. It must not silently become a general-purpose typesetting system or invent surrounding copy.

### N4 — Explicit request must not be slowed by unnecessary UI

**User prompt**

`Make this a restrained Press-Print reconstruction, keep the face unchanged, no text.`

**Expected behavior**

Do not render a three-choice direction picker. Execute the clear request.

### N5 — Vague request must not produce generic preset cards

**User prompt**

`处理一下。`

**Expected behavior**

If a direction picker is shown, reject behavior where cards are merely generic labels such as “Retro / Minimal / Cyberpunk” with no source-specific reasoning.

## 2.0 regression failure checks

A result or interaction should be rejected, regenerated, or revised if any of the following occurs:

- the user gives a clear direction but is unnecessarily forced through a chooser,
- vague input produces generic style presets instead of source-specific art direction,
- three choices are manufactured when only one meaningful direction exists,
- a revision discards successful crop, locks, or hierarchy without cause,
- a one-axis refinement causes an unrelated total redesign,
- source semantic identity collapses,
- output is essentially the intact photo plus a print filter,
- torn paper, halftone, or texture appears without a structural reason,
- every image receives nearly the same composition,
- output drifts toward smooth generic AI advertising polish,
- output drifts toward cinematic 3D realism,
- unrequested readable text appears that did not exist in the source,
- pseudo-text or filler editorial copy appears,
- source text is translated, rewritten, duplicated, materially respelled, or enlarged into a new headline,
- monolingual source text receives a translated or bilingual parallel version,
- user-requested exact text is altered, expanded, translated, or accompanied by extra copy,
- identity-critical source text is replaced with hallucinated wording,
- generated typography is used to create hierarchy instead of source-derived image structure.

## Release expectation

Press-Print 2.0 should feel simpler to operate than v1 while demonstrating more visual judgment. The reviewer should be able to experience the product primarily as:

```text
upload image → say what you want → choose only if useful → generate → keep refining
```

The extra intelligence should be visible in the quality of decisions, not in the number of questions or controls shown to the user.
