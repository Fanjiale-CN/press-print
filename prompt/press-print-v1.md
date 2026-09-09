# Press-Print v1.0.2 — Source-Text-Controlled Master Prompt

Create a sophisticated **Press-Print** image: a source-aware contemporary editorial print reconstruction built from a user-supplied photograph.

The goal is not to apply a filter or turn the source into a generic poster. Disassemble the photograph, preserve its semantic identity, and rebuild it as a bold, highly designed, print-driven 2D composition using selective photography, graphic reduction, visible halftone and duotone printing, tactile torn-paper collage, flat color, and modernist composition.

The final result must feel:
- bold
- graphic
- cropped
- layered
- printed
- designed
- intelligent
- publication-quality
- clearly non-photographic
- strongly flattened
- planar
- tactile

This is not a simple style-transfer task.
This is a reconstruction task.

## CORE DIRECTIVE

Do not process the source image as one intact photograph.

Break the source image into meaningful visual components.
Redesign the relationship between those components.
Rebuild the image as a print-driven visual composition.

Treat photography as source material only.

**Preserve semantic identity, not visual completeness.**

The viewer should still understand what the image is about, but the original photo should no longer remain visually intact in its original form.

A second rule is equally important:

**Source text is content. New typography is generation.**

Press-Print may selectively retain text that already exists in the source when it contributes to scene identity. Unless the user explicitly supplies exact new wording, it must not generate new typography.

## GOVERNING PRINCIPLES

- Preserve semantic identity, not visual completeness.
- Treat the entire image as a designed 2D surface.
- Source text is content. New typography is generation.
- If text appears without an explicit user request, it must come from the source image.
- Do not translate source text.
- Do not create parallel bilingual versions.
- Preserve source text in its original language only.
- If the user explicitly requests added text, render only the exact requested wording and nothing else.

## SOURCE TEXT POLICY

Before reconstruction, inspect the source for visible text and classify it by role.

### Default rule

If the user does not explicitly request added text, do not add any text that is not already present in the source image.

If the source contains no detectable text and the user does not explicitly request text, the output must contain zero text.

If the source contains text and the user does not explicitly request new text:
- only source-derived text may appear
- source text may be retained, cropped, obscured, fragmented, reduced, or partially suppressed
- no new words, letters, numbers, captions, labels, slogans, filler copy, editorial side notes, metadata, or pseudo-text may be introduced

### A. Incidental text

Examples:
- distant advertising
- tiny labels
- background copy
- small packaging text
- barely legible signs that do not define the scene

This text may be cropped, obscured, simplified, reduced into texture, or left partially unreadable inside retained photographic fragments. Exact preservation is not required.

### B. Scene-identifying text

Examples:
- station signage
- road signs
- entrance labels
- storefront names
- directional signs
- location markers

Prefer to retain this text as part of source imagery when feasible because it may contribute to semantic identity.

Do not translate it.
Do not rewrite it.
Do not duplicate it.
Do not enlarge it into a headline.
Do not turn it into a fresh design element.
Do not add a second-language equivalent.

### C. Identity-critical text

Examples:
- a primary station name
- a brand name
- a book title
- an artwork title
- a major wayfinding label
- a dominant source word whose exact identity materially matters

Preserve its original language, wording, spelling, and semantic role whenever feasible.

Treat it as protected image content, not editable typography.

### D. Text-dominant source

Examples:
- posters
- menus
- magazine covers
- book covers
- packaging fronts
- signage where text occupies a large part of the source

Press-Print may crop, partially obscure, layer, or retain the original typography as source imagery, but it must not redesign the source into a new typography system.

Do not newly typeset, translate, rewrite, duplicate, invent, or relocate source text as a fresh headline, caption, label, or body-copy system.

### Text-preservation fallback

If exact source text cannot be preserved reliably:
- crop it
- obscure it
- simplify it
- retain it as photographic texture
- reduce its prominence

Never invent approximate replacement wording.
Never output guessed text, misspelled reconstructions, pseudo-text, invented translations, or filler copy.

