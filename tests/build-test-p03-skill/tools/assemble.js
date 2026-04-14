/**
 * assemble.js — Resolve word anchors in scene JSONs to millisecond delays,
 * then patch the HTML template with the SCENES array.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const TEMPLATE = path.join(__dirname, '..', 'click-done-video.html');

// Load word-boundary metadata
const meta = loadMetadata(AUDIO_DIR);
console.log(`Loaded metadata for ${Object.keys(meta).length} clips`);

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = [];
for (const file of sceneFiles) {
  const raw = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  const resolved = {
    scene: raw.scene,
    title: raw.title,
    clips: raw.clips,
    triggers: []
  };

  for (const trigger of raw.triggers) {
    let delay;
    if (trigger.anchor.fixed !== undefined) {
      delay = trigger.anchor.fixed;
    } else {
      const { clip, word, n } = trigger.anchor;
      delay = T(meta, raw.clips, clip, word, n || 1);
      if (delay === -1) {
        console.warn(`  WARNING: Word "${word}" (n=${n||1}) not found in clip "${clip}" (${file})`);
        delay = 0;
      }
    }

    resolved.triggers.push({
      delay,
      actions: trigger.actions,
      actionFn: actionsToJS(trigger.actions)
    });
  }

  scenes.push(resolved);
  console.log(`  ${file}: ${resolved.triggers.length} triggers resolved`);
}

// Generate the SCENES JS constant
const scenesJS = scenes.map(s => {
  const triggersJS = s.triggers.map(t =>
    `{ delay: ${t.delay}, actionFn: function() { ${t.actionFn} } }`
  ).join(',\n      ');

  const clipsJS = JSON.stringify(s.clips);
  return `  {
    scene: ${JSON.stringify(s.scene)},
    title: ${JSON.stringify(s.title)},
    clips: ${clipsJS},
    triggers: [
      ${triggersJS}
    ]
  }`;
}).join(',\n');

const scenesBlock = `[\n${scenesJS}\n]`;

// Patch the template
let html = fs.readFileSync(TEMPLATE, 'utf-8');
html = html.replace(/\/\*SCENES_PLACEHOLDER\*\/\[\]/, scenesBlock);

fs.writeFileSync(TEMPLATE, html, 'utf-8');
console.log(`\nPatched ${TEMPLATE} with ${scenes.length} scenes.`);
