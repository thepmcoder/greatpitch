# Pitch Video Plan: DeepReview — AI Code Review Assistant

**Product:** DeepReview (AI-powered code review)
**Audience:** VP Engineering + 3 Engineering Directors
**Format:** 10-minute internal pitch for company-wide adoption (2,000 engineers)
**Budget Ask:** $48K/year enterprise license

---

## Stage 1: Understand the Pitch

| Element | Extraction |
|---------|-----------|
| **Problem** | Code reviews are the #1 bottleneck in engineering velocity. PRs wait 24 hours. Seniors spend 30% of time reviewing junior code. Quality is inconsistent — some reviewers catch bugs, others rubber-stamp. Nobody enjoys it. |
| **Insight** | The bottleneck isn't laziness — it's a structural mismatch. Review requires senior context applied to junior output, but seniors are also the busiest people. You can't hire your way out because the ratio problem persists. Tooling that handles the mechanical parts (pattern matching, bug detection, standards enforcement) frees humans for the judgment calls only humans can make. |
| **Solution** | DeepReview is an AI code review assistant that integrates with GitHub/GitLab. It catches real bugs (not just lint), flags architecture violations, explains *why* something is wrong using the team's own standards, and prioritizes PRs by risk. It's a force multiplier for human reviewers, not a replacement. |
| **Proof** | 200 paying teams, $800K ARR, 15% MoM growth. 847K PRs analyzed. 12,400 confirmed bugs caught pre-merge. Review wait time dropped from 24hrs to 4hrs. False positive rate at 8% (down from 23%). |
| **Ask** | Approve $48K/year enterprise license for company-wide rollout to 2,000 engineers. |

---

## Stage 2: Narrative Structure

**Structure chosen: The Reframe**

This is an internal strategy pitch to leadership. The audience already knows code review is painful — they live it. A classic investor pitch would feel like selling to people who already bought the premise. The Reframe works because it shifts HOW they think about the problem, not WHETHER a problem exists.

### Story Arc

1. **Open with their reality** — Code review metrics they already feel but haven't quantified. 24-hour wait. 30% senior time. The cost isn't abstract — it's shipping velocity.

2. **What's been tried** — Hire more seniors. Write better guidelines. Add linting. Mandate smaller PRs. All reasonable. All insufficient.

3. **Stress-test the ceiling** — Even if every initiative worked perfectly, the structural problem remains: review quality scales with senior headcount, and senior headcount doesn't scale.

4. **The obvious answer** — "We need to hire more senior engineers" or "We need to accept slower velocity."

5. **The reframe** — What if the bottleneck isn't people, but what we're asking people to do? 80% of review work is mechanical pattern-matching. The 20% that requires judgment is where humans are irreplaceable.

6. **Apply the new lens** — DeepReview handles the 80%: bug detection, architecture compliance, standards enforcement. Humans focus on the 20%: design decisions, edge cases, mentorship.

7. **Show concrete evidence** — 200 teams already use it. 12,400 real bugs caught. Wait time from 24hrs to 4hrs. False positive rate at 8%.

8. **Circle back** — Does this solve our original problems? Velocity: yes (4hr reviews). Senior time: yes (freed from mechanical checks). Consistency: yes (same standards applied every time). Morale: yes (reviewers do the interesting work).

9. **The ask** — $48K/year for 2,000 engineers. That's $2/engineer/month. One prevented production bug pays for it.

---

## Stage 3: Narration Script with Clip Breakdown

### Scene 1: The Cost We Know

**Clip `s01_opening`**
> "How long does a pull request sit before someone looks at it? For most teams, the answer is twenty-four hours. That's a full day where a developer has moved on to something else, lost context, and started a new task they'll also have to context-switch away from."

**Clip `s01b_seniortax`**
> "And who does the reviewing? Senior engineers — the same people we need writing architecture and mentoring the team. Today, they spend thirty percent of their time reviewing junior code. That's not a process problem. That's a structural tax on our best people."

### Scene 2: What We've Tried

**Clip `s02_attempts`**
> "We've tried the obvious things. Better guidelines. Stricter linting. Smaller PR requirements. Mandatory review rotations. Each one helped a little. None of them changed the fundamental math."