**Do not interpret “editorial” as permission to add editorial typography.**
Press-Print editoriality comes from composition, cropping, hierarchy, image-state contrast, texture, print treatment, and visual rhythm.

### Language rule

- Preserve source text in its original language.
- No translation.
- No bilingual duplication.
- No parallel second-language version.
- If the source is monolingual, keep it monolingual.
- If the source is already bilingual, it may remain bilingual only in source-derived form.
- Do not expand, regularize, relocate, or redesign existing bilingual content.

### High text-density scenes

For text-rich environments such as dense commercial streets, rail stations, convenience stores, supermarkets, signage walls, and urban scenes in places such as Tokyo, Hong Kong, or Seoul:

- preserve typographic density, not typographic completeness
- keep only a small number of identity-bearing source texts clearly readable
- reduce most other source text into cropped fragments, partial signage, halftone, texture, or obscured visual material
- do not translate monolingual signs or make them bilingual
- dense source text never grants permission to generate more text

### Text footprint rule

Unless the user explicitly requests larger treatment of the exact text they supplied:

- total clearly readable text should usually occupy no more than about 15% of the final image area
- any single clearly readable text block should usually occupy no more than about 8% of the final image area
- source text should not become the dominant visual subject unless the source materially requires it and the user wants that outcome

If exact source text cannot be preserved reliably, crop it, obscure it, reduce it, or retain it as partial photographic texture. Never hallucinate approximate replacement text.

### User-requested text exception

If the user explicitly requests added text:

- render only the exact wording explicitly supplied by the user
- add no extra words, translations, subtitles, labels, dates, captions, or decorative letters
- do not translate the requested wording unless the user explicitly asks for translation
- do not create a bilingual variant unless the user explicitly requests that exact bilingual text
- if the user requests one word or phrase, only that exact word or phrase may be added

Example: if the user requests `地铁`, add only `地铁`. Do not add `Metro`, `Subway`, `地铁 / Metro`, `Urban Metro`, or `地铁系统` unless the user explicitly requests that exact wording.

If the user does not specify placement, size, or hierarchy, keep added text visually controlled and within the same footprint guidance above. Explicitly requested text does not permit unrelated copy or turn Press-Print into a from-scratch typography generator.

## STRUCTURAL ANCHORS

Before disassembling the image, identify 1 to 3 source-defining visual structures that make the scene recognizable.

Examples:
- coastline curve
- distinctive tower silhouette
- railway direction
- major window grid
- characteristic tree canopy
- crossing pattern
- roofline
- figure pose
- repeated shelf rhythm
- identity-critical source signage

Preserve these anchors clearly enough to retain the identity of the source.

Reconstruct everything around them freely.

Do not confuse transformation with destruction of the source's most distinctive geometry or identity-bearing text.

## NON-NEGOTIABLE TRANSFORMATION RULES

1. The original photographic composition must not remain fully intact.
2. The image must be visibly reconstructed, not merely stylized.
3. Separate or reinterpret meaningful visual components according to the complexity of the source.
4. Use differentiated treatments across major regions when this improves the composition.
5. Some literal information should be removed, cropped, abstracted, grouped, or displaced.
6. The image must show clear visual hierarchy.
7. If the result still looks like the original photo with a print filter applied, the transformation has failed.
8. If the result destroys the source-defining visual anchors, the transformation has failed.
9. If the result adds unrequested headlines, labels, body copy, pseudo-text, decorative letters, or other typography, the transformation has failed.
10. If source text is rewritten, translated, duplicated, materially respelled, given a second-language equivalent, or promoted into a new typographic element, the transformation has failed.
11. If user-requested text differs from the exact supplied wording or is accompanied by unrequested copy, the transformation has failed.

## MANDATORY WORKFLOW

### STEP 1 — DISASSEMBLE

Break the source into meaningful visual components.

Complex images will usually support 3 to 7 components. Simpler images may use fewer. Do not force unnecessary fragmentation.

Possible components:
- main subject
- background structure
- source signage
- windows
- skyline
- train body
- architectural mass
- people as silhouettes
- road markings
- sky
- water
- vegetation
- repeated patterns
- symbolic details
- light and shadow masses

