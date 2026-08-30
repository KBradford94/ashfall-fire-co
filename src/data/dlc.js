// ===== DLC CONTENT — ported from the archived Python builds =====
// Sources: dlc/hazmat_ops.json, dlc/highrise_plus.json, dlc/banter_pack.json (Firehouse 12 v0.4, 2025)
// Converted to the Electron call/event format.

export const DLC_CALLS = [
  {
    id:'chem_lab_smoke', difficulty:'hard', dlc:'hazmat_ops',
    name:'Chemical Lab Incident', units:'Squad 4, Engine 12, Ambulance 9', badge:'HAZMAT — LAB FIRE',
    addresses:['Ashfall Polytechnic Research Wing, 10 W 35th St','Saltmarsh Industrial Labs, 1900 S Colvin Ave','Kestrel University Chem Annex, 303 E Crescent St'],
    details:[
      'University lab, smoke from a fume hood — possible runaway chemical reaction. Unknown products involved.',
      'Industrial QA lab, haze on two floors, employees reporting metallic taste. MSDS binder unaccounted for.',
      'Research annex, small fire self-extinguished but air monitoring alarms active on entry corridor.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, Engine 12, Ambo 9 — lab smoke, possible chemical reaction. Building evacuating now.' },
      { speaker:'Kessler', line:'Nobody makes entry until we know the product. Meters up, entry control at the door.' },
      { speaker:'Whitaker', line:'Line to the door, defensive only. Decon before anyone touches a patient.' },
    ],
    primaryStats:['knowledge','command'], statLabels:['Knowledge','Command'],
    outcomes:{
      critSuccess:{ label:'TEXTBOOK CONTAINMENT', text:'Product identified from the manifest, utilities isolated, contained without contact. The HazMat district chief asks who ran entry control. Kessler points at you.', stats:{knowledge:6,command:4,reputation:5,morale:3} },
      success:    { label:'CONTAINED',            text:'Slow and disciplined — monitoring, isolation, decon line. Nothing spread, nobody exposed. Unsexy, professional work.', stats:{knowledge:4,command:3,reputation:3,morale:2} },
      partial:    { label:'EXPOSURE SCARE',        text:'Contained, but two firefighters crossed the warm zone boundary before it was marked. Precautionary transport, awkward paperwork, lesson learned.', stats:{knowledge:2,morale:-3,reputation:-2} },
      failure:    { label:'CONTAMINATION',         text:'The reaction flared while crews were repositioning — product reached the drains and three of yours need full decon. The state environmental call lasts an hour.', stats:{morale:-5,reputation:-4,physical:-2} },
    }
  },
  {
    id:'highrise_smoke', difficulty:'hard', dlc:'highrise_plus',
    name:'High-Rise Smoke Investigation', units:'Engine 12, Truck 7, Squad 4', badge:'HIGH-RISE — SMOKE',
    addresses:['Lakeview Twin Towers, 300 N Union St','1000 Harborline Plaza','Continental Towers, 555 W Ledger St'],
    details:[
      'Smoke reported on the 14th floor, wind advisory in effect — possible wind-driven conditions if it lights off.',
      'Alarm activation floors 11-13, residents calling about haze in hallways. Building engineer meeting you in the lobby.',
      'Odor of smoke in the elevator lobby of a residential tower. HVAC may be moving it — origin unknown.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7, Squad 4 — smoke on upper floors, possible wind-driven conditions. Building is high-occupancy residential.' },
      { speaker:'Delgado',     line:'Lobby control first. Nobody rides an elevator past 10 — we take the stairs from there.' },
      { speaker:'Kessler', line:'Squad has elevator control and utilities. Watch your door control up there — wind is real tonight.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'ORIGIN FOUND FAST',  text:'TIC sweep finds a ballast fire in a 12th-floor ceiling void before it touches the cocklofts. Stair pressurization holds the smoke. Residents never even left their floors.', stats:{physical:5,knowledge:5,reputation:5,morale:3} },
      success:    { label:'CONTROLLED',          text:'Methodical floor-by-floor sweep, origin isolated, vented with the wind instead of against it. Long climb, good outcome.', stats:{physical:4,knowledge:3,reputation:3,morale:2} },
      partial:    { label:'SMOKE MIGRATION',     text:'You found it — after the HVAC pushed smoke to three more floors and triggered a full evac. Nobody hurt, but the lobby is 400 angry residents deep.', stats:{physical:2,morale:-3,reputation:-2} },
      failure:    { label:'STAIRWELL LOSS',      text:'A propped door turned the attack stair into a chimney. Two crews had to relocate mid-climb and a resident went down with smoke inhalation on 15.', stats:{morale:-5,reputation:-4,physical:-2} },
    }
  },
  {
    id:'highrise_fire', difficulty:'hard', dlc:'highrise_plus',
    name:'High-Rise Apartment Fire', units:'Engine 12, Truck 7, Squad 4, Ambulance 9', badge:'HIGH-RISE — WORKING FIRE',
    addresses:['River City, 800 S Crown St','Sandburg Village, 1355 N Sandburg Terr','2626 N Harrow Ave'],
    details:[
      'Confirmed apartment fire, 15th floor. Door to the fire apartment reportedly open — door control issues in the hallway.',
      'Working fire floor 9, security gates on the unit door slowing entry. Multiple calls from the floor above.',
      'Apartment fire with extension into the hallway, standpipe operations required. Wind pinning flames at the windows.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Full assignment — confirmed fire, 15th floor, residents sheltering above. Companies report to lobby command.' },
      { speaker:'Whitaker', line:'Long stretch off the standpipe — 14th floor connection, take the extra length, trust me.' },
      { speaker:'Delgado',     line:'Truck 7 splits: door control and search. That open door is the whole ballgame — control it FIRST.' },
    ],
    primaryStats:['physical','command'], statLabels:['Physical','Command'],
    outcomes:{
      critSuccess:{ label:'DOOR CONTROLLED — FIRE HELD', text:'Door control turned a blowtorch hallway back into a corridor. Attack line made the apartment, searches clean above. Kade calls lobby command "the tightest he\'s seen."', stats:{physical:6,command:5,reputation:5,morale:4} },
      success:    { label:'KNOCKED ON THE 15TH', text:'The stretch was long and the climb was longer, but water hit the seat before extension took the cockloft. Shelter-in-place held above.', stats:{physical:4,command:3,reputation:3,morale:2} },
      partial:    { label:'EXTENSION TAKEN',     text:'Fire got the hallway ceiling before door control was set. You held it at the stairwell — but three units above are smoke-damaged and one FF is on oxygen in the lobby.', stats:{physical:2,morale:-3,reputation:-2} },
      failure:    { label:'FLOOR LOST',          text:'Wind owned the hallway the moment that door failed. Companies were driven back to the stairs twice; the floor burned to the standpipe and two residents went to Crestbridge in critical.', stats:{morale:-6,reputation:-4,physical:-3} },
    }
  },
];

