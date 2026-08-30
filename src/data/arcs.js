// ===== CREW STORY ARCS (v2) =====
// Season-style multi-stage storylines that unlock as your bond with a character grows.
// Stage shape mirrors crew events; arc progress lives in state.arcs[charId] = { stage, done }.

export const CHARACTER_ARCS = {
  kessler: {
    name: 'Nate Kessler', title: 'The Arson File', border: '#ef4444',
    stages: [
      { minBond: 50, title: 'A Favor, Off the Books',
        desc: "Kessler finds you alone on the apparatus floor, a battered folder under his arm. An old warehouse fire — ruled accidental, except he's never believed it.",
        dialogue: '"FIU closed it. I didn\'t. Three fires, same block, same burn patterns. I need a second set of eyes — someone who won\'t laugh me out of the room."',
        choices: [
          { text: 'Spread the file on the rig hood and dig in with him', effectLabel: '+Knowledge, +Bond', effect: { knowledge: 3 }, bondDelta: 8, advance: true },
          { text: '"Take it to FIU, Nate. Properly."', effectLabel: '+Reputation, arc pauses', effect: { reputation: 2 }, bondDelta: -3, advance: false },
        ] },
      { minBond: 65, title: 'The Stakeout',
        desc: "Two shifts later, Kessler's hunch has a name: a contractor buying the burned lots for cash. He's parked outside the fourth warehouse on his night off. He asks you to ride along.",
        dialogue: '"If I\'m wrong, we\'re two idiots eating cold fries in a parked car. If I\'m right, somebody torches this place by Friday."',
        choices: [
          { text: 'Ride along — and call in the pattern to FIU on the way', effectLabel: '+Command, +Bond', effect: { command: 3, knowledge: 2 }, bondDelta: 8, advance: true },
          { text: 'Ride along, no calls — his case, his rules', effectLabel: '+Bond, +Stress risk', effect: { morale: 2 }, bondDelta: 6, advance: true, stress: 2 },
          { text: 'Talk him into going home before this costs him his badge', effectLabel: '+Leadership, arc pauses', effect: { leadership: 2 }, bondDelta: -2, advance: false },
        ] },
      { minBond: 80, title: 'Testimony',
        desc: "The arrest made the news — the fry-scented stakeout broke the case. Now the State's Attorney wants testimony about the burn-pattern analysis, and Kessler wants you at the table when he gives it.",
        dialogue: '"You were there for the boring parts. That\'s what makes it credible. Suit up — we\'re going downtown."',
        choices: [
          { text: 'Testify — precise, unglamorous, airtight', effectLabel: '+Reputation, +Command, Commendation', effect: { reputation: 4, command: 3 }, bondDelta: 10, advance: true, commendation: 'Joint FIU commendation — warehouse arson series (with Lt. Kessler)' },
          { text: 'Let Nate take the stand solo; you prep him all week', effectLabel: '+Knowledge, +Bond', effect: { knowledge: 3, leadership: 2 }, bondDelta: 7, advance: true },
        ] },
    ],
  },
  delgado: {
    name: 'Rae Delgado', title: 'Firebrand Academy', border: '#f59e0b',
    stages: [
      { minBond: 50, title: 'An Extra Pair of Hands',
        desc: "Delgado corners you at the coffee pot with the specific smile that means you're already volunteered. Firebrand Academy has twelve teenagers and one instructor this Saturday.",
        dialogue: '"Ladder drills, station tour, and one demo where somebody who is not me wears the full kit in July. You in?"',
        choices: [
          { text: 'All in — full kit, worst demo slot, no complaints', effectLabel: '+Morale, +Bond', effect: { morale: 3, physical: 1 }, bondDelta: 8, advance: true },
          { text: 'Handle logistics instead — vans, forms, lunches', effectLabel: '+Knowledge, +Bond', effect: { knowledge: 2 }, bondDelta: 5, advance: true },
          { text: 'Beg off — you need the Saturday', effectLabel: 'Arc pauses', effect: {}, bondDelta: -4, advance: false },
        ] },
      { minBond: 65, title: 'The Kid Who Stopped Coming',
        desc: "Three Saturdays in, Delgado's sharpest student — the one who could rack hose better than half the candidates — vanished from the program. Delgado found out why: mom lost the apartment, the kid's couch-surfing across the city.",
        dialogue: '"She\'s sixteen and embarrassed, so she ghosted. I\'m not letting a housing crisis take the best firefighter prospect I\'ve ever coached. Ideas. Now."',
        choices: [
          { text: 'Work your contacts: the AFD family services network, quietly, dignity intact', effectLabel: '+Leadership, +Bond', effect: { leadership: 3, reputation: 2 }, bondDelta: 9, advance: true },
          { text: 'Organize a firehouse fundraiser — loud, warm, unmissable', effectLabel: '+Morale, +Reputation', effect: { morale: 3, reputation: 2 }, bondDelta: 6, advance: true },
          { text: '"Delgado, you can\'t save everyone." Somebody has to say it', effectLabel: '+Stress, arc pauses', effect: {}, bondDelta: -5, advance: false, stress: 2 },
        ] },
      { minBond: 80, title: 'Graduation Day',
        desc: "The program's first cohort graduates in the academy gym — twelve kids in dress shirts, one returning student in the front row with a stable address and a AFD cadet application. Delgado asks you to give the closing speech.",
        dialogue: '"I do the fire stuff. You do the part where the parents cry. Don\'t argue — it\'s already in the program. Your name\'s spelled right and everything."',
        choices: [
          { text: 'Give the speech — about doors, and the people who hold them open', effectLabel: '+Leadership, +Reputation, Commendation', effect: { leadership: 4, reputation: 3, morale: 2 }, bondDelta: 10, advance: true, commendation: 'Community service commendation — Firebrand Academy program' },
          { text: 'Keep it to two sentences and hand the mic to the returning student', effectLabel: '+Morale, +Bond', effect: { morale: 4, leadership: 2 }, bondDelta: 8, advance: true },
        ] },
    ],
  },
  whitaker: {
    name: 'Gus Whitaker', title: "The Firebell on the Line", border: '#22c55e',
    stages: [
      { minBond: 50, title: 'Saturday Shift at The Firebell',
        desc: "Whitaker slides a beer you didn't order across the bar. The tap system died, the weekend bartender quit by text, and there's a fifty-person retirement party booked for Saturday.",
        dialogue: '"I\'m not saying you owe me. I\'m saying I taught you everything you know about hose pressure, and a beer tap is basically a tiny standpipe. Saturday. Seven o\'clock."',
        choices: [
          { text: 'Work the bar Saturday — tiny standpipes and all', effectLabel: '+Morale, +Bond', effect: { morale: 3 }, bondDelta: 8, advance: true },
          { text: 'Fix the tap system tonight instead — you know a guy', effectLabel: '+Knowledge, +Bond', effect: { knowledge: 2, morale: 1 }, bondDelta: 6, advance: true },
          { text: 'Laugh, finish the free beer, dodge the draft', effectLabel: 'Arc pauses', effect: { morale: 1 }, bondDelta: -3, advance: false },
        ] },
      { minBond: 65, title: 'The Letter From the City',
        desc: "Whitaker's waving a city envelope like it's on fire: a rival bar owner filed a nuisance complaint, and The Firebell liquor license renewal is suddenly 'under review.' The hearing is Thursday.",
        dialogue: '"Twenty years! Twenty years of cops, firefighters, and nurses drinking responsibly-ish, and THIS guy — who waters his beer, by the way — THIS guy calls US a nuisance?!"',
        choices: [
          { text: 'Build the case file: incident-free years, community events, every fundraiser hosted', effectLabel: '+Knowledge, +Command', effect: { knowledge: 3, command: 2 }, bondDelta: 8, advance: true },
          { text: 'Pack the hearing — off-duty firefighters, in uniform-adjacent attire, very polite', effectLabel: '+Reputation, +Morale', effect: { reputation: 3, morale: 2 }, bondDelta: 7, advance: true },
          { text: 'Suggest he talk to the rival owner first, alone, like adults', effectLabel: '+Leadership, risky', effect: { leadership: 3 }, bondDelta: 4, advance: true, stress: 1 },
        ] },
      { minBond: 80, title: 'Partner\'s Corner',
        desc: "License saved, rival humbled, and there's a new chalkboard above the corner booth: your usual order, named after you. Whitaker's wiping the same glass he's been wiping for ten minutes.",
        dialogue: '"Donna and I talked. The Firebell does better when you\'re around — the place likes you. We\'re not asking for money. We\'re asking if you want the corner to be yours. Officially. Family, like."',
        choices: [
          { text: 'Accept the corner — The Firebell is home and everyone knows it', effectLabel: '+Morale, +Bond, house morale', effect: { morale: 5, reputation: 2 }, bondDelta: 10, advance: true, houseMorale: true },
          { text: 'Decline the honor, endow the corner for whoever had the worst shift', effectLabel: '+Leadership, +Reputation', effect: { leadership: 3, reputation: 3 }, bondDelta: 8, advance: true, houseMorale: true },
        ] },
    ],
  },
};

// Arc completion bonus: permanent perk noted in history.
export const ARC_COMPLETION_PERKS = {
  kessler: { text: 'Kessler\'s trust: Squad-style instincts — permanent +1 on rescue-type calls.', perk: 'rescue_insight' },
  delgado:     { text: 'Delgado\'s respect: your name means something in the academy — leadership grows easier.', perk: 'mentor' },
  whitaker: { text: 'Whitaker\'s family: The Firebell is a second home — off-duty recovery is stronger.', perk: 'firebell_family' },
};
