/**
 * build-video.js — Bakes audio files and word-boundary metadata into
 * click-done-video.html to produce click-done-video-final.html (self-contained).
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = './audio_scenes';
const INPUT_HTML = './click-done-video.html';
const OUTPUT_HTML = './click-done-video-final.html';

// 1. Collect all .mp3 files as base64
const audioData = {};
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
for (const f of mp3Files) {
  const id = f.replace('.mp3', '');
  const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = buf.toString('base64');
}
console.log(`✓ Loaded ${mp3Files.length} audio files`);

// 2. Collect all metadata files
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
}
console.log(`✓ Loaded ${metaFiles.length} metadata files`);

// 3. Read HTML and inject
let html = fs.readFileSync(INPUT_HTML, 'utf-8');
html = html.replace(
  '/* __AUDIO_DATA_PLACEHOLDER__ */',
  `const AUDIO_DATA = ${JSON.stringify(audioData)};`
);
html = html.replace(
  '/* __WORD_META_PLACEHOLDER__ */',
  `const WORD_META = ${JSON.stringify(wordMeta)};`
);

fs.writeFileSync(OUTPUT_HTML, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html, 'utf-8') / (1024 * 1024)).toFixed(1);
console.log(`✓ Built ${OUTPUT_HTML} (${sizeMB} MB)`);
