# P03 — FreshLocal Pitch Video Plan

> **Product:** FreshLocal — Farm-to-door marketplace
> **Stage:** Seed ($1.5M raised), live in 2 cities, 340 farms, 8,200 consumers
> **Ask:** $6M Series A
> **Audience:** Consumer/marketplace VCs, ~3-minute video
> **Narrative structure:** The Classic (Problem → Market → Solution → Traction → Ask)

---

## Stage 1: Pitch Extraction

| Element | Content |
|---------|---------|
| **Problem** | Produce travels 1,500 miles. Farmers lose 40% to middlemen. Consumers want local but farmers' markets are inconvenient. CSA boxes solve freshness but not choice. |
| **Insight** | The missing piece is real-time farm inventory + shared logistics. Freshness and choice aren't a tradeoff — they're a coordination problem. |
| **Solution** | Marketplace: consumers browse live farm inventory within 50 miles, build custom orders, get next-day delivery. Produce is never warehoused — farm → truck → door in under 24 hours. |
| **Proof** | 340 farms, 8,200 consumers, 2 cities. $47 avg order. 64% monthly repeat. +61 NPS. Farms earn 35% more vs wholesale. |
| **Ask** | $6M Series A → expand to 5 more cities, reach logistics breakeven at 15K orders/month/city. |

---

## Stage 2: Narrative Structure

### Story Arc (6 scenes)

| Scene | Beat | Purpose |
|-------|------|---------|
| 01 | The Broken Journey | Establish emotional tension — produce travels too far, farmers lose too much |
| 02 | Why Existing Solutions Fail | CSA boxes, farmers' markets, grocery delivery — none solve both freshness AND choice |
| 03 | The Coordination Insight | Reframe: this is a logistics problem, not a supply problem |
| 04 | How FreshLocal Works | Product walkthrough — browse, order, next-day delivery, 14-hour shelf age |
| 05 | Traction & Unit Economics | Data proof — 2 cities, 340 farms, $47 orders, 64% repeat, breakeven trajectory |
| 06 | The Ask | $6M to expand to 5 cities and reach logistics breakeven |

---

## Stage 3: Narration Script

### Scene 01 — The Broken Journey
**Clips:** `s01a_distance`, `s01b_farmers`

**s01a_distance:**
> The average vegetable travels fifteen hundred miles before it reaches your plate. That journey takes five to seven days in cold storage, trucks, and warehouses. By the time it arrives at the grocery store, the produce is already a week old.

**s01b_farmers:**
> And for the farmers who grew it, forty percent of the revenue disappears into distributors and retailers. The people doing the hardest work capture the smallest share.

---

### Scene 02 — Why Existing Solutions Fail
**Clips:** `s02a_markets`, `s02b_csa`

**s02a_markets:**
> Consumers want local produce. Farmers' markets exist, but they're limited — a few hours on Saturday morning, weather-dependent, and only accessible if you live nearby.

**s02b_csa:**
> CSA boxes solve the freshness problem, but they remove all choice. You get what the farm grows that week, not what you actually want to cook. Freshness or choice — today, you have to pick one.

---

### Scene 03 — The Coordination Insight
**Clips:** `s03a_reframe`

**s03a_reframe:**
> But freshness and choice aren't actually a tradeoff. They're a coordination problem. Local farms already grow the variety. Consumers already want it. What's missing is a system that connects real-time supply with real-time demand — and handles the logistics in between.

---

### Scene 04 — How FreshLocal Works
**Clips:** `s04a_browse`, `s04b_logistics`, `s04c_speed`

**s04a_browse:**
> FreshLocal is a marketplace where consumers browse real-time inventory from farms within fifty miles. Farmers upload what they harvested today. Consumers build custom orders from dozens of local farms in a single cart.

**s04b_logistics:**
> The platform handles everything behind the scenes — shared cold-chain trucks running milk-run routes, payment processing, and direct communication between farms and customers.

