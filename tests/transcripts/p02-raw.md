# P02 — DeepReview: AI Code Review Assistant
## Pitch Video Plan (Raw — No Skill)

> **Audience:** VP Engineering + 3 Engineering Directors
> **Duration:** ~10 minutes
> **Format:** Self-contained HTML video with word-synced animations
> **Goal:** Enterprise-wide adoption (2,000 engineers), $48K/year budget approval

---

## 1. Narrative Structure

### Story Arc

```
TENSION                           RESOLUTION
  │                                    │
  │  ┌─────────┐                       │
  │  │ The Pain│ ← every team feels it │
  │  └────┬────┘                       │
  │       ▼                            │
  │  ┌──────────────┐                  │
  │  │ Cost of Doing│                  │
  │  │   Nothing    │                  │
  │  └──────┬───────┘                  │
  │         ▼                          │
  │    ┌──────────┐                    │
  │    │ What If? │ ← introduce tool   │
  │    └────┬─────┘                    │
  │         ▼                          │
  │     ┌────────────┐                 │
  │     │ How It     │                 │
  │     │  Works     │                 │
  │     └─────┬──────┘                 │
  │           ▼                        │
  │      ┌─────────┐                   │
  │      │ Proof   │ ← traction data   │
  │      └────┬────┘                   │
  │           ▼                        │
  │       ┌───────┐                    │
  │       │ Scale │ ← 2000 engineers   │
  │       └───┬───┘                    │
  │           ▼                        │
  │        ┌─────┐                     │
  │        │ Ask │                     │
  │        └─────┘                     │
```

### Section Breakdown

| # | Section | Duration | Purpose |
|---|---------|----------|---------|
| 1 | The Bottleneck | ~90s | Establish pain — code review is broken |
| 2 | The Real Cost | ~60s | Quantify what this costs us |
| 3 | Meet DeepReview | ~60s | Introduce the tool — what it does |
| 4 | How It Works | ~90s | Four capabilities, each with a concrete example |
| 5 | Proof | ~75s | Traction data — this works at scale |
| 6 | What Changes for Us | ~60s | Paint the picture at 2,000 engineers |
| 7 | The Ask | ~45s | Concrete budget request and next steps |

Total: ~8 minutes narration + transitions

---

## 2. Scene Breakdown with Narration

### Scene 1: The Bottleneck
**Purpose:** Every engineering leader in the room has felt this pain. Start there.

**Clip s01_bottleneck:**
> "Every engineering team has the same bottleneck. It's not deployment. It's not testing. It's code review. The average pull request sits waiting for twenty-four hours before anyone looks at it. That's a full day of dead time on every single change."

**Clip s01_senior_tax:**
> "And when reviews do happen, our senior engineers are spending thirty percent of their time reading junior code. That's not leverage — that's a tax on our best people. Meanwhile, review quality is inconsistent. Some reviewers catch real bugs. Others rubber-stamp and move on. Nobody likes doing reviews, and it shows."

---

### Scene 2: The Real Cost
**Purpose:** Move from feeling the pain to quantifying it. Leadership audiences need numbers.

**Clip s02_math:**
> "Let's put numbers on this. If we have two thousand engineers, and each one opens three PRs per week, that's six thousand reviews per week. At twenty-four hour wait times, we're burning six thousand engineer-days of momentum. Every single week."

**Clip s02_bugs:**
> "Worse — the reviews we do get aren't catching what matters. We've all seen it. A PR gets three approvals and ships a null pointer exception to production. The review process gave us confidence, but not safety."

---

### Scene 3: Meet DeepReview
**Purpose:** Transition from problem to solution. Keep it crisp — what it is, not how it works yet.

**Clip s03_intro:**
> "DeepReview is an AI code review assistant that integrates directly with GitHub and GitLab. It analyzes every pull request automatically — not as a replacement for human review, but as a force multiplier. Think of it as a senior engineer who never gets tired, never rubber-stamps, and reviews every single PR before a human even looks at it."

---

