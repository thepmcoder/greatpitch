const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's01_opening', text: `Every student faces a moment where they realize their career path isn't as clear as they thought. You're juggling LinkedIn, Unstop, Internshala, college portals, trying to answer basic questions. What should I prepare? Which professors are open to interns? How do I even begin?` },
  { id: 's02_data', text: `We surveyed students, and the numbers are striking. Over eighty percent feel least informed about how to prepare for roles and understand company patterns. Over eighty percent need direction building a strong profile. And only fourteen percent are satisfied with how they find information today.` },
  { id: 's03_insight', text: `Here's the real problem. Career tools and generic chatbots don't solve this because they operate in silos. A student needs cross-domain reasoning, connecting job posts, professor research, hackathon deadlines, and their own academic stage into one picture. No single tool does this today.` },
  { id: 's04_elevate', text: `That's why we built Elevate. Elevate transforms unstructured academic and career data into structured intelligence using an AI reasoning layer. It performs cross-domain reasoning across careers, research, competitions, and academic progression.` },
  { id: 's05_lift', text: `Elevate works through what we call the LIFT framework. Locate the right information. Interpret what applies to you. Follow through with structure. And Time your actions correctly.` },
  { id: 's06_features', text: `This gives students three things they've never had together. Unified, tailored guidance that translates career and research information into personalized next steps. Opportunity awareness that tracks hackathons, contests, and deadlines. And research engagement that connects students with professors and their work.` },
  { id: 's07_prototype', text: `We've built a working prototype. A full-stack mobile and web application with an integrated AI chatbot, a multiplatform notification system, and a professor information system. All designed to bring everything a student needs into one place.` },
  { id: 's08_ask', text: `In our validation survey, over eighty-seven percent of respondents said a platform like Elevate would be very useful. We're ready to show you more. Join us to see how Elevate can reduce friction in every student's path to success.` },
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