Do not keep everything fused into one uninterrupted photo.

### STEP 2 — RECOMPOSE

Rebuild those components into a new visual hierarchy.

Possible operations:
- enlarge one source-derived component disproportionately
- crop one component aggressively
- isolate a fragment
- repeat a component selectively
- shift one component
- layer one component over another
- move a secondary element into foreground status
- break background continuity
- compress depth
- interrupt original space with graphic structure
- create a quiet negative-space region

The new composition must feel art-directed and intentional.

Do not use newly generated typography as a shortcut to hierarchy.

### STEP 3 — REASSIGN VISUAL STATES

Different parts of the image should receive different image states when compositionally useful.

**PHOTOGRAPHIC**
Retain selected recognizable detail in limited areas only. Prefer this state when exact source text or identity-bearing details need protection.

**PRINTED**
Convert selected areas into halftone, duotone, high-contrast, or offset-print-like texture.

**GRAPHIC**
Convert selected areas into flat color fields, silhouettes, simplified geometry, or abstracted structural forms.

**COLLAGED**
Treat selected areas as cut-out fragments, layered printed pieces, torn-edge modules, or displaced source fragments.

Do not apply one uniform treatment to the entire image.
Create contrast between image states.
Do not force variety where it has no compositional purpose.

### STEP 4 — REDUCE

Delete, flatten, group, or simplify secondary information.

Do not preserve every object, every surface, every line, every sign, or every detail.
Keep what matters.
Remove what weakens the composition.

When text is secondary and not identity-bearing, reducing or obscuring it is preferable to regenerating it inaccurately.

### STEP 5 — HIERARCHIZE

Make some regions dominant, some secondary, and some nearly silent.

The whole image must not speak at one volume.

Use scale, crop, contrast, color, density, overlap, negative space, texture, and source-derived geometry to establish hierarchy.
Do not use generated headlines or filler copy to create hierarchy.

## SOURCE-DERIVED GRAPHICS

Graphic interventions should emerge from structures already present in the source whenever possible.

Derive graphic shapes from:
- architecture
- roads
- coastlines
- windows
- shadows
- vegetation
- railings
- source signage
- repeated structural patterns
- clothing or figure silhouettes
- existing light masses

Do not invent arbitrary circles, suns, triangles, stripes, or decorative blocks merely to make the image feel designed.

If a large geometric field is used, it should have a visible compositional relationship to something already present in the source.

## VISUAL LANGUAGE

Aim for:
- contemporary print-driven visual reconstruction
- publication-quality image design
- modernist composition with expressive force
- graphic and art-directed structure
- bold asymmetry
- strong cropping
- layered visual structure
- halftone and duotone sensibility
- screenprint and offset-print character
- flat color mixed with selected photographic fragments
- intelligent abstraction
- disciplined collage
- controlled visual tension
- modern rather than nostalgic energy
- no unrequested typography
- no decorative clutter
- extremely strong planar composition
- bold silhouette-based reduction
- interlocking flat color planes
- tactile paper-layer transitions

Avoid language and design behavior associated with typography-led poster systems.
The work should feel like a designed image surface, not a page waiting to be filled with headline and body copy.

## COMPOSITION RULES

Treat the entire image as a flat arrangement of shapes on a 2D surface rather than a preserved camera view.

Do not build a conventionally realistic scene with deep space. Do not emphasize three-dimensional form. Flatten foreground, middle ground, and background into interlocking color planes, silhouettes, fragments, halftone regions, and cut-paper structures.

Prefer front-facing, near-flat, or simplified top-down viewpoints. Avoid strong perspective, deep spatial recession, cinematic depth, realistic cast shadows, and volumetric modeling.

Use:
- asymmetrical balance
- strong hierarchy
- large source-derived graphic masses
- active negative space
- directional movement
- interruption
- overlap
- fragmentation
- contrast between dense and quiet regions

Allow:
- aggressive cropping
- enlarged source fragments
- displaced details
- cut-out components
- partial occlusion
- incomplete continuity
- selective enlargement of structural elements

Do not simply keep the whole scene centered and intact.
Do not add headline zones, caption columns, decorative labels, or pseudo-editorial copy.

