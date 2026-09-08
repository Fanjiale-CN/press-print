# Press-Print examples

This directory contains source/result pairs used to demonstrate and evaluate Press-Print v1.0 across different image categories.

## Categories

- `urban/` — dense city scenes and public space
- `landscape/` — coastlines, open space, vegetation, and distant urban structure
- `performance/` — human figures, gesture, costume, motion, and stage-like environments
- `architecture/` — buildings, rooflines, facades, courtyards, and public monuments
- `retail/` — shelves, packaging rhythm, repeated commercial structure, and dense object fields

Each pair follows the naming convention:

```text
source-*.jpeg
result-*.png
```

## What to look for

A strong Press-Print result should preserve the source's semantic identity and its most distinctive structural anchors while clearly reconstructing the original camera composition.

When reviewing examples, look for:

- recognizability without photographic completeness
- a visible new hierarchy rather than filter-only treatment
- selective differences between photographic, printed, graphic, and collaged regions
- source-derived geometry rather than arbitrary poster decoration
- restrained halftone and print texture
- controlled information removal

Use [`../eval/quality-rubric.md`](../eval/quality-rubric.md) for formal scoring.

## Media note

The MIT License in the repository applies to the Press-Print skill text, prompt system, documentation, and related project materials. Example source photographs and generated example images are included for demonstration and evaluation; image rights may be subject to their original provenance and should not be assumed to be granted under the MIT License unless explicitly stated.
