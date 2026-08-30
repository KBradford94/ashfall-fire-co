// ===== FIREHOUSE 12 — V2 CORE =====
// Save migration, difficulty settings, career history, condition (stress/injury) helpers.

export const SAVE_VERSION = 2;

export const DIFFICULTY_SETTINGS = {
  casual:   { label:'Casual',   threshDelta:-1, stressMult:0.5, injuryMult:0.5,
              desc:'Forgiving rolls, half stress and injury risk. For the story.' },
  standard: { label:'Standard', threshDelta:0,  stressMult:1.0, injuryMult:1.0,
              desc:'The intended Firehouse 12 experience.' },
  veteran:  { label:'Veteran',  threshDelta:1,  stressMult:1.5, injuryMult:1.5,
              desc:'Tougher rolls, faster stress, real consequences. 24 on, no mercy.' },
};

export function getDifficulty(state) {
  const id = state?.settings?.difficulty || 'standard';
  return DIFFICULTY_SETTINGS[id] || DIFFICULTY_SETTINGS.standard;
}

// ---- Migration ----------------------------------------------------------
// Accepts any save produced by v1.0.0 (or a partial v2 save) and returns a
// fully-populated v2 state. Never destructive: only fills what is missing.
export function migrateState(s) {
  if (!s) return s;
  const isV1 = !s.saveVersion || s.saveVersion < SAVE_VERSION;

  // --- v1 field defaults (previously patched inline in game.js) ---
  s.unit = s.unit || 'Truck 7';
  s.track = s.track || 'suppression';
  s.totalCalls = s.totalCalls || 0;
  s.consecutiveFailures = s.consecutiveFailures || 0;
  s.lastCallOutcome = s.lastCallOutcome || null;
  s.shiftCallOutcomes = s.shiftCallOutcomes || [];
  s.whitfieldTrust = s.whitfieldTrust ?? 50;
  s.crewStates = s.crewStates || {};
  s.shiftsWithoutMeal = s.shiftsWithoutMeal || 0;
  s.currentComplications = s.currentComplications || [];
  s.probieScore = s.probieScore || 0;
  s.probieWeek = s.probieWeek || 1;
  s.probieReviewCount = s.probieReviewCount || 0;
  s.specialist = s.specialist || null;
  s.specialistChosen = s.specialistChosen || false;
  s.hospitalRapport = s.hospitalRapport ?? 50;
  s.legacyScore = s.legacyScore || 0;
  s.shiftTone = s.shiftTone || null;
  s.sorensenDebriefMissed = s.sorensenDebriefMissed || 0;
  s.examEligible = s.examEligible || false;
  s.examTargetRank = s.examTargetRank || null;
  s.examReadiness = s.examReadiness || 0;
  s.examResult = s.examResult || null;
  s.eligibilityRank = s.eligibilityRank || null;
  s.vacancyCountdown = s.vacancyCountdown ?? null;
  s.examFailCount = s.examFailCount || 0;
  s.examCooldown = s.examCooldown || 0;
  s.officerCompany = s.officerCompany || null;
  s.firedGuestEvents = s.firedGuestEvents || [];
  s.shadowCrewId = s.shadowCrewId ?? null;
  s.shiftLog = s.shiftLog || [];
  s.careerLog = s.careerLog || [];
  s.statDeltas = s.statDeltas || {};

  // --- v2 fields ---
  s.settings = s.settings || {};
  s.settings.difficulty = s.settings.difficulty || 'standard';

  // Condition: physical + mental state that persists across shifts
  s.condition = s.condition || {};
  s.condition.stress = s.condition.stress ?? 0;          // 0-100
  s.condition.injury = s.condition.injury || null;       // {name, shiftsLeft, penalty}
  s.condition.ptsdRisk = s.condition.ptsdRisk ?? 0;      // 0-100, grows from trauma
  s.condition.counseling = s.condition.counseling || 0;  // sessions attended

  // Discipline: reckless choices accumulate toward a hearing
  s.discipline = s.discipline || { points: 0, hearings: 0, suspended: 0 };

  // Crew relationship arcs (per character id -> {stage, done, flags})
  s.arcs = s.arcs || {};

  // Career history feed (rendered on the Career Record screen)
  s.history = s.history || [];

  // Fallen crew memorial
  s.memorial = s.memorial || [];

  // Exam system v2: track seen questions + adaptive tier
  s.examHistory = s.examHistory || { seenQ: [], tier: 1, lastResults: [], oralSeen: [] };
  s.examHistory.seenQ = s.examHistory.seenQ || [];
  s.examHistory.oralSeen = s.examHistory.oralSeen || [];
  s.examHistory.tier = s.examHistory.tier || 1;

  // Career record used by career-aware oral boards
  s.record = s.record || {};
  s.record.saves = s.record.saves ?? 0;            // successful rescues
  s.record.critSuccesses = s.record.critSuccesses ?? 0;
  s.record.failures = s.record.failures ?? 0;
  s.record.mistakes = s.record.mistakes || [];     // last few notable failures {shift, call, note}
  s.record.commendations = s.record.commendations || [];

  // Roster: ensure per-member v2 fields
  if (Array.isArray(s.roster)) {
    s.roster.forEach(m => {
      m.bond = m.bond ?? 30;
      m.status = m.status || 'active';   // active | injured | fallen
      m.injuredShifts = m.injuredShifts || 0;
    });
  }

  if (isV1) {
    s.saveVersion = SAVE_VERSION;
    s.history.push({
      shift: s.shiftNumber || 1, type: 'system',
      text: 'Career migrated to Firehouse 12 v2. New systems active: dynamic incidents, crew arcs, condition tracking, revised civil service exams.'
    });
  }
  return s;
}

// ---- Career history -----------------------------------------------------
export function recordHistory(state, type, text, extra) {
  if (!state) return;
  if (!state.history) state.history = [];
  state.history.push({ shift: state.shiftNumber || 1, type, text, ...(extra || {}) });
  if (state.history.length > 400) state.history.splice(0, state.history.length - 400);
}

// ---- Condition helpers --------------------------------------------------
export function addStress(state, amount) {
  const mult = getDifficulty(state).stressMult;
  const c = state.condition;
  c.stress = Math.max(0, Math.min(100, Math.round(c.stress + amount * (amount > 0 ? mult : 1))));
  return c.stress;
}

export const INJURY_TABLE = [
  { name: 'Smoke inhalation',      shifts: 1, penalty: { physical: -4 } },
  { name: 'Sprained shoulder',     shifts: 2, penalty: { physical: -6 } },
  { name: 'Second-degree burns',   shifts: 2, penalty: { physical: -8, morale: -4 } },
  { name: 'Fractured wrist',       shifts: 3, penalty: { physical: -10 } },
];

export function rollInjury(state, severity) {
  // severity: 0-1. Returns injury object or null.
  const chance = severity * 0.35 * getDifficulty(state).injuryMult;
  if (Math.random() > chance) return null;
  const idx = Math.min(INJURY_TABLE.length - 1, Math.floor(Math.random() * severity * INJURY_TABLE.length));
  const t = INJURY_TABLE[idx];
  return { name: t.name, shiftsLeft: t.shifts, penalty: t.penalty };
}
