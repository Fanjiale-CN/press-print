---
name: press-print
description: >-
  Transform a user-supplied photograph into a text-free Press-Print image: a source-aware contemporary
  editorial print reconstruction using selective photography, halftone or duotone treatment, flat graphic
  fields, controlled collage, modernist hierarchy, and print texture. Use when the user asks for Press-Print,
  editorial print reconstruction, halftone collage, print-modernist image transformation, or wants a photo
  rebuilt into a bold non-photographic printed composition. Preserve semantic identity and source-defining
  structural anchors. Avoid fabricated text, arbitrary decorative geometry, blanket halftone, generic vintage
  poster styling, and filter-only transformations. Image-only v1.0.
---

# Press-Print

Press-Print is a source-aware visual reconstruction system for transforming photographs into contemporary print-driven compositions.

Its governing principle is:

> Preserve semantic identity, not visual completeness.

Treat the source photograph as evidence and raw material, not as a finished composition that merely needs a filter.

## OpenAI host behavior

This packaged copy preserves the frozen Press-Print v1.0 reconstruction behavior while defining how the workflow should operate in ChatGPT and Codex.

- Expect a user-supplied source image.
- If the user asks for Press-Print without supplying an image, ask them to upload or attach one rather than inventing a source.
- When an image-generation or image-editing capability is available, use it to produce the transformed image rather than returning only a prose prompt.
- Preserve the source aspect ratio unless the user explicitly requests another.
- Do not add newly invented text.
- Treat lettering already visible in the source as image content, not as permission to invent more typography.
- Existing source text may remain inside retained source fragments when structurally necessary, but do not enlarge it into a new headline, rewrite it, add parallel captions, or create new labels around it.
- Do not generate decorative pseudo-text, filler copy, tiny editorial captions, dates, slogans, metadata, standalone letters, or new words/numbers anywhere in the composition.
- If the layout needs a graphic mass where typography might normally appear, use non-text visual structure instead: source-derived shape, flat field, halftone region, texture, crop, or negative space.
- Before invoking image generation/editing, carry forward an explicit hard negative constraint: no new text, no pseudo-text, no typographic decoration.
- Do not expose private chain-of-thought or hidden source analysis. Perform structural analysis internally and return the final result or a concise user-facing explanation when generation cannot proceed.

### Scope boundary for explicit invocation

Explicitly invoking Press-Print does not override the v1.0 product boundary.

If the user asks primarily for any of the following:

- a typography-heavy poster
- an event, exhibition, campaign, or promotional poster
- a layout centered on a headline, date, body copy, captions, or editorial text
- a general graphic-design composition where typography is a primary design system
- a new poster designed from scratch rather than a reconstruction of the supplied photograph

do not silently turn Press-Print into a general poster-design tool.

If a source photograph is present, explain briefly that Press-Print v1.0 can reconstruct the photograph as an image-only editorial print composition, but does not provide typography-led poster design.

Offer the supported alternative: transform the supplied photograph with Press-Print while omitting newly generated typography.

If no source photograph is present, ask for one.

Do not generate a generic typography-led poster as a substitute for an out-of-scope Press-Print request.

For the full image-generation prompt, consult `references/press-print-v1.md` when detailed reconstruction guidance is useful.
For formal output evaluation, consult `references/quality-rubric.md`.

## Use this skill when

Use Press-Print when the user wants a supplied image transformed into a bold, graphic, layered, printed, editorial composition with a clearly non-photographic result.

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

When Press-Print is explicitly invoked for one of these out-of-scope tasks, do not ignore the mismatch and proceed anyway. Briefly state the v1.0 boundary and, when appropriate, offer a supported Press-Print transformation of the supplied photograph instead.

Typography is intentionally excluded from v1.0. Do not invent captions, place names, dates, slogans, labels, or decorative text.

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

Preserve these clearly enough to retain the source identity.

Do not confuse transformation with destruction of the source's most distinctive geometry.

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
- signage as shape only
- repeated patterns
- light and shadow masses

Complex images will usually support 3 to 7 components. Simpler sources may use fewer. Do not force fragmentation without compositional purpose.

### 3. Recompose

Rebuild the components into a new editorial hierarchy.

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

### 4. Reassign visual states

Assign different parts of the image to different visual states.

**PHOTOGRAPHIC**  
Retain limited recognizable detail where it is valuable.

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

- contemporary editorial print sensibility
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

Use it to:

- flatten selected photographic regions
- separate layers
- convert realism into printed information
- create contrast against clean flat zones

Never coat the entire image in the same dot pattern or density.

## Collage

Collage must behave as editorial structure.

Every fragment must have a compositional job.

Avoid:

- scrapbook layouts
- random stickers
- decorative fragments with no structural purpose
- excessive torn edges
- mood-board aesthetics

## Detail hierarchy

**Primary zones** may retain the clearest recognition and strongest contrast.

**Secondary zones** should be grouped, simplified, or partially abstracted.

**Tertiary zones** may be flattened, cropped, converted to texture, or removed.

Do not distribute attention evenly.

## Lighting and space

Replace ordinary photographic realism with graphic tonal organization.

Prefer:

- silhouette
- tonal blocks
- print density
- flat light-dark separation
- selective highlights
- compressed depth
- layered planes

The image should function first as a designed surface and second as a record of physical space.

## Hard constraints

- No newly invented text.
- No pseudo-text, filler copy, decorative letters, labels, captions, dates, slogans, or metadata.
- Source text may survive only as part of retained source imagery; do not promote, rewrite, duplicate, or expand it into new typography.
- Preserve the original aspect ratio unless the user requests another.
- Do not leave the source photograph intact.
- Do not reduce the whole image to one uniform vector treatment.
- Do not use blanket halftone.
- Do not fake antique paper, sepia history, or nostalgia for its own sake.
- Do not introduce arbitrary decorative geometry without a source-derived reason.
- Do not destroy the source-defining structural anchors.

## Failure test

The transformation has failed if it looks like:

- the original photograph plus a print filter
- generic retro poster art
- a clean corporate vector illustration
- a scrapbook collage
- a muddy all-over halftone
- a composition whose key source identity has been lost
- an AI poster dominated by arbitrary circles, suns, stripes, or decorative blocks
- an editorial poster that invents new headlines, captions, labels, filler copy, or pseudo-text

## Success test

A successful Press-Print result should feel as though a designer disassembled the photograph, retained its most meaningful visual identity, then rebuilt it into a publishable contemporary printed composition.

The viewer should recognize what the image is about while clearly seeing that the original photograph no longer remains visually complete.

For the full generation prompt, read `references/press-print-v1.md`.
For evaluation, read `references/quality-rubric.md`.
