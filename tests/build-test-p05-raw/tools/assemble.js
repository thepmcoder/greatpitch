/**
 * assemble.js — Resolve word-anchored triggers to millisecond delays
 * and generate the SCENES JavaScript array for the HTML template.
 */

const fs = require('fs');
const path = require('path');
const { loadMetadata, T, actionsToJS, LEAD_MS, estimateClipDuration } = require('./shared');

const AUDIO_DIR = path.join(__dirname, '..', 'audio_scenes');
const SCENES_DIR = path.join(__dirname, 'scenes');
const HTML_TEMPLATE = path.join(__dirname, '..', 'click-done-video.html');

function main() {
  // Load word-boundary metadata
  const meta = loadMetadata(AUDIO_DIR);
  console.log(`Loaded metadata for ${Object.keys(meta).length} clips`);

  // Load scene JSONs in order
  const sceneFiles = fs.readdirSync(SCENES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log(`Found ${sceneFiles.length} scene files`);

  // Build ordered list of all clips across all scenes to compute scene start times
  const allClips = [];
  const scenes = [];

  for (const file of sceneFiles) {
    const scene = JSON.parse(fs.readFileSync(path.join(SCENES_DIR, file), 'utf-8'));
    scenes.push(scene);
    for (const clip of scene.clips) {
      if (typeof clip === 'string') {
        allClips.push({ clip, scene: scene.scene });
      }
    }
  }

  // Compute cumulative start time for each scene
  let cumulativeMs = 0;
  const sceneStartMs = {};
  const clipStartMs = {};

  for (const scene of scenes) {
    sceneStartMs[scene.scene] = cumulativeMs;
    for (const clip of scene.clips) {
      if (typeof clip === 'object' && clip.pause) {
        cumulativeMs += clip.pause;
      } else if (typeof clip === 'string') {
        clipStartMs[clip] = cumulativeMs;
        cumulativeMs += estimateClipDuration(meta, clip);
      }
    }
  }

  // Build SCENES array
  const scenesJS = [];

  for (const scene of scenes) {
    const startMs = sceneStartMs[scene.scene];
    const triggers = [];

    for (const trig of scene.triggers) {
      let delayMs = 0;

      if (trig.anchor.fixed !== undefined) {
        delayMs = trig.anchor.fixed;
      } else if (trig.anchor.clip && trig.anchor.word) {
        const resolved = T(meta, scene.clips, trig.anchor.clip, trig.anchor.word, trig.anchor.n || 1);
        if (resolved === -1) {
          console.warn(`  ⚠ Word "${trig.anchor.word}" not found in clip "${trig.anchor.clip}" — using 0ms`);
          delayMs = 0;
        } else {
          delayMs = resolved;
        }
      }

      triggers.push({
        delayMs,
        js: actionsToJS(trig.actions),
      });
    }

    scenesJS.push({
      id: scene.scene,
      title: scene.title,
      clips: scene.clips,
      startMs,
      triggers,
    });
  }

  // Generate JavaScript
  const scenesCode = JSON.stringify(scenesJS, null, 2);

  // Patch into HTML template
  let html = fs.readFileSync(HTML_TEMPLATE, 'utf-8');
  html = html.replace('__SCENES__', scenesCode);

  fs.writeFileSync(HTML_TEMPLATE, html, 'utf-8');
  console.log(`\nAssembled ${scenes.length} scenes with ${scenesJS.reduce((a, s) => a + s.triggers.length, 0)} triggers`);
  console.log(`Total duration: ~${Math.round(cumulativeMs / 1000)}s`);
  console.log(`Patched: ${HTML_TEMPLATE}`);
}

main();
