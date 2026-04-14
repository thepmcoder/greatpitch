const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's00_hook', text: `What if every pull request got a thorough review within four hours instead of twenty-four? What if your senior engineers got back a third of their time? That's not a hypothetical. Two hundred teams are already seeing these results.` },
  { id: 's01a_bottleneck', text: `Code reviews are the biggest bottleneck in software development today. The average pull request waits twenty-four hours for a human review. That's an entire day of context switching, blocked deployments, and stale code.` },
  { id: 's01b_cost', text: `Senior engineers spend thirty percent of their time reviewing junior code. Review quality is inconsistent. Some reviewers catch real bugs. Others rubber-stamp. And nobody enjoys doing it.` },
  { id: 's02_linters', text: `We've tried linters and static analysis tools. But they only catch syntax issues and style violations. They don't understand your architecture. They can't tell you when a pull request violates the patterns your team has established.` },
  { id: 's03a_intro', text: `DeepReview is an AI-powered code review assistant that integrates directly with GitHub and GitLab. It analyzes every pull request automatically. Not as a replacement for human review, but as a force multiplier.` },
  { id: 's03b_capabilities', text: `It catches real bugs. Null pointer errors, race conditions, SQL injection. It flags architecture violations when code breaks your team's established patterns. It explains why something is wrong, linking to your own coding standards. And it prioritizes reviews by risk, so humans focus on what matters most.` },
  { id: 's04a_traction', text: `Two hundred paying teams use DeepReview today, generating eight hundred thousand dollars in annual recurring revenue. The platform has analyzed over eight hundred thousand pull requests.` },
  { id: 's04b_results', text: `Twelve thousand four hundred bugs caught before merge, confirmed real by human reviewers. Average review wait time dropped from twenty-four hours to four. And our false positive rate is just eight percent, down from twenty-three at launch.` },
  { id: 's05_ask', text: `We're requesting approval for company-wide adoption across our two thousand engineers. The enterprise license is forty-eight thousand dollars per year. That's two dollars per engineer per month, to give every team faster reviews, fewer bugs in production, and thirty percent more time from your senior engineers.` },
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