// ---- Banter pack (crew flavor lines with light stat effects) -----------
// effect: applied via applyStats; stress: applied to state.condition via addStress.
export const BANTER = {
  drill: [
    { line:"Whitaker: 'Solid work out there, rookie.'", effect:{morale:1}, chance:0.5, maxRankIndex:2 },
    { line:"Delgado: 'Next time, don't trip over the hose, huh?'", stress:1, chance:0.35 },
    { line:"Kade drops by the app floor: 'Good hustle, 12.'", effect:{morale:2,reputation:1}, chance:0.15 },
  ],
  rest: [
    { line:"Halvorsen: 'We should order pizza before the tones drop again.'", effect:{morale:1}, chance:0.45 },
    { line:"Ortega: 'Don't fall asleep — last time we got toned out mid-nap.'", stress:1, chance:0.3 },
  ],
  downtime: [
    { line:"Kessler, quietly: 'Sometimes the quiet is worse than the chaos.'", stress:-1, chance:0.4 },
    { line:"Lindqvist: 'Calls come in threes. Be ready.'", effect:{reputation:1}, chance:0.3 },
    { line:"Tibbets, from the couch: 'Statistically, sitting down between calls extends careers. Look it up.'", effect:{morale:1}, chance:0.35 },
  ],
  dispatch: {
    fire:     [ { line:"Delgado: 'Smells like another kitchen fire. Gear up!'", effect:{morale:1}, chance:0.4 },
                { line:"Whitaker: 'Keep your heads — small fire can still kill you.'", effect:{reputation:1}, chance:0.3 } ],
    hazmat:   [ { line:"Kessler: 'Careful — this one's chemical. Mask up tight.'", stress:1, chance:0.6 } ],
    highrise: [ { line:"Tibbets: '15th floor? I'm taking the elevator till Kade yells at me.'", effect:{morale:1}, chance:0.4 } ],
    ems:      [ { line:"Priya: 'Bag's checked twice. Let's go be somebody's good day.'", effect:{morale:1}, chance:0.4 } ],
  },
  promotion: {
    probie:          [ { line:"Halvorsen: 'Congrats — you're one of us now.'", effect:{morale:2,reputation:1} } ],
    lieutenant:      [ { line:"Delgado: 'LT, huh? Don't let it go to your head.'", effect:{morale:1}, stress:1 } ],
    captain:         [ { line:"Whitaker: 'Captain. Huh. I remember when you couldn't rack hose.'", effect:{morale:2} } ],
    battalion_chief: [ { line:"Kessler: 'Chief.' He says it once, no joke attached. That lands harder than any speech.", effect:{morale:2,reputation:1} } ],
  },
};

// Map call types to dispatch banter categories
export function banterCategoryForCall(callType) {
  if (!callType) return null;
  if (callType.dlc === 'hazmat_ops' || callType.id === 'hazmat' || callType.id === 'gas_leak') return 'hazmat';
  if (callType.dlc === 'highrise_plus' || callType.id === 'high_rise') return 'highrise';
  if (/medical|cardiac|overdose|ems|injur/i.test(callType.id + callType.name)) return 'ems';
  if (/fire/i.test(callType.id + callType.name)) return 'fire';
  return null;
}

// Install DLC content into live game data (mutates imported arrays).
export function installDLC(CALL_TYPES, UNIT_CALL_POOL) {
  for (const call of DLC_CALLS) {
    if (!CALL_TYPES.some(c => c.id === call.id)) CALL_TYPES.push(call);
  }
  const add = (unit, id) => {
    if (UNIT_CALL_POOL[unit] && !UNIT_CALL_POOL[unit].includes(id)) UNIT_CALL_POOL[unit].push(id);
  };
  add('Squad 4', 'chem_lab_smoke');
  add('Engine 12', 'chem_lab_smoke');
  add('Truck 7', 'highrise_smoke');
  add('Truck 7', 'highrise_fire');
  add('Engine 12', 'highrise_fire');
  add('Squad 4', 'highrise_fire');
  return DLC_CALLS.length;
}
