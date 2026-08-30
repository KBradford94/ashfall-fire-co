// ===== ROSTER DATA — Season 14 cast =====

export const ROSTER = [
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
  { id:'delgado',     name:'Rae Delgado',      role:'Lieutenant',          unit:'Truck 7',      emoji:'⛑️',  bond:0,  initials:'SK', color:'#f59e0b',
    trait:'Leads from the front, no apologies.' },
  { id:'whitaker', name:'Gus Whitaker',   role:'Firefighter',         unit:'Truck 7',      emoji:'💪',  bond:20, initials:'CH', color:'#ef4444',
    trait:'Old school, always right about people.' },
  { id:'solano',  name:'Ray Solano',      role:'Firefighter',         unit:'Truck 7',      emoji:'🧱',  bond:12, initials:'SV', color:'#9ca3af',
    trait:'Something to prove, loyalty unconfirmed.' },
  // Engine 12
  { id:'tibbets',    name:'Earl Tibbets',  role:'Lieutenant',          unit:'Engine 12',     emoji:'📋',  bond:15, initials:'RM', color:'#f59e0b',
    trait:'Earned it the long way.' },
  { id:'alvarez',   name:'FF Alvarez',        role:'Firefighter',         unit:'Engine 12',     emoji:'🚒',  bond:8,  initials:'RV', color:'#6b7280',
    trait:'Does the shift, goes home.' },
  { id:'voss',     name:'FF Voss',          role:'Firefighter',         unit:'Engine 12',     emoji:'🔷',  bond:8,  initials:'FC', color:'#6b7280',
    trait:'Solid when it counts.' },
  // Ambulance 9
  { id:'priya',   name:'Priya Malhotra',    role:'Paramedic in Charge', unit:'Ambulance 9',  emoji:'🚑',  bond:15, initials:'VM', color:'#3b82f6',
    trait:'Patient first, politics second.' },
  { id:'lindqvist',    name:'Nora Lindqvist',     role:'Paramedic',           unit:'Ambulance 9',  emoji:'💙',  bond:20, initials:'LN', color:'#60a5fa',
    trait:'Heart bigger than her experience.' },
];

// Company membership (used for unit-specific bond lookups)
export const COMPANY_ROSTER = {
  'Truck 7':    ['delgado','whitaker','solano'],
  'Engine 12':   ['tibbets','alvarez','voss'],
  'Squad 4':     ['kessler','ortega','brennan','reyes'],
  'Ambulance 9':['priya','lindqvist'],
};

export const BOND_MODIFIERS = [
  { crewId:'delgado',     unitMatch:'Truck 7',    callIds:null, statBonus:5, minBond:60 },
  { crewId:'kessler', unitMatch:'Squad 4',     callIds:null, statBonus:5, minBond:60 },
  { crewId:'whitaker', unitMatch:'Truck 7',    callIds:null, statBonus:4, minBond:60 },
  { crewId:'tibbets',    unitMatch:'Engine 12',   callIds:null, statBonus:3, minBond:55 },
  { crewId:'priya',   unitMatch:null, callIds:['medical_emergency','cardiac_arrest','mass_casualty'], statBonus:5, minBond:55 },
  { crewId:'kade',   unitMatch:null,           callIds:null, statBonus:3, minBond:65 },
  { crewId:'ortega',     unitMatch:'Squad 4',      callIds:null, statBonus:4, minBond:55 },
];

export const UNIT_CALL_POOL = {
  'Truck 7':    ['structure_fire','structure_fire','house_fire_children','house_fire_children','high_rise','building_collapse','elevator_rescue','false_alarm','explosion','vehicle_collision'],
  'Squad 4':     ['trench_rescue','trench_rescue','water_rescue','swift_water','swift_water','building_collapse','industrial_accident','train_derailment','vehicle_collision','structure_fire'],
  'Engine 12':   ['structure_fire','structure_fire','gas_leak','gas_leak','electrical_fire','wildland','explosion','explosion','false_alarm','house_fire_children'],
  'Ambulance 9':['medical_emergency','medical_emergency','cardiac_arrest','cardiac_arrest','mass_casualty','vehicle_collision','industrial_accident','multi_vehicle'],
};

export const NEIGHBORHOODS = {
  near_north:    { label:'Harborview',    x:168, y:55,  w:60, h:55, callBias:['high_rise','medical_emergency','false_alarm','cardiac_arrest'] },
  river_north:   { label:'Foundry District',   x:108, y:100, w:60, h:50, callBias:['structure_fire','electrical_fire','explosion','false_alarm'] },
  lincoln_park:  { label:'Ridgeway',  x:170, y:110, w:58, h:45, callBias:['medical_emergency','structure_fire','house_fire_children'] },
  west_loop:     { label:'Millrace',     x:58,  y:130, w:50, h:50, callBias:['gas_leak','industrial_accident','explosion','electrical_fire'] },
  wicker_park:   { label:'Copperline',   x:40,  y:165, w:65, h:50, callBias:['structure_fire','house_fire_children','vehicle_collision'] },
  saltmarsh:        { label:'Saltmarsh',        x:45,  y:240, w:70, h:50, callBias:['structure_fire','gas_leak','industrial_accident'] },
  back_of_yards: { label:'Dockyard', x:30,  y:290, w:70, h:45, callBias:['industrial_accident','structure_fire','explosion'] },
  ironside:    { label:'Ironside',    x:108, y:270, w:60, h:55, callBias:['vehicle_collision','medical_emergency','structure_fire'] },
};

export const CALL_NEIGHBORHOOD_BIAS = {
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

export const CREW_STATE_COLORS = {
  normal:'#3d5080', fatigued:'#f59e0b', injured:'#ef4444', conflicted:'#a855f7', confident:'#22c55e',
};