### Scene 4: How It Works
**Purpose:** Four capabilities, each demonstrated with a concrete example. This is the meat of the pitch.

**Clip s04_bugs:**
> "First — bug detection. Not linting. DeepReview catches real bugs. Null pointer errors. Race conditions. SQL injection vulnerabilities. The kind of issues that pass linting but break production."

**Clip s04_architecture:**
> "Second — architecture feedback. DeepReview learns your codebase patterns. When a PR violates established conventions — say, bypassing the service layer to hit the database directly — it flags the violation and explains the pattern it expected."

**Clip s04_knowledge:**
> "Third — knowledge transfer. When DeepReview flags an issue, it doesn't just say 'this is wrong.' It explains why, and links directly to your team's own coding standards. Junior engineers learn from every review. The feedback loop that used to depend on senior availability now runs continuously."

**Clip s04_priority:**
> "Fourth — review prioritization. Not every PR carries the same risk. DeepReview ranks pull requests by risk level, so your human reviewers focus their time on the dangerous changes — the ones touching auth, payments, or data migrations — while low-risk changes flow through faster."

---

### Scene 5: Proof
**Purpose:** Traction data. These aren't projections — this is measured performance across 200 teams.

**Clip s05_traction:**
> "This isn't a prototype. DeepReview is running in production across two hundred paying teams right now. They've analyzed eight hundred forty-seven thousand pull requests. And here's the number that matters — twelve thousand four hundred bugs caught before merge that human reviewers confirmed were real issues."

**Clip s05_waittime:**
> "Average review wait time dropped from twenty-four hours to four hours. That's an eighty-three percent reduction. And the false positive rate is down to eight percent — from twenty-three percent at launch. The system gets more accurate as it learns each team's codebase."

---

### Scene 6: What Changes for Us
**Purpose:** Help the audience see what this means at our specific scale.

**Clip s06_scale:**
> "At two thousand engineers, here's what changes. Every PR gets an intelligent first pass before a human reviewer opens it. Senior engineers get their time back — they review the high-risk changes that actually need their judgment. Junior engineers get consistent, educational feedback on every commit. And our mean time from PR open to merge drops by hours, not minutes."

**Clip s06_compound:**
> "The compounding effect matters. Faster reviews mean smaller PRs. Smaller PRs mean better reviews. Better reviews mean fewer production incidents. This isn't a linear improvement — it's a flywheel."

---

### Scene 7: The Ask
**Purpose:** Concrete request. No emotional plea — just the decision to be made.

**Clip s07_ask:**
> "The enterprise license for two thousand engineers is forty-eight thousand dollars per year. That's twenty-four dollars per engineer, per year. Less than one hour of engineer time. I'm asking for budget approval to roll this out company-wide, starting with a pilot across three teams this quarter. Let's pick the teams, set success metrics, and evaluate in sixty days."

---

## 3. Scene JSONs with Word-Anchored Triggers

### scene-01.json — The Bottleneck

```json
{
  "scene": "scene-01",
  "title": "The Bottleneck",
  "clips": ["s01_bottleneck", "s01_senior_tax"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s1-title" }
      ]
    },
    {
      "anchor": { "clip": "s01_bottleneck", "word": "bottleneck", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s1-title" },
        { "fn": "show", "id": "s1-bottleneck-label" }
      ]
    },
    {
      "anchor": { "clip": "s01_bottleneck", "word": "review", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-code-review-highlight" }
      ]
    },
    {
      "anchor": { "clip": "s01_bottleneck", "word": "twenty-four", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-1" },
        { "fn": "show", "id": "s1-24hr-stat" }
      ]
    },
    {
      "anchor": { "clip": "s01_senior_tax", "word": "thirty", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-1" },
        { "fn": "show", "id": "s1-30pct-stat" }
      ]
    },
    {
      "anchor": { "clip": "s01_senior_tax", "word": "inconsistent", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s1-30pct-stat" },
        { "fn": "show", "id": "s1-inconsistency-diagram" }
      ]
    },
    {
      "anchor": { "clip": "s01_senior_tax", "word": "rubber-stamp", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-rubberstamp-icon" }
      ]
    }
  ]
}
```