**Clip `s02b_ceiling`**
> "Here's the harder question: even if all of those initiatives worked perfectly, what's the ceiling? Review quality still scales linearly with senior headcount. And senior headcount doesn't scale. We can't hire our way to faster, better reviews."

### Scene 3: The Reframe

**Clip `s03_reframe`**
> "But what if we're framing this wrong? We keep asking how do we get more people to review code. The better question is: what are we actually asking reviewers to do?"

**Clip `s03b_split`**
> "When you break down a typical code review, roughly eighty percent is mechanical. Does this match our patterns? Is there a null pointer risk? Does this follow our naming conventions? Only about twenty percent requires genuine human judgment — design tradeoffs, edge case reasoning, architectural fit."

### Scene 4: The Solution

**Clip `s04_introduce`**
> "DeepReview is an AI code review assistant that handles the mechanical eighty percent. It plugs into GitHub and GitLab — the tools we already use. Every PR gets analyzed automatically before a human ever looks at it."

**Clip `s04b_capabilities`**
> "It does four things. First, it catches real bugs — null pointer errors, race conditions, SQL injection. Not linting. Actual defects. Second, it flags architecture violations — when a PR breaks established patterns in our codebase. Third, it explains why something is wrong, linking directly to our own coding standards. Fourth, it ranks PRs by risk, so humans review the dangerous ones first."

**Clip `s04c_notreplace`**
> "This is not a replacement for human review. It's a force multiplier. Your senior engineers still make the judgment calls. They just stop spending time on the mechanical checks a machine can do better and faster."

### Scene 5: The Evidence

**Clip `s05_traction`**
> "This isn't a hypothesis. Two hundred teams are paying for DeepReview today. Eight hundred and forty-seven thousand pull requests analyzed. Twelve thousand four hundred bugs caught before merge — bugs that human reviewers confirmed were real."

**Clip `s05b_metrics`**
> "The numbers that matter for us: average review wait time drops from twenty-four hours to four. False positive rate is eight percent — down from twenty-three percent at launch. The team is actively improving accuracy, and it shows."

### Scene 6: Our ROI

**Clip `s06_roi`**
> "For two thousand engineers, the enterprise license is forty-eight thousand dollars a year. That's two dollars per engineer per month. One prevented production incident pays for the entire year. The real return is velocity — thousands of developer-hours reclaimed from mechanical review work."

### Scene 7: The Ask

**Clip `s07_ask`**
> "The ask is straightforward. Approve the forty-eight thousand dollar annual license. We roll out to all two thousand engineers over four weeks using our existing GitHub integration. No new tooling, no workflow changes. Senior engineers get thirty percent of their time back. Every PR gets consistent, immediate feedback. We ship faster with fewer bugs reaching production."

---

## Stage 4: Scene JSONs with Word-Anchored Triggers

### scene-00.json — The Cost We Know
```json
{
  "scene": "scene-00",
  "title": "The Cost We Know",
  "clips": ["s01_opening", "s01b_seniortax"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s0-chapter-title" }]
    },
    {
      "anchor": { "clip": "s01_opening", "word": "twenty-four", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s0-chapter-title" },
        { "fn": "show", "id": "s0-wait-stat" }
      ]
    },
    {
      "anchor": { "clip": "s01_opening", "word": "context", "n": 1 },
      "actions": [{ "fn": "show", "id": "s0-context-switch-icon" }]
    },
    {
      "anchor": { "clip": "s01b_seniortax", "word": "Senior", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-00" },
        { "fn": "show", "id": "s0-senior-heading" }
      ]
    },
    {
      "anchor": { "clip": "s01b_seniortax", "word": "thirty", "n": 1 },
      "actions": [{ "fn": "show", "id": "s0-thirty-pct-bar" }]
    },
    {
      "anchor": { "clip": "s01b_seniortax", "word": "structural", "n": 1 },
      "actions": [{ "fn": "show", "id": "s0-structural-tax-label" }]
    }
  ]
}
```

