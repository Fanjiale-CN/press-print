# OpenAI Review Test Cases

These cases are written for the first public Skills-only Plugin submission. Press-Print requires no account, authentication, demo credentials, or private fixture data.

For positive tests, attach any non-sensitive photograph matching the requested source category. Unless the prompt requests a different crop, the expected output keeps the source aspect ratio.

## Positive test cases

### P1 — Direct English invocation

**User prompt**

`Use Press-Print to transform this photograph into a contemporary editorial print composition.`

**Fixture**

Attach a non-sensitive city, transport, or public-space photograph.

**Expected skill / workflow behavior**

Press-Print should activate, identify a small number of source-defining structural anchors, disassemble and recompose the photograph, and use selective photographic, printed, graphic, and/or collaged states rather than a single whole-image filter.

**Expected result shape**

A directly generated or edited image that remains recognizably tied to the source while being clearly reconstructed into a print-driven composition. The response should not stop at providing a prompt for another model.

### P2 — Direct Chinese invocation

**User prompt**

`用 Press-Print 重构这张照片，保留最重要的结构特征。`

**Fixture**

Attach a non-sensitive photograph.

**Expected skill / workflow behavior**

The same Press-Print workflow should run in Chinese without requiring the user to restate the method in English.

**Expected result shape**

A directly generated or edited Press-Print image with preserved source identity, strong hierarchy, and non-uniform treatment across the composition.

### P3 — Indirect editorial reconstruction request

**User prompt**

`Turn this photograph into a bold contemporary editorial print reconstruction while preserving its defining structure.`

**Fixture**

Attach a non-sensitive photograph.

**Expected skill / workflow behavior**

Press-Print may be selected from its description even when the product name is not used. The workflow should preserve semantic identity and reconstruct the camera composition rather than applying a generic retro or halftone filter.

**Expected result shape**

A reconstructed image with clear dominant, secondary, and quiet zones and visible treatment diversity.

### P4 — Portrait source

**User prompt**

`Transform this portrait with Press-Print while keeping the subject recognizable.`

**Fixture**

Attach a non-sensitive portrait photograph the reviewer has permission to use.

**Expected skill / workflow behavior**

Press-Print should preserve the subject's defining facial/pose identity while reorganizing the portrait through selective crop, scale, graphic fields, print texture, and controlled collage.

**Expected result shape**

A recognizable portrait reconstructed into a contemporary printed composition, without reducing the entire image to one uniform vector or halftone treatment.

### P5 — Architecture or landscape source

**User prompt**

`Use Press-Print on this architecture or landscape photo and preserve its main structural anchors.`

**Fixture**

Attach a non-sensitive architecture, streetscape, or landscape photograph.

**Expected skill / workflow behavior**

Press-Print should identify source-derived geometry such as rooflines, roads, windows, skyline, coastline, or terrain and use those structures to drive the graphic intervention.

**Expected result shape**

A print-driven reconstruction that keeps the scene identifiable, avoids arbitrary decorative geometry, and uses selective halftone/duotone/graphic/collage treatment.

## Negative test cases

### N1 — Faithful restoration

**User prompt**

`Restore this old photograph naturally and faithfully.`

**Expected behavior**

Press-Print should not be selected because faithful restoration is outside its reconstruction workflow.

**Safe fallback**

Use the host's normal photo restoration or enhancement behavior instead.

**Why Press-Print should not complete it**

The user's goal is to preserve photographic realism rather than rebuild the image into a print-driven composition.

### N2 — Watercolor conversion

**User prompt**

`Turn this image into a watercolor painting.`

**Expected behavior**

Press-Print should not be selected.

**Safe fallback**

Use a watercolor or painterly image transformation workflow.

**Why Press-Print should not complete it**

Watercolor conversion is explicitly outside the Press-Print visual system.

### N3 — Typography-led poster design

**User prompt**

`Design a typography-heavy exhibition poster with a large headline, date, and editorial copy.`

**Expected behavior**

Press-Print should not be selected automatically for this request.

**Safe fallback**

Use a general graphic-design or image-generation workflow appropriate for typography-led poster design.

**Why Press-Print should not complete it**

Press-Print v1.0 is scoped to source-photograph reconstruction and is not a general-purpose typography-led poster system.
