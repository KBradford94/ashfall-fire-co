// ===== DYNAMIC MULTI-STAGE INCIDENTS (v2) =====
// Certain calls develop mid-incident: fires spread, victims deteriorate, and
// time-pressured decisions shift the odds before the final roll.

export const STAGE_TIMER_BY_DIFFICULTY = { casual: 18, standard: 12, veteran: 9 };

// Each entry: array of stages. Stage: { id, title, situation, victim, choices }
// choice: { text, mod (dice modifier delta), stress, note (feed line after pick) }
// A timeout auto-picks `timeoutChoice`.
export const ESCALATIONS = {
  structure_fire: [
    { id:'sf_spread', title:'FIRE IS SPREADING', victim:'Occupant unaccounted for — condition unknown',
      situation:'Radio crackles — fire has extended into the wall void and is running toward the stairwell. The primary search isn\'t finished. You have seconds before the stairs become untenable.',
      choices:[
        { text:'Redirect the line to hold the stairwell — search continues under its protection', mod:+2, stress:1, note:'The line holds the stairs. Search keeps working behind water.' },
        { text:'Pull the search team out now and reset', mod:-1, stress:0, note:'Everyone out, fire owns the second floor. Safe — but if someone\'s up there, you just spent their time.' },
        { text:'Push the search faster — beat the fire to the bedrooms', mod:0, stress:2, note:'The search sprints it. Hearts in throats, eyes on the glow down the hall.' }],
      timeoutChoice:{ text:'You hesitated — the fire didn\'t.', mod:-2, stress:3, note:'Seconds burned while the decision didn\'t come. The stairwell is going.' } },
    { id:'sf_victim', title:'VICTIM LOCATED — DETERIORATING', victim:'Adult male, unresponsive, agonal breathing',
      situation:'Search finds him in a back bedroom — unresponsive, breathing failing. The window is right there; the stairs are longer but Ambo 9 is staged at the door.',
      choices:[
        { text:'Ladder rescue through the window — fastest to fresh air', mod:+1, stress:1, note:'Out through the window, down to the medics. Rough, fast, effective.' },
        { text:'Package properly and take the interior stairs to the medics', mod:+1, stress:0, note:'Clean carry, straight into Priya\'s hands. Textbook.' },
        { text:'Start rescue breathing where he lies before moving', mod:-1, stress:1, note:'You work him where he lies — but the room is filling and the clock isn\'t kind.' }],
      timeoutChoice:{ text:'Frozen between options.', mod:-2, stress:3, note:'Every second of indecision was a breath he didn\'t take.' } },
  ],
  high_rise: [
    { id:'hr_wind', title:'WIND SHIFT', victim:'Floor above sheltering in place',
      situation:'The wind swings around the building face and the hallway flow reverses — smoke that was venting is now pinning against the attack corridor.',
      choices:[
        { text:'Door control NOW — shut the flow path down and reset the attack', mod:+2, stress:1, note:'The door slams the flue shut. The hallway calms like a held breath.' },
        { text:'Push through the heat window before it worsens', mod:0, stress:2, note:'A brutal, low, fast advance. It costs the crew, but the line moves.' },
        { text:'Withdraw to the stairwell and re-vent from above', mod:-1, stress:1, note:'You give back the hallway to buy safer geometry.' }],
      timeoutChoice:{ text:'The wind decided first.', mod:-2, stress:3, note:'The corridor lights up while the radio waits for your call.' } },
    { id:'hr_evac', title:'STAIRWELL CONTAMINATION', victim:'Residents self-evacuating into smoke',
      situation:'Residents from 3 floors up ignored shelter-in-place — they\'re coming down the attack stair, into the smoke, phones out, panicking.',
      choices:[
        { text:'Freeze the attack 60 seconds; crews shepherd residents across to the clean stair', mod:+1, stress:1, note:'One minute of held breath, every civilian across to the evac stair.' },
        { text:'Keep the attack moving; radio lobby to intercept below', mod:0, stress:2, note:'The line advances past frightened faces. Lobby catches them at 8.' },
        { text:'Turn the residents around — back to their floors', mod:-1, stress:1, note:'Convincing scared people to walk back up takes longer than anyone has.' }],
      timeoutChoice:{ text:'Two flows collide in one stair.', mod:-2, stress:3, note:'Firefighters, hose, and pajamas in one stairwell. Chaos does the deciding.' } },
  ],
  hazmat: [
    { id:'hz_plume', title:'PRODUCT REACTING', victim:'Two workers past the inner cordon',
      situation:'The container starts venting with a rising hiss — the plume is thickening and drifting toward your decon corridor.',
      choices:[
        { text:'Relocate decon upwind first, then continue entry', mod:+2, stress:1, note:'Decon jumps upwind. The plume rolls through where it used to stand.' },
        { text:'Rush the entry team to grab the workers before it peaks', mod:0, stress:2, note:'Entry sprints the grab. The meters scream, but the workers come out.' },
        { text:'Pull everyone back and let it vent', mod:-1, stress:0, note:'Distance is the safest tool. But the workers inside get a longer exposure.' }],
      timeoutChoice:{ text:'The plume outran the plan.', mod:-2, stress:3, note:'Decon is contaminated ground now. Everything rebuilds from scratch.' } },
  ],
  chem_lab_smoke: [
    { id:'cl_runaway', title:'RUNAWAY REACTION', victim:'Grad student unaccounted for in the lab suite',
      situation:'The fume hood glow flares white — whatever\'s cooking just went exothermic. A TA says a grad student may still be in the cold room.',
      choices:[
        { text:'Entry team to the cold room on the buddy line — 90 seconds, in and out', mod:+1, stress:2, note:'The cold room door opens on a very confused, very lucky grad student.' },
        { text:'Hit the reaction with the right suppressant per the manifest first', mod:+2, stress:1, note:'The manifest was right. The reaction dies mid-flare.' },
        { text:'Water through the doorway — generic knockdown', mod:-2, stress:1, note:'Water meets water-reactive. The flare answers you back through the door.' }],
      timeoutChoice:{ text:'Chemistry keeps its own schedule.', mod:-2, stress:3, note:'The second flare makes the decision irrelevant.' } },
  ],
  highrise_smoke: [
    { id:'hs_origin', title:'ORIGIN HUNT — CLOCK RUNNING', victim:'Resident with respiratory distress on 15',
      situation:'Smoke on three floors and no seat found yet. An ambo request drops for a wheezing resident on 15 — the same crew you\'d use to check the ceiling voids on 12.',
      choices:[
        { text:'Split: two to the resident, two to open the void on 12', mod:+1, stress:1, note:'Both problems get hands. Thin, but it works.' },
        { text:'Everyone to the void — find the fire, the smoke stops', mod:0, stress:2, note:'You bet on the source. The resident waits longer than feels right.' },
        { text:'Everyone to the resident — people first, always', mod:-1, stress:0, note:'The resident gets four rescuers. The fire gets three more minutes.' }],
      timeoutChoice:{ text:'Both clocks ran.', mod:-2, stress:3, note:'The void burned and the resident waited. Neither forgave the pause.' } },
  ],
  highrise_fire: [
    { id:'hf_door', title:'DOOR FAILURE', victim:'Family of four sheltering directly above the fire',
      situation:'The fire apartment door just failed off its hinges — the hallway is a flow path again and there\'s a family sheltering directly above, one floor up.',
      choices:[
        { text:'Wedge the stair door + curtain the hallway — cut the flow, then advance', mod:+2, stress:1, note:'The improvised curtain buys the hallway back. The attack resets.' },
        { text:'Send Truck up the evac stair to the family while Engine holds the hall', mod:+1, stress:2, note:'Truck reaches the family through the clean stair. Engine grinds it out below.' },
        { text:'Full-speed push to the seat — end the problem at its source', mod:-1, stress:2, note:'The push into a wind-fed hallway costs more than it gains.' }],
      timeoutChoice:{ text:'The flow path ruled the floor.', mod:-2, stress:3, note:'While the decision hung, the hallway repainted itself in fire.' } },
    { id:'hf_family', title:'THE FAMILY IS MOVING', victim:'Two adults, two children — leaving shelter, entering smoke',
      situation:'The family above stopped answering the callback — the building engineer says their door is open. They\'re trying to walk out through the smoke with two kids.',
      choices:[
        { text:'Vent-enter-isolate their floor from the evac stair and intercept them at their door', mod:+2, stress:1, note:'You meet them at their threshold with masks and calm voices.' },
        { text:'Radio all companies: sweep the evac stair floor by floor', mod:+1, stress:1, note:'The sweep finds them huddled on 16, scared but breathing.' },
        { text:'Hold the plan — the attack will clear the hallway fastest', mod:-1, stress:2, note:'The plan holds. The family\'s luck has to hold with it.' }],
      timeoutChoice:{ text:'Four people in smoke, no interception.', mod:-3, stress:4, note:'Kids in a smoke-filled stairwell while command deliberated. It gets close. Too close.' } },
  ],
  vehicle_collision: [
    { id:'vc_deterioration', title:'PATIENT CRASHING', victim:'Driver pinned — pressure dropping fast',
      situation:'Extrication is half done when Priya calls it: pressure crashing, she needs him out NOW, not in ten careful minutes.',
      choices:[
        { text:'Rapid extrication — B-pillar rip, accept the rougher move', mod:+1, stress:2, note:'Thirty seconds of controlled violence and he\'s on the board.' },
        { text:'Crash medicine in the car: line, fluids, tourniquet — buy the cutters time', mod:+1, stress:1, note:'Priya works inside the wreck while the tools scream around her.' },
        { text:'Stay methodical — a spinal injury is forever', mod:-1, stress:1, note:'Careful hands, steady pace. The monitor disagrees with the plan.' }],
      timeoutChoice:{ text:'The pressure made the call.', mod:-2, stress:3, note:'He crashed while the debate happened. Now everything is rapid.' } },
  ],
};

// Which calls escalate, and how many stages this time?
export function pickStages(callType, state) {
  const pool = ESCALATIONS[callType.id];
  if (!pool || !pool.length) return [];
  // Higher difficulty settings escalate more often
  const diff = state?.settings?.difficulty || 'standard';
  const chance = { casual: 0.5, standard: 0.7, veteran: 0.9 }[diff] ?? 0.7;
  if (Math.random() > chance) return [];
  return pool.slice(0, Math.random() < 0.4 ? Math.min(2, pool.length) : 1);
}
