# OpenAI Review Test Cases

These cases cover Press-Print v1.0.1, including the source-text policy introduced after the initial v1.0.0 public release.

Press-Print requires no account, authentication, demo credentials, or private fixture data.

For positive tests, attach any non-sensitive photograph matching the requested source category. Unless the prompt requests a different crop, the expected output keeps the source aspect ratio.

## Positive test cases

### P1 — Direct English invocation

**User prompt**

`Transform this photograph with Press-Print. Do not add new text or typography.`

**Fixture**

Attach a non-sensitive city, transport, or public-space photograph.

**Expected behavior**

Press-Print should activate, identify source-defining anchors, disassemble and recompose the photograph, and use selective photographic, printed, graphic, and/or collaged states rather than a single whole-image filter.

If the source contains text, existing source text may be retained selectively when it contributes to scene identity, but no new headline, caption, filler copy, label, pseudo-text, or decorative typography should be created.

### P2 — Chinese invocation with source signage

**User prompt**

`用 Press-Print 重构这张照片，保留最重要的结构特征，不要新增文字。`

**Fixture**

Attach a non-sensitive metro, railway, street, storefront, or public-space photograph containing visible signage.

**Expected behavior**

The workflow should run in Chinese. Scene-identifying or identity-critical source text may remain as source imagery when feasible.

The model should not translate, rewrite, duplicate, materially respell, enlarge, or promote source signage into new typography.

If exact source text cannot be preserved reliably, it should be cropped, obscured, simplified, or reduced into texture rather than hallucinated.

### P3 — Indirect editorial reconstruction request

**User prompt**

`Turn this photograph into a bold contemporary print reconstruction while preserving its defining structure. Add no new typography.`

**Fixture**

Attach a non-sensitive photograph.

**Expected behavior**

Press-Print may be selected from its description even when the product name is not used. The workflow should preserve semantic identity and reconstruct the camera composition rather than applying a generic retro or halftone filter.

The word "editorial" or "print" must not trigger invented headlines, columns of filler copy, captions, metadata, or pseudo-text.

### P4 — Portrait source

**User prompt**

`Reconstruct this portrait with Press-Print. Preserve source text only if it already exists; add no new typography.`

**Fixture**

Attach a non-sensitive portrait photograph the reviewer has permission to use.

**Expected behavior**

Press-Print should preserve defining facial/pose identity while reorganizing the portrait through selective crop, scale, graphic fields, print texture, and controlled collage.

Clothing text, signs, or other existing source wording may remain selectively, but no new typography should be introduced.

### P5 — Architecture or landscape source

**User prompt**

`Use Press-Print on this architecture or landscape photo and preserve its main structural anchors. Add no new text.`

**Fixture**

Attach a non-sensitive architecture, streetscape, or landscape photograph.

**Expected behavior**

Press-Print should identify source-derived geometry such as rooflines, roads, windows, skyline, coastline, or terrain and use those structures to drive graphic intervention.

The result should remain identifiable, avoid arbitrary decorative geometry, and use selective halftone/duotone/graphic/collage treatment without generated typography.

## Negative test cases

### N1 — Faithful restoration

**User prompt**

`Restore this old photograph naturally and faithfully.`

**Expected behavior**

Press-Print should not be selected because faithful restoration is outside its reconstruction workflow.

**Safe fallback**

Use the host's normal photo restoration or enhancement behavior instead.

### N2 — Watercolor conversion

**User prompt**

`Turn this image into a watercolor painting.`

**Expected behavior**

Press-Print should not be selected.

**Safe fallback**

Use a watercolor or painterly image transformation workflow.

### N3 — Typography-led poster design

**User prompt**

`Design a typography-heavy exhibition poster with a large headline, date, and editorial copy.`

**Expected behavior**

Press-Print should not be selected automatically for this request.

If Press-Print is explicitly invoked and a source photograph is attached, it may offer to reconstruct the photograph while adding no new typography. It must not silently become a general-purpose poster or typesetting system.

## Regression checks for v1.0.1

A generated result must be rejected or regenerated if any of the following occurs:

- new readable text appears that did not exist in the source
- pseudo-text or filler editorial copy appears
- source text is translated, rewritten, duplicated, materially respelled, or enlarged into a new headline
- identity-critical source text is replaced with hallucinated wording
- empty space is filled with invented caption columns or metadata
- generated typography is used to create visual hierarchy instead of crop, scale, color, texture, geometry, or negative space
