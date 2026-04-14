/**
 * shared.js — Shared utilities for the Click.Done. video build pipeline.
 * Used by assemble.js to compute animation trigger delays from word-boundary metadata.
 */

const fs = require('fs');
const path = require('path');

const LEAD_MS = 0; // Text appears at the spoken word (never before narration)

/**
 * Load all word-boundary metadata from audio_scenes/ directory.
 * Returns: { clipName: [{t: offsetMs, d: durationMs, w: "word"}, ...], ... }
 */
function loadMetadata(audioDir) {
  const meta = {};
  const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.metadata.json'));
  for (const f of files) {
    const id = f.replace('.metadata.json', '');
    const raw = JSON.parse(fs.readFileSync(path.join(audioDir, f), 'utf-8'));
    meta[id] = (raw.Metadata || [])
      .filter(m => m.Type === 'WordBoundary')
      .map(m => ({
        t: Math.round(m.Data.Offset / 10000),
        d: Math.round(m.Data.Duration / 10000),
        w: m.Data.text.Text
      }));
  }
  return meta;
}

/**
 * Estimate clip duration from metadata (last word end + 300ms buffer).
 */
function estimateClipDuration(meta, clipName) {
  const words = meta[clipName];
  if (!words || words.length === 0) return 0;
  const last = words[words.length - 1];
  return last.t + last.d + 300;
}

/**
 * Compute the delay (in ms) for an animation trigger anchored to a word.
 *
 * @param {Object} meta - All metadata keyed by clip name
 * @param {Array} clips - Scene's clips array (strings and {pause:N} objects)
 * @param {string} clipName - Which clip the word is in
 * @param {string} word - The word to anchor to
 * @param {number} nth - Which occurrence (1-based, default 1)
 * @returns {number} Delay in ms from scene start, or -1 if word not found
 */
function T(meta, clips, clipName, word, nth = 1) {
  // Sum durations of all clips before the target clip
  let offsetMs = 0;
  for (const item of clips) {
    if (typeof item === 'object' && item.pause) {
      offsetMs += item.pause;
    } else if (typeof item === 'string') {
      if (item === clipName) break;
      offsetMs += estimateClipDuration(meta, item);
    }
  }

  // Find the nth occurrence of the word in the target clip
  const words = meta[clipName];
  if (!words) return -1;

  const wordLower = word.toLowerCase();
  let count = 0;
  for (const w of words) {
    if (w.w.toLowerCase() === wordLower) {
      count++;
      if (count === nth) {
        return Math.max(0, offsetMs + w.t - LEAD_MS);
      }
    }
  }
  return -1; // Word not found
}

/**
 * Convert declarative actions array to a JS function body string.
 *
 * Actions format:
 *   {fn: "show", id: "s14-intent"}           → show('s14-intent')
 *   {fn: "clearAll", id: "scene-14"}          → clearAll('scene-14')
 *   {fn: "fade", id: "s14-muscle"}            → fade('s14-muscle')
 *   {fn: "hide", id: "s14-muscle"}            → hide('s14-muscle')
 *   {fn: "showChapter", id: "ch-14"}          → showChapter('ch-14')
 *   {fn: "hideChapter", id: "ch-14"}          → hideChapter('ch-14')
 *   {fn: "showHighlight", id: "s9-same-word"} → showHighlight('s9-same-word')
 *   {fn: "highlightCard", arg: "click"}       → highlightCard('click')
 *   {fn: "showExperimentCards"}               → showExperimentCards()
 *   {fn: "dimExperimentCards"}                → dimExperimentCards()
 *   {fn: "showCeilingLine"}                   → showCeilingLine()
 *   {fn: "showAsymptote"}                     → showAsymptote()
 *   {fn: "showSuccessLine"}                   → showSuccessLine()
 *   {fn: "showGreenLine"}                     → showGreenLine()
 *   {fn: "startCountdownFill"}                → startCountdownFill()
 *   {fn: "greyscaleDo"}                       → greyscaleDo()
 *   {fn: "clearScene3Top"}                    → clearScene3Top()
 */
function actionsToJS(actions) {
  return actions.map(a => {
    if (a.id) return `${a.fn}('${a.id}')`;
    if (a.arg) return `${a.fn}('${a.arg}')`;
    return `${a.fn}()`;
  }).join('; ');
}

module.exports = { loadMetadata, estimateClipDuration, T, actionsToJS, LEAD_MS };
