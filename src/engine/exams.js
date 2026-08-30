// ===== EXAM ENGINE v2 =====
// Adaptive written exams (answers actually matter), readiness-driven insights,
// no-repeat question tracking, and oral boards that read your career record.

import { EXAM_BANKS, ORAL_BANKS } from '../data/exams_v2.js';

const shuffle = a => [...a].sort(() => Math.random() - 0.5);

// ---- Written exam session ----------------------------------------------
// Adaptive: correct answers pull harder-tier questions; wrong answers ease off.
export function createWrittenSession(state, rankId, length = 10) {
  const bank = EXAM_BANKS[rankId] || EXAM_BANKS.lieutenant;
  const seen = new Set(state.examHistory?.seenQ || []);
  // Prefer unseen questions; fall back to seen ones if the bank runs dry.
  const byTier = { 1: [], 2: [], 3: [] };
  for (const q of shuffle(bank)) byTier[q.tier || 1].push(q);
  for (const t of [1, 2, 3]) byTier[t].sort((a, b) => (seen.has(a.id) ? 1 : 0) - (seen.has(b.id) ? 1 : 0));

  const readiness = state.examReadiness || 0;
  return {
    rankId, length,
    byTier,
    tier: readiness >= 75 ? 2 : 1,   // well-prepped candidates start on tier 2 material
    asked: [],                        // {q, chosen, correct, insight}
    correctCount: 0,
    streak: 0,
  };
}

export function nextQuestion(session) {
  if (session.asked.length >= session.length) return null;
  // take from current tier, else nearest tier with questions left
  const order = [session.tier, session.tier - 1, session.tier + 1, session.tier - 2, session.tier + 2];
  for (const t of order) {
    if (t >= 1 && t <= 3 && session.byTier[t]?.length) return session.byTier[t].shift();
  }
  return null;
}

export function answerQuestion(session, q, chosenIdx) {
  const correct = chosenIdx === q.correct;
  session.asked.push({ id: q.id, topic: q.topic, tier: q.tier, correct });
  if (correct) {
    session.correctCount++;
    session.streak++;
    if (session.streak >= 2 && session.tier < 3) { session.tier++; session.streak = 0; }
  } else {
    session.streak = 0;
    if (session.tier > 1) session.tier--;
  }
  return correct;
}

// Readiness insight: prep can eliminate one wrong option before you answer.
// Returns index of an eliminated wrong option, or -1.
export function readinessInsight(state, q) {
  const readiness = state.examReadiness || 0;
  if (Math.random() * 100 > readiness * 0.75) return -1;   // up to ~75% chance at full prep
  const wrong = q.options.map((_, i) => i).filter(i => i !== q.correct);
  return wrong[Math.floor(Math.random() * wrong.length)];
}

export function finishWrittenSession(state, session) {
  if (!state.examHistory) state.examHistory = { seenQ: [], oralSeen: [], tier: 1 };
  for (const a of session.asked) if (!state.examHistory.seenQ.includes(a.id)) state.examHistory.seenQ.push(a.id);
  if (state.examHistory.seenQ.length > 300) state.examHistory.seenQ.splice(0, state.examHistory.seenQ.length - 300);
  const missedTopics = [...new Set(session.asked.filter(a => !a.correct).map(a => a.topic))];
  const peakTier = Math.max(...session.asked.map(a => a.tier || 1));
  return { score: session.correctCount, total: session.length, missedTopics, peakTier };
}

// ---- Oral board ---------------------------------------------------------
// 2 bank scenarios (unseen preferred) + up to 2 career-record scenarios.
export function buildOralBoard(state, rankId) {
  const bank = ORAL_BANKS[rankId] || ORAL_BANKS.lieutenant;
  const seen = new Set(state.examHistory?.oralSeen || []);
  const fresh = shuffle(bank.filter(s => !seen.has(s.id)));
  const fallback = shuffle(bank.filter(s => seen.has(s.id)));
  const picked = [...fresh, ...fallback].slice(0, 2);
  const career = buildCareerScenarios(state, rankId);
  const board = shuffle([...picked, ...career]);
  return board;
}

export function markOralSeen(state, board) {
  if (!state.examHistory) state.examHistory = { seenQ: [], oralSeen: [], tier: 1 };
  for (const s of board) if (s.id && !s.id.startsWith('career_') && !state.examHistory.oralSeen.includes(s.id)) {
    state.examHistory.oralSeen.push(s.id);
  }
  if (state.examHistory.oralSeen.length > 60) state.examHistory.oralSeen.splice(0, 20);
}

