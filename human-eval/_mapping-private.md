# A/B Mapping — PRIVATE (do not share with reviewers)

> **Date:** 2026-04-14
> **Randomization:** Balanced — 3 folders have A=skill, 3 have A=raw

| Folder | Video A | Video B |
|--------|---------|---------|
| p01-HealthTrack | **SKILL** | raw |
| p02-CodeReview | raw | **SKILL** |
| p03-FreshLocal | **SKILL** | raw |
| p04-StudyBuddy | raw | **SKILL** |
| p05-GreenFleet | **SKILL** | raw |
| p06-Elevate | raw | **SKILL** |

## Skill version
- pitch-video v1.1 (6 stages, includes review/fix loop)
- All videos built by independent Sonnet agents
- Skill agents read SKILL.md; raw agents got only the product brief + pipeline tools

## To unblind results
When reviewer says "Video A was better for P01":
→ Look up P01 in table above → A = SKILL → skill won that comparison

## Statistical notes
- 3/6 have skill as A, 3/6 have skill as B → order effect is controlled
- Each reviewer sees the same A/B assignment (not randomized per reviewer)
- For stronger design: randomize per reviewer (would need separate folder sets)
