---
name: press-print
description: >-
  Transform a user-supplied photograph into a Press-Print image: a source-aware contemporary editorial print
  reconstruction using selective photography, visible halftone or duotone treatment, strongly flattened graphic
  fields, tactile torn-paper collage, modernist hierarchy, and print texture. Use when the user asks for
  Press-Print, editorial print reconstruction, halftone collage, print-modernist image transformation, or wants
  a photo rebuilt into a bold non-photographic printed composition. Preserve semantic identity, source-defining
  structural anchors, and source text when it materially contributes to scene identity. By default, add zero new
  text. If the user explicitly supplies exact text, add only that exact wording. Never translate source text, create
  bilingual duplicates, or invent replacement text, filler copy, captions, pseudo-text, or typography. v1.0.2.
---

# Press-Print

Press-Print is a source-aware visual reconstruction system for transforming photographs into contemporary print-driven compositions.

Its governing principle is:

> Preserve semantic identity, not visual completeness.

Treat the source photograph as evidence and raw material, not as a finished composition that merely needs a filter.

A second governing rule applies whenever text is visible in the source:

> Source text is content. New typography is generation.

Existing source text may be selectively retained when it contributes to scene identity. Unless the user explicitly supplies exact new wording, generated typography is outside the Press-Print v1.0.2 system.

## OpenAI host behavior

This packaged copy preserves the Press-Print v1.0.2 reconstruction behavior while defining how the workflow should operate in ChatGPT and Codex.

- Expect a user-supplied source image.
- If the user asks for Press-Print without supplying an image, ask them to upload or attach one rather than inventing a source.
- When an image-generation or image-editing capability is available, use it to produce the transformed image rather than returning only a prose prompt.
- Preserve the source aspect ratio unless the user explicitly requests another.
- Before invoking image generation/editing, inspect visible source text and carry forward the source-text policy below.
- By default, add no new text, pseudo-text, captions, labels, metadata, standalone letters, or decorative typography.
- Treat lettering already visible in the source as image content, not as permission to invent more typography.
- If exact source text cannot be preserved reliably, crop, obscure, simplify, or retain it as photographic texture rather than generating an approximate replacement.
- If the layout needs a graphic mass where typography might normally appear, use source-derived shape, flat field, halftone region, texture, crop, or negative space instead.
- If the user explicitly supplies text to add, pass only that exact wording to generation. Do not translate, expand, or supplement it.
- Do not expose private chain-of-thought or hidden source analysis. Perform structural analysis internally and return the final result or a concise user-facing explanation when generation cannot proceed.

### Scope boundary for explicit invocation

Explicitly invoking Press-Print does not override the v1.0.2 product boundary.

If the user asks primarily for any of the following:

- a typography-heavy poster
- an event, exhibition, campaign, or promotional poster
- a layout centered on a headline, date, body copy, captions, or editorial text
- a general graphic-design composition where typography is a primary design system
- a new poster designed from scratch rather than a reconstruction of the supplied photograph

do not silently turn Press-Print into a general poster-design tool.

If a source photograph is present, explain briefly that Press-Print can reconstruct the photograph and, if requested, add only the user's exact wording without generating any other copy.

If no source photograph is present, ask for one.

Do not generate a generic typography-led poster as a substitute for an out-of-scope Press-Print request.

For the full image-generation prompt, consult `references/press-print-v1.md` when detailed reconstruction guidance is useful.
For formal output evaluation, consult `references/quality-rubric.md`.

## Use this skill when

Use Press-Print when the user wants a supplied image transformed into a bold, graphic, layered, printed composition with a clearly non-photographic result.

Typical source categories include:

- cities and streets
- architecture
- transport and infrastructure
- landscape
- public interiors
- retail environments
- people and performance
- objects and cultural artifacts

## Do not use this skill when

Do not use Press-Print when the user's primary goal is:

- photorealistic enhancement
- faithful restoration
- subtle color grading
- watercolor or painterly conversion
- generic vector illustration
- typography-led poster design
- event, exhibition, campaign, or promotional poster design
- headline/date/body-copy driven editorial layout
- general graphic design from scratch
- historical or antique imitation

