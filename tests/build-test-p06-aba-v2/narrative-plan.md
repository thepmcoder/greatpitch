# Elevate — Demo Day Pitch Video Plan (60-75 sec)

---

## Stage 1: Extraction

| Element | Value |
|---------|-------|
| **Problem** | Students drown in 10+ platforms trying to figure out what to prepare, who to contact, and when to apply. 86% feel lost. Only 14% are satisfied with the process. |
| **Insight** | No single tool connects job posts, professor research, hackathon deadlines, and your academic stage. Career tools work in silos — students need cross-domain reasoning. |
| **Solution** | Elevate uses AI to ingest career, research, and competition data, then gives you personalized next steps: what to pursue, when to act, how to prepare. |
| **Proof** | Working prototype (mobile + web). 87% of surveyed students say they'd use it. |
| **Ask** | Come see our demo / Scan QR to try it. |
| **Audience** | College students and professors at demo day. Short attention span. They live this problem daily. |
| **Slot** | 60-90 seconds → use **The Lightning** structure. |

---

## Stage 2: Lightning Structure — 6 Beats

| # | Beat | Time | Purpose |
|---|------|------|---------|
| 1 | **Hook** | ~5 sec | Jolt of recognition — you've felt this |
| 2 | **Pain** | ~10 sec | One vivid student scenario, not stats |
| 3 | **"What if"** | ~5 sec | The product idea in one line |
| 4 | **Show it** | ~25 sec | Fastest demo walkthrough — app in action |
| 5 | **Killer stat** | ~10 sec | 87% validation + working prototype |
| 6 | **CTA** | ~5 sec | Scan QR / come to booth |
| | **Total** | **~60 sec** | |

---

## Stage 3: Narration — Clip Text

### Beat 1 — Hook
**Clip `s01_hook`** (~5 sec)
> How many tabs do you have open right now trying to figure out your career?

### Beat 2 — Pain
**Clip `s02_pain`** (~10 sec)
> LinkedIn for jobs. Unstop for hackathons. College portal for deadlines. Some random PDF for professor contacts. And after all that? You still don't know what to prepare.

### Beat 3 — What If
**Clip `s03_whatif`** (~5 sec)
> What if one app connected all of it — and told you exactly what to do next?

### Beat 4 — Show It
**Clip `s04a_demo_feed`** (~10 sec)
> This is Elevate. It pulls opportunities from across platforms and filters them to your goals and stage.

**Clip `s04b_demo_research`** (~8 sec)
> Want research experience? Elevate maps professors to their active projects — and shows you how to reach out.

**Clip `s04c_demo_chat`** (~7 sec)
> Stuck? Ask the AI chatbot. It gives you a personalized prep roadmap, not generic advice.

### Beat 5 — Killer Stat
**Clip `s05_proof`** (~10 sec)
> We surveyed students like you. Eighty-seven percent said they'd use this. So we built it. It's live, on mobile and web, right now.

### Beat 6 — CTA
**Clip `s06_cta`** (~5 sec)
> Scan the QR code and try Elevate for yourself. Your next opportunity is waiting.

---

## Stage 4: Scene JSONs with Word Anchors

### Scene 0 — Hook
```json
{
  "scene": "scene-00",
  "title": "Hook",
  "clips": ["s01_hook"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s0-bg-tabs" }]
    },
    {
      "anchor": { "clip": "s01_hook", "word": "tabs", "n": 1 },
      "actions": [{ "fn": "show", "id": "s0-tab-icons" }]
    }
  ]
}
```
**Visual intent:** Dark screen with browser tab chaos animation. On "tabs," a flurry of app icons (LinkedIn, Unstop, etc.) scatter across screen.

---

