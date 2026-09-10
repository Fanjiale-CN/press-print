# Listing Copy and Starter Prompts — Press-Print 2.0

## Info tab

### Plugin name

`Press-Print`

### Short description

`AI art direction for photo reconstruction`

### Long description

Press-Print turns a user-supplied photograph into a source-aware contemporary print reconstruction while preserving the structures and relationships that make the image recognizable.

Press-Print 2.0 adds an art-direction layer before generation. It reads the source, identifies what should be protected and what may be transformed, and forms a clear reconstruction thesis. When a request is genuinely vague, Press-Print can offer one to three source-specific directions through a compact interactive chooser. When the user already knows what they want, it skips the chooser and executes directly.

After generation, Press-Print treats revisions as continuation rather than a fresh roll. A request such as “keep this crop, make the right side quieter, and reduce the tearing” should preserve the successful decisions from the current result while changing the requested axis.

> **Photography is source material, not sacred material.**
>
> **Reconstruct, do not decorate.**
>
> **Preserve semantic identity, not visual completeness.**

The visual system remains Press-Print: selective cropping, flattened planes, hierarchy, halftone and duotone treatment, graphic reduction, controlled collage, negative space, and tactile print logic. These elements are used as structural tools rather than a uniform filter or mandatory effect stack.

Press-Print adds no new typography by default. Existing source text remains in its original language; monolingual source text is not translated or duplicated into a bilingual layout. When the user explicitly supplies text to add, only that exact wording may appear, with no invented captions, place names, dates, slogans, labels, filler copy, or decorative pseudo-text.

Press-Print is not a general-purpose poster generator, restoration tool, watercolor filter, or generic design canvas.

Typical source categories include:

- cities, streets, architecture, and infrastructure
- landscapes and interiors
- portraits and performance
- objects, food, animals, and cultural artifacts

The internal reasoning flow is:

1. **Read** — identify semantic and visual anchors
2. **Understand** — determine the source's important relationships
3. **Protect** — form a preservation contract
4. **Direct** — decide what to amplify, suppress, crop, flatten, or fragment
5. **Reconstruct** — rebuild the image through the established Press-Print visual language
6. **Critique** — check identity, hierarchy, material coherence, and direction
7. **Revise** — change causes and requested axes without discarding successful decisions

Press-Print does not operate a separate image-generation model. Source-image generation or editing is performed by the compatible host platform when that capability is available. Press-Print 2.0 does use a small publisher-operated MCP service for optional direction and revision controls. The current MCP tool schema does not accept source-image files; it receives structured interaction fields used to render those controls.

### Category

`Creativity`

### Publisher

- Public publisher brand: `Galok`
- Developer: `Fan Jiale`, an individual developer publishing under the Galok brand
- Verified developer identity to select in the portal: `Fan Jiale`

### Version

`2.0.0`

### Public URLs

- Website: `https://www.galok.me/press-print/`
- Support: `https://www.galok.me/press-print/support/`
- Privacy policy: `https://www.galok.me/press-print/privacy/`
- Terms of use: `https://www.galok.me/press-print/terms/`

## Starter prompts

Use these three prompts in the Prompts tab.

1. `Process this photograph with Press-Print. If more than one strong art direction is useful, let me choose. Do not add new text.`
2. `Make this photo flatter and more fragmented with Press-Print. Preserve the main subject and defining structure. Add no typography.`
3. `Reconstruct this portrait with Press-Print. Keep the person's identity and pose recognizable, simplify the background, and add no new text.`

## Prompt intent

The starter prompts deliberately demonstrate two different 2.0 behaviors:

- Prompt 1 is intentionally open enough to demonstrate autonomous visual reading and, when justified, the interactive direction chooser.
- Prompts 2 and 3 are explicit enough that Press-Print should normally execute directly rather than forcing a chooser.

All starter prompts assume that the user attaches a source photograph. Press-Print uses host image generation or editing when that capability is available; it does not operate a separate image-generation model.
