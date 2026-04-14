# C2D Pipeline — Reference Implementation

> **Source:** The Click-to-Do pitch video build (April 2026)
> **Versions built:** 4 (original 19-scene, short 14-scene, 10min 15-scene, v3 17-scene)
> **Status:** Working — produced a self-contained HTML video player with word-synced animations

## Architecture

```
Script (narration text per clip)
    |
    v
generate-audio.js  -->  .mp3 files + .metadata.json (word boundaries)
    |                        |
    v                        v
Scene JSONs (tools/scenes/)  -->  assemble.js  -->  patched HTML template
    |                                                     |
    v                                                     v
build-video.js  -->  click-done-video-final.html (self-contained, ~20MB)
```

## The Scene JSON Format (What We Actually Built)

Each scene is a JSON file (`scene-NN.json`) with this structure:

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
        { "fn": "show", "id": "s3-experiments" },
        { "fn": "showExperimentCards" }
      ]
    },
    {
      "anchor": { "clip": "s03b_kitchensink", "word": "product", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-known-for" },
        { "fn": "show", "id": "s3-identity-punch" }
      ]
    }
  ]
}
```

### Anchor Types

| Type | Example | Usage |
|------|---------|-------|
| **Fixed** | `{ "fixed": 0 }` | Show at scene start (0ms offset) |
| **Word-anchored** | `{ "clip": "s03b_awareness", "word": "tried", "n": 1 }` | Show when 1st occurrence of "tried" is spoken in clip |

### Action Types

| Action | Description |
|--------|-------------|
| `show` | Make element visible (fade-in) |
| `fade` | Fade element out |
| `clearAll` | Hide all elements in a scene group |
| `showExperimentCards` | Custom animation (domain-specific) |
| `dimExperimentCards` | Custom animation (domain-specific) |

### Key Design Decisions

1. **Clips, not sentences.** Each narration segment has a clip ID (e.g., `s03b_awareness`). Anchors reference clip + word, not raw text position.

2. **`n` for disambiguation.** When a word appears multiple times in a clip, `n` selects the nth occurrence (1-based).

3. **Actions are functions, not CSS.** The scene JSON declares intent (`show`, `fade`), the HTML template implements them. This separates content from presentation.

4. **Fixed anchors for scene-start events.** `{ "fixed": 0 }` handles chapter titles, background changes, and other scene-start visuals.

## TTS Pipeline

```javascript
// generate-audio.js uses msedge-tts
const tts = new MsEdgeTTS();
await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
  wordBoundaryEnabled: true,    // <-- This is the key: word-level timestamps
  sentenceBoundaryEnabled: true
});
await tts.toFile(tempDir + '/', scene.text);
```

Output per clip:
- `clipname.mp3` — audio
- `clipname.metadata.json` — word boundaries: `{ Type: "WordBoundary", Data: { Offset, Duration, text: { Text } } }`

Metadata is converted during build: `{ t: offsetMs, d: durationMs, w: "word" }`

## Assembly (assemble.js)

The assembler:
1. Loads all metadata files
2. For each scene JSON, resolves word anchors to millisecond delays
3. The `T()` function finds the Nth occurrence of a word in a clip's metadata
4. Adds a `LEAD_MS` anticipation offset (visual appears slightly before the word)
5. Generates a JavaScript `SCENES` array
6. Patches it into the HTML template

## Build (build-video.js)

1. Reads all .mp3 files, converts to base64
2. Reads all .metadata.json files
3. Injects both into the HTML template as `AUDIO_DATA` and `WORD_META` constants
4. Output: single self-contained HTML file (~20MB)

## Quality Tools

### audit-anchors.js
Validates that word anchors aren't placed too late in their sentences (>60% position). Late anchors mean visuals appear after the audience has already processed the sentence.

### Build Checklist (VIDEO-BUILD-CHECKLIST.md)
- On-screen text uses exact narration keywords
- Visual spec derived from CURRENT script
- Animations synced to audio position, NOT setTimeout
- Word metadata loaded and validated
- End-to-end playback verification

## Lessons Learned

1. **Audio-position triggers, never wall-clock timers.** `setTimeout` drifts. `requestAnimationFrame` polling `audio.currentTime` cannot drift.

2. **Word anchors should be early in sentences.** Anchoring to a word at 80% of a sentence means the visual appears when the audience has already moved on.

3. **On-screen text must be a subset of narration, not a paraphrase.** Different wording creates cognitive dissonance.

4. **The script is the timeline.** Re-record narration → anchors still work. Change voice → same. Edit script → only affected scenes update.

5. **Self-contained HTML is the killer output format.** No server, no dependencies, email-able, works offline. 20MB is acceptable for a pitch video.
