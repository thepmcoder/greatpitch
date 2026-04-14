/**
 * assemble.js — Resolve word anchors from scene JSONs into millisecond delays,
 * then patch the HTML template with the computed SCENES array.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const TEMPLATE = path.join(__dirname, '..', 'click-done-video.html');

// 1. Load word-boundary metadata
const meta = loadMetadata(AUDIO_DIR);
console.log('Loaded metadata for clips:', Object.keys(meta).join(', '));

// 2. Load and process scene JSONs
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = [];
let warnings = 0;

for (const file of sceneFiles) {
  const raw = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  console.log(`\nProcessing ${file}: "${raw.title}" (${raw.clips.length} clips)`);

  const resolved = {
    scene: raw.scene,
    title: raw.title,
    clips: raw.clips,
    triggers: []
  };

  for (const trigger of raw.triggers) {
    let delayMs;

    if (trigger.anchor.fixed !== undefined) {
      delayMs = trigger.anchor.fixed;
      console.log(`  [fixed] delay=${delayMs}ms → ${actionsToJS(trigger.actions)}`);
    } else {
      const { clip, word, n } = trigger.anchor;
      delayMs = T(meta, raw.clips, clip, word, n || 1);
      if (delayMs < 0) {
        console.warn(`  ⚠ Word "${word}" (n=${n||1}) not found in clip "${clip}"`);
        warnings++;
        delayMs = 0;
      } else {
        console.log(`  [${clip}] "${word}" (n=${n||1}) → delay=${delayMs}ms → ${actionsToJS(trigger.actions)}`);
      }
    }

    resolved.triggers.push({
      delay: delayMs,
      code: actionsToJS(trigger.actions)
    });
  }

  scenes.push(resolved);
}

// 3. Patch HTML template
let html = fs.readFileSync(TEMPLATE, 'utf-8');
const scenesJS = 'const SCENES = ' + JSON.stringify(scenes, null, 2) + ';';
html = html.replace(/const SCENES = \[\];/, scenesJS);
fs.writeFileSync(TEMPLATE, html, 'utf-8');

console.log(`\n✓ Assembled ${scenes.length} scenes into template`);
if (warnings > 0) console.log(`⚠ ${warnings} anchor warning(s) — check scene JSONs`);
