const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 's01_hook', text: `Every year, thirty-six million older adults fall in the United States. Falls are the number one cause of injury death for anyone over sixty-five. And here is the most painful statistic: forty-seven percent of the time, the person who falls cannot reach or press their emergency button.` },
  { id: 's02_problem', text: `Think about that. The device designed to save your life requires you to press a button, at the exact moment you are least able to press anything. Family members know this. They live with a quiet, constant anxiety. Did mom fall? Is dad okay? Every unanswered phone call becomes a moment of dread.` },
  { id: 's03_solution', text: `HealthTrack is a lightweight wristband that detects falls automatically. No button. No action required from the wearer. Our on-device AI recognizes a fall within two seconds and immediately calls emergency contacts with the wearer's GPS location.` },
  { id: 's04_howworks', text: `The wristband combines an accelerometer, gyroscope, and heart rate sensor. All processing happens on the device, no cloud dependency, no internet required. When a fall is detected, the alert goes out in two seconds. Compare that to the industry average of fourteen minutes with traditional pendant systems.` },
  { id: 's05_predict', text: `But HealthTrack does more than detect falls. It monitors daily activity patterns continuously. When a wearer's movement declines by thirty percent over two weeks, our algorithm predicts hospitalization with seventy-eight percent accuracy. We don't just respond to emergencies. We help prevent them.` },
  { id: 's06_traction', text: `Here are our pilot results. Five hundred users across three assisted living facilities. Twenty-three fall events detected, twenty-one accurate. That is ninety-one percent precision. Zero missed falls. The two false positives both occurred during aggressive physical therapy. Family satisfaction scores reached a Net Promoter Score of plus seventy-two.` },
  { id: 's07_ask', text: `We are raising twelve million dollars in Series B funding to expand from three facilities to fifty, and launch our direct-to-consumer channel. The technology works. The data proves it. Let's bring HealthTrack to every family that needs it.` },
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
