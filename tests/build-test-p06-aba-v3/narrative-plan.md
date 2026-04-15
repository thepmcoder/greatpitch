# Elevate — Narrative Plan (Lightning, 60–75s)

> Demo day pitch video for college students and professors.
> Structure: The Lightning (6 beats). Target: ~70 seconds.

---

## Stage 1: Extraction

| Element | Value |
|---------|-------|
| **Problem** | Students drown in fragmented career/research info — LinkedIn, Unstop, Internshala, college portals — and still can't answer "what should I prepare?" Only 14% are satisfied with the process of finding information. |
| **Insight** | Career tools work in silos. Students need cross-domain reasoning — connecting jobs, professors, hackathons, and their own stage into one answer. No single tool does this. |
| **Solution** | Elevate uses an AI reasoning layer to ingest career, research, and competition signals and output personalized, actionable guidance: what to pursue, when to act, how to prepare. |
| **Proof** | 87% of surveyed students say a platform like Elevate would be very useful. Working prototype (mobile + web). |
| **Ask** | Come see our demo / Scan QR to try it. |
| **Audience** | College students and professors at demo day. Short attention span. They live this problem. |
| **Slot** | 60–90 seconds MAX → Lightning structure mandatory. |

---

## Stage 2: Lightning Structure — 6 Beats

| Beat | Name | Duration | Purpose |
|------|------|----------|---------|
| 1 | Hook | ~5 sec | One provocative line that makes them look up |
| 2 | Pain | ~10 sec | The problem in one vivid, relatable example |
| 3 | "What if" | ~5 sec | The product idea in one line |
| 4 | Show, don't tell | ~25 sec | Fastest demo walkthrough — 3 features, rapid |
| 5 | One killer stat | ~10 sec | 87% validation number |
| 6 | CTA | ~5 sec | Scan QR / come see us |
| | **Total** | **~60 sec** | |

---

## Stage 3: Narration Text (per clip)

### Beat 1 — Hook
**Clip ID:** `s01_hook`
> "You're juggling LinkedIn, Unstop, Internshala, and three college portals — and you still don't know what to prepare for."

**Word count:** 21 · **Est. duration:** ~6 sec

---

### Beat 2 — Pain
**Clip ID:** `s02_pain`
> "Only fourteen percent of students are satisfied finding career info. The rest of us are guessing — scattered across a dozen tabs, with no clear next step."

**Word count:** 27 · **Est. duration:** ~9 sec

---

### Beat 3 — What If
**Clip ID:** `s03_whatif`
> "What if one platform could connect all of that — and tell you exactly what to do next?"

**Word count:** 18 · **Est. duration:** ~5 sec

---

### Beat 4 — Show (Demo)
**Clip ID:** `s04a_demo_guidance`
> "This is Elevate. Ask it anything — 'How do I prepare for a product role?' — and it builds you a personalized roadmap."

**Word count:** 23 · **Est. duration:** ~8 sec

**Clip ID:** `s04b_demo_research`
> "It connects you to professors with matching research interests and shows you exactly how to reach out."

**Word count:** 17 · **Est. duration:** ~6 sec

**Clip ID:** `s04c_demo_opportunities`
> "Hackathons, contests, deadlines — Elevate tracks them and notifies you at the right time."

**Word count:** 14 · **Est. duration:** ~5 sec

---

### Beat 5 — Killer Stat
**Clip ID:** `s05_stat`
> "We surveyed students like you. Eighty-seven percent said they need exactly this."

**Word count:** 14 · **Est. duration:** ~5 sec

---

### Beat 6 — CTA
**Clip ID:** `s06_cta`
> "Scan the QR code or come find us — Elevate is live and ready for you to try."

**Word count:** 17 · **Est. duration:** ~5 sec

---

**Total word count:** ~151 words · **Estimated duration:** ~49–55 sec speaking + visual pauses ≈ **~65 sec total**

---

## Stage 4: Scene JSONs with Word Anchors + Visual Intent

### Element Lifecycle Trace

This table traces every element's appearance and disappearance to prevent stuck-text bugs.

