# Press-Print Regression Benchmark
Version: 1.0  
Status: Canonical Evaluation Layer  
Scope: Release gating, canonical test set, scoring, and review protocol

## 0. Purpose

This benchmark protects Press-Print against two major failure modes:

1. **quality drift** — outputs become weaker, less coherent, or less usable;
2. **identity drift** — outputs may become prettier or more advanced, but no longer feel like Press-Print.

The benchmark exists to answer:
- Did the system improve?
- Did it remain Press-Print?
- What exactly got better or worse?

---

## 1. Benchmark design principles

1. Test **source diversity**, not one favorite image type.
2. Test **identity preservation** and **reconstruction strength** together.
3. Separate **surface polish** from **structural success**.
4. Include **hard cases**, not just easy wins.
5. Prefer a smaller, stable gold set over endless uncontrolled examples.
6. Never let a model update silently redefine what “good” means.

---

## 2. Canonical gold set v1

Target size: **40 images**

### Categories
- 8 portrait
- 7 architecture
- 7 street / documentary-like
- 4 animal
- 4 food / object / still life
- 4 interior
- 4 landscape / open spatial scene
- 2 already-flat / graphic-source images

### Difficulty distribution
- 10 easy / high-structure
- 18 medium
- 12 hard / cluttered / ambiguous / identity-fragile

### Required edge cases
Include at least:
- small subject in large environment,
- busy street with signage clutter,
- face partially obscured,
- image with strong single color anchor,
- architecture with repetitive façade rhythm,
- source already compositionally flat,
- subject near frame edge,
- visually beautiful but semantically weak image,
- semantically rich but visually messy image,
- fragile identity with limited transformation budget.

---

## 3. Test variants

Each gold-set image should be run in the following standard conditions.

### Condition A — Default vague request
Prompt:
- “Process this with Press-Print.”

Purpose:
- test autonomous art-direction judgment.

### Condition B — Explicit editorial request
Prompt:
- “Create an editorial reconstruction. Preserve the subject. No typography.”

Purpose:
- test direct reconstruction quality.

### Condition C — Restrained variation
Prompt:
- “Make it more restrained.”

Purpose:
- test controlled variation.

### Condition D — Aggressive variation
Prompt:
- “Make it more graphic and fragmented while preserving the subject.”

Purpose:
- test upper transformation budget.

Not every image must run all four conditions on every release, but the benchmark suite should include all conditions across the set.

---

## 4. Core scoring dimensions

Use a 0–10 scale for human review unless otherwise stated.

### 4.1 Semantic Preservation Score
Does the result remain recognizably the same image in subject and identity-bearing relation?

Questions:
- Is the primary subject still the same?
- Did critical relations survive?
- Did the image cease to be “that image”?

### 4.2 Press-Print Identity Score
Does the result still feel recognizably Press-Print?

Indicators:
- reconstructed, not filtered,
- designed, not merely polished,
- materiality if present is causal,
- planar/editorial character remains.

### 4.3 Reconstruction Strength
How far did the system actually transform the image into a designed composition?

Low score:
- mostly intact photo with minor treatment.

High score:
- clear reconstruction with preserved intelligibility.

### 4.4 Editorial Hierarchy
Is the result more hierarchically intentional than the source?

### 4.5 Planar Composition / Surface Coherence
Does the image read as designed on a surface rather than as a deep realistic scene?

### 4.6 Material Coherence
If material cues exist, are they bounded, purposeful, and structurally justified?

### 4.7 Source Specificity
Does the result retain the source image’s distinctiveness rather than becoming generic?

### 4.8 Generic AI Polish Penalty
Penalty metric. Higher means worse.
Symptoms:
- smooth premium-ad finish,
- frictionless details,
- synthetic sameness,
- weak source character.

### 4.9 Decorative Noise Penalty
Penalty metric. Higher means worse.
Symptoms:
- texture overload,
- meaningless tearing,
- effect stacking,
- forced collage.

### 4.10 Cinematic Realism Drift
Penalty metric. Higher means worse.
Symptoms:
- movie-poster lighting,
- dramatic 3D realism,
- lensy depth cues inconsistent with Press-Print.

---

## 5. Evaluation protocol

### 5.1 Two-layer evaluation
Use:
1. **automated / assisted checks**
2. **human gold review**

Automation should support, not replace, final judgment.