### scene-02.json — The Real Cost

```json
{
  "scene": "scene-02",
  "title": "The Real Cost",
  "clips": ["s02_math", "s02_bugs"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s2-title" }
      ]
    },
    {
      "anchor": { "clip": "s02_math", "word": "numbers", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s2-title" },
        { "fn": "show", "id": "s2-calculator" }
      ]
    },
    {
      "anchor": { "clip": "s02_math", "word": "thousand", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-2000-engineers" }
      ]
    },
    {
      "anchor": { "clip": "s02_math", "word": "six", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-6000-reviews" }
      ]
    },
    {
      "anchor": { "clip": "s02_math", "word": "momentum", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-momentum-lost" }
      ]
    },
    {
      "anchor": { "clip": "s02_bugs", "word": "catching", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-2" },
        { "fn": "show", "id": "s2-false-confidence" }
      ]
    },
    {
      "anchor": { "clip": "s02_bugs", "word": "null", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-null-pointer-example" }
      ]
    },
    {
      "anchor": { "clip": "s02_bugs", "word": "safety", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-confidence-vs-safety" }
      ]
    }
  ]
}
```

### scene-03.json — Meet DeepReview

```json
{
  "scene": "scene-03",
  "title": "Meet DeepReview",
  "clips": ["s03_intro"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s3-title" }
      ]
    },
    {
      "anchor": { "clip": "s03_intro", "word": "assistant", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-title" },
        { "fn": "show", "id": "s3-logo" },
        { "fn": "show", "id": "s3-github-gitlab-icons" }
      ]
    },
    {
      "anchor": { "clip": "s03_intro", "word": "replacement", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s3-not-replacement" }
      ]
    },
    {
      "anchor": { "clip": "s03_intro", "word": "multiplier", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-not-replacement" },
        { "fn": "show", "id": "s3-force-multiplier" }
      ]
    },
    {
      "anchor": { "clip": "s03_intro", "word": "tired", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-3" },
        { "fn": "show", "id": "s3-always-on-visual" }
      ]
    }
  ]
}
```

### scene-04.json — How It Works

```json
{
  "scene": "scene-04",
  "title": "How It Works",
  "clips": ["s04_bugs", "s04_architecture", "s04_knowledge", "s04_priority"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s4-title" },
        { "fn": "show", "id": "s4-four-pillars" }
      ]
    },
    {
      "anchor": { "clip": "s04_bugs", "word": "detection", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4-title" },
        { "fn": "show", "id": "s4-pillar-1-active" }
      ]
    },
    {
      "anchor": { "clip": "s04_bugs", "word": "Null", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-bug-examples" }
      ]
    },
    {
      "anchor": { "clip": "s04_bugs", "word": "production", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-not-linting-badge" }
      ]
    },
    {
      "anchor": { "clip": "s04_architecture", "word": "architecture", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-4" },
        { "fn": "show", "id": "s4-four-pillars" },
        { "fn": "show", "id": "s4-pillar-2-active" }
      ]
    },
    {
      "anchor": { "clip": "s04_architecture", "word": "patterns", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-pattern-diagram" }
      ]
    },
    {
      "anchor": { "clip": "s04_architecture", "word": "bypassing", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-violation-example" }
      ]
    },
    {
      "anchor": { "clip": "s04_knowledge", "word": "knowledge", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-4" },
        { "fn": "show", "id": "s4-four-pillars" },
        { "fn": "show", "id": "s4-pillar-3-active" }
      ]
    },
    {
      "anchor": { "clip": "s04_knowledge", "word": "explains", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-explanation-bubble" }
      ]
    },
    {
      "anchor": { "clip": "s04_knowledge", "word": "continuously", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-feedback-loop" }
      ]
    },
    {
      "anchor": { "clip": "s04_priority", "word": "prioritization", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-4" },
        { "fn": "show", "id": "s4-four-pillars" },
        { "fn": "show", "id": "s4-pillar-4-active" }
      ]
    },
    {
      "anchor": { "clip": "s04_priority", "word": "ranks", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-risk-ranking-list" }
      ]
    },
    {
      "anchor": { "clip": "s04_priority", "word": "auth", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-high-risk-examples" }
      ]
    }
  ]
}
```

