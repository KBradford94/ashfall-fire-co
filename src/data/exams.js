// ===== EXAM QUESTIONS, ORAL BOARDS, VACANCY STORIES =====

export const EXAM_QUESTIONS = {
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

export const ORAL_BOARD_SCENARIOS = {
  driver_engineer: [
    { panelist:'Lt. Kessler', question:'You arrive at a structure fire and your pump primes but pressure reads erratically — it\'s fluctuating 20-40 psi. You have 4 firefighters ready to advance. What do you do?',
      choices:[
        { text:'Switch to tank water and attack while flagging the gauge issue for post-incident maintenance', stat:'knowledge', score:2 },
        { text:'Halt the advance, troubleshoot the pump (check relief valve, tank-to-pump valve, throttle), and radio the condition before committing crew', stat:'knowledge', score:3 },
        { text:'Request mutual aid for an alternate water supply and hold until resolved', stat:'leadership', score:1 },
      ]},
    { panelist:'BC Kade', question:'During a pre-shift inspection you find the aerial has a hydraulic fluid leak near the base of the turntable. What happens next?',
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
    { panelist:'BC Kade', question:'You arrive first due at a 2-story residential with heavy smoke from a first floor window. You have Engine 12 with 3 firefighters. No other units are on scene. What are your first three actions?',
      choices:[
        { text:'Mask up and advance an attack line immediately with all 3 firefighters', stat:'physical', score:1 },
        { text:'Establish command, conduct a 360 size-up, verify water supply, and position Engine 12 — advance with 2 in, 1 out (establish 2-in/2-out before interior entry)', stat:'knowledge', score:3 },
        { text:'Stage until a second unit arrives before any action', stat:'knowledge', score:1 },
      ]},
    { panelist:'Dep. Commissioner Kade', question:'A firefighter under your command has been arriving 5-10 minutes late to briefing for the last three shifts. How do you handle it?',
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
    { panelist:'BC Kade', question:'A Lieutenant under your command is technically sound but struggles to communicate decisions to their crew — resulting in delays on scene. How do you develop them?',
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
    { panelist:'BC Kade', question:'You receive a AFD directive to reduce apparatus response times by 15% or face district metrics scrutiny. You believe the current times reflect appropriate safety protocols. What do you do?',
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
        { text:'Commit all resources to the structure fire — life risk is highest', stat:'physical', score:1 },
        { text:'Assess life risk at both incidents, assign resources proportionally, immediately request mutual aid to fill the gap, and position yourself at the higher-complexity incident', stat:'command', score:3 },
        { text:'Respond personally to the MVA and delegate the structure fire to the arriving Captain', stat:'leadership', score:1 },
      ]},
    { panelist:'Dep. Commissioner Kade', question:'A Captain in your district has built strong loyalty with their crew but consistently underperforms on documentation and post-incident reporting. How do you address this over the next quarter?',
      choices:[
        { text:'Transfer the Captain to address the problem indirectly', stat:'morale', score:0 },
        { text:'Set clear, documented expectations with timelines; provide a documentation mentor; conduct quarterly check-ins; make it clear this is a promotion-track requirement, not optional', stat:'command', score:3 },
        { text:'Accept the trade-off — strong crew leader is more valuable than paperwork', stat:'knowledge', score:1 },
      ]},
  ],
};

// ===== VACANCY STORY EVENTS =====
// The company you're assigned to is random, and so is what happens to its
// current officer — each company has multiple lore-consistent departure
// variants. `departure.type` is 'promote' (roster member gets new role/unit)
// or 'remove' (they leave Firehouse 12 and come off the roster).
export const VACANCY_STORIES = [
  { company:'Engine 12',
    variants:[
      { id:'tibbets_promoted', label:'Lieutenant promoted', departerId:'tibbets',
        departure:{ type:'promote', role:'Captain', unit:'Firehouse 12' },
        story:'Lieutenant Tibbets has been promoted to Captain of Firehouse 12. His slot on Engine 12 is now open.',
        ceremony:'BC Kade calls you into his office. Tibbets\'s chair at the officer\'s desk is empty. "Tibbets earned his bars. And now this company needs someone to hold what he built. I think that\'s you."',
        departureNote:'Tibbets shakes your hand in the apparatus bay. "Don\'t let the Engine get sloppy on the line. And don\'t think you\'re rid of me — I\'ll be right upstairs." He means both.' },
      { id:'tibbets_retired', label:'Lieutenant retired', departerId:'tibbets',
        departure:{ type:'remove' },
        story:'After more than three decades on the job, Lieutenant Tibbets has filed his retirement papers. A vacancy has opened on Engine 12.',
        ceremony:'BC Kade calls you into his office. "Thirty-plus years, and Tibbets\'s last request was a say in who takes his engine. He said your name before I finished the question."',
        departureNote:'The house throws Tibbets a send-off at The Firebell. Before last call he finds you. "The couch stays. So does the standard I set. Understood?" It\'s the closest he gets to a blessing.' },
    ]},
  { company:'Truck 7',
    variants:[
      { id:'delgado_training', label:'Lieutenant transferred', departerId:'delgado',
        departure:{ type:'remove' },
        story:'Lieutenant Delgado has accepted a transfer to a training command role at the Academy. A Lieutenant slot has opened on Truck 7.',
        ceremony:'Delgado finds you in the apparatus bay the night before she leaves. "I told Kade you were ready before he asked me. Keep the crew sharp. That\'s the job." She hands you her old tactical binder.',
        departureNote:'The crew lines up quietly to say goodbye to Delgado. You\'ll fill her shoes. That\'s the hardest thing anyone has ever asked you to do.' },
      { id:'delgado_promoted', label:'Lieutenant promoted', departerId:'delgado',
        departure:{ type:'promote', role:'Captain', unit:'Firehouse 12' },
        story:'Lieutenant Delgado has been promoted to Captain of Firehouse 12. Her slot on Truck 7 is now open.',
        ceremony:'Kade\'s office. Delgado is there too, new bars on her collar. "I get a say in who takes 81," she says. "I already gave Kade my answer. Don\'t make me look bad."',
        departureNote:'Delgado hands you her old tactical binder. "Everything I know about that truck is in there. The rest you learn the hard way — I did."' },
    ]},
  { company:'Squad 4',
    variants:[
      { id:'kessler_captain', label:'Lieutenant promoted', departerId:'kessler',
        departure:{ type:'promote', role:'Captain', unit:'Firehouse 12' },
        story:'Nate Kessler has been promoted to Captain of Firehouse 12. For the first time in years, Squad 4 needs a new Lieutenant.',
        ceremony:'Kade\'s office. Kessler leans against the wall, new bars on his collar. "Squad 4 doesn\'t take just anyone," he says. "I told Kade there was exactly one name on my list." He looks at you.',
        departureNote:'Kessler walks you to the Squad rig. "It\'s your rig now. Your crew. I\'m still in the building — but on scene, Squad is yours. Don\'t make me regret it."' },
      { id:'kessler_ofi', label:'Lieutenant transferred', departerId:'kessler',
        departure:{ type:'remove' },
        story:'Nate Kessler has accepted a full-time investigator position with the Office of Fire Investigation. Squad 4 needs a new Lieutenant.',
        ceremony:'Kade\'s office. "Kessler\'s going to FIU — arson investigation, full time. His one condition was a say in who takes Squad. He wrote down one name." Kade slides the paper across the desk. It\'s yours.',
        departureNote:'Kessler clears out his locker without ceremony. At the door he stops. "Squad 4 has a standard. It\'s yours to keep now." A single nod. That\'s everything.' },
    ]},
];