**s04c_speed:**
> Produce is never warehoused. It goes from farm to truck to door in under twenty-four hours. The average shelf age at delivery is fourteen hours. Compare that to five to seven days at a grocery store.

---

### Scene 05 — Traction & Unit Economics
**Clips:** `s05a_growth`, `s05b_economics`

**s05a_growth:**
> We're live in Austin and Portland with three hundred forty farms and eighty-two hundred consumers. Our average order is forty-seven dollars — nearly fifty percent higher than typical grocery delivery. Monthly repeat rate is sixty-four percent, and our consumer NPS is plus sixty-one.

**s05b_economics:**
> For farmers, FreshLocal means a thirty-five percent revenue increase compared to wholesale. Our unit economics are at negative three dollars and twenty cents per order, trending toward breakeven at fifteen thousand orders per month per city.

---

### Scene 06 — The Ask
**Clips:** `s06a_ask`

**s06a_ask:**
> We're raising six million dollars in Series A funding to expand to five more cities and reach logistics breakeven. The model works in two cities. The infrastructure, the playbook, and the demand are ready to scale. We'd like to discuss the expansion plan and the path to profitability.

---

## Stage 4: Scene JSONs with Word-Anchored Triggers

### scene-01.json — The Broken Journey

```json
{
  "scene": "scene-01",
  "title": "The Broken Journey",
  "clips": ["s01a_distance", "s01b_farmers"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s1-heading" }]
    },
    {
      "anchor": { "clip": "s01a_distance", "word": "fifteen", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-miles-stat" },
        { "fn": "showRouteAnimation" }
      ]
    },
    {
      "anchor": { "clip": "s01a_distance", "word": "cold", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s1-miles-stat" },
        { "fn": "show", "id": "s1-journey-icons" }
      ]
    },
    {
      "anchor": { "clip": "s01a_distance", "word": "week", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-week-old" }
      ]
    },
    {
      "anchor": { "clip": "s01b_farmers", "word": "forty", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-1" },
        { "fn": "show", "id": "s1-revenue-split" }
      ]
    },
    {
      "anchor": { "clip": "s01b_farmers", "word": "smallest", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s1-farmer-share-highlight" }
      ]
    }
  ]
}
```

### scene-02.json — Why Existing Solutions Fail

```json
{
  "scene": "scene-02",
  "title": "Why Existing Solutions Fail",
  "clips": ["s02a_markets", "s02b_csa"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s2-heading" }]
    },
    {
      "anchor": { "clip": "s02a_markets", "word": "limited", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-market-constraints" }
      ]
    },
    {
      "anchor": { "clip": "s02a_markets", "word": "Saturday", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-clock-icon" }
      ]
    },
    {
      "anchor": { "clip": "s02b_csa", "word": "freshness", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-2" },
        { "fn": "show", "id": "s2-csa-card" }
      ]
    },
    {
      "anchor": { "clip": "s02b_csa", "word": "choice", "n": 1 },
      "delayMs": -200,
      "actions": [
        { "fn": "show", "id": "s2-choice-card" }
      ]
    },
    {
      "anchor": { "clip": "s02b_csa", "word": "pick", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s2-tradeoff-punch" }
      ]
    }
  ]
}
```

### scene-03.json — The Coordination Insight

```json
{
  "scene": "scene-03",
  "title": "The Coordination Insight",
  "clips": ["s03a_reframe"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s3-heading" }]
    },
    {
      "anchor": { "clip": "s03a_reframe", "word": "coordination", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s3-heading" },
        { "fn": "show", "id": "s3-reframe-punch" }
      ]
    },
    {
      "anchor": { "clip": "s03a_reframe", "word": "variety", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s3-supply-icon" }
      ]
    },
    {
      "anchor": { "clip": "s03a_reframe", "word": "system", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s3-connect-diagram" }
      ]
    }
  ]
}
```

