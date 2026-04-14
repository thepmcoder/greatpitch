/**
 * build-video.js — Bake audio files and word metadata into the HTML template
 * to produce a self-contained click-done-video-final.html.
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const TEMPLATE = path.join(__dirname, 'click-done-video.html');
const OUTPUT = path.join(__dirname, 'click-done-video-final.html');

let html = fs.readFileSync(TEMPLATE, 'utf-8');

// 1. Embed audio as base64 data URIs
const audioData = {};
const audioFiles = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
for (const f of audioFiles) {
  const id = f.replace('.mp3', '');
  const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = 'data:audio/mp3;base64,' + buf.toString('base64');
  console.log(`Audio: ${id} (${Math.round(buf.length / 1024)}KB)`);
}

// 2. Embed word metadata
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
  console.log(`Meta: ${id} (${wordMeta[id].length} words)`);
}

// 3. Patch into HTML
const audioJS = 'const AUDIO_DATA = ' + JSON.stringify(audioData) + ';';
const metaJS = 'const WORD_META = ' + JSON.stringify(wordMeta) + ';';

html = html.replace(/const AUDIO_DATA = \{\};/, audioJS);
html = html.replace(/const WORD_META = \{\};/, metaJS);

// 4. Write final output
fs.writeFileSync(OUTPUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(1);
console.log(`\n✓ Built ${OUTPUT}`);
console.log(`  Size: ${sizeMB}MB, ${audioFiles.length} audio clips, ${metaFiles.length} metadata files`);
