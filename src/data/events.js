// ===== EVENT DATA =====

export const ACADEMY_INSTRUCTORS = {
  fire: {
    lead:      { name:'Chief Instructor Walt Ramsey', short:'Ramsey',   bio:'28-year AFD veteran. Former Battalion Chief. Runs the academy like he ran his company — high standards, no excuses, absolute fairness.' },
    physical:  { name:'Instructor Maria Torres',      short:'Torres',   bio:'14-year veteran, former Squad 4 company. Moved to training after an injury. The hardest fitness drill you\'ll ever run is hers.' },
    assistant: { name:'Instructor Dan Kessler',       short:'Kessler',  bio:'8 years AFD, former Engine company. More approachable than Ramsey or Torres. Teaches hose ops, apparatus basics, crew culture.' },
  },
  ems: {
    lead:     { name:'Training Coordinator Patricia Nash', short:'Nash',     bio:'20-year paramedic, Ashfall EMS training division. Strict on protocol, deeply human. Every procedure she teaches has a story behind it.' },
    clinical: { name:'Clinical Advisor Dr. Reyes',         short:'Dr. Reyes', bio:'Physician advisor to the paramedic program. Leads the written exam section. "In this field, close enough isn\'t good enough."' },
  },
};

export const ACADEMY_EVENTS = [
  {
    id:'w1_orientation', week:1, type:'training', tag:'ORIENTATION',
    icon:'🎓', title:'Academy Orientation',
    desc:'Chief Instructor Ramsey stands at the front of the room and surveys the new class for a long moment before speaking. "I\'ve been doing this for twenty-eight years. The question I ask myself about every candidate in this room is: what are they made of when it gets hard? Because it will get hard." You have to choose how to spend your first afternoon.',
    choices:[
      { text:'Hit the gym — establish yourself physically from day one', effect:{physical:5}, effectLabel:'+5 Physical' },
      { text:'Study the orientation packet and SOG overview late into the evening', effect:{knowledge:5}, effectLabel:'+5 Knowledge' },
      { text:'Introduce yourself to every candidate — build the network early', effect:{morale:4,reputation:2}, effectLabel:'+4 Morale, +2 Reputation' },
    ]
  },
  {
    id:'w2_ladder', week:2, type:'training', tag:'TRAINING',
    icon:'🔧', title:'Ladder & Hose Operations',
    desc:'Instructor Torres runs your class through ladder raises and hose coupling under a timed drill. She watches with folded arms, says nothing unless something is dangerous or wrong. "Speed is life. Hesitation kills. And I will time every single one of you." You fall behind on the ladder raise.',
    choices:[
      { text:'Power through — brute force it to the finish line', effect:{physical:4,morale:-2}, effectLabel:'+4 Physical, -2 Morale' },
      { text:'Stop and ask Torres for a technique correction right there', effect:{knowledge:4,reputation:2}, effectLabel:'+4 Knowledge, +2 Reputation' },
      { text:'Stay after the drill and practice until you get it right', effect:{physical:3,knowledge:3}, effectLabel:'+3 Physical, +3 Knowledge' },
    ]
  },
  {
    id:'w3_bunker', week:3, type:'training', tag:'TRAINING',
    icon:'🧥', title:'Bunker Gear & SCBA',
    desc:'The physical demands of the week escalate. You must don full bunker gear in under 90 seconds following a three-mile run. Instructor Kessler walks among the candidates calling time. "Ninety seconds is the standard. The fire doesn\'t wait for you to catch your breath." Several candidates fail the first attempt.',
    choices:[
      { text:'Drill the sequence obsessively until it\'s pure muscle memory', effect:{physical:3,knowledge:5}, effectLabel:'+3 Physical, +5 Knowledge' },
      { text:'Pace yourself — a clean pass beats a panicked fail', effect:{knowledge:4,morale:2}, effectLabel:'+4 Knowledge, +2 Morale' },
      { text:'Help the struggling candidates in your group get it right', effect:{morale:3,leadership:4,reputation:2}, effectLabel:'+3 Morale, +4 Leadership, +2 Rep' },
    ]
  },
  {
    id:'w4_kitchen', week:4, type:'social', tag:'SOCIAL',
    icon:'🍳', title:'Kitchen Detail',
    desc:'The class is assigned kitchen duty at the training facility. Instructor Kessler makes a point of stopping by. "You think kitchen duty is beneath you? The firehouses that eat well together are the ones that perform well under pressure. This matters." He means it.',
    choices:[
      { text:'Cook something genuinely impressive — show you take all of it seriously', effect:{morale:5,reputation:3}, effectLabel:'+5 Morale, +3 Reputation' },
      { text:'Ask Kessler about Engine company culture while you cook', effect:{knowledge:4,reputation:3}, effectLabel:'+4 Knowledge, +3 Reputation' },
      { text:'Keep your head down and get the job done efficiently', effect:{morale:3}, effectLabel:'+3 Morale' },
    ]
  },
  {
    id:'w5_liveburn', week:5, type:'training', tag:'LIVE BURN',
    icon:'🔥', title:'Live Burn Exercise',
    desc:'Your class enters a fully involved burn building for the first time. The heat is like a wall. Inside, disorientation sets in fast. Torres is outside on the radio. "Control your breathing. Read the smoke. Trust your training." Ramsey is in the safety sector watching through the viewport. Every second counts.',
    choices:[
      { text:'Advance aggressively — push through to the seat of the fire', effect:{physical:6,morale:-3}, effectLabel:'+6 Physical, -3 Morale' },
      { text:'Move methodically, reading the fire conditions before each step', effect:{knowledge:6,physical:2}, effectLabel:'+6 Knowledge, +2 Physical' },
      { text:'Take point — lead your group through the evolution', effect:{leadership:6,physical:3,morale:2}, effectLabel:'+6 Leadership, +3 Physical, +2 Morale' },
    ]
  },
  {
    id:'w6_written', week:6, type:'exam', tag:'WRITTEN EXAM',
    icon:'📝', title:'Written Examination',
    desc:'The midterm written exam covers fire behavior, ICS structure, hazmat protocols, and NFPA standards. Failure means remediation and a delayed graduation. Ramsey reminds the class before distributing the papers: "This exam is not a formality. It is a measure of whether you are prepared to act correctly when someone\'s life depends on it."',
    choices:[
      { text:'Trust your preparation — work through it methodically', effect:{knowledge:7,morale:2}, effectLabel:'+7 Knowledge, +2 Morale' },
      { text:'Rush through to allow time for a second review of every answer', effect:{knowledge:5,morale:-2}, effectLabel:'+5 Knowledge, -2 Morale' },
      { text:'Focus your remaining time on your known weak areas', effect:{knowledge:6}, effectLabel:'+6 Knowledge' },
    ]
  },
  {
    id:'w7_practical', week:7, type:'exam', tag:'PRACTICAL EXAM',
    icon:'⚙️', title:'Practical Skills Exam',
    desc:'The full practical exam. Every skill from the last seven weeks tested in sequence: rappel, pump ops, auto extrication, patient packaging. Torres and Ramsey observe each station. Kessler marks the evaluation sheets without comment. Everything you\'ve worked for comes down to this.',
    choices:[
      { text:'Go all out — leave nothing on the table', effect:{physical:5,knowledge:4,reputation:4}, effectLabel:'+5 Physical, +4 Knowledge, +4 Rep' },
      { text:'Stay smooth and controlled — execute every skill clean', effect:{knowledge:6,morale:3}, effectLabel:'+6 Knowledge, +3 Morale' },
      { text:'Volunteer to go first — set the pace and own the moment', effect:{leadership:5,reputation:5,physical:2}, effectLabel:'+5 Leadership, +5 Rep, +2 Physical' },
    ]
  },
  {
    id:'w8_graduation', week:8, type:'graduation', tag:'GRADUATION',
    icon:'🏅', title:'Graduation Ceremony',
    desc:'You stand in dress uniform in the academy gymnasium. Chief Instructor Ramsey calls your class to order one final time. "You came here as candidates. You leave as firefighters of the Ashfall Fire Department." Battalion Chief Dom Kade of Firehouse 12 — your assignment — steps to the podium. He says very little. He doesn\'t need to. He pins your badge himself.',
    choices:[
      { text:'Graduate — Begin your career at Firehouse 12', effect:{morale:10,reputation:5,physical:2,knowledge:2}, effectLabel:'+10 Morale, +5 Rep, +2 Physical, +2 Knowledge', isGraduation:true },
    ]
  },
];

