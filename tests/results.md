# greatpitch Skill Test — Results

> **Date:** 2026-04-14
> **Model:** Claude Sonnet 4.6 (all generators and scorers)
> **Method:** 6 independent blind scorers, one per output, zero cross-contamination
> **Skill version:** pitch-video v1.0 (~800 words, procedural)

## Results

| Scenario | Raw | Skill | Delta | Skill Helps? |
|----------|-----|-------|-------|-------------|
| P01 HealthTrack | 80 | 79 | -1 | No |
| P02 CodeReview | 76 | 80 | **+4** | Yes |
| P03 FreshLocal | 77 | **83** | **+6** | Yes |
| **Mean** | **77.7** | **80.7** | **+3.0** | **Yes (moderate)** |

## Dimension Breakdown

| Dimension | Raw Mean | Skill Mean | Delta |
|-----------|----------|------------|-------|
| Narrative Structure | 19.7 | 21.0 | +1.3 |
| Scene Design | 20.3 | 21.7 | +1.3 |
| Anchor Quality | 17.7 | 17.7 | 0.0 |
| Production Readiness | 20.3 | 20.3 | 0.0 |

### Per-Scenario Dimension Detail

| Scenario | Dim | Raw | Skill |
|----------|-----|-----|-------|
| P01 | Narrative | 21 | 21 |
| P01 | Scene | 20 | 21 |
| P01 | Anchors | 19 | 17 |
| P01 | Production | 20 | 20 |
| P02 | Narrative | 19 | 21 |
| P02 | Scene | 21 | 22 |
| P02 | Anchors | 15 | 17 |
| P02 | Production | 21 | 20 |
| P03 | Narrative | 19 | 21 |
| P03 | Scene | 21 | 22 |
| P03 | Anchors | 17 | 19 |
| P03 | Production | 20 | 21 |

## Key Findings

### 1. The skill helps moderately (+3.0 pts mean)
Unlike TopPM (which hurt by -1.3 on Opus), the pitch-video skill shows a positive signal. This is consistent with the hypothesis that **procedural skills work where cognitive skills don't**.

### 2. Narrative Structure is where the skill adds most value (+1.3)
The skill's Stage 2 (structured arc options: Reframe, Classic, Why-Now) consistently produces better narrative flow. Raw outputs tend toward linear feature tours. Skilled outputs show more deliberate arc choices.

### 3. Anchor Quality is unchanged (0.0 delta)
Both conditions struggle with the 60% sentence position rule. The skill explicitly states this rule, but generators still violate it. Interestingly, skilled outputs sometimes CLAIM compliance while violating it (false checklist passes). This is a skill design issue — the rule is stated but not enforced.

### 4. Production Readiness is unchanged (0.0 delta)
Both conditions produce similarly complete (but imperfect) production specs. Missing items are similar: typography, animation timing, asset sourcing.

### 5. Scenario-dependent effect
- P01 (HealthTrack): Skill neutral (-1). The emotional health narrative works naturally without a skill.
- P02 (CodeReview): Skill helps (+4). Technical B2B pitch benefits from structured arc guidance.
- P03 (FreshLocal): Skill helps most (+6). Marketplace pitch (two-sided, complex) benefits from narrative framework.

### 6. No dimension is hurt by the skill
Unlike TopPM where Emergence/Depth were actively degraded, no dimension scores worse with the skill. The floor is preserved.

## Comparison with TopPM

| Aspect | TopPM (cognitive) | pitch-video (procedural) |
|--------|-------------------|--------------------------|
| Mean delta vs raw | -1.3 (hurts) | +3.0 (helps) |
| Any dimension hurt? | Yes (Emergence) | No |
| Worst scenario | -2.4 | -1 |
| Best scenario | n/a (all negative) | +6 |
| Skill length | ~2000 words | ~800 words |
| Skill type | Cognitive (how to think) | Procedural (how to build) |

## Interpretation

**The procedural vs cognitive hypothesis is supported.** A procedural skill that teaches steps (structure narrative → write clips → place anchors → verify checklist) adds measurable value. A cognitive skill that teaches patterns (think in three rings, frame audit, altitude shifts) constrains natural reasoning.

**Caveats:**
- 3 scenarios is small (same caveat we had with pushback's initial 3)
- Single model (Sonnet) — cross-model validation needed
- No calibration anchors for this domain yet
- Scorer variance likely 5-10 pts (from ArtOfPM findings)
- The +3 could be within noise; +6 on P03 is more convincing

## Next Steps (if pursuing)

1. **Replicate on more scenarios** (5-7 more products) to see if +3 holds
2. **Fix anchor quality** — the skill states the 60% rule but doesn't enforce it. Add worked examples of good vs bad anchor placement
3. **Cross-model test** — does the skill help Opus? GPT-5.4?
4. **Human evaluation** — show raw vs skilled outputs to someone who builds pitch videos
5. **Build test** — actually assemble one skilled output into a video, see if it works end-to-end

## Blind Labels

| Label | Condition | Scorer |
|-------|-----------|--------|
| Run-A | P01 Raw | score-gp-a |
| Run-B | P01 Skill | score-gp-b |
| Run-C | P02 Raw | score-gp-c |
| Run-D | P02 Skill | score-gp-d |
| Run-E | P03 Raw | score-gp-e |
| Run-F | P03 Skill | score-gp-f |
