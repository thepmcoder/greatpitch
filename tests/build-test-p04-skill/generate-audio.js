const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's00_hook', text: `What if every student had a patient tutor available at nine PM on a Tuesday? Not a video library. A tutor that watches how they think, and asks the right question at the right moment. Twelve hundred students already have one.` },
  { id: 's01_problem', text: `One teacher, thirty students, thirty different levels. We know differentiated instruction works. Students learn forty percent faster when content matches their level. But no teacher can run thirty personalized lesson plans simultaneously.` },
  { id: 's02_gap', text: `After-school tutoring costs forty to eighty dollars an hour, pricing out most families. Khan Academy helps, but it has no feedback loop. It doesn't know when a student is confused, frustrated, or ready to move on.` },
  { id: 's03a_solution', text: `StudyBuddy is an AI tutor that sits alongside the student during homework. It watches how they solve problems. Not just right or wrong, but how they work through each step.` },
  { id: 's03b_how', text: `When a student makes a conceptual error, StudyBuddy doesn't give the answer. It asks a question that leads them back to the concept they missed. It explains in multiple ways, visual, verbal, analogy, until one clicks.` },
  { id: 's04a_traction', text: `Twelve hundred students across eight schools are using StudyBuddy today. Students using it four or more times per week show a zero point six grade-level improvement in just three months.` },
  { id: 's04b_results', text: `Teacher time spent on remediation is down thirty-five percent. Student confidence in math is up twenty-eight percentile points. Parent satisfaction score is plus sixty-seven. And the cost? Eight dollars per student per month.` },
  { id: 's05_ask', text: `We're raising a three million dollar seed round to expand from eight schools to fifty and add science curriculum. That's what it takes to prove this works at scale. Because every student deserves a patient tutor, not just the ones whose families can afford one.` },
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