// ===== FIRE ACADEMY GUEST INSTRUCTOR EVENTS =====
export const FIRE_GUEST_EVENTS = [
  {
    id:'guest_kessler_rescue', week:3, crewId:'kessler',
    tag:'GUEST INSTRUCTOR', icon:'🔥',
    portrait:'KS', border:'#ef4444',
    title:'Lt. Kessler — Technical Rescue Demonstration',
    intro:'An unscheduled visitor arrives at the training ground. Lieutenant Nate Kessler from Squad 4, Firehouse 12 has cleared time in his schedule to run a technical rescue demonstration for the current class. Instructor Ramsey steps back. When Kessler is in the room, he gets the floor.',
    dialogue:'"Rescue isn\'t about strength. It\'s about reading the problem before you commit to a solution. Strength gets you into trouble. Intelligence gets you out."',
    note:'Your first impression of Kessler determines how he sees you when you arrive at Firehouse 12.',
    choices:[
      { text:'Watch every move — absorb his technique without saying a word', effect:{knowledge:5}, bondDelta:8, effectLabel:'+5 Knowledge, Kessler bond +8' },
      { text:'Volunteer as the demo subject — put yourself in the problem', effect:{physical:4,knowledge:3}, bondDelta:13, effectLabel:'+4 Physical, +3 Knowledge, Kessler bond +13' },
      { text:'Ask a precise technical question about load-path dynamics', effect:{knowledge:6}, bondDelta:11, effectLabel:'+6 Knowledge, Kessler bond +11' },
    ],
  },
  {
    id:'guest_kade_address', week:4, crewId:'kade',
    tag:'SPECIAL ADDRESS', icon:'🎖️',
    portrait:'DP', border:'#f59e0b',
    title:'BC Kade — Midpoint Address',
    intro:'At the midpoint of the academy cycle, Battalion Chief Dom Kade from Firehouse 12 arrives to address the class. Ramsey calls everyone to attention and steps aside. Kade doesn\'t use notes, and he doesn\'t pretend this is a ceremony.',
    dialogue:'"I\'m not here to inspire you. I\'m here to be honest with you. This department doesn\'t need people who want to be firefighters. It needs people who are willing to do the work, follow the process, and keep their heads when everything\'s on fire — literally and figuratively. The ones who make it do it the right way. Every time."',
    note:'Kade is measuring you. The first impression you make now shapes how he receives you at 12.',
    choices:[
      { text:'Maintain perfect composure — let your posture and presence speak', effect:{reputation:3,leadership:2}, bondDelta:8, effectLabel:'+3 Reputation, +2 Leadership, Kade bond +8' },
      { text:'Ask one direct question about how he handles a bad outcome on his crew', effect:{knowledge:3,reputation:3}, bondDelta:12, effectLabel:'+3 Knowledge, +3 Rep, Kade bond +12' },
      { text:'Approach Kade after the address — brief introduction, eye contact', effect:{reputation:4,morale:2}, bondDelta:10, effectLabel:'+4 Reputation, +2 Morale, Kade bond +10' },
    ],
  },
  {
    id:'guest_delgado_leadership', week:5, crewId:'delgado',
    tag:'GUEST INSTRUCTOR', icon:'⛑️',
    portrait:'SK', border:'#f59e0b',
    title:'Lt. Delgado — Leadership Under Pressure',
    intro:'Lieutenant Rae Delgado from Truck 7 arrives the morning after your live burn exercise. She does this because she believes in it, not because anyone asked. Ramsey says simply, "Lieutenant Delgado has been on Truck 7 for years. She has earned every second of the time I\'m giving her with your class."',
    dialogue:'"Nobody tells you this in the academy, so I will: leadership isn\'t about rank. It\'s about what you do when your crew looks at you and they\'re scared and the conditions are wrong and you have to make a call anyway. You don\'t wait to feel ready. You act, you commit, and you own the outcome. Every time."',
    note:'Your interaction with Delgado becomes the first impression she forms before you work together.',
    choices:[
      { text:'"What\'s the call you still think about?" — ask her directly', effect:{morale:4,leadership:2}, bondDelta:12, effectLabel:'+4 Morale, +2 Leadership, Delgado bond +12' },
      { text:'Engage with her tactical scenario — show your operational thinking', effect:{knowledge:3,leadership:3}, bondDelta:10, effectLabel:'+3 Knowledge, +3 Leadership, Delgado bond +10' },
      { text:'Take everything in without speaking — some lessons are for listening', effect:{morale:5}, bondDelta:7, effectLabel:'+5 Morale, Delgado bond +7' },
    ],
  },
  {
    id:'guest_whitaker_engine', week:7, crewId:'whitaker',
    tag:'GUEST INSTRUCTOR', icon:'💪',
    portrait:'CH', border:'#ef4444',
    title:'FF Whitaker — Engine Company & Crew Culture',
    intro:'Firefighter Gus Whitaker from Engine 12 — recently stepped back from Lieutenant, for reasons he keeps to himself — runs the final guest session before graduation. He walks in carrying a covered dish and sets it on the table at the front of the room. "We\'re going to talk about the most important thing in your career. And then we\'re going to eat."',
    dialogue:'"The fireground will tell you what it needs. Your crew will tell you what they need. The job of a good firefighter is to listen to both at the same time and make the right call. That\'s it. That\'s all of it."',
    note:'How you engage with Whitaker here sets the tone for your relationship in the house.',
    choices:[
      { text:'"Kitchen culture sounds like morale management dressed up." Challenge the premise respectfully.', effect:{leadership:3,reputation:2}, bondDelta:9, effectLabel:'+3 Leadership, +2 Rep, Whitaker bond +9' },
      { text:'Ask about the longest stretch he\'s served with the same crew', effect:{morale:4,knowledge:2}, bondDelta:12, effectLabel:'+4 Morale, +2 Knowledge, Whitaker bond +12' },
      { text:'Help him serve the food without being asked', effect:{morale:5,reputation:2}, bondDelta:14, effectLabel:'+5 Morale, +2 Rep, Whitaker bond +14' },
    ],
  },
];