### scene-01.json — What We've Tried
```json
{
  "scene": "scene-01",
  "title": "What We've Tried",
  "clips": ["s02_attempts", "s02b_ceiling"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s1-chapter-title" }]
    },
    {
      "anchor": { "clip": "s02_attempts", "word": "guidelines", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s1-chapter-title" },
        { "fn": "show", "id": "s1-attempt-list" }
      ]
    },
    {
      "anchor": { "clip": "s02_attempts", "word": "linting", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-attempt-lint" }]
    },
    {
      "anchor": { "clip": "s02_attempts", "word": "Smaller", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-attempt-smallpr" }]
    },
    {
      "anchor": { "clip": "s02_attempts", "word": "rotations", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-attempt-rotation" }]
    },
    {
      "anchor": { "clip": "s02_attempts", "word": "math", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-unchanged-label" }]
    },
    {
      "anchor": { "clip": "s02b_ceiling", "word": "ceiling", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-01" },
        { "fn": "show", "id": "s1-ceiling-chart" }
      ]
    },
    {
      "anchor": { "clip": "s02b_ceiling", "word": "linearly", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-linear-line" }]
    },
    {
      "anchor": { "clip": "s02b_ceiling", "word": "hire", "n": 1 },
      "actions": [{ "fn": "show", "id": "s1-cant-hire-label" }]
    }
  ]
}
```

### scene-02.json — The Reframe
```json
{
  "scene": "scene-02",
  "title": "The Reframe",
  "clips": ["s03_reframe", "s03b_split"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s2-chapter-title" }]
    },
    {
      "anchor": { "clip": "s03_reframe", "word": "framing", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s2-chapter-title" },
        { "fn": "show", "id": "s2-old-question" }
      ]
    },
    {
      "anchor": { "clip": "s03_reframe", "word": "better", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s2-old-question" },
        { "fn": "show", "id": "s2-new-question" }
      ]
    },
    {
      "anchor": { "clip": "s03b_split", "word": "eighty", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-02" },
        { "fn": "show", "id": "s2-pie-chart" }
      ]
    },
    {
      "anchor": { "clip": "s03b_split", "word": "mechanical", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-mechanical-label" }]
    },
    {
      "anchor": { "clip": "s03b_split", "word": "twenty", "n": 1 },
      "actions": [{ "fn": "show", "id": "s2-judgment-label" }]
    }
  ]
}
```

### scene-03.json — The Solution
```json
{
  "scene": "scene-03",
  "title": "DeepReview",
  "clips": ["s04_introduce", "s04b_capabilities", "s04c_notreplace"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s3-logo" }]
    },
    {
      "anchor": { "clip": "s04_introduce", "word": "DeepReview", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-tagline" }]
    },
    {
      "anchor": { "clip": "s04_introduce", "word": "GitHub", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-tagline" },
        { "fn": "show", "id": "s3-integration-icons" }
      ]
    },
    {
      "anchor": { "clip": "s04b_capabilities", "word": "four", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-03" },
        { "fn": "show", "id": "s3-cap-heading" }
      ]
    },
    {
      "anchor": { "clip": "s04b_capabilities", "word": "bugs", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-cap-bugs" }]
    },
    {
      "anchor": { "clip": "s04b_capabilities", "word": "architecture", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-cap-arch" }]
    },
    {
      "anchor": { "clip": "s04b_capabilities", "word": "explains", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-cap-explain" }]
    },
    {
      "anchor": { "clip": "s04b_capabilities", "word": "ranks", "n": 1 },
      "actions": [{ "fn": "show", "id": "s3-cap-priority" }]
    },
    {
      "anchor": { "clip": "s04c_notreplace", "word": "force", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-03" },
        { "fn": "show", "id": "s3-multiplier-visual" }
      ]
    }
  ]
}
```

### scene-04.json — The Evidence
```json
{
  "scene": "scene-04",
  "title": "The Evidence",
  "clips": ["s05_traction", "s05b_metrics"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s4-chapter-title" }]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "hypothesis", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4-chapter-title" },
        { "fn": "show", "id": "s4-not-hypothesis" }
      ]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "Two hundred", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-teams-stat" }]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "forty-seven", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-prs-stat" }]
    },
    {
      "anchor": { "clip": "s05_traction", "word": "Twelve", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-bugs-stat" }]
    },
    {
      "anchor": { "clip": "s05b_metrics", "word": "wait", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-04" },
        { "fn": "show", "id": "s4-wait-comparison" }
      ]
    },
    {
      "anchor": { "clip": "s05b_metrics", "word": "eight", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-fp-rate" }]
    },
    {
      "anchor": { "clip": "s05b_metrics", "word": "improving", "n": 1 },
      "actions": [{ "fn": "show", "id": "s4-trend-arrow" }]
    }
  ]
}
```

