[
  { scene: 'scene-00', title: 'Hook — Platform Overload', triggers: [
    { delay: 688, run() { show('s1-platforms') } },
  ]},
  { scene: 'scene-01', title: 'Pain — The Stat That Stings', triggers: [
    { delay: 6888, run() { clearAll('scene-00') } },
    { delay: 7226, run() { show('s2-stat-14') } },
    { delay: 11663, run() { show('s2-tabs') } },
  ]},
  { scene: 'scene-02', title: 'What If — The Turn', triggers: [
    { delay: 16001, run() { clearAll('scene-01'); show('s3-whatif') } },
  ]},
  { scene: 'scene-03', title: 'Show — The Demo', triggers: [
    { delay: 20764, run() { clearAll('scene-02'); show('s4a-app') } },
    { delay: 26877, run() { show('s4a-roadmap') } },
    { delay: 27915, run() { fade('s4a-app'); fade('s4a-roadmap'); show('s4b-professors') } },
    { delay: 33265, run() { fade('s4b-professors'); show('s4c-notifications') } },
    { delay: 37378, run() { show('s4c-deadlines') } },
  ]},
  { scene: 'scene-04', title: 'Killer Stat — Validation', triggers: [
    { delay: 39203, run() { clearAll('scene-03') } },
    { delay: 41091, run() { show('s5-number') } },
    { delay: 42428, run() { show('s5-caption') } },
  ]},
  { scene: 'scene-05', title: 'CTA — Scan and Try', triggers: [
    { delay: 44028, run() { clearAll('scene-04'); show('s6-qr') } },
    { delay: 47203, run() { show('s6-tagline') } },
  ]},
]