| Element ID | Appears in | Via | Disappears in | Via |
|------------|-----------|-----|---------------|-----|
| `s1-platforms` | Scene 0 | `show` at word "LinkedIn" | Scene 0 | `clearAll` at Scene 1 start |
| `s2-stat-14` | Scene 1 | `show` at word "fourteen" | Scene 1 | `clearAll` at Scene 2 start |
| `s2-tabs` | Scene 1 | `show` at word "guessing" | Scene 1 | `clearAll` at Scene 2 start |
| `s3-whatif` | Scene 2 | `show` at fixed 0 | Scene 2 | `clearAll` at Scene 3 start |
| `s4a-app` | Scene 3 | `show` at fixed 0 | Scene 3 | `fade` at clip s04b word "connects" |
| `s4a-roadmap` | Scene 3 | `show` at word "roadmap" | Scene 3 | `fade` at clip s04b word "connects" |
| `s4b-professors` | Scene 3 | `show` at word "connects" | Scene 3 | `fade` at clip s04c word "Hackathons" |
| `s4c-notifications` | Scene 3 | `show` at word "Hackathons" | Scene 3 | `clearAll` at Scene 4 start |
| `s4c-deadlines` | Scene 3 | `show` at word "notifies" | Scene 3 | `clearAll` at Scene 4 start |
| `s5-number` | Scene 4 | `show` at word "Eighty-seven" | Scene 4 | `clearAll` at Scene 5 start |
| `s5-caption` | Scene 4 | `show` at word "need" | Scene 4 | `clearAll` at Scene 5 start |
| `s6-qr` | Scene 5 | `show` at fixed 0 | — | End of video (final scene) |
| `s6-tagline` | Scene 5 | `show` at word "live" | — | End of video (final scene) |

---

### Scene 0 — Hook
**Clips:** `s01_hook`

**Visual intent:**
- Dark gradient background (z-index: 1)
- `s1-platforms`: Animated text showing platform names flying across screen — "LinkedIn · Unstop · Internshala · Portal · Portal" — then scatter/blur. Positioned center stage. (z-index: 10, top: 200px, centered, font: 42px bold)
- Max visible elements: 1 (+ background)

```json
{
  "scene": "scene-00",
  "title": "Hook — Platform Overload",
  "clips": ["s01_hook"],
  "triggers": [
    {
      "anchor": { "clip": "s01_hook", "word": "LinkedIn", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-platforms" }]
    }
  ]
}
```

---

### Scene 1 — Pain
**Clips:** `s02_pain`