### 5.2 Suggested automated checks
Reasonable candidates:
- similarity between preserved target regions,
- detection of face integrity where relevant,
- detection of output smoothness / texture dispersion,
- style-consistency classifiers trained on approved Press-Print exemplars,
- comparison against prior accepted benchmark outputs.

### 5.3 Human review board
At minimum, one internal reviewer should answer:
- Does it remain the same image?
- Is it actually reconstructed?
- Does it still feel like Press-Print?

Better:
- 2–3 reviewers with a calibration set.

### 5.4 Calibration set
Keep a small set of:
- accepted great outputs,
- accepted borderline outputs,
- rejected failures.

Use this to train reviewer consistency.

---

## 6. Release gates

A system revision may ship only if it passes both the **global gate** and the **identity gate**.

### 6.1 Global gate
Across the benchmark suite:
- no statistically meaningful drop in Semantic Preservation,
- no meaningful drop in Editorial Hierarchy,
- no meaningful drop in Reconstruction Strength,
- no spike in penalties.

### 6.2 Identity gate
Across the benchmark suite:
- Press-Print Identity Score must not decline below accepted threshold,
- no more than 10% of reviewed outputs may be flagged “could belong to another tool,”
- zero release-blocking cultural-costume outputs,
- zero release-blocking “decorative only” outputs.

### 6.3 Hard fail conditions
Any release is blocked if:
- multiple outputs collapse identity on easy images,
- torn / textured effects appear globally regardless of source,
- default mode trends toward generic AI polish,
- “restrained” variation still looks overly effect-heavy,
- one source type is systematically mishandled.

---

## 7. Failure taxonomy

Use these canonical tags:

- identity_damage
- weak_hierarchy
- under_reconstruction
- over_fragmentation
- decorative_excess
- materiality_without_cause
- generic_ai_smoothing
- planar_failure
- source_specificity_loss
- cinematic_realism_drift
- template_collapse
- cultural_costume_drift
- drift_from_direction

This taxonomy must remain aligned with `CritiqueResult.failure_causes` in `PP_SYSTEM_SCHEMA.yaml`.

---

## 8. Manual review sheet template

For each tested output, reviewers record:

- image_id
- condition
- semantic_preservation (0–10)
- press_print_identity (0–10)
- reconstruction_strength (0–10)
- editorial_hierarchy (0–10)
- planar_coherence (0–10)
- material_coherence (0–10 or N/A)
- source_specificity (0–10)
- generic_ai_penalty (0–10, higher worse)
- decorative_noise_penalty (0–10, higher worse)
- cinematic_realism_drift (0–10, higher worse)
- pass / warning / fail
- notes
- failure taxonomy tags

---

## 9. Version-to-version comparison

Every release should compare:
- current version,
- previous release,
- optionally best-known baseline.

Track:
- mean score shifts,
- penalty shifts,
- source-type-specific regressions,
- reviewer notes on identity drift.

### Example interpretation
- Quality up, identity down → reject.
- Identity steady, reconstruction stronger, penalties steady → good candidate.
- Portraits improve but architecture worsens → targeted fix needed.

---

## 10. Benchmark maintenance rules

1. Do not rotate the whole set casually.
2. Add new hard cases only when new failure patterns emerge.
3. Archive prior benchmark outputs.
4. Version-control accepted outputs and reviewer notes.
5. Recalibrate reviewers periodically.

---

## 11. Minimum 2.0 release threshold (recommended)

For a release candidate to ship:

- Mean Semantic Preservation ≥ 7.5
- Mean Press-Print Identity ≥ 8.0
- Mean Reconstruction Strength ≥ 7.5
- Mean Editorial Hierarchy ≥ 7.5
- Mean Source Specificity ≥ 7.0
- Mean Generic AI Polish Penalty ≤ 3.5
- Mean Decorative Noise Penalty ≤ 3.5
- Mean Cinematic Realism Drift ≤ 3.0

These thresholds are starting points, not holy scripture.  
If experience shows they are wrong, recalibrate them with evidence—not vibes.

---

## 12. Final benchmark principle

The benchmark is not meant to reward maximal spectacle.

It is meant to ensure that Press-Print keeps doing something specific and difficult:

> **turning existing images into reconstructed, designed compositions without losing the image’s essential identity or Press-Print’s own.**
