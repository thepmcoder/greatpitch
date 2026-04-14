const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 'clip_hook', text: `Your vegetables traveled fifteen hundred miles to reach your plate. They were picked a week ago. And the farmer who grew them kept less than sixty cents on the dollar.` },
  { id: 'clip_pain', text: `Farmers lose forty percent of revenue to distributors and retailers. Consumers want local fresh produce, but farmers' markets have limited hours and depend on weather. CSA boxes solve freshness but not choice. You get what the farm grows, not what you want.` },
  { id: 'clip_solution', text: `Meet FreshLocal. A farm-to-door marketplace connecting local farms with urban consumers. Browse real-time inventory from farms within fifty miles. Build a custom order. Get next-day delivery.` },
  { id: 'clip_how', text: `Farms upload what they harvested today. Our platform handles shared cold-chain logistics, payment, and communication. Produce is never warehoused. Farm to truck to door in under twenty-four hours. Average shelf age at delivery: fourteen hours, versus five to seven days at your grocery store.` },
  { id: 'clip_traction', text: `We're live in two cities, Austin and Portland. Three hundred forty farms. Eight thousand two hundred consumers. Average order: forty-seven dollars. Monthly repeat rate: sixty-four percent. Farm revenue up thirty-five percent versus wholesale. Consumer NPS: plus sixty-one.` },
  { id: 'clip_ask', text: `We're raising six million dollars Series A to expand to five more cities and reach logistics breakeven. At fifteen thousand orders per month per city, unit economics turn positive. Join us in building the future of local food.` },
];

async function generateAll() {
  const voice = 'en-US-AndrewNeural';
  const outputDir = './audio_scenes';
  fs.mkdirSync(outputDir, { recursive: true });
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    process.stdout.write(`[${i+1}/${scenes.length}] ${scene.id}...`);
    const tempDir = path.join(outputDir, '_t_' + scene.id);
    fs.mkdirSync(tempDir, { recursive: true });
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
        wordBoundaryEnabled: true,
        sentenceBoundaryEnabled: true
      });
      await tts.toFile(tempDir + '/', scene.text);
      const src = path.join(tempDir, 'audio.mp3');
      const dest = path.join(outputDir, scene.id + '.mp3');
      if (fs.existsSync(src)) fs.copyFileSync(src, dest);
      const metaSrc = path.join(tempDir, 'metadata.json');
      const metaDest = path.join(outputDir, scene.id + '.metadata.json');
      if (fs.existsSync(metaSrc)) fs.copyFileSync(metaSrc, metaDest);
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(` done`);
    } catch(e) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(` ERROR: ${e.message}`);
    }
  }
}
generateAll();
