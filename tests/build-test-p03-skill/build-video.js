/**
 * build-video.js — Bake audio (base64) and word metadata into the HTML template.
 * Output: click-done-video-final.html (self-contained)
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const TEMPLATE = path.join(__dirname, 'click-done-video.html');
const OUTPUT = path.join(__dirname, 'click-done-video-final.html');

// Collect all audio files as base64 data URIs
const audioData = {};
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
for (const f of mp3Files) {
  const id = f.replace('.mp3', '');
  const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = `data:audio/mpeg;base64,${buf.toString('base64')}`;
  console.log(`  Audio: ${id} (${(buf.length / 1024).toFixed(1)} KB)`);
}

// Collect all word metadata
const wordMeta = {};
const metaFiles = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.metadata.json'));
for (const f of metaFiles) {
  const id = f.replace('.metadata.json', '');
  const raw = JSON.parse(fs.readFileSync(path.join(AUDIO_DIR, f), 'utf-8'));
  wordMeta[id] = (raw.Metadata || [])
    .filter(m => m.Type === 'WordBoundary')
    .map(m => ({
      t: Math.round(m.Data.Offset / 10000),
      d: Math.round(m.Data.Duration / 10000),
      w: m.Data.text.Text
    }));
  console.log(`  Meta:  ${id} (${wordMeta[id].length} words)`);
}

// Patch into template
let html = fs.readFileSync(TEMPLATE, 'utf-8');
html = html.replace(
  /\/\*AUDIO_DATA_PLACEHOLDER\*\/\{}/,
  JSON.stringify(audioData)
);
html = html.replace(
  /\/\*WORD_META_PLACEHOLDER\*\/\{}/,
  JSON.stringify(wordMeta)
);

fs.writeFileSync(OUTPUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(1);
console.log(`\nBuilt: ${OUTPUT} (${sizeMB} MB)`);