### Scene 1 — Pain
```json
{
  "scene": "scene-01",
  "title": "The Mess",
  "clips": ["s02_pain"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-00" },
        { "fn": "show", "id": "s1-bg" }
      ]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "LinkedIn", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-icon-linkedin" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "Unstop", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-icon-unstop" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "portal", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-icon-portal" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "professor", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-icon-pdf" }]
    },
    {
      "anchor": { "clip": "s02_pain", "word": "prepare", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-question-mark" }
      ]
    }
  ]
}
```
**Visual intent:** Icons pile up one by one as each platform is named — LinkedIn, Unstop, college portal, random PDF. On "prepare," a big red "?" lands on top of the pile.

---

### Scene 2 — What If
```json
{
  "scene": "scene-02",
  "title": "What If",
  "clips": ["s03_whatif"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-01" },
        { "fn": "show", "id": "s2-bg" }
      ]
    },
    {
      "anchor": { "clip": "s03_whatif", "word": "one", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-elevate-logo" }]
    },
    {
      "anchor": { "clip": "s03_whatif", "word": "next", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-tagline" }]
    }
  ]
}
```
**Visual intent:** Clean transition. On "one app," the Elevate logo appears centered. On "what to do next," tagline fades in below: *Your next step, clear.*

---

### Scene 3 — Demo
```json
{
  "scene": "scene-03",
  "title": "Show It",
  "clips": ["s04a_demo_feed", "s04b_demo_research", "s04c_demo_chat"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-02" },
        { "fn": "show", "id": "s3-phone-frame" }
      ]
    },
    {
      "anchor": { "clip": "s04a_demo_feed", "word": "Elevate", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-screen-feed" }]
    },
    {
      "anchor": { "clip": "s04a_demo_feed", "word": "filters", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-filter-animation" }]
    },
    {
      "anchor": { "clip": "s04b_demo_research", "word": "research", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-screen-feed" },
        { "fn": "show", "id": "s3-screen-research" }
      ]
    },
    {
      "anchor": { "clip": "s04b_demo_research", "word": "professors", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-prof-cards" }]
    },
    {
      "anchor": { "clip": "s04c_demo_chat", "word": "chatbot", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-screen-research" },
        { "fn": "show", "id": "s3-screen-chat" }
      ]
    },
    {
      "anchor": { "clip": "s04c_demo_chat", "word": "roadmap", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-roadmap-preview" }]
    }
  ]
}
```
**Visual intent:** Phone mockup frame stays constant. Screen content swaps per clip: opportunity feed → professor/research cards → chatbot conversation with roadmap output. Each transition is a smooth swap inside the phone.

---

### Scene 4 — Proof
```json
{
  "scene": "scene-04",
  "title": "Proof",
  "clips": ["s05_proof"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-03" },
        { "fn": "show", "id": "s4-bg" }
      ]
    },
    {
      "anchor": { "clip": "s05_proof", "word": "Eighty-seven", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-stat-87" }]
    },
    {
      "anchor": { "clip": "s05_proof", "word": "built", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-live-badge" }]
    }
  ]
}
```
**Visual intent:** Big bold "87%" animates in on cue. On "built it," a "LIVE" badge appears with mobile + web icons.

---

### Scene 5 — CTA
```json
{
  "scene": "scene-05",
  "title": "CTA",
  "clips": ["s06_cta"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "clearAll", "id": "scene-04" },
        { "fn": "show", "id": "s5-bg" }
      ]
    },
    {
      "anchor": { "clip": "s06_cta", "word": "Scan", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-qr-code" }]
    },
    {
      "anchor": { "clip": "s06_cta", "word": "opportunity", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-elevate-logo-final" }]
    }
  ]
}
```
**Visual intent:** QR code front and center on "Scan." Elevate logo and tagline appear on closing line. Clean, confident end frame.

---

## Anchor Checklist

- [x] All anchors land on meaningful words (nouns/verbs), not articles
- [x] All anchors are in the first 60% of their sentences
- [x] On-screen text uses exact narration keywords, not paraphrases
- [x] No screen has more than 2 key phrases
- [x] Every clip ID in scene JSONs matches a narration clip above
- [x] Narrative arc: problem → insight → solution → proof → ask ✓
- [x] Total narration ≈ 60 seconds at natural speaking pace
