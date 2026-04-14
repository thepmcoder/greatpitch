# Research Synthesis: AI-Assisted Pitch Video Creation

> **Source:** Deep research from Perplexity and ChatGPT (April 2026)
> **Full research:** See `deep-research-full.md` (53.7KB, 89 citations)

## The Landscape (What Exists)

### Commercial Tools
- **Avatar-focused:** Synthesia, HeyGen, D-ID — talking-head videos from scripts with lip-synced TTS
- **Deck-to-video:** Mootion (investor pitch specific), Fliki Pitch Maker, SlideSpeak, Google Vids
- **Generic text-to-video:** VEED, Kapwing, Lumen5, Pictory, InVideo
- **Programmatic:** Remotion (React-based), Shotstack (API), JSON2Video

### Word-Level Sync (The Key Landscape Gap)
- **Synthesia Triggers:** Drag animations onto script words in GUI — word-anchored, but GUI-only, no API
- **HeyGen AI Studio:** Script-based animation markers — same concept, same limitation
- **WhisperX / Whisper:** Produce word-level timestamps from audio — enabling technology, not a pipeline
- **No open standard exists** for declarative word-anchored scene definitions

### Academic Work
- **PaperTalker** (2024): Multi-agent system generating presentation videos from papers
- **Paper2Video** (2025): Similar multi-agent approach with explicit quality metrics
- **Persuading Investors** (2024): Behavioral research on what makes pitch videos persuasive (delivery, affect, nonverbal cues)

## Our Differentiation

| Dimension | Existing Tools | greatpitch |
|-----------|---------------|------------|
| Sync model | GUI drag-and-drop on words (Synthesia/HeyGen) OR timecodes (Remotion) | Declarative JSON with word anchors |
| Accessibility | Vendor-locked editors | Open format, any assembler |
| Programmability | Limited API access to word-level sync | First-class API primitive |
| Domain focus | Generic video or generic pitch | Optimized for investor/explainer pitch narratives |
| AI integration | AI generates script, human edits timeline | AI generates script + scene plan + anchors end-to-end |

## Key Insight: Incrementally Novel, Not Revolutionary

The word-anchor concept is **not new** — Synthesia and HeyGen already do it internally. What's new is:
1. **Open declarative format** — no vendor lock-in
2. **Programmatic access** — API-first, not GUI-first
3. **End-to-end AI skill** — the AI produces the entire pipeline, not just the script

This is a packaging and accessibility innovation, not a fundamental research contribution.

## What Makes Pitch Videos Persuasive (Research Findings)

From "Persuading Investors" (behavioral study):
- **Delivery quality** matters more than slide design
- **Affective cues** (enthusiasm, confidence) influence investment decisions
- **Structured narrative** (problem → solution → traction → ask) is expected format
- **Pacing and pauses** are underrated — most AI-generated videos are too uniform

## Architecture Decision: The Pipeline

```
Script/Concept
    ↓
[Narrative Structurer] → structured script with scene boundaries
    ↓
[Scene Planner] → scene JSON with word anchors
    ↓
[TTS Engine] → audio + word-level timestamps (via WhisperX alignment)
    ↓
[Visual Generator] → images/charts per scene
    ↓
[Assembler] → final video (ffmpeg / Remotion / custom player)
```

Each stage is independent and replaceable. The scene JSON is the interchange format.

## Risk: "Skills as Prompts" Limitation

From ArtOfPM findings:
- **Procedural skills work** — step-by-step processes (like "how to structure a pitch") translate well to system prompts
- **Cognitive skills don't** — "how to think like a PM" constrains rather than expands AI reasoning
- Video production is procedural → greatpitch should work as a skill
- But: the CREATIVE aspects (narrative arc, emotional beats) may resist proceduralization
- Mitigation: keep creative guidance as heuristics, not prescriptions

## Next Steps

1. Define the word-anchor JSON schema (`docs/word-anchor-spec.md`)
2. Build the pitch-video skill (`skills/pitch-video/SKILL.md`)
3. Test against a real pitch (C2D as first example)
4. Evaluate: does the skill produce better videos than unguided AI?