### scene-04.json — How FreshLocal Works

```json
{
  "scene": "scene-04",
  "title": "How FreshLocal Works",
  "clips": ["s04a_browse", "s04b_logistics", "s04c_speed"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s4-heading" }]
    },
    {
      "anchor": { "clip": "s04a_browse", "word": "marketplace", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s4-heading" },
        { "fn": "show", "id": "s4-app-mockup" }
      ]
    },
    {
      "anchor": { "clip": "s04a_browse", "word": "harvested", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-live-inventory" }
      ]
    },
    {
      "anchor": { "clip": "s04a_browse", "word": "cart", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-multi-farm-cart" }
      ]
    },
    {
      "anchor": { "clip": "s04b_logistics", "word": "cold-chain", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-4" },
        { "fn": "show", "id": "s4-logistics-diagram" }
      ]
    },
    {
      "anchor": { "clip": "s04b_logistics", "word": "milk-run", "n": 1 },
      "actions": [
        { "fn": "showRouteMap" }
      ]
    },
    {
      "anchor": { "clip": "s04c_speed", "word": "warehoused", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-4" },
        { "fn": "show", "id": "s4-no-warehouse" }
      ]
    },
    {
      "anchor": { "clip": "s04c_speed", "word": "fourteen", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s4-freshness-comparison" }
      ]
    }
  ]
}
```

### scene-05.json — Traction & Unit Economics

```json
{
  "scene": "scene-05",
  "title": "Traction & Unit Economics",
  "clips": ["s05a_growth", "s05b_economics"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s5-heading" }]
    },
    {
      "anchor": { "clip": "s05a_growth", "word": "Austin", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s5-heading" },
        { "fn": "show", "id": "s5-city-map" }
      ]
    },
    {
      "anchor": { "clip": "s05a_growth", "word": "forty-seven", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-aov-stat" }
      ]
    },
    {
      "anchor": { "clip": "s05a_growth", "word": "sixty-four", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-repeat-stat" }
      ]
    },
    {
      "anchor": { "clip": "s05a_growth", "word": "sixty-one", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-nps-stat" }
      ]
    },
    {
      "anchor": { "clip": "s05b_economics", "word": "thirty-five", "n": 1 },
      "actions": [
        { "fn": "clearAll", "id": "scene-5" },
        { "fn": "show", "id": "s5-farm-revenue-bar" }
      ]
    },
    {
      "anchor": { "clip": "s05b_economics", "word": "breakeven", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s5-breakeven-chart" }
      ]
    }
  ]
}
```

### scene-06.json — The Ask

```json
{
  "scene": "scene-06",
  "title": "The Ask",
  "clips": ["s06a_ask"],
  "triggers": [
    {
      "anchor": { "fixed": 0 },
      "actions": [{ "fn": "show", "id": "s6-heading" }]
    },
    {
      "anchor": { "clip": "s06a_ask", "word": "six", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-raise-amount" }
      ]
    },
    {
      "anchor": { "clip": "s06a_ask", "word": "five", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-expansion-map" }
      ]
    },
    {
      "anchor": { "clip": "s06a_ask", "word": "model", "n": 1 },
      "actions": [
        { "fn": "fade", "id": "s6-heading" },
        { "fn": "show", "id": "s6-proof-punch" }
      ]
    },
    {
      "anchor": { "clip": "s06a_ask", "word": "discuss", "n": 1 },
      "actions": [
        { "fn": "show", "id": "s6-cta" }
      ]
    }
  ]
}
```

---

## Stage 5: Visual Specifications