// ===== EMS ACADEMY GUEST EVENTS =====
export const EMS_GUEST_EVENTS = [
  {
    id:'ems_guest_priya_lecture', week:2, crewId:'priya',
    tag:'GUEST INSTRUCTOR', icon:'🚑',
    portrait:'VM', border:'#3b82f6',
    title:'PIC Priya Malhotra — Clinical Excellence in the Field',
    intro:'Paramedic in Charge Priya Malhotra from Ambulance 9 has agreed to guest-lecture Week 2 pharmacology. Coordinator Nash introduces her simply: "PIC Malhotra is the best field clinician I\'ve seen in a long time. She agreed to come in on her day off."',
    dialogue:'"Protocols exist because someone died without them. Judgment exists because protocols don\'t cover everything. Your job is to know the protocol so thoroughly that you know exactly when to adapt it — and you\'d better be able to explain why."',
    note:'Priya is evaluating you as a potential partner before she knows that\'s what you are.',
    choices:[
      { text:'Ask her to walk through a complex cardiac case she\'s actually run', effect:{knowledge:5,reputation:3}, bondDelta:12, effectLabel:'+5 Knowledge, +3 Rep, Priya bond +12' },
      { text:'Take every note you can — absorb the depth of her clinical thinking', effect:{knowledge:6}, bondDelta:8, effectLabel:'+6 Knowledge, Priya bond +8' },
      { text:'Push back on one protocol detail — show her you\'re thinking, not just copying', effect:{knowledge:4,leadership:2}, bondDelta:14, effectLabel:'+4 Knowledge, +2 Leadership, Priya bond +14' },
    ],
  },
];

export const EMS_ACADEMY_EVENTS = [
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
    desc:'Coordinator Nash calls the cohort to attention one final time. "Every protocol you memorised, every sim you ran, every bad outcome you replayed — that was preparation. What happens next is the real thing." Paramedic in Charge Priya Malhotra from Ambulance 9 — your new partner — is seated in the front row. She shakes your hand when your name is called and holds it a second longer than protocol requires.',
    choices:[
      { text:'Graduate — Ambo 9 is waiting', effect:{morale:10,reputation:5,knowledge:3}, effectLabel:'+10 Morale, +5 Rep, +3 Knowledge', isGraduation:true },
    ]
  },
];

