const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS } = require('./shared');

const ROOT = path.join(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_FILE = path.join(ROOT, 'click-done-video.html');

const meta = loadMetadata(AUDIO_DIR);

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = [];
for (const file of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
  const resolved = {
    scene: scene.scene,
    clips: scene.clips,
    triggers: []
  };
  
  for (const trigger of scene.triggers) {
    let delay = 0;
    if ('fixed' in trigger.anchor) {
      delay = trigger.anchor.fixed;
    } else if (trigger.anchor.clip) {
      delay = T(meta, scene.clips, trigger.anchor.clip, trigger.anchor.word, trigger.anchor.n || 1);
      if (delay === -1) {
        console.warn(`⚠ Word not found: "${trigger.anchor.word}" (n=${trigger.anchor.n||1}) in clip "${trigger.anchor.clip}" — defaulting to 0`);
        delay = 0;
      }
    }
    resolved.triggers.push({
      delay: delay,
      fn: actionsToJS(trigger.actions)
    });
  }
  
  scenes.push(resolved);
  console.log(`✓ ${scene.scene} — ${resolved.triggers.length} triggers resolved`);
}

// Patch HTML
let html = fs.readFileSync(HTML_FILE, 'utf-8');
html = html.replace('const SCENES = [];', 'const SCENES = ' + JSON.stringify(scenes, null, 2) + ';');
fs.writeFileSync(HTML_FILE, html, 'utf-8');
console.log(`\n✓ Patched ${HTML_FILE} with ${scenes.length} scenes`);
