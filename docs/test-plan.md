# Testing the Pitch Video Skill

> **Applying learnings from TopPM/ArtOfPM benchmark journey**

## Key Learnings Applied

| TopPM Learning | How It Applies Here |
|----------------|-------------------|
| Single-agent contamination | Scorer must NOT see the skill or know which condition produced the output |
| Blind labeling is non-negotiable | All outputs labeled Run-A/Run-B, condition hidden |
| Procedural skills work, cognitive don't | This IS procedural — but we need to verify it actually helps |
| Less is more | Skill is ~800 words (not 2000). If it hurts, we'll know |
| Scorer variance is 5-15pts | Need multiple scenarios to see signal through noise |
| The run is the run | Don't rationalize disappointing results |

## Test Design

### Conditions
1. **Raw** — no skill, just the product brief + "Create a pitch video plan"
2. **With Skill** — pitch-video SKILL.md in system prompt + same product brief
3. *(Optional)* **Skill + Principles** — skill + top 10 production principles

### Test Scenarios

3-5 product concepts, diverse enough to test different pitch structures:

| ID | Product | Type | Why It Tests the Skill |
|----|---------|------|----------------------|
| P01 | HealthTrack — AI wearable for elderly fall detection | Hardware + Service | Emotional narrative, regulatory concerns, clear demo moments |
| P02 | CodeReview AI — automated PR reviewer for teams | Developer tool | Technical audience, needs concrete examples, ROI-driven |
| P03 | FreshLocal — farm-to-door marketplace | Marketplace | Two-sided market, needs to show both supply and demand sides |
| P04 | StudyBuddy — AI tutor for K-12 | EdTech | Multiple stakeholders (parents, teachers, kids), trust-sensitive |
| P05 | GreenFleet — EV fleet management for delivery companies | B2B SaaS | Data-heavy, needs charts/metrics, TCO argument |

### Evaluation Dimensions

Scoring each output /100 (4 dimensions x 25):

| Dimension | /25 | What It Measures |
|-----------|-----|-----------------|
| **Narrative Structure** | 25 | Does the pitch follow a compelling arc? Is there tension and resolution? Does it earn its conclusion? |
| **Scene Design** | 25 | Are scenes well-decomposed? Do clips map to natural thought units? Is the scene JSON valid and assemblable? |
| **Anchor Quality** | 25 | Are word anchors placed early in sentences? On meaningful words? Do they add information? Are there enough but not too many? |
| **Production Readiness** | 25 | Could this actually be built? Are narration clips natural when spoken? On-screen text matches narration? Build checklist passable? |

### Anti-Contamination Protocol

1. **2-agent isolation**: One agent generates the pitch plan (with or without skill). A SEPARATE agent scores it.
2. **Blind labels**: Scorer sees "Run-A" and "Run-B" — doesn't know which is raw vs skilled.
3. **One transcript per scorer**: Each scorer sees ONE output only. No cross-contamination.
4. **Scorer gets the product brief + scoring rubric**: NOT the skill itself.

### Execution Plan

```
For each product concept (P01-P05):
  1. Generate raw output (no skill in system prompt)
  2. Generate skilled output (SKILL.md in system prompt)
  3. Blind-label both outputs
  4. Dispatch 2 independent scorers (one per output)
  5. Collect scores
  6. Unblind and aggregate
```

Total: 5 concepts × 2 conditions = 10 outputs, 10 independent scorers.

### Success Criteria

Based on TopPM findings:
- **If skill helps by ≥ 5pts mean**: Genuine signal. Procedural skills work.
- **If skill helps by 1-4pts**: Scenario-dependent, like pushback prompt.
- **If skill hurts or neutral**: The skill is constraining, even as a procedural prompt.
- **If skill helps on some dimensions but hurts others**: Partial value — worth investigating which parts help.

### Calibration

Unlike TopPM (which had 195+ prior transcripts for calibration), this is a new domain. We need:
1. First run = establish baselines, not draw conclusions
2. Score 2-3 outputs yourself first to calibrate the rubric
3. Adjust dimensions if they don't discriminate

### What We're Really Testing

The meta-question: **Does a procedural skill help an AI produce better pitch videos?**

If yes → procedural skills are a genuine category of useful AI augmentation.
If no → even procedural skills don't help, and the TopPM finding generalizes beyond cognitive tasks.

This is a direct test of the hypothesis we formed during the TopPM journey.
