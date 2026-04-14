/**
 * build-video.js — Bake audio files and metadata into a self-contained HTML video.
 * Reads click-done-video.html, embeds audio as base64 data URIs, outputs final HTML.
 */
const fs = require('fs');
const path = require('path');

const HTML_INPUT = path.join(__dirname, 'click-done-video.html');
const HTML_OUTPUT = path.join(__dirname, 'click-done-video-final.html');
const AUDIO_DIR = path.join(__dirname, 'audio_scenes');

// Read the assembled HTML
let html = fs.readFileSync(HTML_INPUT, 'utf-8');

// Find all clip IDs from the timeline
const clipIds = [];
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3') && !f.startsWith('_'));
for (const f of mp3Files) {
  clipIds.push(f.replace('.mp3', ''));
}

console.log(`Embedding ${clipIds.length} audio files...`);

// Build audio files object
const audioEntries = [];
for (const id of clipIds) {
  const mp3Path = path.join(AUDIO_DIR, id + '.mp3');
  if (fs.existsSync(mp3Path)) {
    const b64 = fs.readFileSync(mp3Path).toString('base64');
    audioEntries.push(`  '${id}': 'data:audio/mp3;base64,${b64}'`);
    const sizeKB = Math.round(fs.statSync(mp3Path).size / 1024);
    console.log(`  ✓ ${id} (${sizeKB} KB)`);
  } else {
    console.warn(`  ⚠ Missing: ${mp3Path}`);
  }
}

// Replace the audioFiles placeholder
html = html.replace(
  'const audioFiles = {}; // clipId → base64 data URI (injected by build)',
  `const audioFiles = {\n${audioEntries.join(',\n')}\n};`
);

fs.writeFileSync(HTML_OUTPUT, html, 'utf-8');

const finalSize = Math.round(fs.statSync(HTML_OUTPUT).size / 1024);
console.log(`\n✓ Built click-done-video-final.html (${finalSize} KB)`);