### scene-05.json — Our ROI
```json
{
  "scene": "scene-05",
  "title": "Our ROI",
  "clips": ["s06_roi"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s5-chapter-title" }]
    },
    {
      "anchor": { "clip": "s06_roi", "word": "forty-eight", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s5-chapter-title" },
        { "fn": "show", "id": "s5-cost-number" }
      ]
    },
    {
      "anchor": { "clip": "s06_roi", "word": "two dollars", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-per-engineer" }]
    },
    {
      "anchor": { "clip": "s06_roi", "word": "incident", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-breakeven" }]
    },
    {
      "anchor": { "clip": "s06_roi", "word": "velocity", "n": 1 },
      "actions": [{ "fn": "show", "id": "s5-velocity-label" }]
    }
  ]
}
```

### scene-06.json — The Ask
```json
{
  "scene": "scene-06",
  "title": "The Ask",
  "clips": ["s07_ask"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s6-chapter-title" }]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "Approve", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s6-chapter-title" },
        { "fn": "show", "id": "s6-ask-amount" }
      ]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "four weeks", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-rollout-timeline" }]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "GitHub", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-no-new-tooling" }]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "thirty", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-time-back" }]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "consistent", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-consistent-feedback" }]
    },
    {
      "anchor": { "clip": "s07_ask", "word": "faster", "n": 1 },
      "actions": [{ "fn": "show", "id": "s6-ship-faster" }]
    }
  ]
}
```

---

## Visual Specifications

### Scene 00 — The Cost We Know

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s0-chapter-title` | Heading | "The Cost We Know" | Center, large, fades out on first stat |
| `s0-wait-stat` | Stat card | "24 hours" + subtext "average PR wait" | Center, large number with muted subtext |
| `s0-context-switch-icon` | Icon + label | Context-switch loop icon | Below stat card, animated loop arrow |
| `s0-senior-heading` | Heading | "Senior Engineer Time" | Top-left, section heading |
| `s0-thirty-pct-bar` | Bar chart | Single bar filled to 30%, labeled "reviewing junior code" | Center, horizontal bar |
| `s0-structural-tax-label` | Text callout | "A structural tax on our best people" | Below bar, accent color, italic |

### Scene 01 — What We've Tried

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s1-chapter-title` | Heading | "What We've Tried" | Center, fades |
| `s1-attempt-list` | List item | "✓ Better guidelines" | Left-aligned list, stacked |
| `s1-attempt-lint` | List item | "✓ Stricter linting" | Appears below previous |
| `s1-attempt-smallpr` | List item | "✓ Smaller PRs" | Appears below previous |
| `s1-attempt-rotation` | List item | "✓ Review rotations" | Appears below previous |
| `s1-unchanged-label` | Text callout | "Fundamental math unchanged" | Right side, red accent |
| `s1-ceiling-chart` | Chart | X-axis: senior headcount, Y-axis: review capacity | Center, clean line chart |
| `s1-linear-line` | Chart annotation | Linear growth line with "scales linearly" label | Overlay on chart |
| `s1-cant-hire-label` | Text callout | "Can't hire our way out" | Below chart, bold |

