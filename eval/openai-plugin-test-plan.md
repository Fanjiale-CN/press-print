# Press-Print OpenAI Plugin Test Plan

This test plan covers the first installed-plugin validation pass for the Skills-only OpenAI Plugin package.

## Goal

Verify that Press-Print can be discovered through a repo marketplace, installed in a supported ChatGPT desktop surface, invoked directly or indirectly, and used with a supplied image without drifting from the frozen v1.0 behavior.

## Marketplace setup

The repository exposes a development marketplace at:

`.agents/plugins/marketplace.json`

Add it with the Codex CLI:

```bash
codex plugin marketplace add Fanjiale-CN/press-print --ref main
codex plugin marketplace list
```

The marketplace should appear as `Press-Print Development` and expose the `press-print` plugin.

After adding the marketplace, restart the ChatGPT desktop app before installing or testing the plugin.

## Test rules

Run each test in a new conversation unless the case is explicitly a follow-up test. Keep the same source image when comparing outputs across revisions. Record whether the plugin activated, whether image generation/editing actually ran, and whether the result satisfies the v1.0 quality rubric.

## Positive tests

### P1 — Direct English invocation

Input:

`@Press-Print Transform this photograph using Press-Print.`

Attach a source photograph.

Expected:
- Press-Print activates.
- The supplied image is treated as source material.
- The host generates or edits an image when image generation/editing is available.
- The response does not stop at providing a prompt for another model.

### P2 — Direct Chinese invocation

Input:

`@Press-Print 用 Press-Print 重构这张照片。`

Attach a source photograph.

Expected: same functional behavior as P1.

### P3 — Indirect invocation

Input:

`Turn this photograph into a bold contemporary editorial print reconstruction while preserving its defining structure.`

Attach a source photograph.

Expected:
- Press-Print may activate based on the skill description even when the product name is not used.
- The result follows source-aware reconstruction rather than a generic poster filter.

### P4 — Missing required image

Input:

`@Press-Print Transform this.`

Do not attach an image.

Expected:
- Press-Print asks for a source image.
- It does not invent a source scene or generate an unrelated image.

### P5 — Follow-up refinement

After a successful P1 or P2 result, input:

`Make the reconstruction more aggressive while preserving the main structural anchors.`

Expected:
- The follow-up remains inside Press-Print logic.
- Structural anchors remain recognizable.
- The result becomes more reconstructed without turning into arbitrary decoration.

## Negative tests

### N1 — Restoration

Input:

`Restore this old photograph naturally and faithfully.`

Expected: Press-Print should not be selected as the appropriate workflow.

### N2 — Watercolor conversion

Input:

`Turn this image into a watercolor painting.`

Expected: Press-Print should not be selected as the appropriate workflow.

### N3 — Typography-led poster

Input:

`Design a typography-heavy poster with a large headline and date.`

Expected: Press-Print v1.0 should not be selected because generated typography is intentionally excluded.

## Visual quality checks

For successful image transformations, evaluate against `quality-rubric.md` and reject or regenerate if any hard failure appears.

Check specifically that:

- semantic identity remains recognizable
- 1 to 3 structural anchors survive
- the original camera composition is visibly reconstructed
- photographic, printed, graphic, and collaged states are selective rather than uniform
- halftone is not applied across the entire image
- arbitrary circles, suns, triangles, stripes, or blocks do not dominate
- no new text is invented
- the original aspect ratio is preserved unless explicitly changed
- the result is not merely the source photograph plus a print filter

## Host-capability distinction

If the Skill activates correctly but the current ChatGPT surface does not provide image generation/editing to the installed plugin, record that as a host-capability limitation rather than a Press-Print reconstruction failure.

If image generation/editing is available but Press-Print only returns a prompt instead of executing the transformation, record that as a Skill behavior failure.

## Result record

For each case, record:

- test ID
- date
- ChatGPT surface
- model/configuration
- plugin activation: yes/no
- image tool execution: yes/no/not available
- rubric score when applicable
- observed failure mode
- notes