// ===== CREW EVENTS (off-duty interactions) =====
export const CREW_EVENTS = {
  whitfield: [
    {
      id:'whitfield_hallway', title:'The Chief\'s Hallway',
      portrait:'WB', border:'#f59e0b',
      desc:'Kade steps into the hallway just as you\'re heading to the apparatus bay. He doesn\'t move. He just studies you the way he studies every firefighter at least once — like he\'s reading something underneath the surface.',
      dialogue:'"I\'ve been watching you. Not to catch you making mistakes. To see if you know when you\'re making them."',
      choices:[
        { text:'"I know when I make them, Chief. I just need more time to fix them."', effect:{leadership:3,morale:2}, bondDelta:8, effectLabel:'+3 Leadership, +2 Morale' },
        { text:'"I\'m still learning, Chief. Every shift teaches me something."', effect:{morale:3}, bondDelta:5, effectLabel:'+3 Morale' },
      ]
    },
    {
      id:'whitfield_office', title:'Kade\'s Open Door',
      portrait:'WB', border:'#f59e0b',
      desc:'Kade calls you into his office. The door stays open — a good sign. He leans back, studying you with the same unhurried calm he brings to everything.',
      dialogue:'"You know why the good ones make it and the great ones don\'t? The good ones know when to ask for help. Ego is the first casualty of this job. Make sure it\'s not yours."',
      choices:[
        { text:'"I\'ll remember that, Chief."', effect:{command:3}, bondDelta:6, effectLabel:'+3 Command' },
        { text:'"I don\'t plan on letting ego get in my way."', effect:{leadership:2,reputation:2}, bondDelta:8, effectLabel:'+2 Leadership, +2 Reputation' },
      ]
    },
    {
      id:'whitfield_family', title:'The Weight of Legacy',
      portrait:'WB', border:'#f59e0b',
      desc:'Kade mentions that his son has been asking about the department. He seems quietly proud, and somewhere underneath that, quietly worried.',
      dialogue:'"The best thing my father ever did was let me make my own choice. And the hardest thing I\'ll ever do is let my son make his."',
      choices:[
        { text:'"The job chooses people as much as people choose it, Chief."', effect:{morale:4}, bondDelta:10, effectLabel:'+4 Morale' },
        { text:'"Your family\'s lucky to have someone like you as a model."', effect:{morale:2,reputation:2}, bondDelta:8, effectLabel:'+2 Morale, +2 Reputation' },
      ]
    },
    {
      id:'whitfield_discipline', title:'The Standard',
      portrait:'WB', border:'#f59e0b',
      desc:'Kade calls the whole house together. Someone broke protocol on the last call — not you, but the weight of accountability falls on the whole crew.',
      dialogue:'"We don\'t get to have a bad day. When we clock in, we\'re the standard. When we go home, we\'re still the standard. That never changes."',
      choices:[
        { text:'Volunteer to run remedial drills with anyone who needs it.', effect:{leadership:5,reputation:3,morale:-2}, bondDelta:12, effectLabel:'+5 Leadership, +3 Rep, -2 Morale' },
        { text:'Stay quiet. Let Kade handle it — it\'s his house.', effect:{morale:-1}, bondDelta:3, effectLabel:'-1 Morale' },
      ]
    },
    {
      id:'whitfield_legacy', title:'Passing It On',
      portrait:'WB', border:'#f59e0b',
      desc:'Kade finds you in the watch office going through old incident reports after hours. He sits down across from you, something rare and easy in his posture.',
      dialogue:'"Every great firefighter in this house was shaped by someone before them. You\'re being shaped right now. Don\'t waste it."',
      choices:[
        { text:'"I want to be that person for someone someday."', effect:{leadership:4,command:3}, bondDelta:14, effectLabel:'+4 Leadership, +3 Command' },
        { text:'"I won\'t, Chief. This place means everything to me."', effect:{morale:5,reputation:2}, bondDelta:12, effectLabel:'+5 Morale, +2 Reputation' },
      ]
    },
  ],

  kessler: [
    {
      id:'sev_respect', title:'Kessler\'s Test',
      portrait:'KS', border:'#ef4444',
      desc:'After a drill, Kessler lingers in the apparatus bay. He tosses you a piece of equipment — the SCBA you just used — without warning.',
      dialogue:'"Take it apart and put it back together. Right now. I\'ll time you."',
      choices:[
        { text:'Do it. Fast and clean. Don\'t look up.', effect:{physical:3,knowledge:4}, bondDelta:12, effectLabel:'+3 Physical, +4 Knowledge' },
        { text:'Ask him to show you his technique first.', effect:{knowledge:5,morale:2}, bondDelta:8, effectLabel:'+5 Knowledge, +2 Morale' },
      ]
    },
    {
      id:'sev_squad', title:'What Squad Means',
      portrait:'KS', border:'#ef4444',
      desc:'Kessler finds you watching Squad 4\'s tool inventory process. He doesn\'t tell you to leave. That means he doesn\'t mind.',
      dialogue:'"Squad isn\'t about being better. It\'s about being ready for the call nobody else is trained for. The one where someone lives or dies based on whether you know what you\'re doing."',
      choices:[
        { text:'"I want to earn a spot on Squad someday."', effect:{leadership:3,morale:3}, bondDelta:10, effectLabel:'+3 Leadership, +3 Morale' },
        { text:'"That\'s what makes you all different. I see it."', effect:{reputation:2,morale:3}, bondDelta:8, effectLabel:'+2 Reputation, +3 Morale' },
      ]
    },
    {
      id:'sev_tension', title:'After the Call',
      portrait:'KS', border:'#ef4444',
      desc:'You made a judgment call on scene that wasn\'t protocol. It worked. Kessler caught it and followed you without saying a word on the radio. Back at quarters, he stops you.',
      dialogue:'"I don\'t know if that was instinct or luck. You need to know which one it was."',
      choices:[
        { text:'"Instinct. I read the building right."', effect:{leadership:4,reputation:2}, bondDelta:10, effectLabel:'+4 Leadership, +2 Rep' },
        { text:'"Honestly? A bit of both. I need to study more."', effect:{knowledge:4,morale:2}, bondDelta:12, effectLabel:'+4 Knowledge, +2 Morale' },
      ]
    },
    {
      id:'sev_quiet', title:'Kessler in the Bay',
      portrait:'KS', border:'#ef4444',
      desc:'It\'s 2am and Kessler is in the apparatus bay alone, not sleeping. You can tell something\'s in his head — some call, some memory. He doesn\'t acknowledge you, but he doesn\'t leave either.',
      dialogue:'"You stay in this job long enough, you start carrying the ones you couldn\'t save. That\'s not weakness. That\'s what this job costs."',
      choices:[
        { text:'Sit with him. Don\'t say anything.', effect:{morale:4,leadership:2}, bondDelta:14, effectLabel:'+4 Morale, +2 Leadership' },
        { text:'"I hear you, Lieutenant. It\'s worth it."', effect:{morale:5}, bondDelta:10, effectLabel:'+5 Morale' },
      ]
    },
    {
      id:'sev_tactical', title:'Tactical Debate',
      portrait:'KS', border:'#ef4444',
      desc:'During debrief, you push back on Kessler\'s read of the entry approach — respectfully, but directly. The room goes quiet.',
      dialogue:'Kessler sets down his coffee. "Explain your reasoning. Exactly."',
      choices:[
        { text:'Walk him through your logic precisely, citing the SOG.', effect:{knowledge:5,leadership:3,reputation:3}, bondDelta:12, effectLabel:'+5 Knowledge, +3 Leadership, +3 Rep' },
        { text:'Back down. "You\'re right. I may have missed something."', effect:{morale:-2,knowledge:2}, bondDelta:5, effectLabel:'-2 Morale, +2 Knowledge' },
      ]
    },
  ],

  whitaker: [
    {
      id:'herm_banter', title:'Kitchen Philosophy',
      portrait:'CH', border:'#ef4444',
      desc:'Whitaker is cooking and explaining — simultaneously — why firefighters who can\'t cook are fundamentally untrustworthy. He points a spatula at you.',
      dialogue:'"At 12, the kitchen is as important as the apparatus bay. You want respect in this house? Learn to cook. I\'m serious."',
      choices:[
        { text:'Ask him to teach you his signature dish.', effect:{morale:5,reputation:3}, bondDelta:12, effectLabel:'+5 Morale, +3 Reputation' },
        { text:'"I\'ll take the challenge. Next shift, I cook."', effect:{morale:3,leadership:2,reputation:3}, bondDelta:10, effectLabel:'+3 Morale, +2 Leadership, +3 Rep' },
      ]
    },
    {
      id:'herm_engine', title:'Engine Pride',
      portrait:'CH', border:'#ef4444',
      desc:'Whitaker catches you watching Squad 4\'s drills with that look. He wheels over on a bunk chair.',
      dialogue:'"I know what you\'re thinking. Squad\'s the sexy assignment. But I\'ll tell you this — the fire doesn\'t get knocked without the Engine company. We put the wet stuff on the red stuff. That\'s not glamorous. That\'s the job."',
      choices:[
        { text:'"The Engine is the backbone. I get it."', effect:{knowledge:3,reputation:3,morale:2}, bondDelta:10, effectLabel:'+3 Knowledge, +3 Rep, +2 Morale' },
        { text:'"I don\'t want glamorous. I want effective."', effect:{leadership:3,reputation:3}, bondDelta:12, effectLabel:'+3 Leadership, +3 Reputation' },
      ]
    },
    {
      id:'herm_family', title:'Whitaker\'s Family',
      portrait:'CH', border:'#ef4444',
      desc:'Whitaker\'s wife Donna calls during downtime. You hear him talk about his kids — all of them by name, their grades, their soccer games. When he hangs up, he looks ten years younger.',
      dialogue:'"You want to know the secret to this job? Somebody waiting for you at home. Makes you careful out there."',
      choices:[
        { text:'"That\'s a good perspective. I\'ll try to remember it."', effect:{morale:4}, bondDelta:8, effectLabel:'+4 Morale' },
        { text:'"Your kids must be proud of what you do."', effect:{morale:5,reputation:2}, bondDelta:12, effectLabel:'+5 Morale, +2 Reputation' },
      ]
    },
    {
      id:'herm_loyalty', title:'The Test of Loyalty',
      portrait:'CH', border:'#ef4444',
      desc:'Another firefighter from a different house says something dismissive about 12. Whitaker looks at you, waiting to see what you do.',
      dialogue:'(Whitaker, to the other firefighter): "You want to finish that sentence, or you want to keep your teeth?"',
      choices:[
        { text:'Stand next to Whitaker. Say nothing. Let your presence speak.', effect:{reputation:4,leadership:2}, bondDelta:14, effectLabel:'+4 Reputation, +2 Leadership' },
        { text:'Defuse it with a joke. Keep it civil.', effect:{morale:3,reputation:2}, bondDelta:9, effectLabel:'+3 Morale, +2 Reputation' },
      ]
    },
    {
      id:'herm_wisdom', title:'Bar-Counter Wisdom',
      portrait:'CH', border:'#ef4444',
      desc:'Whitaker pulls you aside after a difficult call. No preamble. He just starts talking.',
      dialogue:'"You know what makes somebody a firefighter? Not the test. Not the training. The day they stop thinking about themselves on scene. That\'s the day it changes. You got there today."',
      choices:[
        { text:'"I didn\'t even realize it. It just happened."', effect:{morale:5,leadership:3}, bondDelta:14, effectLabel:'+5 Morale, +3 Leadership' },
        { text:'"That\'s the highest thing anyone\'s ever said to me about this job."', effect:{morale:6,reputation:2}, bondDelta:15, effectLabel:'+6 Morale, +2 Rep' },
      ]
    },
  ],

  ortega: [
    {
      id:'ortega_story', title:'Ortega\'s Neighborhood',
      portrait:'JC', border:'#ef4444',
      desc:'Ortega tells you about the block he grew up on — same neighborhood as some of the houses you\'ve responded to. He doesn\'t romanticize it.',
      dialogue:'"I grew up three blocks from a house we went into last month. Different family, same building. I think about that. I think about why I do this job. Doesn\'t hurt to know why."',
      choices:[
        { text:'"Why do you? Still?"', effect:{morale:4,knowledge:2}, bondDelta:12, effectLabel:'+4 Morale, +2 Knowledge' },
        { text:'"That connection to the community. That\'s real."', effect:{morale:5}, bondDelta:11, effectLabel:'+5 Morale' },
      ]
    },
    {
      id:'ortega_humor', title:'The Ortega Challenge',
      portrait:'JC', border:'#ef4444',
      desc:'Ortega challenges you to a pull-up competition in the gym. The entire crew slowly filters in to watch.',
      dialogue:'"Loser cleans the rig. Winner picks the playlist for the next three shifts."',
      choices:[
        { text:'Go all out. Max effort, beat him if you can.', effect:{physical:4,morale:3}, bondDelta:10, effectLabel:'+4 Physical, +3 Morale' },
        { text:'Lose on purpose. Let him have the win.', effect:{morale:4,reputation:2}, bondDelta:8, effectLabel:'+4 Morale, +2 Rep (and a clean rig)' },
      ]
    },
    {
      id:'ortega_training', title:'Ortega\'s Shortcut',
      portrait:'JC', border:'#ef4444',
      desc:'Ortega shows you a technique for rigging a rescue harness that isn\'t in the SOG but works twice as fast under pressure.',
      dialogue:'"Kessler taught me this. It\'s not in the book because it requires judgment, and judgment takes time to develop. You\'re ready."',
      choices:[
        { text:'Learn it. Drill it until it\'s second nature.', effect:{knowledge:5,physical:2}, bondDelta:13, effectLabel:'+5 Knowledge, +2 Physical' },
        { text:'"I need to practice the book version more first. Then I\'ll come back to this."', effect:{knowledge:3}, bondDelta:7, effectLabel:'+3 Knowledge' },
      ]
    },
    {
      id:'ortega_brotherhood', title:'Ortega Has Your Back',
      portrait:'JC', border:'#ef4444',
      desc:'After a complicated call where you made a small but visible error, Ortega takes the blame at debrief — says it was a communication issue on his end. It wasn\'t.',
      dialogue:'Later, in the bay: "We cover each other in here. That\'s what this is. You\'d do the same for me."',
      choices:[
        { text:'"I would. And thank you. That meant something."', effect:{morale:5,leadership:2}, bondDelta:16, effectLabel:'+5 Morale, +2 Leadership' },
        { text:'"I\'m going to make it right on the next call. I promise."', effect:{morale:4,reputation:2}, bondDelta:13, effectLabel:'+4 Morale, +2 Rep' },
      ]
    },
    {
      id:'ortega_growth', title:'Ortega Sees It',
      portrait:'JC', border:'#ef4444',
      desc:'Ortega catches you in the corridor and leans against the wall with a half-smile.',
      dialogue:'"You know what I noticed? You stopped asking for permission on calls. You just act. That\'s the shift. That\'s when you became a firefighter and stopped being someone learning to be one."',
      choices:[
        { text:'"Squad 4 had a lot to do with that."', effect:{morale:5,leadership:2}, bondDelta:14, effectLabel:'+5 Morale, +2 Leadership' },
        { text:'"I didn\'t notice until you said it. But you\'re right."', effect:{morale:4,command:2}, bondDelta:12, effectLabel:'+4 Morale, +2 Command' },
      ]
    },
  ],

  delgado: [
    {
      id:'delgado_standard', title:'Delgado\'s Standard',
      portrait:'SK', border:'#f59e0b',
      desc:'Delgado catches you replaying a call decision in your head after debrief. She doesn\'t offer comfort. She pulls up a chair.',
      dialogue:'"What do you think you did wrong? Walk me through it. And I want the honest version, not the version you\'re planning to write in the report."',
      choices:[
        { text:'Give her the honest version. Own the mistake fully.', effect:{leadership:4,reputation:3}, bondDelta:14, effectLabel:'+4 Leadership, +3 Rep' },
        { text:'"I think I hesitated. I shouldn\'t have."', effect:{morale:3,knowledge:2}, bondDelta:10, effectLabel:'+3 Morale, +2 Knowledge' },
      ]
    },
    {
      id:'delgado_crew', title:'Leading From The Front',
      portrait:'SK', border:'#f59e0b',
      desc:'Delgado runs a post-drill critique and singles out your positioning. Not to embarrass you — to fix it. In front of everyone.',
      dialogue:'"On Truck 7, we don\'t protect people\'s feelings on the training ground. We protect their lives on the fireground. That\'s the trade."',
      choices:[
        { text:'Take the correction without flinching. Thank her afterward.', effect:{reputation:4,morale:2}, bondDelta:12, effectLabel:'+4 Reputation, +2 Morale' },
        { text:'Ask her to show you the right positioning right now.', effect:{knowledge:5,physical:2}, bondDelta:14, effectLabel:'+5 Knowledge, +2 Physical' },
      ]
    },
    {
      id:'delgado_loyalty', title:'What 12 Means',
      portrait:'SK', border:'#f59e0b',
      desc:'Delgado finds you in the apparatus bay late, going through gear. She doesn\'t ask what you\'re doing. She starts checking gear alongside you.',
      dialogue:'"People ask me why I stayed at 12 when I had offers. It\'s the crew. Not the building. Not the rank. The crew."',
      choices:[
        { text:'"I\'m starting to understand that."', effect:{morale:5,leadership:2}, bondDelta:12, effectLabel:'+5 Morale, +2 Leadership' },
        { text:'Keep working. Let the silence be the answer.', effect:{morale:4}, bondDelta:10, effectLabel:'+4 Morale' },
      ]
    },
  ],

  priya: [
    {
      id:'priya_debrief', title:'Priya\'s Assessment',
      portrait:'VM', border:'#3b82f6',
      desc:'After a tough medical call, Priya finds you replaying it in the ambulance bay. She climbs up on the rig bumper next to you.',
      dialogue:'"You\'re going through the tape. Good. But there\'s a point where you\'ve learned what you can and the rest is just punishing yourself."',
      choices:[
        { text:'"How do you know where that line is?"', effect:{knowledge:3,morale:3}, bondDelta:12, effectLabel:'+3 Knowledge, +3 Morale' },
        { text:'"I think I\'m on the right side of it. But thank you for checking."', effect:{morale:5}, bondDelta:10, effectLabel:'+5 Morale' },
      ]
    },
    {
      id:'priya_compassion', title:'The Hard Calls',
      portrait:'VM', border:'#3b82f6',
      desc:'Priya shows up to a pediatric call you\'ve been struggling with from last shift. She walks you through what she saw, clinically and then personally.',
      dialogue:'"I cried in the ambo on the way back. I don\'t broadcast that. But I also don\'t pretend it didn\'t happen. That\'s how you stay human doing this job."',
      choices:[
        { text:'"I needed to hear that. I thought I was the only one."', effect:{morale:6}, bondDelta:14, effectLabel:'+6 Morale' },
        { text:'"How do you keep doing it?"', effect:{morale:4,leadership:2}, bondDelta:12, effectLabel:'+4 Morale, +2 Leadership' },
      ]
    },
    {
      id:'priya_respect', title:'Patient First',
      portrait:'VM', border:'#3b82f6',
      desc:'Priya asks your opinion on a medical protocol decision in the field. She\'s testing whether you\'ll just defer or actually engage.',
      dialogue:'"Don\'t tell me what you think I want to hear. Tell me what you actually assessed."',
      choices:[
        { text:'Give your honest read, even if it contradicts what she did.', effect:{knowledge:5,reputation:3}, bondDelta:14, effectLabel:'+5 Knowledge, +3 Reputation' },
        { text:'Back her call. "Your read was right — I was second-guessing myself."', effect:{morale:2,knowledge:2}, bondDelta:7, effectLabel:'+2 Morale, +2 Knowledge' },
      ]
    },
    {
      id:'priya_ashfall', title:'Why Ashfall',
      portrait:'VM', border:'#3b82f6',
      desc:'Priya mentions she didn\'t have to come to Ashfall — she had options. You ask her why she did.',
      dialogue:'"Because the people in this city are real. And because when things are bad, they look at us like we\'re the last line. I don\'t ever want to stop feeling the weight of that."',
      choices:[
        { text:'"That\'s exactly why I\'m here too."', effect:{morale:5,reputation:2}, bondDelta:12, effectLabel:'+5 Morale, +2 Reputation' },
        { text:'"That\'s the most honest thing I\'ve heard about this job."', effect:{morale:4,knowledge:2}, bondDelta:11, effectLabel:'+4 Morale, +2 Knowledge' },
      ]
    },
    {
      id:'priya_growth', title:'Priya\'s Assessment',
      portrait:'VM', border:'#3b82f6',
      desc:'Priya stops you after a MCI call where you handled patient packaging with unusual competence.',
      dialogue:'"I\'ve worked with a lot of fire side personnel who treat EMS as a secondary function. You don\'t. You treat every patient like they\'re the only patient. That\'s the difference between a good first responder and a great one."',
      choices:[
        { text:'"I learned that from watching you."', effect:{morale:6,reputation:2}, bondDelta:16, effectLabel:'+6 Morale, +2 Reputation' },
        { text:'"Every patient is the only patient. That\'s how I try to run it."', effect:{morale:5,knowledge:2}, bondDelta:13, effectLabel:'+5 Morale, +2 Knowledge' },
      ]
    },
  ],
};

