const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's00_hook', text: `One teacher. Thirty students. Thirty different levels. Every teacher knows differentiated instruction works. Students learn forty percent faster when content matches their level. But no teacher can run thirty personalized lesson plans at the same time.` },
  { id: 's01a_gap', text: `After-school tutoring costs forty to eighty dollars an hour, pricing out most families. And the free alternatives? Khan Academy helps, but it has no feedback loop. It doesn't know when a student is confused, frustrated, or ready to move forward.` },
  { id: 's01b_missing', text: `What's missing is a patient tutor who watches how a student thinks, not just whether they got the right answer. One that's available at nine PM on a Tuesday, not just during office hours.` },
  { id: 's02_intro', text: `That's StudyBuddy. An AI tutor that sits alongside the student during homework and practice. It watches how they solve problems. Not just right or wrong, but how they work through each step.` },
  { id: 's03a_detection', text: `When a student makes a conceptual error, not a typo, StudyBuddy doesn't give the answer. It asks a question that leads them back to the concept they missed. Like a patient human tutor, available anytime.` },
  { id: 's03b_features', text: `It covers math for grades three through eight, expanding to science. It detects misconceptions from work patterns. It explains concepts in multiple ways, visual, verbal, and analogy, until one clicks. Parents get weekly reports showing conceptual progress, not just scores. Teachers get a dashboard showing class-wide misconception patterns.` },
  { id: 's04a_traction', text: `Twelve hundred students across eight schools are using StudyBuddy today. A mix of suburban and Title One schools. Students using it four or more times per week show a zero point six grade-level improvement in just three months.` },
  { id: 's04b_results', text: `Teacher time spent on remediation is down thirty-five percent. Student confidence in math is up twenty-eight percentile points. Parent net promoter score is plus sixty-seven. All of this at eight dollars per student per month. Compare that to forty to eighty dollars per hour for a human tutor.` },
  { id: 's05_ask', text: `We're raising a three million dollar seed round to expand from eight schools to fifty and add our science curriculum. StudyBuddy makes world-class tutoring accessible to every student, not just the ones whose families can afford it.` },
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