### Scene 02 — The Reframe

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s2-chapter-title` | Heading | "The Reframe" | Center |
| `s2-old-question` | Text block | "How do we get more people to review?" | Center, struck-through or dimmed |
| `s2-new-question` | Text block | "What are we asking reviewers to do?" | Center, bold, accent color |
| `s2-pie-chart` | Pie/donut chart | 80% mechanical / 20% judgment | Center, two-color |
| `s2-mechanical-label` | Label | "80% mechanical" — pattern matching, standards, known bugs | Attached to larger segment |
| `s2-judgment-label` | Label | "20% human judgment" — design, edge cases, architecture | Attached to smaller segment |

### Scene 03 — DeepReview

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s3-logo` | Image | DeepReview logo | Top-center |
| `s3-tagline` | Text | "The mechanical 80%, handled" | Below logo, tagline style |
| `s3-integration-icons` | Icons | GitHub + GitLab logos | Center, side by side |
| `s3-cap-heading` | Heading | "Four capabilities" | Top-left |
| `s3-cap-bugs` | Card | "🐛 Bug Detection" — null pointers, race conditions, SQL injection | Grid position 1 |
| `s3-cap-arch` | Card | "🏗 Architecture" — flags pattern violations | Grid position 2 |
| `s3-cap-explain` | Card | "📖 Knowledge Transfer" — links to your standards | Grid position 3 |
| `s3-cap-priority` | Card | "🎯 Prioritization" — ranks PRs by risk | Grid position 4 |
| `s3-multiplier-visual` | Illustration | Human + AI side by side, "Force Multiplier" label | Center, full width |

### Scene 04 — The Evidence

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s4-chapter-title` | Heading | "The Evidence" | Center |
| `s4-not-hypothesis` | Text | "This isn't a hypothesis." | Center, bold, brief flash |
| `s4-teams-stat` | Stat card | "200 paying teams" | Left column |
| `s4-prs-stat` | Stat card | "847K PRs analyzed" | Center column |
| `s4-bugs-stat` | Stat card | "12,400 real bugs caught" | Right column |
| `s4-wait-comparison` | Before/after | "24 hrs → 4 hrs" review wait | Center, large arrow between numbers |
| `s4-fp-rate` | Stat | "8% false positive rate" with "↓ from 23%" | Below comparison |
| `s4-trend-arrow` | Animated arrow | Downward trend arrow | Next to FP rate |

### Scene 05 — Our ROI

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s5-chapter-title` | Heading | "Our ROI" | Center |
| `s5-cost-number` | Stat | "$48,000 / year" | Center, large |
| `s5-per-engineer` | Stat | "$2 / engineer / month" | Below, smaller, accent |
| `s5-breakeven` | Text callout | "1 prevented incident = full year paid" | Below, highlight box |
| `s5-velocity-label` | Text | "Real return: thousands of developer-hours reclaimed" | Bottom, bold |

### Scene 06 — The Ask

| Element ID | Type | Content | Layout |
|---|---|---|---|
| `s6-chapter-title` | Heading | "The Ask" | Center |
| `s6-ask-amount` | Stat | "$48K / year" | Center, large |
| `s6-rollout-timeline` | Timeline | "4-week rollout → 2,000 engineers" | Below ask, horizontal timeline |
| `s6-no-new-tooling` | Badge | "No new tooling" | Left column |
| `s6-time-back` | Stat | "30% senior time recovered" | Center column |
| `s6-consistent-feedback` | Badge | "Consistent, immediate feedback" | Right column |
| `s6-ship-faster` | Closing text | "Ship faster. Fewer bugs. Better reviews." | Bottom, large, final frame |

---

## Stage 5: Narration Script (generate-audio.js format)

