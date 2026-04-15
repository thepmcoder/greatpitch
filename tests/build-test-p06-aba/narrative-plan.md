# Elevate — Pitch Video Narrative Plan

> **Product:** Elevate — AI-powered student career and research navigation platform
> **Audience:** College demo day — professors and students, 5–8 minute slot
> **Creators:** Krishna Prabu and Tanmai Raghava

---

## Stage 1: Pitch Extraction

### The Problem
Students are overwhelmed navigating career and research paths. They're fragmented across dozens of platforms (LinkedIn, Unstop, Internshala, college portals) with no unified, reliable source of guidance. Survey data is damning:
- **80%+** feel least informed about role preparation and company shortlisting patterns
- **80%+** need more direction on building a strong profile
- **60%+** need clearer guidance on company expectations and where to begin
- **Only 14%** satisfied with the current information-finding process
- **Only 15%** trust the accuracy of what they find

### The Insight
Career tools and generic chatbots fail because they operate in silos. A student needs **cross-domain reasoning** — connecting job posts, professor research areas, hackathon deadlines, and their own academic stage into personalized, actionable guidance. No single tool does this today.

### The Solution
Elevate transforms unstructured academic and career data into structured intelligence via an AI reasoning layer. It uses the **LIFT framework**:
- **L**ocate the right information
- **I**nterpret what applies to you
- **F**ollow through with structure
- **T**ime actions correctly

It ingests signals from job posts, professor pages, research papers, hackathons, competitions, and hiring updates — and outputs student-aligned guidance: what to pursue, when to act, how to prepare, how to apply.

### The Proof
- Working prototype: full-stack mobile + web app with integrated LLM chatbot, multiplatform notifications, professor information system
- **87%+** of survey respondents believe a platform like Elevate would be very useful
- Students expressed strong demand for structured professor/research connections

### The Ask
Join the presentation to learn more. Reduce friction in student career and research journeys. (Appropriate for demo-day: invite engagement, not investment.)

---

## Stage 2: Narrative Arc Selection

### Chosen Arc: **The Reframe**

**Why:** This audience (professors and students) lives inside the problem. They already know career navigation is messy. A classic "Problem → Solution" pitch would feel obvious. The Reframe is more effective because:

1. **Professors already see students struggling** — we don't need to convince them a problem exists. But they probably think the answer is "better career services" or "students should try harder." The reframe shifts from "students need more information" to "students need cross-domain reasoning, not more platforms."
2. **Students already feel the pain** — we can validate their experience with data, then surprise them with the insight that the problem isn't about effort or access, but about fragmentation and reasoning across domains.
3. **Demo-day context** — reframe creates a narrative arc with tension and surprise, which is far more memorable than a feature tour.

### Section-by-Section Breakdown

| # | Section | Purpose | Arc Role |
|---|---------|---------|----------|
| 0 | Opening Hook | Emotional entry — the feeling of being a student drowning in tabs | Current state (honest) |
| 1 | The Data | Survey stats that validate the feeling with numbers | Data-backed current state |
| 2 | What's Been Tried | Students use 5+ platforms, generic chatbots, seniors — none sufficient | What's been tried |
| 3 | The Ceiling Test | Even if every platform worked perfectly, would it be enough? No — because they're siloed | Stress test |
| 4 | The Reframe | The problem isn't access to information — it's the absence of cross-domain reasoning | The different lens |
| 5 | Introducing Elevate | What Elevate does — the LIFT framework | New approach |
| 6 | How It Works | Signal ingestion → AI reasoning → personalized guidance | Concrete examples |
| 7 | The Prototype | What's built and working today | Proof |
| 8 | Validation | 87%+ survey validation, student demand quotes | Does the new approach solve the original problems? |
| 9 | Close & Ask | Concrete invitation to engage | Ask |

---

## Stage 3: Narration Text (All Clips)

### Clip: `s00_opening`
> You're a second-year student. It's September. Placement season is three months away. You have seventeen tabs open — LinkedIn, Unstop, Internshala, your college portal, two WhatsApp groups, and a Google Doc a senior shared last year that may or may not be outdated. You're not lazy. You're not uninformed. You're overwhelmed.

### Clip: `s01a_data_satisfaction`
> We surveyed students about this exact experience. The numbers are striking. Only fourteen percent are satisfied with how they currently find career and research information. And only fifteen percent trust that the information they find is even accurate.

