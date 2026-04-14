/**
 * build-video.js — Reads .mp3 and .metadata.json files, injects them
 * as base64 AUDIO_DATA and WORD_META into the HTML template,
 * outputs click-done-video-final.html.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const HTML_IN = path.join(ROOT, 'click-done-video.html');
const HTML_OUT = path.join(ROOT, 'click-done-video-final.html');

// Gather all clip IDs from mp3 files
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
const audioData = {};
const wordMeta = {};

for (const f of mp3Files) {
  const id = f.replace('.mp3', '');
  // Read mp3 as base64
  const mp3Buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = mp3Buf.toString('base64');

  // Read metadata
  const metaFile = path.join(AUDIO_DIR, id + '.metadata.json');
  if (fs.existsSync(metaFile)) {
    const raw = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
    wordMeta[id] = (raw.Metadata || [])
      .filter(m => m.Type === 'WordBoundary')
      .map(m => ({
        t: Math.round(m.Data.Offset / 10000),
        d: Math.round(m.Data.Duration / 10000),
        w: m.Data.text.Text
      }));
  } else {
    wordMeta[id] = [];
  }

  console.log(`Loaded ${id}: ${(mp3Buf.length / 1024).toFixed(1)} KB audio, ${wordMeta[id].length} word boundaries`);
}

// Read HTML and inject data
let html = fs.readFileSync(HTML_IN, 'utf-8');

// Replace AUDIO_DATA placeholder
const audioJS = `const AUDIO_DATA = ${JSON.stringify(audioData)};`;
html = html.replace(/const AUDIO_DATA = \{[^}]*\};/, audioJS);

// Replace WORD_META placeholder
const metaJS = `const WORD_META = ${JSON.stringify(wordMeta)};`;
html = html.replace(/const WORD_META = \{[^}]*\};/, metaJS);

fs.writeFileSync(HTML_OUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html, 'utf-8') / (1024 * 1024)).toFixed(2);
console.log(`\n✓ Built ${HTML_OUT}`);
console.log(`  Size: ${sizeMB} MB`);
console.log(`  Clips: ${Object.keys(audioData).length}`);
console.log(`  Ready to open in browser!`);
