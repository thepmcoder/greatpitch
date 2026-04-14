/**
 * build-video.js — Read .mp3 as base64 + .metadata.json, inject into HTML.
 * Output: click-done-video-final.html (self-contained)
 */
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const HTML_IN = path.join(__dirname, 'click-done-video.html');
const HTML_OUT = path.join(__dirname, 'click-done-video-final.html');

// Collect all audio data as base64
const audioData = {};
const wordMeta = {};

const files = fs.readdirSync(AUDIO_DIR);
for (const f of files) {
  if (f.endsWith('.mp3')) {
    const id = f.replace('.mp3', '');
    const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
    audioData[id] = buf.toString('base64');
    console.log(`  Audio: ${id} (${Math.round(buf.length / 1024)}KB)`);
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
  }
}

let html = fs.readFileSync(HTML_IN, 'utf-8');

// Inject AUDIO_DATA
const audioJSON = JSON.stringify(audioData);
html = html.replace(/const AUDIO_DATA = \{\};/, `const AUDIO_DATA = ${audioJSON};`);

// Inject WORD_META
const metaJSON = JSON.stringify(wordMeta);
html = html.replace(/const WORD_META = \{\};/, `const WORD_META = ${metaJSON};`);

fs.writeFileSync(HTML_OUT, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html, 'utf-8') / (1024 * 1024)).toFixed(1);
console.log(`\nBuilt: ${HTML_OUT} (${sizeMB} MB)`);