### Clip: `s01b_data_gaps`
> What do students feel least informed about? Over eighty percent say they don't know how to prepare for various roles or understand how companies shortlist candidates. Over eighty percent say they need more direction in building a strong profile. And over sixty percent need clearer guidance on company expectations and where to even begin.

### Clip: `s02_tried`
> So what do students do today? They piece together guidance from five or six different sources. They ask seniors. They try generic AI chatbots. They scroll job boards without knowing what to prioritize. Each source has a fragment of the answer, but no source has the full picture.

### Clip: `s03_ceiling`
> Here's the question we kept coming back to. Even if every one of those platforms worked perfectly — even if LinkedIn showed every job, Internshala listed every internship, and your college portal was always up to date — would that be enough? We don't think so. Because the problem isn't missing information. It's that no one is connecting the dots for you.

### Clip: `s04_reframe`
> That's the shift. Students don't need another platform with more listings. They need something that reasons across domains — that connects a professor's research area with an open internship, that links a hackathon deadline with a skill you're building, that knows your academic stage and tells you what to focus on right now. Not more data. Cross-domain intelligence.

### Clip: `s05_elevate_intro`
> This is Elevate. An AI-powered platform that transforms scattered career and research data into structured, personalized guidance. It works through a framework we call LIFT. Locate the right information. Interpret what applies to you. Follow through with structure. And time your actions correctly.

### Clip: `s06a_signals`
> Elevate ingests signals from six key sources — job posts, professor pages, research papers, hackathons, competitions, and hiring updates. These aren't just aggregated. They're reasoned over. The AI layer connects them to your profile, your stage, and your goals.

### Clip: `s06b_outputs`
> What comes out the other side is clear, actionable guidance. What to pursue. When to act. How to prepare. And how to apply. Whether you're exploring research opportunities with a professor or preparing for your first placement interview, Elevate gives you a structured path forward.

### Clip: `s07_prototype`
> This isn't a concept. We've built a working prototype — a full-stack application across mobile and web. It includes an integrated AI chatbot for conversational guidance, a multiplatform notification system that surfaces opportunities at the right time, and a professor information system that helps students discover research mentors and open positions.

### Clip: `s08_validation`
> Does the approach work? We went back to students with this concept. Over eighty-seven percent said a platform like Elevate would be very useful for their academic, career, and research goals. Students consistently told us: they want a simpler, more structured way to connect with professors for projects and internships. That's exactly what Elevate provides.

### Clip: `s09_close`
> We're Krishna Prabu and Tanmai Raghava, and we built Elevate to solve a problem we live every day. We'd love for you to see the full demo. Let's reduce the friction in how students navigate their careers and research journeys. Thank you.

---

## Stage 4: Scene JSONs with Word-Anchored Triggers

### Scene 00 — Opening Hook

```json
{
  "scene": "scene-00",
  "title": "The Student Experience",
  "clips": ["s00_opening"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s0-heading" }]
    },
    {
      "anchor": { "clip": "s00_opening", "word": "seventeen", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s0-heading" },
        { "fn": "show", "id": "s0-tabs-visual" }
      ]
    },
    {
      "anchor": { "clip": "s00_opening", "word": "overwhelmed", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s0-tabs-visual" },
        { "fn": "show", "id": "s0-overwhelmed" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s0-heading`: Simple text — "September. Second Year. Placement Season." — sets context.
- `s0-tabs-visual`: An illustration of many browser tabs or app icons stacked/overlapping — LinkedIn, Unstop, Internshala, WhatsApp, Google Docs — conveying the chaos. Should feel cluttered and anxious.
- `s0-overwhelmed`: Large single word "Overwhelmed" or a pull-quote style text emphasizing the emotional state. The clutter should resolve to this single word.

---

### Scene 01 — The Data

```json
{
  "scene": "scene-01",
  "title": "What Students Told Us",
  "clips": ["s01a_data_satisfaction", "s01b_data_gaps"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s1-heading" }]
    },
    {
      "anchor": { "clip": "s01a_data_satisfaction", "word": "fourteen", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s1-heading" },
        { "fn": "show", "id": "s1-stat-14pct" }
      ]
    },
    {
      "anchor": { "clip": "s01a_data_satisfaction", "word": "fifteen", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-stat-15pct" }
      ]
    },
    {
      "anchor": { "clip": "s01b_data_gaps", "word": "eighty", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-01" },
        { "fn": "show", "id": "s1-bar-preparation" }
      ]
    },
    {
      "anchor": { "clip": "s01b_data_gaps", "word": "eighty", "n": 2 },
      "actions": [
        { "fn": "show", "id": "s1-bar-profile" }
      ]
    },
    {
      "anchor": { "clip": "s01b_data_gaps", "word": "sixty", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-bar-expectations" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s1-heading`: "What Students Told Us" — section title.