When Press-Print is explicitly invoked for an out-of-scope typography-led task, do not ignore the mismatch and proceed anyway. If a source photograph is present, offer the supported alternative: reconstruct the photograph and, if requested, add only the user's exact wording without generating any other copy.

## Source text policy

Before generating, inspect the source for visible text and classify it by role.

### Default rule

If the user does not explicitly request added text, do not add any text that is not already present in the source image.

If the source contains no detectable text and the user does not explicitly request text, the output must contain zero text.

If the source contains text and the user does not explicitly request new text, only source-derived text may appear. It may be retained, cropped, obscured, fragmented, reduced, or partially suppressed. Do not introduce new words, letters, numbers, captions, labels, slogans, filler copy, editorial side notes, metadata, or pseudo-text.

### A. Incidental text

Examples include distant advertising, tiny labels, background copy, or text that is not important to scene identity.

It may be cropped, obscured, simplified, reduced into texture, or left partially unreadable inside a retained photographic fragment. Exact preservation is not required.

### B. Scene-identifying text

Examples include station signage, road signs, storefront names, directional labels, entrance signs, or location markers that help identify the scene.

Prefer to retain this text as part of source imagery when feasible.

Do not translate, rewrite, duplicate, enlarge, promote it into a new design element, or add a second-language equivalent.

### C. Identity-critical text

Examples include a primary station name, brand name, book title, artwork title, major wayfinding label, or other wording whose exact identity materially matters.

Preserve its original language, wording, spelling, and semantic role whenever feasible.

Treat it as protected image content, not editable typography.

### D. Text-dominant source

Examples include posters, menus, magazine covers, packaging fronts, book covers, or signage where typography occupies a large part of the source.

Press-Print may crop, partially obscure, layer, or retain the original text as source imagery, but must not redesign the source into a new typography system.

Do not newly typeset, translate, rewrite, duplicate, invent, or relocate source text as a fresh headline, caption, label, or body-copy system.

### Text preservation fallback

If exact source text cannot be preserved reliably, crop, obscure, simplify, or retain it as photographic texture rather than inventing approximate replacement text.

Never replace uncertain source text with guessed wording, misspelled reconstructions, pseudo-text, or invented translations.

Do not interpret the word "editorial" as permission to add editorial typography. Press-Print editoriality comes from composition, cropping, hierarchy, image-state contrast, texture, and print treatment.

### Language rule

Preserve source text in its original language. Do not translate it, create bilingual duplication, or add a parallel second-language version. Monolingual source text stays monolingual. Existing bilingual content may remain bilingual only in source-derived form; do not expand, regularize, relocate, or redesign it.

### High text-density scenes

For dense commercial streets, rail stations, convenience stores, supermarkets, signage walls, and other text-rich environments, preserve typographic density rather than typographic completeness. Keep only a small number of identity-bearing source texts clearly readable. Reduce most other source text into cropped fragments, partial signage, halftone, texture, or obscured visual material. Dense source text never grants permission to generate more text.

### Text footprint

Unless the user explicitly requests larger treatment of the exact text they supplied, total clearly readable text should usually occupy no more than about 15% of the final image area, and any single readable block should usually occupy no more than about 8%. Source text should not become dominant unless the source materially requires it and the user wants that outcome.

### User-requested text exception

If the user explicitly requests added text, render only the exact wording supplied. Add no translations, subtitles, labels, dates, captions, decorative letters, or other copy. Do not translate or make it bilingual unless the user explicitly requests that exact form. If placement, size, or hierarchy is unspecified, keep it visually controlled within the footprint guidance.

Example: if the user requests `地铁`, add only `地铁`, not `Metro`, `Subway`, `地铁 / Metro`, `Urban Metro`, or `地铁系统`.

This exception does not permit unrelated copy or turn Press-Print into a from-scratch typography generator.

## Core procedure