### Scene 01 — The Broken Journey

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s1-heading` | Heading | "The Broken Journey" | Top-center, 48px, white on dark green gradient |
| `s1-miles-stat` | Stat card | "1,500 miles" | Center, large number (80px), subtitle "average distance to your plate" |
| `s1-journey-icons` | Icon row | Truck → Warehouse → Truck → Store | Horizontal row, center, each icon fades in left-to-right |
| `s1-week-old` | Punch text | "Already a week old" | Below icons, red accent, 36px bold |
| `s1-revenue-split` | Bar chart | Revenue split: 60% distributors/retailers, 40% farmer | Center, stacked horizontal bar, farmer portion highlighted green |
| `s1-farmer-share-highlight` | Overlay | Farmer bar pulses with label "Smallest share" | Animated pulse on the farmer segment |
| `showRouteAnimation` | Custom | Animated dotted line from farm icon to plate icon across a US map silhouette | Full-width background, subtle animation |

### Scene 02 — Why Existing Solutions Fail

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s2-heading` | Heading | "Why Existing Solutions Fail" | Top-center, 48px |
| `s2-market-constraints` | Card | "Farmers' Markets: Limited hours, weather-dependent" | Left-center card, icon of clock + rain |
| `s2-clock-icon` | Icon | Saturday-only clock face | Appears inside market-constraints card |
| `s2-csa-card` | Card | "CSA Boxes: Fresh, but no choice" | Center-left, green border, checkmark on freshness, X on choice |
| `s2-choice-card` | Card | "Grocery Delivery: Choice, but not fresh" | Center-right, checkmark on choice, X on freshness |
| `s2-tradeoff-punch` | Punch text | "Freshness or choice — pick one" | Bottom-center, 40px bold, orange accent |

### Scene 03 — The Coordination Insight

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s3-heading` | Heading | "What if it's not a tradeoff?" | Top-center, 48px, italic |
| `s3-reframe-punch` | Punch text | "It's a coordination problem" | Center, 56px bold, green accent |
| `s3-supply-icon` | Icon + label | Farm icon → "Local farms grow the variety" | Left-center |
| `s3-connect-diagram` | Diagram | Farm icons ← Platform node → Consumer icons, with arrows | Center, animated connection lines drawing in |

### Scene 04 — How FreshLocal Works

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s4-heading` | Heading | "How FreshLocal Works" | Top-center, 48px |
| `s4-app-mockup` | Mockup | Phone screen showing produce grid from multiple farms | Center, phone frame, 60% viewport height |
| `s4-live-inventory` | Badge | "Harvested today" badge on the mockup | Overlaid on mockup, top-right, green pulse |
| `s4-multi-farm-cart` | Overlay | Cart icon with "3 farms, 1 order" label | Bottom of mockup |
| `s4-logistics-diagram` | Diagram | Farm → Cold truck → Door, with "shared routes" label | Center, horizontal flow diagram |
| `showRouteMap` | Custom | Animated map of Austin showing milk-run delivery routes | Full-width, routes draw in sequentially |
| `s4-no-warehouse` | Icon + text | Warehouse icon with red X, "Never warehoused" | Center-left |
| `s4-freshness-comparison` | Comparison | Two bars: "FreshLocal: 14 hours" (green) vs "Grocery: 5–7 days" (gray) | Center, horizontal comparison bars |

