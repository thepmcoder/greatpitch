/**
 * build-video.js — Bake audio (base64) and word metadata into the HTML template.
 * Produces click-done-video-final.html (self-contained, plays offline).
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const TEMPLATE = path.join(__dirname, 'click-done-video.html');
const OUTPUT = path.join(__dirname, 'click-done-video-final.html');

// Build AUDIO_DATA: { clipId: base64String, ... }
const audioData = {};
const wordMeta = {};

const files = fs.readdirSync(AUDIO_DIR);
for (const f of files) {
  if (f.endsWith('.mp3')) {
    const id = f.replace('.mp3', '');
    const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
    audioData[id] = buf.toString('base64');
    console.log(`Audio: ${id} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
}

for (const f of files) {
  if (f.endsWith('.metadata.json')) {
    const id = f.replace('.metadata.json', '');
    const raw = JSON.parse(fs.readFileSync(path.join(AUDIO_DIR, f), 'utf-8'));
    wordMeta[id] = (raw.Metadata || [])
      .filter(m => m.Type === 'WordBoundary')
      .map(m => ({
        t: Math.round(m.Data.Offset / 10000),
        d: Math.round(m.Data.Duration / 10000),
        w: m.Data.text.Text
      }));
    console.log(`Meta: ${id} (${wordMeta[id].length} words)`);
  }
}

// Read template and replace placeholders
let html = fs.readFileSync(TEMPLATE, 'utf-8');
html = html.replace("'__AUDIO_DATA__'", JSON.stringify(audioData));
html = html.replace("'__WORD_META__'", JSON.stringify(wordMeta));

fs.writeFileSync(OUTPUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html, 'utf-8') / (1024 * 1024)).toFixed(1);
console.log(`\nBuilt: ${OUTPUT} (${sizeMB} MB)`);
