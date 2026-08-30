// ===== PROGRESSION SYSTEM DATA =====

export const OFFICER_ROOM_CONFIGS = {
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
    { elemId:'room-gym',      action:'lt_inspection', icon:'🔍', name:'Station Inspection', sub:'District Review' },
    { elemId:'room-kitchen',  action:'bc_briefing',   icon:'📡', name:'Command Briefing',  sub:'City/District' },
    { elemId:'room-office',   action:'lt_shiftlog',   icon:'📝', name:'Command Reports',   sub:'District Reports' },
    { elemId:'room-bunkroom', action:'bc_legacy',     icon:'⭐', name:'Command Office',     sub:'Legacy Actions' },
  ],
};

export const PROBIE_TASKS = [
  { id:'clean_rig',      text:'Clean the apparatus — engine bay and cab',      icon:'🚒', stat:'reputation', delta:2 },
  { id:'stock_gear',     text:'Stock and check all SCBA and PPE inventories',  icon:'🧥', stat:'knowledge',   delta:2 },
  { id:'cook_meal',      text:'Cook crew breakfast before roll call',           icon:'🍳', stat:'morale',      delta:3 },
  { id:'check_equip',    text:'Log equipment inventory — report discrepancies', icon:'📋', stat:'knowledge',   delta:2 },
  { id:'clean_quarters', text:'Clean quarters and bunk area',                   icon:'🧹', stat:'reputation',  delta:1 },
];

