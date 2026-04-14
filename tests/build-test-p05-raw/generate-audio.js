/**
 * generate-audio.js — Generate TTS audio + word-boundary metadata for each clip.
 * Uses msedge-tts with wordBoundaryEnabled for word-level timestamps.
 */

const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const VOICE = 'en-US-AndrewNeural';
const AUDIO_DIR = path.join(__dirname, 'audio_scenes');

const CLIPS = [
  // Scene 1: Hook
  { id: 's01_hook', text: 'Every delivery company knows electric vehicles save money. Sixty percent lower fuel costs, forty percent lower maintenance. The math is obvious.' },
  { id: 's01_but', text: 'But managing an EV fleet is operationally harder than diesel. Range anxiety is real. A diesel truck does not care about temperature, but an EV loses thirty percent range in cold weather.' },

  // Scene 2: The Problem
  { id: 's02_chaos', text: 'Charging infrastructure is fragmented. Route planning must account for battery state, charging station availability, and delivery windows simultaneously.' },
  { id: 's02_spreadsheets', text: 'Most fleet managers still use spreadsheets and driver gut feel. That is not a system. That is a prayer.' },

  // Scene 3: Introducing GreenFleet
  { id: 's03_intro', text: 'GreenFleet is the platform that makes EV fleets operationally superior to diesel. We optimize the entire fleet operation from route to charger to maintenance.' },

  // Scene 4: Smart Routing
  { id: 's04_routing', text: 'Our smart routing engine factors in real-time battery state, weather impact on range, charging station availability, and delivery time windows. Routes update dynamically as conditions change.' },

  // Scene 5: Charging Orchestration
  { id: 's05_charging', text: 'Our charging orchestration schedules overnight depot charging to minimize electricity costs using off-peak rates. We manage mid-route charging stops and prevent grid overload at depots.' },

  // Scene 6: TCO Dashboard
  { id: 's06_tco', text: 'Our TCO dashboard shows real-time total cost of ownership. EV versus diesel, per vehicle, per route, per driver. The financial case is visible daily, not just in annual reports.' },

  // Scene 7: Predictive Maintenance
  { id: 's07_maintenance', text: 'Predictive maintenance monitors battery health degradation and predicts when a vehicle needs service before it fails on route. No more unplanned breakdowns.' },

  // Scene 8: Traction
  { id: 's08_traction', text: 'We manage twenty-four hundred vehicles across twelve fleet customers. Average fuel cost reduction: fifty-eight percent. Unplanned downtime reduced seventy-two percent.' },
  { id: 's08_growth', text: 'Route efficiency improved fourteen percent — more deliveries per vehicle per day. Charging costs optimized by thirty-one percent. Customer retention: one hundred percent. Zero churn in eighteen months.' },

  // Scene 9: Business
  { id: 's09_arr', text: 'Annual recurring revenue is two point eight million dollars, growing twenty-two percent quarter over quarter. We have raised eight million in our Series A.' },

  // Scene 10: The Ask
  { id: 's10_ask', text: 'We are raising twenty-five million in Series B to expand nationally and add medium-duty truck support. The EV transition is inevitable. GreenFleet makes it profitable.' },
];

async function main() {
  if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
    sentenceBoundaryEnabled: true,
  });

  for (const clip of CLIPS) {
    console.log(`Generating: ${clip.id}`);
    // msedge-tts toFile(dirPath, text) writes audio.mp3 + metadata.json into dirPath/
    const clipDir = path.join(AUDIO_DIR, clip.id);
    if (!fs.existsSync(clipDir)) fs.mkdirSync(clipDir, { recursive: true });

    await tts.toFile(clipDir, clip.text);

    // Rename outputs to flat audio_scenes/clipname.mp3 format expected by pipeline
    const srcMp3 = path.join(clipDir, 'audio.mp3');
    const srcMeta = path.join(clipDir, 'metadata.json');
    const dstMp3 = path.join(AUDIO_DIR, clip.id + '.mp3');
    const dstMeta = path.join(AUDIO_DIR, clip.id + '.metadata.json');

    if (fs.existsSync(srcMp3)) {
      fs.renameSync(srcMp3, dstMp3);
      console.log(`  ✓ ${clip.id}.mp3`);
    } else {
      console.error(`  ✗ Missing audio.mp3 in ${clipDir}`);
    }
    if (fs.existsSync(srcMeta)) {
      fs.renameSync(srcMeta, dstMeta);
      console.log(`  ✓ ${clip.id}.metadata.json`);
    } else {
      console.error(`  ✗ Missing metadata.json in ${clipDir}`);
    }

    // Clean up temp directory
    try { fs.rmdirSync(clipDir); } catch(e) {}
  }

  console.log('\nAudio generation complete.');
}

main().catch(err => { console.error(err); process.exit(1); });
