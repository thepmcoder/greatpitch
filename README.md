# greatpitch

An AI skill for creating high-quality pitch videos using word-anchored synchronization.

## What is this?

**greatpitch** is a procedural skill that teaches AI assistants how to produce pitch/explainer videos by:

1. **Structuring a narrative** from a product concept or pitch deck
2. **Generating a scene plan** with word-level visual anchors (not timecodes)
3. **Producing TTS narration** with word-level timestamps
4. **Assembling the final video** with visuals synchronized to spoken words

The core innovation is treating **word-level synchronization as a first-class primitive** via an open declarative format — not locked inside a GUI editor like Synthesia or HeyGen.

## Why "word anchors"?

Traditional video pipelines use timecodes (e.g., "show chart at 00:14.3s"). This breaks whenever you re-record narration, change pacing, or swap TTS voices.

Word anchors bind visuals to *what is being said*, not *when* it's said:

```json
{
  "anchor_word": "revenue",
  "anchor_index": 3,
  "visual": "chart-revenue-growth.png",
  "transition": "fade-in"
}
```

Re-record the narration? The chart still appears when "revenue" is spoken. Change the voice? Same. The script is the timeline.

## Why a "skill"?

Our research on AI prompt engineering (see [ArtOfPM](https://github.com/thepmcoder/ArtOfPM)) found that **procedural skills** (step-by-step processes) work effectively as AI system prompts, while **cognitive skills** (how to think) don't. Video production is inherently procedural — a perfect fit.

## Repo Structure

```
greatpitch/
├── README.md                 # This file
├── research/                 # Deep research on video tools landscape
│   ├── deep-research-full.md # Perplexity + ChatGPT deep research
│   └── synthesis.md          # Distilled findings
├── docs/
│   ├── word-anchor-spec.md   # Declarative scene JSON format
│   └── landscape.md          # Tool landscape summary
├── skills/
│   └── pitch-video/
│       └── SKILL.md          # The production skill
├── examples/                 # Sample outputs
└── pipeline/                 # Assembly scripts
```

## Status

🔬 **Research phase** — deep research complete, synthesis in progress, skill design next.

## Related

- [ArtOfPM](https://github.com/thepmcoder/ArtOfPM) — PM thinking quality benchmark (where we learned procedural > cognitive for AI skills)
- [topPM](https://github.com/thepmcoder/topPM) — PM thinking skill (the cognitive skill that taught us what doesn't work)

## License

MIT