export const SPECIALIST_TRAINING_OPTIONS = [
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

export const APPARATUS_CHECK_ITEMS = [
  { id:'fuel',  label:'Fuel Level',            icon:'⛽', faultChance:0.18, faultDesc:'Tank reading 1/4 — needs immediate refuel before dispatch.' },
  { id:'water', label:'Water Tank & Valves',   icon:'💧', faultChance:0.14, faultDesc:'Tank valve partially closed. Pressure drop risk on scene.' },
  { id:'pump',  label:'Pump Panel & Gauges',   icon:'🔧', faultChance:0.20, faultDesc:'Pressure gauge reading erratic — calibration needed.' },
  { id:'hose',  label:'Hose Pack & Couplings', icon:'🚿', faultChance:0.12, faultDesc:'Hose coupling crossthreaded on bay 2. Swap before dispatch.' },
  { id:'scba',  label:'SCBA & PPE',            icon:'🧥', faultChance:0.16, faultDesc:'Bottle 3 below minimum pressure. Replace before shift.' },
];

export const LT_BRIEFING_TONES = [
  { id:'push_hard',  label:'Push Hard Today',         icon:'💪',
    desc:'"We have a good crew. I want to see it on every call. High intensity, maximum effort."',
    effect:{leadership:2}, callBonusStat:'physical', note:'Physical calls favoured · +2 Leadership' },
  { id:'training',   label:'Focus on Training',       icon:'📚',
    desc:'"Today is about getting sharper. Every rep and study session counts. Extra training action available."',
    effect:{knowledge:3}, extraAction:true, note:'+1 Free Action (study/drill) · +3 Knowledge' },
  { id:'easy_shift', label:'Steady and Professional', icon:'☕',
    desc:'"Steady, controlled, professional. We get through the day right, not fast."',
    effect:{morale:5}, note:'+5 Crew Morale · Stable reputation' },
];

export const CAPTAIN_AFD_DIRECTIVES = [
  { id:'response_times', label:'Response Time Reduction Mandate', icon:'⏱️',
    directive:'District Command: all companies must reduce average response times by 15% this quarter. Mandatory monitoring begins immediately.',
    choices:[
      { text:'Pass it straight — brief Lieutenants as-is',                    whitfieldDelta:0,  moraleDelta:0,  note:'Neutral. No pushback, no spin.' },
      { text:'Frame it positively — "This shows what 12 is made of"',         whitfieldDelta:1,  moraleDelta:5,  note:'+5 crew morale, +1 CO trust.' },
      { text:'Push back formally — "This creates unsafe pressure on my LTs"', whitfieldDelta:-3, moraleDelta:0, repDelta:3, note:'Risky with command. Builds LT trust.' },
    ]},
  { id:'inspection', label:'Quarterly Equipment Audit', icon:'🔍',
    directive:'All apparatus to undergo a full equipment audit. Documentation due by end of quarter. AFD Compliance is sending an inspector.',
    choices:[
      { text:'Schedule the audit — standard compliance',     whitfieldDelta:0,  moraleDelta:0, note:'Neutral.' },
      { text:'Turn it into a drill — make the crew own it',  whitfieldDelta:2,  moraleDelta:3, note:'+2 CO trust, +3 morale.' },
      { text:'Push back — "Our audit was 3 months ago"',     whitfieldDelta:-5, moraleDelta:2, note:'Risky.' },
    ]},
  { id:'overtime_freeze', label:'Overtime Freeze', icon:'💸',
    directive:'Budget constraints: all overtime requests suspended until further notice. Minimum staffing must be maintained through schedule adjustments.',
    choices:[
      { text:'Comply — notify Lieutenants',                                      whitfieldDelta:0,  moraleDelta:-3, note:'Safe. Morale takes a hit.' },
      { text:'Request a critical-coverage exemption',                            whitfieldDelta:1,  moraleDelta:0,  note:'Shows initiative.' },
      { text:'"This endangers staffing — I\'m filing a formal objection"',       whitfieldDelta:-4, moraleDelta:4,  note:'Big risk. Big crew reward.' },
    ]},
  { id:'training_mandate', label:'Mandatory NIMS Refresher', icon:'📋',
    directive:'All personnel must complete a 4-hour NIMS refresher this month. Scheduling is your responsibility.',
    choices:[
      { text:'Schedule it during low-call periods',                                    whitfieldDelta:1,  moraleDelta:0, note:'+1 CO trust.' },
      { text:'Use a shift change window — minimal disruption',                         whitfieldDelta:0,  moraleDelta:2, note:'+2 morale.' },
      { text:'"My crew is NIMS certified. This is redundant box-checking."',           whitfieldDelta:-3, moraleDelta:3, note:'Risky.' },
    ]},
];

export const BC_DISTRICT_STATIONS = [
  { id:'s12',  name:'Station 12',   unit:'Engine 12 · Truck 7 · Squad 4', icon:'🔥' },
  { id:'s24',  name:'Station 24',   unit:'Engine 24 · Squad 5',             icon:'🚒' },
  { id:'s17',  name:'Station 17',   unit:'Engine 17 · Ambo 17',             icon:'🚒' },
  { id:'s66',  name:'Station 66',   unit:'Engine 66 · Truck 66',            icon:'🚒' },
  { id:'a61',  name:'Ambo District',unit:'Ambulance 9 · Ambo 17',          icon:'🚑' },
];

export const BC_STAFFING_DECISIONS = [
  { id:'reassign', label:'Reassign from neighbouring station', whitfieldDelta:2,  moraleDelta:-2, risk:'LOW' },
  { id:'overtime', label:'Approve overtime coverage',          whitfieldDelta:0,  moraleDelta:2,  risk:'LOW' },
  { id:'short',    label:'Run short-staffed this shift',       whitfieldDelta:-3, moraleDelta:-4, risk:'HIGH', complicationChance:0.4 },
];

// ===== CONFLICT / ESCALATION SYSTEM =====
// Each choice shows the player its live odds of resolving the conflict.
// On failure the conflict escalates up the chain of command (LT -> Captain ->
// Battalion Chief). If the player doesn't hold the tier it escalates to, an
// NPC officer resolves it off-screen at a baseline chance (see game.js
// resolveEscalationAutomatically), with a modest cost to the player's own
// standing for having let it get away from them.
export const CONFLICT_EVENTS = {
  lieutenant: [
    { id:'conflict_bay', title:'Tension in the Apparatus Bay',
      desc:'Ortega and a newer crew member have been at each other for two shifts. The tension is affecting drill performance. As Lieutenant, this is your problem to solve.',
      dialogue:'"LT, you need to deal with this before it becomes a scene problem."',
      choices:[
        { text:'Pull Ortega aside — hear his side privately', chance:0.65,
          success:{ text:'Ortega levels with you. It was a misunderstanding over a missed radio call — cleared up in ten minutes.', effect:{leadership:4,command:2}, whitfieldDelta:2 },
          failure:{ text:'Ortega hears you out but doesn\'t budge. The tension is still there — and now it\'s personal.', effect:{morale:-2}, whitfieldDelta:-1 } },
        { text:'Bring both in together — clear it in one conversation', chance:0.55,
          success:{ text:'It\'s tense for the first five minutes, then it breaks. Both sides say their piece and shake on it.', effect:{leadership:5,morale:3}, whitfieldDelta:3 },
          failure:{ text:'Putting them in a room together backfires — old grievances surface and it gets worse before it gets better.', effect:{morale:-4,leadership:-1}, whitfieldDelta:-2 } },
        { text:'Document it and let it work itself out', chance:0.3,
          success:{ text:'It cools down on its own. You got lucky.', effect:{reputation:1}, whitfieldDelta:0 },
          failure:{ text:'It doesn\'t cool down. It boils over on the next call and costs you tempo on scene.', effect:{reputation:-3,morale:-3}, whitfieldDelta:-2 } },
      ]},
    { id:'conflict_veteran', title:'The Veteran and the New Guy',
      desc:'Whitaker has been riding a new hire hard — harder than mentorship, closer to hazing. The new hire came to you.',
      dialogue:'"Lieutenant, I respect Whitaker, but this is making it very hard for me to function."',
      choices:[
        { text:'Talk to Whitaker — privately, directly, now', chance:0.6,
          success:{ text:'Whitaker pushes back at first, then admits he\'s been harder than he needed to be. He eases off.', effect:{leadership:5,reputation:3}, whitfieldDelta:3 },
          failure:{ text:'Whitaker doesn\'t take it well. "I built this crew, LT. Don\'t tell me how to run it." Nothing changes.', effect:{morale:-3}, whitfieldDelta:-1 } },
        { text:'Acknowledge the new hire\'s progress at morning briefing', chance:0.5,
          success:{ text:'The public credit lands. Whitaker notices the shift in how the crew sees the new hire and backs off on his own.', effect:{morale:4,leadership:2}, whitfieldDelta:1 },
          failure:{ text:'Whitaker reads it as you undermining him in front of the house. The friction gets worse, not better.', effect:{morale:-3,leadership:-2}, whitfieldDelta:-1 } },
        { text:'Let Whitaker\'s style run — it produces results eventually', chance:0.25,
          success:{ text:'The new hire toughens up faster than expected and the two find their footing.', effect:{reputation:1}, whitfieldDelta:0 },
          failure:{ text:'The new hire requests a transfer paperwork packet. Word gets around the house.', effect:{reputation:-3,morale:-4}, whitfieldDelta:-2 } },
      ]},
  ],
  captain: [
    { id:'conflict_lt_rivalry', title:'Two Lieutenants, One House',
      desc:'Two of your Lieutenants have been quietly competing for resources and recognition — it\'s starting to affect how their companies coordinate on scene.',
      dialogue:'"Captain, it\'s not blowing up. Yet. But it\'s not nothing, either."',
      choices:[
        { text:'Sit both Lieutenants down and set clear lanes of responsibility', chance:0.65,
          success:{ text:'Clear boundaries fix it fast. Both LTs respect the direct approach.', effect:{command:5,leadership:3}, whitfieldDelta:3 },
          failure:{ text:'Both agree in the room and go right back to it the next shift.', effect:{morale:-2}, whitfieldDelta:-1 } },
        { text:'Reassign a shared resource to force cooperation', chance:0.5,
          success:{ text:'Forcing them to share solves the actual problem instead of just the argument.', effect:{command:4,morale:2}, whitfieldDelta:2 },
          failure:{ text:'It reads as favoritism to one company. Now there are three problems instead of one.', effect:{morale:-4,reputation:-2}, whitfieldDelta:-2 } },
        { text:'Let the Lieutenants sort it out between themselves', chance:0.3,
          success:{ text:'They surprise you and work it out like professionals.', effect:{reputation:1}, whitfieldDelta:0 },
          failure:{ text:'It escalates onto the apparatus floor where the crews can see it.', effect:{reputation:-4,morale:-3}, whitfieldDelta:-3 } },
      ]},
    { id:'conflict_company_culture', title:'A Company Losing Its Standard',
      desc:'One of your companies has been sliding — sloppy equipment checks, late to drills, short tempers. Its Lieutenant hasn\'t flagged it, which is its own problem.',
      dialogue:'"Captain, if you don\'t catch this now, it catches you on a bad call later."',
      choices:[
        { text:'Address the Lieutenant directly — this is a leadership gap, not just a crew problem', chance:0.6,
          success:{ text:'The LT takes it hard but takes it seriously. Standards come back up within the week.', effect:{command:6,leadership:3}, whitfieldDelta:4 },
          failure:{ text:'The LT gets defensive and the company culture doesn\'t move.', effect:{morale:-3}, whitfieldDelta:-2 } },
        { text:'Run a surprise full-company inspection to reset the standard', chance:0.45,
          success:{ text:'The shock works. Nobody wants to fail an inspection in front of the Captain twice.', effect:{command:4,reputation:3}, whitfieldDelta:2 },
          failure:{ text:'It reads as a public humiliation. Morale takes a hit and the LT feels undermined.', effect:{morale:-4,leadership:-2}, whitfieldDelta:-2 } },
      ]},
  ],
  battalion_chief: [
    { id:'conflict_captain_dispute', title:'A Dispute Between Captains',
      desc:'Two Captains under your command disagree — sharply — over how a shared incident was handled. Neither will let it go, and it\'s starting to affect district coordination.',
      dialogue:'"Chief, with respect, someone above both of us needs to make this call."',
      choices:[
        { text:'Review the incident report yourself and rule definitively', chance:0.7,
          success:{ text:'A clear, evidence-based ruling ends it. Both Captains respect the process even if one loses the argument.', effect:{command:6,reputation:4}, whitfieldDelta:4 },
          failure:{ text:'Your ruling doesn\'t settle it — one Captain believes you sided with politics, not facts.', effect:{morale:-3,reputation:-2}, whitfieldDelta:-2 } },
        { text:'Mediate a joint conversation and let them work it out with you in the room', chance:0.55,
          success:{ text:'Having you there as a neutral party is enough. They find common ground.', effect:{command:5,morale:3}, whitfieldDelta:3 },
          failure:{ text:'It turns into both Captains making their case to you instead of to each other. Nothing resolves.', effect:{morale:-3}, whitfieldDelta:-1 } },
      ]},
  ],
};

export const EMS_HOSPITAL_EVENTS = {
  critSuccess:{ rapportDelta:14, title:'Critical Save', desc:'The attending calls you back after handoff. Patient is stable. "Whatever you did in the field made the difference." Crestbridge rapport increases significantly.' },
  success:    { rapportDelta:7,  title:'Smooth Handoff', desc:'Dr. Choi meets you at the door. "Good package. Good vitals, clear documentation." Clean, professional.' },
  partial:    { rapportDelta:-5, title:'Handoff Friction', desc:'The receiving nurse questions your documentation. "This is incomplete." Not hostile, but it\'s friction.' },
  failure:    { rapportDelta:-13,title:'Difficult Handoff', desc:'The ER team takes over quickly. The attending\'s expression says it. You hear "field management" mentioned. Rapport with Crestbridge takes a significant hit.' },
};

export const EMS_DEBRIEF = {
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

export const BC_LEGACY_EVENTS = [
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

// ===== SEEK ADVICE EVENTS (bottom-up, pure random per shift) =====
// A subordinate proactively comes to the player's office/quarters. Framing
// text only — the three response choices (Supportive/Firm/Practical) are
// generated dynamically in game.js so the same approach system used for
// player-initiated counseling applies here too.
export const SEEK_ADVICE_PROMPTS = {
  lieutenant: [
    { title:'A Knock at the Office Door', desc:'finds you between calls, clearly wanting to talk but hesitant to start.', dialogue:'"Got a minute, LT? It\'s not urgent. It\'s just been on my mind."' },
    { title:'Caught You in the Bay', desc:'catches you alone in the apparatus bay after checks.', dialogue:'"Can I ask you something, off the record?"' },
    { title:'Before Roll Call', desc:'is waiting outside your office before shift even starts.', dialogue:'"Figured I\'d catch you before things get busy."' },
  ],
  captain: [
    { title:'A Lieutenant Needs Direction', desc:'asks for five minutes in your office — a command decision they don\'t want to make alone.', dialogue:'"Captain, I want your read on this before I commit my company to it."' },
    { title:'Off the Radio', desc:'pulls you aside after briefing, out of earshot of their crew.', dialogue:'"Can we talk somewhere that isn\'t in front of my people?"' },
  ],
  battalion_chief: [
    { title:'A Captain\'s Judgment Call', desc:'requests a private line with district command — something above their pay grade to decide alone.', dialogue:'"Chief, I need someone above me to weigh in on this one."' },
  ],
};

export const DRILL_TYPES = [
  { id:'hose_ops',   label:'Hose Operations',   icon:'🚿', effect:{physical:4,knowledge:2}, crewBonus:{morale:2},   desc:'Deploy and advance attack lines. Speed and coordination drill.' },
  { id:'search',     label:'Search & Rescue',    icon:'🔦', effect:{physical:3,knowledge:3}, crewBonus:{morale:3},   desc:'Primary and secondary search patterns. SCBA use under stress.' },
  { id:'scba',       label:'SCBA & Donning',     icon:'🧥', effect:{knowledge:4,physical:2}, crewBonus:{morale:2},   desc:'Full donning sequence under time pressure. SCBA confidence.' },
  { id:'forcible',   label:'Forcible Entry',     icon:'🔨', effect:{physical:5,knowledge:2}, crewBonus:{morale:3},   desc:'Inward and outward opening doors, breaching walls, through-the-lock.' },
  { id:'ems_triage', label:'EMS & Triage',       icon:'🏥', effect:{knowledge:4,morale:2},   crewBonus:{morale:3},   desc:'Patient packaging, triage categories, Ambo coordination.' },
  { id:'hazmat',     label:'HazMat Awareness',   icon:'☢️', effect:{knowledge:5,physical:1}, crewBonus:{knowledge:2}, desc:'ERG reference, level B PPE, decon line setup.' },
];
