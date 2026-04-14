---
name: pitch-video
description: Produce a pitch video from a product concept using word-anchored synchronization
version: 1.1
type: procedural
---

# Pitch Video Production Skill

You produce pitch videos by generating a structured narrative, scene plan, and word-anchored scene JSON that an assembler can turn into a self-contained video.

## The Pipeline

You work in 5 stages. Complete each before moving to the next.

### Stage 1: Understand the Pitch

Read the product concept, pitch deck, or brief. Extract:
- **The problem** — what pain exists today
- **The insight** — why existing solutions fall short
- **The solution** — what this product does differently
- **The proof** — data, traction, or demonstrations that it works
- **The ask** — what you want from the audience

If any of these are unclear, ask. Don't invent.

### Stage 2: Structure the Narrative

Build the story arc. A pitch is NOT a feature list — it's a journey the audience takes.

**Proven structures:**

**The Reframe** (used in C2D pitch — most effective for internal strategy):
1. Open with the current state (honest, data-backed)
2. Show what's been tried and why it hasn't worked
3. Stress-test: even if everything works, is the ceiling high enough?
4. Arrive at the natural conclusion (the obvious answer)
5. Pause. Introduce a different lens (the reframe)
6. Apply the new lens — the obvious answer changes
7. Show the new approach with concrete examples
8. Circle back: does this new approach solve the original problems?
9. Close with a concrete ask

**The Classic** (standard investor pitch):
1. Problem → 2. Market size → 3. Solution → 4. Demo → 5. Traction → 6. Team → 7. Ask

**The Why-Now** (timing-driven):
1. What changed in the world → 2. What this enables → 3. Why we're positioned → 4. Evidence → 5. Ask

Pick the structure that fits the content. Don't force it.

**Rules:**
- Every section must earn its place. If you can cut it without losing the argument, cut it.
- Plant facts early, draw conclusions later. Let the audience connect dots.
- Questions > statements for engagement. "Can we always get this right?" beats "We don't need to be right every time."
- End with a concrete ask, not an emotional plea.

### Stage 3: Write the Narration

Write spoken narration for each section. Each section becomes one or more **clips**.

**Rules:**
- Each sentence must be self-contained — no reliance on audience remembering a term from 30 seconds ago.
- No internal jargon on screen. Replace "funnel" with "journey," "P0" with "key."
- Present hypotheses as hypotheses. "This is still a hypothesis" > "This will succeed."
- Use "we" for inclusive tone. "The team" for specific attribution.

**Clip design:**
- One clip per natural paragraph or thought unit
- Give each clip an ID: `s01_opening`, `s03b_awareness`, etc.
- Section number + descriptive name
- Suffix `a`, `b`, `c` for multiple clips within a section

### Stage 4: Design Scenes and Place Anchors

For each section, create a scene JSON file.

**Scene structure:**
```json
{
  "scene": "scene-03",
  "title": "We Know the Problems",
  "clips": ["s03b_awareness", "s03b_kitchensink"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s3-heading" }]
    },
    {
      "anchor": { "clip": "s03b_awareness", "word": "tried", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-3" },
        { "fn": "show", "id": "s3-experiments" }
      ]
    }
  ]
}
```

**Anchor placement rules (hard-won):**
1. **Anchor to words in the first 60% of the sentence.** Late anchors mean the visual appears after the audience has moved on.
2. **Anchor to meaningful words** — nouns, verbs that carry the point. Not "the," "and," "but."
3. **Use `n` to disambiguate** — if "growth" appears twice in a clip, specify `"n": 1` or `"n": 2`.
4. **One visual change per anchor** is clearest. Multiple actions on one anchor are fine for coordinated reveals (show X + hide Y).
5. **Use `{ "fixed": 0 }` for scene-start visuals** — headings, backgrounds, chapter markers.

**Visual design rules:**
- On-screen text is a SUBSET of narration, never a paraphrase. Same keywords, fewer words.
- Progressive reveal: content appears beat by beat, never all at once.
- Each visual element needs an ID that maps to HTML/CSS in the template.

**Actions:**
- `show` — make element visible
- `fade` — fade element out
- `clearAll` — hide all elements in a scene group
- Custom functions for domain-specific animations (cards, charts, countdowns)

### Stage 5: Build and Assemble

Produce and build these files:

1. **Narration script** — `generate-audio.js` format:
```javascript
const scenes = [
  { id: 's01_opening', text: `Your narration text here.` },
  { id: 's02_problem', text: `Next section narration.` },
];
```

2. **Scene JSONs** — one per scene (`scene-00.json` through `scene-NN.json`)

3. **HTML template** — visual elements with matching IDs, player logic, professional styling

4. **Run the pipeline** — generate audio → assemble (resolve anchors) → build final HTML

### Stage 6: Review and Fix

After building, review the output. This is not optional — every good video goes through multiple review passes.

**Narration review:**
- Read every clip's text aloud (or imagine it spoken). Does it flow naturally?
- Are there tongue-twisters, awkward phrasing, or sentences that need a breath mid-way?
- Does each sentence land on its own without needing context from 30 seconds ago?
- Fix any narration that sounds like writing, not speaking.

**Anchor review:**
- For each word anchor, find the word in the narration text. Count its position in the sentence.
- If the anchor word is past 60% of the sentence, move the anchor to an earlier word that still makes semantic sense.
- Check: does the visual appearing at this word ADD information, or is it redundant with what's being said?
- Remove anchors that trigger visuals the audience doesn't need.

**Visual review:**
- Does each on-screen text use the EXACT keywords from the narration (subset, not paraphrase)?
- Are there screens with too much text? Max 2 key phrases per screen.
- Does the progressive reveal make sense — does each element appear at the right narrative beat?

**Structural review:**
- Watch/trace the full sequence mentally: scene 0 → scene N. Does the story build?
- Is there a moment of tension or surprise? (If not, the pitch is a feature tour.)
- Does the ending have a concrete ask, not just "let's discuss"?

**If review finds issues:** Fix them. Regenerate audio if narration changed. Re-run assemble if anchors changed. Re-build final HTML. Then review again.

**Build checklist (final gate):**
- [ ] On-screen text uses exact narration keywords
- [ ] All anchors are in first 60% of their sentences
- [ ] Every clip ID in scene JSONs matches a narration clip
- [ ] No orphaned element IDs (referenced in triggers but undefined)
- [ ] Narrative arc is complete (problem → insight → solution → proof → ask)
- [ ] Narration sounds natural when spoken aloud
- [ ] No screen has more than 2 key phrases
- [ ] There is at least one moment of tension/surprise in the arc
- [ ] Final output HTML is self-contained and plays correctly

## What NOT to Do

- **Don't write a marketing brochure.** A pitch tells a story with tension and resolution.
- **Don't anchor to every sentence.** Only anchor visuals that ADD information beyond the narration.
- **Don't use timecodes.** The whole point is word anchors. If you catch yourself writing milliseconds, stop.
- **Don't pack slides with text.** Each screen should have 1-2 key phrases, not paragraphs.
- **Don't skip the narrative structure.** Jumping straight to scenes without Stage 2 produces a feature tour, not a pitch.
