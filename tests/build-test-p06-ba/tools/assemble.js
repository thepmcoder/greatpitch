/**
 * assemble.js — Resolves word-anchored triggers from scene JSONs into millisecond delays,
 * then patches them into click-done-video.html as the SCENES array.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_FILE = path.join(__dirname, '..', 'click-done-video.html');

const meta = loadMetadata(AUDIO_DIR);

// Load all scene JSONs, sorted by filename
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenesOutput = [];

for (const file of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  const clips = scene.clips || [];
  const entries = [];

  for (const trigger of (scene.triggers || [])) {
    const anchor = trigger.anchor;
    let delayMs;

    if (anchor.fixed !== undefined) {
      delayMs = anchor.fixed;
    } else if (anchor.clip && anchor.word) {
      delayMs = T(meta, clips, anchor.clip, anchor.word, anchor.n || 1);
      if (delayMs === -1) {
        console.warn(`  ⚠ Word "${anchor.word}" (n=${anchor.n||1}) not found in clip "${anchor.clip}" — scene ${scene.scene}`);
        delayMs = 0;
      }
    } else {
      delayMs = 0;
    }

    const js = actionsToJS(trigger.actions);
    entries.push({ delay: delayMs, js });
  }

  // Sort by delay
  entries.sort((a, b) => a.delay - b.delay);

  scenesOutput.push({
    scene: scene.scene,
    title: scene.title,
    clips: clips,
    triggers: entries
  });
}

// Build the SCENES JS constant
let scenesJS = 'const SCENES = [\n';
for (const s of scenesOutput) {
  scenesJS += `  { scene: "${s.scene}", title: ${JSON.stringify(s.title)}, clips: ${JSON.stringify(s.clips)}, triggers: [\n`;
  for (const t of s.triggers) {
    scenesJS += `    { delay: ${t.delay}, run: function(){ ${t.js} } },\n`;
  }
  scenesJS += `  ]},\n`;
}
scenesJS += '];\n';

// Patch into HTML
let html = fs.readFileSync(HTML_FILE, 'utf-8');
html = html.replace('/* __SCENES_PLACEHOLDER__ */', scenesJS);
fs.writeFileSync(HTML_FILE, html, 'utf-8');
console.log(`✓ Assembled ${scenesOutput.length} scenes into click-done-video.html`);