// ===== FIREBELL'S BAR EVENTS =====
export const FIREBELL_EVENTS = [
  {
    id:'firebell_ortega_neighborhood',
    title:'Ortega\'s Block',
    crewId:'ortega', portrait:'JC', border:'#ef4444',
    desc:'Ortega is three beers in and talking about Saltmarsh. He tells you about the mural on the side of his old building, the block party in August, the family that waved at every rig that went by.',
    dialogue:'"I got out. But I never really left, you know? Every call we take in that neighborhood — I\'m there for them. Not just as a firefighter."',
    effect:{morale:5}, bondDelta:8, effectLabel:'+5 Morale',
  },
  {
    id:'firebell_whitaker_trivia',
    title:'Trivia Night Captain',
    crewId:'whitaker', portrait:'CH', border:'#ef4444',
    desc:'Whitaker has announced — without asking anyone — that 12 is entering The Firebell Thursday trivia night. He needs a fourth. He points at you.',
    dialogue:'"You\'re in. Don\'t let me down. Last time Ortega answered \'Lincoln\' for every president question and we finished fourth."',
    effect:{morale:7,reputation:3}, bondDelta:10, effectLabel:'+7 Morale, +3 Reputation',
  },
  {
    id:'firebell_kessler_alone',
    title:'Kessler at Last Call',
    crewId:'kessler', portrait:'KS', border:'#ef4444',
    desc:'It\'s late and Kessler is at the far end of the bar, working on something in his head. The barstool next to him is empty. You sit down. He doesn\'t tell you to leave.',
    dialogue:'"Some shifts — you ever wonder if you left something behind at the scene? Not gear. Something else."',
    effect:{morale:4,leadership:3}, bondDelta:12, effectLabel:'+4 Morale, +3 Leadership',
  },
  {
    id:'firebell_delgado_advice',
    title:'Delgado Off the Record',
    crewId:'delgado', portrait:'SK', border:'#f59e0b',
    desc:'Delgado is in a good mood — relaxed in a way you don\'t see during shifts. She buys you a drink and gives you unsolicited career advice.',
    dialogue:'"Seriously? Don\'t worry about rank. Worry about being the person your crew can call when it goes sideways. The rank follows that. Always."',
    effect:{leadership:4,morale:5}, bondDelta:11, effectLabel:'+4 Leadership, +5 Morale',
  },
  {
    id:'firebell_whitfield_appearance',
    title:'The Deputy Commissioner Makes a Rare Appearance',
    crewId:'whitfield', portrait:'WB', border:'#f59e0b',
    desc:'Kade walks into The Firebell — a rare event. The crew sits up straighter. He waves them back down, orders a club soda, and sits at the bar. Eventually he ends up next to you.',
    dialogue:'"Off duty, I\'m just Wallace. Don\'t look so surprised. Even deputy commissioners get thirsty."',
    effect:{morale:8,reputation:4}, bondDelta:13, effectLabel:'+8 Morale, +4 Reputation',
  },
  {
    id:'firebell_priya_ashfall',
    title:'Priya\'s Ashfall',
    crewId:'priya', portrait:'VM', border:'#3b82f6',
    desc:'Priya is telling you about a patient she\'s followed up on — not officially, just as a person — who recovered better than expected. She lights up telling it.',
    dialogue:'"People think this job is about the emergency. But sometimes it\'s just about the hour after. The hour where somebody\'s still alive because we showed up."',
    effect:{morale:6,knowledge:2}, bondDelta:11, effectLabel:'+6 Morale, +2 Knowledge',
  },
  {
    id:'firebell_darts_ortega',
    title:'Darts with Ortega',
    crewId:'ortega', portrait:'JC', border:'#ef4444',
    desc:'Ortega challenges you to darts. He\'s suspiciously good at this. You\'re not. This is going to get competitive.',
    dialogue:'"You know what darts are? Controlled aggression. Just like entry operations. I\'m basically training you right now."',
    effect:{morale:6,physical:2}, bondDelta:9, effectLabel:'+6 Morale, +2 Physical',
  },
  {
    id:'firebell_whitaker_cindy',
    title:'Whitaker\'s Donna',
    crewId:'whitaker', portrait:'CH', border:'#ef4444',
    desc:'Whitaker\'s wife Donna stops by The Firebell. She knows everyone\'s name, everyone\'s wife\'s name, everyone\'s kids\' names. She knows yours now too.',
    dialogue:'"This one, Christopher says, is going to be somebody. Don\'t screw it up." (Directed at Whitaker, not you.)',
    effect:{morale:8,reputation:3}, bondDelta:12, effectLabel:'+8 Morale, +3 Reputation',
  },
  {
    id:'firebell_kessler_arm',
    title:'Kessler\'s Arm-Wrestling Claim',
    crewId:'kessler', portrait:'KS', border:'#ef4444',
    desc:'Kessler claims he\'s never lost at arm wrestling. Ortega immediately disputes this. The whole crew turns to you — they want you to be the challenger.',
    dialogue:'"You don\'t have to." (Kessler, calmly.) "But you\'ll regret it if you don\'t."',
    effect:{morale:5,physical:3}, bondDelta:8, effectLabel:'+5 Morale, +3 Physical',
  },
  {
    id:'firebell_whole_crew',
    title:'After a Good Week',
    crewId:null, portrait:null, border:null,
    desc:'The whole crew is at The Firebell tonight — a rare alignment of shifts and mood. The kind of evening that doesn\'t happen often enough. Whitaker is behind the bar. Kessler is actually smiling. Delgado bought the first round.',
    dialogue:'No particular conversation. Just the sound of people who trust each other, unwinding.',
    effect:{morale:12,reputation:3}, bondDelta:6, effectLabel:'+12 Morale, +3 Reputation (all bonds +6)',
  },
];

