const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');

const scenes = [
  { id: 'c00_hook', text: `Every eleven seconds, an older adult in America falls. Thirty-six million falls each year. It is the number one cause of injury death for adults over sixty-five.` },
  { id: 'c01_problem', text: `Current solutions like Life Alert require pressing a button. But forty-seven percent of falls leave the person unable to reach their device. Families live in constant anxiety, wondering if their loved one is safe.` },
  { id: 'c02_solution', text: `HealthTrack is a lightweight wristband with on-device AI that detects falls within two seconds, automatically. No button press needed. It calls emergency contacts and shares GPS location instantly.` },
  { id: 'c03_predict', text: `Beyond fall detection, HealthTrack monitors daily activity patterns. A thirty percent decline in movement over two weeks predicts hospitalization with seventy-eight percent accuracy. Prevention, not just reaction.` },
  { id: 'c04_traction', text: `Five hundred pilot users across three assisted living facilities. Twenty-three fall detections with ninety-one percent precision. Zero missed falls. Response time dropped from fourteen minutes to just forty-seven seconds. Family satisfaction score of plus seventy-two.` },
  { id: 'c05_ask', text: `We are raising twelve million dollars in Series B to expand to fifty facilities and launch our direct-to-consumer channel. Join us in protecting the people who raised us.` },
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
