/**
 * build-video.js — Reads .mp3 files as base64, reads .metadata.json files,
 * injects both into the HTML template to produce a self-contained final HTML.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const HTML_SRC = path.join(ROOT, 'click-done-video.html');
const HTML_OUT = path.join(ROOT, 'click-done-video-final.html');

// Read audio files as base64
const audioData = {};
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
for (const f of mp3Files) {
  const id = f.replace('.mp3', '');
  const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = buf.toString('base64');
  console.log(`  Audio: ${id} (${Math.round(buf.length / 1024)}KB)`);
}

// Read word metadata
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

// Read HTML and inject data
let html = fs.readFileSync(HTML_SRC, 'utf-8');

html = html.replace(
  /const AUDIO_DATA = \{[^}]*\};/,
  `const AUDIO_DATA = ${JSON.stringify(audioData)};`
);

html = html.replace(
  /const WORD_META = \{[^}]*\};/,
  `const WORD_META = ${JSON.stringify(wordMeta)};`
);

fs.writeFileSync(HTML_OUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(2);
console.log(`\nBuilt: click-done-video-final.html (${sizeMB} MB)`);