## SUBJECT RULE

Preserve recognizability at the level of meaning and defining structure.

Do not preserve everything literally.

Examples:
- a metro scene may be reduced to original signage fragments, arrows, bars, ceiling rhythm, passenger flow, and architectural bands
- a train scene may be reduced to track rhythm, carriage stripe, poles, and urban mass
- a tower may be reduced to silhouette, facade rhythm, and reflective plane
- an airport may be reduced to seating rhythm, window grid, aircraft fragment, and waiting figures
- a beach may be reduced to coast curve, sea mass, trees, and skyline fragments
- a performance may be reduced to figure pose, costume movement, audience density, lighting geometry, and architectural frame
- a retail shelf may be reduced to packaging blocks, repeated shelf bands, price-label rhythm, and one or two selected product fragments

Preserve the identity of the subject.
Do not preserve all of its information.

## PRESERVE SEMANTIC IDENTITY, NOT VISUAL COMPLETENESS

The result should preserve:
- what the subject is
- where the emphasis is
- what kind of place or scene it is
- the emotional or informational tone
- the most distinctive source-defining visual structures
- identity-bearing source text when it materially contributes to recognition

The result should not preserve:
- the full original framing
- every original object
- every original relationship
- every photographic detail
- the original scene as a complete uninterrupted record
- incidental source text merely because it exists

## COLOR

Use a restrained editorial print palette with roughly 3 to 6 major color families.

Prefer:
- one dominant structural dark
- one light paper-like base
- one or two strong accent colors
- one supporting secondary hue if needed

Useful color families include:
- deep navy
- cobalt blue
- warm paper or ivory
- off-white
- black
- charcoal
- vermilion red
- orange-red
- muted turquoise
- mustard
- muted green
- coral

Reduce the original photographic color complexity significantly.

Use color strategically to:
- direct attention
- compress space
- separate components
- unify the design
- create visual tension

Do not simply inherit full photographic color.
Flat color fields are encouraged.
Duotone treatment is encouraged.
Avoid excessive gradients.

## TEXTURE AND PRINT LANGUAGE

Use print language deliberately.

Possible tools:
- halftone dots
- coarse or fine screen patterns
- duotone conversion
- offset-print feeling
- slight misregistration
- matte printed texture
- torn paper edges
- cut-paper edges
- imperfect printed layering
- ink-density variation

Use texture as structure, not decoration. Halftone dots and paper-layer transitions should be clearly perceptible where selected rather than reduced to faint digital noise.

Do not bury the whole image under grunge.
Do not make everything distressed.
Do not simulate fake age everywhere.

## ENHANCED HALFTONE RULE

Halftone must be more visible and intentional than in earlier versions. It is a selective structural tool, not a blanket effect or faint cosmetic grain.

Use halftone to:
- flatten one region
- create contrast with a clean region
- distinguish one layer from another
- convert photography into graphic information
- create print identity

Do not apply the same halftone treatment to the entire image.
Do not let every area share the same density or texture logic.
Vary dot scale, density, direction, and placement deliberately. Use clean flat zones beside printed regions so the halftone reads as structural contrast.

## ENHANCED TORN-PAPER COLLAGE RULE

Strengthen the tactile collage character. Collage must behave like visual structure.

Use collage to:
- isolate fragments
- shift hierarchy
- disrupt continuity
- introduce modular visual logic
- create controlled layering
- introduce visibly torn paper edges
- create cut-paper overlaps and rough-edged interruptions
- reveal deliberate paper-layer transitions

Do not make it look like:
- a scrapbook
- a mood board
- random stickers
- casual cut-and-paste craft
- childish layout play

Every fragment must have compositional purpose.
Do not default to clean corporate rectangles. Do not add arbitrary scrapbook decoration. Each tear, overlap, and pasted fragment must support hierarchy, source structure, or spatial compression.

## SPACE

Flatten space strongly.

Compress depth.
Break continuity.
Allow background and foreground to merge when useful.
Turn some spatial regions into planes, bands, blocks, or fields.

Use little to no realistic depth. Avoid deep spatial recession and soft atmospheric perspective.

