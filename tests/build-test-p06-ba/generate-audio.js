const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's01_hook', text: `Every semester, you open LinkedIn, then Unstop, then Internshala, then your college portal. Only fourteen percent of students say they're satisfied with this process. And you're left with one question. What should I actually do next?` },
  { id: 's02_data', text: `We surveyed students here on campus. Here's what they told us. Over eighty percent feel uninformed about how to prepare for roles. And just fifteen percent trust the information they find.` },
  { id: 's03_insight', text: `So the obvious answer is better tools, right? But career platforms and chatbots each live in their own world. Even if every one of them improved, they'd still be separate. What if there was one place that connected all of it?` },
  { id: 's04_solution', text: `That's what Elevate does. It takes scattered academic and career information and turns it into clear, personal guidance.` },
  { id: 's05_lift', text: `Elevate helps you find the right information, figure out what applies to you, follow through with a clear plan, and act at the right time.` },
  { id: 's06a_delivers', text: `First, personalized guidance. Elevate translates career data into your specific next steps — not generic advice.` },
  { id: 's06b_delivers', text: `Second, it tracks hackathons, contests, and deadlines — and notifies you at the right time. And third, it helps you find professors with open research positions and actually apply.` },
  { id: 's07_validation', text: `Remember, only fourteen percent were satisfied with what they had. But eighty-seven percent of students we surveyed believe Elevate changes that.` },
  { id: 's08_cta', text: `We're piloting Elevate this semester and looking for ten students to try it. Find us after the presentation, or scan the code on screen. Elevate. Your choices. Your preparation. Your confidence. Your success.` },
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
    } catch(e) { fs.rmSync(tempDir, { recursive: true, force: true }); console.log(` ERROR: ${e.message}`); }
  }
}

generateAll();
