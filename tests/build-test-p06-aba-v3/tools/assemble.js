/**
 * assemble.js — Reads scene JSONs + word-boundary metadata,
 * computes trigger delays, and outputs the scenes JS array for injection.
 */
const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS, estimateClipDuration } = require('./shared');

const AUDIO_DIR = path.resolve(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.resolve(__dirname, 'scenes');
const OUT_FILE = path.resolve(__dirname, '..', 'scenes-compiled.js');

const meta = loadMetadata(AUDIO_DIR);

// Load all scene JSONs in order
const sceneFiles = fs.readdirSync(SCENES_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const compiledScenes = [];

// Track cumulative offset across all scenes for absolute timing
let sceneStartMs = 0;

for (const sf of sceneFiles) {
  const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, sf), 'utf-8'));
  const triggers = [];

  for (const trigger of scene.triggers) {
    let delayMs;
    const anchor = trigger.anchor;

    if ('fixed' in anchor) {
      delayMs = sceneStartMs + anchor.fixed;
    } else {
      const wordDelay = T(meta, scene.clips, anchor.clip, anchor.word, anchor.n || 1);
      if (wordDelay === -1) {
        console.warn(`  ⚠ Word "${anchor.word}" not found in clip "${anchor.clip}" — using 0`);
        delayMs = sceneStartMs;
      } else {
        delayMs = sceneStartMs + wordDelay;
      }
    }

    const jsBody = actionsToJS(trigger.actions);
    triggers.push({ delay: delayMs, js: jsBody });
  }

  compiledScenes.push({
    scene: scene.scene,
    title: scene.title,
    triggers
  });

  // Advance scene start by total duration of all clips in this scene
  for (const clip of scene.clips) {
    if (typeof clip === 'string') {
      sceneStartMs += estimateClipDuration(meta, clip);
    } else if (clip.pause) {
      sceneStartMs += clip.pause;
    }
  }
}

// Generate JS code
const lines = ['['];
for (const s of compiledScenes) {
  lines.push(`  { scene: '${s.scene}', title: '${s.title}', triggers: [`);
  for (const t of s.triggers) {
    lines.push(`    { delay: ${t.delay}, run() { ${t.js} } },`);
  }
  lines.push('  ]},');
}
lines.push(']');

const jsCode = lines.join('\n');
fs.writeFileSync(OUT_FILE, jsCode, 'utf-8');
console.log(`✓ Compiled ${compiledScenes.length} scenes → ${OUT_FILE}`);
console.log(`  Total timeline: ${(sceneStartMs / 1000).toFixed(1)}s`);

// Log trigger map for debugging
for (const s of compiledScenes) {
  console.log(`\n  ${s.scene} — ${s.title}`);
  for (const t of s.triggers) {
    console.log(`    ${(t.delay / 1000).toFixed(2)}s → ${t.js}`);
  }
}