// The board has read your file. It brings it up.
export function buildCareerScenarios(state, rankId) {
  const out = [];
  const rec = state.record || {};
  const calls = state.totalCalls || 0;
  const mistakes = rec.mistakes || [];
  const isEMS = state.track === 'ems';
  const title = isEMS ? 'candidate' : (rankId === 'battalion_chief' ? 'Chief' : rankId === 'captain' ? 'Captain' : 'candidate');

  // 1) Your worst recent call, by name.
  if (mistakes.length > 0) {
    const m = mistakes[mistakes.length - 1];
    out.push({
      id: 'career_mistake', panelist: 'Deputy District Chief Walker', career: true,
      question: `Walker opens a folder — your folder. "Shift ${m.shift}. The ${m.call}. The record says: ${m.note} You don't need to relive it, ${title} — but this board needs to hear what it changed in how you operate."`,
      choices: [
        { text: 'Own it specifically: what went wrong, what I failed to see, and the concrete habit I changed because of it', score: 3, stat: 'leadership' },
        { text: 'Explain the circumstances — conditions made that outcome likely for anyone', score: 1, stat: 'knowledge' },
        { text: 'Point out my record since then speaks for itself', score: 1, stat: 'command' },
      ],
      reactGood: 'Walker closes the folder. "That answer is why setbacks are in the file, and why they don\'t end careers. Noted."',
      reactBad: 'Walker lets the silence stretch. "The board didn\'t ask whose fault it was. We asked what it changed."',
    });
  }

  // 2) Your numbers — strong or thin, they come up.
  if (calls >= 25 && (rec.critSuccesses || 0) >= 3) {
    out.push({
      id: 'career_strong', panelist: 'Chief Kade', career: true,
      question: `Kade doesn't open your file — he knows it. "${calls} runs. ${rec.critSuccesses} of them exceptional, and the board has read the commendations. Here's my only question: what do you know now that the firefighter on run one didn't?"`,
      choices: [
        { text: 'That the job is managing risk for other people — the calls I\'m proudest of are the ones where everyone went home because of a decision, not a rescue', score: 3, stat: 'leadership' },
        { text: 'The technical mastery — I\'ve simply seen more fire than most', score: 1, stat: 'knowledge' },
        { text: 'That I perform under pressure — the record proves it', score: 1, stat: 'command' },
      ],
      reactGood: 'Kade nods once. "Decisions, not rescues. Most people never learn the difference."',
      reactBad: 'Kade: "The record got you in this room. The answer was supposed to be about what it cost to build."',
    });
  } else if (calls < 15) {
    out.push({
      id: 'career_thin', panelist: 'Assistant Deputy Commissioner Hale', career: true,
      question: `Hale taps your file. "${calls} career runs. Candidates usually sit here with double that. Convince this board that the experience you have is enough — without pretending it's more than it is."`,
      choices: [
        { text: 'I won\'t inflate it: fewer runs, but I can walk you through what each one taught me — and the preparation I\'ve built around the gaps', score: 3, stat: 'knowledge' },
        { text: 'Numbers aren\'t everything — I\'m a fast learner', score: 1, stat: 'morale' },
        { text: 'Plenty of great officers promoted early; I\'ll grow into it', score: 0, stat: 'command' },
      ],
      reactGood: 'Hale: "Honest inventory plus deliberate preparation. That\'s more convincing than fifty unexamined runs."',
      reactBad: 'Hale writes briefly. "The board notes the candidate\'s confidence. The board was asking about the candidate\'s judgment."',
    });
  }

  // 3) Discipline record, if you have one.
  if ((state.discipline?.points || 0) >= 3 || (state.discipline?.hearings || 0) > 0) {
    out.push({
      id: 'career_discipline', panelist: 'Fire Commissioner Grissom', career: true,
      question: `Grissom reads without looking up. "The file includes ${state.discipline.hearings > 0 ? 'a disciplinary hearing' : 'documented safety concerns'}. Promotion means more authority, not less scrutiny. Address it. Now."`,
      choices: [
        { text: 'No excuses: here\'s what I did, here\'s what it risked, and here\'s the specific line I will not cross again — the record since is the evidence', score: 3, stat: 'leadership' },
        { text: 'The findings were harsher than the events deserved', score: 0, stat: 'command' },
        { text: 'I\'d rather focus on my strengths than relitigate the past', score: 0, stat: 'morale' },
      ],
      reactGood: 'Grissom finally looks up. "Accountability without groveling. That\'s the only acceptable answer to that question. Proceed."',
      reactBad: 'Grissom closes the file. "This board promotes people who have finished arguing with their own record."',
    });
  }

  // 4) Stress carried into the room (consequences system).
  if ((state.condition?.stress || 0) >= 60) {
    out.push({
      id: 'career_stress', panelist: 'Chief Psychologist Dr. Feld', career: true,
      question: `Feld speaks quietly. "Before the tactical questions — the board is aware your recent shifts have been heavy ones. This isn't a trap: how are you actually doing, and what are you doing about it?"`,
      choices: [
        { text: 'Answer it straight: name the load, name what I\'m using — peer support, counseling, the debriefs — and that I\'d rather manage it openly than perform being fine', score: 3, stat: 'morale' },
        { text: '"I\'m fine. The job is the job." Redirect to the tactical questions', score: 0, stat: 'command' },
        { text: 'Acknowledge it vaguely and promise it never touches the work', score: 1, stat: 'knowledge' },
      ],
      reactGood: 'Feld nods to the rest of the board. "For the record: that answer should be the model. Continue."',
      reactBad: 'Feld makes a small note. "\'Fine\' is the most expensive word in this building, candidate."',
    });
  }

  return shuffle(out).slice(0, 2);
}
