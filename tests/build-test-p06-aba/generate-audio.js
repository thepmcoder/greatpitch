const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's00_opening', text: `You're a second-year student. It's September. Placement season is three months away. You have seventeen tabs open — LinkedIn, Unstop, Internshala, your college portal, two WhatsApp groups, and a Google Doc a senior shared last year that may or may not be outdated. You're not lazy. You're not uninformed. You're overwhelmed.` },
  { id: 's01a_data_satisfaction', text: `We surveyed students about this exact experience. The numbers are striking. Only fourteen percent are satisfied with how they currently find career and research information. And only fifteen percent trust that the information they find is even accurate.` },
  { id: 's01b_data_gaps', text: `What do students feel least informed about? Over eighty percent say they don't know how to prepare for various roles or understand how companies shortlist candidates. Over eighty percent say they need more direction in building a strong profile. And over sixty percent need clearer guidance on company expectations and where to even begin.` },
  { id: 's02_tried', text: `So what do students do today? They piece together guidance from five or six different sources. They ask seniors. They try generic AI chatbots. They scroll job boards without knowing what to prioritize. Each source has a fragment of the answer, but no source has the full picture.` },
  { id: 's03_ceiling', text: `Here's the question we kept coming back to. Even if every one of those platforms worked perfectly — even if LinkedIn showed every job, Internshala listed every internship, and your college portal was always up to date — would that be enough? We don't think so. Because the problem isn't missing information. It's that no one is connecting the dots for you.` },
  { id: 's04_reframe', text: `That's the shift. Students don't need another platform with more listings. They need something that reasons across domains — that connects a professor's research area with an open internship, that links a hackathon deadline with a skill you're building, that knows your academic stage and tells you what to focus on right now. Not more data. Cross-domain intelligence.` },
  { id: 's05_elevate_intro', text: `This is Elevate. An AI-powered platform that transforms scattered career and research data into structured, personalized guidance. It works through a framework we call LIFT. Locate the right information. Interpret what applies to you. Follow through with structure. And time your actions correctly.` },
  { id: 's06a_signals', text: `Elevate ingests signals from six key sources — job posts, professor pages, research papers, hackathons, competitions, and hiring updates. These aren't just aggregated. They're reasoned over. The AI layer connects them to your profile, your stage, and your goals.` },
  { id: 's06b_outputs', text: `What comes out the other side is clear, actionable guidance. What to pursue. When to act. How to prepare. And how to apply. Whether you're exploring research opportunities with a professor or preparing for your first placement interview, Elevate gives you a structured path forward.` },
  { id: 's07_prototype', text: `This isn't a concept. We've built a working prototype — a full-stack application across mobile and web. It includes an integrated AI chatbot for conversational guidance, a multiplatform notification system that surfaces opportunities at the right time, and a professor information system that helps students discover research mentors and open positions.` },
  { id: 's08_validation', text: `Does the approach work? We went back to students with this concept. Over eighty-seven percent said a platform like Elevate would be very useful for their academic, career, and research goals. Students consistently told us: they want a simpler, more structured way to connect with professors for projects and internships. That's exactly what Elevate provides.` },
  { id: 's09_close', text: `We're Krishna Prabu and Tanmai Raghava, and we built Elevate to solve a problem we live every day. We'd love for you to see the full demo. Let's reduce the friction in how students navigate their careers and research journeys. Thank you.` },
];

async function generateAll() {
  const voice = 'en-US-AndrewNeural';
  const outputDir = path.join(__dirname, 'audio_scenes');
  fs.mkdirSync(outputDir, { recursive: true });

  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
    sentenceBoundaryEnabled: true,
  });

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const mp3Path = path.join(outputDir, scene.id + '.mp3');
    const metaPath = path.join(outputDir, scene.id + '.metadata.json');
    if (fs.existsSync(mp3Path) && fs.existsSync(metaPath)) {
      console.log(`[${i+1}/${scenes.length}] ${scene.id}... cached`);
      continue;
    }
    process.stdout.write(`[${i+1}/${scenes.length}] ${scene.id}...`);
    const clipDir = path.join(outputDir, '_t_' + scene.id);
    fs.mkdirSync(clipDir, { recursive: true });
    try {
      await tts.toFile(clipDir, scene.text);
      fs.renameSync(path.join(clipDir, 'audio.mp3'), mp3Path);
      fs.renameSync(path.join(clipDir, 'metadata.json'), metaPath);
      fs.rmdirSync(clipDir);
      console.log(' done');
    } catch(e) {
      fs.rmSync(clipDir, { recursive: true, force: true });
      console.log(` ERROR: ${e.message}`);
    }
  }
  console.log('\nAll audio generated.');
}

generateAll().catch(err => { console.error(err); process.exit(1); });