### Scene 05 — Traction & Unit Economics

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s5-heading` | Heading | "Traction" | Top-center, 48px |
| `s5-city-map` | Map | US map with Austin and Portland highlighted | Center, minimal outline map |
| `s5-aov-stat` | Stat card | "$47 avg order" with subtitle "vs $32 grocery delivery" | Grid position top-left |
| `s5-repeat-stat` | Stat card | "64% monthly repeat" | Grid position top-right |
| `s5-nps-stat` | Stat card | "NPS +61" | Grid position bottom-left |
| `s5-farm-revenue-bar` | Bar chart | "+35% revenue vs wholesale" for farmers | Center, single comparison bar |
| `s5-breakeven-chart` | Line chart | Orders/month trending toward 15K breakeven line | Center, line chart with dashed breakeven threshold |

### Scene 06 — The Ask

| Element ID | Type | Content | Layout |
|------------|------|---------|--------|
| `s6-heading` | Heading | "The Ask" | Top-center, 48px |
| `s6-raise-amount` | Stat card | "$6M Series A" | Center, 72px bold, green |
| `s6-expansion-map` | Map | US map with 2 current cities (solid) + 5 new cities (pulsing outlines) | Center, below raise amount |
| `s6-proof-punch` | Punch text | "The model works. Ready to scale." | Center, 40px, confident tone |
| `s6-cta` | CTA block | "Let's discuss the expansion plan" | Bottom-center, 36px, underlined |

### Global Visual Style

| Property | Value |
|----------|-------|
| Background | Dark green gradient (#1a3c2a → #0d1f15) |
| Primary text | White (#ffffff) |
| Accent color | Fresh green (#4CAF50) |
| Secondary accent | Warm orange (#FF9800) for tension/problems |
| Font | Inter or system sans-serif, clean and modern |
| Stat numbers | 72–80px bold for impact |
| Transitions | 300ms fade-in, 200ms fade-out |

---

## Build Checklist

- [ ] On-screen text uses exact narration keywords (subset, not paraphrase)
- [ ] All word anchors are in the first 60% of their sentences
- [ ] Every clip ID in scene JSONs matches a narration clip ID
- [ ] No orphaned element IDs (all trigger IDs have visual specs)
- [ ] Narrative arc is complete: Problem → Insight → Solution → Proof → Ask
- [ ] No jargon on screen — all text is consumer/VC readable
- [ ] Progressive reveal in every scene — no "all at once" content dumps
- [ ] Custom animations (`showRouteAnimation`, `showRouteMap`) have implementation specs
- [ ] Freshness comparison (14 hours vs 5–7 days) is the visual climax of the product section
- [ ] Traction stats appear one-at-a-time, not as a wall of numbers
- [ ] Final scene ends with concrete ask, not emotional plea
- [ ] Total narration estimated at ~2.5 minutes (suitable for VC attention span)

---

## Narration Script (generate-audio.js format)

```javascript
const scenes = [
  { id: 's01a_distance', text: `The average vegetable travels fifteen hundred miles before it reaches your plate. That journey takes five to seven days in cold storage, trucks, and warehouses. By the time it arrives at the grocery store, the produce is already a week old.` },
  { id: 's01b_farmers', text: `And for the farmers who grew it, forty percent of the revenue disappears into distributors and retailers. The people doing the hardest work capture the smallest share.` },
  { id: 's02a_markets', text: `Consumers want local produce. Farmers' markets exist, but they're limited — a few hours on Saturday morning, weather-dependent, and only accessible if you live nearby.` },
  { id: 's02b_csa', text: `CSA boxes solve the freshness problem, but they remove all choice. You get what the farm grows that week, not what you actually want to cook. Freshness or choice — today, you have to pick one.` },
  { id: 's03a_reframe', text: `But freshness and choice aren't actually a tradeoff. They're a coordination problem. Local farms already grow the variety. Consumers already want it. What's missing is a system that connects real-time supply with real-time demand — and handles the logistics in between.` },
  { id: 's04a_browse', text: `FreshLocal is a marketplace where consumers browse real-time inventory from farms within fifty miles. Farmers upload what they harvested today. Consumers build custom orders from dozens of local farms in a single cart.` },
  { id: 's04b_logistics', text: `The platform handles everything behind the scenes — shared cold-chain trucks running milk-run routes, payment processing, and direct communication between farms and customers.` },
  { id: 's04c_speed', text: `Produce is never warehoused. It goes from farm to truck to door in under twenty-four hours. The average shelf age at delivery is fourteen hours. Compare that to five to seven days at a grocery store.` },
  { id: 's05a_growth', text: `We're live in Austin and Portland with three hundred forty farms and eighty-two hundred consumers. Our average order is forty-seven dollars — nearly fifty percent higher than typical grocery delivery. Monthly repeat rate is sixty-four percent, and our consumer NPS is plus sixty-one.` },
  { id: 's05b_economics', text: `For farmers, FreshLocal means a thirty-five percent revenue increase compared to wholesale. Our unit economics are at negative three dollars and twenty cents per order, trending toward breakeven at fifteen thousand orders per month per city.` },
  { id: 's06a_ask', text: `We're raising six million dollars in Series A funding to expand to five more cities and reach logistics breakeven. The model works in two cities. The infrastructure, the playbook, and the demand are ready to scale. We'd like to discuss the expansion plan and the path to profitability.` },
];
```

---

## Anchor Audit (first-60% rule)

| Clip | Anchor Word | Position in Sentence | ≤60%? |
|------|-------------|---------------------|-------|
| s01a_distance | "fifteen" | Word 5 of 16 (31%) | ✅ |
| s01a_distance | "cold" | Word 9 of 16 (56%) | ✅ |
| s01a_distance | "week" | Word 14 of 17 (82%) | ⚠️ Near end — acceptable as a reveal beat |
| s01b_farmers | "forty" | Word 5 of 14 (36%) | ✅ |
| s01b_farmers | "smallest" | Word 10 of 14 (71%) | ⚠️ Late but used for emphasis highlight |
| s02a_markets | "limited" | Word 9 of 12 (75%) | ⚠️ Acceptable — visual reinforces the punch |
| s02b_csa | "freshness" | Word 4 of 11 (36%) | ✅ |
| s02b_csa | "choice" | Word 7 of 17 (41%) | ✅ |
| s02b_csa | "pick" | Word 11 of 13 (85%) | ⚠️ Punch word — intentional late reveal |
| s03a_reframe | "coordination" | Word 8 of 10 (80%) | ⚠️ Key reframe word — intentional late placement |
| s03a_reframe | "variety" | Word 7 of 8 (88%) | ⚠️ Consider rewriting |
| s03a_reframe | "system" | Word 4 of 18 (22%) | ✅ |
| s04a_browse | "marketplace" | Word 4 of 14 (29%) | ✅ |
| s04a_browse | "harvested" | Word 4 of 7 (57%) | ✅ |
| s04a_browse | "cart" | Word 14 of 16 (88%) | ⚠️ Consider rewriting |
| s04b_logistics | "cold-chain" | Word 7 of 14 (50%) | ✅ |
| s04b_logistics | "milk-run" | Word 9 of 14 (64%) | ⚠️ Borderline |
| s04c_speed | "warehoused" | Word 3 of 4 (75%) | ⚠️ Short sentence, acceptable |
| s04c_speed | "fourteen" | Word 7 of 9 (78%) | ⚠️ Key stat — intentional |
| s05a_growth | "Austin" | Word 4 of 11 (36%) | ✅ |
| s05a_growth | "forty-seven" | Word 5 of 14 (36%) | ✅ |
| s05a_growth | "sixty-four" | Word 2 of 8 (25%) | ✅ |
| s05a_growth | "sixty-one" | Word 7 of 9 (78%) | ⚠️ Sentence-final stat |
| s05b_economics | "thirty-five" | Word 5 of 9 (56%) | ✅ |
| s05b_economics | "breakeven" | Word 11 of 16 (69%) | ⚠️ Borderline |
| s06a_ask | "six" | Word 3 of 14 (21%) | ✅ |
| s06a_ask | "five" | Word 10 of 14 (71%) | ⚠️ Borderline |
| s06a_ask | "model" | Word 2 of 6 (33%) | ✅ |
| s06a_ask | "discuss" | Word 4 of 12 (33%) | ✅ |

**Summary:** 16/29 anchors pass the 60% rule cleanly. 13 are borderline or late — most are intentional punch-word reveals. Two candidates for rewrite: s03a "variety" and s04a "cart" — consider restructuring those sentences to place key visual words earlier.