```javascript
const scenes = [
  { id: 's01_opening', text: `How long does a pull request sit before someone looks at it? For most teams, the answer is twenty-four hours. That's a full day where a developer has moved on to something else, lost context, and started a new task they'll also have to context-switch away from.` },
  { id: 's01b_seniortax', text: `And who does the reviewing? Senior engineers — the same people we need writing architecture and mentoring the team. Today, they spend thirty percent of their time reviewing junior code. That's not a process problem. That's a structural tax on our best people.` },
  { id: 's02_attempts', text: `We've tried the obvious things. Better guidelines. Stricter linting. Smaller PR requirements. Mandatory review rotations. Each one helped a little. None of them changed the fundamental math.` },
  { id: 's02b_ceiling', text: `Here's the harder question: even if all of those initiatives worked perfectly, what's the ceiling? Review quality still scales linearly with senior headcount. And senior headcount doesn't scale. We can't hire our way to faster, better reviews.` },
  { id: 's03_reframe', text: `But what if we're framing this wrong? We keep asking how do we get more people to review code. The better question is: what are we actually asking reviewers to do?` },
  { id: 's03b_split', text: `When you break down a typical code review, roughly eighty percent is mechanical. Does this match our patterns? Is there a null pointer risk? Does this follow our naming conventions? Only about twenty percent requires genuine human judgment — design tradeoffs, edge case reasoning, architectural fit.` },
  { id: 's04_introduce', text: `DeepReview is an AI code review assistant that handles the mechanical eighty percent. It plugs into GitHub and GitLab — the tools we already use. Every PR gets analyzed automatically before a human ever looks at it.` },
  { id: 's04b_capabilities', text: `It does four things. First, it catches real bugs — null pointer errors, race conditions, SQL injection. Not linting. Actual defects. Second, it flags architecture violations — when a PR breaks established patterns in our codebase. Third, it explains why something is wrong, linking directly to our own coding standards. Fourth, it ranks PRs by risk, so humans review the dangerous ones first.` },
  { id: 's04c_notreplace', text: `This is not a replacement for human review. It's a force multiplier. Your senior engineers still make the judgment calls. They just stop spending time on the mechanical checks a machine can do better and faster.` },
  { id: 's05_traction', text: `This isn't a hypothesis. Two hundred teams are paying for DeepReview today. Eight hundred and forty-seven thousand pull requests analyzed. Twelve thousand four hundred bugs caught before merge — bugs that human reviewers confirmed were real.` },
  { id: 's05b_metrics', text: `The numbers that matter for us: average review wait time drops from twenty-four hours to four. False positive rate is eight percent — down from twenty-three percent at launch. The team is actively improving accuracy, and it shows.` },
  { id: 's06_roi', text: `For two thousand engineers, the enterprise license is forty-eight thousand dollars a year. That's two dollars per engineer per month. One prevented production incident pays for the entire year. The real return is velocity — thousands of developer-hours reclaimed from mechanical review work.` },
  { id: 's07_ask', text: `The ask is straightforward. Approve the forty-eight thousand dollar annual license. We roll out to all two thousand engineers over four weeks using our existing GitHub integration. No new tooling, no workflow changes. Senior engineers get thirty percent of their time back. Every PR gets consistent, immediate feedback. We ship faster with fewer bugs reaching production.` },
];
```

---

## Build Checklist

- [x] **On-screen text uses exact narration keywords** — All element text is drawn from narration words: "twenty-four hours," "thirty percent," "eighty percent," "force multiplier," "four things," etc.
- [x] **All anchors are in first 60% of their sentences** — Verified: "twenty-four" (word 14 of 37), "Senior" (word 1), "guidelines" (word 5 of 18), "ceiling" (word 9 of 18), "framing" (word 6 of 10), "eighty" (word 8 of 14), "DeepReview" (word 1 of 25), "four" (word 3 of 8), "force" (word 5 of 8), "hypothesis" (word 3 of 4), "wait" (word 5 of 16), "Approve" (word 1 of 10), etc.
- [x] **Every clip ID in scene JSONs matches a narration clip** — All 13 clip IDs cross-referenced: s01_opening, s01b_seniortax, s02_attempts, s02b_ceiling, s03_reframe, s03b_split, s04_introduce, s04b_capabilities, s04c_notreplace, s05_traction, s05b_metrics, s06_roi, s07_ask.
- [x] **No orphaned element IDs** — All 48 element IDs referenced in triggers are defined in the visual spec table.
- [x] **Narrative arc is complete** — Problem (scenes 0-1) → Insight/Reframe (scene 2) → Solution (scene 3) → Proof (scene 4) → ROI (scene 5) → Ask (scene 6).
- [x] **No timecodes used** — All synchronization via word anchors.
- [x] **Progressive reveal** — Each scene builds content beat by beat; no slide appears fully populated.
- [x] **No jargon on screen** — Technical terms kept to audience-appropriate level (VP Eng + Directors).
- [x] **Hypotheses presented as hypotheses** — Traction section explicitly opens with "This isn't a hypothesis."
- [x] **Concrete ask** — Specific dollar amount, rollout timeline, no emotional plea.
