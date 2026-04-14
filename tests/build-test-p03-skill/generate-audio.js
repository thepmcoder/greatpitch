const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const VOICE = 'en-US-AndrewNeural';
const OUT_DIR = path.join(__dirname, 'audio_scenes');

const scenes = [
  { id: 's01_opening', text: `The average vegetable on your plate tonight traveled fifteen hundred miles to get there. It was picked a week ago, maybe two. And somewhere between the farm and your fork, it lost most of its flavor, most of its nutrition, and most of its value.` },
  { id: 's02_broken', text: `The supply chain is built for scale, not for freshness. Farmers sell to distributors who sell to retailers who sell to you. At every step, someone takes a cut. Farmers lose forty percent of their revenue before it ever reaches a consumer. And consumers pay premium prices for produce that's already days old.` },
  { id: 's03_alternatives', text: `People have tried to fix this. Farmers' markets are wonderful but inconvenient — limited hours, weather dependent, and you have to plan your week around them. CSA boxes solve freshness, but not choice. You get what the farm grows, not what you want. Neither solution scales.` },
  { id: 's04_solution', text: `FreshLocal is a marketplace that connects local farms directly with urban consumers. You browse real-time inventory from farms within fifty miles. You build a custom order from what was harvested today. And you get next-day delivery to your door.` },
  { id: 's05_howitworks', text: `Here's what makes it work. Produce is never warehoused. It goes from farm to truck to door in under twenty-four hours. Average shelf age at delivery is fourteen hours. Compare that to five to seven days at your grocery store. We handle the logistics — shared cold-chain trucks running milk-run routes — so farmers just harvest and upload.` },
  { id: 's06_traction', text: `We're live in two cities today — Austin and Portland. Three hundred and forty farms. Eight thousand two hundred consumers. Our average order is forty-seven dollars, compared to thirty-two for grocery delivery. Monthly repeat rate is sixty-four percent. And our consumer NPS is plus sixty-one.` },
  { id: 's07_economics', text: `For farmers, this changes everything. Average revenue increase is thirty-five percent compared to wholesale. They set their own prices, they see who's buying, and they keep more of every dollar. Unit economics are at negative three dollars and twenty cents per order today, trending to breakeven at fifteen thousand orders per month per city.` },
  { id: 's08_ask', text: `We're raising six million dollars in Series A funding to expand to five more cities and reach logistics breakeven. The local food market is ninety billion dollars and growing. We've proven the model in two cities. Now it's time to scale. Join us in rebuilding how food moves from farm to table.` },
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
    const clipDir = path.join(OUT_DIR, scene.id);
    if (!fs.existsSync(clipDir)) fs.mkdirSync(clipDir, { recursive: true });
    await tts.toFile(clipDir, scene.text);
    // Move outputs to flat naming convention expected by pipeline
    const srcAudio = path.join(clipDir, 'audio.mp3');
    const srcMeta  = path.join(clipDir, 'metadata.json');
    const dstAudio = path.join(OUT_DIR, scene.id + '.mp3');
    const dstMeta  = path.join(OUT_DIR, scene.id + '.metadata.json');
    if (fs.existsSync(srcAudio)) fs.renameSync(srcAudio, dstAudio);
    if (fs.existsSync(srcMeta))  fs.renameSync(srcMeta, dstMeta);
    fs.rmdirSync(clipDir);
    console.log(`  Done: ${scene.id}`);
  }

  console.log('\nAll audio generated.');
}

main().catch(err => { console.error(err); process.exit(1); });