- `s1-stat-14pct`: Big animated number "14%" with label "satisfied with current process." Should feel stark — low numbers, large type.
- `s1-stat-15pct`: Big animated number "15%" with label "trust accuracy of info." Appears alongside the 14% to form a pair.
- `s1-bar-preparation`: Horizontal bar chart row — "Role Preparation" at 80%+. Bars should animate in progressively.
- `s1-bar-profile`: Second bar — "Profile Building" at 80%+.
- `s1-bar-expectations`: Third bar — "Company Expectations" at 60%+.

---

### Scene 02 — What's Been Tried

```json
{
  "scene": "scene-02",
  "title": "The Current Approach",
  "clips": ["s02_tried"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s2-heading" }]
    },
    {
      "anchor": { "clip": "s02_tried", "word": "piece", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s2-heading" },
        { "fn": "show", "id": "s2-fragments" }
      ]
    },
    {
      "anchor": { "clip": "s02_tried", "word": "full", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s2-fragments" },
        { "fn": "show", "id": "s2-no-full-picture" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s2-heading`: "What Students Do Today."
- `s2-fragments`: Visual showing 5–6 scattered puzzle pieces or cards — each labeled with a source (Seniors, Chatbots, Job boards, College portal, WhatsApp groups, Google Docs). They should look disconnected, floating, incomplete.
- `s2-no-full-picture`: The puzzle pieces pull apart further or dim, revealing a gap in the center. Text overlay: "No full picture." The point is visual: fragments don't assemble into a whole.

---

### Scene 03 — The Ceiling Test

```json
{
  "scene": "scene-03",
  "title": "The Ceiling Question",
  "clips": ["s03_ceiling"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s3-heading" }]
    },
    {
      "anchor": { "clip": "s03_ceiling", "word": "perfectly", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-heading" },
        { "fn": "show", "id": "s3-perfect-platforms" }
      ]
    },
    {
      "anchor": { "clip": "s03_ceiling", "word": "enough", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s3-question-mark" }
      ]
    },
    {
      "anchor": { "clip": "s03_ceiling", "word": "connecting", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-03" },
        { "fn": "show", "id": "s3-dots-disconnect" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s3-heading`: "Even if everything worked perfectly..."
- `s3-perfect-platforms`: The same platform icons from Scene 00/02 but now polished, glowing, "perfect" — LinkedIn ✓, Internshala ✓, College Portal ✓. Each gets a green checkmark.
- `s3-question-mark`: A large "?" appears over or beside the perfect platforms. The question: is perfection in each silo enough?
- `s3-dots-disconnect`: Key insight visual — dots (representing information types) float in separate clusters with no lines between them. Text: "No one is connecting the dots." This is the emotional pivot of the pitch.

---

### Scene 04 — The Reframe

```json
{
  "scene": "scene-04",
  "title": "Cross-Domain Intelligence",
  "clips": ["s04_reframe"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s4-heading" }]
    },
    {
      "anchor": { "clip": "s04_reframe", "word": "reasons", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4-heading" },
        { "fn": "show", "id": "s4-connections" }
      ]
    },
    {
      "anchor": { "clip": "s04_reframe", "word": "professor's", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-example-professor" }
      ]
    },
    {
      "anchor": { "clip": "s04_reframe", "word": "hackathon", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-example-hackathon" }
      ]
    },
    {
      "anchor": { "clip": "s04_reframe", "word": "Cross-domain", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-04" },
        { "fn": "show", "id": "s4-punchline" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s4-heading`: "The Shift" — minimal, dramatic.
- `s4-connections`: The disconnected dots from Scene 03 begin to draw lines between each other. Dots start connecting.
- `s4-example-professor`: A specific connection highlighted — "Professor's Research" ↔ "Open Internship" — a bright line linking two nodes. This is an example of cross-domain reasoning.
- `s4-example-hackathon`: Second connection — "Hackathon Deadline" ↔ "Skill You're Building" — another highlighted link.
- `s4-punchline`: Bold statement text: "Not more data. Cross-domain intelligence." Clean, centered, high-contrast.

