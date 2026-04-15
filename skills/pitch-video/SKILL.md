---
name: pitch-video
description: Produce a pitch video from a product concept using word-anchored synchronization
version: 1.3
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
- **The audience** — who is watching? What's their attention span?
- **The slot** — how long do you have? This determines EVERYTHING about pacing.

If any of these are unclear, ask. Don't invent.

**Audience shapes every decision:**

| Audience | Slot | Pacing | Tone |
|----------|------|--------|------|
| VCs / investors | 10-20 min | Measured, data-driven, build the case | Confident, precise |
| Internal leadership | 5-15 min | Strategic, reframe-driven, earn the conclusion | Honest, collaborative |
| Demo day / students | 60-90 sec | Fast, punchy, hook in 5 seconds | Energetic, direct |
| Conference / general | 2-5 min | Clear, visual, one big idea | Accessible, memorable |

**If the slot is 90 seconds or less**, you cannot use The Reframe or The Classic. Use The Lightning (see Stage 2).

**Multi-audience versioning:**
If the product could be pitched to multiple audiences, identify ALL relevant audiences and produce a separate version for each. Same product, different cuts:

| Example product | Audience 1 | Audience 2 | Audience 3 |
|----------------|------------|------------|------------|
| Student platform | Demo day (Lightning, 60s) | Investor (Classic, 5min) | University admin (Why-Now, 3min) |
| Dev tool | Engineering team (Lightning, 90s) | VP Eng (Classic, 5min) | CFO (Why-Now, 3min) |
| Consumer app | Social media (Lightning, 30s) | Investor (Classic, 10min) | Press (Why-Now, 2min) |

Each version gets its own narrative structure, pacing, and CTA — but shares the same core product facts. Don't just shorten the long version. Redesign from scratch for each audience.

### Stage 2: Structure the Narrative

Build the story arc. A pitch is NOT a feature list — it's a journey the audience takes.

**Proven structures:**

**The Lightning** (demo day, student audience, ≤90 seconds):
1. Hook — one sentence that makes them look up (5 sec)
2. Pain — the problem in one vivid example, not statistics (10 sec)
3. "What if" — the product idea in one line (5 sec)
4. Show, don't tell — fastest demo/example you have (20-30 sec)
5. One killer stat — the single most impressive number (10 sec)
6. CTA — exactly what to do next: "scan this," "find us at booth 3" (5 sec)
Total: ~60-75 seconds. No framework tours. No market sizing. No team slides.

**The Reframe** (internal strategy, 5-15 min — most effective when the audience holds the wrong conclusion):
1. Open with the current state (honest, data-backed)
2. Show what's been tried and why it hasn't worked
3. Stress-test: even if everything works, is the ceiling high enough?
4. Arrive at the natural conclusion (the obvious answer)
5. Pause. Introduce a different lens (the reframe)
6. Apply the new lens — the obvious answer changes
7. Show the new approach with concrete examples
8. Circle back: does this new approach solve the original problems?
9. Close with a concrete ask

**The Classic** (standard investor pitch, 10-20 min):
1. Problem → 2. Market size → 3. Solution → 4. Demo → 5. Traction → 6. Team → 7. Ask

**The Why-Now** (timing-driven, 3-10 min):
1. What changed in the world → 2. What this enables → 3. Why we're positioned → 4. Evidence → 5. Ask

Pick the structure that fits the AUDIENCE and SLOT, not just the content. A 4-minute Reframe at a demo day will lose the room.

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

**HTML/CSS execution rules (prevent visual bugs):**
- **Player controls bar** must have `z-index: 9999` and a solid background — nothing renders underneath or on top of it.
- **Every element uses `position: absolute`** within the stage container. Use explicit `top`, `left`, `width`, `height` to prevent overlap.
- **Content areas stay within safe zone:** keep all text and visuals within `top: 60px` to `bottom: 100px` to avoid clipping behind controls.
- **Every `show` must have a matching `clearAll` or `fade`** at the next scene transition. Trace through ALL scenes: if an element appears in scene 2, when does it disappear? If the answer is "never," that's a stuck-text bug.
- **Z-index layering order:** backgrounds (1) → content cards (10) → stat numbers (20) → headings (30) → controls bar (9999). Never put content above the controls bar.
- **Test overlap mentally:** for each scene, list every visible element and its position. Do any occupy the same screen region? If yes, one must `fade` before the other `show`s.
- **Font sizes must be readable at 1920×1080:** minimum 24px for body text, 48px+ for headings, 96px+ for hero stat numbers.
- **Maximum 3 elements visible simultaneously** (excluding background). More than 3 = visual clutter. If you need more, sequence them.

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

3. **HTML template** — visual elements with matching IDs, player logic, professional styling. Follow the HTML/CSS execution rules from Stage 4 strictly.

4. **Run the pipeline** — generate audio → assemble (resolve anchors) → build final HTML

5. **Export MP4** — after the self-contained HTML is built, create an MP4 video:
```javascript
// export-mp4.js — uses Playwright to record the HTML playing
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: './', size: { width: 1920, height: 1080 } }
  });
  const page = await context.newPage();
  await page.goto('file://' + path.resolve('click-done-video-final.html'));
  // Auto-play: click the play button
  await page.click('#play-btn', { timeout: 5000 }).catch(() => {});
  // Wait for video to finish (estimate from narration length + buffer)
  await page.waitForTimeout(DURATION_MS + 3000);
  await context.close();
  await browser.close();
  // Playwright saves as .webm — rename to match
  console.log('MP4/WebM exported');
})();
```
If Playwright is not available, the self-contained HTML is the primary deliverable. MP4 is a nice-to-have.

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

**CSS/HTML bug review (critical — these are the most common bugs):**
- **Stuck text check:** For EVERY element that gets `show`ed, trace forward through all subsequent scenes. When does it get `clearAll`ed or `fade`d? If the answer is "never" or "not until 3 scenes later," that's a bug. Fix it.
- **Overlap check:** For each scene, list every element that's visible at that moment (including elements from previous scenes that weren't cleared). Do any overlap? If yes, one must be cleared.
- **Controls bar check:** Is the player controls bar (play/pause, progress) at `z-index: 9999` with a solid background? Can any content element appear on top of or behind it?
- **Safe zone check:** Is all content within `top: 60px` to `bottom: 100px`? Content outside this range will be clipped or hidden behind controls.
- **Font readability:** Any text below 24px? Any hero numbers below 72px? Fix sizing.

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
