/**
 * assemble.js — Resolve word anchors from scene JSONs into timed SCENES array.
 * Uses shared.js: loadMetadata, T, actionsToJS, LEAD_MS
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS, estimateClipDuration } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const TEMPLATE = path.join(__dirname, '..', 'click-done-video.html');
const OUTPUT = path.join(__dirname, '..', 'click-done-video.html');

// Load metadata
const meta = loadMetadata(AUDIO_DIR);
console.log('Loaded metadata for clips:', Object.keys(meta).join(', '));

// Load scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const scenes = sceneFiles.map(f => JSON.parse(fs.readFileSync(path.join(SCENES_DIR, f), 'utf-8')));

// Resolve each trigger anchor to a delay
const resolvedScenes = scenes.map(scene => {
  const resolvedTriggers = scene.triggers.map(trigger => {
    let delayMs;
    if (trigger.anchor.fixed !== undefined) {
      delayMs = trigger.anchor.fixed;
    } else {
      delayMs = T(meta, scene.clips, trigger.anchor.clip, trigger.anchor.word, trigger.anchor.n || 1);
      if (delayMs < 0) {
        console.warn(`  WARNING: Word "${trigger.anchor.word}" (n=${trigger.anchor.n || 1}) not found in clip "${trigger.anchor.clip}"`);
        delayMs = 0;
      }
    }
    return { delayMs, actions: trigger.actions, anchor: trigger.anchor };
  });

  console.log(`Scene "${scene.title}" (${scene.clips.length} clips, ${resolvedTriggers.length} triggers)`);
  for (const t of resolvedTriggers) {
    const anchorDesc = t.anchor.fixed !== undefined ? 'fixed:0' : `${t.anchor.clip}:"${t.anchor.word}"`;
    console.log(`  ${t.delayMs}ms — ${anchorDesc} → ${actionsToJS(t.actions)}`);
  }

  return {
    scene: scene.scene,
    title: scene.title,
    clips: scene.clips,
    triggers: scene.triggers
  };
});

// Build the SCENES JS literal (keep the declarative format for the player)
const scenesJS = JSON.stringify(resolvedScenes, null, 2);

// Patch into HTML template
let html = fs.readFileSync(TEMPLATE, 'utf-8');
html = html.replace('__SCENES__', scenesJS);
fs.writeFileSync(OUTPUT, html, 'utf-8');
console.log(`\nAssembled: ${OUTPUT}`);