---

### Scene 05 — Introducing Elevate

```json
{
  "scene": "scene-05",
  "title": "Elevate & LIFT",
  "clips": ["s05_elevate_intro"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s5-logo" }]
    },
    {
      "anchor": { "clip": "s05_elevate_intro", "word": "LIFT", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s5-logo" },
        { "fn": "show", "id": "s5-lift-L" }
      ]
    },
    {
      "anchor": { "clip": "s05_elevate_intro", "word": "Interpret", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-lift-I" }
      ]
    },
    {
      "anchor": { "clip": "s05_elevate_intro", "word": "Follow", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-lift-F" }
      ]
    },
    {
      "anchor": { "clip": "s05_elevate_intro", "word": "time", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-lift-T" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s5-logo`: Elevate product name/logo — clean, professional. Tagline: "Your Choices • Your Preparation • Your Confidence • Your Success."
- `s5-lift-L`: LIFT framework letter "L" with label "Locate the right information" — appears as first row of a vertical framework diagram.
- `s5-lift-I`: Letter "I" — "Interpret what applies to you" — second row, animates in below L.
- `s5-lift-F`: Letter "F" — "Follow through with structure" — third row.
- `s5-lift-T`: Letter "T" — "Time actions correctly" — fourth row. Full LIFT framework now visible as a clean vertical stack.

---

### Scene 06 — How It Works

```json
{
  "scene": "scene-06",
  "title": "Signals → Intelligence → Guidance",
  "clips": ["s06a_signals", "s06b_outputs"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s6-heading" }]
    },
    {
      "anchor": { "clip": "s06a_signals", "word": "six", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s6-heading" },
        { "fn": "show", "id": "s6-signal-sources" }
      ]
    },
    {
      "anchor": { "clip": "s06a_signals", "word": "reasoned", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-ai-layer" }
      ]
    },
    {
      "anchor": { "clip": "s06b_outputs", "word": "actionable", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-06" },
        { "fn": "show", "id": "s6-outputs" }
      ]
    },
    {
      "anchor": { "clip": "s06b_outputs", "word": "structured", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-path-forward" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s6-heading`: "How Elevate Works."
- `s6-signal-sources`: Six input cards arranged in a row or arc — "Job Posts," "Professor Pages," "Research Papers," "Hackathons," "Competitions," "Hiring Updates." Each card is small and iconic.
- `s6-ai-layer`: A central "AI Reasoning" node or brain icon in the middle. Lines draw from the six sources into this node. Visual metaphor: convergence.
- `s6-outputs`: Four output items on the right side — "What to pursue," "When to act," "How to prepare," "How to apply." Arrow flow: Sources → AI → Outputs.
- `s6-path-forward`: The full pipeline is now visible. A subtle highlight or glow to indicate it's a living, active system. Text: "A structured path forward."

---

### Scene 07 — The Prototype

```json
{
  "scene": "scene-07",
  "title": "What We've Built",
  "clips": ["s07_prototype"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s7-heading" }]
    },
    {
      "anchor": { "clip": "s07_prototype", "word": "prototype", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s7-heading" },
        { "fn": "show", "id": "s7-app-mockup" }
      ]
    },
    {
      "anchor": { "clip": "s07_prototype", "word": "chatbot", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-feature-chatbot" }
      ]
    },
    {
      "anchor": { "clip": "s07_prototype", "word": "notification", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-feature-notifications" }
      ]
    },
    {
      "anchor": { "clip": "s07_prototype", "word": "professor", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-feature-professors" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s7-heading`: "Not a Concept. A Working Prototype."
- `s7-app-mockup`: A phone + laptop frame showing the Elevate interface. Can be a simplified wireframe — doesn't need to be a screenshot. Should convey "this is real, this is built."
- `s7-feature-chatbot`: Small feature callout anchored to the mockup — "AI Chatbot" with a chat bubble icon.
- `s7-feature-notifications`: Second callout — "Smart Notifications" with a bell icon.
- `s7-feature-professors`: Third callout — "Professor Discovery" with a search/academic icon. Three features progressively revealed around the mockup.

---

### Scene 08 — Validation

