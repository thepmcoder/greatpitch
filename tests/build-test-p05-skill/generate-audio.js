/**
 * generate-audio.js — GreenFleet pitch video TTS generation
 * Uses msedge-tts with word boundary tracking for word-anchored animation sync.
 */
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const VOICE = 'en-US-AndrewNeural';
const OUT_DIR = path.join(__dirname, 'audio_scenes');

const scenes = [
  { id: 's01_opening', text: `Every major delivery company has the same plan: go electric. The economics are clear. Sixty percent lower fuel costs, forty percent lower maintenance. But here is the problem nobody talks about.` },
  { id: 's02_problem', text: `Managing an EV fleet is operationally harder than diesel. A diesel truck does not care about temperature, but an EV loses thirty percent of its range in cold weather. Charging infrastructure is fragmented. And route planning must now account for battery state, charging station availability, and delivery windows all at once. Most fleet managers still rely on spreadsheets and driver gut feel.` },
  { id: 's03_whynow', text: `So why is this the moment? Because EV adoption just crossed the tipping point. Last mile delivery fleets are converting faster than any other segment. But the software has not kept up. The tools that manage diesel fleets cannot manage electric ones. That gap is growing every quarter.` },
  { id: 's04_solution', text: `GreenFleet closes that gap. We built a platform that optimizes the entire EV fleet operation, not just one piece of it. Smart routing that factors in real-time battery state, weather impact on range, and charging station availability. Charging orchestration that schedules depot charging at off-peak rates and manages mid-route stops. A TCO dashboard that shows the real cost comparison, EV versus diesel, per vehicle, per route, every single day. And predictive maintenance that catches battery degradation before a vehicle fails on route.` },
  { id: 's05_proof', text: `This is not a hypothesis. We manage twenty-four hundred vehicles across twelve fleet customers today. The results speak clearly. Fifty-eight percent fuel cost reduction versus diesel. Seventy-two percent reduction in unplanned downtime. Fourteen percent more deliveries per vehicle per day. And thirty-one percent savings on charging costs alone.` },
  { id: 's06_retention', text: `But here is the number that matters most. Zero churn. One hundred percent customer retention over eighteen months. Nobody leaves because the platform pays for itself from day one. Our annual recurring revenue is two point eight million dollars, growing twenty-two percent quarter over quarter.` },
  { id: 's07_ask', text: `We are raising twenty-five million in Series B to expand nationally and add medium-duty truck support. The EV transition is not a question of if. It is a question of who helps fleets make it work. We are that answer. Let us show you the platform.` },
];

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
    sentenceBoundaryEnabled: true,
  });

  for (const scene of scenes) {
    console.log(`Generating: ${scene.id}`);
    // msedge-tts toFile(dirPath, text) writes audio.mp3 + metadata.json into dirPath
    const clipDir = path.join(OUT_DIR, scene.id);
    if (!fs.existsSync(clipDir)) fs.mkdirSync(clipDir, { recursive: true });
    await tts.toFile(clipDir, scene.text);
    // Rename to clipId.mp3 / clipId.metadata.json in the parent dir
    fs.renameSync(path.join(clipDir, 'audio.mp3'), path.join(OUT_DIR, `${scene.id}.mp3`));
    fs.renameSync(path.join(clipDir, 'metadata.json'), path.join(OUT_DIR, `${scene.id}.metadata.json`));
    fs.rmdirSync(clipDir);
    console.log(`  Done: ${scene.id}.mp3`);
  }
  console.log('\nAll audio generated.');
}

main().catch(err => { console.error(err); process.exit(1); });
