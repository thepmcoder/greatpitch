/**
 * assemble.js — Reads scene JSONs + audio metadata, resolves word anchors
 * to millisecond delays, patches the SCENES array into the HTML template.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_SRC = path.join(__dirname, '..', 'click-done-video.html');

// Load metadata
const meta = loadMetadata(AUDIO_DIR);
console.log(`Loaded metadata for clips: ${Object.keys(meta).join(', ')}`);

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.match(/^scene-\d+\.json$/))
  .sort();

const assembledScenes = [];

for (const file of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  console.log(`\nProcessing ${file}: "${scene.title}" — clips: [${scene.clips.join(', ')}]`);

  const triggers = [];
  for (const trigger of scene.triggers) {
    let delayMs;
    if (trigger.anchor.fixed !== undefined) {
      delayMs = trigger.anchor.fixed;
    } else {
      delayMs = T(meta, scene.clips, trigger.anchor.clip, trigger.anchor.word, trigger.anchor.n || 1);
      if (delayMs === -1) {
        console.warn(`  ⚠ Word "${trigger.anchor.word}" not found in clip "${trigger.anchor.clip}"`);
        delayMs = 0;
      }
    }
    const jsBody = actionsToJS(trigger.actions);
    console.log(`  @${delayMs}ms → ${jsBody}`);
    triggers.push({ delay: delayMs, run: jsBody });
  }

  assembledScenes.push({
    scene: scene.scene,
    title: scene.title,
    clips: scene.clips,
    triggers: triggers
  });
}

// Build the SCENES JS literal
const scenesJS = assembledScenes.map(s => {
  const triggersJS = s.triggers.map(t =>
    `    { delay: ${t.delay}, run() { ${t.run} } }`
  ).join(',\n');
  const clipsJS = s.clips.map(c => `"${c}"`).join(', ');
  return `  {\n    scene: "${s.scene}",\n    title: "${s.title}",\n    clips: [${clipsJS}],\n    triggers: [\n${triggersJS}\n    ]\n  }`;
}).join(',\n');

const scenesBlock = `const SCENES = [\n${scenesJS}\n];`;

// Patch the HTML
let html = fs.readFileSync(HTML_SRC, 'utf-8');
html = html.replace(/const SCENES = \[\];/, scenesBlock);

fs.writeFileSync(HTML_SRC, html, 'utf-8');
console.log(`\n✓ Patched click-done-video.html with ${assembledScenes.length} scenes`);
