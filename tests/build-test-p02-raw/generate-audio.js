const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 'clip_hook', text: `Every pull request your team opens waits an average of twenty-four hours for review. That's not a process. That's a bottleneck.` },
  { id: 'clip_pain', text: `Senior engineers spend thirty percent of their time reviewing junior code. Review quality is inconsistent. Some reviewers catch real bugs, others rubber-stamp. And nobody enjoys doing it. The backlog keeps growing.` },
  { id: 'clip_solution', text: `Meet DeepReview. An AI-powered code review assistant that integrates directly with GitHub and GitLab. Not a replacement for human review. A force multiplier.` },
  { id: 'clip_features', text: `DeepReview analyzes every pull request automatically. It catches real bugs, like null pointer errors, race conditions, and SQL injection. Not just linting. It flags architecture violations, explains why something is wrong, linking to your own coding standards, and prioritizes reviews by risk, so humans focus on the dangerous ones first.` },
  { id: 'clip_traction', text: `Two hundred teams already trust DeepReview. Over eight hundred thousand PRs analyzed. Twelve thousand four hundred bugs caught before merge, confirmed real by humans. Average review wait time dropped from twenty-four hours to just four. False positive rate, only eight percent.` },
  { id: 'clip_ask', text: `For forty-eight thousand dollars a year, you can roll DeepReview out to all two thousand engineers. That's two dollars per engineer per month. Faster reviews. Fewer bugs in production. Senior engineers freed up to build. Let's make it happen.` },
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
