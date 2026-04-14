# Word-Anchor Scene Specification

> **Version:** 0.2 (based on working C2D implementation)
> **Status:** Proven in production — 4 video versions built with this format

## Concept

A word-anchor scene spec is a declarative JSON format that describes a video as a sequence of scenes, where visual events are bound to spoken words rather than timecodes.

## Why Not Timecodes?

Timecodes are fragile:
- Re-record narration → all timecodes break
- Change TTS voice → all timecodes break  
- Edit script → manual re-timing of everything

Word anchors are durable:
- Re-record → visuals still sync to the same words
- Change voice → same
- Edit script → only affected scenes need updating

## Schema (Proven)

This is the format we actually built and tested across 4 video versions (60+ scenes, 200+ triggers):

```json
{
  "scene": "scene-03",
  "title": "We Know the Problems",
  "clips": ["s03b_awareness", "s03b_kitchensink", "s03b_companion"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s3-question" }]
    },
    {
      "anchor": { "clip": "s03b_awareness", "word": "tried", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-3" },
        { "fn": "show", "id": "s3-tried" },
        { "fn": "showExperimentCards" }
      ]
    },
    {
      "anchor": { "clip": "s03b_kitchensink", "word": "product", "n": 1 },
      "delayMs": -200,
      "actions": [
        { "fn": "fade", "id": "s3-known-for" },
        { "fn": "show", "id": "s3-identity-punch" }
      ]
    }
  ]
}
```

## Anchor Object

Two types:

### Fixed Anchor (scene-start events)
```json
{ "fixed": 0 }       // At scene start
{ "fixed": 500 }     // 500ms after scene start
```

### Word Anchor (the core innovation)
```json
{
  "clip": "s03b_awareness",  // Which narration clip
  "word": "tried",           // The spoken word
  "n": 1                     // 1st occurrence (disambiguates repeats)
}
```

### Optional: Anticipation Offset
```json
{
  "anchor": { "clip": "s03b_awareness", "word": "tried", "n": 1 },
  "delayMs": -200    // Visual appears 200ms BEFORE the word (anticipation)
}
```

## Action Types (Proven Set)

| Action | Description | Example |
|--------|-------------|---------|
| `show` | Make element visible | `{ "fn": "show", "id": "s3-question" }` |
| `fade` | Fade element out | `{ "fn": "fade", "id": "s3-known-for" }` |
| `clearAll` | Hide all elements in group | `{ "fn": "clearAll", "id": "scene-3" }` |
| Custom | Domain-specific animations | `{ "fn": "showExperimentCards" }` |

Actions are declarative intent — the presentation layer implements them. This separates content from rendering.

## Scene Structure

Each scene file (`scene-NN.json`) contains:

| Field | Type | Description |
|-------|------|-------------|
| `scene` | string | Scene identifier |
| `title` | string | Human-readable title |
| `clips` | string[] | Ordered list of narration clip IDs for this scene |
| `triggers` | array | Ordered list of anchor → actions mappings |

## Assembly Pipeline (Proven)

```
Narration clips (.mp3) + Word metadata (.metadata.json)
         +
Scene JSONs (tools/scenes/scene-NN.json)
         |
         v
    assemble.js  -->  Resolves word anchors to ms delays
         |              using T(meta, clips, clip, word, n)
         v
    HTML template  <--  Patched with SCENES array
         |
         v
    build-video.js  -->  Bakes audio (base64) + metadata into HTML
         |
         v
    click-done-video-final.html  (self-contained, ~20MB)
```

### Key Assembly Function: T()

```javascript
// Resolves a word anchor to a millisecond delay from scene start
T(metadata, sceneClips, clipId, word, nthOccurrence)
// Returns: cumulative ms offset (clip start offset + word offset within clip)
// Includes LEAD_MS anticipation constant
```

## TTS Integration

```javascript
// msedge-tts with word boundary metadata
const tts = new MsEdgeTTS();
await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
  wordBoundaryEnabled: true,
  sentenceBoundaryEnabled: true
});
```

Output per clip:
- `clipname.mp3` — audio file
- `clipname.metadata.json` — word boundaries: `{ t: offsetMs, d: durationMs, w: "word" }`

## Design Rules (Hard-Won)

1. **Anchor words early in sentences.** Words past 60% of sentence position mean the visual appears too late. The `audit-anchors.js` tool validates this.

2. **Audio-position triggers only.** Never `setTimeout`. Use `requestAnimationFrame` polling `audio.currentTime`. Wall-clock drifts; audio-position cannot.

3. **On-screen text = narration keywords, shortened.** Not paraphrased. Same words, fewer of them.

4. **One scene file per narrative section.** Scenes map to story beats, not arbitrary time chunks.

5. **Clips within scenes play sequentially.** Multiple clips per scene handle natural paragraph breaks without separate scene files.

## Extensibility

The format supports:
- **Custom actions** — any `fn` name works; the presentation layer defines behavior
- **Multiple actions per trigger** — a word anchor can fire several visual changes simultaneously
- **Mixed anchor types** — fixed and word-anchored triggers in the same scene
- **Anticipation offsets** — `delayMs` on triggers for visuals that should lead the narration
