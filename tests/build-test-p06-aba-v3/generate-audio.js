const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's01_hook', text: "You're juggling LinkedIn, Unstop, Internshala, and three college portals — and you still don't know what to prepare for." },
  { id: 's02_pain', text: "Only fourteen percent of students are satisfied finding career info. The rest of us are guessing — scattered across a dozen tabs, with no clear next step." },
  { id: 's03_whatif', text: "What if one platform could connect all of that — and tell you exactly what to do next?" },
  { id: 's04a_demo_guidance', text: "This is Elevate. Ask it anything — 'How do I prepare for a product role?' — and it builds you a personalized roadmap." },
  { id: 's04b_demo_research', text: "It connects you to professors with matching research interests and shows you exactly how to reach out." },
  { id: 's04c_demo_opportunities', text: "Hackathons, contests, deadlines — Elevate tracks them and notifies you at the right time." },
  { id: 's05_stat', text: "We surveyed students like you. Eighty-seven percent said they need exactly this." },
  { id: 's06_cta', text: "Scan the QR code or come find us — Elevate is live and ready for you to try." }
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
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, { wordBoundaryEnabled: true, sentenceBoundaryEnabled: true });
      await tts.toFile(tempDir + '/', scene.text);
      if (fs.existsSync(path.join(tempDir, 'audio.mp3'))) fs.copyFileSync(path.join(tempDir, 'audio.mp3'), path.join(outputDir, scene.id + '.mp3'));
      if (fs.existsSync(path.join(tempDir, 'metadata.json'))) fs.copyFileSync(path.join(tempDir, 'metadata.json'), path.join(outputDir, scene.id + '.metadata.json'));
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(' done');
    } catch(e) {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(` ERROR: ${e.message}`);
    }
  }
}

generateAll();
