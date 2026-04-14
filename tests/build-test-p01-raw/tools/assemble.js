/**
 * assemble.js — Resolves word anchors in scene JSONs to ms delays,
 * patches SCENES array into click-done-video.html.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_IN = path.join(ROOT, 'click-done-video.html');

// Load word-boundary metadata
const meta = loadMetadata(AUDIO_DIR);
console.log('Loaded metadata for clips:', Object.keys(meta).join(', '));

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = sceneFiles.map(f => {
  const raw = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, f), 'utf-8'));
  console.log(`Processing ${f}: ${raw.triggers.length} triggers`);

  const triggers = raw.triggers.map(trig => {
    let delayMs;
    if (trig.anchor.fixed !== undefined) {
      delayMs = trig.anchor.fixed;
    } else {
      delayMs = T(meta, raw.clips, trig.anchor.clip, trig.anchor.word, trig.anchor.n || 1);
      if (delayMs < 0) {
        // Fallback: try case-insensitive partial match
        console.warn(`  ⚠ Word "${trig.anchor.word}" not found in ${trig.anchor.clip}, using 0ms`);
        delayMs = 0;
      }
    }
    const jsBody = actionsToJS(trig.actions);
    return { delay: delayMs, run: jsBody };
  });

  return {
    scene: raw.scene,
    title: raw.title,
    clips: raw.clips,
    triggers
  };
});

// Build the SCENES JS array
const scenesJS = scenes.map(s => {
  const triggersStr = s.triggers.map(t =>
    `    { delay: ${t.delay}, run: function(){ ${t.run} } }`
  ).join(',\n');
  const clipsStr = s.clips.map(c =>
    typeof c === 'string' ? `'${c}'` : JSON.stringify(c)
  ).join(', ');
  return `  {\n    scene: '${s.scene}',\n    title: '${s.title}',\n    clips: [${clipsStr}],\n    triggers: [\n${triggersStr}\n    ]\n  }`;
}).join(',\n');

const scenesBlock = `const SCENES = [\n${scenesJS}\n];`;

// Patch HTML
let html = fs.readFileSync(HTML_IN, 'utf-8');
html = html.replace(/const SCENES = \[\];/, scenesBlock);
fs.writeFileSync(HTML_IN, html, 'utf-8');
console.log(`\n✓ Patched SCENES (${scenes.length} scenes) into click-done-video.html`);