export const COMPLICATIONS = [
  { id:'understaffed',       label:'Understaffed',         icon:'👥', desc:'Down one crew member. Actions reduced by 1.',    effect:{actionsReduced:1} },
  { id:'equipment_issue',    label:'Equipment Issue',       icon:'🔧', desc:'Apparatus fault. –1 on all call rolls.',         effect:{dispatchPenalty:1} },
  { id:'bad_weather',        label:'Bad Weather',           icon:'⛈️', desc:'Severe weather. Outdoor calls harder (–2).',    effect:{weatherPenalty:2} },
  { id:'double_tap',         label:'Double Tap',            icon:'📡', desc:'Second call expected back-to-back.',             effect:{doubleCall:true} },
  { id:'civilian_complaint', label:'Civilian Complaint',    icon:'📝', desc:'Complaint on file. CO watching closely.',        effect:{whitfieldTrustMod:-5} },
  { id:'probie_riding',      label:'Probie Riding Along',   icon:'🎓', desc:'Candidate observing. Lead by example.',         effect:{probieRiding:true} },
  { id:'chiefs_inspection',  label:"Chief's Inspection",   icon:'🔍', desc:'District chief doing rounds today.',             effect:{chiefInspection:true} },
];

export const SHIFT_ACTIONS = {
  drill: {
    name:'Company Drill', location:'Apparatus Bay',
    desc:'Running drills with the crew sharpens your skills and shows initiative.',
    effect:{physical:3,knowledge:3,leadership:2},
    dialogues:[
      '"Good work today — you\'re getting faster on the hose pack." — Ortega',
      'Kessler walks through without a word, but gives you a single approving nod.',
      '"You\'re learning. Keep showing up like this." — Delgado',
      '"Drill hard or the fire will drill you." — Kessler',
    ]
  },
  gym: {
    name:'Fitness Training', location:'Gym',
    desc:'Putting in work at the gym. The job demands peak physical condition.',
    effect:{physical:5,morale:2},
    dialogues:[
      'You push through an extra set when everyone else has already showered.',
      '"Respect the grind," Whitaker says, watching you finish your run.',
      'Ortega spots you on bench. "You\'re going to feel that tomorrow."',
      'Kessler is already there when you arrive. You work in silence — it feels respectful.',
    ]
  },
  meal: {
    name:'Crew Meal', location:'Kitchen',
    desc:'Cooking for the crew builds trust and morale. Community is everything at 12.',
    effect:{morale:5,reputation:3},
    dialogues:[
      'Whitaker declares your chili "not bad — for a probie."',
      'Kade stops in for seconds. He doesn\'t say anything, but he finishes his plate.',
      'Priya tells you it\'s the best meal they\'ve had this shift.',
      'Ortega scrapes his plate clean and gives you a thumbs up.',
    ]
  },
  study: {
    name:'Study SOGs', location:'Watch Office',
    desc:'Reviewing Standard Operating Guidelines. Knowledge is the sharpest tool on any rig.',
    effect:{knowledge:5,command:2},
    dialogues:[
      'You find a case study in the logs that changes how you think about ventilation.',
      '"The best firefighters read more than they lift," Delgado tells you, spotting the binder.',
      'You memorize the ICS command structure. It clicks.',
      'Delgado leaves a highlighted section of the SOG on your bunk without comment.',
    ]
  },
  paperwork: {
    name:'Incident Reports', location:'Bunk Room / Desk',
    desc:'Completing your paperwork keeps the house running and builds your command reputation.',
    effect:{reputation:3,command:3},
    dialogues:[
      'Your reports are clean and detailed. Kade notes this at the next briefing.',
      '"Nobody likes paperwork," Tibbets says. "But everybody notices when it\'s done right."',
      'You catch a discrepancy in the equipment log and report it. Ortega is impressed.',
      'Kade stops by your desk, glances at your stack of completed reports, and nods once.',
    ]
  },
};