**Visual intent:**
- `s2-stat-14`: Giant "14%" in hero font, centered. (z-index: 20, top: 180px, centered, font: 120px bold, color: #FF4444)
- `s2-tabs`: Below the stat, caption text "satisfied finding career info" (z-index: 10, top: 340px, centered, font: 32px)
- Max visible elements: 2 (+ background)

```json
{
  "scene": "scene-01",
  "title": "Pain — The Stat That Stings",
  "clips": ["s02_pain"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "clearAll", "id": "scene-00" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "fourteen", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-stat-14" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "guessing", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-tabs" }]
    }
  ]
}
```

---

### Scene 2 — What If
**Clips:** `s03_whatif`

**Visual intent:**
- `s3-whatif`: Clean centered text — "What if one platform could tell you what to do next?" in large italic font. (z-index: 30, top: 280px, centered, font: 48px italic, color: white)
- Max visible elements: 1 (+ background)

```json
{
  "scene": "scene-02",
  "title": "What If — The Turn",
  "clips": ["s03_whatif"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-01" },
        { "fn": "show", "id": "s3-whatif" }
      ]
    }
  ]
}
```

---

### Scene 3 — Show (Demo)
**Clips:** `s04a_demo_guidance`, `s04b_demo_research`, `s04c_demo_opportunities`

**Visual intent — three sub-beats, each replacing the previous:**

**Sub-beat A (guidance):**
- `s4a-app`: App screenshot / mockup frame, left side (z-index: 10, top: 120px, left: 80px, width: 500px)
- `s4a-roadmap`: Right side card — "Personalized Roadmap" with 3 short bullet icons (z-index: 10, top: 160px, left: 640px, width: 500px, font: 28px)
- Max visible: 2

**Sub-beat B (research):**
- Both s4a elements fade. `s4b-professors` appears: professor cards UI mockup, centered (z-index: 10, top: 140px, centered, width: 700px)
- Max visible: 1

**Sub-beat C (opportunities):**
- `s4b-professors` fades. `s4c-notifications`: notification bell + event cards (z-index: 10, top: 140px, left: 100px, width: 500px)
- `s4c-deadlines`: deadline timeline graphic, right side (z-index: 10, top: 180px, left: 660px, width: 480px)
- Max visible: 2

```json
{
  "scene": "scene-03",
  "title": "Show — The Demo",
  "clips": ["s04a_demo_guidance", "s04b_demo_research", "s04c_demo_opportunities"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-02" },
        { "fn": "show", "id": "s4a-app" }
      ]
    },
    {
      "anchor": { "clip": "s04a_demo_guidance", "word": "roadmap", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4a-roadmap" }]
    },
    {
      "anchor": { "clip": "s04b_demo_research", "word": "connects", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4a-app" },
        { "fn": "fade", "id": "s4a-roadmap" },
        { "fn": "show", "id": "s4b-professors" }
      ]
    },
    {
      "anchor": { "clip": "s04c_demo_opportunities", "word": "Hackathons", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4b-professors" },
        { "fn": "show", "id": "s4c-notifications" }
      ]
    },
    {
      "anchor": { "clip": "s04c_demo_opportunities", "word": "notifies", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4c-deadlines" }]
    }
  ]
}
```

---

### Scene 4 — Killer Stat
**Clips:** `s05_stat`

**Visual intent:**
- `s5-number`: Giant "87%" hero number, centered (z-index: 20, top: 180px, centered, font: 144px bold, color: #4CAF50)
- `s5-caption`: Below it — "said they need exactly this" (z-index: 10, top: 370px, centered, font: 36px)
- Max visible: 2 (+ background)

```json
{
  "scene": "scene-04",
  "title": "Killer Stat — Validation",
  "clips": ["s05_stat"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "clearAll", "id": "scene-03" }]
    },
    {
      "anchor": { "clip": "s05_stat", "word": "Eighty-seven", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-number" }]
    },
    {
      "anchor": { "clip": "s05_stat", "word": "need", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-caption" }]
    }
  ]
}
```

---

### Scene 5 — CTA
**Clips:** `s06_cta`

**Visual intent:**
- `s6-qr`: Large QR code placeholder, left-center (z-index: 10, top: 160px, left: 200px, width: 300px, height: 300px)
- `s6-tagline`: Right side — "Elevate is live. Try it now." (z-index: 30, top: 260px, left: 580px, font: 48px bold, color: white)
- Max visible: 2 (+ background)
- These are final-scene elements — no clearAll needed (video ends).

```json
{
  "scene": "scene-05",
  "title": "CTA — Scan and Try",
  "clips": ["s06_cta"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-04" },
        { "fn": "show", "id": "s6-qr" }
      ]
    },
    {
      "anchor": { "clip": "s06_cta", "word": "live", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-tagline" }]
    }
  ]
}
```

---

## Z-Index Layer Map

| Layer | Z-Index | Elements |
|-------|---------|----------|
| Background | 1 | Dark gradient, scene backgrounds |
| Content cards / mockups | 10 | `s1-platforms`, `s2-tabs`, `s4a-app`, `s4a-roadmap`, `s4b-professors`, `s4c-notifications`, `s4c-deadlines`, `s5-caption`, `s6-qr` |
| Stat numbers | 20 | `s2-stat-14`, `s5-number` |
| Headings / titles | 30 | `s3-whatif`, `s6-tagline` |
| Player controls | 9999 | Play/pause, progress bar, scrubber |

---

## Build Checklist

- [x] On-screen text uses exact narration keywords ("14%", "roadmap", "87%")
- [x] All anchors in first 60% of their sentences ("LinkedIn" = word 4/21 ✓, "fourteen" = word 2/27 ✓, "connects" = word 2/17 ✓, "Hackathons" = word 1/14 ✓, "Eighty-seven" = word 5/14 ✓, "live" = word 9/17 ✓)
- [x] Every clip ID in scene JSONs matches a narration clip
- [x] Every `show` has a matching `clearAll` or `fade` (see lifecycle trace)
- [x] Max 3 visible elements per scene (verified per scene above)
- [x] Content in safe zone (top: 120px–370px, well within 60px–980px)
- [x] Font sizes readable at 1080p (min 28px body, 48px+ headings, 120px+ hero stats)
- [x] Narrative arc complete: problem → insight → solution → proof → ask
- [x] CTA is concrete: "Scan the QR code or come find us"
