# Press-Print v1.0.2 Quality Rubric

Use this rubric to evaluate generated Press-Print results consistently across models and source categories.

## Scoring

Score out of 100.

### 1. Semantic Retention — 25 points

Does the result still clearly communicate what the source image is about?

- 22–25: unmistakably retains the scene's identity, defining anchors, and identity-bearing source text where relevant
- 17–21: mostly recognizable, with minor structural or text loss
- 10–16: genericized, partially confused, or important source text handled poorly
- 0–9: source identity substantially lost

### 2. Reconstruction Strength — 25 points

Has the photograph genuinely been rebuilt rather than filtered?

- 22–25: clear disassembly, recomposition, reduction, and state reassignment
- 17–21: meaningful reconstruction but some original composition remains too intact
- 10–16: mostly stylization with limited structural intervention
- 0–9: filter-only transformation

### 3. Visual Hierarchy — 20 points

Does the image have clear dominant, secondary, and quiet zones without relying on newly generated typography?

- 18–20: strong hierarchy, rhythm, and controlled negative space; repeated elements have intentionally differentiated roles; large quiet fields clearly contribute to composition
- 14–17: readable hierarchy with minor crowding, imbalance, weak grouping, or underused quiet space
- 8–13: too even, too dense, compositionally indecisive, or dependent on source hierarchy that was not strong enough for the reconstruction
- 0–7: no meaningful hierarchy; repeated subjects remain equal competitors, or large low-information fields are passively ignored or arbitrarily filled

#### Hierarchy stabilization checks

When the source hierarchy is diffuse, repetitive, sparse, or ambiguous, evaluate whether Press-Print actively formed a stronger hierarchy rather than inheriting the weakness.

For repeated or highly similar subjects:
- one dominant anchor or dominant cluster should usually emerge,
- a small number of supporting anchors or clusters may remain,
- the remaining repetition should read as rhythm, field, mass, texture, or context rather than a set of equally weighted subjects,
- the group identity of the source should remain recognizable.

For substantial low-information fields:
- the field should have an intentional compositional role such as separation, pause, directional room, scale buffer, atmospheric release, semantic isolation, continuation, framing, or graphic mass,
- meaningful quiet space should not be filled merely to make the image look busier,
- genuinely redundant empty space may be cropped, compressed, or reduced,
- invented objects or scenery must not be introduced solely to occupy blank space.

Do not score by rigid object-count or blank-area thresholds. Judge whether the source hierarchy needed intervention and whether the result resolved it.

### 4. Treatment Diversity — 15 points

Are photographic, printed, graphic, and collaged states used selectively rather than uniformly?

- 13–15: clear, purposeful contrast between states
- 10–12: some differentiation, but limited or repetitive
- 6–9: mostly one treatment with minor variation
- 0–5: blanket halftone, blanket vectorization, or uniform filter

### 5. Restraint and Source Discipline — 15 points

Do graphic interventions grow from the source rather than from generic poster habits, and is source text handled faithfully?

- 13–15: source-derived, controlled, mature, purposeful; important source text is faithfully retained or deliberately reduced
- 10–12: mostly disciplined with minor decorative excess or minor text-handling weakness
- 6–9: visible template habits, arbitrary geometry, questionable source-text reconstruction, or invented filler content in quiet regions
- 0–5: generic poster tropes dominate, new typography is invented, source text is materially hallucinated, or substantial new visual content is added without structural or semantic cause

## Interpretation

- **90–100**: exemplary Press-Print
- **80–89**: strong and publishable
- **70–79**: directionally correct but needs refinement
- **60–69**: style cues present, system not fully understood
- **Below 60**: failed Press-Print transformation

## Source text evaluation

When source text is visible, evaluate it by role:

- **Incidental text** may be cropped, obscured, simplified, or reduced into texture.
- **Scene-identifying text** should preferably remain embedded in source imagery when feasible.
- **Identity-critical text** should retain original language, wording, spelling, and semantic role whenever feasible.
- **Text-dominant sources** may retain or crop original typography, but must not be redesigned into a new typography system.

If exact source text cannot be preserved reliably, obscuring or cropping it is preferable to inventing an approximation.

For high text-density scenes, preserve typographic density rather than typographic completeness. Keep only a small number of identity-bearing source texts clearly readable and reduce most other text into source-derived fragments, halftone, texture, or occlusion.

Unless the user explicitly requests larger treatment of the exact text they supplied, total clearly readable text should usually occupy no more than about 15% of the image area, and any single readable block should usually occupy no more than about 8%.

Source text must remain in its original language. Monolingual source text must not be translated or given a parallel bilingual version. Existing bilingual content may remain only in source-derived form.

If the user explicitly supplies text to add, only that exact wording may appear. No translation, bilingual variant, subtitle, caption, label, or additional copy may be generated unless explicitly requested.

## Hard failures

Any of the following should trigger rejection or regeneration even if the numeric score is otherwise acceptable:

- unrequested readable text
- pseudo-text, filler copy, decorative letters, captions, labels, dates, slogans, or editorial body copy
- source text translated, rewritten, duplicated, materially respelled, or enlarged into a new headline
- monolingual source text converted into a bilingual layout or given a second-language equivalent
- user-requested text altered, expanded, translated, or accompanied by additional copy
- readable text exceeding the controlled footprint without source necessity or an explicit request to enlarge the user's exact supplied text
- identity-critical source text replaced with hallucinated or approximate wording
- generated typography used to create hierarchy that should have been achieved through composition, crop, scale, color, texture, or negative space
- filter-only transformation
- source identity is no longer recognizable
- blanket halftone across nearly the entire image
- halftone reduced to faint cosmetic noise rather than used as visible structural contrast
- arbitrary circles, suns, triangles, stripes, or blocks dominate without source justification
- generic nostalgic poster aesthetic replaces contemporary print logic
- random scrapbook or sticker collage
- collage reduced to clean corporate rectangles with no tactile paper-layer logic
- all major regions receive the same visual treatment
- source-defining geometry is destroyed without a compelling compositional reason
- many similar subjects remain equally detailed and equally salient when the source needed a stronger hierarchy
- a repeated group is destroyed merely to manufacture a hero subject when the group relation is identity-bearing
- a substantial low-information field is left compositionally passive when it materially shapes the frame
- a meaningful quiet field is filled with invented objects, clouds, scenery, symbols, or decoration merely because it is empty
- rigid percentage or object-count heuristics override the actual visual and semantic structure of the source

## Model-comparison protocol

When comparing multiple image models:

1. Use the same source image.
2. Use the same Press-Print prompt version.
3. Keep aspect ratio and generation intent constant.
4. Score each output independently before comparing them side by side.
5. For sources containing text, record whether the model retained, obscured, hallucinated, translated, duplicated, or promoted source text.
6. Record recurring model-specific failure patterns.
7. Include stress cases with repeated similar subjects and substantial low-information fields when evaluating hierarchy changes.
8. Do not change the prompt after every isolated bad generation. Revise only when a failure pattern repeats across multiple source categories.
