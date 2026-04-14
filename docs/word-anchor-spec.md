# Word-Anchor Scene Specification

> **Version:** 0.1 (draft)
> **Status:** Design phase

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

## Schema (Draft)

```json
{
  "version": "0.1",
  "metadata": {
    "title": "Product Pitch",
    "duration_estimate": "3min",
    "voice": "alloy",
    "resolution": "1920x1080"
  },
  "scenes": [
    {
      "id": "scene-01",
      "narration": "Every product manager faces the same challenge: turning ambiguity into clarity.",
      "visuals": [
        {
          "type": "background",
          "src": "gradient-blue.png",
          "anchor": { "word": "Every", "index": 0 },
          "transition": "fade-in",
          "duration": "until-next"
        },
        {
          "type": "text-overlay",
          "content": "Ambiguity → Clarity",
          "anchor": { "word": "ambiguity", "index": 7 },
          "transition": "slide-up",
          "position": "center",
          "style": "heading-large"
        }
      ],
      "layout": "full-screen"
    }
  ]
}
```

## Anchor Object

```json
{
  "word": "revenue",     // The spoken word to anchor to
  "index": 3,            // 0-based word index in the narration string (disambiguates repeated words)
  "offset": "0ms"        // Optional: offset from word start (e.g., "-200ms" for anticipation)
}
```

## Visual Types

| Type | Description | Required Fields |
|------|-------------|----------------|
| `background` | Full-screen background image/video/color | src, anchor |
| `text-overlay` | Text displayed over background | content, anchor, position |
| `image` | Image element (chart, screenshot, photo) | src, anchor, position, size |
| `video-clip` | Embedded video segment | src, anchor, duration |
| `animation` | CSS/Lottie animation | animation-id, anchor |
| `avatar` | Talking head (if using avatar TTS) | avatar-id, anchor |

## Transitions

| Transition | Description |
|------------|-------------|
| `fade-in` | Opacity 0→1 over 300ms |
| `fade-out` | Opacity 1→0 over 300ms |
| `slide-up` | Slide from below over 400ms |
| `slide-left` | Slide from right over 400ms |
| `cut` | Instant appearance |
| `zoom-in` | Scale 0.8→1.0 over 500ms |

## Duration

| Value | Meaning |
|-------|---------|
| `"until-next"` | Visible until the next visual of same type appears |
| `"until-scene-end"` | Visible until scene ends |
| `"3s"` | Visible for 3 seconds after anchor |
| `"word-range"` | Visible from anchor word to specified end word |

## Assembly Pipeline

```
scene-spec.json + narration.mp3 + word-timestamps.json
                    ↓
              [Assembler]
                    ↓
              output.mp4
```

The assembler:
1. Reads scene spec
2. Reads word timestamps (from WhisperX or TTS engine)
3. Maps each anchor word to its timestamp
4. Renders visuals at computed times
5. Composites with narration audio
6. Outputs final video

## Open Questions

- Should scenes have explicit ordering or rely on narration flow?
- How to handle word anchors that span scene boundaries?
- Should the spec support conditional visuals (e.g., "if data available, show chart")?
- What's the minimum viable assembler? (ffmpeg script vs Remotion component vs custom player)