### scene-05.json — Proof

```json
{
  "scene": "scene-05",
  "title": "Proof",
  "clips": ["s05_traction", "s05_waittime"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s5-title" }
      ]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "production", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s5-title" },
        { "fn": "show", "id": "s5-production-badge" }
      ]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "hundred", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-200-teams" }
      ]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "thousand", "n": 2 },
      "actions": [
        { "fn": "show", "id": "s5-847k-prs" }
      ]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "twelve", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-12400-bugs" }
      ]
    },
    {
      "anchor": { "clip": "s05_waittime", "word": "dropped", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-5" },
        { "fn": "show", "id": "s5-wait-time-chart" }
      ]
    },
    {
      "anchor": { "clip": "s05_waittime", "word": "eighty-three", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-83pct-badge" }
      ]
    },
    {
      "anchor": { "clip": "s05_waittime", "word": "eight", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-false-positive-chart" }
      ]
    },
    {
      "anchor": { "clip": "s05_waittime", "word": "learns", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-learning-curve" }
      ]
    }
  ]
}
```

### scene-06.json — What Changes for Us

```json
{
  "scene": "scene-06",
  "title": "What Changes for Us",
  "clips": ["s06_scale", "s06_compound"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s6-title" }
      ]
    },
    {
      "anchor": { "clip": "s06_scale", "word": "changes", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s6-title" },
        { "fn": "show", "id": "s6-before-after" }
      ]
    },
    {
      "anchor": { "clip": "s06_scale", "word": "intelligent", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-first-pass-row" }
      ]
    },
    {
      "anchor": { "clip": "s06_scale", "word": "Senior", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-senior-time-row" }
      ]
    },
    {
      "anchor": { "clip": "s06_scale", "word": "Junior", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-junior-feedback-row" }
      ]
    },
    {
      "anchor": { "clip": "s06_scale", "word": "merge", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-time-to-merge-row" }
      ]
    },
    {
      "anchor": { "clip": "s06_compound", "word": "compounding", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-6" },
        { "fn": "show", "id": "s6-flywheel" }
      ]
    },
    {
      "anchor": { "clip": "s06_compound", "word": "Faster", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-flywheel-step-1" }
      ]
    },
    {
      "anchor": { "clip": "s06_compound", "word": "Smaller", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-flywheel-step-2" }
      ]
    },
    {
      "anchor": { "clip": "s06_compound", "word": "Better", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-flywheel-step-3" }
      ]
    },
    {
      "anchor": { "clip": "s06_compound", "word": "flywheel", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-flywheel-complete" }
      ]
    }
  ]
}
```

### scene-07.json — The Ask

```json
{
  "scene": "scene-07",
  "title": "The Ask",
  "clips": ["s07_ask"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [
        { "fn": "show", "id": "s7-title" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "forty-eight", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s7-title" },
        { "fn": "show", "id": "s7-price-tag" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "twenty-four", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-per-engineer-cost" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "one", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-less-than-1hr" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "pilot", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-7" },
        { "fn": "show", "id": "s7-next-steps" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "sixty", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s7-timeline" }
      ]
    }
  ]
}
```

---

## 4. Visual Specifications