```json
{
  "scene": "scene-08",
  "title": "Students Agree",
  "clips": ["s08_validation"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s8-heading" }]
    },
    {
      "anchor": { "clip": "s08_validation", "word": "eighty-seven", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s8-heading" },
        { "fn": "show", "id": "s8-stat-87pct" }
      ]
    },
    {
      "anchor": { "clip": "s08_validation", "word": "simpler", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s8-student-quote" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s8-heading`: "Does It Work?"
- `s8-stat-87pct`: Large animated number "87%+" with label "said Elevate would be very useful." This should feel triumphant — warm color, large type, perhaps a subtle radial glow. This is the payoff stat.
- `s8-student-quote`: A styled pull-quote block: "A simpler, more structured way to connect with professors for projects and internships." Attributed to "— Student survey respondents." Should feel authentic, human.

---

### Scene 09 — Close & Ask

```json
{
  "scene": "scene-09",
  "title": "Join Us",
  "clips": ["s09_close"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s9-team" }]
    },
    {
      "anchor": { "clip": "s09_close", "word": "demo", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s9-ask" }
      ]
    },
    {
      "anchor": { "clip": "s09_close", "word": "friction", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s9-tagline" }
      ]
    }
  ]
}
```

**Visual Intent:**
- `s9-team`: Creator names — "Krishna Prabu & Tanmai Raghava" — centered, confident.
- `s9-ask`: Call to action — "See the Full Demo" — button-like styling, inviting.
- `s9-tagline`: Final tagline: "Reduce friction. Elevate your journey." — appears below the ask. The Elevate logo/wordmark should be visible. Clean, resolved ending.

---

## Clip Summary Table

| Clip ID | Scene | Duration Est. | Word Count |
|---------|-------|--------------|------------|
| `s00_opening` | 00 | ~25s | 64 |
| `s01a_data_satisfaction` | 01 | ~15s | 38 |
| `s01b_data_gaps` | 01 | ~25s | 55 |
| `s02_tried` | 02 | ~18s | 45 |
| `s03_ceiling` | 03 | ~25s | 62 |
| `s04_reframe` | 04 | ~28s | 66 |
| `s05_elevate_intro` | 05 | ~22s | 50 |
| `s06a_signals` | 06 | ~18s | 42 |
| `s06b_outputs` | 07 | ~20s | 46 |
| `s07_prototype` | 07 | ~22s | 53 |
| `s08_validation` | 08 | ~20s | 50 |
| `s09_close` | 09 | ~18s | 42 |
| **Total** | | **~4:16** | **~613** |

Estimated total duration: **~4 minutes 15 seconds** (well within 5–8 minute slot, leaving room for live demo).

---

## Narrative Arc Checklist

- [x] **Problem → Insight → Solution → Proof → Ask** arc is complete
- [x] Every section earns its place (no filler)
- [x] Facts planted early (survey data in Scenes 01), conclusions drawn later (Scene 03–04)
- [x] Questions used for engagement ("would that be enough?" in Scene 03)
- [x] Concrete ask at the end (not an emotional plea)
- [x] All anchors in first 60% of their sentences
- [x] On-screen text is a subset of narration, not a paraphrase
- [x] Progressive reveal throughout (no all-at-once screens)
- [x] At least one moment of tension/surprise (the ceiling test → reframe pivot in Scenes 03–04)
- [x] No jargon on screen — student-friendly language throughout
- [x] Each clip is self-contained — no sentence requires memory from 30+ seconds ago

---

## Notes for the Designer

1. **Color palette suggestion:** Academic blues + warm accent (gold/amber) for Elevate branding. Survey data in neutral tones; the reframe moment (Scene 04) should feel visually distinct — brighter, warmer.

2. **The pivot matters most.** Scenes 03–04 are the narrative heart. The transition from "disconnected dots" to "connected dots" is the single most important visual moment. Invest design time here.

3. **Survey data should feel credible.** Use clean bar charts and large stat numbers — not infographic candy. This audience (professors) responds to honest presentation of data.

4. **The LIFT framework (Scene 05)** should feel like a memorable mnemonic. Consider making each letter a different accent color or giving each row a subtle icon.

5. **Scene 06 pipeline** (Sources → AI → Outputs) is the system architecture moment. Keep it clean and directional — left to right or top to bottom flow.

6. **Mobile mockup (Scene 07)** should suggest "this is real" without needing actual screenshots. A clean wireframe with recognizable UI patterns is fine.

7. **Final scene** should feel resolved and confident, not salesy. Two student builders inviting peers and professors to see more.
