/**
 * build-video.js — Bake audio (base64) + word metadata into the HTML template.
 * Output: click-done-video-final.html (self-contained)
 */

const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, 'audio_scenes');
const HTML_TEMPLATE = path.join(__dirname, 'click-done-video.html');
const OUTPUT_FILE = path.join(__dirname, 'click-done-video-final.html');

function main() {
  // 1. Concatenate all MP3 files into a single audio blob
  const clipFiles = fs.readdirSync(AUDIO_DIR)
    .filter(f => f.endsWith('.mp3'))
    .sort();

  console.log(`Found ${clipFiles.length} audio clips`);

  const audioBuffers = [];
  for (const f of clipFiles) {
    const buf = fs.readFileSync(path.join(AUDIO_DIR, f));
    audioBuffers.push(buf);
    console.log(`  ${f} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  const combinedAudio = Buffer.concat(audioBuffers);
  const audioBase64 = combinedAudio.toString('base64');
  console.log(`Combined audio: ${(combinedAudio.length / 1024).toFixed(1)} KB → ${(audioBase64.length / 1024).toFixed(1)} KB base64`);

  // 2. Load all word metadata
  const metaFiles = fs.readdirSync(AUDIO_DIR)
    .filter(f => f.endsWith('.metadata.json'))
    .sort();

  const wordMeta = {};
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

  const wordMetaJSON = JSON.stringify(wordMeta);
  console.log(`Word metadata: ${Object.keys(wordMeta).length} clips, ${wordMetaJSON.length} chars`);

  // 3. Read HTML template and inject
  let html = fs.readFileSync(HTML_TEMPLATE, 'utf-8');

  html = html.replace("'__AUDIO_DATA__'", "'" + audioBase64 + "'");
  html = html.replace("'__WORD_META__'", "'" + wordMetaJSON + "'");

  // 4. Write final output
  fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
  const sizeKB = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`\n✓ Output: ${OUTPUT_FILE} (${sizeKB} KB)`);
}

main();
