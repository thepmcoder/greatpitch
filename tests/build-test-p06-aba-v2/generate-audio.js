const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');
const scenes = [
  { id: 's01_hook', text: `How many tabs do you have open right now trying to figure out your career?` },
  { id: 's02_pain', text: `LinkedIn for jobs. Unstop for hackathons. College portal for deadlines. Some random PDF for professor contacts. And after all that? You still don't know what to prepare.` },
  { id: 's03_whatif', text: `What if one app connected all of it — and told you exactly what to do next?` },
  { id: 's04a_demo_feed', text: `This is Elevate. It pulls opportunities from across platforms and filters them to your goals and stage.` },
  { id: 's04b_demo_research', text: `Want research experience? Elevate maps professors to their active projects — and shows you how to reach out.` },
  { id: 's04c_demo_chat', text: `Stuck? Ask the AI chatbot. It gives you a personalized prep roadmap, not generic advice.` },
  { id: 's05_proof', text: `We surveyed students like you. Eighty-seven percent said they'd use this. So we built it. It's live, on mobile and web, right now.` },
  { id: 's06_cta', text: `Scan the QR code and try Elevate for yourself. Your next opportunity is waiting.` },
];
async function generateAll() {
  const voice = 'en-US-AndrewNeural';
  const outputDir = './audio_scenes';
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
    } catch(e) { fs.rmSync(tempDir, { recursive: true, force: true }); console.log(` ERROR: ${e.message}`); }
  }
}
generateAll();
