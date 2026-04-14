/**
 * assemble.js — Resolve word anchors from scene JSONs into millisecond delays.
 * Reads scene JSON files, resolves anchors against TTS metadata, patches the HTML template.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_TEMPLATE = path.join(__dirname, '..', 'click-done-video.html');
const HTML_OUTPUT = path.join(__dirname, '..', 'click-done-video.html');

// Load metadata
const meta = loadMetadata(AUDIO_DIR);
console.log(`Loaded metadata for ${Object.keys(meta).length} clips:`, Object.keys(meta).join(', '));

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const timeline = [];

for (const file of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  console.log(`\nProcessing ${file}: "${scene.title}" (clips: ${scene.clips.join(', ')})`);

  const resolvedTriggers = [];
  for (const trigger of scene.triggers) {
    let delayMs = 0;

    if (trigger.anchor.fixed !== undefined) {
      delayMs = trigger.anchor.fixed;
    } else if (trigger.anchor.clip && trigger.anchor.word) {
      delayMs = T(meta, scene.clips, trigger.anchor.clip, trigger.anchor.word, trigger.anchor.n || 1);
      if (delayMs === -1) {
        console.warn(`  ⚠ Word "${trigger.anchor.word}" (n=${trigger.anchor.n || 1}) not found in clip "${trigger.anchor.clip}"`);
        delayMs = 0;
      } else {
        console.log(`  ✓ "${trigger.anchor.word}" → ${delayMs}ms`);
      }
    }

    const js = actionsToJS(trigger.actions);
    resolvedTriggers.push({ delay: delayMs, js });
  }

  timeline.push({
    scene: scene.scene,
    title: scene.title,
    clips: scene.clips,
    triggers: resolvedTriggers
  });
}

// Build the timeline JS
const timelineJS = timeline.map(s => {
  const triggersJS = s.triggers.map(t =>
    `{ delay: ${t.delay}, run(){ ${t.js} } }`
  ).join(',\n      ');
  const clipsJS = s.clips.map(c => `'${c}'`).join(', ');
  return `  {\n    scene: '${s.scene}',\n    title: '${s.title}',\n    clips: [${clipsJS}],\n    triggers: [\n      ${triggersJS}\n    ]\n  }`;
}).join(',\n');

// Patch the HTML template
let html = fs.readFileSync(HTML_TEMPLATE, 'utf-8');
html = html.replace(
  'const sceneTimeline = [/*TIMELINE*/];',
  `const sceneTimeline = [\n${timelineJS}\n];`
);

fs.writeFileSync(HTML_OUTPUT, html, 'utf-8');
console.log(`\n✓ Assembled timeline with ${timeline.length} scenes into click-done-video.html`);
