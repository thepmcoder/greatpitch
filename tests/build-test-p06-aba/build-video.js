const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIO_DIR = path.join(ROOT, 'audio_scenes');
const HTML_FILE = path.join(ROOT, 'click-done-video.html');
const OUTPUT_FILE = path.join(ROOT, 'click-done-video-final.html');

let html = fs.readFileSync(HTML_FILE, 'utf-8');

// Build AUDIO_DATA — base64 encoded mp3s
const audioData = {};
const mp3Files = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3'));
for (const f of mp3Files) {
  const id = f.replace('.mp3', '');
  const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
  audioData[id] = 'data:audio/mp3;base64,' + buf.toString('base64');
  console.log(`✓ Audio: ${id} (${(buf.length/1024).toFixed(0)}KB)`);
}

// Build WORD_META
const wordMeta = {};
const metaFiles = fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.metadata.json'));
for (const f of metaFiles) {
  const id = f.replace('.metadata.json', '');
  wordMeta[id] = JSON.parse(fs.readFileSync(path.join(AUDIO_DIR, f), 'utf-8'));
  console.log(`✓ Meta: ${id}`);
}

// Patch
html = html.replace('const AUDIO_DATA = {};', 'const AUDIO_DATA = ' + JSON.stringify(audioData) + ';');
html = html.replace('const WORD_META = {};', 'const WORD_META = ' + JSON.stringify(wordMeta) + ';');

fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
const sizeMB = (Buffer.byteLength(html, 'utf-8') / (1024*1024)).toFixed(1);
console.log(`\n✓ Written: ${OUTPUT_FILE} (${sizeMB}MB)`);
