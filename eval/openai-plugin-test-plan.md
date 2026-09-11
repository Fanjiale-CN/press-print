# Press Print OpenAI Plugin Test Plan — 2.0

This plan validates the UI-independent Skills-only Press Print 2.0 package.

## Goal

Verify that Press Print can be discovered and invoked with a supplied image, performs source-aware art direction and reconstruction, preserves semantic identity, keeps revision continuity, and follows the 2.0 research-derived decision system without relying on MCP widgets or a custom ChatGPT host UI.

## Marketplace setup

The repository exposes a development marketplace at:

`.agents/plugins/marketplace.json`

Example local setup:

```bash
codex plugin marketplace add Fanjiale-CN/press-print --ref main
codex plugin marketplace list
```

The marketplace should expose the `press-print` plugin.

## Test rules

Run each primary test in a new conversation unless the case is explicitly a follow-up. Use representative source images across multiple categories. For revisions, retain the same conversation and source lineage.

Record:
- whether the Skill activated,
- whether host image generation/editing actually ran,
- whether semantic identity survived,
- whether reconstruction was visibly compositional,
- whether materiality was causally justified,
- whether the result retained Press Print identity.

## Positive tests

### P1 — Vague English invocation

Input:

`@Press Print Process this image.`

Attach a source image.

Expected:
- Press Print activates;
- the source is visually read before treatment;
- the system chooses a source-specific direction autonomously unless real ambiguity exists;
- no custom menu or widget is required;
- the result is reconstructed rather than filtered;
- no new text is added by default.

### P2 — Vague Chinese invocation

Input:

`@Press Print 处理这张图片，不要新增文字。`

Attach a source image.

Expected: same core behavior as P1, with concise Chinese interaction.

### P3 — Explicit strong reconstruction

Input:

`Make this flatter and more graphic. Preserve the main subject and defining structure. No typography.`

Attach a source image.

Expected:
- execute directly without redundant clarification;
- protect explicit locks;
- prioritize crop, isolation, suppression, scale contrast, and planar compression before surface effects;
- produce visible compositional reconstruction.

### P4 — Missing source image

Input:

`@Press Print Process this image.`

Do not attach or otherwise provide an image.

Expected:
- request a source image;
- do not invent an unrelated source scene.

### P5 — Revision continuity

After a successful result, input:

`Keep this crop and the subject treatment. Reduce the tearing and quiet the right side.`

Expected:
- retain successful crop, identity, hierarchy, and locks;
- reduce materiality/fragmentation and right-side competition;
- do not rerandomize the whole composition.

### P6 — Alternative from original

After a successful result, input:

`Try another direction from the original source. Make it quieter and more planar.`

Expected:
- conceptually return to the original source rather than recursively transforming the prior generated result;
- carry forward only useful semantic lessons and explicit locks;
- form a new direction thesis.

### P7 — Dense source signage

Input:

`用 Press Print 重构这张招牌很多的街景。保留场景身份，不要新增、翻译或双语复制文字。`

Expected:
- preserve only identity-bearing source text clearly when feasible;
- allow other source text to become crop, fragment, halftone, texture, or occlusion;
- never invent replacement wording;
- never translate monolingual source text by default.

### P8 — Exact user-supplied wording

Input:

`Reconstruct this with Press Print and add only the exact text “地铁”.`

Expected:
- may add `地铁`;
- no translation, caption, date, label, filler copy, or other generated wording appears unless separately authorized.

## Negative tests

### N1 — Faithful restoration

Input:

`Restore this old photograph naturally and faithfully.`

Expected: Press Print should not be selected automatically for ordinary faithful restoration.

### N2 — Watercolor conversion

Input:

`Turn this image into a watercolor painting.`

Expected: Press Print should not be selected automatically.

### N3 — From-scratch typography-heavy layout

Input:

`Design a typography-heavy exhibition poster from scratch with headline, date, and body copy.`

Expected: Press Print should not be selected automatically because its core identity is source-image art direction and reconstruction rather than general-purpose typesetting.

## Visual quality checks

For successful transformations, evaluate against both:

- `eval/quality-rubric.md`
- `docs/system/PP_REGRESSION_BENCHMARK.md`

Check specifically that:

- semantic identity remains recognizable;
- identity-bearing relations survive;
- hierarchy is stronger or more intentional;
- the source camera composition is visibly reconstructed in the default case;
- planar/editorial character is present;
- halftone and collage are selective rather than mandatory global effects;
- materiality is bounded and structurally justified;
- low-information fields have a functional role;
- generic premium-ad polish and cinematic realism do not take over;
- unrelated sources do not collapse into the same template;
- no unrequested text is invented;
- source text is not translated or bilingual-duplicated by default;
- uncertain source text is obscured rather than hallucinated.

## Host-capability distinction

If the Skill activates correctly but the current host surface does not provide image understanding or image generation/editing to the installed Plugin, record that as a host-capability limitation rather than a Press Print reconstruction failure.

If image generation/editing is available but Press Print stops at describing a prompt instead of performing the requested supported transformation, record that as a Skill behavior failure.

## Result record

For each case, record:

- test ID
- date
- host surface
- model/configuration
- plugin activation: yes/no
- image tool execution: yes/no/not available
- semantic preservation score
- Press Print identity score
- reconstruction strength score
- observed failure taxonomy tags
- notes
