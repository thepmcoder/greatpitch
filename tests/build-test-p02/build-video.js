/**
 * build-video.js — Reads all .mp3 files as base64 and all .metadata.json files,
 * injects both into the HTML template to create a self-contained click-done-video-final.html.
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const HTML_SRC = path.join(__dirname, 'click-done-video.html');
const HTML_OUT = path.join(__dirname, 'click-done-video-final.html');

// Read all mp3 files as base64 data URIs
const audioData = {};
const metaData = {};

const files = fs.readdirSync(AUDIO_DIR);

for (const f of files) {
  if (f.endsWith('.mp3')) {
    const id = f.replace('.mp3', '');
    const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
    audioData[id] = 'data:audio/mpeg;base64,' + buf.toString('base64');
    console.log(`Audio: ${id} (${Math.round(buf.length / 1024)}KB)`);
  }
}

for (const f of files) {
  if (f.endsWith('.metadata.json')) {
    const id = f.replace('.metadata.json', '');
    const raw = JSON.parse(fs.readFileSync(path.join(AUDIO_DIR, f), 'utf-8'));
    metaData[id] = (raw.Metadata || [])
      .filter(m => m.Type === 'WordBoundary')
      .map(m => ({
        t: Math.round(m.Data.Offset / 10000),
        d: Math.round(m.Data.Duration / 10000),
        w: m.Data.text.Text
      }));
    console.log(`Meta: ${id} (${metaData[id].length} words)`);
  }
}

let html = fs.readFileSync(HTML_SRC, 'utf-8');

// Inject AUDIO_DATA
const audioJS = 'const AUDIO_DATA = ' + JSON.stringify(audioData) + ';';
html = html.replace(/const AUDIO_DATA = \{\};/, audioJS);

// Inject WORD_META
const metaJS = 'const WORD_META = ' + JSON.stringify(metaData) + ';';
html = html.replace(/const WORD_META = \{\};/, metaJS);

fs.writeFileSync(HTML_OUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(1);
console.log(`\n✓ Built click-done-video-final.html (${sizeMB} MB)`);
