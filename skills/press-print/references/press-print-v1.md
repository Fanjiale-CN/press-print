# Press-Print v1.0.2 — Source-Text-Controlled Master Prompt

Create a sophisticated **Press-Print** image: a source-aware contemporary editorial print reconstruction built from a user-supplied photograph.

Disassemble the photograph, preserve its semantic identity, and rebuild it as a bold, highly designed, strongly flattened, print-driven 2D composition using selective photography, graphic reduction, visible halftone and duotone printing, tactile torn-paper collage, flat color, and modernist composition.

The result must feel bold, graphic, cropped, layered, printed, designed, intelligent, publication-quality, and clearly non-photographic.

This is a reconstruction task, not a simple style transfer.

## Core directive

Break the source image into meaningful visual components, redesign the relationship between those components, and rebuild the image as a print-driven visual composition.

**Preserve semantic identity, not visual completeness.**

The viewer should still understand what the image is about, but the original photograph should no longer remain visually intact.

A second rule is equally important:

**Source text is content. New typography is generation.**

Press-Print may selectively retain text already present in the source when that text contributes to scene identity. Unless the user explicitly supplies exact new wording, it must never generate new typography.

## Governing principles

- Preserve semantic identity, not visual completeness.
- Treat the entire image as a designed 2D surface.
- Source text is content. New typography is generation.
- If text appears without an explicit user request, it must come from the source image.
- Do not translate source text or create parallel bilingual versions.
- Preserve source text in its original language only.
- If the user explicitly requests added text, render only the exact requested wording and nothing else.

## Source text policy

Before reconstruction, inspect visible source text and classify it by role.

### Default rule

If the user does not explicitly request added text, add no text that is not already present in the source. A source with no detectable text must produce an output with zero text.

When source text exists, it may be retained, cropped, obscured, fragmented, reduced, or partially suppressed. Do not introduce new words, letters, numbers, captions, labels, slogans, filler copy, editorial side notes, metadata, or pseudo-text.

### A. Incidental text

Distant ads, tiny labels, background copy, small packaging text, and other non-essential wording may be cropped, obscured, simplified, reduced into texture, or left partially unreadable inside retained photographic fragments.

### B. Scene-identifying text

Station signage, road signs, storefront names, entrance labels, directional signs, and location markers may contribute to semantic identity. Prefer to retain them as source imagery when feasible.

Do not translate, rewrite, duplicate, enlarge, or promote them into new design elements.

### C. Identity-critical text

Primary station names, brand names, book titles, artwork titles, major wayfinding labels, and other exact wording that materially matters should retain original language, wording, spelling, and semantic role whenever feasible.

Treat them as protected image content, not editable typography.

### D. Text-dominant source

For posters, menus, magazine covers, book covers, packaging fronts, or signage dominated by typography, Press-Print may crop, partially obscure, layer, or retain the original text as source imagery, but must not redesign it into a new typography system.

Do not newly typeset, translate, rewrite, duplicate, invent, or relocate source text as a fresh headline, caption, label, or body-copy system.

### Text-preservation fallback

If exact source text cannot be preserved reliably, crop it, obscure it, simplify it, retain it as photographic texture, or reduce its prominence.

Never invent approximate replacement wording. Never output guessed text, misspelled reconstructions, pseudo-text, invented translations, or filler copy.

**Do not interpret “editorial” as permission to add editorial typography.** Press-Print editoriality comes from composition, cropping, hierarchy, image-state contrast, texture, print treatment, and visual rhythm.

### Language rule

Preserve source text in its original language. Do not translate it, add a second-language equivalent, or create parallel bilingual versions. Monolingual source text stays monolingual. Source content that is already bilingual may remain bilingual only in source-derived form; do not expand, regularize, relocate, or redesign it.

### High text-density scenes

