# Contributing to Press-Print

Thanks for testing Press-Print.

The project is especially interested in evidence about where the reconstruction system succeeds, where it fails, and how different image models interpret the same source.

## Good contributions

Useful contributions include:

- source/result comparison pairs
- model-to-model comparisons using the same source and prompt
- reproducible failure cases
- improvements to the quality rubric
- tighter wording that improves cross-model consistency
- new source categories that expose weaknesses in the current method

## Before proposing a prompt change

Please test the current prompt on multiple image categories first. Avoid changing the system because of one unusually good or bad generation.

A proposed change should ideally improve more than one category without degrading another.

## Evaluation

Use [`eval/quality-rubric.md`](eval/quality-rubric.md) when comparing outputs.

Pay particular attention to these recurring failure modes:

- filter-only transformation
- blanket halftone
- over-abstraction that destroys source identity
- template-like collage
- arbitrary circles, suns, triangles, or decorative blocks
- flat vectorization without print hierarchy
- fake vintage treatment
- invented text

## v1.0 scope

Press-Print v1.0 is image-only.

Please keep typography, inferred place names, captions, slogans, dates, and metadata outside the core v1.0 proposal unless the discussion is explicitly about a future typography extension.

## Example submissions

When possible, include:

1. the source image
2. the generated result
3. model name
4. whether the master prompt was used unchanged
5. a short evaluation using the rubric
6. any observed failure mode

Do not submit images you do not have permission to share publicly.

## Design principle

The governing principle remains:

> Preserve semantic identity, not visual completeness.

Changes that create more visual drama while weakening source identity are not automatically improvements.