Before generating, analyze the source silently and perform these five operations.

### 1. Identify structural anchors

Identify 1 to 3 source-defining structures that make the scene recognizable.

Examples:

- coastline curve
- distinctive tower silhouette
- crossing pattern
- roofline
- window grid
- railway direction
- tree canopy
- figure pose
- row of lanterns
- shelf rhythm
- identity-critical source signage

Preserve these clearly enough to retain the source identity.

Do not confuse transformation with destruction of the source's most distinctive geometry or identity-bearing text.

### 2. Disassemble

Break the source into meaningful visual components rather than processing it as one intact image.

Possible components include:

- main subject
- background structure
- skyline
- architecture
- people
- vegetation
- water
- roads
- windows
- source signage
- repeated patterns
- light and shadow masses

Complex images will usually support 3 to 7 components. Simpler sources may use fewer. Do not force fragmentation without compositional purpose.

### 3. Recompose

Rebuild the components into a new hierarchy.

Possible operations:

- aggressive crop
- scale shift
- partial isolation
- overlap
- displacement
- interrupted continuity
- selective repetition
- compressed depth
- enlarged structural fragment
- quiet negative-space field

The original camera composition must not remain fully intact.

Do not turn retained source text into a new headline or typographic focal point merely to make the composition feel designed.

### 4. Reassign visual states

Assign different parts of the image to different visual states.

**PHOTOGRAPHIC**  
Retain limited recognizable detail where it is valuable, especially when exact source text or identity-bearing detail needs protection.

**PRINTED**  
Convert selected regions into halftone, duotone, high-contrast, or offset-print-like treatment.

**GRAPHIC**  
Convert selected regions into flat fields, silhouettes, simplified geometry, or abstracted structural forms.

**COLLAGED**  
Use cut, layered, torn, shifted, or interrupted fragments when they strengthen hierarchy.

Do not apply one uniform treatment to the whole image.

### 5. Reduce and hierarchize

Remove, flatten, group, or silence secondary information.

The final image should have:

- dominant zones
- secondary zones
- quiet zones

Do not preserve every object, every surface, every edge, or every tonal transition.

## Source-derived graphics rule

Graphic intervention should emerge from structures already present in the source whenever possible.

Derive shapes from:

- architecture
- coastlines
- roads
- windows
- shadows
- vegetation
- railings
- signs
- repeated structures
- clothing or figure silhouettes

Do not invent arbitrary circles, suns, triangles, stripes, or decorative blocks merely to make the image feel designed.

## Visual language

Aim for:

- contemporary editorial print sensibility without unrequested typography
- an extremely flat arrangement of shapes on a 2D surface
- strongly compressed space with little to no perspective
- interlocking foreground, middle-ground, and background planes
- minimal volumetric modeling and no realistic cast shadows
- bold asymmetry
- strong cropping
- limited color families
- halftone and duotone contrast
- matte printed texture
- controlled collage
- flat color fields
- clearly visible, intentionally varied halftone regions
- tactile torn-paper edges and cut-paper overlaps
- rough-edged interruptions and visible paper-layer transitions
- high-contrast hierarchy
- compressed or interrupted depth
- active negative space
- modern rather than nostalgic visual energy

## Color

Use roughly 3 to 6 major color families.

Prefer a system containing:

- one structural dark
- one light paper-like base
- one or two strong accents
- one supporting hue if needed

Useful families include deep navy, cobalt, off-white, charcoal, black, vermilion, orange-red, muted turquoise, mustard, muted green, and coral.

Reduce the source's photographic color complexity substantially.

## Halftone

Halftone must be clearly perceptible and intentional. It is a selective structural tool, not a blanket effect or faint cosmetic noise.

Use it to flatten selected photographic regions, separate layers, convert realism into printed information, and create contrast against clean flat zones.

Never coat the entire image in the same dot pattern or density.
Vary dot scale, density, direction, and placement deliberately. Contrast printed regions with clean flat zones.

## Collage

Collage must have a stronger tactile torn-paper character while behaving as editorial structure.