The final image should function primarily as a designed surface.

Some depth may remain, but only where it strengthens the composition.

## NEGATIVE SPACE

Use negative space actively and deliberately.

Allow areas of:
- paper tone
- clean off-white
- flat color
- reduced sky
- quiet graphic emptiness

Negative space should create:
- hierarchy
- clarity
- rhythm
- emphasis
- breathing room

Do not fill empty areas with invented editorial text.

## DETAIL DISTRIBUTION

Use strict hierarchy.

**PRIMARY ZONES**
- highest contrast
- clearest recognition
- strongest detail
- strongest compositional role

**SECONDARY ZONES**
- reduced
- grouped
- simplified
- partially abstracted

**TERTIARY ZONES**
- flattened
- silenced
- cropped out
- converted into texture
- converted into shape
- removed entirely

Do not distribute attention evenly across the image.

## LIGHT AND TONALITY

Do not keep natural photographic lighting as the dominant system.

Reduce:
- subtle realistic shading
- soft tonal realism
- photographic transitions
- glossy highlights
- ordinary camera depth realism

Use instead:
- silhouette
- density contrast
- flat graphic light-dark separation
- print contrast
- selective tonal blocking
- bold highlight-shadow simplification

The image should feel printed and constructed, not optically recorded.

## LINE AND EDGE BEHAVIOR

Use intentional edges.

Possible edge types:
- crisp cut-out edges
- torn edges
- printed edges
- bold silhouette edges
- slightly rough handmade boundaries

Avoid:
- soft painterly blending
- full-scene blur
- uniform vector outlines around everything
- over-rendered contour drawing
- airbrushed digital smoothness

Edges should feel designed and tactile.

## MODERNITY

Keep modern subjects modern.

A metro sign remains a metro sign.
A train remains a train.
A skyline remains contemporary.
An airport remains contemporary.

Do not convert the subject into a fake antique poster from another era.

This is contemporary print language.

## FAILURE MODES TO AVOID

- the whole image remains basically the original photo
- only a poster filter is applied
- halftone is spread everywhere uniformly
- all details are preserved unchanged
- collage becomes random decoration
- the result becomes a flat vector illustration only
- the result becomes nostalgic vintage imitation
- the result becomes a clean corporate poster
- the result becomes a scrapbook
- the result becomes muddy or visually crowded
- the result becomes a generic social-media illustration
- arbitrary decorative circles, suns, triangles, or stripes dominate the result
- source-defining geometry is destroyed
- unrequested text or typography appears anywhere
- unrequested bilingual text or a translated second-language equivalent appears
- pseudo-text or filler editorial copy appears
- source text is translated, rewritten, duplicated, enlarged into a headline, or materially respelled
- identity-critical source text is replaced with hallucinated approximations
- user-requested text is altered, expanded, translated, or accompanied by additional copy
- readable text exceeds the controlled footprint without source necessity or an explicit request to enlarge the user's exact supplied text

## SUCCESS TEST

A successful result should make the viewer think:

> This clearly comes from a photograph, but it has been re-edited, reconstructed, abstracted, and redesigned into a publishable print-driven image.

The image should feel:
- graphic
- printed
- cropped
- layered
- intelligent
- modernist
- high-contrast
- mature
- visually forceful
- clearly transformed

The final work must feel publishable without relying on unrequested typography.

**FINAL TEXT SAFETY CHECK**

If the user did not explicitly request added text:

**NO NEW TEXT ANYWHERE. NO HEADLINES. NO CAPTIONS. NO LABELS. NO LETTERS. NO WORDS. NO NUMBERS. NO PSEUDO-TEXT. NO TRANSLATION. NO BILINGUAL DUPLICATION.**

Empty areas must remain shape, color, texture, source-derived imagery, or negative space.

If the user explicitly requested added text, render only the exact requested wording and nothing else.

Preserve source text selectively when it materially contributes to semantic identity.
If exact source text cannot be preserved reliably, obscure or crop it rather than inventing a replacement.

Preserve the original aspect ratio unless a different aspect ratio is explicitly requested.
