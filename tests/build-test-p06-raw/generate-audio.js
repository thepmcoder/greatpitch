const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's0_title', text: `Elevate. Your Choices. Your Preparation. Your Confidence. Your Success.` },
  { id: 's1_problem', text: `Students today are overwhelmed navigating career and research paths. They're scattered across dozens of platforms, LinkedIn, Unstop, Internshala, college portals, just trying to answer basic questions. What should I prepare? Which professors are open to interns? How do I keep track of deadlines?` },
  { id: 's2_data', text: `Our survey tells a stark story. Over 80 percent of students feel least informed about how to prepare for roles. Over 60 percent need clearer guidance on company expectations. And only 14 percent are satisfied with the current process of finding information.` },
  { id: 's3_insight', text: `Career tools and generic chatbots don't solve this. They operate in silos. A student needs cross-domain reasoning, connecting job posts, research areas, hackathon deadlines, and their own academic stage into personalized guidance. No single tool does this today.` },
  { id: 's4_solution', text: `That's why we built Elevate. Elevate transforms unstructured data into structured intelligence using our LIFT framework. Locate the right information. Interpret what applies to you. Follow through with structure. And time your actions correctly.` },
  { id: 's5_features', text: `Elevate provides unified, tailored guidance that translates career and research information into personalized next steps. It tracks hackathons, contests, and opportunities, notifying you at the right time. And it helps students discover professors and research internships.` },
  { id: 's6_cta', text: `87 percent of survey respondents believe a platform like Elevate would be very useful. We have a working prototype, a full-stack mobile and web application with an integrated AI chatbot. Join us to learn more. Let's reduce friction in student career and research journeys.` },
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