### Global Style
- **Background:** Dark (#1a1a2e) with subtle gradient — professional, engineering-audience appropriate
- **Typography:** Monospace for data/stats (JetBrains Mono), clean sans-serif for labels (Inter)
- **Accent colors:** DeepReview brand blue (#3b82f6) for primary, amber (#f59e0b) for warnings/bugs, green (#10b981) for positive metrics
- **Animation style:** Fade-in (300ms ease-out). No bouncing. No spinning. Engineering audience.

### Scene 1: The Bottleneck

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s1-title` | text | "The Bottleneck" | center, top third | 48px, white, bold |
| `s1-bottleneck-label` | text + icon | Pipeline diagram with "Code Review" bottleneck highlighted in red | center | SVG pipeline with red glow on review stage |
| `s1-code-review-highlight` | highlight | Red pulse on "Code Review" label in pipeline | center | Animated red outline |
| `s1-24hr-stat` | stat-card | "24 hrs" + "avg wait per PR" | center | Large number (72px monospace), subtitle below |
| `s1-30pct-stat` | stat-card | "30%" + "of senior engineer time on reviews" | center | Large number (72px monospace), subtitle below |
| `s1-inconsistency-diagram` | diagram | Three reviewer avatars: one with checkmark, one with ?, one with rubber stamp | center | Icon row with labels |
| `s1-rubberstamp-icon` | icon | Animated rubber stamp slamming "LGTM" | bottom right | 64px, red tint |

### Scene 2: The Real Cost

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s2-title` | text | "The Real Cost" | center, top third | 48px, white, bold |
| `s2-calculator` | icon | Calculator icon | center | 48px, faded blue |
| `s2-2000-engineers` | stat-card | "2,000 engineers" | left third | Monospace number, label below |
| `s2-6000-reviews` | stat-card | "× 3 PRs/week = 6,000 reviews/week" | center | Building equation, left to right |
| `s2-momentum-lost` | stat-card | "6,000 engineer-days lost/week" | right third | Red monospace number, amber glow |
| `s2-false-confidence` | text | "Confidence ≠ Safety" | center | 36px, amber, italic |
| `s2-null-pointer-example` | code-block | Mock PR diff showing `user.getName()` on nullable object, 3 green "Approved" badges | center | Dark code theme, green approval badges |
| `s2-confidence-vs-safety` | diagram | Two-column: "What reviews gave us: ✓ Confidence" / "What we needed: ✗ Safety" | center | Green/red columns |

### Scene 3: Meet DeepReview

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s3-title` | text | "Meet DeepReview" | center | 48px, white, bold |
| `s3-logo` | image | DeepReview logo (stylized magnifying glass over code) | center | 120px, brand blue |
| `s3-github-gitlab-icons` | icon-row | GitHub octocat + GitLab fox icons | flanking logo | 48px, muted white |
| `s3-not-replacement` | text-badge | "Not a replacement" with ✗ | center | Red tint text with strikethrough |
| `s3-force-multiplier` | text-badge | "A force multiplier" with ✓ | center | Green tint text, slightly larger |
| `s3-always-on-visual` | diagram | Three traits: "Never tired" / "Never rubber-stamps" / "Reviews every PR" | center | Three icon-label pairs in a row |

### Scene 4: How It Works

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s4-title` | text | "How It Works" | center, top | 48px, white, bold |
| `s4-four-pillars` | nav-bar | Four labels: "Bugs · Architecture · Knowledge · Priority" | top bar | Horizontal, muted. Active pillar highlights |
| `s4-pillar-1-active` | highlight | "Bugs" label in nav-bar turns bright blue | top bar | Blue text + underline |
| `s4-bug-examples` | code-block | Three rows: "NullPointerException" / "Race Condition" / "SQL Injection" with bug icons | center | Dark code theme, red bug icons |
| `s4-not-linting-badge` | badge | "Not linting — real bugs" | below code block | Amber border badge |
| `s4-pillar-2-active` | highlight | "Architecture" label highlights | top bar | Blue text + underline |
| `s4-pattern-diagram` | diagram | Correct pattern: Controller → Service → DB. Violation: Controller → DB (red X) | center | Flow diagram, green/red paths |
| `s4-violation-example` | annotation | "⚠ Bypasses service layer" callout | on diagram | Amber callout box |
| `s4-pillar-3-active` | highlight | "Knowledge" label highlights | top bar | Blue text + underline |
| `s4-explanation-bubble` | bubble | Mock review comment: "This is wrong because [link to coding-standards.md §4.2]" | center | Chat bubble style, with hyperlink |
| `s4-feedback-loop` | diagram | Circular arrow: "Review → Learn → Improve → Review" | center | Blue circular arrows |
| `s4-pillar-4-active` | highlight | "Priority" label highlights | top bar | Blue text + underline |
| `s4-risk-ranking-list` | list | Sorted PRs: 🔴 High / 🟡 Medium / 🟢 Low with file change counts | center | Ordered list with color dots |
| `s4-high-risk-examples` | tag-row | Tags: "auth" / "payments" / "data-migration" | below list | Red-tinted tags |

### Scene 5: Proof

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s5-title` | text | "Proof" | center, top | 48px, white, bold |
| `s5-production-badge` | badge | "In Production" with green dot | top right | Green badge |
| `s5-200-teams` | stat-card | "200 teams" | left | 64px monospace, blue |
| `s5-847k-prs` | stat-card | "847K PRs analyzed" | center | 64px monospace, blue |
| `s5-12400-bugs` | stat-card | "12,400 real bugs caught" | right | 64px monospace, green, slight glow |
| `s5-wait-time-chart` | chart | Bar chart: "Before: 24 hrs" (tall red bar) → "After: 4 hrs" (short green bar) | center | Simple bar chart, labeled |
| `s5-83pct-badge` | badge | "↓ 83%" | over chart | Large green badge |
| `s5-false-positive-chart` | chart | Line chart: false positive rate from 23% (launch) to 8% (today), downward trend | center-right | Line chart, amber → green gradient |
| `s5-learning-curve` | annotation | "Gets smarter per codebase" arrow along chart | below chart | Italic label with arrow |

### Scene 6: What Changes for Us

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s6-title` | text | "What Changes for Us" | center, top | 48px, white, bold |
| `s6-before-after` | table-header | Two columns: "Before" (red tint) / "After" (green tint) | center | Table structure |
| `s6-first-pass-row` | table-row | "No first pass" → "AI first pass on every PR" | row 1 | Progressive reveal |
| `s6-senior-time-row` | table-row | "30% time on reviews" → "Focus on high-risk only" | row 2 | Progressive reveal |
| `s6-junior-feedback-row` | table-row | "Inconsistent feedback" → "Consistent, educational feedback" | row 3 | Progressive reveal |
| `s6-time-to-merge-row` | table-row | "24hr wait" → "4hr wait" | row 4 | Progressive reveal |
| `s6-flywheel` | diagram | Circular flywheel outline (empty, to be filled) | center | Blue circle outline |
| `s6-flywheel-step-1` | text-in-flywheel | "Faster reviews" at 12 o'clock | in flywheel | Appear with arrow to next |
| `s6-flywheel-step-2` | text-in-flywheel | "Smaller PRs" at 3 o'clock | in flywheel | Appear with arrow to next |
| `s6-flywheel-step-3` | text-in-flywheel | "Better reviews" at 6 o'clock | in flywheel | Appear with arrow to next |
| `s6-flywheel-complete` | animation | "Fewer incidents" at 9 o'clock + flywheel spins once | in flywheel | Complete circle, brief spin animation |

### Scene 7: The Ask

| Element ID | Type | Content | Position | Style |
|------------|------|---------|----------|-------|
| `s7-title` | text | "The Ask" | center, top | 48px, white, bold |
| `s7-price-tag` | stat-card | "$48,000/year" | center | 72px monospace, white |
| `s7-per-engineer-cost` | stat-card | "$24/engineer/year" | center, below price | 48px monospace, green |
| `s7-less-than-1hr` | text | "< 1 hour of engineer time" | below cost | 24px, muted, italic |
| `s7-next-steps` | list | "1. Pick 3 pilot teams\n2. Set success metrics\n3. Evaluate in 60 days" | center | Numbered list, clean, 28px |
| `s7-timeline` | timeline | Visual timeline: "This quarter → Pilot → 60-day eval → Decision" | bottom third | Horizontal timeline with dots |

---

## 5. Build Checklist

### Pre-Build Validation
- [ ] All narration clips are self-contained — each sentence lands on its own when heard in isolation
- [ ] On-screen text uses exact narration keywords (subset, not paraphrase)
- [ ] No sentence has its anchor word past 60% of the sentence position
- [ ] Scene count matches story beats (7 scenes, 7 narrative sections)
- [ ] Clip IDs are unique and follow naming convention (`s0N_name`)

### Anchor Audit
- [ ] Every `word` in an anchor actually appears in its clip's narration text
- [ ] `n` values are correct (1-based, matching nth occurrence of word in clip)
- [ ] No anchor references a clip not listed in the scene's `clips` array
- [ ] Anchor words are early in their sentences (first 60%)
- [ ] Each scene has a `{ "fixed": 0 }` trigger for scene-start visuals

### Visual Specification
- [ ] Every element `id` referenced in triggers has a matching visual spec
- [ ] No orphaned visual specs (every spec is triggered by at least one anchor)
- [ ] `clearAll` actions correctly reference the scene group ID
- [ ] Progressive reveals match narration order (elements appear in speaking order)
- [ ] Color scheme is consistent across all scenes

### Audio Pipeline
- [ ] TTS voice selected (recommend: `en-US-GuyNeural` for professional/engineering tone)
- [ ] `wordBoundaryEnabled: true` set in TTS config
- [ ] All clip audio files generated and metadata validated
- [ ] Word boundary metadata contains all anchor words

### Assembly
- [ ] `assemble.js` resolves all word anchors without errors
- [ ] `LEAD_MS` anticipation offset applied (visuals appear slightly before spoken word)
- [ ] `T()` function successfully finds all nth-occurrence lookups
- [ ] Generated `SCENES` array contains all 7 scenes with resolved ms delays

### Final Build
- [ ] All .mp3 files converted to base64 and embedded
- [ ] All .metadata.json files embedded as `WORD_META`
- [ ] Output HTML is self-contained (no external dependencies)
- [ ] File size is reasonable (~15-25MB)

### Playback Verification
- [ ] End-to-end playback: all 7 scenes play in sequence
- [ ] Visuals sync with narration — no drift across full 8-minute runtime
- [ ] All `show` animations are visible (no z-index or overflow issues)
- [ ] All `fade` animations complete cleanly
- [ ] All `clearAll` actions clear the correct element group
- [ ] No visual lingers from a previous scene
- [ ] Flywheel animation in Scene 6 renders correctly
- [ ] Final scene ends cleanly (no abrupt cut)

---

## Appendix: Clip ID → Narration Text Reference

| Clip ID | First 10 words | Scene |
|---------|----------------|-------|
| `s01_bottleneck` | "Every engineering team has the same bottleneck. It's not…" | 1 |
| `s01_senior_tax` | "And when reviews do happen, our senior engineers are…" | 1 |
| `s02_math` | "Let's put numbers on this. If we have two…" | 2 |
| `s02_bugs` | "Worse — the reviews we do get aren't catching…" | 2 |
| `s03_intro` | "DeepReview is an AI code review assistant that integrates…" | 3 |
| `s04_bugs` | "First — bug detection. Not linting. DeepReview catches real…" | 4 |
| `s04_architecture` | "Second — architecture feedback. DeepReview learns your codebase patterns…" | 4 |
| `s04_knowledge` | "Third — knowledge transfer. When DeepReview flags an issue…" | 4 |
| `s04_priority` | "Fourth — review prioritization. Not every PR carries the…" | 4 |
| `s05_traction` | "This isn't a prototype. DeepReview is running in production…" | 5 |
| `s05_waittime` | "Average review wait time dropped from twenty-four hours to…" | 5 |
| `s06_scale` | "At two thousand engineers, here's what changes. Every PR…" | 6 |
| `s06_compound` | "The compounding effect matters. Faster reviews mean smaller PRs…" | 6 |
| `s07_ask` | "The enterprise license for two thousand engineers is forty-eight…" | 7 |
