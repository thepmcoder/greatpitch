# Skill Review: P06 Elevate Pitch Video

## Narrative Issues (ranked by impact)

1. **Linear feature tour, no tension or surprise** — The arc is Problem → Data → Insight → Solution → Framework → Features → Validation → CTA. This is exactly the "marketing brochure" pattern Stage 2 warns against. There is no moment where the audience's assumptions are challenged. **Fix:** Restructure using "The Reframe." After the data (scene 2), show what students currently try (generic career tools, chatbots). Then stress-test: "Even if every platform improved, they'd still be silos." Arrive at the insight as a *surprise*, not a heading. The reframe is: "The problem isn't bad tools — it's that no tool connects the dots across domains."

2. **Facts stated and immediately consumed, never planted for later payoff** — The 80%/14%/15% stats appear in scene 2 and are never referenced again. They don't build toward anything. **Fix:** Plant the 14% satisfaction stat in scene 1 as part of the hook. Then in scene 7 (validation), contrast it with the 87% — "Remember: only 14% were satisfied with what they had. 87% believe Elevate changes that." This creates a narrative callback.

3. **No questions used to engage the audience** — Every sentence is declarative. Stage 2 says "Questions > statements for engagement." **Fix:** Scene 1 should end with a question the audience feels: "What if there was one place that connected all of it?" Scene 3 should ask: "But can any single tool reason across all these domains?" These pull the audience forward instead of lecturing them.

4. **The ask is not concrete** — "Join us. Let's reduce friction" is an emotional plea, not a concrete ask. The brief says this is for a college demo day. **Fix:** Replace s08_cta with: "We're looking for ten students to pilot Elevate this semester. Scan the QR code or find us after the talk. Let's build this together." (Or whatever the actual ask is — but it must be specific and actionable.)

5. **LIFT framework feels like a brochure insert** — Scene 5 reads the acronym aloud letter by letter. Audiences tune out acronym walkthroughs. **Fix:** Cut the LIFT scene entirely. Weave its concepts into scene 6 (what Elevate delivers) where they have concrete meaning. Or, if the creators insist on LIFT, show it as a quick visual-only overlay during scene 4 (the solution intro) without narrating each letter.

## Narration Fixes

- Clip `s01_hook`: `Every semester, students scramble across dozens of platforms — LinkedIn, Unstop, Internshala, college portals — just trying to answer one question: What should I do next?` → `Every semester, you open LinkedIn, then Unstop, then Internshala, then your college portal — just trying to answer one question. What should I actually do next?` (Use "you" for immediacy; pause before the question)

- Clip `s02_data`: `The data is stark.` → `We surveyed students here on campus. Here's what they told us.` (Ground the data in a real moment; "stark" is editorializing)

- Clip `s03_insight`: `Career tools and generic chatbots don't solve this. They operate in silos. Students need cross-domain reasoning — connecting job posts, research areas, hackathon deadlines, and their own academic stage into one personalized view.` → `Career tools and chatbots haven't solved this. Each one lives in its own world. What students actually need is something that connects job posts, research opportunities, hackathon deadlines, and your academic stage — all in one view.` (Replace jargon "silos" and "cross-domain reasoning" with plain language; use "you")

- Clip `s04_solution`: `Introducing Elevate. An AI-powered platform that transforms unstructured academic and career data into structured, actionable intelligence.` → `That's what Elevate does. It takes scattered academic and career information and turns it into clear, personal guidance.` (Kill "Introducing" — brochure language. Kill "unstructured/structured" and "actionable intelligence" — jargon.)

- Clip `s05_lift`: `Elevate uses the LIFT framework. Locate the right information. Interpret what applies to you. Follow through with structure. And Time your actions correctly.` → Cut entirely, or compress to: `Elevate helps you find the right information, figure out what applies to you, follow through with a clear plan, and act at the right time.` (If kept, don't spell out the acronym — just describe what it does.)

- Clip `s06_delivers`: `Elevate delivers three things. Unified tailored guidance that translates career data into personalized next steps. Opportunity awareness with timely notifications for hackathons, contests, and deadlines. And research engagement that connects students with professors and open internships.` → Split into 2 clips. This is 43 words in a single run — too long to follow when spoken. Suggested split: `s06a_delivers`: `First, personalized guidance. Elevate translates career data into your specific next steps — not generic advice.` `s06b_delivers`: `Second, it tracks hackathons, contests, and deadlines — and notifies you at the right time. And third, it helps you find professors with open research positions and actually apply.`

- Clip `s08_cta`: `Join us. Let's reduce friction in student career and research journeys. Elevate. Your choices. Your preparation. Your confidence. Your success.` → `We're piloting Elevate this semester and looking for students to try it. Find us after the presentation, or scan the code on screen. Elevate — your choices, your preparation, your confidence, your success.` (Concrete ask + tagline.)

## Anchor Fixes

- Scene 1: anchor `"question"` is at word ~22 of 26 (~85%) → move to `"answer"` at word ~20 (or restructure sentence so the question text appears earlier)
- Scene 3: anchor `"silos"` is the last word of its sentence (100%) → move to `"operate"` at word 2 of 5 (~40%)
- Scene 4: anchor `"intelligence"` is the last word of its sentence (100%) → move to `"transforms"` is already used; add the glow trigger to the `"transforms"` anchor as a second action, or anchor to `"actionable"` at word 12 of 13 — still too late. **Best fix:** rewrite the sentence (see narration fix above) and anchor glow to `"clear"` in the new version
- Scene 7: anchor `"useful"` is at word 14 of 19 (~74%) → move to `"believe"` at word 7 (~37%)
- Scene 8: anchor `"choices"` is word 2 of 2 in "Your choices" (100%) → move to the first `"Your"` which begins the tagline sequence

## Bug Fixes

- **Multi-word anchors `"80 percent"`, `"14 percent"`, `"15 percent"`, `"87 percent"`**: Word boundary events from TTS fire on individual words, not phrases. These anchors will fail to resolve because no single word boundary event matches `"80 percent"` as one token. → **Fix:** Change each to anchor on the number only: `"word": "80"`, `"word": "14"`, `"word": "15"`, `"word": "87"`. Verify the assembler matches these correctly (numbers may be synthesized as text by TTS — check metadata for how "80" is tokenized).

- **s2-title (scene 2)**: The title "The Data Is Stark" is shown at `fixed: 0` but is never hidden/faded. It remains visible while the stat cards appear below it, which is fine visually — but when stats fill the screen, the title competes for space. → **Fix:** Add a `fade` action for `s2-title` on the first stat trigger (`"word": "80"`).

- **s4-glow**: Shown at the end of scene 4 but never cleared. The `clearAll` at scene 5 start targets `scene-05`, not `scene-04`. Since scenes use opacity transitions, this isn't visible — but it means s4-glow's CSS animation runs forever in the background. → **Fix:** Add `{ "fn": "fade", "id": "s4-glow" }` to scene-05's `fixed: 0` trigger, or add a `clearAll` for `scene-04`.

## Overall Assessment

The visual design is polished — gradients, stat cards, LIFT grid, and progressive reveals all look professional. The technical assembly (anchors → delays, scene transitions) works correctly. **The core problem is narrative, not production.** The video reads as a product spec converted to voiceover: problem, data, insight, solution, framework, features, validation, ask — with no tension, no questions, no callbacks, and no surprise. It needs a structural rewrite (Stages 2-3) more than visual fixes. The multi-word anchor bug should be fixed regardless. Recommendation: **rewrite narration and restructure scenes 1-4, then rebuild.** Scenes 5-8 can be patched.
