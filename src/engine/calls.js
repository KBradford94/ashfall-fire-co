// ===== CALL SYSTEM CONFIGURATION =====

export const CALL_TACTIC_MAP = {
  structure_fire:'fire', house_fire_children:'fire', electrical_fire:'fire',
  wildland:'fire', explosion:'fire', high_rise:'fire',
  vehicle_collision:'rescue', multi_vehicle:'rescue', building_collapse:'rescue',
  trench_rescue:'rescue', elevator_rescue:'rescue', industrial_accident:'rescue', train_derailment:'rescue',
  water_rescue:'water', swift_water:'water',
  medical_emergency:'medical', cardiac_arrest:'medical',
  gas_leak:'hazmat', hazmat:'hazmat',
  false_alarm:'admin',
};

export const CALL_TACTICS = {
  fire: [
    { text:'Aggressive interior attack — take the fight to the seat', modifier:2,  label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Coordinated ventilation first, then controlled advance',  modifier:1,  label:'+1 Tactical', risk:'MED RISK' },
    { text:'Defensive exterior attack — protect exposures',           modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
  rescue: [
    { text:'Immediate entry — victim may not survive delay',          modifier:2,  label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Rapid size-up then targeted rescue entry',               modifier:0,  label:'No Modifier', risk:'MED RISK' },
    { text:'Safety perimeter and additional resource request',       modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
  water: [
    { text:'In-water rescue — direct contact and extraction',        modifier:2,  label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Throw rope first, position for water entry if needed',   modifier:1,  label:'+1 Tactical', risk:'MED RISK' },
    { text:'Shore-based operations only — await Marine unit',        modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
  medical: [
    { text:'Aggressive ALS — full intervention immediately',         modifier:2,  label:'+2 Tactical', risk:'HIGH RISK' },
    { text:'Rapid assessment then targeted ALS protocol',            modifier:1,  label:'+1 Tactical', risk:'MED RISK' },
    { text:'BLS stabilisation and rapid transport to definitive care', modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
  hazmat: [
    { text:'Rapid product ID and aggressive mitigation',             modifier:1,  label:'+1 Tactical', risk:'MED RISK' },
    { text:'Level B approach — full ID before mitigation',           modifier:0,  label:'No Modifier', risk:'MED RISK' },
    { text:'Full defensive — Level A PPE, await HazMat team',        modifier:-2, label:'–2 Tactical', risk:'LOW RISK' },
  ],
  admin: [
    { text:'Methodical and thorough — complete all checklist steps', modifier:1,  label:'+1 Tactical', risk:'LOW RISK' },
    { text:'Standard response protocol — by the book',              modifier:0,  label:'No Modifier', risk:'LOW RISK' },
    { text:'Quick response — clear the scene efficiently',           modifier:-1, label:'–1 Tactical', risk:'LOW RISK' },
  ],
};

export const SIZE_UP_OPTIONS = [
  { id:'aggressive', text:'Aggressive Interior Operations', desc:'Press into the structure. Maximum resource commitment. Take the fight to it.', modifier:1,  label:'+1 Size-Up', risk:'HIGH COMMIT' },
  { id:'defensive',  text:'Defensive Operations',          desc:'Protect exposures only. No interior entry. Exterior operations.', modifier:-1, label:'–1 Size-Up', risk:'DEFENSIVE' },
  { id:'resources',  text:'Request Additional Resources',  desc:'Call for mutual aid before committing. More units, more options.', modifier:0,  label:'No Modifier', risk:'BUILD-UP' },
];

// ===== SHADOW CALL MODE =====
export const SHADOW_CALL_CHOICES = {
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
      modifier:-0.5, bondDelta:3, probieBonus:8, effectLabel:'Very safe · Bond +' },
    { id:'question', text:'Shadow [crew] into the warm zone — observe directly',
      modifier:0.5, bondDelta:4, probieBonus:14, risk:true,
      effectLabel:'Moderate risk · Full observation' },
    { id:'observe',  text:'Read the placard before [crew] and call the product first',
      modifier:1.5, bondDelta:7, knowledgeDelta:5, probieBonus:20, risk:true,
      effectLabel:'High risk · Major knowledge win if correct' },
  ],
  admin: [
    { id:'follow',   text:'Follow [crew]\'s lead — support and observe every action',
      modifier:0,   bondDelta:3, probieBonus:8, effectLabel:'Safe · Bond +' },
    { id:'question', text:'Ask [crew] about the building systems while they work',
      modifier:0.3, bondDelta:2, knowledgeDelta:3, probieBonus:10,
      effectLabel:'Low risk · Knowledge +' },
    { id:'observe',  text:'Take point on civilian management — take pressure off [crew]',
      modifier:0.5, bondDelta:5, probieBonus:14, risk:true,
      effectLabel:'Moderate risk · Leadership opportunity' },
  ],
};

export const SHADOW_FEEDBACK_POOL = {
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

// ===== FF ROLE SYSTEM =====
export const FF_ROLE_ASSIGNMENTS = {
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

export const FF_ROLE_DISPLAY = {
  search_rescue:  { label:'Search & Rescue', icon:'🔦', statPrimary:'physical', statSecondary:'knowledge',
    ltOrder:'"Primary search — upper floors. Nobody up there before you."' },
  hose_line:      { label:'Hose Line', icon:'🚿', statPrimary:'physical', statSecondary:'morale',
    ltOrder:'"Get water on the fire. That line is everything right now."' },
  ventilation:    { label:'Ventilation', icon:'💨', statPrimary:'knowledge', statSecondary:'physical',
    ltOrder:'"Read the building and open it up. Coordinate before you cut."' },
  extrication:    { label:'Extrication', icon:'🔧', statPrimary:'physical', statSecondary:'knowledge',
    ltOrder:'"Patient is still in the vehicle. Get them out clean."' },
  ems_support:    { label:'EMS Support', icon:'🏥', statPrimary:'knowledge', statSecondary:'morale',
    ltOrder:'"Priya\'s going to need you on patient care. Follow her lead."' },
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

export const FF_ROLE_CHOICES = {
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
    { text:'Execute every task Priya assigns without deviation',
      modifier:0,   effect:{knowledge:3,morale:2}, risk:false, label:'Supportive' },
    { text:'Take the lead on patient assessment — give Priya the full picture',
      modifier:1,   effect:{knowledge:5,morale:-1}, risk:true, label:'Proactive — higher variance' },
    { text:'Manage the family/bystanders — give Priya clear space to work',
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

// ===== DRIVER ENGINEER APPARATUS MODE =====
export const DE_PUMP_OPTIONS = [
  { id:'low',      label:'Low pressure — conservative flow', icon:'🔵', modifier:-1,
    desc:'Reduced pressure ensures line control and crew safety. Suppression will be slower.',
    effect:{knowledge:2}, note:'Crew line management is easier. Knockdown takes longer.', risk:'LOW' },
  { id:'standard', label:'Standard pressure — by the book',  icon:'🟡', modifier:0,
    desc:'Standard operating pressure. Balanced suppression efficiency and crew safety.',
    effect:{knowledge:1}, note:'Optimal balance for most incidents.', risk:'MED' },
  { id:'high',     label:'High pressure — aggressive suppression', icon:'🔴', modifier:2,
    desc:'Maximum flow rate. Faster knockdown but significantly harder line management.',
    effect:{physical:2}, note:'⚠ Crew line control becomes harder. Risk of injury if the crew is fatigued.', risk:'HIGH' },
];

export const DE_AERIAL_OPTIONS = [
  { id:'optimal',    label:'Optimal aerial position — 70° elevation, full reach', icon:'🏗️', modifier:1,
    desc:'Ideal aerial placement. Maximum coverage and crew protection.',
    effect:{knowledge:3}, note:'Best protection for crew on the roof or upper floors.', risk:'LOW' },
  { id:'expedient',  label:'Expedient position — fastest deployment angle', icon:'⚡', modifier:0,
    desc:'Fast aerial placement. Coverage slightly reduced but water on the fire quickly.',
    effect:{physical:2}, note:'Good for time-critical situations.', risk:'MED' },
  { id:'aggressive', label:'Close-in position — maximum reach, elevated risk', icon:'🔥', modifier:2,
    desc:'Maximum reach from close range. Elevated coverage but apparatus at hazard exposure.',
    effect:{physical:3,morale:-1}, note:'⚠ Apparatus exposed to radiant heat. High reward.', risk:'HIGH' },
];

// ===== EMS DIAGNOSTIC SYSTEM =====
export const EMS_DIAGNOSTIC_CATEGORY_MAP = {
  medical_emergency:'cardiac', cardiac_arrest:'arrest', mass_casualty:'mci',
  vehicle_collision:'trauma', multi_vehicle:'trauma', industrial_accident:'trauma',
  train_derailment:'trauma', building_collapse:'trauma', explosion:'trauma',
  swift_water:'trauma', water_rescue:'trauma', structure_fire:'trauma',
  house_fire_children:'trauma', high_rise:'trauma', false_alarm:'cardiac',
  trench_rescue:'trauma', elevator_rescue:'trauma',
  hazmat:'tox', gas_leak:'tox', wildland:'trauma', electrical_fire:'trauma',
};

export const EMS_DIAGNOSTIC_STEPS = {
  cardiac:[
    { stepLabel:'PRIMARY ASSESSMENT',
      question:'Patient: male, 60s, diaphoretic, chest pressure (not pain), brief LOC, BP 92/60, HR 110. What\'s your primary focus?',
      choices:[
        { text:'12-lead ECG immediately — identify the rhythm and any STEMI pattern', modifier:1.5, effect:{knowledge:5}, label:'Correct clinical priority' },
        { text:'IV access and fluid bolus — address hypotension first', modifier:0.5, effect:{knowledge:3}, label:'Reasonable but secondary' },
        { text:'Full head-to-toe assessment before any intervention', modifier:0, effect:{knowledge:2}, label:'Too slow for this presentation' },
      ]},
    { stepLabel:'TREATMENT DECISION',
      question:'12-lead confirms inferior STEMI. BP now 88/58. Priya is waiting for your call.',
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

// ===== CAPTAIN COMMAND BOARD =====
export const CAPTAIN_SECTOR_CHOICES = [
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

// ===== BC INCIDENT COMMAND =====
export const BC_INCIDENT_COMMAND_CHOICES = [
  { id:'personal_ic', label:'Personal command — respond and assume IC at the scene',
    modifier:1, desc:'BC responds directly, relieves Captain as IC after formal briefing.',
    effect:{command:3,leadership:2}, note:'Maximum oversight. BC committed to one location.' },
  { id:'delegate', label:'Delegate — trust the Captain, monitor from district command',
    modifier:0, desc:'Captain retains IC. BC monitors radio traffic and is available to consult.',
    effect:{command:2}, note:'Develops Captains. Less direct control on this incident.' },
  { id:'second_alarm', label:'Second alarm — escalate now, don\'t wait',
    modifier:1.5, desc:'Call the 2nd alarm. More companies, more capability, larger safety margin.',
    effect:{command:2,reputation:3}, risk:true, note:'Right call on a confirmed working fire. Uses district resources.' },
  { id:'mutual_aid', label:'Mutual aid request — bring in adjacent district resources',
    modifier:0.5, desc:'Request companies from adjacent districts. Expands response for extended ops.',
    effect:{command:3,reputation:2}, note:'Takes time. Correct for major operations or resource depletion.' },
];