For dense commercial streets, stations, convenience stores, supermarkets, signage walls, and other text-rich environments, preserve typographic density rather than typographic completeness. Keep only a small number of identity-bearing source texts clearly readable and reduce most other source text into cropped fragments, partial signage, halftone, texture, or obscured visual material. Dense source text never grants permission to generate more text.

### Text footprint rule

Unless the user explicitly requests larger treatment of the exact text they supplied, total clearly readable text should usually occupy no more than about 15% of the image area, and any single readable block should usually occupy no more than about 8%. Source text should not become dominant unless the source materially requires it and the user wants that result.

### User-requested text exception

If the user explicitly requests added text, render only the exact wording supplied. Add no translations, subtitles, labels, dates, captions, decorative letters, or other copy. Do not translate or make it bilingual unless the user explicitly requests that exact form.

If the user requests `地铁`, add only `地铁`, not `Metro`, `Subway`, `地铁 / Metro`, `Urban Metro`, or `地铁系统`.

If placement, size, or hierarchy is unspecified, keep the requested text visually controlled within the footprint guidance. This exception does not permit unrelated copy or from-scratch typography generation.

## Structural anchors

Before disassembling the image, identify 1 to 3 source-defining structures that make the scene recognizable, such as a coastline curve, tower silhouette, railway direction, window grid, tree canopy, crossing pattern, roofline, figure pose, shelf rhythm, or identity-critical source signage.

Preserve these anchors clearly enough to retain source identity.

## Non-negotiable transformation rules

1. The original photographic composition must not remain fully intact.
2. The image must be visibly reconstructed, not merely stylized.
3. Separate or reinterpret meaningful visual components according to source complexity.
4. Use differentiated treatments across major regions when useful.
5. Remove, crop, abstract, group, or displace some literal information.
6. Establish clear dominant, secondary, and quiet zones.
7. A filter-only result is a failure.
8. Destroying source-defining anchors is a failure.
9. Adding unrequested headlines, labels, body copy, pseudo-text, decorative letters, or other typography is a failure.
10. Rewriting, translating, duplicating, materially respelling, adding a second-language equivalent, or promoting source text into a new typographic element is a failure.
11. Altering or expanding user-requested text is a failure.

## Mandatory workflow

### 1. Disassemble

Break the source into meaningful components such as main subject, background structure, source signage, windows, skyline, train body, architectural mass, people, road markings, sky, water, vegetation, repeated patterns, symbolic details, and light/shadow masses.

Complex images will usually support 3 to 7 components. Do not force unnecessary fragmentation.

### 2. Recompose

Rebuild components into a new hierarchy using crop, scale shift, isolation, overlap, displacement, selective repetition, compressed depth, interruption, enlarged source fragments, and active negative space.

Do not use unrequested typography as a shortcut to hierarchy.

### 3. Reassign visual states

Use different states selectively:

- **PHOTOGRAPHIC** for limited recognizable detail and protected source text.
- **PRINTED** for halftone, duotone, high-contrast, or offset-print-like regions.
- **GRAPHIC** for flat color fields, silhouettes, simplified geometry, and abstracted structural forms.
- **COLLAGED** for cut, layered, torn, shifted, or interrupted source fragments.

Do not apply one uniform treatment to the whole image.

### 4. Reduce

Delete, flatten, group, or simplify secondary information. When text is secondary and not identity-bearing, reducing or obscuring it is preferable to regenerating it inaccurately.

### 5. Hierarchize

Use scale, crop, contrast, color, density, overlap, negative space, texture, and source-derived geometry to create hierarchy.

Do not generate headlines, caption columns, filler copy, or decorative labels.

## Source-derived graphics

Graphic intervention should grow from architecture, roads, coastlines, windows, shadows, vegetation, railings, source signage, repeated structures, clothing/figure silhouettes, or existing light masses.

Do not invent arbitrary circles, suns, triangles, stripes, or decorative blocks merely to make the image feel designed.

## Visual language

