# Press Print Host UI Visual v1

Status: Canonical visual treatment for the first ChatGPT host UI

## Intent

Press Print should feel like a compact editorial instrument that belongs inside ChatGPT rather than a separate branded product embedded inside it.

The implementation principle is:

> **OpenAI provides the interface language. Apple HIG informs interaction discipline. Press Print provides the art-direction intelligence.**

The UI should therefore look native to the ChatGPT host first. Press Print identity is expressed through hierarchy, language, art-direction choices, source-aware recommendations, and revision behavior rather than ornamental chrome.

Do not turn the widget into a miniature branded website, poster, iOS settings screen, or Photoshop-style control panel.

## Canonical component layer

The first production host UI uses the official `@openai/apps-sdk-ui` component library with React and Tailwind CSS 4.

Prefer official components for common interaction surfaces:

- `Button` for Direction, actions, version chips, and refinement chips
- `Slider` for Structure and Intensity
- `SegmentedControl` for Typography Keep / Replace / Generate
- `Input` for Typography, Custom, and Refine text
- `Checkbox` for collapsed preservation controls
- OpenAI semantic tokens and host theme behavior for typography, colors, borders, focus, disabled, loading, and dark mode

Custom CSS should be limited to layout glue that the component library does not encode, such as the responsive Direction grid and lightweight disclosure layout.

Do not redraw an OpenAI component in custom CSS when the official component already expresses the same job.

## Apple HIG influence

Apple's design language is an interaction reference, not the rendering system.

Borrow:

- progressive disclosure for advanced controls
- grouped mutually exclusive choice for Typography
- direct continuous manipulation for Structure and Intensity
- generous touch targets and clear selection states
- content-first hierarchy where controls retreat when they are no longer relevant

Do not imitate:

- native iOS chrome for its own sake
- Liquid Glass across the whole widget
- SF Symbols as a dependency
- Apple-specific navigation structures
- platform-specific styling that makes the component look foreign inside ChatGPT

## Platform constraints

Follow the current OpenAI host UI guidance:

- use the official OpenAI component system where practical
- inherit the platform system font stack
- use host/system colors for text, icons, dividers, and structural UI
- use partner brand color only when it provides a meaningful accent
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
- thin, host-native separators
- compact direction selectors
- clear selected-state weight
- broad whitespace around the two primary controls
- asymmetry only where it improves hierarchy, never as decoration

Avoid:

- warm-paper full-card backgrounds
- halftone background textures
- decorative dots or fragments that imitate the product mark
- shadows used as branding
- gradients
- oversized product name or logo lockups
- ornamental print effects in the control surface
- multiple simultaneous highlighted buttons

The artwork should carry the expressive print language. The control surface should remain calm.

## Palette use

The Press Print badge has its own approved light/dark tones, but host controls should not reproduce the badge palette as a second UI theme.

Inside ChatGPT:

### Light host

- normal text/background/dividers: use OpenAI semantic treatment
- primary CTA: OpenAI primary action treatment
- selected states: OpenAI selected/pressed treatment
- Press Print warm tones should not become large UI surfaces

### Dark host

- normal text/background/dividers: use OpenAI semantic treatment
- primary CTA: OpenAI dark-host primary treatment
- selected states: OpenAI selected/pressed treatment
- do not recolor the widget around the logo's dark badge palette

The badge remains a product identity asset supplied by the host/listing, not a widget skin.

## Typography

Use only the host/system font stack and OpenAI typography tokens/classes.

Hierarchy:

- section labels: body-small, medium/semibold
- selected direction label: body-small, semibold
- helper/source sentence: body-small with reduced emphasis
- slider end labels: caption scale
- CTA: body-small, semibold

Avoid introducing display typography. Press Print's typographic personality belongs in generated work, not in host chrome.

## Geometry

Let official components define their own radii, paddings, focus rings, pressed states, loading states, and disabled treatment.

Custom layout rules:

- Direction controls form a responsive grid, not six promotional cards
- conditional sections may receive a quiet separator or host-native border
- outer widget has no artificial branded card-within-card frame unless ChatGPT provides one
- borders remain low contrast and structural

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

Structure and Intensity use the official OpenAI Slider. Their conceptual endpoints remain:

- Structure: Original ↔ Rebuild
- Intensity: Soft ↔ Strong

Do not surface raw engineering values as the primary UI language. Semantic labels such as Low / Medium / High may supplement the slider state.

Typography uses the official SegmentedControl with exactly three modes:

- Keep
- Replace
- Generate

Replace requires exact text. Generate authorizes concise generated typography. Keep remains source-preserving.

## Result card hierarchy

Visual order:

1. concise result summary
2. lightweight version selector only when multiple versions exist
3. immediate result decision actions
4. Refine field only after Refine is chosen

Do not show Refine, Try Another, and Use This as three equally weighted creation CTAs.

Recommended behavior:

- primary action: **Refine**
- secondary action: **Try Another**
- **Use This** remains a lightweight baseline action associated with the selected version

Use This is state selection, not image generation, and should not compete with Refine.

## States

### Default

Calm, low contrast. Only one selected direction receives strong emphasis.

### Hover / focus

Use the official component behavior. Do not override focus treatment with decorative branding.

### Selected

Use official selected/pressed states whenever available.

### Generating

Use official loading/disabled states. Keep the submitted control state visible so the user understands what is running.

### Error

Use host-appropriate invalid/error treatment. Do not introduce a branded error palette.

### Preferred baseline

Mark the preferred version with a small `Baseline` state, not a bright success color.

## Mobile and narrow layouts

Design responsive-first even though true custom MCP App host testing is currently performed in ChatGPT Web.

- direction controls: two columns when space permits, otherwise one column
- preserve comfortable touch targets
- sliders span the available width
- result actions wrap only as a last resort
- no internal scrolling
- conditional sections expand vertically

## Brand recognition rule

The host already supplies the Press Print name and product badge. The widget must not repeat the badge internally.

Recognition should come from a consistent interaction signature:

`compact direction choice + two continuous controls + language-first refinement`

That behavior, plus Press Print's judgment, is the brand inside the host.
