/**
 * assemble.js — Reads scene JSONs + audio metadata, resolves word anchors
 * to millisecond delays, and patches the SCENES array into the HTML template.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const ROOT = path.join(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_SRC = path.join(ROOT, 'click-done-video.html');

// Load word-boundary metadata
const meta = loadMetadata(AUDIO_DIR);

// Load and sort scene files
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const assembled = [];

for (const file of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  const triggers = [];

  for (const trig of scene.triggers) {
    let delay;

    if (trig.anchor.fixed !== undefined) {
      delay = trig.anchor.fixed;
    } else if (trig.anchor.clip) {
      delay = T(meta, scene.clips, trig.anchor.clip, trig.anchor.word, trig.anchor.n || 1);
      if (delay < 0) {
        console.warn(`  WARN: word "${trig.anchor.word}" not found in clip "${trig.anchor.clip}" (scene ${scene.scene})`);
        delay = 0;
      }
    } else {
      delay = 0;
    }

    triggers.push({
      delay,
      js: actionsToJS(trig.actions)
    });
  }

  assembled.push({
    scene: scene.scene,
    title: scene.title,
    clips: scene.clips,
    triggers
  });

  console.log(`  ✓ ${scene.scene}: ${scene.title} (${triggers.length} triggers)`);
}

// Patch HTML
let html = fs.readFileSync(HTML_SRC, 'utf-8');
const scenesJSON = JSON.stringify(assembled, null, 2);
html = html.replace(
  /const SCENES = \[\];/,
  `const SCENES = ${scenesJSON};`
);

fs.writeFileSync(HTML_SRC, html, 'utf-8');
console.log(`\nAssembled ${assembled.length} scenes into click-done-video.html`);
