// ===== GAME DATA =====
// DEAD CODE — confirmed by import-graph check (2026-08-14 adoption audit) that
// nothing imports this file. Superseded by the src/data/ + src/engine/ split
// (src/data/roster.js, src/engine/career.js, etc.) which is what game.js
// actually uses. Safe to delete — flagged rather than deleted because this
// sandbox's filesystem mount doesn't permit deleting files in this project
// folder; delete it yourself locally, or ask Claude again once approvals work.

const BACKGROUNDS = {
  military: { name: 'Military Veteran', stats: { physical: 10, knowledge: 0, morale: 0, reputation: 0, leadership: 5, command: 0 } },
  emt:      { name: 'EMT / Paramedic',  stats: { physical: 0, knowledge: 10, morale: 5, reputation: 0, leadership: 0, command: 0 } },
  athlete:  { name: 'Collegiate Athlete', stats: { physical: 12, knowledge: 0, morale: 3, reputation: 0, leadership: 0, command: 0 } },
  civilian: { name: 'Civilian',         stats: { physical: 5, knowledge: 5, morale: 5, reputation: 5, leadership: 5, command: 5 } },
};

const BASE_STATS = { physical: 30, knowledge: 30, morale: 40, reputation: 20, leadership: 20, command: 10 };

const STAT_COLORS = {
  physical: '#ef4444', knowledge: '#3b82f6', morale: '#22c55e',
  reputation: '#a855f7', leadership: '#f59e0b', command: '#ec4899'
};

// difficulty: 'easy' | 'medium' | 'hard'
// easy:   crit >= 10, success >= 7, partial >= 4
// medium: crit >= 11, success >= 8, partial >= 5 (default)
// hard:   crit >= 12, success >= 9, partial >= 6
// Suppression track ranks (index 0 = academy, index 1 = first shift rank)
const RANKS = [
  { id:'candidate',       label:'Academy Candidate',        thresholds:null, callsRequired:0 },
  { id:'probie',          label:'Probationary Firefighter', thresholds:{physical:42,knowledge:38,morale:38}, callsRequired:4 },
  { id:'firefighter',     label:'Firefighter',              thresholds:{physical:52,knowledge:48,leadership:35}, callsRequired:12 },
  { id:'driver_engineer', label:'Driver Engineer',          thresholds:{physical:65,knowledge:62}, callsRequired:22 },
  { id:'lieutenant',      label:'Lieutenant',               thresholds:{physical:58,knowledge:65,leadership:55,reputation:55}, callsRequired:35 },
  { id:'captain',         label:'Captain',                  thresholds:{knowledge:75,leadership:70,command:60,reputation:80}, callsRequired:65 },
  { id:'battalion_chief', label:'Battalion Chief',          thresholds:{physical:75,knowledge:80,leadership:80,command:75,reputation:80,morale:65}, callsRequired:120 },
];

// EMS track ranks
const EMS_RANKS = [
  { id:'ems_candidate', label:'Paramedic Candidate', thresholds:null, callsRequired:0 },
  { id:'paramedic',     label:'Paramedic',           thresholds:{knowledge:48,morale:38}, callsRequired:5 },
  { id:'pic',           label:'Paramedic in Charge', thresholds:{knowledge:62,leadership:48,reputation:52}, callsRequired:22 },
  { id:'field_chief',   label:'Paramedic Field Chief', thresholds:{knowledge:76,leadership:62,command:52,reputation:72}, callsRequired:55 },
];

// Season 14 roster — Firehouse 12
const ROSTER = [
  // Command
  { id:'kade',   name:'Dom Kade',       role:'Battalion Chief',     unit:'Battalion 6',  emoji:'🎖️', bond:15, initials:'DP', color:'#f59e0b',
    trait:'Does things right or doesn\'t do them.' },
  { id:'whitfield',    name:'Wallace Whitfield',    role:'Deputy Commissioner', unit:'AFD HQ',        emoji:'⭐',  bond:10, initials:'WB', color:'#c8a000',
    trait:'The standard everyone else is measured against.' },
  // Squad 4
  { id:'kessler', name:'Nate Kessler',   role:'Lieutenant',          unit:'Squad 4',       emoji:'🔥',  bond:15, initials:'KS', color:'#ef4444',
    trait:'Elite rescue, will push limits.' },
  { id:'ortega',     name:'Miguel Ortega',         role:'Firefighter',         unit:'Squad 4',       emoji:'🧗',  bond:25, initials:'JC', color:'#ef4444',
    trait:'Brotherhood first, always.' },
  { id:'brennan',     name:'Walt Brennan',      role:'Firefighter',         unit:'Squad 4',       emoji:'🛠️', bond:20, initials:'HC', color:'#6b7280',
    trait:'Seen it all, still shows up.' },
  { id:'reyes', name:'Danny Reyes',    role:'Firefighter',         unit:'Squad 4',       emoji:'🔧',  bond:18, initials:'TF', color:'#6b7280',
    trait:'Does the work, no drama.' },
  // Truck 7
  { id:'delgado',     name:'Rae Delgado',      role:'Lieutenant',          unit:'Truck 7',      emoji:'⛑️',  bond:20, initials:'SK', color:'#f59e0b',
    trait:'Leads from the front, no apologies.' },
  { id:'solano',  name:'Ray Solano',      role:'Firefighter',         unit:'Truck 7',      emoji:'🧱',  bond:12, initials:'SV', color:'#9ca3af',
    trait:'Something to prove, loyalty unconfirmed.' },
  // Truck 7 (continued)
  { id:'whitaker', name:'Gus Whitaker',   role:'Firefighter',         unit:'Truck 7',      emoji:'💪',  bond:20, initials:'CH', color:'#ef4444',
    trait:'Old school, always right about people.' },
  // Engine 12
  { id:'tibbets',    name:'Earl Tibbets',  role:'Lieutenant',          unit:'Engine 12',     emoji:'📋',  bond:15, initials:'RM', color:'#f59e0b',
    trait:'Earned it the long way.' },
  { id:'alvarez',   name:'FF Alvarez',        role:'Firefighter',         unit:'Engine 12',     emoji:'🚒',  bond:0,  initials:'RV', color:'#6b7280',
    trait:'Does the shift, goes home.' },
  { id:'voss',     name:'FF Voss',          role:'Firefighter',         unit:'Engine 12',     emoji:'🔷',  bond:0,  initials:'FC', color:'#6b7280',
    trait:'Solid when it counts.' },
  // Ambulance 9
  { id:'priya',   name:'Priya Malhotra',    role:'Paramedic in Charge', unit:'Ambulance 9',  emoji:'🚑',  bond:15, initials:'VM', color:'#3b82f6',
    trait:'Patient first, politics second.' },
  { id:'lindqvist',    name:'Nora Lindqvist',     role:'Paramedic',           unit:'Ambulance 9',  emoji:'💙',  bond:20, initials:'LN', color:'#60a5fa',
    trait:'Heart bigger than her experience.' },
];

// Bond modifier rules: { crewId, unitMatch, callIds, statBonus }
const BOND_MODIFIERS = [
  { crewId:'delgado',     unitMatch:'Truck 7',    callIds:null, statBonus:5, minBond:60 },
  { crewId:'kessler', unitMatch:'Squad 4',     callIds:null, statBonus:5, minBond:60 },
  { crewId:'whitaker', unitMatch:'Truck 7',    callIds:null, statBonus:4, minBond:60 },
  { crewId:'tibbets',    unitMatch:'Engine 12',   callIds:null, statBonus:3, minBond:55 },
  { crewId:'priya',   unitMatch:null, callIds:['medical_emergency','cardiac_arrest','mass_casualty'], statBonus:5, minBond:55 },
  { crewId:'kade',   unitMatch:null,           callIds:null, statBonus:3, minBond:65 },
  { crewId:'ortega',     unitMatch:'Squad 4',      callIds:null, statBonus:4, minBond:55 },
];

// Unit call pool weightings: call IDs listed with repeats for higher weight
const UNIT_CALL_POOL = {
  'Truck 7':    ['structure_fire','structure_fire','house_fire_children','house_fire_children','high_rise','building_collapse','elevator_rescue','false_alarm','explosion','vehicle_collision'],
  'Squad 4':     ['trench_rescue','trench_rescue','water_rescue','swift_water','swift_water','building_collapse','industrial_accident','train_derailment','vehicle_collision','structure_fire'],
  'Engine 12':   ['structure_fire','structure_fire','gas_leak','gas_leak','electrical_fire','wildland','explosion','explosion','false_alarm','house_fire_children'],
  'Ambulance 9':['medical_emergency','medical_emergency','cardiac_arrest','cardiac_arrest','mass_casualty','vehicle_collision','industrial_accident','multi_vehicle'],
};

// Ashfall neighbourhoods for map
const NEIGHBORHOODS = {
  near_north:    { label: 'Harborview',    x: 168, y: 55,  w: 60, h: 55, callBias: ['high_rise','medical_emergency','false_alarm','cardiac_arrest'] },
  river_north:   { label: 'Foundry District',   x: 108, y: 100, w: 60, h: 50, callBias: ['structure_fire','electrical_fire','explosion','false_alarm'] },
  lincoln_park:  { label: 'Ridgeway',  x: 170, y: 110, w: 58, h: 45, callBias: ['medical_emergency','structure_fire','house_fire_children'] },
  west_loop:     { label: 'Millrace',     x: 58,  y: 130, w: 50, h: 50, callBias: ['gas_leak','industrial_accident','explosion','electrical_fire'] },
  wicker_park:   { label: 'Copperline',   x: 40,  y: 165, w: 65, h: 50, callBias: ['structure_fire','house_fire_children','vehicle_collision'] },
  saltmarsh:        { label: 'Saltmarsh',        x: 45,  y: 240, w: 70, h: 50, callBias: ['structure_fire','gas_leak','industrial_accident'] },
  back_of_yards: { label: 'Dockyard', x: 30,  y: 290, w: 70, h: 45, callBias: ['industrial_accident','structure_fire','explosion'] },
  ironside:    { label: 'Ironside',    x: 108, y: 270, w: 60, h: 55, callBias: ['vehicle_collision','medical_emergency','structure_fire'] },
};

// Map call type → neighborhood key
const CALL_NEIGHBORHOOD_BIAS = {
  high_rise:          'near_north',
  medical_emergency:  'near_north',
  cardiac_arrest:     'near_north',
  false_alarm:        'river_north',
  structure_fire:     'wicker_park',
  electrical_fire:    'river_north',
  explosion:          'west_loop',
  gas_leak:           'west_loop',
  industrial_accident:'west_loop',
  house_fire_children:'wicker_park',
  vehicle_collision:  'ironside',
  multi_vehicle:      'ironside',
  water_rescue:       'near_north',
  swift_water:        'river_north',
  train_derailment:   'back_of_yards',
  building_collapse:  'saltmarsh',
  wildland:           'near_north',
  trench_rescue:      'saltmarsh',
  elevator_rescue:    'near_north',
  mass_casualty:      'ironside',
};

// ===== ACADEMY INSTRUCTORS =====
const ACADEMY_INSTRUCTORS = {
  fire: {
    lead: { name: 'Chief Instructor Walt Ramsey', short: 'Ramsey', bio: '28-year AFD veteran. Former Battalion Chief. Runs the academy like he ran his company — high standards, no excuses, absolute fairness.' },
    physical: { name: 'Instructor Maria Torres', short: 'Torres', bio: '14-year veteran, former Squad 4 company. Moved to training after an injury. The hardest fitness drill you\'ll ever run is hers.' },
    assistant: { name: 'Instructor Dan Kessler', short: 'Kessler', bio: '8 years AFD, former Engine company. More approachable than Ramsey or Torres. Teaches hose ops, apparatus basics, crew culture.' },
  },
  ems: {
    lead: { name: 'Training Coordinator Patricia Nash', short: 'Nash', bio: '20-year paramedic, Ashfall EMS training division. Strict on protocol, deeply human. Every procedure she teaches has a story behind it.' },
    clinical: { name: 'Clinical Advisor Dr. Reyes', short: 'Dr. Reyes', bio: 'Physician advisor to the paramedic program. Leads the written exam section. "In this field, close enough isn\'t good enough."' },
  },
};

// ===== ACADEMY EVENTS =====
const ACADEMY_EVENTS = [
  {
    id: 'w1_orientation', week: 1, type: 'training', tag: 'ORIENTATION',
    icon: '🎓', title: 'Academy Orientation',
    desc: 'Chief Instructor Ramsey stands at the front of the room and surveys the new class for a long moment before speaking. "I\'ve been doing this for twenty-eight years. The question I ask myself about every candidate in this room is: what are they made of when it gets hard? Because it will get hard." You have to choose how to spend your first afternoon.',
    choices: [
      { text: 'Hit the gym — establish yourself physically from day one', effect: { physical: 5 }, effectLabel: '+5 Physical' },
      { text: 'Study the orientation packet and SOG overview late into the evening', effect: { knowledge: 5 }, effectLabel: '+5 Knowledge' },
      { text: 'Introduce yourself to every candidate — build the network early', effect: { morale: 4, reputation: 2 }, effectLabel: '+4 Morale, +2 Reputation' },
    ]
  },
  {
    id: 'w2_ladder', week: 2, type: 'training', tag: 'TRAINING',
    icon: '🔧', title: 'Ladder & Hose Operations',
    desc: 'Instructor Torres runs your class through ladder raises and hose coupling under a timed drill. She watches with folded arms, says nothing unless something is dangerous or wrong. "Speed is life. Hesitation kills. And I will time every single one of you." You fall behind on the ladder raise.',
    choices: [
      { text: 'Power through — brute force it to the finish line', effect: { physical: 4, morale: -2 }, effectLabel: '+4 Physical, -2 Morale' },
      { text: 'Stop and ask Torres for a technique correction right there', effect: { knowledge: 4, reputation: 2 }, effectLabel: '+4 Knowledge, +2 Reputation' },
      { text: 'Stay after the drill and practice until you get it right', effect: { physical: 3, knowledge: 3 }, effectLabel: '+3 Physical, +3 Knowledge' },
    ]
  },
  {
    id: 'w3_bunker', week: 3, type: 'training', tag: 'TRAINING',
    icon: '🧥', title: 'Bunker Gear & SCBA',
    desc: 'The physical demands of the week escalate. You must don full bunker gear in under 90 seconds following a three-mile run. Instructor Kessler walks among the candidates calling time. "Ninety seconds is the standard. The fire doesn\'t wait for you to catch your breath." Several candidates fail the first attempt.',
    choices: [
      { text: 'Drill the sequence obsessively until it\'s pure muscle memory', effect: { physical: 3, knowledge: 5 }, effectLabel: '+3 Physical, +5 Knowledge' },
      { text: 'Pace yourself — a clean pass beats a panicked fail', effect: { knowledge: 4, morale: 2 }, effectLabel: '+4 Knowledge, +2 Morale' },
      { text: 'Help the struggling candidates in your group get it right', effect: { morale: 3, leadership: 4, reputation: 2 }, effectLabel: '+3 Morale, +4 Leadership, +2 Rep' },
    ]
  },
  {
    id: 'w4_kitchen', week: 4, type: 'social', tag: 'SOCIAL',
    icon: '🍳', title: 'Kitchen Detail',
    desc: 'The class is assigned kitchen duty at the training facility. Instructor Kessler makes a point of stopping by. "You think kitchen duty is beneath you? The firehouses that eat well together are the ones that perform well under pressure. This matters." He means it.',
    choices: [
      { text: 'Cook something genuinely impressive — show you take all of it seriously', effect: { morale: 5, reputation: 3 }, effectLabel: '+5 Morale, +3 Reputation' },
      { text: 'Ask Kessler about Engine company culture while you cook', effect: { knowledge: 4, reputation: 3 }, effectLabel: '+4 Knowledge, +3 Reputation' },
      { text: 'Keep your head down and get the job done efficiently', effect: { morale: 3 }, effectLabel: '+3 Morale' },
    ]
  },
  {
    id: 'w5_liveburn', week: 5, type: 'training', tag: 'LIVE BURN',
    icon: '🔥', title: 'Live Burn Exercise',
    desc: 'Your class enters a fully involved burn building for the first time. The heat is like a wall. Inside, disorientation sets in fast. Torres is outside on the radio. "Control your breathing. Read the smoke. Trust your training." Ramsey is in the safety sector watching through the viewport. Every second counts.',
    choices: [
      { text: 'Advance aggressively — push through to the seat of the fire', effect: { physical: 6, morale: -3 }, effectLabel: '+6 Physical, -3 Morale' },
      { text: 'Move methodically, reading the fire conditions before each step', effect: { knowledge: 6, physical: 2 }, effectLabel: '+6 Knowledge, +2 Physical' },
      { text: 'Take point — lead your group through the evolution', effect: { leadership: 6, physical: 3, morale: 2 }, effectLabel: '+6 Leadership, +3 Physical, +2 Morale' },
    ]
  },
  {
    id: 'w6_written', week: 6, type: 'exam', tag: 'WRITTEN EXAM',
    icon: '📝', title: 'Written Examination',
    desc: 'The midterm written exam covers fire behavior, ICS structure, hazmat protocols, and NFPA standards. Failure means remediation and a delayed graduation. Ramsey reminds the class before distributing the papers: "This exam is not a formality. It is a measure of whether you are prepared to act correctly when someone\'s life depends on it."',
    choices: [
      { text: 'Trust your preparation — work through it methodically', effect: { knowledge: 7, morale: 2 }, effectLabel: '+7 Knowledge, +2 Morale' },
      { text: 'Rush through to allow time for a second review of every answer', effect: { knowledge: 5, morale: -2 }, effectLabel: '+5 Knowledge, -2 Morale' },
      { text: 'Focus your remaining time on your known weak areas', effect: { knowledge: 6 }, effectLabel: '+6 Knowledge' },
    ]
  },
  {
    id: 'w7_practical', week: 7, type: 'exam', tag: 'PRACTICAL EXAM',
    icon: '⚙️', title: 'Practical Skills Exam',
    desc: 'The full practical exam. Every skill from the last seven weeks tested in sequence: rappel, pump ops, auto extrication, patient packaging. Torres and Ramsey observe each station. Kessler marks the evaluation sheets without comment. Everything you\'ve worked for comes down to this.',
    choices: [
      { text: 'Go all out — leave nothing on the table', effect: { physical: 5, knowledge: 4, reputation: 4 }, effectLabel: '+5 Physical, +4 Knowledge, +4 Rep' },
      { text: 'Stay smooth and controlled — execute every skill clean', effect: { knowledge: 6, morale: 3 }, effectLabel: '+6 Knowledge, +3 Morale' },
      { text: 'Volunteer to go first — set the pace and own the moment', effect: { leadership: 5, reputation: 5, physical: 2 }, effectLabel: '+5 Leadership, +5 Rep, +2 Physical' },
    ]
  },
  {
    id: 'w8_graduation', week: 8, type: 'graduation', tag: 'GRADUATION',
    icon: '🏅', title: 'Graduation Ceremony',
    desc: 'You stand in dress uniform in the academy gymnasium. Chief Instructor Ramsey calls your class to order one final time. "You came here as candidates. You leave as firefighters of the Ashfall Fire Department." Battalion Chief Wallace Whitfield of Firehouse 12 — your assignment — steps to the podium. He says very little. He doesn\'t need to. He pins your badge himself.',
    choices: [
      { text: 'Graduate — Begin your career at Firehouse 12', effect: { morale: 10, reputation: 5, physical: 2, knowledge: 2 }, effectLabel: '+10 Morale, +5 Rep, +2 Physical, +2 Knowledge', isGraduation: true },
    ]
  },
];

