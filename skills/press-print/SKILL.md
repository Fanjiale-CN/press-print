---
name: press-print
description: >-
  Transform a user-supplied photograph into a Press-Print image without adding new typography: a source-aware
  contemporary editorial print reconstruction using selective photography, halftone or duotone treatment,
  flat graphic fields, controlled collage, modernist hierarchy, and print texture. Use when the user asks for
  Press-Print, editorial print reconstruction, halftone collage, print-modernist image transformation, or wants
  a photo rebuilt into a bold non-photographic printed composition. Preserve semantic identity, source-defining
  structural anchors, and source text when it materially contributes to scene identity. Never invent replacement
  text, filler copy, headlines, labels, captions, pseudo-text, or decorative typography. Image-only v1.0.1.
---

# Press-Print

Press-Print is a source-aware visual reconstruction system for transforming photographs into contemporary print-driven compositions.

Its governing principle is:

> Preserve semantic identity, not visual completeness.

Treat the source photograph as evidence and raw material, not as a finished composition that merely needs a filter.

A second governing rule applies whenever text is visible in the source:

> Source text is content. New typography is generation.

Existing source text may be selectively retained when it contributes to scene identity. Newly invented typography is outside the Press-Print v1.0.1 system.

## OpenAI host behavior

This packaged copy preserves the Press-Print v1.0.1 reconstruction behavior while defining how the workflow should operate in ChatGPT and Codex.

- Expect a user-supplied source image.
- If the user asks for Press-Print without supplying an image, ask them to upload or attach one rather than inventing a source.
- When an image-generation or image-editing capability is available, use it to produce the transformed image rather than returning only a prose prompt.
- Preserve the source aspect ratio unless the user explicitly requests another.
- Before invoking image generation/editing, inspect visible source text and carry forward the source-text policy below.
- Add no newly invented text, pseudo-text, captions, labels, metadata, standalone letters, or decorative typography.
- Treat lettering already visible in the source as image content, not as permission to invent more typography.
- If exact source text cannot be preserved reliably, crop, obscure, simplify, or retain it as photographic texture rather than generating an approximate replacement.
- If the layout needs a graphic mass where typography might normally appear, use source-derived shape, flat field, halftone region, texture, crop, or negative space instead.
- Do not expose private chain-of-thought or hidden source analysis. Perform structural analysis internally and return the final result or a concise user-facing explanation when generation cannot proceed.

### Scope boundary for explicit invocation

Explicitly invoking Press-Print does not override the v1.0.1 product boundary.

If the user asks primarily for any of the following:

- a typography-heavy poster
- an event, exhibition, campaign, or promotional poster
- a layout centered on a headline, date, body copy, captions, or editorial text
- a general graphic-design composition where typography is a primary design system
- a new poster designed from scratch rather than a reconstruction of the supplied photograph

do not silently turn Press-Print into a general poster-design tool.

If a source photograph is present, explain briefly that Press-Print can reconstruct the photograph as an image-only print-driven composition while adding no new typography.

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

When Press-Print is explicitly invoked for an out-of-scope typography-led task, do not ignore the mismatch and proceed anyway. If a source photograph is present, offer the supported alternative: reconstruct the photograph while adding no new typography.

## Source text policy

Before generating, inspect the source for visible text and classify it by role.

### A. Incidental text

Examples include distant advertising, tiny labels, background copy, or text that is not important to scene identity.

It may be cropped, obscured, simplified, reduced into texture, or left partially unreadable inside a retained photographic fragment. Exact preservation is not required.

### B. Scene-identifying text

Examples include station signage, road signs, storefront names, directional labels, entrance signs, or location markers that help identify the scene.

Prefer to retain this text as part of source imagery when feasible.

Do not translate, rewrite, duplicate, enlarge, or promote it into a new design element.

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

- contemporary editorial print sensibility without generated typography
- bold asymmetry
- strong cropping
- limited color families
- halftone and duotone contrast
- matte printed texture
- controlled collage
- flat color fields
- tactile cut or torn edges
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

Halftone is a selective structural tool, not a blanket effect.

Use it to flatten selected photographic regions, separate layers, convert realism into printed information, and create contrast against clean flat zones.

Never coat the entire image in the same dot pattern or density.

## Collage

Collage must behave as editorial structure.

Every fragment must have a compositional job.

Avoid scrapbook layouts, random stickers, decorative fragments with no structural purpose, excessive torn edges, and mood-board aesthetics.

## Detail hierarchy

**Primary zones** may retain the clearest recognition and strongest contrast.

**Secondary zones** should be grouped, simplified, or partially abstracted.

**Tertiary zones** may be flattened, cropped, converted to texture, or removed.

Do not distribute attention evenly.

## Lighting and space

Replace ordinary photographic realism with graphic tonal organization.

Prefer silhouette, tonal blocks, print density, flat light-dark separation, selective highlights, compressed depth, and layered planes.

The image should function first as a designed surface and second as a record of physical space.

## Hard constraints

- No newly invented text or typography.
- No pseudo-text, filler copy, decorative letters, labels, captions, dates, slogans, metadata, or new words/numbers.
- Preserve source text selectively when it materially contributes to scene identity.
- Never translate, rewrite, duplicate, enlarge, restyle, or promote source text into a new headline or editorial element.
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
- a composition containing newly invented headlines, captions, labels, filler copy, pseudo-text, or decorative typography
- source text rewritten, translated, duplicated, enlarged into a headline, or replaced with hallucinated approximations

## Success test

A successful Press-Print result should feel as though a designer disassembled the photograph, retained its most meaningful visual identity, then rebuilt it into a publishable contemporary print-driven image.

The viewer should recognize what the image is about while clearly seeing that the original photograph no longer remains visually complete.

Important source text should either remain faithfully embedded in source imagery or be deliberately reduced/obscured rather than regenerated incorrectly.

For the full generation prompt, read `references/press-print-v1.md`.
For evaluation, read `references/quality-rubric.md`.
