// ===== CAREER CONFIGURATION =====
import { ROSTER } from '../data/roster.js';

export const BACKGROUNDS = {
  military: { name:'Military Veteran',    stats:{physical:10,knowledge:0, morale:0, reputation:0, leadership:5, command:0} },
  emt:      { name:'EMT / Paramedic',     stats:{physical:0, knowledge:10,morale:5, reputation:0, leadership:0, command:0} },
  athlete:  { name:'Collegiate Athlete',  stats:{physical:12,knowledge:0, morale:3, reputation:0, leadership:0, command:0} },
  civilian: { name:'Civilian',            stats:{physical:5, knowledge:5, morale:5, reputation:5, leadership:5, command:5} },
};

export const BASE_STATS = { physical:30, knowledge:30, morale:40, reputation:20, leadership:20, command:10 };

export const STAT_COLORS = {
  physical:'#ef4444', knowledge:'#3b82f6', morale:'#22c55e',
  reputation:'#a855f7', leadership:'#f59e0b', command:'#ec4899',
};

// Suppression track ranks (index 0 = academy, index 1 = first shift rank)
export const RANKS = [
  { id:'candidate',       label:'Academy Candidate',        thresholds:null, callsRequired:0 },
  { id:'probie',          label:'Probationary Firefighter', thresholds:{physical:42,knowledge:38,morale:38}, callsRequired:4 },
  { id:'firefighter',     label:'Firefighter',              thresholds:{physical:52,knowledge:48,leadership:35}, callsRequired:12 },
  { id:'driver_engineer', label:'Driver Engineer',          thresholds:{physical:65,knowledge:62}, callsRequired:22 },
  { id:'lieutenant',      label:'Lieutenant',               thresholds:{physical:58,knowledge:65,leadership:55,reputation:55}, callsRequired:35 },
  { id:'captain',         label:'Captain',                  thresholds:{knowledge:75,leadership:70,command:60,reputation:80}, callsRequired:65 },
  { id:'battalion_chief', label:'Battalion Chief',          thresholds:{physical:75,knowledge:80,leadership:80,command:75,reputation:80,morale:65}, callsRequired:120 },
];

export const EMS_RANKS = [
  { id:'ems_candidate', label:'Paramedic Candidate',  thresholds:null, callsRequired:0 },
  { id:'paramedic',     label:'Paramedic',            thresholds:{knowledge:48,morale:38}, callsRequired:5 },
  { id:'pic',           label:'Paramedic in Charge',  thresholds:{knowledge:62,leadership:48,reputation:52}, callsRequired:22 },
  { id:'field_chief',   label:'Paramedic Field Chief', thresholds:{knowledge:76,leadership:62,command:52,reputation:72}, callsRequired:55 },
];

export const PROMOTION_DATA = {
  probie: {
    title:'PROBATIONARY FIREFIGHTER',
    desc:'You have completed your initial evaluation period. BC Kade signs off your probie review. "You met the standard. Now set a higher one." Your probie evaluation bar is removed. You\'re a firefighter.',
    unit:'Suppression operations — Engine 12 or Truck 7.'
  },
  firefighter: {
    title:'FIREFIGHTER',
    desc:'"Firefighter." Delgado says it like it means something, because it does. You\'ve put in the calls and the work. Whitaker shakes your hand. "You\'re one of us now. Act like it." Choose your specialist path.',
    unit:'Specialist training available — Rescue, HazMat, or Aerial Operations.'
  },
  driver_engineer: {
    title:'DRIVER ENGINEER',
    desc:'Kade hands you the apparatus key personally. "The rig is your responsibility. The pump is your responsibility. Everyone on that rig is your responsibility." Pre-shift apparatus checks are now mandatory.',
    unit:'You operate the apparatus. Pre-shift checks begin each shift.'
  },
  lieutenant: {
    title:'LIEUTENANT',
    desc:'"You\'ve earned this," Kade says, holding out the badge. "It means more responsibility, more weight, and more accountability. I wouldn\'t be giving it to you if I didn\'t believe you were ready." Kessler gives you the nod. You\'ve crossed a line you can\'t come back from — and that\'s exactly where you want to be.',
    unit:'You are now eligible to request a unit transfer — Truck 7, Squad 4, or Engine 12.'
  },
  captain: {
    title:'CAPTAIN',
    desc:'"Captain." The word sounds different when Kade says it about you. Delgado shakes your hand. The crew lines up — not because they were told to, but because they wanted to. You feel the weight of command settle onto your shoulders. It fits.',
    unit:'You take command of your apparatus. Morning AFD briefings are now part of your shift.'
  },
  battalion_chief: {
    title:'BATTALION CHIEF',
    desc:'"Battalion 6." The final rank. Deputy Commissioner Kade pins the bugles himself — he makes an exception for 12. "I\'ve watched you become a firefighter, an officer, and now a chief. This house — these people — they\'re yours to lead. Don\'t let them down." You don\'t plan to.',
    unit:'You command all units of Firehouse 12. District staffing and budget are your responsibility.'
  },
  paramedic: {
    title:'PARAMEDIC',
    desc:'Priya says it simply: "Welcome to ALS." Your NREMT license is active. You\'re a certified Paramedic. The hospital rapport system is now live — how you treat Crestbridge Medical matters from this point forward.',
    unit:'Ambulance 9 — Advanced Life Support certified.'
  },
  pic: {
    title:'PARAMEDIC IN CHARGE',
    desc:'Field Chief hands you the PIC designation. "You\'re running the ambo now. Every patient, every decision — yours." Priya smiles. "I knew you\'d get here. Don\'t make me regret it."',
    unit:'Paramedic in Charge — you train the next candidate.'
  },
  field_chief: {
    title:'PARAMEDIC FIELD CHIEF',
    desc:'The EMS pinnacle. You command EMS operations across the district — multiple ambos, resource allocation, hospital relations, and MCI command. Priya attends your pinning ceremony. She doesn\'t say anything. She doesn\'t need to.',
    unit:'You command district EMS operations.'
  },
};

export function createDefaultState(name, background, track) {
  const bg = BACKGROUNDS[background];
  const stats = {};
  for (const k of Object.keys(BASE_STATS)) stats[k] = Math.min(100, BASE_STATS[k] + (bg.stats[k] || 0));
  return {
    name, background, track: track || 'suppression',
    rankIndex: 0, unit: null,
    stats, whitfieldTrust: 50,
    roster: ROSTER.map(r => ({ ...r })),
    crewStates: {}, shiftsWithoutMeal: 0,
    phase: 'academy', academyWeek: 1,
    shiftNumber: 1, actionsRemaining: 3,
    totalCalls: 0, consecutiveFailures: 0,
    lastCallOutcome: null, shiftLog: [], careerLog: [],
    statDeltas: {}, shiftCallOutcomes: [],
    currentComplications: [],
    probieScore: 0, probieWeek: 1, probieReviewCount: 0,
    specialist: null, specialistChosen: false,
    hospitalRapport: 50,
    legacyScore: 0,
    shiftTone: null, emsDebriefMissed: 0,
    examEligible: false, examTargetRank: null,
    examReadiness: 0, examResult: null,
    eligibilityRank: null, vacancyCountdown: null,
    examFailCount: 0, examCooldown: 0,
    officerCompany: null,
    firedGuestEvents: [],
    shadowCrewId: null,
  };
}