// ===== FIRE ACADEMY GUEST INSTRUCTOR EVENTS =====
// These fire AFTER the regular week event at the specified week
const FIRE_GUEST_EVENTS = [
  {
    id: 'guest_kessler_rescue', week: 3, crewId: 'kessler',
    tag: 'GUEST INSTRUCTOR', icon: '🔥',
    portrait: 'KS', border: '#ef4444',
    title: 'Lt. Kessler — Technical Rescue Demonstration',
    intro: 'An unscheduled visitor arrives at the training ground. Lieutenant Nate Kessler from Squad 4, Firehouse 12 has cleared time in his schedule to run a technical rescue demonstration for the current class. Instructor Ramsey steps back. When Kessler is in the room, he gets the floor.',
    dialogue: '"Rescue isn\'t about strength. It\'s about reading the problem before you commit to a solution. Strength gets you into trouble. Intelligence gets you out."',
    note: 'Your first impression of Kessler determines how he sees you when you arrive at Firehouse 12.',
    choices: [
      { text: 'Watch every move — absorb his technique without saying a word', effect: { knowledge: 5 }, bondDelta: 8, effectLabel: '+5 Knowledge, Kessler bond +8' },
      { text: 'Volunteer as the demo subject — put yourself in the problem', effect: { physical: 4, knowledge: 3 }, bondDelta: 13, effectLabel: '+4 Physical, +3 Knowledge, Kessler bond +13' },
      { text: 'Ask a precise technical question about load-path dynamics', effect: { knowledge: 6 }, bondDelta: 11, effectLabel: '+6 Knowledge, Kessler bond +11' },
    ],
  },
  {
    id: 'guest_delgado_leadership', week: 5, crewId: 'delgado',
    tag: 'GUEST INSTRUCTOR', icon: '⛑️',
    portrait: 'SK', border: '#f59e0b',
    title: 'Lt. Delgado — Earning Your Place on Truck 7',
    intro: 'Lieutenant Rae Delgado from Truck 7 arrives the morning after your live burn exercise. She doesn\'t wait for an introduction. "I\'m Delgado. I run Truck 7. If you end up on my rig, you need to hear this before you get there."',
    dialogue: '"You earn Truck 7, you don\'t inherit it."',
    note: 'Your interaction with Delgado becomes the story she tells the crew before you arrive at 12.',
    choices: [
      { text: '"What\'s the call that shaped how you lead?" — ask her directly', effect: { morale: 4, leadership: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Leadership, Delgado bond +12' },
      { text: 'Engage with her tactical scenario — show your operational thinking', effect: { knowledge: 3, leadership: 3 }, bondDelta: 10, effectLabel: '+3 Knowledge, +3 Leadership, Delgado bond +10' },
      { text: 'Take everything in without speaking — some lessons are for listening', effect: { morale: 5 }, bondDelta: 7, effectLabel: '+5 Morale, Delgado bond +7' },
    ],
  },
  {
    id: 'guest_whitaker_engine', week: 7, crewId: 'whitaker',
    tag: 'GUEST INSTRUCTOR', icon: '💪',
    portrait: 'CH', border: '#ef4444',
    title: 'Lt. Whitaker — Engine Company & Crew Culture',
    intro: 'Lieutenant Gus Whitaker from Engine 12 runs the final guest session before graduation. He walks in carrying a covered dish and sets it on the table at the front of the room. "We\'re going to talk about the most important thing in your career. And then we\'re going to eat."',
    dialogue: '"The fireground will tell you what it needs. Your crew will tell you what they need. The job of a good firefighter is to listen to both at the same time and make the right call. That\'s it. That\'s all of it."',
    note: 'How you engage with Whitaker here sets the tone for your relationship in the house.',
    choices: [
      { text: '"Kitchen culture sounds like morale management dressed up." Challenge the premise respectfully.', effect: { leadership: 3, reputation: 2 }, bondDelta: 9, effectLabel: '+3 Leadership, +2 Rep, Whitaker bond +9' },
      { text: 'Ask about the longest stretch he\'s served with the same crew', effect: { morale: 4, knowledge: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Knowledge, Whitaker bond +12' },
      { text: 'Help him serve the food without being asked', effect: { morale: 5, reputation: 2 }, bondDelta: 14, effectLabel: '+5 Morale, +2 Rep, Whitaker bond +14' },
    ],
  },
  {
    id: 'guest_kade_address', week: 4, crewId: 'kade',
    tag: 'SPECIAL ADDRESS', icon: '🎖️',
    portrait: 'DP', border: '#f59e0b',
    title: 'BC Kade — Midpoint Address',
    intro: 'At the midpoint of the academy cycle, Battalion Chief Dom Kade arrives unannounced. Ramsey calls the class to attention and steps aside. Kade surveys the room once before he speaks.',
    dialogue: '"I\'m not going to tell you this job is the greatest thing you\'ll ever do. You\'re going to figure that out. What I\'m here to tell you is that it comes with a cost — and the firefighters who last are the ones who understand that cost before they pay it."',
    note: 'Kade\'s first impression of you shapes how he manages your assignments at 12.',
    choices: [
      { text: 'Maintain perfect composure — let your posture and presence speak', effect: { reputation: 3, leadership: 2 }, bondDelta: 8, effectLabel: '+3 Reputation, +2 Leadership, Kade bond +8' },
      { text: 'Ask one direct, intelligent question about command philosophy', effect: { knowledge: 3, reputation: 3 }, bondDelta: 12, effectLabel: '+3 Knowledge, +3 Rep, Kade bond +12' },
      { text: 'Approach Kade after the address — brief introduction, eye contact', effect: { reputation: 4, morale: 2 }, bondDelta: 10, effectLabel: '+4 Reputation, +2 Morale, Kade bond +10' },
    ],
  },
];

// ===== EMS ACADEMY GUEST EVENTS =====
const EMS_GUEST_EVENTS = [
  {
    id: 'ems_guest_priya_lecture', week: 2, crewId: 'priya',
    tag: 'GUEST INSTRUCTOR', icon: '🚑',
    portrait: 'VM', border: '#3b82f6',
    title: 'PIC Malhotra — Field Medicine & Triage Priority',
    intro: 'Paramedic in Charge Priya Malhotra from Ambulance 9 has agreed to guest-lecture Week 2 pharmacology. Coordinator Nash introduces her simply: "PIC Malhotra manages Ambo 9. She agreed to come in on her day off."',
    dialogue: '"Triage isn\'t about saving the worst patient. It\'s about saving the most lives with what you have. That decision happens in seconds and it lives with you for years. Know your protocols, know your limits, and never confuse the two."',
    note: 'Priya is evaluating you as a potential partner before she knows that\'s what you are.',
    choices: [
      { text: 'Ask her to walk through a complex triage case she\'s actually run', effect: { knowledge: 5, reputation: 3 }, bondDelta: 12, effectLabel: '+5 Knowledge, +3 Rep, Priya bond +12' },
      { text: 'Take every note you can — absorb the depth of her clinical thinking', effect: { knowledge: 6 }, bondDelta: 8, effectLabel: '+6 Knowledge, Priya bond +8' },
      { text: 'Push back on one protocol detail — show her you\'re thinking, not just copying', effect: { knowledge: 4, leadership: 2 }, bondDelta: 14, effectLabel: '+4 Knowledge, +2 Leadership, Priya bond +14' },
    ],
  },
];

// ===== SHIFT ACTIONS =====
const SHIFT_ACTIONS = {
  drill: {
    name: 'Company Drill', location: 'Apparatus Bay',
    desc: 'Running drills with the crew sharpens your skills and shows initiative.',
    effect: { physical: 3, knowledge: 3, leadership: 2 },
    dialogues: [
      '"Good work today — you\'re getting faster on the hose pack." — Ortega',
      'Kessler walks through without a word, but gives you a single approving nod.',
      '"You\'re learning. Keep showing up like this." — Delgado',
      '"Drill hard or the fire will drill you." — Kessler',
    ]
  },
  gym: {
    name: 'Fitness Training', location: 'Gym',
    desc: 'Putting in work at the gym. The job demands peak physical condition.',
    effect: { physical: 5, morale: 2 },
    dialogues: [
      'You push through an extra set when everyone else has already showered.',
      '"Respect the grind," Whitaker says, watching you finish your run.',
      'Ortega spots you on bench. "You\'re going to feel that tomorrow."',
      'Kessler is already there when you arrive. You work in silence — it feels respectful.',
    ]
  },
  meal: {
    name: 'Crew Meal', location: 'Kitchen',
    desc: 'Cooking for the crew builds trust and morale. Community is everything at 12.',
    effect: { morale: 5, reputation: 3 },
    dialogues: [
      'Whitaker declares your chili "not bad — for a probie."',
      'Kade stops in for seconds. He doesn\'t say anything, but he finishes his plate.',
      'Sorensen tells you it\'s the best meal they\'ve had this shift.',
      'Ortega scrapes his plate clean and gives you a thumbs up.',
    ]
  },
  study: {
    name: 'Study SOGs', location: 'Watch Office',
    desc: 'Reviewing Standard Operating Guidelines. Knowledge is the sharpest tool on any rig.',
    effect: { knowledge: 5, command: 2 },
    dialogues: [
      'You find a case study in the logs that changes how you think about ventilation.',
      '"The best firefighters read more than they lift," Delgado tells you, spotting the binder.',
      'You memorize the ICS command structure. It clicks.',
      'Delgado leaves a highlighted section of the SOG on your bunk without comment.',
    ]
  },
  paperwork: {
    name: 'Incident Reports', location: 'Bunk Room / Desk',
    desc: 'Completing your paperwork keeps the house running and builds your command reputation.',
    effect: { reputation: 3, command: 3 },
    dialogues: [
      'Your reports are clean and detailed. Kade notes this at the next briefing.',
      '"Nobody likes paperwork," Delgado says. "But everybody notices when it\'s done right."',
      'You catch a discrepancy in the equipment log and report it. Ortega is impressed.',
      'Kade stops by your desk, glances at your stack of completed reports, and nods once.',
    ]
  },
};

// ===== CALL TYPES (20 total) =====
const CALL_TYPES = [
  // ── ORIGINAL 5 ──
  {
    id: 'structure_fire', difficulty: 'medium',
    name: 'Structure Fire', units: 'Engine 12, Truck 7, Squad 4', badge: 'STRUCTURE FIRE',
    addresses: ['4117 N. Thornton Ave', '2218 W. Emberline St', '551 N. Larkin St', '8800 S. Cottage Hollow Ave'],
    details: [
      'Two-story residential, fire on the second floor. Possible occupant trapped.',
      'Commercial building, working fire on the first floor. Heavy smoke showing.',
      'Three-flat, fire in the basement with extension to the first floor.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7, Squad 4 — structure fire, two-story residential. Caller reports smoke on the second floor.' },
      { speaker: 'Delgado', line: 'Squad 4, primary search. Truck 7 takes the roof. Engine 12 — line to the door.' },
      { speaker: 'Kessler', line: 'Copy that, Captain. Squad 4 moving.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You execute perfectly — primary search clear, fire knocked down fast. Kade calls it textbook. The crew is pumped.', stats: { physical: 6, knowledge: 4, reputation: 5, morale: 4 } },
      success:     { label: 'SUCCESS',          text: 'Good work under pressure. The fire\'s out, everyone\'s safe. Delgado claps you on the shoulder.', stats: { physical: 4, knowledge: 3, reputation: 3, morale: 2 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You got the job done but it cost you. Overextended on the line — Kessler had to pull you back. Not your best.', stats: { physical: 2, morale: -3, reputation: -2 } },
      failure:     { label: 'SETBACK',          text: 'You froze when the floor started to give. Had to be pulled out. Everyone made it, but the debrief is brutal. You learn from this.', stats: { morale: -5, reputation: -4, physical: -2 } },
    }
  },
  {
    id: 'vehicle_collision', difficulty: 'medium',
    name: 'Vehicle Collision', units: 'Engine 12, Truck 7, Ambulance 9', badge: 'MVA — EXTRICATION',
    addresses: ['Route 8 at Montrose', 'Riverside Dr & Concourse Ave', '79th & Vantage'],
    details: [
      'Multi-vehicle accident, two confirmed entrapped. Fuel leak reported.',
      'Semi-truck versus passenger vehicle. One patient unconscious.',
      'High-speed collision, possible ejection. Fire in engine compartment.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7, Ambulance 9 — MVA with extrication. Multiple vehicles, fuel leak possible.' },
      { speaker: 'Sorensen', line: 'Ambo 9 rolling. What\'s the patient count?' },
      { speaker: 'Whitaker', line: 'Engine 12 on scene. Secure the fuel — Jaws team on the B-pillar.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Efficient extrication under three minutes. Sorensen gets to the patient in time. "That\'s how it\'s done," Whitaker says.', stats: { physical: 5, knowledge: 4, reputation: 5, morale: 3 } },
      success:     { label: 'SUCCESS',          text: 'Patient is out and in Sorensen\'s hands. Clean work. Everyone goes home.', stats: { physical: 3, knowledge: 3, reputation: 3, morale: 2 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'The door gave way unexpectedly. You caught it but lost time. Patient is okay, but it was closer than it should have been.', stats: { physical: 2, knowledge: 1, morale: -2 } },
      failure:     { label: 'SETBACK',          text: 'Rushed the cut — compromised the structural integrity. Whitaker had to take over. Patient survived, but you hear about it in debrief.', stats: { morale: -4, reputation: -3 } },
    }
  },
  {
    id: 'medical_emergency', difficulty: 'easy',
    name: 'Medical Emergency', units: 'Ambulance 9, Engine 12', badge: 'MEDICAL EMERGENCY',
    addresses: ['3302 S. Meridian Dr', '1847 N. Cresthill Ave', '6011 N. Bayshore Rd'],
    details: [
      'Chest pain and difficulty breathing, male, mid-50s. Wife reports sudden collapse.',
      'Unresponsive female, early 30s. Possible overdose, caller is panicking.',
      'Pediatric patient, seizure activity ongoing for 4 minutes.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Ambulance 9, Engine 12 — EMS response, possible cardiac event.' },
      { speaker: 'Sorensen', line: 'Ambo 9 rolling. What\'s the scene status?' },
      { speaker: 'Whitaker', line: 'Engine 12 will be there in two. Sorensen, we\'ll have ALS ready.' },
    ],
    primaryStats: ['knowledge', 'morale'], statLabels: ['Knowledge', 'Morale'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You and Sorensen work in perfect sync. Patient stabilized and delivered to Crestbridge with time to spare. Sorensen looks at you differently after this call.', stats: { knowledge: 5, morale: 5, reputation: 5 } },
      success:     { label: 'SUCCESS',          text: 'Patient is stable. Sorensen says you kept your head. Good call.', stats: { knowledge: 4, morale: 3, reputation: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Missed a critical assessment step. Sorensen caught it. Patient is fine, but she gives you a look that says "we\'ll talk later."', stats: { knowledge: 1, morale: -3, reputation: -1 } },
      failure:     { label: 'SETBACK',          text: 'You panicked under family pressure. Sorensen had to take over. You helped — eventually — but the call shook you.', stats: { morale: -5, reputation: -3, knowledge: 1 } },
    }
  },
  {
    id: 'hazmat', difficulty: 'medium',
    name: 'HazMat Incident', units: 'Squad 4, HazMat 1, Engine 12', badge: 'HAZMAT INCIDENT',
    addresses: ['Calumet Industrial Corridor', '4201 W. Fenwick Ave', 'Harborline & Anchor Pier'],
    details: [
      'Unknown chemical spill in a warehouse. Worker reports burning sensation and respiratory distress.',
      'Ammonia release in a refrigeration facility. Multiple workers evacuating.',
      'Overturned tanker truck, unknown placard, leaking into storm drain.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Squad 4, HazMat 1, Engine 12 — chemical incident, industrial zone. Possible inhalation injuries.' },
      { speaker: 'Kessler', line: 'Squad 4 responding. We go Level B until we know what we\'re dealing with.' },
      { speaker: 'Ortega', line: 'Copy. I\'ll pull the ERG — get an ID on that placard.' },
    ],
    primaryStats: ['knowledge', 'leadership'], statLabels: ['Knowledge', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You ID the material, coordinate the perimeter, and oversee safe decon. Kessler calls it "exactly right."', stats: { knowledge: 6, leadership: 5, reputation: 5, command: 3 } },
      success:     { label: 'SUCCESS',          text: 'Scene managed safely. No civilian exposures. Slow but solid.', stats: { knowledge: 4, leadership: 3, reputation: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You got confused on the ERG section. Ortega stepped in. Scene was contained, but you need more time with hazmat protocols.', stats: { knowledge: 2, leadership: -2, morale: -2 } },
      failure:     { label: 'SETBACK',          text: 'Underestimated the vapor cloud radius. Had to pull back and reset. Kessler is quiet on the ride back — the bad kind of quiet.', stats: { reputation: -4, leadership: -3, morale: -3 } },
    }
  },
  {
    id: 'false_alarm', difficulty: 'easy',
    name: 'False Alarm', units: 'Engine 12, Truck 7', badge: 'ALARM RESPONSE',
    addresses: ['800 N. Concourse Ave', '2100 W. Garrison Rd', 'Crestview Field Airport Terminal B'],
    details: [
      'Commercial fire alarm, high-rise building. Automatic suppression system activated.',
      'Residential alarm activation. Tenant reports possible smoke smell.',
      'Cooking fire on the 14th floor — contained before arrival.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7 — alarm response, commercial address. Automatic notification, no confirmation of fire.' },
      { speaker: 'Delgado', line: 'Truck 7 responding. Let\'s not assume anything — go in like it\'s real until it\'s not.' },
      { speaker: 'Whitaker', line: 'Engine 12 copy. Water supply established just in case.' },
    ],
    primaryStats: ['knowledge', 'reputation'], statLabels: ['Knowledge', 'Reputation'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'False alarm confirmed fast and professionally. You managed the nervous building manager with composure. Kade hears about it from the property owner.', stats: { knowledge: 3, reputation: 5, morale: 3, command: 2 } },
      success:     { label: 'ALL CLEAR',        text: 'Nothing showing. Quick sweep, all clear called. Delgado nods. "Good work being thorough."', stats: { knowledge: 2, reputation: 3 } },
      partial:     { label: 'MINOR ISSUE',      text: 'Slow on the all-clear confirmation. Tied up the apparatus longer than needed.', stats: { knowledge: 1, morale: -1 } },
      failure:     { label: 'SETBACK',          text: 'You called all-clear before completing the sweep. Delgado sends you back. Tension in the cab on the way home.', stats: { reputation: -3, knowledge: -1, morale: -2 } },
    }
  },

  // ── NEW 15 ──
  {
    id: 'high_rise', difficulty: 'hard',
    name: 'High-Rise Fire', units: 'Engine 12, Truck 7, Squad 4, Battalion 6', badge: 'HIGH-RISE FIRE',
    addresses: ['900 N. Concourse Ave — 32nd Floor', '161 E. Ashfall Ave — 18th Floor', '505 N. Harborline Dr — 24th Floor'],
    details: [
      'High-rise residential, fire on the 32nd floor. Elevator banks locked out. Occupants self-evacuating via stairwells.',
      'Office tower, suspected electrical fire in server room on 18th floor. Halon suppression activated but fire spreading.',
      'Hotel high-rise, kitchen fire with extension to guest floors. Multiple 911 calls from upper floors.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'All companies — high-rise fire activation, 900 North Michigan. 32nd floor reported. Multiple callers. Elevators are out.' },
      { speaker: 'Kade', line: 'Battalion 6 is command. Delgado — take Truck 7 up the stairwell. Kessler, I need Squad 4 on standby at floor 30.' },
      { speaker: 'Delgado', line: 'Truck 7 copy. We\'re going up. This is a long climb, people — pace yourselves.' },
    ],
    primaryStats: ['physical', 'leadership'], statLabels: ['Physical', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You led the stair climb, coordinated floor searches, and had the fire knocked before the second alarm units arrived. Kade personally commends you at debrief. The crew is exhausted and elated.', stats: { physical: 7, leadership: 6, reputation: 6, morale: 5 } },
      success:     { label: 'SUCCESS',          text: 'Fire contained to the floor of origin. All occupants accounted for. Your legs feel like concrete, but the job got done.', stats: { physical: 5, leadership: 4, reputation: 4, morale: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You hit a wall on the 28th floor — physically spent. Ortega had to take your position. Fire was contained but it cost you visibility with Kade.', stats: { physical: 3, morale: -4, reputation: -3, leadership: -2 } },
      failure:     { label: 'SETBACK',          text: 'You gave the wrong clearance on a floor — search wasn\'t complete. Kade found out. You sit through the longest debrief of your career. Nobody is angry. That\'s somehow worse.', stats: { morale: -6, reputation: -5, leadership: -3 } },
    }
  },
  {
    id: 'water_rescue', difficulty: 'medium',
    name: 'Water Rescue', units: 'Squad 4, Marine 2', badge: 'WATER RESCUE',
    addresses: ['Fenwick Harbor — Lake Ashfall', 'Beacon Avenue Beach Pier', 'Union Harbor — South Basin'],
    details: [
      'Two kayakers capsized in Lake Ashfall. Water temperature 48°F. Moderate chop.',
      'Swimmer in distress 200 yards off Beacon Avenue Beach. Guard not on duty.',
      'Sailboat listing badly in Union Harbor — lone sailor unresponsive on deck.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Squad 4, Marine 2 — water rescue, Fenwick Harbor. Two kayakers in the water, lake conditions rough.' },
      { speaker: 'Kessler', line: 'Squad 4 responding. Get the dry suits out. Lake is cold.' },
      { speaker: 'Ortega', line: 'I see them on approach — southwest of the breakwater. Going in.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Both kayakers recovered conscious. Textbook execution. Ortega gives you the nod — that\'s the Squad 4 version of a standing ovation.', stats: { physical: 6, knowledge: 4, reputation: 5, morale: 4, leadership: 2 } },
      success:     { label: 'SUCCESS',          text: 'Both patients out of the water, vitals stable. Cold water survival protocol executed correctly.', stats: { physical: 4, knowledge: 3, reputation: 4, morale: 2 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'One patient got hypothermic before you reached them. They survived, but the window was closing. Kessler doesn\'t say anything on the way back.', stats: { physical: 3, morale: -3, knowledge: 1 } },
      failure:     { label: 'SETBACK',          text: 'You capsized your own rescue boat in the chop. Ortega had to redirect to pull you out instead. The kayakers were recovered by Marine 2. You will never live this down at The Firebell.', stats: { morale: -6, reputation: -5, physical: -2 } },
    }
  },
  {
    id: 'train_derailment', difficulty: 'hard',
    name: 'Train Derailment', units: 'Multiple Companies, Mass Casualty Response', badge: 'TRAIN DERAILMENT',
    addresses: ['Ashfall Transit Blue Line — Ashfall Intl Branch, Harlem Tunnel', 'Regional Rail NW Line — Elmgate', 'Ashfall Transit Brown Line — Thistle Bend'],
    details: [
      'Ashfall Transit Blue Line partial derailment in the Harlem Tunnel. Multiple cars off the rail. Reports of injured passengers.',
      'Regional Rail commuter train derailment — three cars overturned. Mass casualty event, 30+ injured estimated.',
      'Brown Line elevated train derailment at the Thistle Bend. Two cars dangling off the structure.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'All available companies — mass casualty event, ATA derailment, Harlem Tunnel. Requesting mutual aid. ICS activation.' },
      { speaker: 'Kade', line: 'Battalion 6 assuming command. Kessler, I need Squad 4 doing primary extrication. Delgado, set up triage on the westbound platform.' },
      { speaker: 'Delgado', line: 'Triage set. Sorensen, I need Ambo 9 as the treatment sector lead.' },
    ],
    primaryStats: ['knowledge', 'leadership'], statLabels: ['Knowledge', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You organized the triage sector with clinical precision. Twenty-three patients sorted and transported in under ninety minutes. The incident commander from mutual aid asks Kade who ran triage. It was you.', stats: { knowledge: 7, leadership: 7, command: 5, reputation: 6, morale: 4 } },
      success:     { label: 'SUCCESS',          text: 'All critical patients extracted and transported. The scene ran as well as a mass casualty can. Long night, but no preventable deaths.', stats: { knowledge: 5, leadership: 5, reputation: 4, command: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Communication broke down in the tunnel — you missed a radio channel change and your sector fell behind. Covered by mutual aid, but Kade noticed.', stats: { knowledge: 2, leadership: -2, morale: -3, reputation: -2 } },
      failure:     { label: 'SETBACK',          text: 'You froze at the scale of it. You\'ve never seen anything like this. A supervisor had to take over your sector. Nobody died because of it, but you carry the weight of that freeze for a long time.', stats: { morale: -7, leadership: -4, reputation: -4 } },
    }
  },
  {
    id: 'building_collapse', difficulty: 'hard',
    name: 'Building Collapse', units: 'Squad 4, USAR Team, Engine 12, Truck 7', badge: 'STRUCTURAL COLLAPSE',
    addresses: ['Saltmarsh — 18th St Construction Site', 'Millrace Parking Garage — Level 3', 'Ironside Factory — Roof Section'],
    details: [
      'Under-construction building partial collapse. Multiple workers reported trapped in the rubble.',
      'Parking garage structural failure — three cars and two workers trapped under collapsed concrete.',
      'Factory roof collapse during occupied shift. Workers trapped in debris field, four confirmed missing.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Squad 4, USAR, Engine 12 — structural collapse, Saltmarsh construction site. Reports of workers trapped. Instability ongoing.' },
      { speaker: 'Kessler', line: 'Squad 4 is the entry team. Nobody goes in without a structural assessment. Ortega, get me the site blueprints.' },
      { speaker: 'Ortega', line: 'On it. I hear a voice from the east side — south corner of the collapse. Someone\'s alive in there.' },
    ],
    primaryStats: ['physical', 'leadership'], statLabels: ['Physical', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Four workers recovered alive. You called the void space correctly when others were ready to pull back. Kessler doesn\'t do compliments, but he told Kade what you did.', stats: { physical: 7, leadership: 6, reputation: 6, morale: 5, command: 3 } },
      success:     { label: 'SUCCESS',          text: 'Three workers out. One critical but stable at Crestbridge Medical. The building held long enough for the rescue. Clean work.', stats: { physical: 5, leadership: 4, reputation: 4, morale: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Secondary collapse while you were inside. You got out, the worker got out, but Kessler ripped into you at the scene for ignoring the instability warning. He\'s not wrong.', stats: { physical: 4, morale: -4, leadership: -2, reputation: -2 } },
      failure:     { label: 'SETBACK',          text: 'You misread the debris field and your entry created a secondary slide. You had to retreat. The worker was eventually recovered by USAR — alive, but after an extra hour of being trapped. The weight of that hour never leaves you.', stats: { morale: -6, reputation: -5, physical: -2, leadership: -3 } },
    }
  },
  {
    id: 'electrical_fire', difficulty: 'medium',
    name: 'Electrical Fire', units: 'Engine 12, Truck 7', badge: 'ELECTRICAL FIRE',
    addresses: ['1420 N. Prairie Ave — Commercial', '3300 W. Alder Ave — Residential', 'Foundry District Data Center'],
    details: [
      'Commercial building, electrical panel room fire. Heavy acrid smoke. ComEd en route to cut power.',
      'Residential fire originating in the basement electrical system. Owner reports "the whole panel exploded."',
      'Data center server fire — active electrical hazard, suppression system failed.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7 — electrical fire, commercial building, Foundry District. ComEd has been notified.' },
      { speaker: 'Whitaker', line: 'Engine 12 arriving. I see smoke from the basement. Nobody goes in until we know the power status.' },
      { speaker: 'Delgado', line: 'Truck 7 on scene. Whitaker — confirm ComEd cutoff before we advance. I\'ll set up ventilation.' },
    ],
    primaryStats: ['knowledge', 'morale'], statLabels: ['Knowledge', 'Morale'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You correctly identified the live panel before anyone advanced and got ComEd to cut it in record time. Fire knocked, no injuries, equipment saved. Whitaker calls it "about as good as electrical gets."', stats: { knowledge: 6, morale: 4, reputation: 5, command: 2 } },
      success:     { label: 'SUCCESS',          text: 'Fire suppressed without injury. ComEd confirmed cutoff before suppression. By the book.', stats: { knowledge: 4, morale: 3, reputation: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You advanced before power was fully confirmed. Whitaker pulled you back. Flashover arc burned your arm through the turnout — minor injury, major lesson.', stats: { knowledge: 2, physical: -2, morale: -3 } },
      failure:     { label: 'SETBACK',          text: 'Applied water to an active panel. Arc flash. You\'re fine — the gear saved you — but Delgado had to pull you out and the fire spread to the next room. Nobody\'s laughing when you get back to the house.', stats: { morale: -5, reputation: -4, knowledge: -2 } },
    }
  },
  {
    id: 'gas_leak', difficulty: 'medium',
    name: 'Gas Leak', units: 'Engine 12, Squad 4, Peoples Gas', badge: 'GAS LEAK',
    addresses: ['2219 W. Beacon Ave — Restaurant Row', '5100 S. Vantage St — Residential Block', 'Millrace — Multi-unit High-rise'],
    details: [
      'Restaurant employee reports strong gas smell in the basement and on the first floor. Possible broken service line.',
      'Residential block gas leak — two residents reporting nausea. Smell extends to neighboring units.',
      'High-rise building, gas leak reported from multiple floors. Evacuation in progress.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Squad 4 — gas leak, restaurant row, 2219 West North. Peoples Gas en route. Evacuate the block.' },
      { speaker: 'Whitaker', line: 'Engine 12 on scene. I can smell it from the street. Evacuate everything within two hundred feet.' },
      { speaker: 'Kessler', line: 'Squad 4 copy. Ortega, get me a gas meter reading before we send anyone inside.' },
    ],
    primaryStats: ['knowledge', 'leadership'], statLabels: ['Knowledge', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You pinpointed the leak source and coordinated the evacuation before Peoples Gas arrived. They found a cracked service line exactly where you predicted. Kessler raises an eyebrow. "Good read," he says. High praise.', stats: { knowledge: 6, leadership: 5, reputation: 5, command: 2 } },
      success:     { label: 'SUCCESS',          text: 'Block evacuated safely. Peoples Gas located and isolated the leak. No ignition, no injuries. Clean execution.', stats: { knowledge: 4, leadership: 3, reputation: 4 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Evacuation was slower than it needed to be. A second-floor resident refused to leave and you spent ten minutes arguing. Ortega had to help. Scene was safe but your time management cost you.', stats: { knowledge: 2, leadership: -2, morale: -2 } },
      failure:     { label: 'SETBACK',          text: 'Sent someone in too early — Peoples Gas wasn\'t on scene, concentrations were still in the explosive range. Whitaker shut it down before anything ignited, but it was close. Close calls are how firefighters die.', stats: { morale: -6, reputation: -5, knowledge: -2, leadership: -2 } },
    }
  },
  {
    id: 'wildland', difficulty: 'medium',
    name: 'Wildland Interface Fire', units: 'Engine 12, Forestry Unit', badge: 'WILDLAND FIRE',
    addresses: ['Palos Hills Forest Preserve — South Trail', 'Des Plaines River Greenway', 'North Branch Prairie Restoration Site'],
    details: [
      'Forest preserve brush fire spreading toward a residential neighborhood. Wind shifting.',
      'Abandoned railroad right-of-way fire. Dry conditions, high spread risk to adjacent structures.',
      'Restoration prairie fire, driven by 20mph winds. Structures within 500 yards downwind.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Forestry Unit — wildland interface fire, Palos Hills Preserve. Wind out of the southwest at 18 mph. Structures threatened.' },
      { speaker: 'Whitaker', line: 'Engine 12 responding. This is not what we trained for. Everyone stay alert — wildland fire moves differently.' },
      { speaker: 'Delgado', line: 'Truck 7 en route for structure protection. Whitaker — establish a safety zone before you go direct attack.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You established a successful anchor point and flanked the fire before it reached the structures. Classic wildland tactics applied to an urban interface scenario. Forestry tells Kade they want you for their joint training program.', stats: { physical: 6, knowledge: 5, reputation: 5, leadership: 3 } },
      success:     { label: 'SUCCESS',          text: 'Structures protected. Fire contained to the preserve with strategic backfires. Smoky, exhausting, successful.', stats: { physical: 5, knowledge: 4, reputation: 4 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Wind shift caught you on the wrong side of the line. You had to pull back and reposition. Structures were protected by Forestry while you regrouped — humbling.', stats: { physical: 3, knowledge: 1, morale: -3 } },
      failure:     { label: 'SETBACK',          text: 'You went direct attack without establishing a safety zone. The fire crowned. You barely made it to the black in time. Forestry pulls you out and finishes the job. Delgado doesn\'t yell at the firehouse. He\'s very quiet instead.', stats: { morale: -6, physical: -2, reputation: -4, knowledge: -2 } },
    }
  },
  {
    id: 'swift_water', difficulty: 'hard',
    name: 'Swift Water Rescue', units: 'Squad 4, Marine 2, Ambulance 9', badge: 'SWIFT WATER RESCUE',
    addresses: ['Ashfall River — Heron Island Bend', 'North Shore Channel — Marsh Hollow Lagoons', 'South Branch — Cinder Creek'],
    details: [
      'Person swept into the Ashfall River during a storm surge. Current running at 8 knots. One bystander reports victim going under.',
      'Kayaker pinned against a flood control structure, North Shore Channel. Rising water levels.',
      'Vehicle drove off an embankment into the South Branch. Driver visible but not responding.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Squad 4, Marine 2, Ambo 9 — swift water rescue, Ashfall River at Heron Island. Subject in the water, current is running hard.' },
      { speaker: 'Kessler', line: 'Squad 4 is rolling. Ortega — throw ropes and dry suits. We\'re going in.' },
      { speaker: 'Ortega', line: 'I see the subject — downstream of the bridge, grabbing the support beam. We have maybe two minutes.' },
    ],
    primaryStats: ['physical', 'morale'], statLabels: ['Physical', 'Morale'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Throw rope on the first attempt, victim recovered in ninety seconds. You went in after Kessler gave the go and didn\'t hesitate. "That\'s what Squad does," Ortega says. You\'re starting to understand what that means.', stats: { physical: 7, morale: 6, reputation: 6, leadership: 3 } },
      success:     { label: 'SUCCESS',          text: 'Victim recovered. Hypothermic but alive. Good execution in a high-stress environment.', stats: { physical: 5, morale: 4, reputation: 4 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You got in the water and the current took you further downstream than planned. Ortega and Kessler recovered both you and the victim. You were rescue and rescuee for a few tense minutes.', stats: { physical: 4, morale: -4, reputation: -2 } },
      failure:     { label: 'SETBACK',          text: 'You froze at the water\'s edge. The current looked impossible. Kessler went in himself and recovered the victim. You stood on the bank. You\'ll spend a long time deciding what kind of firefighter you want to be.', stats: { morale: -7, reputation: -6, leadership: -3 } },
    }
  },
  {
    id: 'industrial_accident', difficulty: 'medium',
    name: 'Industrial Accident', units: 'Engine 12, Squad 4, Ambulance 9', badge: 'INDUSTRIAL ACCIDENT',
    addresses: ['Ironworks Railcar Works — Building D', 'Southeast Side Steel Plant', 'Back of the Yards Meatpacking Facility'],
    details: [
      'Industrial press malfunction — worker\'s arm entrapped. Hydraulic fluid everywhere. Patient in significant pain.',
      'Steel plant: worker fell into a cooling tank. Non-fatal but serious burns. Other workers attempting rescue.',
      'Meatpacking conveyor entrapment — worker cannot be safely extracted without mechanical disassembly.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Squad 4, Ambulance 9 — industrial entrapment, Ironworks Row. Patient entrapped in machinery, extremity injury.' },
      { speaker: 'Sorensen', line: 'Ambo 9 rolling. Advise patient is conscious and alert — I\'ll need IV access before any extrication attempt.' },
      { speaker: 'Whitaker', line: 'Engine 12 on scene. The machine is still under power. Cut the power — NOW.' },
    ],
    primaryStats: ['knowledge', 'leadership'], statLabels: ['Knowledge', 'Leadership'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You disassembled the machine section without causing further injury, Sorensen maintained IV access throughout, and the patient went to Crestbridge with the arm intact. The plant supervisor shakes your hand. Factory workers don\'t do that for anyone.', stats: { knowledge: 6, leadership: 5, morale: 4, reputation: 5 } },
      success:     { label: 'SUCCESS',          text: 'Patient extracted, vitals maintained. Long, careful job done right. Sorensen gives you a real smile — not the professional one.', stats: { knowledge: 4, leadership: 3, morale: 3, reputation: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Partial entrapment remained after initial extrication attempt — had to call in a second tool. The delay cost Sorensen\'s IV access. Patient went to Crestbridge, but it wasn\'t clean.', stats: { knowledge: 2, leadership: -1, morale: -2 } },
      failure:     { label: 'SETBACK',          text: 'You cut in the wrong sequence and the machine shifted. Patient screamed. Ortega stabilized the machine from the other side in time, but the incident report goes to the battalion. You spend a shift writing your explanation.', stats: { morale: -5, reputation: -4, leadership: -2 } },
    }
  },
  {
    id: 'explosion', difficulty: 'hard',
    name: 'Explosion', units: 'All Companies, ATF, AFD Bomb Squad', badge: 'EXPLOSION',
    addresses: ['Millrace — Mixed-Use Building', 'Copperline — Gas Main Rupture Site', '1901 S. Vantage — Commercial Kitchen'],
    details: [
      'Explosion reported in a mixed-use Millrace building. Origin unknown. Structure fire now burning on three floors, potential for secondary explosions.',
      'Gas main rupture ignition — building facade blown off. Rubble in the street. Multiple callers reporting injured pedestrians.',
      'Commercial kitchen explosion — fire in the restaurant, collapse of the rear wall. Cook trapped under debris.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'All companies — explosion, Millrace, 800 block of West Randolph. Structure fire, multiple injuries. Second explosion possible. Stage at a distance.' },
      { speaker: 'Kade', line: 'Battalion 6 is command. Nobody advances until I say so. Ortega, I need Squad 4 ready for rapid entry on my word.' },
      { speaker: 'Delgado', line: 'Kade — I have a confirmed victim in the window on the third floor. Requesting entry.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You read the building correctly and identified the safe entry point when Kade gave the word. Victim on the third floor recovered. Secondary explosion occurred after you were clear. Timing is everything.', stats: { physical: 7, knowledge: 6, morale: 5, reputation: 6, leadership: 3 } },
      success:     { label: 'SUCCESS',          text: 'Entry made, victim recovered, fire controlled before secondary ignition. Textbook high-risk entry protocol.', stats: { physical: 5, knowledge: 5, reputation: 5, morale: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'You went in before Kade gave clearance — your gut said go. The victim was recovered, but Kade pulls you aside afterward. "That was not your call." He\'s right, and you both know it.', stats: { physical: 4, morale: -4, reputation: -3, command: -2 } },
      failure:     { label: 'SETBACK',          text: 'Secondary explosion while companies were advancing. You were caught in the blast wave — turnout gear absorbed the worst of it. You\'re pulled from the scene. Sitting on a bumper watching your crew finish the job without you is a specific kind of misery.', stats: { morale: -7, physical: -3, reputation: -4 } },
    }
  },
  {
    id: 'multi_vehicle', difficulty: 'medium',
    name: 'Multi-Vehicle Pile-up', units: 'Multiple Engine Companies, Truck 7, Ambulance 9', badge: 'MASS CASUALTY MVA',
    addresses: ['Route 26 Dan Ryan — Mile Marker 57', 'I-290 Eisenhower — Near Larkspur Ave', 'Route 8 Kennedy — Spaghetti Bowl Interchange'],
    details: [
      'Eight-vehicle pile-up on the Dan Ryan in fog. Multiple vehicles, multiple patients. Lane closures. 45 mph reduced speed.',
      'Ice-related chain collision on the Eisenhower. Tractor-trailer jackknifed blocking three lanes. 6+ vehicles involved.',
      'Rush-hour crash cascade on the Kennedy — twelve vehicles, initial reports of 20+ patients.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'All companies — mass casualty MVA, Route 26 southbound, mile marker 57. 8-plus vehicles, 20-plus patients. SSP requesting AFD support.' },
      { speaker: 'Sorensen', line: 'Ambo 9 needs a triage officer. Somebody coordinate patient priority — I can\'t be everywhere.' },
      { speaker: 'Delgado', line: 'I\'ve got triage. Sorensen — you take the criticals. Whitaker — you\'re transport coordination.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'You triaged twenty-two patients in eleven minutes. Four criticals to Crestbridge, the rest cleared. Sorensen called you "the best triage partner I\'ve ever had" and she does not give compliments.', stats: { physical: 5, knowledge: 6, morale: 5, reputation: 5, command: 3 } },
      success:     { label: 'SUCCESS',          text: 'All patients sorted and transported. Scene cleared in ninety minutes. Long, loud, cold, and successful.', stats: { physical: 4, knowledge: 4, reputation: 4, morale: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'A patient you marked as minor deteriorated in the transport queue. Sorensen caught it and upgraded them just in time. It was right call, wrong timing. You review your triage assessment twice a day for the next week.', stats: { knowledge: 2, morale: -3, reputation: -2 } },
      failure:     { label: 'SETBACK',          text: 'Scene management collapsed — your sector had no coordination. SSP redirected traffic without notifying you and secondary vehicles almost drove through an active triage zone. Kade restructured command mid-incident. Professional humiliation.', stats: { morale: -6, reputation: -5, leadership: -3, command: -2 } },
    }
  },
  {
    id: 'cardiac_arrest', difficulty: 'medium',
    name: 'Cardiac Arrest — Mass Casualty', units: 'Ambulance 9, Engine 12, Ambulance 21', badge: 'MASS CASUALTY EMS',
    addresses: ['Founders Park — Outdoor Concert', 'Coliseum Field Tailgate Zone', 'Anchor Pier Festival Grounds'],
    details: [
      'Outdoor concert, Founders Park. Two simultaneous cardiac arrest patients — crowd of 4,000. AED locations unknown.',
      'Tailgate zone, Coliseum Field. One cardiac arrest in the parking lot, second possible arrest reported two minutes later.',
      'Festival crowd, Anchor Pier. Elderly male down, no pulse. Bystanders performing CPR.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Ambulance 9, Engine 12 — multiple cardiac arrests, Founders Park. Two confirmed patients, CPR in progress by bystanders.' },
      { speaker: 'Sorensen', line: 'Ambo 9 en route. Two arrests means I need someone running the second patient. Who\'s got their ACLS?' },
      { speaker: 'Whitaker', line: 'Engine 12 copy. I\'ll run patient two. Sorensen, coordinate over radio.' },
    ],
    primaryStats: ['knowledge', 'morale'], statLabels: ['Knowledge', 'Morale'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Both patients converted — one in the field, one en route. You ran an impeccable ALS protocol on patient two while Sorensen managed patient one. The attending at Crestbridge Medical shakes your hand. Sorensen doesn\'t say a word, just squeezes your arm.', stats: { knowledge: 7, morale: 6, reputation: 6 } },
      success:     { label: 'SUCCESS',          text: 'Both patients survived to hospital. Excellent team performance under crowd pressure.', stats: { knowledge: 5, morale: 4, reputation: 4 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'One patient converted. One patient was lost en route. Medical science has limits and you hit them today. Sorensen explains the difference between a bad outcome and a preventable one. You hold onto that.', stats: { knowledge: 3, morale: -4, reputation: -1 } },
      failure:     { label: 'SETBACK',          text: 'You froze when the crowd surged toward the patient — couldn\'t establish a clear work space. By the time you got in, perfusion time had elapsed. The outcome was predetermined by thirty seconds of hesitation. Sorensen is professional about it. That makes it worse.', stats: { morale: -6, reputation: -4, knowledge: -1 } },
    }
  },
  {
    id: 'trench_rescue', difficulty: 'hard',
    name: 'Trench Rescue', units: 'Squad 4, USAR, Engine 12', badge: 'TRENCH RESCUE',
    addresses: ['Saltmarsh — 21st St Utility Project', 'Near West Side — Sewer Rehab Site', 'Lincoln Square — Watermain Replacement'],
    details: [
      'Trench collapse on a utility project — one worker buried to the chest, second worker partially buried and conscious.',
      'Sewer rehab excavation collapse. One worker unaccounted for, last seen in the trench.',
      'Watermain replacement site — trench wall failure. One confirmed buried, soil continuing to shift.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Squad 4, USAR, Engine 12 — trench rescue, Saltmarsh, 21st Street. Workers trapped following collapse. Unstable conditions.' },
      { speaker: 'Kessler', line: 'Nobody approaches the edge without a trained trench rescuer. Ortega — panels and shores out now.' },
      { speaker: 'Ortega', line: 'On it. Patient one is conscious — I can see his head. Patient two I can\'t confirm yet.' },
    ],
    primaryStats: ['physical', 'knowledge'], statLabels: ['Physical', 'Knowledge'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Both workers out alive. You shored the trench walls with textbook technique under immense time pressure. Kessler tells Kade it was the best technical rescue he\'s seen from someone at your level. You don\'t find out he said this until the shift after.', stats: { physical: 7, knowledge: 6, leadership: 4, reputation: 6, morale: 5 } },
      success:     { label: 'SUCCESS',          text: 'Both workers recovered. Careful, methodical work. No secondary collapse. That\'s the definition of success in trench rescue.', stats: { physical: 5, knowledge: 5, reputation: 4, morale: 3 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'Minor secondary collapse during patient packaging. Nobody buried, but the soil shifted and you lost your shoring panel. USAR took over while you reset. Workers recovered. Nobody adds it to the report, but you know.', stats: { physical: 4, knowledge: 2, morale: -3 } },
      failure:     { label: 'SETBACK',          text: 'You approached the trench edge without shoring in place — protocol violation. The vibration caused a secondary collapse. Kessler exploded at you in front of the entire scene. He\'s not wrong. USAR recovered both workers. You stood behind the tape and watched.', stats: { morale: -7, reputation: -6, leadership: -4, knowledge: -2 } },
    }
  },
  {
    id: 'elevator_rescue', difficulty: 'easy',
    name: 'Elevator Rescue', units: 'Engine 12, Truck 7', badge: 'ELEVATOR RESCUE',
    addresses: ['30 W. Federal St — High-Rise', '1000 N. Harborline Dr — Residential Tower', '333 W. Riverside Dr — Office Building'],
    details: [
      'Elevator stalled between floors 22 and 23. Six occupants, one reports chest pain.',
      'Residential tower elevator failure — two occupants, one elderly woman, trapped for 45 minutes.',
      'Office building elevator — stuck between lobby and parking level. Three occupants, no injuries.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7 — elevator rescue, 30 West Monroe. Six occupants between floors 22 and 23. One medical complaint.' },
      { speaker: 'Whitaker', line: 'Engine 12 on scene. I\'m getting building management to pull the override keys. Delgado, can Truck 7 access from the floor above?' },
      { speaker: 'Delgado', line: 'Truck 7 at floor 23, accessing the shaft now. Whitaker — advise occupants to stay away from the doors.' },
    ],
    primaryStats: ['knowledge', 'physical'], statLabels: ['Knowledge', 'Physical'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Occupants out in eleven minutes. The patient with chest pain got immediate assessment from Sorensen who happened to be in the building. Whitaker declares it "the smoothest elevator call in AFD history." He exaggerates, but not by much.', stats: { knowledge: 4, morale: 5, reputation: 4 } },
      success:     { label: 'SUCCESS',          text: 'All occupants evacuated safely. Medical assessment completed. Elevator company notified. Smooth operation.', stats: { knowledge: 3, morale: 3, reputation: 3 } },
      partial:     { label: 'MINOR ISSUE',      text: 'Took longer than expected — building management lost the override key and you had to go manual. Occupants were anxious. Everyone out eventually, just not elegantly.', stats: { knowledge: 2, morale: -1 } },
      failure:     { label: 'SETBACK',          text: 'You misidentified the shaft access point. While you were on the wrong floor, the patient with chest pain went into genuine distress. Sorensen had to be called and entered through the escape hatch. Everyone survived, but your delay was in the report.', stats: { reputation: -3, morale: -3 } },
    }
  },
  {
    id: 'house_fire_children', difficulty: 'hard',
    name: 'House Fire — Children Trapped', units: 'Engine 12, Truck 7, Ambulance 9', badge: 'HOUSE FIRE — CHILDREN TRAPPED',
    addresses: ['1621 N. Hawthorne Ave', '4418 W. Ashfall Ave', '2909 S. Whitlock Ave — Saltmarsh'],
    details: [
      'Two-story residential, fire on the first floor. Caller reports two children trapped on the second floor, unable to reach the stairs.',
      'Single-family home, fully involved ground floor. Neighbor reports seeing a child at a second-floor window.',
      'Three-flat, fire in unit one. Mother outside reports her two kids — ages 4 and 7 — are in the back bedroom on the second floor.',
    ],
    dialogue: [
      { speaker: 'Dispatch', line: 'Engine 12, Truck 7, Ambo 9 — house fire with children reported trapped, 1621 North Hawthorne. Mother is outside, two children unaccounted for.' },
      { speaker: 'Delgado', line: 'Truck 7 on scene. I see smoke on the second floor — no flames visible yet. We can still get to them. Ladder to the window NOW.' },
      { speaker: 'Whitaker', line: 'Engine 12 making the line. Delgado — you have maybe ninety seconds before that stairwell goes.' },
    ],
    primaryStats: ['physical', 'morale'], statLabels: ['Physical', 'Morale'],
    outcomes: {
      critSuccess: { label: 'CRITICAL SUCCESS', text: 'Both children out through the window before the stairwell flashover. You went up that ladder without hesitation. Delgado met you at the top. The mother\'s face when she got her kids back — that\'s the whole reason. That\'s all of it.', stats: { physical: 8, morale: 8, reputation: 7, leadership: 3 } },
      success:     { label: 'SUCCESS',          text: 'Both children recovered. Smoke inhalation, but they\'ll be okay. Sorensen has them on O2 in the ambo before you\'re back on the ground.', stats: { physical: 6, morale: 6, reputation: 5 } },
      partial:     { label: 'COMPLICATED SAVE', text: 'One child out the window. The second had retreated deeper into the room — you found them in the closet. Floor gave way beneath you during egress. You made it out. The child made it out. Nothing else matters, but it cost you physically.', stats: { physical: 5, morale: -3, reputation: 1 } },
      failure:     { label: 'SETBACK',          text: 'The window approach failed — ladder malpositioning. Delgado went through the front door and got both children out through the smoke. They survived. He doesn\'t say anything. He doesn\'t need to. You made a mistake that, this time, didn\'t cost what it could have.', stats: { morale: -7, reputation: -5, physical: -2 } },
    }
  },
];

// ===== CREW EVENTS =====
const CREW_EVENTS = {
  whitfield: [
    {
      id: 'whitfield_hallway', title: 'The Chief\'s Hallway',
      portrait: 'WB', border: '#f59e0b',
      desc: 'Kade steps into the hallway just as you\'re heading to the apparatus bay. He doesn\'t move. He just studies you the way he studies every firefighter at least once — like he\'s reading something underneath the surface.',
      dialogue: '"I\'ve been watching you. Not to catch you making mistakes. To see if you know when you\'re making them."',
      choices: [
        { text: '"I know when I make them, Chief. I just need more time to fix them."', effect: { leadership: 3, morale: 2 }, bondDelta: 8, effectLabel: '+3 Leadership, +2 Morale' },
        { text: '"I\'m still learning, Chief. Every shift teaches me something."', effect: { morale: 3 }, bondDelta: 5, effectLabel: '+3 Morale' },
      ]
    },
    {
      id: 'whitfield_office', title: 'Kade\'s Open Door',
      portrait: 'WB', border: '#f59e0b',
      desc: 'Kade calls you into his office. The door stays open — a good sign. He leans back, studying you with the same unhurried calm he brings to everything.',
      dialogue: '"You know why the good ones make it and the great ones don\'t? The good ones know when to ask for help. Ego is the first casualty of this job. Make sure it\'s not yours."',
      choices: [
        { text: '"I\'ll remember that, Chief."', effect: { command: 3 }, bondDelta: 6, effectLabel: '+3 Command' },
        { text: '"I don\'t plan on letting ego get in my way."', effect: { leadership: 2, reputation: 2 }, bondDelta: 8, effectLabel: '+2 Leadership, +2 Reputation' },
      ]
    },
    {
      id: 'whitfield_family', title: 'The Weight of Legacy',
      portrait: 'WB', border: '#f59e0b',
      desc: 'Kade mentions that his son has been asking about the department. He seems quietly proud, and somewhere underneath that, quietly worried.',
      dialogue: '"The best thing my father ever did was let me make my own choice. And the hardest thing I\'ll ever do is let my son make his."',
      choices: [
        { text: '"The job chooses people as much as people choose it, Chief."', effect: { morale: 4 }, bondDelta: 10, effectLabel: '+4 Morale' },
        { text: '"Your family\'s lucky to have someone like you as a model."', effect: { morale: 2, reputation: 2 }, bondDelta: 8, effectLabel: '+2 Morale, +2 Reputation' },
      ]
    },
    {
      id: 'whitfield_discipline', title: 'The Standard',
      portrait: 'WB', border: '#f59e0b',
      desc: 'Kade calls the whole house together. Someone broke protocol on the last call — not you, but the weight of accountability falls on the whole crew.',
      dialogue: '"We don\'t get to have a bad day. When we clock in, we\'re the standard. When we go home, we\'re still the standard. That never changes."',
      choices: [
        { text: 'Volunteer to run remedial drills with anyone who needs it.', effect: { leadership: 5, reputation: 3, morale: -2 }, bondDelta: 12, effectLabel: '+5 Leadership, +3 Rep, -2 Morale' },
        { text: 'Stay quiet. Let Kade handle it — it\'s his house.', effect: { morale: -1 }, bondDelta: 3, effectLabel: '-1 Morale' },
      ]
    },
    {
      id: 'whitfield_legacy', title: 'Passing It On',
      portrait: 'WB', border: '#f59e0b',
      desc: 'Kade finds you in the watch office going through old incident reports after hours. He sits down across from you, something rare and easy in his posture.',
      dialogue: '"Every great firefighter in this house was shaped by someone before them. You\'re being shaped right now. Don\'t waste it."',
      choices: [
        { text: '"I want to be that person for someone someday."', effect: { leadership: 4, command: 3 }, bondDelta: 14, effectLabel: '+4 Leadership, +3 Command' },
        { text: '"I won\'t, Chief. This place means everything to me."', effect: { morale: 5, reputation: 2 }, bondDelta: 12, effectLabel: '+5 Morale, +2 Reputation' },
      ]
    },
  ],

  kessler: [
    {
      id: 'sev_respect', title: 'Kessler\'s Test',
      portrait: 'KS', border: '#ef4444',
      desc: 'After a drill, Kessler lingers in the apparatus bay. He tosses you a piece of equipment — the SCBA you just used — without warning.',
      dialogue: '"Take it apart and put it back together. Right now. I\'ll time you."',
      choices: [
        { text: 'Do it. Fast and clean. Don\'t look up.', effect: { physical: 3, knowledge: 4 }, bondDelta: 12, effectLabel: '+3 Physical, +4 Knowledge' },
        { text: 'Ask him to show you his technique first.', effect: { knowledge: 5, morale: 2 }, bondDelta: 8, effectLabel: '+5 Knowledge, +2 Morale' },
      ]
    },
    {
      id: 'sev_squad', title: 'What Squad Means',
      portrait: 'KS', border: '#ef4444',
      desc: 'Kessler finds you watching Squad 4\'s tool inventory process. He doesn\'t tell you to leave. That means he doesn\'t mind.',
      dialogue: '"Squad isn\'t about being better. It\'s about being ready for the call nobody else is trained for. The one where someone lives or dies based on whether you know what you\'re doing."',
      choices: [
        { text: '"I want to earn a spot on Squad someday."', effect: { leadership: 3, morale: 3 }, bondDelta: 10, effectLabel: '+3 Leadership, +3 Morale' },
        { text: '"That\'s what makes you all different. I see it."', effect: { reputation: 2, morale: 3 }, bondDelta: 8, effectLabel: '+2 Reputation, +3 Morale' },
      ]
    },
    {
      id: 'sev_tension', title: 'After the Call',
      portrait: 'KS', border: '#ef4444',
      desc: 'You made a judgment call on scene that wasn\'t protocol. It worked. Kessler caught it and followed you without saying a word on the radio. Back at quarters, he stops you.',
      dialogue: '"I don\'t know if that was instinct or luck. You need to know which one it was."',
      choices: [
        { text: '"Instinct. I read the building right."', effect: { leadership: 4, reputation: 2 }, bondDelta: 10, effectLabel: '+4 Leadership, +2 Rep' },
        { text: '"Honestly? A bit of both. I need to study more."', effect: { knowledge: 4, morale: 2 }, bondDelta: 12, effectLabel: '+4 Knowledge, +2 Morale' },
      ]
    },
    {
      id: 'sev_quiet', title: 'Kessler in the Bay',
      portrait: 'KS', border: '#ef4444',
      desc: 'It\'s 2am and Kessler is in the apparatus bay alone, not sleeping. You can tell something\'s in his head — some call, some memory. He doesn\'t acknowledge you, but he doesn\'t leave either.',
      dialogue: '"You stay in this job long enough, you start carrying the ones you couldn\'t save. That\'s not weakness. That\'s what this job costs."',
      choices: [
        { text: 'Sit with him. Don\'t say anything.', effect: { morale: 4, leadership: 2 }, bondDelta: 14, effectLabel: '+4 Morale, +2 Leadership' },
        { text: '"I hear you, Lieutenant. It\'s worth it."', effect: { morale: 5 }, bondDelta: 10, effectLabel: '+5 Morale' },
      ]
    },
    {
      id: 'sev_tactical', title: 'Tactical Debate',
      portrait: 'KS', border: '#ef4444',
      desc: 'During debrief, you push back on Kessler\'s read of the entry approach — respectfully, but directly. The room goes quiet.',
      dialogue: 'Kessler sets down his coffee. "Explain your reasoning. Exactly."',
      choices: [
        { text: 'Walk him through your logic precisely, citing the SOG.', effect: { knowledge: 5, leadership: 3, reputation: 3 }, bondDelta: 12, effectLabel: '+5 Knowledge, +3 Leadership, +3 Rep' },
        { text: 'Back down. "You\'re right. I may have missed something."', effect: { morale: -2, knowledge: 2 }, bondDelta: 5, effectLabel: '-2 Morale, +2 Knowledge' },
      ]
    },
  ],

  reeves: [
    {
      id: 'reeves_mentor', title: 'Delgado\'s Corner',
      portrait: 'MC', border: '#f59e0b',
      desc: 'Delgado finds you alone in the watch office after your shift looking like someone who\'s processing a hard call. He sits down uninvited and doesn\'t offer easy words.',
      dialogue: '"The bad ones don\'t go away. But they don\'t have to. You learn to carry them instead of being carried by them."',
      choices: [
        { text: '"How long did it take you to learn that?"', effect: { morale: 4, leadership: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Leadership' },
        { text: '"Thanks, Cap. I needed to hear that."', effect: { morale: 5 }, bondDelta: 10, effectLabel: '+5 Morale' },
      ]
    },
    {
      id: 'reeves_standard', title: 'The Truck 7 Standard',
      portrait: 'MC', border: '#f59e0b',
      desc: 'Delgado is running a post-call critique. He\'s specific and fair — highlights a mistake you made without making it personal. Afterward, he stays to talk.',
      dialogue: '"On my truck, we don\'t repeat mistakes. We learn from them once and that\'s it. I don\'t say that to put pressure on you. I say it because I believe you can hold that standard."',
      choices: [
        { text: '"I won\'t repeat it, Cap. You have my word."', effect: { reputation: 4, leadership: 3 }, bondDelta: 12, effectLabel: '+4 Reputation, +3 Leadership' },
        { text: '"What would you have done differently?"', effect: { knowledge: 5, command: 2 }, bondDelta: 10, effectLabel: '+5 Knowledge, +2 Command' },
      ]
    },
    {
      id: 'reeves_moral', title: 'The Hard Question',
      portrait: 'MC', border: '#f59e0b',
      desc: 'A call left you both with a question neither of you can answer: you did everything right, and the outcome was still bad. Delgado is quiet over dinner.',
      dialogue: '"Some calls, the job just beats you. I don\'t have a philosophy that makes that okay. I just keep showing up."',
      choices: [
        { text: '"That\'s enough for me. Showing up."', effect: { morale: 5, reputation: 2 }, bondDelta: 13, effectLabel: '+5 Morale, +2 Reputation' },
        { text: '"I keep thinking there was something I missed."', effect: { knowledge: 3, morale: 2 }, bondDelta: 10, effectLabel: '+3 Knowledge, +2 Morale' },
      ]
    },
    {
      id: 'reeves_leadership', title: 'Lead From the Front',
      portrait: 'MC', border: '#f59e0b',
      desc: 'Delgado asks you to run a drill — not assist him, run it yourself. The whole crew watches.',
      dialogue: '"Your call, your show. I\'m just a firefighter today."',
      choices: [
        { text: 'Run the drill decisively. Bark orders. Own it.', effect: { leadership: 6, command: 4, morale: -1 }, bondDelta: 14, effectLabel: '+6 Leadership, +4 Command, -1 Morale' },
        { text: 'Lead collaboratively — ask for input from the crew.', effect: { leadership: 4, morale: 3, reputation: 3 }, bondDelta: 11, effectLabel: '+4 Leadership, +3 Morale, +3 Rep' },
      ]
    },
    {
      id: 'reeves_friendship', title: 'Cap and the New Guy',
      portrait: 'MC', border: '#f59e0b',
      desc: 'Delgado invites you to shoot hoops in the parking lot behind the house during downtime. It\'s not a big gesture. In AFD culture, it\'s a huge one.',
      dialogue: '"You don\'t have to be a legend to matter on this job. You just have to be someone people can trust. You\'re getting there."',
      choices: [
        { text: '"That means a lot coming from you, Cap."', effect: { morale: 6, reputation: 3 }, bondDelta: 15, effectLabel: '+6 Morale, +3 Reputation' },
        { text: 'Just play. Let the words land without a response.', effect: { morale: 5 }, bondDelta: 12, effectLabel: '+5 Morale' },
      ]
    },
  ],

  whitaker: [
    {
      id: 'herm_banter', title: 'Kitchen Philosophy',
      portrait: 'CH', border: '#ef4444',
      desc: 'Whitaker is cooking and explaining — simultaneously — why firefighters who can\'t cook are fundamentally untrustworthy. He points a spatula at you.',
      dialogue: '"At 12, the kitchen is as important as the apparatus bay. You want respect in this house? Learn to cook. I\'m serious."',
      choices: [
        { text: 'Ask him to teach you his signature dish.', effect: { morale: 5, reputation: 3 }, bondDelta: 12, effectLabel: '+5 Morale, +3 Reputation' },
        { text: '"I\'ll take the challenge. Next shift, I cook."', effect: { morale: 3, leadership: 2, reputation: 3 }, bondDelta: 10, effectLabel: '+3 Morale, +2 Leadership, +3 Rep' },
      ]
    },
    {
      id: 'herm_engine', title: 'Engine Pride',
      portrait: 'CH', border: '#ef4444',
      desc: 'Whitaker catches you watching Squad 4\'s drills with that look. He wheels over on a bunk chair.',
      dialogue: '"I know what you\'re thinking. Squad\'s the sexy assignment. But I\'ll tell you this — the fire doesn\'t get knocked without the Engine company. We put the wet stuff on the red stuff. That\'s not glamorous. That\'s the job."',
      choices: [
        { text: '"The Engine is the backbone. I get it."', effect: { knowledge: 3, reputation: 3, morale: 2 }, bondDelta: 10, effectLabel: '+3 Knowledge, +3 Rep, +2 Morale' },
        { text: '"I don\'t want glamorous. I want effective."', effect: { leadership: 3, reputation: 3 }, bondDelta: 12, effectLabel: '+3 Leadership, +3 Reputation' },
      ]
    },
    {
      id: 'herm_family', title: 'Whitaker\'s Family',
      portrait: 'CH', border: '#ef4444',
      desc: 'Whitaker\'s wife Donna calls during downtime. You hear him talk about his kids — all of them by name, their grades, their soccer games. When he hangs up, he looks ten years younger.',
      dialogue: '"You want to know the secret to this job? Somebody waiting for you at home. Makes you careful out there."',
      choices: [
        { text: '"That\'s a good perspective. I\'ll try to remember it."', effect: { morale: 4 }, bondDelta: 8, effectLabel: '+4 Morale' },
        { text: '"Your kids must be proud of what you do."', effect: { morale: 5, reputation: 2 }, bondDelta: 12, effectLabel: '+5 Morale, +2 Reputation' },
      ]
    },
    {
      id: 'herm_loyalty', title: 'The Test of Loyalty',
      portrait: 'CH', border: '#ef4444',
      desc: 'Another firefighter from a different house says something dismissive about 12. Whitaker looks at you, waiting to see what you do.',
      dialogue: '(Whitaker, to the other firefighter): "You want to finish that sentence, or you want to keep your teeth?"',
      choices: [
        { text: 'Stand next to Whitaker. Say nothing. Let your presence speak.', effect: { reputation: 4, leadership: 2 }, bondDelta: 14, effectLabel: '+4 Reputation, +2 Leadership' },
        { text: 'Defuse it with a joke. Keep it civil.', effect: { morale: 3, reputation: 2 }, bondDelta: 9, effectLabel: '+3 Morale, +2 Reputation' },
      ]
    },
    {
      id: 'herm_wisdom', title: 'Bar-Counter Wisdom',
      portrait: 'CH', border: '#ef4444',
      desc: 'Whitaker pulls you aside after a difficult call. No preamble. He just starts talking.',
      dialogue: '"You know what makes somebody a firefighter? Not the test. Not the training. The day they stop thinking about themselves on scene. That\'s the day it changes. You got there today."',
      choices: [
        { text: '"I didn\'t even realize it. It just happened."', effect: { morale: 5, leadership: 3 }, bondDelta: 14, effectLabel: '+5 Morale, +3 Leadership' },
        { text: '"That\'s the highest thing anyone\'s ever said to me about this job."', effect: { morale: 6, reputation: 2 }, bondDelta: 15, effectLabel: '+6 Morale, +2 Rep' },
      ]
    },
  ],

  ortega: [
    {
      id: 'ortega_story', title: 'Ortega\'s Neighborhood',
      portrait: 'JC', border: '#ef4444',
      desc: 'Ortega tells you about the block he grew up on — same neighborhood as some of the houses you\'ve responded to. He doesn\'t romanticize it.',
      dialogue: '"I grew up three blocks from a house we went into last month. Different family, same building. I think about that. I think about why I do this job. Doesn\'t hurt to know why."',
      choices: [
        { text: '"Why do you? Still?"', effect: { morale: 4, knowledge: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Knowledge' },
        { text: '"That connection to the community. That\'s real."', effect: { morale: 5 }, bondDelta: 11, effectLabel: '+5 Morale' },
      ]
    },
    {
      id: 'ortega_humor', title: 'The Ortega Challenge',
      portrait: 'JC', border: '#ef4444',
      desc: 'Ortega challenges you to a pull-up competition in the gym. The entire crew slowly filters in to watch.',
      dialogue: '"Loser cleans the rig. Winner picks the playlist for the next three shifts."',
      choices: [
        { text: 'Go all out. Max effort, beat him if you can.', effect: { physical: 4, morale: 3 }, bondDelta: 10, effectLabel: '+4 Physical, +3 Morale' },
        { text: 'Lose on purpose. Let him have the win.', effect: { morale: 4, reputation: 2 }, bondDelta: 8, effectLabel: '+4 Morale, +2 Rep (and a clean rig)' },
      ]
    },
    {
      id: 'ortega_training', title: 'Ortega\'s Shortcut',
      portrait: 'JC', border: '#ef4444',
      desc: 'Ortega shows you a technique for rigging a rescue harness that isn\'t in the SOG but works twice as fast under pressure.',
      dialogue: '"Kessler taught me this. It\'s not in the book because it requires judgment, and judgment takes time to develop. You\'re ready."',
      choices: [
        { text: 'Learn it. Drill it until it\'s second nature.', effect: { knowledge: 5, physical: 2 }, bondDelta: 13, effectLabel: '+5 Knowledge, +2 Physical' },
        { text: '"I need to practice the book version more first. Then I\'ll come back to this."', effect: { knowledge: 3 }, bondDelta: 7, effectLabel: '+3 Knowledge' },
      ]
    },
    {
      id: 'ortega_brotherhood', title: 'Ortega Has Your Back',
      portrait: 'JC', border: '#ef4444',
      desc: 'After a complicated call where you made a small but visible error, Ortega takes the blame at debrief — says it was a communication issue on his end. It wasn\'t.',
      dialogue: 'Later, in the bay: "We cover each other in here. That\'s what this is. You\'d do the same for me."',
      choices: [
        { text: '"I would. And thank you. That meant something."', effect: { morale: 5, leadership: 2 }, bondDelta: 16, effectLabel: '+5 Morale, +2 Leadership' },
        { text: '"I\'m going to make it right on the next call. I promise."', effect: { morale: 4, reputation: 2 }, bondDelta: 13, effectLabel: '+4 Morale, +2 Rep' },
      ]
    },
    {
      id: 'ortega_growth', title: 'Ortega Sees It',
      portrait: 'JC', border: '#ef4444',
      desc: 'Ortega catches you in the corridor and leans against the wall with a half-smile.',
      dialogue: '"You know what I noticed? You stopped asking for permission on calls. You just act. That\'s the shift. That\'s when you became a firefighter and stopped being someone learning to be one."',
      choices: [
        { text: '"Squad 4 had a lot to do with that."', effect: { morale: 5, leadership: 2 }, bondDelta: 14, effectLabel: '+5 Morale, +2 Leadership' },
        { text: '"I didn\'t notice until you said it. But you\'re right."', effect: { morale: 4, command: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Command' },
      ]
    },
  ],

  sorensen: [
    {
      id: 'sorensen_medical', title: 'Sorensen\'s Debrief',
      portrait: 'SB', border: '#3b82f6',
      desc: 'After a tough medical call, Sorensen finds you replaying it in the ambulance bay. She climbs up on the rig bumper next to you.',
      dialogue: '"You\'re going through the tape. Good. But there\'s a point where you\'ve learned what you can and the rest is just punishing yourself."',
      choices: [
        { text: '"How do you know where that line is?"', effect: { knowledge: 3, morale: 3 }, bondDelta: 12, effectLabel: '+3 Knowledge, +3 Morale' },
        { text: '"I think I\'m on the right side of it. But thank you for checking."', effect: { morale: 5 }, bondDelta: 10, effectLabel: '+5 Morale' },
      ]
    },
    {
      id: 'sorensen_compassion', title: 'The Hard Calls',
      portrait: 'SB', border: '#3b82f6',
      desc: 'Sorensen shows up to a pediatric call you\'ve been struggling with from last shift. She walks you through what she saw, clinically and then personally.',
      dialogue: '"I cried in the ambo on the way back. I don\'t broadcast that. But I also don\'t pretend it didn\'t happen. That\'s how you stay human doing this job."',
      choices: [
        { text: '"I needed to hear that. I thought I was the only one."', effect: { morale: 6 }, bondDelta: 14, effectLabel: '+6 Morale' },
        { text: '"How do you keep doing it?"', effect: { morale: 4, leadership: 2 }, bondDelta: 12, effectLabel: '+4 Morale, +2 Leadership' },
      ]
    },
    {
      id: 'sorensen_respect', title: 'ALS or Nothing',
      portrait: 'SB', border: '#3b82f6',
      desc: 'Sorensen asks your opinion on a medical protocol decision in the field. She\'s testing whether you\'ll just defer or actually engage.',
      dialogue: '"Don\'t tell me what you think I want to hear. Tell me what you actually assessed."',
      choices: [
        { text: 'Give your honest read, even if it contradicts what she did.', effect: { knowledge: 5, reputation: 3 }, bondDelta: 14, effectLabel: '+5 Knowledge, +3 Reputation' },
        { text: 'Back her call. "Your read was right — I was second-guessing myself."', effect: { morale: 2, knowledge: 2 }, bondDelta: 7, effectLabel: '+2 Morale, +2 Knowledge' },
      ]
    },
    {
      id: 'sorensen_ashfall', title: 'Why Ashfall',
      portrait: 'SB', border: '#3b82f6',
      desc: 'Sorensen mentions she didn\'t have to come to Ashfall — she had options. You ask her why she did.',
      dialogue: '"Because the people in this city are real. And because when things are bad, they look at us like we\'re the last line. I don\'t ever want to stop feeling the weight of that."',
      choices: [
        { text: '"That\'s exactly why I\'m here too."', effect: { morale: 5, reputation: 2 }, bondDelta: 12, effectLabel: '+5 Morale, +2 Reputation' },
        { text: '"That\'s the most honest thing I\'ve heard about this job."', effect: { morale: 4, knowledge: 2 }, bondDelta: 11, effectLabel: '+4 Morale, +2 Knowledge' },
      ]
    },
    {
      id: 'sorensen_growth', title: 'Sorensen\'s Assessment',
      portrait: 'SB', border: '#3b82f6',
      desc: 'Sorensen stops you after a MCI call where you handled patient packaging with unusual competence.',
      dialogue: '"I\'ve worked with a lot of fire side personnel who treat EMS as a secondary function. You don\'t. You treat every patient like they\'re the only patient. That\'s the difference between a good first responder and a great one."',
      choices: [
        { text: '"I learned that from watching you."', effect: { morale: 6, reputation: 2 }, bondDelta: 16, effectLabel: '+6 Morale, +2 Reputation' },
        { text: '"Every patient is the only patient. That\'s how I try to run it."', effect: { morale: 5, knowledge: 2 }, bondDelta: 13, effectLabel: '+5 Morale, +2 Knowledge' },
      ]
    },
  ],
};

// ===== FIREBELL'S BAR EVENTS =====
const FIREBELL_EVENTS = [
  {
    id: 'firebell_ortega_neighborhood',
    title: 'Ortega\'s Block',
    crewId: 'ortega', portrait: 'JC', border: '#ef4444',
    desc: 'Ortega is three beers in and talking about Saltmarsh. He tells you about the mural on the side of his old building, the block party in August, the family that waved at every rig that went by.',
    dialogue: '"I got out. But I never really left, you know? Every call we take in that neighborhood — I\'m there for them. Not just as a firefighter."',
    effect: { morale: 5 }, bondDelta: 8, effectLabel: '+5 Morale',
  },
  {
    id: 'firebell_whitaker_trivia',
    title: 'Trivia Night Captain',
    crewId: 'whitaker', portrait: 'CH', border: '#ef4444',
    desc: 'Whitaker has announced — without asking anyone — that 12 is entering The Firebell Thursday trivia night. He needs a fourth. He points at you.',
    dialogue: '"You\'re in. Don\'t let me down. Last time Ortega answered \'Lincoln\' for every president question and we finished fourth."',
    effect: { morale: 7, reputation: 3 }, bondDelta: 10, effectLabel: '+7 Morale, +3 Reputation',
  },
  {
    id: 'firebell_kessler_alone',
    title: 'Kessler at Last Call',
    crewId: 'kessler', portrait: 'KS', border: '#ef4444',
    desc: 'It\'s late and Kessler is at the far end of the bar, working on something in his head. The barstool next to him is empty. You sit down. He doesn\'t tell you to leave.',
    dialogue: '"Some shifts — you ever wonder if you left something behind at the scene? Not gear. Something else."',
    effect: { morale: 4, leadership: 3 }, bondDelta: 12, effectLabel: '+4 Morale, +3 Leadership',
  },
  {
    id: 'firebell_reeves_advice',
    title: 'Delgado Off the Record',
    crewId: 'reeves', portrait: 'MC', border: '#f59e0b',
    desc: 'Delgado is in a good mood — relaxed in a way you don\'t see during shifts. He buys you a beer and gives you unsolicited career advice.',
    dialogue: '"Seriously? Don\'t worry about rank. Worry about being the person your crew can call when it goes sideways. The rank follows that. Always."',
    effect: { leadership: 4, morale: 5 }, bondDelta: 11, effectLabel: '+4 Leadership, +5 Morale',
  },
  {
    id: 'firebell_whitfield_appearance',
    title: 'The Chief Makes a Rare Appearance',
    crewId: 'whitfield', portrait: 'WB', border: '#f59e0b',
    desc: 'Kade walks into The Firebell — a rare event. The crew sits up straighter. He waves them back down, orders a club soda, and sits at the bar. Eventually he ends up next to you.',
    dialogue: '"Off duty, I\'m just Wallace. Don\'t look so surprised. Even battalion chiefs get thirsty."',
    effect: { morale: 8, reputation: 4 }, bondDelta: 13, effectLabel: '+8 Morale, +4 Reputation',
  },
  {
    id: 'firebell_sorensen_ashfall',
    title: 'Sorensen\'s Ashfall',
    crewId: 'sorensen', portrait: 'SB', border: '#3b82f6',
    desc: 'Sorensen is telling you about a patient she\'s followed up on — not officially, just as a person — who recovered better than expected. She lights up telling it.',
    dialogue: '"People think this job is about the emergency. But sometimes it\'s just about the hour after. The hour where somebody\'s still alive because we showed up."',
    effect: { morale: 6, knowledge: 2 }, bondDelta: 11, effectLabel: '+6 Morale, +2 Knowledge',
  },
  {
    id: 'firebell_darts_ortega',
    title: 'Darts with Ortega',
    crewId: 'ortega', portrait: 'JC', border: '#ef4444',
    desc: 'Ortega challenges you to darts. He\'s suspiciously good at this. You\'re not. This is going to get competitive.',
    dialogue: '"You know what darts are? Controlled aggression. Just like entry operations. I\'m basically training you right now."',
    effect: { morale: 6, physical: 2 }, bondDelta: 9, effectLabel: '+6 Morale, +2 Physical',
  },
  {
    id: 'firebell_whitaker_cindy',
    title: 'Whitaker\'s Donna',
    crewId: 'whitaker', portrait: 'CH', border: '#ef4444',
    desc: 'Whitaker\'s wife Donna stops by The Firebell. She knows everyone\'s name, everyone\'s wife\'s name, everyone\'s kids\' names. She knows yours now too.',
    dialogue: '"This one, Christopher says, is going to be somebody. Don\'t screw it up." (Directed at Whitaker, not you.)',
    effect: { morale: 8, reputation: 3 }, bondDelta: 12, effectLabel: '+8 Morale, +3 Reputation',
  },
  {
    id: 'firebell_kessler_arm',
    title: 'Kessler\'s Arm-Wrestling Claim',
    crewId: 'kessler', portrait: 'KS', border: '#ef4444',
    desc: 'Kessler claims he\'s never lost at arm wrestling. Ortega immediately disputes this. The whole crew turns to you — they want you to be the challenger.',
    dialogue: '"You don\'t have to." (Kessler, calmly.) "But you\'ll regret it if you don\'t."',
    effect: { morale: 5, physical: 3 }, bondDelta: 8, effectLabel: '+5 Morale, +3 Physical',
  },
  {
    id: 'firebell_whole_crew',
    title: 'After a Good Week',
    crewId: null, portrait: null, border: null,
    desc: 'The whole crew is at The Firebell tonight — a rare alignment of shifts and mood. The kind of evening that doesn\'t happen often enough. Whitaker is behind the bar. Kessler is actually smiling. Delgado bought the first round.',
    dialogue: 'No particular conversation. Just the sound of people who trust each other, unwinding.',
    effect: { morale: 12, reputation: 3 }, bondDelta: 6, effectLabel: '+12 Morale, +3 Reputation (all bonds +6)',
  },
];

// ===== SHIFT ACTIONS (keep existing) =====

// ===== PROMOTION DATA =====
const PROMOTION_DATA = {
  probie: {
    title: 'PROBATIONARY FIREFIGHTER',
    desc: 'You have completed your initial evaluation period. Chief Kade signs off your probie review. "You met the standard. Now set a higher one." Your probie evaluation bar is removed. You\'re a firefighter.',
    unit: 'Suppression operations — Engine 12 or Truck 7.'
  },
  firefighter: {
    title: 'FIREFIGHTER',
    desc: '"Firefighter." Delgado says it like it means something, because it does. You\'ve put in the calls and the work. Whitaker shakes your hand. "You\'re one of us now. Act like it." Choose your specialist path.',
    unit: 'Specialist training available — Rescue, HazMat, or Aerial Operations.'
  },
  driver_engineer: {
    title: 'DRIVER ENGINEER',
    desc: 'Kade hands you the apparatus key personally. "The rig is your responsibility. The pump is your responsibility. Everyone on that rig is your responsibility." Pre-shift apparatus checks are now mandatory.',
    unit: 'You operate the apparatus. Pre-shift checks begin each shift.'
  },
  lieutenant: {
    title: 'LIEUTENANT',
    desc: '"You\'ve earned this," Kade says, holding out the badge. "It means more responsibility, more weight, and more accountability. I wouldn\'t be giving it to you if I didn\'t believe you were ready." Kessler gives you the nod. You\'ve crossed a line you can\'t come back from — and that\'s exactly where you want to be.',
    unit: 'You are now eligible to request a unit transfer — Truck 7, Squad 4, or Engine 12.'
  },
  captain: {
    title: 'CAPTAIN',
    desc: '"Captain." The word sounds different when Kade says it about you. Delgado shakes your hand. The crew lines up — not because they were told to, but because they wanted to. You feel the weight of command settle onto your shoulders. It fits.',
    unit: 'You take command of your apparatus. Morning AFD briefings are now part of your shift.'
  },
  battalion_chief: {
    title: 'BATTALION CHIEF',
    desc: '"Battalion 6." The final rank. Kade pins the bugles himself. "I\'ve watched you become a firefighter, an officer, and now a chief. This house — these people — they\'re yours to lead. Don\'t let them down." You don\'t plan to.',
    unit: 'You command all units of Firehouse 12. District staffing and budget are your responsibility.'
  },
  // EMS ranks
  paramedic: {
    title: 'PARAMEDIC',
    desc: 'Sorensen says it simply: "Welcome to ALS." Your NREMT license is active. You\'re a certified Paramedic. The hospital rapport system is now live — how you treat Crestbridge Medical matters from this point forward.',
    unit: 'Ambulance 9 — Advanced Life Support certified.'
  },
  pic: {
    title: 'PARAMEDIC IN CHARGE',
    desc: 'Field Chief hands you the PIC designation. "You\'re running the ambo now. Every patient, every decision — yours." Sorensen smiles. "I knew you\'d get here. Don\'t make me regret it."',
    unit: 'Paramedic in Charge — you train the next candidate.'
  },
  field_chief: {
    title: 'PARAMEDIC FIELD CHIEF',
    desc: 'The EMS pinnacle. You command EMS operations across the district — multiple ambos, resource allocation, hospital relations, and MCI command. Sorensen attends your pinning ceremony. She doesn\'t say anything. She doesn\'t need to.',
    unit: 'You command district EMS operations.'
  },
};

// ===== CONSEQUENCE EVENTS =====
const CONSEQUENCE_EVENTS = {
  whitfield_pullsAside: [
    '"Sit down. We need to talk about what happened on that last call." Kade closes the office door. "I need to know what you were thinking. Walk me through it."',
    '"Everyone has off calls. What I need from you is to understand why, so it doesn\'t happen twice."',
    '"I\'m not looking to discipline you. I\'m looking to understand you. There\'s a difference."',
  ],
  performanceReview: {
    title: 'Performance Review',
    desc: 'Three consecutive difficult calls. Kade has called you in — not for punishment, but for something harder: an honest assessment.',
    dialogue: '"Three calls that didn\'t go the way they should have. I\'m not writing you up. I\'m asking: what do you need from me to get back on track? What\'s going on?"',
    choices: [
      { text: '"I need more drilling. I\'ve been in my head too much on scene."', effect: { physical: 3, knowledge: 3, morale: 3, leadership: -2 }, effectLabel: '+3 Physical, +3 Knowledge, +3 Morale, -2 Leadership' },
      { text: '"I think I need to study the SOGs more. I\'ve been winging decisions."', effect: { knowledge: 5, command: 3, morale: -3 }, effectLabel: '+5 Knowledge, +3 Command, -3 Morale' },
      { text: '"I\'ve been carrying something personal. It\'s affecting my focus."', effect: { morale: 8, leadership: 2, reputation: -2 }, effectLabel: '+8 Morale, +2 Leadership, -2 Reputation' },
    ]
  },
  critSuccessAck: [
    'Delgado catches you in the apparatus bay before the shift briefing. "Word gets around. That was a good call yesterday. I noticed."',
    'Kessler just says "Good work" when you pass in the hall. From him, that\'s a standing ovation.',
    'Ortega fist-bumps you before morning drill and says nothing. That\'s the Squad 4 review.',
    'Whitaker announces at dinner that you\'re not allowed to cook anymore because "we need you in the field."',
    'Kade leaves a handwritten note on your bunk. Two words: "Well done."',
  ],
};

// Crew reaction quotes for shift summary
const SHIFT_GRADE_REACTIONS = {
  S: [
    '"Whatever you\'re doing, keep doing it." — Delgado',
    '"That\'s a high bar. Try to clear it every shift." — Kade',
    '"Not bad. Not bad at all." — Kessler (this is effusive, for him)',
  ],
  A: [
    '"Good shift. Get some rest." — Kessler',
    '"I\'ll take that every time." — Delgado',
    '"The crew noticed. That matters." — Whitaker',
  ],
  B: [
    '"Not bad. Tomorrow we do better." — Whitaker',
    '"Building on it. That\'s all any of us can do." — Delgado',
    '"Solid work. Identify the gap and close it." — Kade',
  ],
  C: [
    '"We all have shifts like this. What did you learn?" — Kade',
    '"Every shift is data. Use this one." — Delgado',
    '"Tomorrow." — Kessler',
  ],
  D: [
    '"Hey. Come talk to me after you\'ve had some sleep." — Ortega',
    '"Not the shift we needed. But you showed up. That counts for something." — Sorensen',
    '"Reset. Start fresh. This job is too long for a single bad shift to define you." — Kade',
  ],
};

// ===== CAREER TRACKS =====
const CAREER_TRACKS = {
  suppression: {
    id: 'suppression', name: 'Suppression', color: '#c8281e', icon: '🔥',
    desc: 'Engine, Truck, and Squad operations. The fireground is your domain.',
    ranks: ['Probationary Firefighter','Firefighter','Driver Engineer','Lieutenant','Captain','Battalion Chief'],
  },
  ems: {
    id: 'ems', name: 'EMS', color: '#3b82f6', icon: '🚑',
    desc: 'Advanced life support. On Ambo 9 alongside Sorensen.',
    ranks: ['Paramedic Candidate','Paramedic','Paramedic in Charge','Paramedic Field Chief'],
  },
};

// ===== EMS ACADEMY EVENTS =====
const EMS_ACADEMY_EVENTS = [
  {
    id:'ems_w1', week:1, type:'training', tag:'ORIENTATION', icon:'🏥',
    title:'EMS Academy Orientation',
    desc:'Training Coordinator Nash addresses your cohort. "Paramedicine is the bridge between the street and the hospital. Every decision you make in that ambulance is a clinical decision. The moment you stop treating it like one is the moment you become dangerous." You have an evening to decide how to spend the first full day of prep.',
    choices:[
      { text:'Review anatomy and pharmacology texts late into the evening', effect:{knowledge:5}, effectLabel:'+5 Knowledge' },
      { text:'Introduce yourself to every candidate in the cohort — know your team', effect:{morale:4,reputation:2}, effectLabel:'+4 Morale, +2 Reputation' },
      { text:'Request a voluntary trauma bay observation at Crestbridge Medical', effect:{knowledge:3,morale:2}, effectLabel:'+3 Knowledge, +2 Morale' },
    ]
  },
  {
    id:'ems_w2', week:2, type:'training', tag:'TRAINING', icon:'💊',
    title:'Pharmacology & Patient Assessment',
    desc:'Drug protocols, cardiac drug classes, dosage calculations. Dr. Reyes runs the morning session. In the afternoon, Coordinator Nash takes over for patient assessment practicals. The pace is relentless. "If you can\'t do this under pressure in a classroom, you won\'t be able to do it in a moving ambulance with a family watching."',
    choices:[
      { text:'Stay after hours to drill drug dosage calculations until they\'re automatic', effect:{knowledge:6}, effectLabel:'+6 Knowledge' },
      { text:'Work with a study partner to build a shared mental model of the protocols', effect:{knowledge:4,morale:3}, effectLabel:'+4 Knowledge, +3 Morale' },
      { text:'Focus on the patient assessment practicals — the hands-on component matters most', effect:{knowledge:4,physical:2,reputation:2}, effectLabel:'+4 Knowledge, +2 Physical, +2 Rep' },
    ]
  },
  {
    id:'ems_w3', week:3, type:'training', tag:'TRAINING', icon:'🫀',
    title:'Cardiac Arrest Simulation',
    desc:'Full ACLS sim — high-fidelity manikin, monitor, drugs, team roles. You\'re running the code. Dr. Reyes watches without a word. Nash stands at the back of the room with a clipboard. Twelve minutes of controlled chaos. Every second of that twelve minutes matters.',
    choices:[
      { text:'Lead the code decisively — call every step out loud for the team', effect:{leadership:5,knowledge:4}, effectLabel:'+5 Leadership, +4 Knowledge' },
      { text:'Focus on flawless technique — every compression to standard', effect:{knowledge:5,physical:3}, effectLabel:'+5 Knowledge, +3 Physical' },
      { text:'Communicate constantly with your team — make it a crew performance', effect:{leadership:4,morale:3,reputation:2}, effectLabel:'+4 Leadership, +3 Morale, +2 Rep' },
    ]
  },
  {
    id:'ems_w4', week:4, type:'social', tag:'CLINICAL', icon:'🚑',
    title:'First Supervised Ride-Along',
    desc:'Your first practical ride-along — not on Ambo 9, but on a district unit with a senior paramedic preceptor. Two calls: a chest pain and a paediatric fall. Your preceptor watches everything and says little. At the end of the shift, they give you one sentence of feedback.',
    choices:[
      { text:'Ask your preceptor to narrate their decision-making in real time', effect:{knowledge:5,reputation:3}, effectLabel:'+5 Knowledge, +3 Rep' },
      { text:'Stay back and observe — learn the rhythm before you try to run it', effect:{knowledge:4,morale:3}, effectLabel:'+4 Knowledge, +3 Morale' },
      { text:'Assist wherever you can and demonstrate initiative at every step', effect:{physical:2,knowledge:3,leadership:3}, effectLabel:'+2 Physical, +3 Knowledge, +3 Leadership' },
    ]
  },
  {
    id:'ems_w5', week:5, type:'training', tag:'TRAUMA', icon:'🩹',
    title:'Trauma Scenario Week',
    desc:'Multi-trauma simulations — MVA, penetrating trauma, blast injury. Nash leads every scenario personally this week. "Adequate is how patients die. I don\'t train for adequate." The pace is unlike anything else in the curriculum.',
    choices:[
      { text:'Prioritise airway management above everything else — control the airway first', effect:{knowledge:6,physical:2}, effectLabel:'+6 Knowledge, +2 Physical' },
      { text:'Control haemorrhage first — go to where the blood is', effect:{knowledge:5,physical:3}, effectLabel:'+5 Knowledge, +3 Physical' },
      { text:'Develop a clear verbal plan before moving on every scenario', effect:{leadership:5,knowledge:4}, effectLabel:'+5 Leadership, +4 Knowledge' },
    ]
  },
  {
    id:'ems_w6', week:6, type:'exam', tag:'WRITTEN EXAM', icon:'📝',
    title:'NREMT Written Board',
    desc:'The national registry written examination. 120 questions, computer-adaptive. Failure means remediation and a 90-day wait before resitting. Dr. Reyes distributes the papers without speaking. The room is silent. Your preparation has either been enough or it hasn\'t.',
    choices:[
      { text:'Work methodically through every question — flag uncertain answers and return', effect:{knowledge:7,morale:2}, effectLabel:'+7 Knowledge, +2 Morale' },
      { text:'Trust your first instinct — your preparation should have built good reflexes', effect:{knowledge:5,morale:1}, effectLabel:'+5 Knowledge, +1 Morale' },
      { text:'Allocate time deliberately to your known weak areas', effect:{knowledge:6}, effectLabel:'+6 Knowledge' },
    ]
  },
  {
    id:'ems_w7', week:7, type:'exam', tag:'PRACTICAL', icon:'⚙️',
    title:'NREMT Practical Skills',
    desc:'Hands-on skills assessment: IV access, airway management, spinal immobilisation, patient assessment, cardiac monitoring. Nash evaluates two stations herself. Dr. Reyes evaluates the airway station. Two external NREMT examiners cover the rest. Everyone in this room is watching everything.',
    choices:[
      { text:'Execute every skill precisely to standard — clean, controlled, textbook', effect:{knowledge:5,physical:3,reputation:4}, effectLabel:'+5 Knowledge, +3 Physical, +4 Rep' },
      { text:'Think aloud throughout — communicate every action clearly under pressure', effect:{leadership:4,knowledge:4,morale:2}, effectLabel:'+4 Leadership, +4 Knowledge, +2 Morale' },
      { text:'Volunteer for the first slot — set the tone for the entire cohort', effect:{leadership:5,reputation:5,morale:-1}, effectLabel:'+5 Leadership, +5 Rep, -1 Morale' },
    ]
  },
  {
    id:'ems_w8', week:8, type:'graduation', tag:'GRADUATION', icon:'🏅',
    title:'Paramedic Graduation',
    desc:'Coordinator Nash calls the cohort to attention one final time. "Every protocol you memorised, every sim you ran, every bad outcome you replayed — that was preparation. What happens next is the real thing." Paramedic Elena Sorensen from Ambulance 9 — your new partner — is seated in the front row. She shakes your hand when your name is called and holds it a second longer than protocol requires.',
    choices:[
      { text:'Graduate — Ambo 9 is waiting', effect:{morale:10,reputation:5,knowledge:3}, effectLabel:'+10 Morale, +5 Rep, +3 Knowledge', isGraduation:true },
    ]
  },
];

// ===== COMPLICATIONS =====
const COMPLICATIONS = [
  { id:'understaffed',       label:'Understaffed',         icon:'👥', desc:'Down one crew member. Actions reduced by 1.',    effect:{actionsReduced:1} },
  { id:'equipment_issue',    label:'Equipment Issue',       icon:'🔧', desc:'Apparatus fault. –1 on all call rolls.',         effect:{dispatchPenalty:1} },
  { id:'bad_weather',        label:'Bad Weather',           icon:'⛈️', desc:'Severe weather. Outdoor calls harder (–2).',    effect:{weatherPenalty:2} },
  { id:'double_tap',         label:'Double Tap',            icon:'📡', desc:'Second call expected back-to-back.',             effect:{doubleCall:true} },
  { id:'civilian_complaint', label:'Civilian Complaint',    icon:'📝', desc:'Complaint on file. Kade watching closely.',     effect:{whitfieldTrustMod:-5} },
  { id:'probie_riding',      label:'Probie Riding Along',   icon:'🎓', desc:'Candidate observing. Lead by example.',         effect:{probieRiding:true} },
  { id:'chiefs_inspection',  label:"Chief's Inspection",   icon:'🔍', desc:'District chief doing rounds today.',             effect:{chiefInspection:true} },
];

// ===== CALL TACTICS =====
const CALL_TACTICS = {
  fire: [
    { text:'Aggressive interior attack — take the fight to the seat', modifier:2, label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Coordinated ventilation first, then controlled advance',  modifier:1, label:'+1 Tactical', risk:'MED RISK' },
    { text:'Defensive exterior attack — protect exposures',           modifier:-1,label:'–1 Tactical', risk:'LOW RISK' },
  ],
  rescue: [
    { text:'Immediate entry — victim may not survive delay',         modifier:2, label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Rapid size-up then targeted rescue entry',              modifier:0, label:'No Modifier', risk:'MED RISK' },
    { text:'Safety perimeter and additional resource request',      modifier:-1,label:'–1 Tactical', risk:'LOW RISK' },
  ],
  water: [
    { text:'In-water rescue — direct contact and extraction',       modifier:2, label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Throw rope first, position for water entry if needed', modifier:1, label:'+1 Tactical', risk:'MED RISK' },
    { text:'Shore-based operations only — await Marine unit',       modifier:-1,label:'–1 Tactical', risk:'LOW RISK' },
  ],
  medical: [
    { text:'Aggressive ALS — full intervention immediately',        modifier:2, label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Rapid assessment then targeted ALS protocol',          modifier:1, label:'+1 Tactical', risk:'MED RISK' },
    { text:'BLS stabilisation and rapid transport to definitive care', modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
  hazmat: [
    { text:'Rapid product ID and aggressive mitigation',            modifier:1, label:'+1 Tactical', risk:'MED RISK' },
    { text:'Level B approach — full ID before mitigation',          modifier:0, label:'No Modifier', risk:'MED RISK' },
    { text:'Full defensive — Level A PPE, await HazMat team',       modifier:-2,label:'–2 Tactical', risk:'LOW RISK' },
  ],
  admin: [
    { text:'Methodical and thorough — complete all checklist steps',modifier:1, label:'+1 Tactical', risk:'LOW RISK' },
    { text:'Standard response protocol — by the book',             modifier:0, label:'No Modifier', risk:'LOW RISK' },
    { text:'Quick response — clear the scene efficiently',          modifier:-1,label:'–1 Tactical', risk:'LOW RISK' },
  ],
};

const CALL_TACTIC_MAP = {
  structure_fire:'fire', house_fire_children:'fire', electrical_fire:'fire',
  wildland:'fire', explosion:'fire', high_rise:'fire',
  vehicle_collision:'rescue', multi_vehicle:'rescue', building_collapse:'rescue',
  trench_rescue:'rescue', elevator_rescue:'rescue', industrial_accident:'rescue', train_derailment:'rescue',
  water_rescue:'water', swift_water:'water',
  medical_emergency:'medical', cardiac_arrest:'medical',
  gas_leak:'hazmat', hazmat:'hazmat',
  false_alarm:'admin',
};

// ===== SIZE-UP OPTIONS =====
const SIZE_UP_OPTIONS = [
  { id:'aggressive', text:'Aggressive Interior Operations', desc:'Press into the structure. Maximum resource commitment. Take the fight to it.', modifier:1,  label:'+1 Size-Up', risk:'HIGH COMMIT' },
  { id:'defensive',  text:'Defensive Operations',          desc:'Protect exposures only. No interior entry. Exterior operations.', modifier:-1, label:'–1 Size-Up', risk:'DEFENSIVE' },
  { id:'resources',  text:'Request Additional Resources',  desc:'Call for mutual aid before committing. More units, more options.', modifier:0,  label:'No Modifier', risk:'BUILD-UP' },
];

// ===== RANK-DIFFERENTIATED CALL SYSTEM DATA =====

// --- SHADOW MODE (probie / ems_candidate) ---
const SHADOW_CALL_CHOICES = {
  fire: [
    { id:'follow',   text:'Stay tight on [crew] — execute every instruction without hesitation',
      modifier:0,   bondDelta:4, probieBonus:10, effectLabel:'Safe · Bond ++ · Steady learning' },
    { id:'question', text:'Ask [crew] what they\'re reading in the smoke mid-approach',
      modifier:0.5, bondDelta:2, knowledgeDelta:5, probieBonus:13, risk:true,
      effectLabel:'Moderate risk · +5 Knowledge if timed right' },
    { id:'observe',  text:'Spot something [crew] hasn\'t flagged yet and call it out',
      modifier:1.5, bondDelta:7, probieBonus:20, risk:true,
      effectLabel:'High risk · Big probie score if you\'re right' },
  ],
  rescue: [
    { id:'follow',   text:'Follow [crew]\'s exact rescue technique without deviation',
      modifier:0,   bondDelta:4, probieBonus:10, effectLabel:'Safe · Bond ++' },
    { id:'question', text:'Ask [crew] to explain the tool decision before they commit',
      modifier:0.5, bondDelta:2, knowledgeDelta:5, probieBonus:12, risk:true,
      effectLabel:'Moderate risk · Knowledge gain' },
    { id:'observe',  text:'Suggest an alternative approach based on what you\'re seeing',
      modifier:1.5, bondDelta:6, probieBonus:18, risk:true,
      effectLabel:'High risk · Big reward if you\'re right' },
  ],
  medical: [
    { id:'follow',   text:'Carry equipment and assist wherever [crew] directs',
      modifier:0,   bondDelta:4, probieBonus:10, effectLabel:'Safe · Bond ++ · Morale +' },
    { id:'question', text:'Ask [crew] about their patient assessment priorities mid-call',
      modifier:0.5, bondDelta:2, knowledgeDelta:5, probieBonus:12, risk:true,
      effectLabel:'Moderate risk · Knowledge gain' },
    { id:'observe',  text:'Notice a symptom [crew] hasn\'t addressed and quietly flag it',
      modifier:1.5, bondDelta:6, probieBonus:18, risk:true,
      effectLabel:'High risk · Critical observation or embarrassing mistake' },
  ],
  hazmat: [
    { id:'follow',   text:'Stay in the cold zone — support [crew] from the safety perimeter',
      modifier:-0.5,bondDelta:3, probieBonus:8,  effectLabel:'Very safe · Bond +' },
    { id:'question', text:'Shadow [crew] into the warm zone — observe directly',
      modifier:0.5, bondDelta:4, probieBonus:14, risk:true,
      effectLabel:'Moderate risk · Full observation' },
    { id:'observe',  text:'Read the placard before [crew] and call the product first',
      modifier:1.5, bondDelta:7, knowledgeDelta:5, probieBonus:20, risk:true,
      effectLabel:'High risk · Major knowledge win if correct' },
  ],
  admin: [
    { id:'follow',   text:'Follow [crew]\'s lead — support and observe every action',
      modifier:0,   bondDelta:3, probieBonus:8,  effectLabel:'Safe · Bond +' },
    { id:'question', text:'Ask [crew] about the building systems while they work',
      modifier:0.3, bondDelta:2, knowledgeDelta:3, probieBonus:10,
      effectLabel:'Low risk · Knowledge +' },
    { id:'observe',  text:'Take point on civilian management — take pressure off [crew]',
      modifier:0.5, bondDelta:5, probieBonus:14, risk:true,
      effectLabel:'Moderate risk · Leadership opportunity' },
  ],
};

const SHADOW_FEEDBACK_POOL = {
  critSuccess:[
    'kept up with every call, every move. More than I expected from a probie.',
    'made the right read when it counted. Good instinct.',
    'I want you on my hip again next shift. You\'re paying attention.',
    'saw things out there I didn\'t tell you to look for. That\'s not nothing.',
  ],
  success:[
    'decent work. Ask me about one decision on that call later.',
    'kept up. Don\'t let it go to your head — but that was a good shift.',
    'solid. Keep doing exactly that.',
    'no mistakes that mattered. That\'s the benchmark right now.',
  ],
  partial:[
    'we got through it. There\'s a moment I want to walk back through with you.',
    'you hesitated once. We\'re going to talk about why.',
    'not bad. Not good enough yet. Keep working.',
    'you were a beat slow at the wrong moment. Not your fault — now it is.',
  ],
  failure:[
    'what happened out there? Come find me after debrief.',
    'I\'m not angry. I want to understand what you were thinking.',
    'that call didn\'t go right. You need to own that and learn from it.',
    'everyone has one of those. The ones who become firefighters don\'t have a second.',
  ],
};

// --- FF ROLE SYSTEM ---
const FF_ROLE_ASSIGNMENTS = {
  structure_fire:      ['search_rescue','hose_line','ventilation'],
  house_fire_children: ['search_rescue','search_rescue','hose_line'],
  vehicle_collision:   ['extrication','hose_line','ems_support'],
  multi_vehicle:       ['extrication','extrication','ems_support'],
  medical_emergency:   ['ems_support'],
  cardiac_arrest:      ['ems_support'],
  mass_casualty:       ['ems_support','extrication'],
  hazmat:              ['hazmat_support','decon'],
  gas_leak:            ['hazmat_support','evacuation'],
  water_rescue:        ['water_rescue','ems_support'],
  swift_water:         ['water_rescue','water_rescue'],
  trench_rescue:       ['search_rescue','shoring'],
  building_collapse:   ['search_rescue','shoring'],
  industrial_accident: ['extrication','ems_support'],
  explosion:           ['search_rescue','hose_line'],
  high_rise:           ['search_rescue','hose_line','ventilation'],
  elevator_rescue:     ['search_rescue','mechanical'],
  electrical_fire:     ['hose_line','hazmat_support'],
  wildland:            ['hose_line','evacuation'],
  train_derailment:    ['search_rescue','extrication','ems_support'],
  false_alarm:         ['search_rescue'],
};

const FF_ROLE_DISPLAY = {
  search_rescue:  { label:'Search & Rescue', icon:'🔦', statPrimary:'physical', statSecondary:'knowledge',
    ltOrder:'"Primary search — upper floors. Nobody up there before you."' },
  hose_line:      { label:'Hose Line', icon:'🚿', statPrimary:'physical', statSecondary:'morale',
    ltOrder:'"Get water on the fire. That line is everything right now."' },
  ventilation:    { label:'Ventilation', icon:'💨', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Read the building and open it up. Coordinate before you cut."' },
  extrication:    { label:'Extrication', icon:'🔧', statPrimary:'physical', statSecondary:'knowledge',
    ltOrder:'"Patient is still in the vehicle. Get them out clean."' },
  ems_support:    { label:'EMS Support', icon:'🏥', statPrimary:'knowledge', statSecondary:'morale',
    ltOrder:'"Sorensen\'s going to need you on patient care. Follow her lead."' },
  hazmat_support: { label:'HazMat Support', icon:'☢️', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Level B until we get a product ID. No improvisation."' },
  water_rescue:   { label:'Water Rescue', icon:'🌊', statPrimary:'physical', statSecondary:'morale',
    ltOrder:'"Dry suit on. Do not fight the current."' },
  shoring:        { label:'Structural Shoring', icon:'🏗️', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Nothing goes in until it\'s shored. You\'re on the panels."' },
  decon:          { label:'Decontamination', icon:'🚿', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Decon line on the east side. Nobody leaves hot zone without going through you."' },
  evacuation:     { label:'Evacuation Control', icon:'🚶', statPrimary:'leadership', statSecondary:'morale',
    ltOrder:'"Get the block clear. Everyone out. Nobody comes back in."' },
  mechanical:     { label:'Mechanical / Utilities', icon:'⚙️', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Building systems override. You know the drill."' },
};

const FF_ROLE_CHOICES = {
  search_rescue:[
    { text:'Systematic search — left-hand wall, every room cleared before advancing',
      modifier:0,   effect:{knowledge:3,physical:2}, risk:false, label:'Methodical — lower variance' },
    { text:'Push deeper — hit the most dangerous zones first',
      modifier:1,   effect:{physical:4,morale:-2}, risk:true,  label:'Aggressive — high reward, high risk' },
    { text:'Read the building — search where victims most likely are',
      modifier:1.5, effect:{knowledge:5}, risk:true, label:'Tactical — highest variance' },
  ],
  hose_line:[
    { text:'Advance steady — controlled flow, systematic suppression',
      modifier:0,   effect:{physical:3,knowledge:2}, risk:false, label:'Controlled' },
    { text:'Push the line hard — maximum flow, fight for every foot',
      modifier:1,   effect:{physical:5,morale:-2}, risk:true,  label:'Aggressive — high risk' },
    { text:'Coordinate with ventilation — suppress where the smoke is clearing',
      modifier:1.5, effect:{knowledge:4,physical:2}, risk:true, label:'Tactical' },
  ],
  ventilation:[
    { text:'Vertical vent — cut the roof directly above the fire',
      modifier:1,   effect:{physical:4,knowledge:3}, risk:true,  label:'Aggressive — high impact' },
    { text:'Positive pressure ventilation — coordinate with hose, PPV at the entry',
      modifier:0,   effect:{knowledge:4,physical:2}, risk:false, label:'Coordinated' },
    { text:'Read the fire — wait for the right moment to open it up',
      modifier:0.5, effect:{knowledge:5,morale:2},  risk:false, label:'Patient — most knowledge gain' },
  ],
  extrication:[
    { text:'Controlled cut — follow proper sequence for structural integrity',
      modifier:0,   effect:{knowledge:4,physical:2}, risk:false, label:'Methodical' },
    { text:'Speed cut — get the patient out in minimum time',
      modifier:1,   effect:{physical:5,morale:-3}, risk:true,  label:'Fast — risky' },
    { text:'Package the patient first, then cut — minimize secondary injury',
      modifier:0.5, effect:{knowledge:3,physical:3,morale:2}, risk:false, label:'Patient-first' },
  ],
  ems_support:[
    { text:'Execute every task Sorensen assigns without deviation',
      modifier:0,   effect:{knowledge:3,morale:2}, risk:false, label:'Supportive' },
    { text:'Take the lead on patient assessment — give Sorensen the full picture',
      modifier:1,   effect:{knowledge:5,morale:-1}, risk:true, label:'Proactive — higher variance' },
    { text:'Manage the family/bystanders — give Sorensen clear space to work',
      modifier:0.5, effect:{morale:4,leadership:2}, risk:false, label:'Scene management' },
  ],
  hazmat_support:[
    { text:'ERG compliance — strict protocol, no improvisation',
      modifier:0,   effect:{knowledge:4}, risk:false, label:'Safe — by the book' },
    { text:'Fast product ID — establish the hazard boundary before HazMat arrives',
      modifier:1,   effect:{knowledge:5,physical:1}, risk:true, label:'Proactive' },
    { text:'Support the team — equipment, documentation, perimeter control',
      modifier:0,   effect:{knowledge:2,reputation:2}, risk:false, label:'Solid support' },
  ],
  water_rescue:[
    { text:'Throw rope — shore-based, pull victim to safety',
      modifier:0,   effect:{physical:3,knowledge:3}, risk:false, label:'Shore-based technique' },
    { text:'In-water rescue — direct contact extraction',
      modifier:1.5, effect:{physical:5,morale:-2}, risk:true, label:'In-water — high risk' },
    { text:'Read the current before committing — position for multiple attempts',
      modifier:0.5, effect:{knowledge:4,physical:2}, risk:false, label:'Calculated' },
  ],
  shoring:[
    { text:'Full panel installation before any entry — no exceptions',
      modifier:0,   effect:{knowledge:5}, risk:false, label:'By protocol' },
    { text:'Minimum shoring for immediate victim access',
      modifier:1,   effect:{physical:3,knowledge:2}, risk:true, label:'Fast — higher risk' },
    { text:'Structural assessment with Squad before shoring',
      modifier:0.5, effect:{knowledge:4,leadership:2}, risk:false, label:'Collaborative' },
  ],
  decon:[
    { text:'Full decon protocol — every person accounted for',
      modifier:0,   effect:{knowledge:4,reputation:2}, risk:false, label:'Full protocol' },
    { text:'Triage the decon queue — symptomatic personnel first',
      modifier:1,   effect:{knowledge:5,leadership:2}, risk:false, label:'Clinical triage' },
    { text:'Expedited line — faster throughput, acceptable shortcuts',
      modifier:0.5, effect:{physical:3,knowledge:2}, risk:true, label:'Fast — minor risk' },
  ],
  evacuation:[
    { text:'Door-to-door systematic — no one left unaccounted for',
      modifier:0,   effect:{leadership:3,reputation:2}, risk:false, label:'Methodical' },
    { text:'Priority evacuation — elderly, children, non-ambulatory first',
      modifier:0.5, effect:{leadership:4,morale:3}, risk:false, label:'Priority-based' },
    { text:'Establish a staging point and control where evacuees gather',
      modifier:0.5, effect:{command:3,reputation:2}, risk:false, label:'Command and control' },
  ],
  mechanical:[
    { text:'Utility room — access building systems via standard override',
      modifier:0,   effect:{knowledge:4}, risk:false, label:'Standard access' },
    { text:'Coordinate with building management for full systems access',
      modifier:0.5, effect:{knowledge:3,reputation:3}, risk:false, label:'Collaborative' },
    { text:'Isolate the affected system before any other operations',
      modifier:1,   effect:{knowledge:5}, risk:true, label:'Isolation first' },
  ],
};

// --- DRIVER ENGINEER APPARATUS MODE ---
const DE_PUMP_OPTIONS = [
  { id:'low',      label:'Low pressure — conservative flow', icon:'🔵', modifier:-1,
    desc:'Reduced pressure ensures line control and crew safety. Suppression will be slower.',
    effect:{knowledge:2}, note:'Crew line management is easier. Knockdown takes longer.', risk:'LOW' },
  { id:'standard', label:'Standard pressure — by the book', icon:'🟡', modifier:0,
    desc:'Standard operating pressure. Balanced suppression efficiency and crew safety.',
    effect:{knowledge:1}, note:'Optimal balance for most incidents.', risk:'MED' },
  { id:'high',     label:'High pressure — aggressive suppression', icon:'🔴', modifier:2,
    desc:'Maximum flow rate. Faster knockdown but significantly harder line management.',
    effect:{physical:2}, note:'⚠ Crew line control becomes harder. Risk of injury if the crew is fatigued.',
    risk:'HIGH' },
];

const DE_AERIAL_OPTIONS = [
  { id:'optimal',     label:'Optimal aerial position — 70° elevation, full reach', icon:'🏗️', modifier:1,
    desc:'Ideal aerial placement. Maximum coverage and crew protection.',
    effect:{knowledge:3}, note:'Best protection for crew on the roof or upper floors.', risk:'LOW' },
  { id:'expedient',   label:'Expedient position — fastest deployment angle', icon:'⚡', modifier:0,
    desc:'Fast aerial placement. Coverage slightly reduced but water on the fire quickly.',
    effect:{physical:2}, note:'Good for time-critical situations.', risk:'MED' },
  { id:'aggressive',  label:'Close-in position — maximum reach, elevated risk', icon:'🔥', modifier:2,
    desc:'Maximum reach from close range. Elevated coverage but apparatus at hazard exposure.',
    effect:{physical:3,morale:-1}, note:'⚠ Apparatus exposed to radiant heat. High reward.', risk:'HIGH' },
];

// --- EMS DIAGNOSTIC SYSTEM ---
const EMS_DIAGNOSTIC_CATEGORY_MAP = {
  medical_emergency:'cardiac', cardiac_arrest:'arrest', mass_casualty:'mci',
  vehicle_collision:'trauma', multi_vehicle:'trauma', industrial_accident:'trauma',
  train_derailment:'trauma', building_collapse:'trauma', explosion:'trauma',
  swift_water:'trauma', water_rescue:'trauma', structure_fire:'trauma',
  house_fire_children:'trauma', high_rise:'trauma', false_alarm:'cardiac',
  trench_rescue:'trauma', elevator_rescue:'trauma',
  hazmat:'tox', gas_leak:'tox', wildland:'trauma', electrical_fire:'trauma',
};

const EMS_DIAGNOSTIC_STEPS = {
  cardiac:[
    { stepLabel:'PRIMARY ASSESSMENT',
      question:'Patient: male, 60s, diaphoretic, chest pressure (not pain), brief LOC, BP 92/60, HR 110. What\'s your primary focus?',
      choices:[
        { text:'12-lead ECG immediately — identify the rhythm and any STEMI pattern', modifier:1.5, effect:{knowledge:5}, label:'Correct clinical priority' },
        { text:'IV access and fluid bolus — address hypotension first', modifier:0.5, effect:{knowledge:3}, label:'Reasonable but secondary' },
        { text:'Full head-to-toe assessment before any intervention', modifier:0, effect:{knowledge:2}, label:'Too slow for this presentation' },
      ]},
    { stepLabel:'TREATMENT DECISION',
      question:'12-lead confirms inferior STEMI. BP now 88/58. Sorensen is waiting for your call.',
      choices:[
        { text:'Aspirin 324mg, IV access, O2 to SpO2, STEMI alert to Crestbridge — go now', modifier:2, effect:{knowledge:5,morale:2}, label:'Optimal STEMI protocol' },
        { text:'Aspirin and sublingual nitro for pain — address hypotension concern later', modifier:0, effect:{knowledge:2,morale:-2}, label:'Nitro contraindicated with hypotension' },
        { text:'Fluid challenge to raise BP before drug therapy', modifier:0.5, effect:{knowledge:3}, label:'Not wrong — not optimal priority' },
      ]},
  ],
  arrest:[
    { stepLabel:'CODE MANAGEMENT',
      question:'No pulse. Bystander CPR in progress. Monitor reveals Ventricular Fibrillation.',
      choices:[
        { text:'Charge the defib immediately — V-Fib, shockable rhythm, time is muscle', modifier:2, effect:{knowledge:5,physical:2}, label:'Correct — shock first' },
        { text:'Continue CPR 2 minutes before first shock', modifier:0.5, effect:{knowledge:3}, label:'Older protocol — not current ACLS' },
        { text:'Establish IV access before shock — have epinephrine ready', modifier:0, effect:{knowledge:2}, label:'IV waits until after first shock' },
      ]},
    { stepLabel:'POST-ROSC MANAGEMENT',
      question:'First shock converts. Sinus tachycardia, HR 110, BP 80/50. Patient not yet responsive.',
      choices:[
        { text:'Epinephrine 1mg IV push — support perfusion, prepare for transport', modifier:1.5, effect:{knowledge:4,morale:3}, label:'Good post-ROSC management' },
        { text:'Advanced airway — unconscious patient, airway is critical', modifier:1, effect:{knowledge:4,physical:2}, label:'Airway critical — appropriate' },
        { text:'Continue CPR — single conversion may not be sustained', modifier:0, effect:{knowledge:2}, label:'Check pulse first, always' },
      ]},
  ],
  trauma:[
    { stepLabel:'TRAUMA ASSESSMENT',
      question:'Restrained driver, GCS 13, chest wall tenderness, left arm weakness. High-speed frontal mechanism.',
      choices:[
        { text:'C-spine precautions and rapid trauma assessment — mechanism warrants full workup', modifier:1, effect:{knowledge:4,physical:2}, label:'Correct trauma approach' },
        { text:'Chest assessment first — decreased breath sounds left, possible tension pneumo', modifier:1.5, effect:{knowledge:5}, label:'Aggressive — correct focus, high variance' },
        { text:'GCS 13 is adequate — monitor and transport without full assessment', modifier:0, effect:{knowledge:2,morale:-2}, label:'Under-triaging a deteriorating patient' },
      ]},
    { stepLabel:'INTERVENTION',
      question:'Rapid assessment: decreased breath sounds left, GCS declining to 11, BP 96/62.',
      choices:[
        { text:'Needle decompression left — clinical tension pneumo, don\'t wait for confirmation', modifier:2, effect:{knowledge:6,physical:2}, label:'Clinical diagnosis — act now' },
        { text:'Two large-bore IVs, fluids, rapid transport — trauma centre in 4 minutes', modifier:1, effect:{knowledge:4}, label:'Reasonable — chest not addressed' },
        { text:'Reassess before committing to an invasive procedure', modifier:0, effect:{knowledge:2,morale:-1}, label:'Patient is deteriorating — too slow' },
      ]},
  ],
  tox:[
    { stepLabel:'HAZMAT PATIENT ASSESSMENT',
      question:'Worker: eye irritation, rhinorrhea, bronchospasm after chemical exposure. Product unknown. Second worker unconscious nearby.',
      choices:[
        { text:'Decon patient before treatment — don\'t bring contaminant into the ambo', modifier:1, effect:{knowledge:5}, label:'Correct decon priority' },
        { text:'Immediate bronchodilator — bronchospasm is the acute airway threat', modifier:1.5, effect:{knowledge:4}, label:'Good priority — decon should come first' },
        { text:'Identify the product first — treatment depends on the agent', modifier:0.5, effect:{knowledge:4}, label:'Good thinking — slower response' },
      ]},
    { stepLabel:'PRIORITISATION',
      question:'Decon complete. First patient stable. Unconscious second patient in warm zone. HazMat is 4 minutes out.',
      choices:[
        { text:'Wait for HazMat — entering warm zone without ID is a risk to you and your partner', modifier:0, effect:{knowledge:3,reputation:2}, label:'Correct protocol — difficult call' },
        { text:'Enter with Level B PPE — rapid extraction, patient may not have 4 minutes', modifier:1.5, effect:{physical:4,morale:2}, label:'Brave — protocol violation, higher variance' },
        { text:'Get product ID from bystanders before deciding', modifier:0.5, effect:{knowledge:4}, label:'Smart — patient continues to deteriorate' },
      ]},
  ],
  mci:[
    { stepLabel:'MCI TRIAGE COMMAND',
      question:'You\'re first paramedic on scene. Three patients visible: one unconscious, one screaming, one walking.',
      choices:[
        { text:'START triage immediately — tag all three before treating any', modifier:2, effect:{knowledge:5,leadership:3}, label:'Correct MCI priority — triage before treatment' },
        { text:'Treat the unconscious patient first — most critically injured', modifier:0, effect:{knowledge:2,morale:-2}, label:'Single-patient thinking in an MCI' },
        { text:'Request additional units first, then begin triage', modifier:0.5, effect:{knowledge:3,leadership:2}, label:'Good call — triage can run in parallel' },
      ]},
    { stepLabel:'TRIAGE DECISIONS',
      question:'START done: Priority 1 — no breathing after repositioning. Priority 2 — chest wound, stable. Priority 3 — minor lacerations.',
      choices:[
        { text:'Tag Priority 1 BLACK — non-salvageable without resources you don\'t have. Move to Priority 2.', modifier:2, effect:{knowledge:5,morale:-2}, label:'Difficult — correct MCI triage' },
        { text:'Airway attempt on Priority 1 — reposition and retry breathing', modifier:1, effect:{knowledge:4,physical:2}, label:'Reasonable if resources allow' },
        { text:'Treat Priority 2 first — chest wound is highest-yield intervention', modifier:0.5, effect:{knowledge:3,morale:2}, label:'Correct triage, applied late' },
      ]},
  ],
};

// --- CAPTAIN COMMAND BOARD ---
const CAPTAIN_SECTOR_CHOICES = [
  { id:'standard', label:'Standard deployment — each company in standard roles',
    modifier:0, desc:'Truck 7: primary attack and search. Engine 12: water supply and suppression. Squad 4: rescue and RIT.',
    effect:{command:2}, note:'Proven structure. All LTs have full autonomy in their sectors.' },
  { id:'reinforced', label:'Reinforced attack — two companies on primary suppression',
    modifier:1, desc:'Engine 12 and Truck 7 both on aggressive interior attack. Squad 4 on search only.',
    effect:{command:3,leadership:2}, risk:true, note:'More suppression power. Reduced exposure protection.' },
  { id:'search_priority', label:'Search priority — lead with rescue before suppression',
    modifier:1, desc:'Squad 4 and Truck 7 on primary search. Engine 12 defensive suppression and exposures.',
    effect:{knowledge:3,command:2}, risk:true, note:'Maximum rescue capability. Slower fire knockdown.' },
  { id:'defensive', label:'Declare defensive — exterior operations only',
    modifier:-1, desc:'No interior entry. All companies defensive. Request additional resources.',
    effect:{command:2,reputation:2}, note:'Correct for structural compromise. Conservative risk profile.' },
];

// --- BC INCIDENT COMMAND ---
const BC_INCIDENT_COMMAND_CHOICES = [
  { id:'personal_ic', label:'Personal command — respond and assume IC at the scene',
    modifier:1, desc:'BC responds directly, relieves Captain as IC after formal briefing.',
    effect:{command:3,leadership:2}, note:'Maximum oversight. BC committed to one location.' },
  { id:'delegate',    label:'Delegate — trust the Captain, monitor from district command',
    modifier:0, desc:'Captain retains IC. BC monitors radio traffic and is available to consult.',
    effect:{command:2}, note:'Develops Captains. Less direct control on this incident.' },
  { id:'second_alarm',label:'Second alarm — escalate now, don\'t wait',
    modifier:1.5, desc:'Call the 2nd alarm. More companies, more capability, larger safety margin.',
    effect:{command:2,reputation:3}, risk:true, note:'Right call on a confirmed working fire. Uses district resources.' },
  { id:'mutual_aid',  label:'Mutual aid request — bring in adjacent district resources',
    modifier:0.5, desc:'Request companies from adjacent districts. Expands response for extended ops.',
    effect:{command:3,reputation:2}, note:'Takes time. Correct for major operations or resource depletion.' },
];

// ===== CREW STATE COLOURS =====
const CREW_STATE_COLORS = {
  normal:'#3d5080', fatigued:'#f59e0b', injured:'#ef4444', conflicted:'#a855f7', confident:'#22c55e',
};

// ===== PROBIE TASKS =====
const PROBIE_TASKS = [
  { id:'clean_rig',     text:'Clean the apparatus — engine bay and cab',     icon:'🚒', stat:'reputation', delta:2 },
  { id:'stock_gear',    text:'Stock and check all SCBA and PPE inventories', icon:'🧥', stat:'knowledge',   delta:2 },
  { id:'cook_meal',     text:'Cook crew breakfast before roll call',          icon:'🍳', stat:'morale',      delta:3 },
  { id:'check_equip',   text:'Log equipment inventory — report discrepancies',icon:'📋', stat:'knowledge',   delta:2 },
  { id:'clean_quarters',text:'Clean quarters and bunk area',                  icon:'🧹', stat:'reputation',  delta:1 },
];

// ===== SPECIALIST TRAINING OPTIONS (Firefighter rank) =====
const SPECIALIST_TRAINING_OPTIONS = [
  { id:'rescue', label:'Rescue Specialist', icon:'⛑️',
    desc:'Technical rescue, high-angle operations, confined space. Physical and leadership focused.',
    details:'Each rescue call you attend earns +1 extra Physical. Leadership checks on rescue calls get +2.',
    statBonus:{physical:3,leadership:2} },
  { id:'hazmat', label:'HazMat Specialist', icon:'☢️',
    desc:'Chemical and biological hazards, decon procedures, ERG mastery. Knowledge focused.',
    details:'HazMat and gas leak call rolls get +2. Knowledge checks on those calls boosted.',
    statBonus:{knowledge:4,command:1} },
  { id:'aerial', label:'Aerial Operations', icon:'🏗️',
    desc:'Aerial ladder operations, high-rise tactics, and the driver-engineer pathway. Physical and knowledge focus.',
    details:'Fire and high-rise call rolls get +1. Driver Engineer exam becomes available immediately.',
    statBonus:{physical:2,knowledge:3}, unlockDE:true },
];

// ===== APPARATUS CHECK ITEMS (Driver Engineer rank) =====
const APPARATUS_CHECK_ITEMS = [
  { id:'fuel',  label:'Fuel Level',           icon:'⛽', faultChance:0.18,
    faultDesc:'Tank reading 1/4 — needs immediate refuel before dispatch.' },
  { id:'water', label:'Water Tank & Valves',  icon:'💧', faultChance:0.14,
    faultDesc:'Tank valve partially closed. Pressure drop risk on scene.' },
  { id:'pump',  label:'Pump Panel & Gauges',  icon:'🔧', faultChance:0.20,
    faultDesc:'Pressure gauge reading erratic — calibration needed.' },
  { id:'hose',  label:'Hose Pack & Couplings',icon:'🚿', faultChance:0.12,
    faultDesc:'Hose coupling crossthreaded on bay 2. Swap before dispatch.' },
  { id:'scba',  label:'SCBA & PPE',           icon:'🧥', faultChance:0.16,
    faultDesc:'Bottle 3 below minimum pressure. Replace before shift.' },
];

// ===== LT SHIFT BRIEFING TONES (Lieutenant rank) =====
const LT_BRIEFING_TONES = [
  { id:'push_hard', label:'Push Hard Today', icon:'💪',
    desc:'"We have a good crew. I want to see it on every call. High intensity, maximum effort."',
    effect:{leadership:2}, callBonusStat:'physical', note:'Physical calls favoured · +2 Leadership' },
  { id:'training',  label:'Focus on Training', icon:'📚',
    desc:'"Today is about getting sharper. Every rep and study session counts. Extra training action available."',
    effect:{knowledge:3}, extraAction:true, note:'+1 Free Action (study/drill) · +3 Knowledge' },
  { id:'easy_shift',label:'Steady and Professional', icon:'☕',
    desc:'"Steady, controlled, professional. We get through the day right, not fast."',
    effect:{morale:5}, note:'+5 Crew Morale · Stable reputation' },
];

// ===== CAPTAIN AFD DIRECTIVES =====
const CAPTAIN_AFD_DIRECTIVES = [
  { id:'response_times', label:'Response Time Reduction Mandate', icon:'⏱️',
    directive:'District Command: all companies must reduce average response times by 15% this quarter. Mandatory monitoring begins immediately.',
    choices:[
      { text:'Pass it straight — brief Lieutenants as-is',                    whitfieldDelta:0,  moraleDelta:0,  note:'Neutral. No pushback, no spin.' },
      { text:'Frame it positively — "This shows what 12 is made of"',         whitfieldDelta:1,  moraleDelta:5,  note:'+5 crew morale, +1 CO trust.' },
      { text:'Push back formally — "This creates unsafe pressure on my LTs"', whitfieldDelta:-3, moraleDelta:0, repDelta:3, note:'Risky with command. Builds LT trust.' },
    ]},
  { id:'inspection',    label:'Quarterly Equipment Audit', icon:'🔍',
    directive:'All apparatus to undergo a full equipment audit. Documentation due by end of quarter. AFD Compliance is sending an inspector.',
    choices:[
      { text:'Schedule the audit — standard compliance',         whitfieldDelta:0,  moraleDelta:0,  note:'Neutral.' },
      { text:'Turn it into a drill — make the crew own it',      whitfieldDelta:2,  moraleDelta:3,  note:'+2 Kade, +3 morale.' },
      { text:'Push back — "Our audit was 3 months ago"',         whitfieldDelta:-5, moraleDelta:2,  note:'Risky.' },
    ]},
  { id:'overtime_freeze',label:'Overtime Freeze', icon:'💸',
    directive:'Budget constraints: all overtime requests suspended until further notice. Minimum staffing must be maintained through schedule adjustments.',
    choices:[
      { text:'Comply — notify Lieutenants',                                      whitfieldDelta:0,  moraleDelta:-3, note:'Safe. Morale takes a hit.' },
      { text:'Request a critical-coverage exemption',                            whitfieldDelta:1,  moraleDelta:0,  note:'Shows initiative.' },
      { text:'"This endangers staffing — I\'m filing a formal objection"',       whitfieldDelta:-4, moraleDelta:4,  note:'Big risk. Big crew reward.' },
    ]},
  { id:'training_mandate',label:'Mandatory NIMS Refresher', icon:'📋',
    directive:'All personnel must complete a 4-hour NIMS refresher this month. Scheduling is your responsibility.',
    choices:[
      { text:'Schedule it during low-call periods',                                    whitfieldDelta:1,  moraleDelta:0,  note:'+1 CO trust.' },
      { text:'Use a shift change window — minimal disruption',                         whitfieldDelta:0,  moraleDelta:2,  note:'+2 morale.' },
      { text:'"My crew is NIMS certified. This is redundant box-checking."',           whitfieldDelta:-3, moraleDelta:3,  note:'Risky.' },
    ]},
];

// ===== BC DISTRICT STATIONS =====
const BC_DISTRICT_STATIONS = [
  { id:'s12',  name:'Station 12',  unit:'Engine 12 · Truck 7 · Squad 4', icon:'🔥' },
  { id:'s24',  name:'Station 24',  unit:'Engine 24 · Squad 5',             icon:'🚒' },
  { id:'s17',  name:'Station 17',  unit:'Engine 17 · Ambo 17',             icon:'🚒' },
  { id:'s66',  name:'Station 66',  unit:'Engine 66 · Truck 66',            icon:'🚒' },
  { id:'a61',  name:'Ambo District',unit:'Ambulance 9 · Ambo 17',         icon:'🚑' },
];
const BC_STAFFING_DECISIONS = [
  { id:'reassign', label:'Reassign from neighbouring station', whitfieldDelta:2,  moraleDelta:-2, risk:'LOW' },
  { id:'overtime', label:'Approve overtime coverage',          whitfieldDelta:0,  moraleDelta:2,  risk:'LOW' },
  { id:'short',    label:'Run short-staffed this shift',       whitfieldDelta:-3, moraleDelta:-4, risk:'HIGH', complicationChance:0.4 },
];

// ===== CREW CONFLICT EVENTS (Lieutenant rank) =====
const CREW_CONFLICT_EVENTS = [
  { id:'conflict_bay', title:'Tension in the Apparatus Bay',
    desc:'Ortega and a newer crew member have been at each other for two shifts. The tension is affecting drill performance. As Lieutenant, this is your problem to solve.',
    dialogue:'"LT, you need to deal with this before it becomes a scene problem."',
    choices:[
      { text:'Pull Ortega aside — hear his side privately', effect:{leadership:4,command:2}, whitfieldDelta:2, effectLabel:'+4 Leadership, +2 Command' },
      { text:'Bring both in together — clear it in one conversation', effect:{leadership:5,morale:3}, whitfieldDelta:3, effectLabel:'+5 Leadership, +3 Morale' },
      { text:'Document it and let it work itself out', effect:{reputation:-3,morale:-3}, whitfieldDelta:-2, effectLabel:'−3 Rep, −3 Morale' },
    ]},
  { id:'conflict_veteran', title:'The Veteran and the New Guy',
    desc:'Whitaker has been riding a new hire hard — harder than mentorship, closer to hazing. The new hire came to you.',
    dialogue:'"Lieutenant, I respect Whitaker, but this is making it very hard for me to function."',
    choices:[
      { text:'Talk to Whitaker — privately, directly, now', effect:{leadership:5,reputation:3}, whitfieldDelta:3, effectLabel:'+5 Leadership, +3 Rep' },
      { text:'Acknowledge the new hire\'s progress at morning briefing', effect:{morale:4,leadership:2}, whitfieldDelta:1, effectLabel:'+4 Morale, +2 Leadership' },
      { text:'Let Whitaker\'s style run — it produces results eventually', effect:{reputation:-3,morale:-4}, whitfieldDelta:-1, effectLabel:'−3 Rep, −4 Morale' },
    ]},
  { id:'conflict_whitfield', title:'Kade\'s Concern',
    desc:'Kade pulls you aside. "Two of your people weren\'t coordinating on that last call. That\'s not a call problem — that\'s a command problem. Your command."',
    dialogue:'"Fix it. Before it costs someone."',
    choices:[
      { text:'"I\'ll run targeted team drills and address it head-on."', effect:{leadership:6,command:4}, whitfieldDelta:5, effectLabel:'+6 Leadership, +4 Command' },
      { text:'"It was situational — that call had unusual complexity."', effect:{leadership:-1,command:1}, whitfieldDelta:-2, effectLabel:'−1 Leadership, +1 Command' },
    ]},
];

// ===== HOSPITAL RAPPORT EVENTS (EMS) =====
const EMS_HOSPITAL_EVENTS = {
  critSuccess: { rapportDelta:14, title:'Critical Save', desc:'The attending calls you back after handoff. Patient is stable. "Whatever you did in the field made the difference." Crestbridge rapport increases significantly.' },
  success:     { rapportDelta:7,  title:'Smooth Handoff', desc:'Dr. Choi meets you at the door. "Good package. Good vitals, clear documentation." Clean, professional.' },
  partial:     { rapportDelta:-5, title:'Handoff Friction', desc:'The receiving nurse questions your documentation. "This is incomplete." Not hostile, but it\'s friction.' },
  failure:     { rapportDelta:-13,title:'Difficult Handoff', desc:'The ER team takes over quickly. The attending\'s expression says it. You hear "field management" mentioned. Rapport with Crestbridge takes a significant hit.' },
};

// ===== SORENSEN DEBRIEF RESPONSES =====
const SORENSEN_DEBRIEF = {
  critSuccess:[
    { text:'"That\'s textbook. Remember exactly what you just did — and how you did it."', effect:{knowledge:2,morale:2}, bondDelta:4 },
    { text:'"I don\'t say this often. That was clinical excellence in the field."', effect:{knowledge:3,morale:2}, bondDelta:5 },
  ],
  success:[
    { text:'"Good call. Clean protocol. Patient is in good hands."', effect:{knowledge:1}, bondDelta:2 },
    { text:'"Solid work. There\'s a learning moment on the airway but overall — solid."', effect:{knowledge:2}, bondDelta:2 },
  ],
  partial:[
    { text:'"You missed the capnography check in the field. That\'s a flag. Let\'s walk through it."', effect:{knowledge:3}, bondDelta:1 },
    { text:'"Your assessment was incomplete on step 2. Not dangerous, but in a borderline case it could be."', effect:{knowledge:2,morale:-1}, bondDelta:1 },
  ],
  failure:[
    { text:'"I need you to be honest with me — what happened? Walk me through your thinking."', effect:{knowledge:2,morale:-2}, bondDelta:0 },
    { text:'"That can\'t happen again. So let\'s figure out why it did."', effect:{knowledge:3,morale:-3}, bondDelta:-1 },
  ],
};

// ===== CIVIL SERVICE EXAM QUESTION BANKS =====
// Each question: { q, options:[a,b,c,d], correct: 0-3 index }
const EXAM_QUESTIONS = {
  driver_engineer: [
    { q:'What is the primary purpose of pre-shift apparatus inspection?', options:['Satisfy insurance requirements','Ensure equipment is serviceable and ready for response','Fill time between calls','Check mileage for fleet management'], correct:1 },
    { q:'A centrifugal fire pump operates on what principle?', options:['Positive displacement','Rotational force converting velocity to pressure','Vacuum suction from the tank','Gravity feed from elevated tank'], correct:1 },
    { q:'When drafting from a static water source, the maximum practical lift is approximately:', options:['5 feet','10 feet','22 feet (practical lift limit)','40 feet'], correct:2 },
    { q:'The function of a pressure relief valve on a pump panel is to:', options:['Increase pressure during high-flow operations','Prevent dangerous pressure build-up when flow is restricted','Open the tank-to-pump valve automatically','Signal a system overheat condition'], correct:1 },
    { q:'During aerial operations, the rated capacity of a ladder changes when:', options:['The ladder is extended beyond 70%','The ladder is elevated above 70° or extended beyond rated length','Wind exceeds 10 mph','The outriggers are on soft ground only'], correct:1 },
    { q:'Water hammer in a hoseline is caused by:', options:['Operating nozzle at maximum pressure','Sudden closure of a nozzle causing pressure surge','Frozen water in the line','Air pocket in the pump discharge'], correct:1 },
    { q:'An apparatus fuel tank reading at 1/4 before shift should be:', options:['Noted in the log and left for the next crew','Refuelled before the shift begins','Reported to the Lieutenant only','Topped up after the first call'], correct:1 },
    { q:'The purpose of the intake relief valve on an apparatus is:', options:['To prevent damage from excessive hydrant pressure','To open when the pump overheats','To balance pressure between engine and pump','To limit outflow rate'], correct:0 },
    { q:'SCBA cylinders must be replaced when pressure drops below what percentage of rated capacity?', options:['75%','50%','25%','10%'], correct:2 },
    { q:'The tank-to-pump valve should be in what position during non-emergency operations?', options:['Fully open','Fully closed','Half open','Open only during winter'], correct:1 },
    { q:'Hydraulic calculations show a friction loss of 10 psi per 100 feet of 2½-inch hose flowing 250 gpm. What is the pump discharge pressure for 300 feet of hose with a nozzle pressure of 100 psi?', options:['100 psi','130 psi','130 psi with 30 psi elevation correction','130 psi (friction) + 100 psi (nozzle) = 130 psi'], correct:1 },
    { q:'A pre-trip inspection defect that affects safe operation of the apparatus must be:', options:['Noted in the log only','Repaired before the apparatus is placed in service','Reported to dispatch and logged','Evaluated by the battalion chief before any action'], correct:1 },
    { q:'The maximum safe speed for an aerial device when rotating is:', options:['1 revolution per minute','Slow and controlled — determined by conditions and load','5 mph','Full speed at all times'], correct:1 },
    { q:'During a vehicle fire involving an alternative fuel system, the first action is:', options:['Apply CO2 immediately','Identify the fuel type and hazards before committing','Foam application from 50 feet','Request HazMat and stand by'], correct:1 },
    { q:'Pump cavitation is caused by:', options:['Insufficient water supply to the pump','Excessive discharge pressure','Running the pump in reverse','A blocked pressure gauge'], correct:0 },
  ],

  lieutenant: [
    { q:'RECEO-VS is a fireground priority acronym. What does the correct order stand for?', options:['Rescue, Entry, Contain, Evaluate, Overhaul, Vent, Salvage','Rescue, Exposures, Confinement, Extinguishment, Overhaul, Ventilation, Salvage','Response, Entry, Command, Exposure, Operations, Vent, Safety','Rescue, Evaluation, Containment, Exit, Overhaul, Vent, Structure'], correct:1 },
    { q:'Under NFPA 1710, what is the minimum crew size for an initial interior structural fire attack?', options:['Two personnel (1+1)','Four personnel (2 in, 2 out minimum)','Three personnel with one outside','Six personnel total on scene'], correct:1 },
    { q:'The two-in, two-out rule is REQUIRED when:', options:['Any time a fire building is entered','An interior attack begins on a structure fire where the fire is not in the incipient stage','Conducting overhaul operations','Entering during a mass casualty event'], correct:1 },
    { q:'Flashover is defined as:', options:['Ignition of flammable gases near the ceiling','The near-simultaneous ignition of most of the combustible material in a compartment','A backdraft caused by fresh air introduction','Rapid extension of fire through concealed spaces'], correct:1 },
    { q:'What does LUNAR stand for in a Mayday transmission?', options:['Location, Unit, Name, Assignment, Resources needed','Location, Unit, Name, Air supply, Resources needed','Last known location, Unit, Name, Air, Radio channel','Location, Urgency level, Name, Assignment, Resources'], correct:1 },
    { q:'A thermal imaging camera displaying consistently black (cold) walls and ceiling at a working structure fire likely indicates:', options:['The fire is knocked and conditions are improving','Extreme heat absorption — potential structural failure imminent','Normal TIC reading during overhaul','Smoke density blocking the sensor'], correct:1 },
    { q:'When should an officer initiate withdrawal from an interior attack?', options:['Only when commanded by the Incident Commander','When structural integrity is in doubt, conditions deteriorate, or an emergency signal activates','After 20 minutes regardless of conditions','Only when a Mayday has been transmitted'], correct:1 },
    { q:'The primary purpose of ventilation on a working structure fire is:', options:['To cool firefighters inside','Remove heat and smoke to support suppression and search','Allow the fire to burn more freely for faster knockdown','Required by OSHA before any interior entry'], correct:1 },
    { q:'ICS requires all resources at an incident to operate under a single individual called the:', options:['Emergency Manager','Incident Commander','Operations Section Chief','Unified Command Lead'], correct:1 },
    { q:'In a high-rise fire, at what floor should the staging area be established?', options:['Same floor as the fire','One floor below the fire (or two floors in some protocols)','Ground floor only','Two floors above the fire'], correct:1 },
    { q:'IDLH stands for:', options:['Immediately Dangerous to Life or Health','Initial Dispatch Limit for Hazmat','Incident Data Log and Hazard','Internal Dispatch and Lighting Hazard'], correct:0 },
    { q:'A fire officer at a structure fire hears a hollow sound when tapping the floor. The correct action is:', options:['Continue operations — this is normal','Mark the area, alert crew, and evaluate structural stability before proceeding','Call for building plans immediately','Evacuate all personnel from the structure'], correct:1 },
    { q:'The purpose of a Rapid Intervention Team (RIT) is:', options:['Assist with overhaul after fire knockdown','Stand ready to rescue firefighters in distress','Conduct secondary search on upper floors','Manage scene perimeter and staging'], correct:1 },
    { q:'What is the correct radio term when all units on a channel should stand by?', options:['"All units hold","Break break break" (emergency only)','Depends on department SOP — typically "All stations stand by"','No standard term — use plain language'], correct:2 },
    { q:'"Risk a lot to save a life. Risk a little to save property. Risk nothing to save what is already lost." This principle guides:', options:['Resource allocation on large fires','Go/no-go decisions for interior attack','Evacuation sequencing','Mutual aid requests'], correct:1 },
  ],

  captain: [
    { q:'ICS Unified Command is used when:', options:['The incident is in two political jurisdictions','Multiple agencies with jurisdictional authority or functional responsibility share command','A single IC needs more than one Operations Section Chief','The IC is relieved'], correct:1 },
    { q:'The span of control in ICS recommends how many reporting elements per supervisor?', options:['2-3','3-7 (optimal 5)','8-10','Unlimited during major incidents'], correct:1 },
    { q:'A Captain receives a AFD directive that conflicts with an established safe practice. The correct first action is:', options:['Implement it immediately — directives supersede practice','Document the conflict and raise it through the chain of command','Refuse and report to IAFF','Implement a modified version without disclosure'], correct:1 },
    { q:'Monthly incident report review is the Captain\'s responsibility primarily to:', options:['Satisfy documentation requirements','Identify patterns, safety issues, and training needs','Provide data for union negotiations','Meet minimum NFPA 1 requirements'], correct:1 },
    { q:'At a 2nd alarm fire, when does the IC transfer command?', options:['Automatically when the 2nd alarm is struck','When a higher-ranking officer arrives and briefing is completed (formal transfer)','Only when the original IC is injured','Never — original IC retains command throughout'], correct:1 },
    { q:'The National Incident Management System (NIMS) requires all personnel to:', options:['Complete IS-100 only','Be certified to ICS-400 level minimum','Complete appropriate ICS training for their role','Attend quarterly in-person NIMS refreshers'], correct:2 },
    { q:'A Captain notices a crew member is consistently performing below standard for three shifts. The correct action is:', options:['Immediately file a disciplinary report','Document observations and initiate a performance counseling conversation','Notify the union first','Reassign the member to a less critical role'], correct:1 },
    { q:'During multi-company operations, the term "freelancing" refers to:', options:['A company operating without radio contact','Individual units taking actions outside their assigned role without notification','Companies self-dispatching to mutual aid','Officers making tactical decisions without consulting the IC'], correct:1 },
    { q:'Under the AFD collective bargaining agreement, a mandatory overtime denial can be grieved when:', options:['The member has worked more than 40 hours in a week','The overtime was improperly assigned without following seniority order','The member prefers a different station','The overtime is for a non-emergency event'], correct:1 },
    { q:'A post-incident analysis (hot debrief) should occur:', options:['48 hours after the incident when reports are complete','Immediately or shortly after the incident, while information is fresh','Only after major incidents (3rd alarm or above)','Only when a firefighter was injured'], correct:1 },
    { q:'The Incident Action Plan (IAP) for a complex incident should include:', options:['Only radio frequencies and resource lists','Incident objectives, strategies, tactics, risk management, and safety message','A list of all mutual aid resources available','Detailed building construction reports'], correct:1 },
    { q:'A new AFD policy requires a change in SOP that an experienced Captain believes reduces safety. The strongest action within the chain of command is:', options:['Implement unchanged and comply fully','File a written objection with supporting documentation through the chain','Quietly use the old SOP and document compliance','Notify media of the unsafe directive'], correct:1 },
    { q:'The primary responsibility of the Safety Officer on scene is:', options:['Monitor firefighter fatigue and hydration','Identify and communicate hazardous conditions and have authority to stop unsafe operations','Manage accountability of all personnel','Coordinate with the Medical Unit Leader'], correct:1 },
    { q:'Which resource request triggers automatic NIMS multi-agency coordination?', options:['Any incident above 1st alarm','Declaration of a local emergency by the incident commander','Any request for mutual aid resources that exceeds local capability','Only Tier 4 or higher incidents'], correct:2 },
    { q:'The AFD Personnel Accountability System (PAS) requires:', options:['Radio check-ins every 10 minutes','All entry personnel to be logged by name, company, and location before entry','A roster submitted to dispatch at shift start','Division supervisors to track individuals by radio only'], correct:1 },
  ],

  battalion_chief: [
    { q:'The BC\'s primary responsibility at a major incident is:', options:['Direct interior suppression operations','Command — set objectives, manage strategies, and allocate resources across the incident','Perform size-up on behalf of the IC','Coordinate with the Safety Officer'], correct:1 },
    { q:'Budget authority at the battalion level typically covers:', options:['Capital equipment purchases','Overtime, training costs, and minor equipment maintenance within district budget','Full apparatus replacement decisions','Personnel hiring and promotion'], correct:1 },
    { q:'A BC receives a press inquiry about a recent major incident. Without PIU clearance, the correct response is:', options:['Provide a full factual account immediately','Decline comment and refer to the AFD Public Information Unit','Confirm only basic facts: type of incident and outcome','Provide written statement only'], correct:1 },
    { q:'When two simultaneous incidents occur in the district, the BC\'s first action is:', options:['Respond personally to the higher-priority incident','Assign companies, assess resource balance, and determine if mutual aid is needed','Request a third alarm immediately','Elevate both incidents to city-wide command'], correct:1 },
    { q:'A district staffing shortage means running a company below minimum staffing. The BC\'s required action per AFD policy is:', options:['Run short — no action needed if IC approves','Document the shortage, notify affected unit, and implement a coverage plan (OT, recall, or mutual aid)','Immediately place the company out of service','Merge companies temporarily without documentation'], correct:1 },
    { q:'The BC conducts a Captain\'s quarterly performance review. A critical review should include:', options:['Verbal feedback only','Specific documented observations with improvement expectations and follow-up timeline','A union representative at all times','Only positive observations to maintain morale'], correct:1 },
    { q:'Legacy in the BC role is best measured by:', options:['Number of calls commanded','Number of protégés promoted, policies influenced, and major incidents successfully managed','Budget savings achieved','Years of service at rank'], correct:1 },
    { q:'Under NIMS, the BC acting as Incident Commander must transfer command when:', options:['A higher-ranking officer appears on scene','A higher-ranking officer arrives, has been briefed, and formally assumes command','The incident is upgraded to 3rd alarm','30 minutes after initial dispatch'], correct:1 },
    { q:'The BC is responsible for ensuring district training meets:', options:['Only AFD minimum hours','NFPA 1500, OSHA 29 CFR 1910.156, and AFD annual training requirements','State requirements only','Whatever the individual Captains determine is adequate'], correct:1 },
    { q:'A city council member contacts the BC directly about a noisy drill complaint. The correct response is:', options:['Cease the drill immediately','Explain the purpose and legal authority for training, offer scheduling accommodation, and report the contact upward','Ignore — council members have no authority over AFD operations','Refer entirely to the Fire Commissioner\'s office'], correct:1 },
    { q:'The IC-initiated "Operational Pause" on a major fire is used to:', options:['Allow firefighters a mandatory rest break','Reset tactical objectives, reassess conditions, and ensure all companies are accounted for','Signal a defensive transition automatically','Notify dispatch of resource changes'], correct:1 },
    { q:'Multi-jurisdictional mutual aid for a major incident is governed primarily by:', options:['Verbal agreement between BCs at the scene','Pre-existing mutual aid agreements (MABAS or equivalent) with formal activation protocols','Any senior officer\'s request','City Manager authorization required in advance'], correct:1 },
    { q:'The district BC\'s role in union grievance processes is:', options:['Adjudicate all grievances at Step 1','Receive and respond to Step 1 or Step 2 grievances as defined by the CBA','Have no involvement — handled by HR only','Dismiss grievances below Captain rank'], correct:1 },
    { q:'An "after-action review" (AAR) at the battalion level serves to:', options:['Assign blame for errors on scene','Document lessons learned and improvement opportunities for training and policy revision','Satisfy OSHA post-incident documentation requirements only','Provide data for union contract negotiations'], correct:1 },
    { q:'The BC\'s legacy score reflects long-term impact. Which of the following most directly builds legacy?', options:['Completing all documentation on time','Successfully developing officers who are later promoted and citing the BC\'s mentorship','Never having a major injury under your command','Reaching 20 years at rank'], correct:1 },
  ],
};

// ===== ORAL BOARD SCENARIOS =====
const ORAL_BOARD_SCENARIOS = {
  driver_engineer: [
    { panelist:'Lt. Kessler', question:'You arrive at a structure fire and your pump primes but pressure reads erratically — it\'s fluctuating 20-40 psi. You have 4 firefighters ready to advance. What do you do?',
      choices:[
        { text:'Switch to tank water and attack while flagging the gauge issue for post-incident maintenance', stat:'knowledge', score:2 },
        { text:'Halt the advance, troubleshoot the pump (check relief valve, tank-to-pump valve, throttle), and radio the condition before committing crew', stat:'knowledge', score:3 },
        { text:'Request mutual aid for an alternate water supply and hold until resolved', stat:'leadership', score:1 },
      ]},
    { panelist:'Chief Kade', question:'During a pre-shift inspection you find the aerial has a hydraulic fluid leak near the base of the turntable. What happens next?',
      choices:[
        { text:'Note it in the log and continue the shift — small leak, marginal risk', stat:'knowledge', score:0 },
        { text:'Place the aerial out of service, notify the Lieutenant, submit a maintenance request, and document the defect', stat:'reputation', score:3 },
        { text:'Clean the leak and monitor it through the shift', stat:'morale', score:1 },
      ]},
    { panelist:'Deputy District Chief', question:'You\'re pumping a 2.5-inch line to Engine 12\'s nozzle team on the 3rd floor of a structure fire. The Lieutenant calls for more pressure — but your discharge gauge is already at 180 psi. What do you do?',
      choices:[
        { text:'Increase throttle — the Lieutenant knows what they need', stat:'physical', score:1 },
        { text:'Radio back your current discharge pressure and ask the nozzle team to verify their reading before exceeding pump limits', stat:'knowledge', score:3 },
        { text:'Shut down and request a pressure test', stat:'knowledge', score:0 },
      ]},
  ],

  lieutenant: [
    { panelist:'Chief Kade', question:'You arrive first due at a 2-story residential with heavy smoke from a first floor window. You have Engine 12 with 3 firefighters. No other units are on scene. What are your first three actions?',
      choices:[
        { text:'Mask up and advance an attack line immediately with all 3 firefighters', stat:'physical', score:1 },
        { text:'Establish command, conduct a 360 size-up, verify water supply, and position Engine 12 — advance with 2 in, 1 out (establish 2-in/2-out before interior entry)', stat:'knowledge', score:3 },
        { text:'Stage until a second unit arrives before any action', stat:'knowledge', score:1 },
      ]},
    { panelist:'Captain Delgado', question:'A firefighter under your command has been arriving 5-10 minutes late to briefing for the last three shifts. How do you handle it?',
      choices:[
        { text:'Address it publicly at the next briefing as a general reminder to the crew', stat:'leadership', score:1 },
        { text:'Pull the firefighter aside privately — document the conversation, clarify expectations, and establish a follow-up plan', stat:'leadership', score:3 },
        { text:'File formal discipline immediately — three strikes', stat:'reputation', score:0 },
      ]},
    { panelist:'District Chief', question:'You\'re at an active structure fire and a bystander reports there may be a person trapped on the second floor. Your 2-in/2-out crew is committed on the first floor and conditions are rapidly deteriorating. What do you do?',
      choices:[
        { text:'Send one firefighter from your current team to the second floor while maintaining partial 2-in/2-out compliance', stat:'physical', score:1 },
        { text:'Immediately radio for additional resources, consider a transitional attack to buy time, and coordinate the search with the incoming company — do not split the committed interior team', stat:'knowledge', score:3 },
        { text:'Withdraw all interior crews and conduct an exterior search from ladders', stat:'morale', score:1 },
      ]},
  ],

  captain: [
    { panelist:'Chief Kade', question:'A Lieutenant under your command is technically sound but struggles to communicate decisions to their crew — resulting in delays on scene. How do you develop them?',
      choices:[
        { text:'Transfer them to a quieter house where communication demands are lower', stat:'leadership', score:0 },
        { text:'Conduct regular one-on-ones, assign mentoring scenarios, observe their briefings and provide specific feedback, set a 60-day improvement timeline', stat:'command', score:3 },
        { text:'Document the issue and refer to HR for leadership assessment', stat:'reputation', score:1 },
      ]},
    { panelist:'Deputy Commissioner', question:'A civilian complaint is filed against a firefighter on your company, alleging unprofessional conduct at a call. You weren\'t present. What steps do you take?',
      choices:[
        { text:'Dismiss it — you trust your crew\'s professionalism', stat:'morale', score:0 },
        { text:'Take the complaint seriously: notify the member, collect statements from all crew who were present, review the incident report, and respond to the complaint through proper channels', stat:'command', score:3 },
        { text:'Refer it directly to Internal Affairs without investigation at your level', stat:'reputation', score:1 },
      ]},
    { panelist:'Chief Kade', question:'You receive a AFD directive to reduce apparatus response times by 15% or face district metrics scrutiny. You believe the current times reflect appropriate safety protocols. What do you do?',
      choices:[
        { text:'Implement the directive immediately and adjust crew routines to hit the number', stat:'morale', score:1 },
        { text:'Analyze current response data, document safety-relevant protocols that affect time, and present a formal response to the directive proposing modifications that protect both metrics and safety', stat:'command', score:3 },
        { text:'Ignore the directive — safety is non-negotiable and command will understand', stat:'knowledge', score:0 },
      ]},
  ],

  battalion_chief: [
    { panelist:'Fire Commissioner', question:'A major incident in your district is drawing media attention. The incident Commander — one of your Captains — is overwhelmed and command is degrading. What do you do?',
      choices:[
        { text:'Step in immediately and take command without formal transfer — time is critical', stat:'physical', score:1 },
        { text:'Observe for 60 seconds, brief yourself on the situation, formally assume command from the Captain, and communicate the transfer to all units on the air', stat:'command', score:3 },
        { text:'Coach the Captain from the perimeter via radio without assuming command', stat:'leadership', score:1 },
      ]},
    { panelist:'Deputy Mayor', question:'Your district has two simultaneous incidents — a 2nd alarm structure fire and a multi-vehicle accident with entrapments. You have adequate companies for one. What is your immediate decision?',
      choices:[
        { text:'Commit all resources to the structure fire — life risk is highest','stat':'physical', score:1 },
        { text:'Assess life risk at both incidents, assign resources proportionally, immediately request mutual aid to fill the gap, and position yourself at the higher-complexity incident', stat:'command', score:3 },
        { text:'Respond personally to the MVA and delegate the structure fire to the arriving Captain', stat:'leadership', score:1 },
      ]},
    { panelist:'Chief Kade', question:'A Captain in your district has built strong loyalty with their crew but consistently underperforms on documentation and post-incident reporting. How do you address this over the next quarter?',
      choices:[
        { text:'Transfer the Captain to address the problem indirectly', stat:'morale', score:0 },
        { text:'Set clear, documented expectations with timelines; provide a documentation mentor; conduct quarterly check-ins; make it clear this is a promotion-track requirement, not optional', stat:'command', score:3 },
        { text:'Accept the trade-off — strong crew leader is more valuable than paperwork', stat:'knowledge', score:1 },
      ]},
  ],
};

// ===== VACANCY STORY EVENTS =====
const VACANCY_STORIES = [
  { id:'lt_promoted', label:'Lieutenant promoted',
    story:'Lieutenant Whitaker has been promoted to Captain. A vacancy has opened on Engine 12.',
    ceremony:'Chief Kade calls you into his office. Whitaker\'s chair at the officer\'s desk is empty. "Whitaker earned this. And now this company needs someone to hold what he built. I think that\'s you."',
    company:'Engine 12', departer:'Whitaker', departureNote:'Whitaker shakes your hand before he leaves. "Don\'t let them get sloppy on the line." He means it as the highest compliment possible.' },
  { id:'lt_transferred', label:'Lieutenant transferred',
    story:'Lieutenant Delgado has accepted a transfer to Battalion 9. A Lieutenant slot has opened on Truck 7.',
    ceremony:'Delgado finds you in the apparatus bay the night before he leaves. "I told Kade you were ready before he asked me. Keep the company together. That\'s the job." He hands you his old tactical binder.',
    company:'Truck 7', departer:'Delgado', departureNote:'The crew lines up quietly to say goodbye to Delgado. You\'ll fill his shoes. That\'s the hardest thing anyone has ever asked you to do.' },
  { id:'assigned_new', label:'Assigned to new company',
    story:'A Lieutenant vacancy exists at Squad 4. Chief Kade has recommended you for the assignment.',
    ceremony:'Kade\'s office. "You\'re not taking over someone\'s house. You\'re being given one to build. Squad 4 is a high-standard company. You go in there and set the tone from day one." He pins the badge himself.',
    company:'Squad 4', departer:null, departureNote:'Your old crew lines up at the apparatus bay when you leave. Ortega nods. Kessler raises one hand. That\'s it. That\'s everything.' },
];

// ===== LT OFFICER ROOM CONFIGURATIONS =====
const OFFICER_ROOM_CONFIGS = {
  lieutenant: [
    { elemId:'room-drill',    action:'lt_drill',      icon:'🏋️', name:'Company Drill',     sub:'Lead Your Crew' },
    { elemId:'room-gym',      action:'lt_inspection', icon:'🔍', name:'Equipment Check',   sub:'Inspect Gear' },
    { elemId:'room-kitchen',  action:'lt_briefing',   icon:'📋', name:'Shift Briefing',    sub:'Captain / House' },
    { elemId:'room-office',   action:'lt_shiftlog',   icon:'📝', name:'Shift Log',         sub:'Write Report' },
    { elemId:'room-bunkroom', action:'lt_counsel',    icon:'👤', name:'Crew Room',          sub:'Counsel Member' },
  ],
  captain: [
    { elemId:'room-drill',    action:'lt_drill',      icon:'🏋️', name:'Company Drill',     sub:'Command Drill' },
    { elemId:'room-gym',      action:'lt_inspection', icon:'🔍', name:'Equipment Check',   sub:'Full Inspection' },
    { elemId:'room-kitchen',  action:'cap_briefing',  icon:'📡', name:'District Briefing', sub:'Command Update' },
    { elemId:'room-office',   action:'lt_shiftlog',   icon:'📝', name:'Shift Reports',     sub:'Review & Sign' },
    { elemId:'room-bunkroom', action:'lt_counsel',    icon:'👤', name:'Officer Room',       sub:'LT Review' },
  ],
  battalion_chief: [
    { elemId:'room-drill',    action:'lt_drill',      icon:'🏋️', name:'District Drill',    sub:'Command Training' },
    { elemId:'room-gym',      action:'lt_inspection', icon:'🔍', name:'Station Inspection',sub:'District Review' },
    { elemId:'room-kitchen',  action:'bc_briefing',   icon:'📡', name:'Command Briefing',  sub:'City/District' },
    { elemId:'room-office',   action:'lt_shiftlog',   icon:'📝', name:'Command Reports',   sub:'District Reports' },
    { elemId:'room-bunkroom', action:'bc_legacy',     icon:'⭐', name:'Command Office',     sub:'Legacy Actions' },
  ],
};

// ===== DRILL TYPES (LT company drill) =====
const DRILL_TYPES = [
  { id:'hose_ops',  label:'Hose Operations',       icon:'🚿', effect:{physical:4,knowledge:2}, crewBonus:{morale:2},  desc:'Deploy and advance attack lines. Speed and coordination drill.' },
  { id:'search',    label:'Search & Rescue',        icon:'🔦', effect:{physical:3,knowledge:3}, crewBonus:{morale:3},  desc:'Primary and secondary search patterns. SCBA use under stress.' },
  { id:'scba',      label:'SCBA & Donning',         icon:'🧥', effect:{knowledge:4,physical:2}, crewBonus:{morale:2},  desc:'Full donning sequence under time pressure. SCBA confidence.' },
  { id:'forcible',  label:'Forcible Entry',         icon:'🔨', effect:{physical:5,knowledge:2}, crewBonus:{morale:3},  desc:'Inward and outward opening doors, breaching walls, through-the-lock.' },
  { id:'ems_triage',label:'EMS & Triage',           icon:'🏥', effect:{knowledge:4,morale:2},   crewBonus:{morale:3},  desc:'Patient packaging, triage categories, Ambo coordination.' },
  { id:'hazmat',    label:'HazMat Awareness',       icon:'☢️', effect:{knowledge:5,physical:1}, crewBonus:{knowledge:2},desc:'ERG reference, level B PPE, decon line setup.' },
];

// ===== BC LEGACY EVENTS =====
const BC_LEGACY_EVENTS = [
  { id:'policy_comply', title:'New AFD Policy Directive', icon:'📑',
    desc:'A new AFD directive comes down that contradicts what you know to be good practice. Your district commanders are looking to you.',
    choices:[
      { text:'Comply fully — implement as directed', legacyDelta:-2, whitfieldDelta:3, moraleDelta:-5, label:'Safe but morale drops' },
      { text:'Push back through official channels', legacyDelta:3, whitfieldDelta:-3, moraleDelta:2, label:'Risky, builds district trust' },
      { text:'Quietly implement a modified version', legacyDelta:1, whitfieldDelta:0, moraleDelta:1, label:'Middle ground, small risk' },
    ]},
  { id:'press_conference', title:'High-Profile Incident Press Conference', icon:'🎤',
    desc:'After a major incident, you\'re the face of AFD for the press. Camera lights. Questions. Expectations.',
    choices:[
      { text:'Transparent — tell the full story', legacyDelta:5, whitfieldDelta:2, publicDelta:8, label:'Builds long-term trust' },
      { text:'Reassuring — focus on what went right', legacyDelta:2, whitfieldDelta:1, publicDelta:4, label:'Safe, positive spin' },
      { text:'Deflect — refer to ongoing investigation', legacyDelta:-1, whitfieldDelta:-1, publicDelta:-3, label:'Avoids controversy' },
    ]},
  { id:'mentor_captain', title:'Mentor Your Captain', icon:'🎓',
    desc:'One of your Captains is struggling with the transition into command. You can take time to mentor them.',
    choices:[
      { text:'Regular one-on-one sessions', legacyDelta:6, commandDelta:4, label:'+6 Legacy, +4 Command (takes 1 action)' },
      { text:'Let them find their own way', legacyDelta:0, commandDelta:0, label:'No cost, no gain' },
    ]},
];