Every fragment must have a compositional job.

Avoid scrapbook layouts, random stickers, decorative fragments with no structural purpose, clean corporate rectangles used as generic layout blocks, and mood-board aesthetics.

Favor visible torn edges, cut-paper overlaps, rough-edged interruptions, pasted-fragment logic, and deliberate paper-layer transitions. Every tear and fragment must support hierarchy, source structure, or spatial compression.

## Detail hierarchy

**Primary zones** may retain the clearest recognition and strongest contrast.

**Secondary zones** should be grouped, simplified, or partially abstracted.

**Tertiary zones** may be flattened, cropped, converted to texture, or removed.

Do not distribute attention evenly.

## Lighting and space

Treat the entire image as a designed 2D surface. Flatten foreground, middle ground, and background into interlocking planes, silhouettes, fragments, halftone regions, and cut-paper structures.

Replace ordinary photographic realism with graphic tonal organization. Prefer front-facing, near-flat, or simplified top-down viewpoints.

Prefer silhouette, tonal blocks, print density, flat light-dark separation, selective highlights, compressed depth, and layered planes.

Avoid strong realistic perspective, deep spatial recession, cinematic depth, volumetric modeling, soft atmospheric depth, realistic lighting, and realistic cast shadows.

The image should function first as a designed surface and second as a record of physical space.

## Hard constraints

- If the user does not explicitly request added text, generate no new text or typography.
- No pseudo-text, filler copy, decorative letters, labels, captions, dates, slogans, metadata, or new words/numbers.
- Preserve source text selectively when it materially contributes to scene identity.
- Never translate, rewrite, duplicate, enlarge, restyle, add a second-language equivalent to, or promote source text into a new headline or editorial element.
- Preserve monolingual source text as monolingual; existing bilingual content may remain only in source-derived form.
- If the user explicitly requests text, render only the exact requested wording and nothing else.
- Keep readable text within the 15% total / 8% per-block guidance unless the user explicitly requests larger treatment of their exact supplied text.
- If source text cannot be reproduced reliably, obscure or crop it rather than hallucinating a replacement.
- Preserve the original aspect ratio unless the user requests another.
- Do not leave the source photograph intact.
- Do not reduce the whole image to one uniform vector treatment.
- Do not use blanket halftone.
- Do not fake antique paper, sepia history, or nostalgia for its own sake.
- Do not introduce arbitrary decorative geometry without a source-derived reason.
- Do not destroy source-defining structural anchors.

## Failure test

The transformation has failed if it looks like:

- the original photograph plus a print filter
- generic retro poster art
- a clean corporate vector illustration
- a scrapbook collage
- a muddy all-over halftone
- a composition whose key source identity has been lost
- an AI poster dominated by arbitrary circles, suns, stripes, or decorative blocks
- a composition containing unrequested headlines, captions, labels, filler copy, pseudo-text, or decorative typography
- source text rewritten, translated, duplicated, enlarged into a headline, or replaced with hallucinated approximations
- a monolingual source made bilingual or given a translated parallel version
- user-requested text altered, expanded, translated, or accompanied by additional copy
- readable text exceeding the controlled footprint without source necessity or an explicit request to enlarge the user's exact supplied text

## Success test

A successful Press-Print result should feel as though a designer disassembled the photograph, retained its most meaningful visual identity, then rebuilt it into a publishable contemporary print-driven image.

The viewer should recognize what the image is about while clearly seeing that the original photograph no longer remains visually complete.

Important source text should either remain faithfully embedded in source imagery or be deliberately reduced/obscured rather than regenerated incorrectly.

Before invoking image generation, apply this final check: if the user did not explicitly request added text, allow no new text anywhere—no headlines, captions, labels, letters, words, numbers, pseudo-text, translations, or bilingual duplicates. Empty areas must remain shape, color, texture, source-derived imagery, or negative space. If the user did request text, send only the exact requested wording.

For the full generation prompt, read `references/press-print-v1.md`.
For evaluation, read `references/quality-rubric.md`.
