/**
 * assemble.js — Resolve word anchors to ms delays, patch SCENES into HTML.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_IN = path.join(__dirname, '..', 'click-done-video.html');
const HTML_OUT = HTML_IN; // overwrite in place

// Load word-boundary metadata
const meta = loadMetadata(AUDIO_DIR);

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = sceneFiles.map(f => JSON.parse(fs.readFileSync(path.join(SCENES_DIR, f), 'utf-8')));

// Resolve triggers to ms delays
const resolvedScenes = scenes.map(scene => {
  const resolved = {
    scene: scene.scene,
    title: scene.title,
    clips: scene.clips,
    triggers: scene.triggers.map(trigger => {
      let delayMs = 0;
      if (trigger.anchor.fixed !== undefined) {
        delayMs = trigger.anchor.fixed;
      } else if (trigger.anchor.clip) {
        const ms = T(meta, scene.clips, trigger.anchor.clip, trigger.anchor.word, trigger.anchor.n || 1);
        delayMs = ms >= 0 ? ms : 0;
        if (ms < 0) {
          console.warn(`  WARN: word "${trigger.anchor.word}" not found in clip "${trigger.anchor.clip}" (scene ${scene.scene})`);
        }
      }
      return {
        delayMs,
        actions: trigger.actions
      };
    })
  };
  return resolved;
});

console.log(`Resolved ${resolvedScenes.length} scenes`);
resolvedScenes.forEach(s => {
  console.log(`  ${s.scene}: ${s.triggers.length} triggers, clips: [${s.clips.join(', ')}]`);
});

// Patch HTML
let html = fs.readFileSync(HTML_IN, 'utf-8');
const scenesJSON = JSON.stringify(resolvedScenes, null, 2);
html = html.replace(/const SCENES = \[\];/, `const SCENES = ${scenesJSON};`);

fs.writeFileSync(HTML_OUT, html, 'utf-8');
console.log(`Patched SCENES into ${HTML_OUT}`);
