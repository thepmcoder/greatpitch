/**
 * build-video.js — Bakes audio + compiled scene triggers into the final HTML.
 * Output: click-done-video-final.html (self-contained, playable)
 */
const fs = require('fs');
const path = require('path');

const HTML_SRC = path.resolve(__dirname, 'click-done-video.html');
const SCENES_JS = path.resolve(__dirname, 'scenes-compiled.js');
const AUDIO_DIR = path.resolve(__dirname, 'audio_scenes');
const OUT_FILE = path.resolve(__dirname, 'click-done-video-final.html');

// 1. Read source HTML
let html = fs.readFileSync(HTML_SRC, 'utf-8');

// 2. Read compiled scenes JS
const scenesJS = fs.readFileSync(SCENES_JS, 'utf-8');

// 3. Inject scenes into the SCENES placeholder
html = html.replace('/*__SCENES__*/', scenesJS.trim().slice(1, -1)); // remove outer []

// 4. Concatenate all audio clips into a single base64 MP3
const clipOrder = [
  's01_hook', 's02_pain', 's03_whatif',
  's04a_demo_guidance', 's04b_demo_research', 's04c_demo_opportunities',
  's05_stat', 's06_cta'
];

const audioChunks = [];
for (const clip of clipOrder) {
  const mp3Path = path.join(AUDIO_DIR, clip + '.mp3');
  if (fs.existsSync(mp3Path)) {
    audioChunks.push(fs.readFileSync(mp3Path));
  } else {
    console.warn(`⚠ Missing audio: ${mp3Path}`);
  }
}

const combinedAudio = Buffer.concat(audioChunks);
const audioBase64 = combinedAudio.toString('base64');
const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

// 5. Inject audio as a hidden <audio> element just before </body>
const audioTag = `<audio id="audioSrc" src="${audioDataUri}" preload="auto" style="display:none"></audio>`;
html = html.replace('</body>', `${audioTag}\n</body>`);

// 6. Write final HTML
fs.writeFileSync(OUT_FILE, html, 'utf-8');

const sizeMB = (Buffer.byteLength(html) / (1024 * 1024)).toFixed(1);
console.log(`✓ Built: ${OUT_FILE}`);
console.log(`  Size: ${sizeMB} MB`);
console.log(`  Audio clips: ${audioChunks.length}/${clipOrder.length}`);
console.log(`  Scenes: ${clipOrder.length} clips across 6 scenes`);
