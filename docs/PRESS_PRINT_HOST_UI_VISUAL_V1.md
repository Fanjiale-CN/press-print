# Press Print Host UI Visual v1

Status: Canonical visual treatment for the first ChatGPT host UI

## Intent

Press Print should feel like a compact editorial instrument living naturally inside ChatGPT.

The UI must remain recognizably part of the ChatGPT host while carrying a restrained Press Print identity through hierarchy, spacing, selection treatment, and a small amount of ink/paper accent.

Do not turn the widget into a miniature branded website, poster, or Photoshop-style control panel.

## Platform constraints

Follow the current OpenAI host UI guidance:

- inherit the platform system font stack
- use host/system colors for text, icons, dividers, and structural UI
- use partner brand color only as an accent, especially for primary actions and small selected-state details
- do not use custom fonts
- avoid gradients and decorative background patterns
- respect host-like spacing and corner radii
- avoid nested scrolling
- inline cards should remain shallow and self-contained
- keep visible primary actions to one main CTA and at most one secondary CTA per immediate decision state
- do not repeat the Press Print logo inside the widget because the ChatGPT host supplies app identity before the component

## Press Print visual character

Press Print's brand expression inside ChatGPT should be quiet rather than theatrical.

Use:

- strong but economical hierarchy
- slightly editorial spacing between sections
- thin rules and low-contrast separators
- compact direction selectors
- clear selected-state weight rather than saturated fills
- broad whitespace around the two primary controls
- restrained ink/paper accent on the decisive action
- asymmetry only where it improves hierarchy, never as decoration

Avoid:

- warm-paper full-card backgrounds
- halftone background textures
- decorative dots that imitate the product mark
- shadows used as branding
- gradients
- oversized product name or logo lockups
- ornamental print effects in the control surface
- multiple simultaneous highlighted buttons

The artwork should carry the expressive print language. The control surface should remain calm.

## Palette use

The existing Press Print palette remains:

- Ink: `#0C0C0C`
- Warm paper: `#F4EFE7`
- Supporting ink: `#111111`
- Supporting warm white: `#F8F6F1`
- Muted stone: `#716B62`
- Rule: `#CBC4B8`

Inside ChatGPT:

### Light host

- normal text/background/dividers: inherit system treatment
- primary CTA: Ink `#0C0C0C` when it meets host contrast requirements
- selected-state accent: Muted stone or Ink as a small border/indicator, not a full background field
- warm paper: may appear only as a very small content accent if necessary; do not recolor text areas or the whole card

### Dark host

- normal text/background/dividers: inherit system treatment
- primary CTA: Warm paper `#F4EFE7` with Ink text
- selected-state accent: Warm paper at reduced visual area
- do not make the whole widget warm-paper colored

## Typography

Use only the host/system font stack.

Hierarchy:

- section labels: body-small, medium/semibold
- selected direction label: body-small, semibold
- helper/source sentence: body-small with reduced emphasis
- slider end labels: caption scale
- CTA: body-small, semibold

Avoid introducing display typography. Press Print's typographic personality belongs in generated work, not in host chrome.

## Geometry

Preferred radii:

- direction controls: medium host-like rounded rectangle
- text fields: medium host-like rounded rectangle
- primary and compact actions: capsule/pill only where the host pattern supports it
- outer widget: no artificial card-within-card frame unless ChatGPT provides one

Borders should remain thin and low contrast. Selected state may strengthen the border rather than adding a large color fill.

## Creation card hierarchy

Visual order:

1. one short source/recommendation sentence
2. Direction selectors
3. Structure
4. Intensity
5. conditional Typography or Custom field
6. collapsed More Controls
7. Generate

Direction selectors should feel like one compact choice field rather than six promotional cards.

Structure and Intensity should carry more whitespace than the direction selector because they are the two continuous controls users will manipulate.

Do not display raw numeric values by default. Use semantic labels such as Low / Medium / High only when useful.

## Result card hierarchy

Visual order:

1. concise result summary
2. lightweight version selector only when multiple versions exist
3. immediate result decision actions
4. Refine field only after Refine is chosen

Because the host inline-card guidance favors at most two immediate actions, do not show Refine, Try Another, and Use This as three equally weighted buttons at once.

Recommended first-version behavior:

- primary action: **Refine**
- secondary action: **Try Another**
- **Use This** becomes a lightweight baseline action associated with the current version, visually separated from the two generation-changing actions

Use This is state selection, not a creation CTA, and should not compete with Refine.

## States

### Default

Calm, low contrast. Only one selected direction receives strong emphasis.

### Hover / focus

Increase border/outline clarity without changing layout.

### Selected

Use stronger border weight/contrast and modest font-weight increase. Avoid filled brand blocks for every selected control.

### Generating

Disable mutable controls and dim them consistently. Keep the submitted state visible so the user understands what is running.

### Error

Use host-appropriate error text and focus. Do not introduce branded red palettes.

### Preferred baseline

Mark the preferred version with a small text/badge cue such as `Baseline`, not a bright success color.

## Mobile

Design mobile-first.

- direction controls: two columns when space permits, otherwise one column
- avoid tiny tap targets
- sliders span the available width
- result actions wrap only as a last resort
- no internal scrolling
- conditional sections expand vertically

## Brand recognition rule

The host already supplies the Press Print name and product mark. Therefore the widget's job is not to repeat branding.

Recognition should come from a consistent interaction signature:

`compact direction choice + two continuous controls + language-first refinement`

That repeated behavior is more valuable than painting the widget in brand colors.