Aim for contemporary print-driven reconstruction, publication-quality image design, an extremely flat and planar 2D surface, bold asymmetry, strong cropping, interlocking color planes, bold silhouettes, visible halftone/duotone contrast, screenprint and offset character, selected photographic fragments, tactile torn-paper layering, intelligent abstraction, disciplined collage, controlled tension, and modern rather than nostalgic energy.

The work should feel like a designed image surface, not a page waiting for a headline and body copy.

## Color

Use roughly 3 to 6 major color families: one structural dark, one light paper-like base, one or two strong accents, and one supporting hue if needed.

Reduce photographic color complexity substantially. Flat color and duotone treatment are encouraged. Avoid excessive gradients.

## Composition and space

Treat the entire image as a flat arrangement of shapes on a 2D surface. Flatten foreground, middle ground, and background into interlocking planes, silhouettes, fragments, halftone regions, and cut-paper structures. Prefer front-facing, near-flat, or simplified top-down viewpoints. Avoid strong perspective, deep spatial recession, cinematic depth, realistic cast shadows, volumetric modeling, and soft atmospheric space.

## Enhanced texture and halftone

Use clearly perceptible halftone, duotone, offset-print character, slight misregistration, matte texture, paper edges, and ink-density variation selectively. Vary dot scale, density, direction, and placement deliberately.

Texture is structural, not decorative. Do not bury the whole image under grunge or blanket halftone.

## Enhanced torn-paper collage

Use visibly torn paper edges, cut-paper overlaps, rough-edged interruptions, deliberate paper-layer transitions, and pasted fragments to isolate elements, shift hierarchy, disrupt continuity, create modular logic, and control layering.

Avoid scrapbook, mood-board, random-sticker, casual craft, and clean corporate rectangle aesthetics. Every tear, overlap, and fragment must have structural purpose.

## Space and detail

Flatten space selectively. Compress depth. Break continuity. Use negative space actively.

Primary zones may retain the strongest recognition and detail. Secondary zones should be reduced or simplified. Tertiary zones may be flattened, cropped, textured, or removed.

## Modernity

Keep modern subjects modern. A metro sign remains a metro sign. A train remains a train. A skyline remains contemporary. An airport remains contemporary.

Do not convert the subject into fake antique nostalgia.

## Failure modes

Reject or regenerate if any of the following occurs:

- filter-only transformation
- blanket halftone
- generic retro poster styling
- clean corporate vector poster styling
- random scrapbook collage
- arbitrary decorative geometry dominates
- source identity is lost
- source-defining geometry is destroyed
- unrequested text or typography appears
- unrequested bilingual text or a translated second-language equivalent appears
- pseudo-text or filler editorial copy appears
- source text is translated, rewritten, duplicated, enlarged into a headline, or materially respelled
- identity-critical source text is replaced with hallucinated approximations
- user-requested text is altered, expanded, translated, or accompanied by additional copy
- readable text exceeds the controlled footprint without source necessity or an explicit request to enlarge the user's exact supplied text

## Success test

A successful result should feel as though a designer disassembled the photograph, retained its most meaningful identity, then rebuilt it into a publishable print-driven image.

Important source text should either remain faithfully embedded in source imagery or be deliberately reduced/obscured rather than regenerated incorrectly.

If the user did not explicitly request added text: **NO NEW TEXT ANYWHERE. NO HEADLINES. NO CAPTIONS. NO LABELS. NO LETTERS. NO WORDS. NO NUMBERS. NO PSEUDO-TEXT. NO TRANSLATION. NO BILINGUAL DUPLICATION.**

Empty areas must remain shape, color, texture, source-derived imagery, or negative space.

If the user explicitly requested added text, render only the exact requested wording and nothing else.

Preserve source text selectively when it materially contributes to semantic identity.
If exact source text cannot be preserved reliably, obscure or crop it rather than inventing a replacement.

Preserve the original aspect ratio unless a different aspect ratio is explicitly requested.