export const CONSEQUENCE_EVENTS = {
  whitfield_pullsAside: [
    '"Sit down. We need to talk about what happened on that last call." Kade closes the office door. "I need to know what you were thinking. Walk me through it."',
    '"Everyone has off calls. What I need from you is to understand why, so it doesn\'t happen twice."',
    '"I\'m not looking to discipline you. I\'m looking to understand you. There\'s a difference."',
  ],
  performanceReview: {
    title:'Performance Review',
    desc:'Three consecutive difficult calls. Kade has called you in — not for punishment, but for something harder: an honest assessment.',
    dialogue:'"Three calls that didn\'t go the way they should have. I\'m not writing you up. I\'m asking: what do you need from me to get back on track? What\'s going on?"',
    choices:[
      { text:'"I need more drilling. I\'ve been in my head too much on scene."', effect:{physical:3,knowledge:3,morale:3,leadership:-2}, effectLabel:'+3 Physical, +3 Knowledge, +3 Morale, -2 Leadership' },
      { text:'"I think I need to study the SOGs more. I\'ve been winging decisions."', effect:{knowledge:5,command:3,morale:-3}, effectLabel:'+5 Knowledge, +3 Command, -3 Morale' },
      { text:'"I\'ve been carrying something personal. It\'s affecting my focus."', effect:{morale:8,leadership:2,reputation:-2}, effectLabel:'+8 Morale, +2 Leadership, -2 Reputation' },
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

export const SHIFT_GRADE_REACTIONS = {
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
    '"Not the shift we needed. But you showed up. That counts for something." — Priya',
    '"Reset. Start fresh. This job is too long for a single bad shift to define you." — Kade',
  ],
};

export const CAREER_TRACKS = {
  suppression: {
    id:'suppression', name:'Suppression', color:'#c8281e', icon:'🔥',
    desc:'Engine, Truck, and Squad operations. The fireground is your domain.',
    ranks:['Probationary Firefighter','Firefighter','Driver Engineer','Lieutenant','Captain','Battalion Chief'],
  },
  ems: {
    id:'ems', name:'EMS', color:'#3b82f6', icon:'🚑',
    desc:'Advanced life support. On Ambo 9 alongside Priya.',
    ranks:['Paramedic Candidate','Paramedic','Paramedic in Charge','Paramedic Field Chief'],
  },
};
