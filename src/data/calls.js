// ===== CALL TYPES (20 total) =====

export const CALL_TYPES = [
  {
    id:'structure_fire', difficulty:'medium',
    name:'Structure Fire', units:'Engine 12, Truck 7, Squad 4', badge:'STRUCTURE FIRE',
    addresses:['4117 N. Thornton Ave','2218 W. Emberline St','551 N. Larkin St','8800 S. Cottage Hollow Ave'],
    details:[
      'Two-story residential, fire on the second floor. Possible occupant trapped.',
      'Commercial building, working fire on the first floor. Heavy smoke showing.',
      'Three-flat, fire in the basement with extension to the first floor.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7, Squad 4 — structure fire, two-story residential. Caller reports smoke on the second floor.' },
      { speaker:'Delgado',     line:'Squad 4, primary search. Truck 7 takes the roof. Engine 12 — line to the door.' },
      { speaker:'Kessler', line:'Copy that, Lieutenant. Squad 4 moving.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You execute perfectly — primary search clear, fire knocked down fast. Kade calls it textbook. The crew is pumped.', stats:{physical:6,knowledge:4,reputation:5,morale:4} },
      success:    { label:'SUCCESS',          text:'Good work under pressure. The fire\'s out, everyone\'s safe. Delgado claps you on the shoulder.', stats:{physical:4,knowledge:3,reputation:3,morale:2} },
      partial:    { label:'COMPLICATED SAVE', text:'You got the job done but it cost you. Overextended on the line — Kessler had to pull you back. Not your best.', stats:{physical:2,morale:-3,reputation:-2} },
      failure:    { label:'SETBACK',          text:'You froze when the floor started to give. Had to be pulled out. Everyone made it, but the debrief is brutal. You learn from this.', stats:{morale:-5,reputation:-4,physical:-2} },
    }
  },
  {
    id:'vehicle_collision', difficulty:'medium',
    name:'Vehicle Collision', units:'Engine 12, Truck 7, Ambulance 9', badge:'MVA — EXTRICATION',
    addresses:['Route 8 at Montrose','Riverside Dr & Concourse Ave','79th & Vantage'],
    details:[
      'Multi-vehicle accident, two confirmed entrapped. Fuel leak reported.',
      'Semi-truck versus passenger vehicle. One patient unconscious.',
      'High-speed collision, possible ejection. Fire in engine compartment.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7, Ambulance 9 — MVA with extrication. Multiple vehicles, fuel leak possible.' },
      { speaker:'Priya',   line:'Ambo 9 rolling. What\'s the patient count?' },
      { speaker:'Whitaker', line:'Engine 12 on scene. Secure the fuel — Jaws team on the B-pillar.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Efficient extrication under three minutes. Priya gets to the patient in time. "That\'s how it\'s done," Whitaker says.', stats:{physical:5,knowledge:4,reputation:5,morale:3} },
      success:    { label:'SUCCESS',          text:'Patient is out and in Priya\'s hands. Clean work. Everyone goes home.', stats:{physical:3,knowledge:3,reputation:3,morale:2} },
      partial:    { label:'COMPLICATED SAVE', text:'The door gave way unexpectedly. You caught it but lost time. Patient is okay, but it was closer than it should have been.', stats:{physical:2,knowledge:1,morale:-2} },
      failure:    { label:'SETBACK',          text:'Rushed the cut — compromised the structural integrity. Whitaker had to take over. Patient survived, but you hear about it in debrief.', stats:{morale:-4,reputation:-3} },
    }
  },
  {
    id:'medical_emergency', difficulty:'easy',
    name:'Medical Emergency', units:'Ambulance 9, Engine 12', badge:'MEDICAL EMERGENCY',
    addresses:['3302 S. Meridian Dr','1847 N. Cresthill Ave','6011 N. Bayshore Rd'],
    details:[
      'Chest pain and difficulty breathing, male, mid-50s. Wife reports sudden collapse.',
      'Unresponsive female, early 30s. Possible overdose, caller is panicking.',
      'Pediatric patient, seizure activity ongoing for 4 minutes.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Ambulance 9, Engine 12 — EMS response, possible cardiac event.' },
      { speaker:'Priya',   line:'Ambo 9 rolling. What\'s the scene status?' },
      { speaker:'Tibbets',    line:'Engine 12 will be there in two. Priya, we\'ll have ALS ready.' },
    ],
    primaryStats:['knowledge','morale'], statLabels:['Knowledge','Morale'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You and Priya work in perfect sync. Patient stabilized and delivered to Crestbridge with time to spare. Priya looks at you differently after this call.', stats:{knowledge:5,morale:5,reputation:5} },
      success:    { label:'SUCCESS',          text:'Patient is stable. Priya says you kept your head. Good call.', stats:{knowledge:4,morale:3,reputation:3} },
      partial:    { label:'COMPLICATED SAVE', text:'Missed a critical assessment step. Priya caught it. Patient is fine, but she gives you a look that says "we\'ll talk later."', stats:{knowledge:1,morale:-3,reputation:-1} },
      failure:    { label:'SETBACK',          text:'You panicked under family pressure. Priya had to take over. You helped — eventually — but the call shook you.', stats:{morale:-5,reputation:-3,knowledge:1} },
    }
  },
  {
    id:'hazmat', difficulty:'medium',
    name:'HazMat Incident', units:'Squad 4, HazMat 1, Engine 12', badge:'HAZMAT INCIDENT',
    addresses:['Calumet Industrial Corridor','4201 W. Fenwick Ave','Harborline & Anchor Pier'],
    details:[
      'Unknown chemical spill in a warehouse. Worker reports burning sensation and respiratory distress.',
      'Ammonia release in a refrigeration facility. Multiple workers evacuating.',
      'Overturned tanker truck, unknown placard, leaking into storm drain.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, HazMat 1, Engine 12 — chemical incident, industrial zone. Possible inhalation injuries.' },
      { speaker:'Kessler', line:'Squad 4 responding. We go Level B until we know what we\'re dealing with.' },
      { speaker:'Ortega',     line:'Copy. I\'ll pull the ERG — get an ID on that placard.' },
    ],
    primaryStats:['knowledge','leadership'], statLabels:['Knowledge','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You ID the material, coordinate the perimeter, and oversee safe decon. Kessler calls it "exactly right."', stats:{knowledge:6,leadership:5,reputation:5,command:3} },
      success:    { label:'SUCCESS',          text:'Scene managed safely. No civilian exposures. Slow but solid.', stats:{knowledge:4,leadership:3,reputation:3} },
      partial:    { label:'COMPLICATED SAVE', text:'You got confused on the ERG section. Ortega stepped in. Scene was contained, but you need more time with hazmat protocols.', stats:{knowledge:2,leadership:-2,morale:-2} },
      failure:    { label:'SETBACK',          text:'Underestimated the vapor cloud radius. Had to pull back and reset. Kessler is quiet on the ride back — the bad kind of quiet.', stats:{reputation:-4,leadership:-3,morale:-3} },
    }
  },
  {
    id:'false_alarm', difficulty:'easy',
    name:'False Alarm', units:'Engine 12, Truck 7', badge:'ALARM RESPONSE',
    addresses:['800 N. Concourse Ave','2100 W. Garrison Rd','Crestview Field Airport Terminal B'],
    details:[
      'Commercial fire alarm, high-rise building. Automatic suppression system activated.',
      'Residential alarm activation. Tenant reports possible smoke smell.',
      'Cooking fire on the 14th floor — contained before arrival.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7 — alarm response, commercial address. Automatic notification, no confirmation of fire.' },
      { speaker:'Delgado',     line:'Truck 7 responding. Let\'s not assume anything — go in like it\'s real until it\'s not.' },
      { speaker:'Whitaker', line:'Engine 12 copy. Water supply established just in case.' },
    ],
    primaryStats:['knowledge','reputation'], statLabels:['Knowledge','Reputation'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'False alarm confirmed fast and professionally. You managed the nervous building manager with composure. Kade hears about it from the property owner.', stats:{knowledge:3,reputation:5,morale:3,command:2} },
      success:    { label:'ALL CLEAR',        text:'Nothing showing. Quick sweep, all clear called. Delgado nods. "Good work being thorough."', stats:{knowledge:2,reputation:3} },
      partial:    { label:'MINOR ISSUE',      text:'Slow on the all-clear confirmation. Tied up the apparatus longer than needed.', stats:{knowledge:1,morale:-1} },
      failure:    { label:'SETBACK',          text:'You called all-clear before completing the sweep. Delgado sends you back. Tension in the cab on the way home.', stats:{reputation:-3,knowledge:-1,morale:-2} },
    }
  },
  {
    id:'high_rise', difficulty:'hard',
    name:'High-Rise Fire', units:'Engine 12, Truck 7, Squad 4, Battalion 6', badge:'HIGH-RISE FIRE',
    addresses:['900 N. Concourse Ave — 32nd Floor','161 E. Ashfall Ave — 18th Floor','505 N. Harborline Dr — 24th Floor'],
    details:[
      'High-rise residential, fire on the 32nd floor. Elevator banks locked out. Occupants self-evacuating via stairwells.',
      'Office tower, suspected electrical fire in server room on 18th floor. Halon suppression activated but fire spreading.',
      'Hotel high-rise, kitchen fire with extension to guest floors. Multiple 911 calls from upper floors.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'All companies — high-rise fire activation, 900 North Michigan. 32nd floor reported. Multiple callers. Elevators are out.' },
      { speaker:'Kade',   line:'Battalion 6 is command. Delgado — take Truck 7 up the stairwell. Kessler, I need Squad 4 on standby at floor 30.' },
      { speaker:'Delgado',     line:'Truck 7 copy. We\'re going up. This is a long climb, people — pace yourselves.' },
    ],
    primaryStats:['physical','leadership'], statLabels:['Physical','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You led the stair climb, coordinated floor searches, and had the fire knocked before the second alarm units arrived. Kade personally commends you at debrief. The crew is exhausted and elated.', stats:{physical:7,leadership:6,reputation:6,morale:5} },
      success:    { label:'SUCCESS',          text:'Fire contained to the floor of origin. All occupants accounted for. Your legs feel like concrete, but the job got done.', stats:{physical:5,leadership:4,reputation:4,morale:3} },
      partial:    { label:'COMPLICATED SAVE', text:'You hit a wall on the 28th floor — physically spent. Ortega had to take your position. Fire was contained but it cost you visibility with Kade.', stats:{physical:3,morale:-4,reputation:-3,leadership:-2} },
      failure:    { label:'SETBACK',          text:'You gave the wrong clearance on a floor — search wasn\'t complete. Kade found out. You sit through the longest debrief of your career. Nobody is angry. That\'s somehow worse.', stats:{morale:-6,reputation:-5,leadership:-3} },
    }
  },
  {
    id:'water_rescue', difficulty:'medium',
    name:'Water Rescue', units:'Squad 4, Marine 2', badge:'WATER RESCUE',
    addresses:['Fenwick Harbor — Lake Ashfall','Beacon Avenue Beach Pier','Union Harbor — South Basin'],
    details:[
      'Two kayakers capsized in Lake Ashfall. Water temperature 48°F. Moderate chop.',
      'Swimmer in distress 200 yards off Beacon Avenue Beach. Guard not on duty.',
      'Sailboat listing badly in Union Harbor — lone sailor unresponsive on deck.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, Marine 2 — water rescue, Fenwick Harbor. Two kayakers in the water, lake conditions rough.' },
      { speaker:'Kessler', line:'Squad 4 responding. Get the dry suits out. Lake is cold.' },
      { speaker:'Ortega',     line:'I see them on approach — southwest of the breakwater. Going in.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Both kayakers recovered conscious. Textbook execution. Ortega gives you the nod — that\'s the Squad 4 version of a standing ovation.', stats:{physical:6,knowledge:4,reputation:5,morale:4,leadership:2} },
      success:    { label:'SUCCESS',          text:'Both patients out of the water, vitals stable. Cold water survival protocol executed correctly.', stats:{physical:4,knowledge:3,reputation:4,morale:2} },
      partial:    { label:'COMPLICATED SAVE', text:'One patient got hypothermic before you reached them. They survived, but the window was closing. Kessler doesn\'t say anything on the way back.', stats:{physical:3,morale:-3,knowledge:1} },
      failure:    { label:'SETBACK',          text:'You capsized your own rescue boat in the chop. Ortega had to redirect to pull you out instead. The kayakers were recovered by Marine 2. You will never live this down at The Firebell.', stats:{morale:-6,reputation:-5,physical:-2} },
    }
  },
  {
    id:'train_derailment', difficulty:'hard',
    name:'Train Derailment', units:'Multiple Companies, Mass Casualty Response', badge:'TRAIN DERAILMENT',
    addresses:['Ashfall Transit Blue Line — Ashfall Intl Branch, Harlem Tunnel','Regional Rail NW Line — Elmgate','Ashfall Transit Brown Line — Thistle Bend'],
    details:[
      'Ashfall Transit Blue Line partial derailment in the Harlem Tunnel. Multiple cars off the rail. Reports of injured passengers.',
      'Regional Rail commuter train derailment — three cars overturned. Mass casualty event, 30+ injured estimated.',
      'Brown Line elevated train derailment at the Thistle Bend. Two cars dangling off the structure.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'All available companies — mass casualty event, ATA derailment, Harlem Tunnel. Requesting mutual aid. ICS activation.' },
      { speaker:'Kade',   line:'Battalion 6 assuming command. Kessler, I need Squad 4 doing primary extrication. Delgado, set up triage on the westbound platform.' },
      { speaker:'Delgado',     line:'Triage set. Priya, I need Ambo 9 as the treatment sector lead.' },
    ],
    primaryStats:['knowledge','leadership'], statLabels:['Knowledge','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You organized the triage sector with clinical precision. Twenty-three patients sorted and transported in under ninety minutes. The incident commander from mutual aid asks Kade who ran triage. It was you.', stats:{knowledge:7,leadership:7,command:5,reputation:6,morale:4} },
      success:    { label:'SUCCESS',          text:'All critical patients extracted and transported. The scene ran as well as a mass casualty can. Long night, but no preventable deaths.', stats:{knowledge:5,leadership:5,reputation:4,command:3} },
      partial:    { label:'COMPLICATED SAVE', text:'Communication broke down in the tunnel — you missed a radio channel change and your sector fell behind. Covered by mutual aid, but Kade noticed.', stats:{knowledge:2,leadership:-2,morale:-3,reputation:-2} },
      failure:    { label:'SETBACK',          text:'You froze at the scale of it. You\'ve never seen anything like this. A supervisor had to take over your sector. Nobody died because of it, but you carry the weight of that freeze for a long time.', stats:{morale:-7,leadership:-4,reputation:-4} },
    }
  },
  {
    id:'building_collapse', difficulty:'hard',
    name:'Building Collapse', units:'Squad 4, USAR Team, Engine 12, Truck 7', badge:'STRUCTURAL COLLAPSE',
    addresses:['Saltmarsh — 18th St Construction Site','Millrace Parking Garage — Level 3','Ironside Factory — Roof Section'],
    details:[
      'Under-construction building partial collapse. Multiple workers reported trapped in the rubble.',
      'Parking garage structural failure — three cars and two workers trapped under collapsed concrete.',
      'Factory roof collapse during occupied shift. Workers trapped in debris field, four confirmed missing.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, USAR, Engine 12 — structural collapse, Saltmarsh construction site. Reports of workers trapped. Instability ongoing.' },
      { speaker:'Kessler', line:'Squad 4 is the entry team. Nobody goes in without a structural assessment. Ortega, get me the site blueprints.' },
      { speaker:'Ortega',     line:'On it. I hear a voice from the east side — south corner of the collapse. Someone\'s alive in there.' },
    ],
    primaryStats:['physical','leadership'], statLabels:['Physical','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Four workers recovered alive. You called the void space correctly when others were ready to pull back. Kessler doesn\'t do compliments, but he told Kade what you did.', stats:{physical:7,leadership:6,reputation:6,morale:5,command:3} },
      success:    { label:'SUCCESS',          text:'Three workers out. One critical but stable at Crestbridge Medical. The building held long enough for the rescue. Clean work.', stats:{physical:5,leadership:4,reputation:4,morale:3} },
      partial:    { label:'COMPLICATED SAVE', text:'Secondary collapse while you were inside. You got out, the worker got out, but Kessler ripped into you at the scene for ignoring the instability warning. He\'s not wrong.', stats:{physical:4,morale:-4,leadership:-2,reputation:-2} },
      failure:    { label:'SETBACK',          text:'You misread the debris field and your entry created a secondary slide. You had to retreat. The worker was eventually recovered by USAR — alive, but after an extra hour of being trapped. The weight of that hour never leaves you.', stats:{morale:-6,reputation:-5,physical:-2,leadership:-3} },
    }
  },
  {
    id:'electrical_fire', difficulty:'medium',
    name:'Electrical Fire', units:'Engine 12, Truck 7', badge:'ELECTRICAL FIRE',
    addresses:['1420 N. Prairie Ave — Commercial','3300 W. Alder Ave — Residential','Foundry District Data Center'],
    details:[
      'Commercial building, electrical panel room fire. Heavy acrid smoke. ComEd en route to cut power.',
      'Residential fire originating in the basement electrical system. Owner reports "the whole panel exploded."',
      'Data center server fire — active electrical hazard, suppression system failed.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7 — electrical fire, commercial building, Foundry District. ComEd has been notified.' },
      { speaker:'Whitaker', line:'Engine 12 arriving. I see smoke from the basement. Nobody goes in until we know the power status.' },
      { speaker:'Delgado',     line:'Truck 7 on scene. Whitaker — confirm ComEd cutoff before we advance. I\'ll set up ventilation.' },
    ],
    primaryStats:['knowledge','morale'], statLabels:['Knowledge','Morale'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You correctly identified the live panel before anyone advanced and got ComEd to cut it in record time. Fire knocked, no injuries, equipment saved. Whitaker calls it "about as good as electrical gets."', stats:{knowledge:6,morale:4,reputation:5,command:2} },
      success:    { label:'SUCCESS',          text:'Fire suppressed without injury. ComEd confirmed cutoff before suppression. By the book.', stats:{knowledge:4,morale:3,reputation:3} },
      partial:    { label:'COMPLICATED SAVE', text:'You advanced before power was fully confirmed. Whitaker pulled you back. Flashover arc burned your arm through the turnout — minor injury, major lesson.', stats:{knowledge:2,physical:-2,morale:-3} },
      failure:    { label:'SETBACK',          text:'Applied water to an active panel. Arc flash. You\'re fine — the gear saved you — but Delgado had to pull you out and the fire spread to the next room. Nobody\'s laughing when you get back to the house.', stats:{morale:-5,reputation:-4,knowledge:-2} },
    }
  },
  {
    id:'gas_leak', difficulty:'medium',
    name:'Gas Leak', units:'Engine 12, Squad 4, Peoples Gas', badge:'GAS LEAK',
    addresses:['2219 W. Beacon Ave — Restaurant Row','5100 S. Vantage St — Residential Block','Millrace — Multi-unit High-rise'],
    details:[
      'Restaurant employee reports strong gas smell in the basement and on the first floor. Possible broken service line.',
      'Residential block gas leak — two residents reporting nausea. Smell extends to neighboring units.',
      'High-rise building, gas leak reported from multiple floors. Evacuation in progress.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Squad 4 — gas leak, restaurant row, 2219 West North. Peoples Gas en route. Evacuate the block.' },
      { speaker:'Whitaker', line:'Engine 12 on scene. I can smell it from the street. Evacuate everything within two hundred feet.' },
      { speaker:'Kessler', line:'Squad 4 copy. Ortega, get me a gas meter reading before we send anyone inside.' },
    ],
    primaryStats:['knowledge','leadership'], statLabels:['Knowledge','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You pinpointed the leak source and coordinated the evacuation before Peoples Gas arrived. They found a cracked service line exactly where you predicted. Kessler raises an eyebrow. "Good read," he says. High praise.', stats:{knowledge:6,leadership:5,reputation:5,command:2} },
      success:    { label:'SUCCESS',          text:'Block evacuated safely. Peoples Gas located and isolated the leak. No ignition, no injuries. Clean execution.', stats:{knowledge:4,leadership:3,reputation:4} },
      partial:    { label:'COMPLICATED SAVE', text:'Evacuation was slower than it needed to be. A second-floor resident refused to leave and you spent ten minutes arguing. Ortega had to help. Scene was safe but your time management cost you.', stats:{knowledge:2,leadership:-2,morale:-2} },
      failure:    { label:'SETBACK',          text:'Sent someone in too early — Peoples Gas wasn\'t on scene, concentrations were still in the explosive range. Whitaker shut it down before anything ignited, but it was close. Close calls are how firefighters die.', stats:{morale:-6,reputation:-5,knowledge:-2,leadership:-2} },
    }
  },
  {
    id:'wildland', difficulty:'medium',
    name:'Wildland Interface Fire', units:'Engine 12, Forestry Unit', badge:'WILDLAND FIRE',
    addresses:['Palos Hills Forest Preserve — South Trail','Des Plaines River Greenway','North Branch Prairie Restoration Site'],
    details:[
      'Forest preserve brush fire spreading toward a residential neighborhood. Wind shifting.',
      'Abandoned railroad right-of-way fire. Dry conditions, high spread risk to adjacent structures.',
      'Restoration prairie fire, driven by 20mph winds. Structures within 500 yards downwind.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Forestry Unit — wildland interface fire, Palos Hills Preserve. Wind out of the southwest at 18 mph. Structures threatened.' },
      { speaker:'Whitaker', line:'Engine 12 responding. This is not what we trained for. Everyone stay alert — wildland fire moves differently.' },
      { speaker:'Delgado',     line:'Truck 7 en route for structure protection. Whitaker — establish a safety zone before you go direct attack.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You established a successful anchor point and flanked the fire before it reached the structures. Classic wildland tactics applied to an urban interface scenario. Forestry tells Kade they want you for their joint training program.', stats:{physical:6,knowledge:5,reputation:5,leadership:3} },
      success:    { label:'SUCCESS',          text:'Structures protected. Fire contained to the preserve with strategic backfires. Smoky, exhausting, successful.', stats:{physical:5,knowledge:4,reputation:4} },
      partial:    { label:'COMPLICATED SAVE', text:'Wind shift caught you on the wrong side of the line. You had to pull back and reposition. Structures were protected by Forestry while you regrouped — humbling.', stats:{physical:3,knowledge:1,morale:-3} },
      failure:    { label:'SETBACK',          text:'You went direct attack without establishing a safety zone. The fire crowned. You barely made it to the black in time. Forestry pulls you out and finishes the job. Delgado doesn\'t yell at the firehouse. She\'s very quiet instead.', stats:{morale:-6,physical:-2,reputation:-4,knowledge:-2} },
    }
  },
  {
    id:'swift_water', difficulty:'hard',
    name:'Swift Water Rescue', units:'Squad 4, Marine 2, Ambulance 9', badge:'SWIFT WATER RESCUE',
    addresses:['Ashfall River — Heron Island Bend','North Shore Channel — Marsh Hollow Lagoons','South Branch — Cinder Creek'],
    details:[
      'Person swept into the Ashfall River during a storm surge. Current running at 8 knots. One bystander reports victim going under.',
      'Kayaker pinned against a flood control structure, North Shore Channel. Rising water levels.',
      'Vehicle drove off an embankment into the South Branch. Driver visible but not responding.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, Marine 2, Ambo 9 — swift water rescue, Ashfall River at Heron Island. Subject in the water, current is running hard.' },
      { speaker:'Kessler', line:'Squad 4 is rolling. Ortega — throw ropes and dry suits. We\'re going in.' },
      { speaker:'Ortega',     line:'I see the subject — downstream of the bridge, grabbing the support beam. We have maybe two minutes.' },
    ],
    primaryStats:['physical','morale'], statLabels:['Physical','Morale'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Throw rope on the first attempt, victim recovered in ninety seconds. You went in after Kessler gave the go and didn\'t hesitate. "That\'s what Squad does," Ortega says. You\'re starting to understand what that means.', stats:{physical:7,morale:6,reputation:6,leadership:3} },
      success:    { label:'SUCCESS',          text:'Victim recovered. Hypothermic but alive. Good execution in a high-stress environment.', stats:{physical:5,morale:4,reputation:4} },
      partial:    { label:'COMPLICATED SAVE', text:'You got in the water and the current took you further downstream than planned. Ortega and Kessler recovered both you and the victim. You were rescue and rescuee for a few tense minutes.', stats:{physical:4,morale:-4,reputation:-2} },
      failure:    { label:'SETBACK',          text:'You froze at the water\'s edge. The current looked impossible. Kessler went in himself and recovered the victim. You stood on the bank. You\'ll spend a long time deciding what kind of firefighter you want to be.', stats:{morale:-7,reputation:-6,leadership:-3} },
    }
  },
  {
    id:'industrial_accident', difficulty:'medium',
    name:'Industrial Accident', units:'Engine 12, Squad 4, Ambulance 9', badge:'INDUSTRIAL ACCIDENT',
    addresses:['Ironworks Railcar Works — Building D','Southeast Side Steel Plant','Back of the Yards Meatpacking Facility'],
    details:[
      'Industrial press malfunction — worker\'s arm entrapped. Hydraulic fluid everywhere. Patient in significant pain.',
      'Steel plant: worker fell into a cooling tank. Non-fatal but serious burns. Other workers attempting rescue.',
      'Meatpacking conveyor entrapment — worker cannot be safely extracted without mechanical disassembly.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Squad 4, Ambulance 9 — industrial entrapment, Ironworks Row. Patient entrapped in machinery, extremity injury.' },
      { speaker:'Priya',   line:'Ambo 9 rolling. Advise patient is conscious and alert — I\'ll need IV access before any extrication attempt.' },
      { speaker:'Whitaker', line:'Engine 12 on scene. The machine is still under power. Cut the power — NOW.' },
    ],
    primaryStats:['knowledge','leadership'], statLabels:['Knowledge','Leadership'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You disassembled the machine section without causing further injury, Priya maintained IV access throughout, and the patient went to Crestbridge with the arm intact. The plant supervisor shakes your hand. Factory workers don\'t do that for anyone.', stats:{knowledge:6,leadership:5,morale:4,reputation:5} },
      success:    { label:'SUCCESS',          text:'Patient extracted, vitals maintained. Long, careful job done right. Priya gives you a real smile — not the professional one.', stats:{knowledge:4,leadership:3,morale:3,reputation:3} },
      partial:    { label:'COMPLICATED SAVE', text:'Partial entrapment remained after initial extrication attempt — had to call in a second tool. The delay cost Priya\'s IV access. Patient went to Crestbridge, but it wasn\'t clean.', stats:{knowledge:2,leadership:-1,morale:-2} },
      failure:    { label:'SETBACK',          text:'You cut in the wrong sequence and the machine shifted. Patient screamed. Ortega stabilized the machine from the other side in time, but the incident report goes to the battalion. You spend a shift writing your explanation.', stats:{morale:-5,reputation:-4,leadership:-2} },
    }
  },
  {
    id:'explosion', difficulty:'hard',
    name:'Explosion', units:'All Companies, ATF, AFD Bomb Squad', badge:'EXPLOSION',
    addresses:['Millrace — Mixed-Use Building','Copperline — Gas Main Rupture Site','1901 S. Vantage — Commercial Kitchen'],
    details:[
      'Explosion reported in a mixed-use Millrace building. Origin unknown. Structure fire now burning on three floors, potential for secondary explosions.',
      'Gas main rupture ignition — building facade blown off. Rubble in the street. Multiple callers reporting injured pedestrians.',
      'Commercial kitchen explosion — fire in the restaurant, collapse of the rear wall. Cook trapped under debris.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'All companies — explosion, Millrace, 800 block of West Randolph. Structure fire, multiple injuries. Second explosion possible. Stage at a distance.' },
      { speaker:'Kade',   line:'Battalion 6 is command. Nobody advances until I say so. Ortega, I need Squad 4 ready for rapid entry on my word.' },
      { speaker:'Delgado',     line:'Kade — I have a confirmed victim in the window on the third floor. Requesting entry.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You read the building correctly and identified the safe entry point when Kade gave the word. Victim on the third floor recovered. Secondary explosion occurred after you were clear. Timing is everything.', stats:{physical:7,knowledge:6,morale:5,reputation:6,leadership:3} },
      success:    { label:'SUCCESS',          text:'Entry made, victim recovered, fire controlled before secondary ignition. Textbook high-risk entry protocol.', stats:{physical:5,knowledge:5,reputation:5,morale:3} },
      partial:    { label:'COMPLICATED SAVE', text:'You went in before Kade gave clearance — your gut said go. The victim was recovered, but Kade pulls you aside afterward. "That was not your call." He\'s right, and you both know it.', stats:{physical:4,morale:-4,reputation:-3,command:-2} },
      failure:    { label:'SETBACK',          text:'Secondary explosion while companies were advancing. You were caught in the blast wave — turnout gear absorbed the worst of it. You\'re pulled from the scene. Sitting on a bumper watching your crew finish the job without you is a specific kind of misery.', stats:{morale:-7,physical:-3,reputation:-4} },
    }
  },
  {
    id:'multi_vehicle', difficulty:'medium',
    name:'Multi-Vehicle Pile-up', units:'Multiple Engine Companies, Truck 7, Ambulance 9', badge:'MASS CASUALTY MVA',
    addresses:['Route 26 Dan Ryan — Mile Marker 57','I-290 Eisenhower — Near Larkspur Ave','Route 8 Kennedy — Spaghetti Bowl Interchange'],
    details:[
      'Eight-vehicle pile-up on the Dan Ryan in fog. Multiple vehicles, multiple patients. Lane closures. 45 mph reduced speed.',
      'Ice-related chain collision on the Eisenhower. Tractor-trailer jackknifed blocking three lanes. 6+ vehicles involved.',
      'Rush-hour crash cascade on the Kennedy — twelve vehicles, initial reports of 20+ patients.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'All companies — mass casualty MVA, Route 26 southbound, mile marker 57. 8-plus vehicles, 20-plus patients. SSP requesting AFD support.' },
      { speaker:'Priya',   line:'Ambo 9 needs a triage officer. Somebody coordinate patient priority — I can\'t be everywhere.' },
      { speaker:'Delgado',     line:'I\'ve got triage. Priya — you take the criticals. Whitaker — you\'re transport coordination.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'You triaged twenty-two patients in eleven minutes. Four criticals to Crestbridge, the rest cleared. Priya called you "the best triage partner I\'ve ever had" and she does not give compliments.', stats:{physical:5,knowledge:6,morale:5,reputation:5,command:3} },
      success:    { label:'SUCCESS',          text:'All patients sorted and transported. Scene cleared in ninety minutes. Long, loud, cold, and successful.', stats:{physical:4,knowledge:4,reputation:4,morale:3} },
      partial:    { label:'COMPLICATED SAVE', text:'A patient you marked as minor deteriorated in the transport queue. Priya caught it and upgraded them just in time. It was right call, wrong timing. You review your triage assessment twice a day for the next week.', stats:{knowledge:2,morale:-3,reputation:-2} },
      failure:    { label:'SETBACK',          text:'Scene management collapsed — your sector had no coordination. SSP redirected traffic without notifying you and secondary vehicles almost drove through an active triage zone. Kade restructured command mid-incident. Professional humiliation.', stats:{morale:-6,reputation:-5,leadership:-3,command:-2} },
    }
  },
  {
    id:'cardiac_arrest', difficulty:'medium',
    name:'Cardiac Arrest — Mass Casualty', units:'Ambulance 9, Engine 12, Ambulance 21', badge:'MASS CASUALTY EMS',
    addresses:['Founders Park — Outdoor Concert','Coliseum Field Tailgate Zone','Anchor Pier Festival Grounds'],
    details:[
      'Outdoor concert, Founders Park. Two simultaneous cardiac arrest patients — crowd of 4,000. AED locations unknown.',
      'Tailgate zone, Coliseum Field. One cardiac arrest in the parking lot, second possible arrest reported two minutes later.',
      'Festival crowd, Anchor Pier. Elderly male down, no pulse. Bystanders performing CPR.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Ambulance 9, Engine 12 — multiple cardiac arrests, Founders Park. Two confirmed patients, CPR in progress by bystanders.' },
      { speaker:'Priya',   line:'Ambo 9 en route. Two arrests means I need someone running the second patient. Who\'s got their ACLS?' },
      { speaker:'Tibbets',    line:'Engine 12 copy. I\'ll run patient two. Priya, coordinate over radio.' },
    ],
    primaryStats:['knowledge','morale'], statLabels:['Knowledge','Morale'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Both patients converted — one in the field, one en route. You ran an impeccable ALS protocol on patient two while Priya managed patient one. The attending at Crestbridge Medical shakes your hand. Priya doesn\'t say a word, just squeezes your arm.', stats:{knowledge:7,morale:6,reputation:6} },
      success:    { label:'SUCCESS',          text:'Both patients survived to hospital. Excellent team performance under crowd pressure.', stats:{knowledge:5,morale:4,reputation:4} },
      partial:    { label:'COMPLICATED SAVE', text:'One patient converted. One patient was lost en route. Medical science has limits and you hit them today. Priya explains the difference between a bad outcome and a preventable one. You hold onto that.', stats:{knowledge:3,morale:-4,reputation:-1} },
      failure:    { label:'SETBACK',          text:'You froze when the crowd surged toward the patient — couldn\'t establish a clear work space. By the time you got in, perfusion time had elapsed. The outcome was predetermined by thirty seconds of hesitation. Priya is professional about it. That makes it worse.', stats:{morale:-6,reputation:-4,knowledge:-1} },
    }
  },
  {
    id:'trench_rescue', difficulty:'hard',
    name:'Trench Rescue', units:'Squad 4, USAR, Engine 12', badge:'TRENCH RESCUE',
    addresses:['Saltmarsh — 21st St Utility Project','Near West Side — Sewer Rehab Site','Lincoln Square — Watermain Replacement'],
    details:[
      'Trench collapse on a utility project — one worker buried to the chest, second worker partially buried and conscious.',
      'Sewer rehab excavation collapse. One worker unaccounted for, last seen in the trench.',
      'Watermain replacement site — trench wall failure. One confirmed buried, soil continuing to shift.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Squad 4, USAR, Engine 12 — trench rescue, Saltmarsh, 21st Street. Workers trapped following collapse. Unstable conditions.' },
      { speaker:'Kessler', line:'Nobody approaches the edge without a trained trench rescuer. Ortega — panels and shores out now.' },
      { speaker:'Ortega',     line:'On it. Patient one is conscious — I can see his head. Patient two I can\'t confirm yet.' },
    ],
    primaryStats:['physical','knowledge'], statLabels:['Physical','Knowledge'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Both workers out alive. You shored the trench walls with textbook technique under immense time pressure. Kessler tells Kade it was the best technical rescue he\'s seen from someone at your level. You don\'t find out he said this until the shift after.', stats:{physical:7,knowledge:6,leadership:4,reputation:6,morale:5} },
      success:    { label:'SUCCESS',          text:'Both workers recovered. Careful, methodical work. No secondary collapse. That\'s the definition of success in trench rescue.', stats:{physical:5,knowledge:5,reputation:4,morale:3} },
      partial:    { label:'COMPLICATED SAVE', text:'Minor secondary collapse during patient packaging. Nobody buried, but the soil shifted and you lost your shoring panel. USAR took over while you reset. Workers recovered. Nobody adds it to the report, but you know.', stats:{physical:4,knowledge:2,morale:-3} },
      failure:    { label:'SETBACK',          text:'You approached the trench edge without shoring in place — protocol violation. The vibration caused a secondary collapse. Kessler exploded at you in front of the entire scene. He\'s not wrong. USAR recovered both workers. You stood behind the tape and watched.', stats:{morale:-7,reputation:-6,leadership:-4,knowledge:-2} },
    }
  },
  {
    id:'elevator_rescue', difficulty:'easy',
    name:'Elevator Rescue', units:'Engine 12, Truck 7', badge:'ELEVATOR RESCUE',
    addresses:['30 W. Federal St — High-Rise','1000 N. Harborline Dr — Residential Tower','333 W. Riverside Dr — Office Building'],
    details:[
      'Elevator stalled between floors 22 and 23. Six occupants, one reports chest pain.',
      'Residential tower elevator failure — two occupants, one elderly woman, trapped for 45 minutes.',
      'Office building elevator — stuck between lobby and parking level. Three occupants, no injuries.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7 — elevator rescue, 30 West Monroe. Six occupants between floors 22 and 23. One medical complaint.' },
      { speaker:'Whitaker', line:'Engine 12 on scene. I\'m getting building management to pull the override keys. Delgado, can Truck 7 access from the floor above?' },
      { speaker:'Delgado',     line:'Truck 7 at floor 23, accessing the shaft now. Whitaker — advise occupants to stay away from the doors.' },
    ],
    primaryStats:['knowledge','physical'], statLabels:['Knowledge','Physical'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Occupants out in eleven minutes. The patient with chest pain got immediate assessment from Priya who happened to be nearby. Whitaker declares it "the smoothest elevator call in AFD history." He exaggerates, but not by much.', stats:{knowledge:4,morale:5,reputation:4} },
      success:    { label:'SUCCESS',          text:'All occupants evacuated safely. Medical assessment completed. Elevator company notified. Smooth operation.', stats:{knowledge:3,morale:3,reputation:3} },
      partial:    { label:'MINOR ISSUE',      text:'Took longer than expected — building management lost the override key and you had to go manual. Occupants were anxious. Everyone out eventually, just not elegantly.', stats:{knowledge:2,morale:-1} },
      failure:    { label:'SETBACK',          text:'You misidentified the shaft access point. While you were on the wrong floor, the patient with chest pain went into genuine distress. Priya had to be called and entered through the escape hatch. Everyone survived, but your delay was in the report.', stats:{reputation:-3,morale:-3} },
    }
  },
  {
    id:'house_fire_children', difficulty:'hard',
    name:'House Fire — Children Trapped', units:'Engine 12, Truck 7, Ambulance 9', badge:'HOUSE FIRE — CHILDREN TRAPPED',
    addresses:['1621 N. Hawthorne Ave','4418 W. Ashfall Ave','2909 S. Whitlock Ave — Saltmarsh'],
    details:[
      'Two-story residential, fire on the first floor. Caller reports two children trapped on the second floor, unable to reach the stairs.',
      'Single-family home, fully involved ground floor. Neighbor reports seeing a child at a second-floor window.',
      'Three-flat, fire in unit one. Mother outside reports her two kids — ages 4 and 7 — are in the back bedroom on the second floor.',
    ],
    dialogue:[
      { speaker:'Dispatch', line:'Engine 12, Truck 7, Ambo 9 — house fire with children reported trapped, 1621 North Hawthorne. Mother is outside, two children unaccounted for.' },
      { speaker:'Delgado',     line:'Truck 7 on scene. I see smoke on the second floor — no flames visible yet. We can still get to them. Ladder to the window NOW.' },
      { speaker:'Whitaker', line:'Engine 12 making the line. Delgado — you have maybe ninety seconds before that stairwell goes.' },
    ],
    primaryStats:['physical','morale'], statLabels:['Physical','Morale'],
    outcomes:{
      critSuccess:{ label:'CRITICAL SUCCESS', text:'Both children out through the window before the stairwell flashover. You went up that ladder without hesitation. Delgado met you at the top. The mother\'s face when she got her kids back — that\'s the whole reason. That\'s all of it.', stats:{physical:8,morale:8,reputation:7,leadership:3} },
      success:    { label:'SUCCESS',          text:'Both children recovered. Smoke inhalation, but they\'ll be okay. Priya has them on O2 in the ambo before you\'re back on the ground.', stats:{physical:6,morale:6,reputation:5} },
      partial:    { label:'COMPLICATED SAVE', text:'One child out the window. The second had retreated deeper into the room — you found them in the closet. Floor gave way beneath you during egress. You made it out. The child made it out. Nothing else matters, but it cost you physically.', stats:{physical:5,morale:-3,reputation:1} },
      failure:    { label:'SETBACK',          text:'The window approach failed — ladder malpositioning. Delgado went through the front door and got both children out through the smoke. They survived. She doesn\'t say anything. She doesn\'t need to. You made a mistake that, this time, didn\'t cost what it could have.', stats:{morale:-7,reputation:-5,physical:-2} },
    }
  },
];
