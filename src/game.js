// ===== FIREHOUSE 12 — GAME ENGINE =====

// ===== MODULE IMPORTS =====
import { ROSTER, BOND_MODIFIERS, UNIT_CALL_POOL, NEIGHBORHOODS, CALL_NEIGHBORHOOD_BIAS, CREW_STATE_COLORS } from './data/roster.js';
import { CALL_TYPES } from './data/calls.js';
import { ACADEMY_EVENTS, EMS_ACADEMY_EVENTS, FIRE_GUEST_EVENTS, EMS_GUEST_EVENTS, CREW_EVENTS, FIREBELL_EVENTS, COMPLICATIONS, SHIFT_ACTIONS, CONSEQUENCE_EVENTS, SHIFT_GRADE_REACTIONS } from './data/events.js';
import { EXAM_QUESTIONS, ORAL_BOARD_SCENARIOS, VACANCY_STORIES } from './data/exams.js';
import { BACKGROUNDS, BASE_STATS, STAT_COLORS, RANKS, EMS_RANKS, PROMOTION_DATA, createDefaultState } from './engine/career.js';
import { CALL_TACTIC_MAP, CALL_TACTICS, SIZE_UP_OPTIONS, SHADOW_CALL_CHOICES, SHADOW_FEEDBACK_POOL, FF_ROLE_ASSIGNMENTS, FF_ROLE_DISPLAY, FF_ROLE_CHOICES, DE_PUMP_OPTIONS, DE_AERIAL_OPTIONS, EMS_DIAGNOSTIC_CATEGORY_MAP, EMS_DIAGNOSTIC_STEPS, CAPTAIN_SECTOR_CHOICES, BC_INCIDENT_COMMAND_CHOICES } from './engine/calls.js';
import { OFFICER_ROOM_CONFIGS, PROBIE_TASKS, SPECIALIST_TRAINING_OPTIONS, APPARATUS_CHECK_ITEMS, LT_BRIEFING_TONES, CAPTAIN_AFD_DIRECTIVES, BC_DISTRICT_STATIONS, BC_STAFFING_DECISIONS, CONFLICT_EVENTS, SEEK_ADVICE_PROMPTS, EMS_HOSPITAL_EVENTS, EMS_DEBRIEF, BC_LEGACY_EVENTS, DRILL_TYPES } from './engine/progression.js';
import { buildAshfallMap, buildPortraitSVG, generateFireParticles as _generateFireParticles } from './ui/screens.js';
import { migrateState, DIFFICULTY_SETTINGS, getDifficulty, recordHistory, addStress, rollInjury, SAVE_VERSION } from './engine/v2.js';
import { createWrittenSession, nextQuestion, answerQuestion, readinessInsight, finishWrittenSession, buildOralBoard, markOralSeen } from './engine/exams.js';
import { DLC_CALLS, BANTER, banterCategoryForCall, installDLC } from './data/dlc.js';
import { pickStages, STAGE_TIMER_BY_DIFFICULTY } from './engine/incidents.js';
import { CHARACTER_ARCS, ARC_COMPLETION_PERKS } from './data/arcs.js';

// Install DLC content (ported from the archived Python builds) into live pools
installDLC(CALL_TYPES, UNIT_CALL_POOL);

// ===== SOUND SYSTEM =====
const Sound = (() => {
  let ctx = null, muted = false, volume = 0.7, ambientGain = null, ambientOsc = null;
  function getCtx() {
    if (!ctx) try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function playRadioStatic() {
    if (muted) return; const c = getCtx(); if (!c) return;
    const buf = c.createBuffer(1, c.sampleRate*0.45, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*(1-i/d.length);
    const src=c.createBufferSource(), bpf=c.createBiquadFilter(), gain=c.createGain();
    src.buffer=buf; bpf.type='bandpass'; bpf.frequency.value=2200; bpf.Q.value=0.8;
    gain.gain.setValueAtTime(0.35*volume,c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.45);
    src.connect(bpf); bpf.connect(gain); gain.connect(c.destination);
    src.start(); src.stop(c.currentTime+0.45);
  }
  function playTensionRiser() {
    if (muted) return; const c=getCtx(); if (!c) return;
    const osc=c.createOscillator(), gain=c.createGain();
    osc.type='sawtooth'; osc.frequency.setValueAtTime(180,c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680,c.currentTime+2.0);
    gain.gain.setValueAtTime(0.08*volume,c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001,c.currentTime+2.0);
    osc.connect(gain); gain.connect(c.destination); osc.start(); osc.stop(c.currentTime+2.0);
  }
  function playSuccessSting() {
    if (muted) return; const c=getCtx(); if (!c) return;
    [[523.25,0],[659.25,0.12],[783.99,0.24]].forEach(([freq,delay])=>{
      const osc=c.createOscillator(), gain=c.createGain();
      osc.type='triangle'; osc.frequency.value=freq;
      const t=c.currentTime+delay;
      gain.gain.setValueAtTime(0.18*volume,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.55);
      osc.connect(gain); gain.connect(c.destination); osc.start(t); osc.stop(t+0.6);
    });
  }
  function playFailureSting() {
    if (muted) return; const c=getCtx(); if (!c) return;
    [[392,0],[349.23,0.14],[311.13,0.28]].forEach(([freq,delay])=>{
      const osc=c.createOscillator(), gain=c.createGain();
      osc.type='sawtooth'; osc.frequency.value=freq;
      const t=c.currentTime+delay;
      gain.gain.setValueAtTime(0.14*volume,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.6);
      osc.connect(gain); gain.connect(c.destination); osc.start(t); osc.stop(t+0.65);
    });
  }
  function startAmbientHum() {
    if (muted||ambientOsc) return; const c=getCtx(); if (!c) return;
    ambientOsc=c.createOscillator(); ambientGain=c.createGain();
    ambientOsc.type='sine'; ambientOsc.frequency.value=58; ambientGain.gain.value=0.04*volume;
    ambientOsc.connect(ambientGain); ambientGain.connect(c.destination); ambientOsc.start();
  }
  function stopAmbientHum() {
    if (ambientOsc) { try{ambientOsc.stop();}catch(e){} ambientOsc=null; ambientGain=null; }
  }
  function toggleMute() {
    muted=!muted; if (muted) stopAmbientHum(); return muted;
  }
  function setMuted(m) {
    muted = !!m; if (muted) stopAmbientHum(); return muted;
  }
  // volume: 0-100 (UI scale) → stored as 0-1 gain multiplier
  function setVolume(v) {
    volume = Math.max(0, Math.min(100, v)) / 100;
    if (ambientGain) ambientGain.gain.value = 0.04*volume;
  }
  function getVolume() { return Math.round(volume*100); }
  return {
    playRadioStatic, playTensionRiser, playSuccessSting, playFailureSting,
    startAmbientHum, stopAmbientHum, toggleMute, setMuted, setVolume, getVolume,
    isMuted:()=>muted,
  };
})();

// ===== TOASTS =====
// Transient, non-blocking failure notices. Used for save errors, which must be
// visible (the player has to know their progress did not persist) but must not
// interrupt a call in progress with a modal.
const Toast = (() => {
  function show(title, body, kind) {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const node = document.createElement('div');
    node.className = `toast toast-${kind || 'danger'}`;
    const t = document.createElement('strong');
    t.className = 'toast-title'; t.textContent = title;
    const b = document.createElement('span');
    b.className = 'toast-body'; b.textContent = body;
    node.appendChild(t); node.appendChild(b);
    stack.appendChild(node);
    requestAnimationFrame(() => node.classList.add('toast-in'));
    setTimeout(() => {
      node.classList.remove('toast-in');
      node.classList.add('toast-out');
      setTimeout(() => node.remove(), 260);
    }, 6000);
  }
  // A failed save is the one error the player must not miss: visual + audio,
  // per the Definition of Done.
  function saveFailed(reason) {
    show('Save failed', reason
      ? `Your progress was not written to disk — ${reason}.`
      : 'Your progress was not written to disk.', 'danger');
    try { Sound.playFailureSting(); } catch (e) {}
  }
  return { show, saveFailed };
})();

// ===== RANK HELPERS =====
function getRanks(s) {
  const st = s || (typeof state !== 'undefined' ? state : null);
  return (st && st.track === 'ems') ? EMS_RANKS : RANKS;
}
function getCurrentRank(s) {
  const st = s || state;
  return getRanks(st)[st.rankIndex] || getRanks(st)[0];
}
function getRankId(s) { return getCurrentRank(s)?.id || 'candidate'; }

// buildAshfallMap and buildPortraitSVG are imported from ./ui/screens.js

// ===== GAME STATE =====
const Game = (() => {
  let state = null;

  // Local rank helpers that close over state
  function getRanks(s) { const st=s||state; return (st&&st.track==='ems')?EMS_RANKS:RANKS; }
  function getCurrentRank(s) { const st=s||state; if(!st)return RANKS[0]; return getRanks(st)[st.rankIndex]||getRanks(st)[0]; }
  function getRankId(s) { return getCurrentRank(s)?.id||'candidate'; }

  const DEFAULT_STATE = (name, background, track) => {
    const bg = BACKGROUNDS[background];
    const stats = {};
    for (const k of Object.keys(BASE_STATS)) stats[k] = Math.min(100, BASE_STATS[k]+(bg.stats[k]||0));
    return migrateState({
      name, background, track: track||'suppression',
      rankIndex: 0, unit: null,
      stats, whitfieldTrust: 50,
      roster: ROSTER.map(r=>({...r})),
      crewStates: {}, shiftsWithoutMeal: 0,
      phase: 'academy', academyWeek: 1,
      shiftNumber: 1, actionsRemaining: 3,
      totalCalls: 0, consecutiveFailures: 0,
      lastCallOutcome: null, shiftLog: [], careerLog: [],
      statDeltas: {}, shiftCallOutcomes: [],
      currentComplications: [],
      // Probie / specialist
      probieScore: 0, probieWeek: 1, probieReviewCount: 0,
      specialist: null, specialistChosen: false,
      // EMS
      hospitalRapport: 50,
      // BC
      legacyScore: 0,
      // Shift
      shiftTone: null, sorensenDebriefMissed: 0,
      // Civil service exam
      examEligible: false, examTargetRank: null,
      examReadiness: 0, examResult: null,
      eligibilityRank: null, vacancyCountdown: null,
      examFailCount: 0, examCooldown: 0,
      // Promo story
      officerCompany: null,
      // Academy guest events (track which have fired)
      firedGuestEvents: [],
      // Call system
      shadowCrewId: null,
    });
  };

  const el = id => document.getElementById(id);
  const showScreen = id => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    el(id).classList.add('active');
  };
  const showModal = id => el(id).classList.remove('hidden');
  const hideModal = id => el(id).classList.add('hidden');

  // ===== HUD =====
  function renderHUD(hudId) {
    const hud = el(hudId); if (!hud||!state) return;
    hud.innerHTML = '';
    const statOrder = ['physical','knowledge','morale','reputation','leadership','command'];
    const statLabels = {physical:'PHYS',knowledge:'KNOW',morale:'MORAL',reputation:'REP',leadership:'LEAD',command:'CMD'};
    for (const key of statOrder) {
      const val = state.stats[key], color = STAT_COLORS[key];
      const div = document.createElement('div');
      div.className = `hud-stat stat-${key}`;
      div.innerHTML = `<span class="hud-stat-name">${statLabels[key]}</span>
        <div class="hud-stat-bar-wrap"><div class="hud-stat-bar" style="width:${val}%;background:${color}"></div></div>
        <span class="hud-stat-val" style="color:${color}">${val}</span>`;
      hud.appendChild(div);
    }
    renderWhitfieldTrust();
    renderHospitalRapport();
  }

  function renderHospitalRapport() {
    const bar = el('rapport-bar-inner'), val = el('rapport-val');
    const wrap = el('hospital-rapport-bar');
    if (!wrap) return;
    if (!state || state.track !== 'ems' || state.rankIndex < 2) { wrap.classList.add('hidden'); return; }
    wrap.classList.remove('hidden');
    const r = state.hospitalRapport ?? 50;
    if (bar) { bar.style.width = r + '%'; bar.style.background = r < 30 ? '#ef4444' : r > 70 ? '#3b82f6' : '#60a5fa'; }
    if (val) val.textContent = r;
  }

  function renderWhitfieldTrust() {
    const bar = el('whitfield-trust-bar'), val = el('whitfield-trust-val');
    if (!bar) return;
    const bt = state ? (state.whitfieldTrust||50) : 50;
    bar.style.width = bt + '%';
    bar.style.background = bt < 30 ? '#ef4444' : bt > 80 ? '#22c55e' : '#f59e0b';
    if (val) val.textContent = bt;
  }

  function changeWhitfieldTrust(delta) {
    if (!state) return;
    state.whitfieldTrust = Math.max(0, Math.min(100, (state.whitfieldTrust||50)+delta));
    renderWhitfieldTrust();
  }

  function applyStats(changes) {
    const deltas = {};
    for (const [key,delta] of Object.entries(changes)) {
      if (!(key in state.stats)) continue;
      const before = state.stats[key];
      state.stats[key] = Math.max(0, Math.min(100, state.stats[key]+delta));
      const actual = state.stats[key]-before;
      if (actual!==0) deltas[key]=actual;
    }
    for (const [k,v] of Object.entries(deltas)) {
      if (!state.statDeltas) state.statDeltas={};
      state.statDeltas[k] = (state.statDeltas[k]||0)+v;
    }
    return deltas;
  }

  function formatDeltas(deltas) {
    return Object.entries(deltas).filter(([,v])=>v!==0)
      .map(([k,v])=>`<span class="${v>0?'stat-up':'stat-down'}">${v>0?'+':''}${v} ${k.charAt(0).toUpperCase()+k.slice(1)}</span>`)
      .join('  ');
  }

  function shiftTimeLabel() {
    const hours=['07:00','08:30','10:00','12:00','13:30','15:00','17:00','19:00','21:00','23:00'];
    return hours[Math.floor(Math.random()*hours.length)];
  }

  function addToLog(text, type='neutral') {
    if (!state.shiftLog) state.shiftLog=[];
    state.shiftLog.push({text,type,time:shiftTimeLabel()});
    if (!state.careerLog) state.careerLog=[];
    state.careerLog.push({text,type,shift:state.shiftNumber});
  }

  function getBondModifier(callType) {
    let bonus=0;
    for (const rule of BOND_MODIFIERS) {
      const member=state.roster.find(r=>r.id===rule.crewId);
      if (!member||member.bond<rule.minBond) continue;
      const unitMatch=!rule.unitMatch||rule.unitMatch===state.unit;
      const callMatch=!rule.callIds||rule.callIds.includes(callType.id);
      if (unitMatch&&callMatch) bonus+=rule.statBonus;
    }
    return bonus;
  }

  function pickCallForUnit() {
    const pool = UNIT_CALL_POOL[state.unit]||[];
    const callId = pool.length>0 ? pool[Math.floor(Math.random()*pool.length)] : null;
    if (!callId) return CALL_TYPES[Math.floor(Math.random()*CALL_TYPES.length)];
    return CALL_TYPES.find(c=>c.id===callId)||CALL_TYPES[Math.floor(Math.random()*CALL_TYPES.length)];
  }

  function getOutcomeThresholds(difficulty) {
    let t;
    if (difficulty==='easy') t={crit:10,success:7,partial:4};
    else if (difficulty==='hard') t={crit:12,success:9,partial:6};
    else t={crit:11,success:8,partial:5};
    // v2: player difficulty setting shifts all thresholds
    const d=getDifficulty(state).threshDelta;
    if (d) t={crit:t.crit+d,success:t.success+d,partial:t.partial+d};
    return t;
  }

  // ===== MAIN MENU =====
  async function initMenu() {
    showScreen('screen-menu');
    generateFireParticles();
    Sound.stopAmbientHum();
    const save = await window.electronAPI.loadGame();
    el('btn-continue').disabled = !save;
    el('btn-erase').disabled = !save;
    el('btn-new-career').onclick = initNewCareer;
    el('btn-continue').onclick = () => {
      if (!save) return;
      state = migrateState(save);
      if (state.phase==='academy') resumeAcademy();
      else resumeShift();
    };
    el('btn-erase').onclick = async () => {
      if (confirm('Erase save and start fresh?')) {
        let res;
        try { res = await window.electronAPI.deleteSave(); }
        catch(err) { res = { success:false, error: err && err.message }; }
        if (!res || !res.success) {
          Toast.show('Erase failed', `The save file could not be deleted${res && res.error ? ' — ' + res.error : ''}.`, 'danger');
          try { Sound.playFailureSting(); } catch(e) {}
          return;
        }
        el('btn-continue').disabled=true; el('btn-erase').disabled=true;
        el('btn-load-game').disabled=true;
      }
    };
    el('btn-load-game').onclick = initLoadGameScreen;
    // Enable Load Game if any slots exist
    try {
      const slots = await window.electronAPI.listSlots();
      const hasAny = slots.some(s=>s.meta!==null);
      el('btn-load-game').disabled = !hasAny;
    } catch(e) { el('btn-load-game').disabled = true; }

    // Escape key → in-game save/load menu
    document.addEventListener('keydown', e=>{
      if (e.key==='Escape' && state && state.phase==='shift') {
        const callScreen = el('screen-call');
        if (callScreen && callScreen.classList.contains('active')) return;
        toggleSaveLoadMenu();
      }
    });
    el('btn-mute').onclick = () => {
      const m=Sound.toggleMute();
      el('btn-mute').textContent=m?'🔇':'🔊';
      el('btn-mute').classList.toggle('muted',m);
      const muteChk = el('settings-mute-checkbox'); if (muteChk) muteChk.checked = m;
      persistAppSettings({ immediate: true });
    };
    el('btn-min').onclick = ()=>window.electronAPI.minimizeWindow();
    el('btn-max').onclick = ()=>window.electronAPI.maximizeWindow();
    el('btn-close').onclick = ()=>window.electronAPI.closeWindow();
  }

  function generateFireParticles() {
    const container = el('fire-particles'); container.innerHTML='';
    for (let i=0;i<18;i++) {
      const spark=document.createElement('div');
      spark.style.cssText=`position:absolute;bottom:0;left:${Math.random()*100}%;width:${2+Math.random()*3}px;height:${6+Math.random()*14}px;background:linear-gradient(to top,#c8281e,#f59e0b,transparent);border-radius:50% 50% 0 0;opacity:${0.3+Math.random()*0.5};animation:spark-rise ${1.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite;`;
      container.appendChild(spark);
    }
    if (!document.getElementById('spark-style')) {
      const s=document.createElement('style'); s.id='spark-style';
      s.textContent='@keyframes spark-rise{0%{transform:translateY(0) scaleX(1);opacity:.6;}70%{opacity:.3;}100%{transform:translateY(-120px) scaleX(0.3);opacity:0;}}';
      document.head.appendChild(s);
    }
  }

  // ===== NEW CAREER =====
  function initNewCareer() {
    showScreen('screen-new-career');
    const yearEl = el('academy-intake-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    let selectedBg='military';
    document.querySelectorAll('.radio-card[data-bg]').forEach(card => {
      card.onclick = () => {
        document.querySelectorAll('.radio-card[data-bg]').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected'); selectedBg=card.dataset.bg;
        renderStatPreview(selectedBg);
      };
    });
    renderStatPreview(selectedBg);
    el('back-from-new').onclick = initMenu;
    el('btn-to-career-path').onclick = () => {
      const name = el('career-name').value.trim()||'Rookie';
      // Store name+bg temporarily, don't create state yet
      el('btn-to-career-path')._name = name;
      el('btn-to-career-path')._bg = selectedBg;
      initCareerPath(name, selectedBg);
    };
  }

  function renderStatPreview(bg) {
    const bgBonus=BACKGROUNDS[bg].stats, grid=el('stat-preview'); grid.innerHTML='';
    for (const [key,base] of Object.entries(BASE_STATS)) {
      const val=Math.min(100,base+(bgBonus[key]||0)), color=STAT_COLORS[key];
      const item=document.createElement('div'); item.className='stat-preview-item';
      item.innerHTML=`<span class="sp-name">${key}</span><div class="sp-bar-wrap"><div class="sp-bar" style="width:${val}%;background:${color}"></div></div><span class="sp-val" style="color:${color}">${val}</span>`;
      grid.appendChild(item);
    }
  }

  // ===== CAREER PATH SELECTION =====
  function initCareerPath(name, bg) {
    showScreen('screen-career-path');
    let selectedTrack = null;

    document.querySelectorAll('.track-card').forEach(card => {
      card.classList.remove('selected','suppression-selected','ems-selected');
      card.onclick = () => {
        document.querySelectorAll('.track-card').forEach(c=>c.classList.remove('selected','suppression-selected','ems-selected'));
        card.classList.add('selected');
        selectedTrack = card.dataset.track;
        card.classList.add(selectedTrack+'-selected');
        el('btn-start-track').disabled = false;
      };
    });

    el('back-from-career-path').onclick = initNewCareer;
    el('btn-start-track').disabled = true;
    el('btn-start-track').onclick = () => {
      if (!selectedTrack) return;
      state = DEFAULT_STATE(name, bg, selectedTrack);
      saveGame();
      startAcademy();
    };
  }

  // ===== ACADEMY =====
  function startAcademy() {
    state.phase='academy'; state.academyWeek=1; state.shiftLog=[];
    showScreen('screen-academy');
    const track=state.track||'suppression';
    el('academy-track-label').textContent = track==='ems' ? 'EMS ACADEMY' : 'FIRE ACADEMY';
    renderAcademyHUD(); renderAcademyWeek();
  }

  function resumeAcademy() {
    showScreen('screen-academy');
    const track=state.track||'suppression';
    el('academy-track-label').textContent = track==='ems' ? 'EMS ACADEMY' : 'FIRE ACADEMY';
    renderAcademyHUD(); renderAcademyLog(); renderAcademyWeek();
  }

  function renderAcademyHUD() { el('hud-name').textContent=state.name; renderHUD('hud-stats'); }

  function renderAcademyLog() {
    const log=el('academy-log'); log.innerHTML='';
    (state.shiftLog||[]).forEach(e=>{
      const d=document.createElement('div'); d.className=`log-entry ${e.type}`; d.textContent=e.text; log.appendChild(d);
    });
    log.scrollTop=log.scrollHeight;
  }

  function getAcademyEvents() {
    return (state.track==='ems') ? EMS_ACADEMY_EVENTS : ACADEMY_EVENTS;
  }

  function renderAcademyWeek() {
    const week=state.academyWeek;
    el('academy-week').textContent=week;
    el('academy-progress').style.width=`${(week-1)/8*100}%`;
    const events=getAcademyEvents();
    const event=events.find(e=>e.week===week); if (!event) return;
    const area=el('academy-event-area'); area.innerHTML='';
    const card=document.createElement('div'); card.className='event-card';
    card.innerHTML=`<div class="event-header"><span class="event-icon">${event.icon}</span><span class="event-tag ${event.type}">${event.tag}</span><span class="event-title">${event.title}</span></div>
      <div class="event-body"><p class="event-desc">${event.desc}</p><div class="event-choices">
        ${event.choices.map((c,i)=>`<button class="choice-btn" data-idx="${i}"><span>${c.text}</span><span class="choice-effect">${formatEffectLabel(c.effectLabel)}</span></button>`).join('')}
      </div></div>`;
    area.appendChild(card);
    card.querySelectorAll('.choice-btn').forEach(btn=>{
      btn.onclick=()=>handleAcademyChoice(event, event.choices[parseInt(btn.dataset.idx)]);
    });
  }

  function formatEffectLabel(label) {
    return label.replace(/\+(\d+)/g,'<span class="pos">+$1</span>').replace(/-(\d+)/g,'<span class="neg">-$1</span>');
  }

  function getGuestEventsForTrack() {
    return state.track==='ems' ? EMS_GUEST_EVENTS : FIRE_GUEST_EVENTS;
  }

  function handleAcademyChoice(event, choice) {
    const deltas=applyStats(choice.effect);
    renderAcademyHUD();
    const type=Object.values(deltas).some(v=>v<0)?'negative':'positive';
    addToLog(`Week ${state.academyWeek} — ${event.title}: ${choice.text}`,type);
    if (choice.isGraduation) {
      addToLog('★ GRADUATED — Awaiting unit assignment!','critical');
      renderAcademyLog();
      el('academy-progress').style.width='100%';
      saveGame();
      setTimeout(()=>showGraduationAssignment(), 1800);
      return;
    }
    renderAcademyLog(); saveGame();

    // Check for a guest event at this week
    const guestEvent = getGuestEventsForTrack().find(
      g => g.week === state.academyWeek && !(state.firedGuestEvents||[]).includes(g.id)
    );

    const advance=()=>{
      state.academyWeek++;
      renderAcademyHUD();
      renderAcademyWeek();
      el('academy-progress').style.width=`${(state.academyWeek-1)/8*100}%`;
    };

    if (guestEvent) {
      setTimeout(()=>showGuestAcademyEvent(guestEvent, advance), 600);
    } else {
      setTimeout(advance, 600);
    }
  }

  function showGuestAcademyEvent(event, callback) {
    if (!state.firedGuestEvents) state.firedGuestEvents=[];
    state.firedGuestEvents.push(event.id);

    const area=el('academy-event-area'); area.innerHTML='';
    const card=document.createElement('div'); card.className='event-card guest-event-card';
    card.innerHTML=`<div class="event-header">
      <span class="event-icon">${event.icon}</span>
      <span class="event-tag guest-tag">${event.tag}</span>
      <span class="event-title">${event.title}</span>
    </div>
    <div class="event-body">
      <p class="event-desc">${event.intro}</p>
      <div class="guest-dialogue-box">
        <div class="guest-portrait">
          ${buildPortraitSVG(event.portrait, event.border, 64)}
        </div>
        <div class="guest-dialogue-text">
          <div class="speech-bubble">${event.dialogue}</div>
          ${event.note?`<div class="guest-event-note">${event.note}</div>`:''}
        </div>
      </div>
      <div class="event-choices">
        ${event.choices.map((c,i)=>`<button class="choice-btn guest-choice-btn" data-idx="${i}">
          <span>${c.text}</span>
          <span class="choice-effect">${formatEffectLabel(c.effectLabel)}</span>
        </button>`).join('')}
      </div>
    </div>`;
    area.appendChild(card);

    card.querySelectorAll('.guest-choice-btn').forEach(btn=>{
      btn.onclick=()=>{
        const choice=event.choices[parseInt(btn.dataset.idx)];
        applyStats(choice.effect||{});
        // Apply bond bonus to the relevant crew member
        if (event.crewId && choice.bondDelta) {
          const member=state.roster.find(r=>r.id===event.crewId);
          if (member) {
            member.bond=Math.min(100, member.bond+(choice.bondDelta||0));
          }
        }
        renderAcademyHUD();
        addToLog(`Guest: ${event.title} — ${choice.text}`, 'positive');
        renderAcademyLog(); saveGame();
        setTimeout(callback, 500);
      };
    });
  }

  // ===== GRADUATION ASSIGNMENT =====
  function showGraduationAssignment() {
    const track=state.track||'suppression';
    let unit, supervisor, message, accent;

    if (track==='ems') {
      unit='Ambulance 9'; supervisor='Paramedic Elena Sorensen'; accent='var(--accent-blue)';
      message='You have been assigned to Ambulance 9 as Paramedic Candidate. You will work alongside Paramedic Sorensen on all ALS calls. Report to the ambulance bay at 0700.';
    } else {
      const toEngine=Math.random()<0.5;
      if (toEngine) {
        unit='Engine 12'; supervisor='Lieutenant Gus Whitaker'; accent='var(--accent-red)';
        message='You have been assigned to Engine 12 under Lieutenant Whitaker. Suppression operations begin immediately. Report to the apparatus bay at 0700.';
      } else {
        unit='Truck 7'; supervisor='Lieutenant Rae Delgado'; accent='var(--accent-amber)';
        message='You have been assigned to Truck 7 under Captain Delgado. Truck operations and primary search duties begin at 0700.';
      }
    }

    state.unit = unit;
    const card=el('assignment-card');
    card.innerHTML=`<div class="assignment-unit" style="color:${accent}">${unit}</div>
      <div class="assignment-supervisor">Reporting to: ${supervisor}</div>
      <div class="assignment-message">${message}</div>`;
    showScreen('screen-assignment');

    el('btn-accept-assignment').onclick=()=>{
      state.phase='shift';
      state.rankIndex=1; // probie (suppression) or paramedic (ems) — index 1 in both rank arrays
      state.shiftNumber=1;
      state.actionsRemaining=3; state.shiftLog=[]; state.statDeltas={};
      state.totalCalls=0; state.consecutiveFailures=0; state.shiftCallOutcomes=[];
      state.whitfieldTrust=50; state.crewStates={}; state.shiftsWithoutMeal=0;
      state.probieScore=0; state.probieWeek=1; state.probieReviewCount=0;
      state.specialistChosen=false; state.specialist=null;
      state.hospitalRapport=50; state.legacyScore=0;
      saveGame(); startShift();
    };
  }

  // ===== SHIFT =====
  function startShift() {
    state.shiftLog=[]; state.statDeltas={}; state.shiftCallOutcomes=[];
    state.shiftTone = null;
    state.currentComplications = drawComplications();
    let baseActions=3;
    if (state.currentComplications.some(c=>c.id==='understaffed')) baseActions=2;
    state.actionsRemaining=baseActions;
    state.currentComplications.forEach(c=>{
      if (c.effect.whitfieldTrustMod) changeWhitfieldTrust(c.effect.whitfieldTrustMod);
    });
    // Chain rank-specific pre-shift events before shift briefing
    runPreShiftSequence();
  }

  function runPreShiftSequence() {
    const rid = getRankId();
    // BC district staffing → Captain AFD briefing → LT tone → DE apparatus check → probie tasks → shift briefing
    if (rid === 'battalion_chief') { showBCDistrictStaffing(afterBCStaffing); return; }
    if (rid === 'captain') { showCaptainAFDBriefing(afterCaptainBriefing); return; }
    if (rid === 'lieutenant') { showLTShiftTone(afterLTTone); return; }
    if (rid === 'driver_engineer') { showApparatusCheck(()=>showShiftBriefing()); return; }
    if (rid === 'probie' && state.track !== 'ems') { showProbieTasksModal(()=>showShiftBriefing()); return; }
    showShiftBriefing();
  }
  // Officer ranks get a chance, before the shift briefing, for a subordinate
  // to seek them out (pure random) and/or an unresolved conflict to surface
  // at their tier (also pure random, independent roll).
  function runOfficerPreShiftEvents(rid) {
    maybeSeekAdviceEvent(rid, ()=>maybeConflictEvent(rid, showShiftBriefing));
  }
  function afterBCStaffing() { runOfficerPreShiftEvents('battalion_chief'); }
  function afterCaptainBriefing() { runOfficerPreShiftEvents('captain'); }
  function afterLTTone() { runOfficerPreShiftEvents('lieutenant'); }

  function drawComplications() {
    const roll=Math.random();
    const count=roll<0.2?2:roll<0.5?1:0;
    return [...COMPLICATIONS].sort(()=>Math.random()-0.5).slice(0,count);
  }

  function showShiftBriefing() {
    const comps=state.currentComplications||[];
    const content=el('briefing-content'); content.innerHTML='';

    const info=document.createElement('div'); info.className='briefing-shift-info';
    info.innerHTML=`<span>SHIFT ${state.shiftNumber} — ${RANKS[state.rankIndex].label}</span><span class="briefing-unit">${state.unit||'Truck 7'}</span>`;
    content.appendChild(info);

    if (comps.length===0) {
      const ok=document.createElement('div'); ok.className='briefing-clear';
      ok.innerHTML='<span>✓</span> No complications. Clean shift.'; content.appendChild(ok);
    } else {
      comps.forEach(comp=>{
        const card=document.createElement('div'); card.className='complication-card';
        card.innerHTML=`<div class="comp-icon">${comp.icon}</div><div class="comp-info"><div class="comp-label">${comp.label}</div><div class="comp-desc">${comp.desc}</div></div>`;
        content.appendChild(card);
      });
    }

    el('btn-start-shift').onclick=()=>{
      hideModal('modal-briefing');
      afterBriefing(comps);
    };
    showModal('modal-briefing');
  }

  function afterBriefing(comps) {
    showFirehouseScreen();
    const compStr=comps.length>0?' | '+comps.map(c=>c.icon+' '+c.label).join(' '):'';
    addFeedEntry(`— Shift ${state.shiftNumber} begins.${compStr} —`,'system');
    if (state.lastCallOutcome==='critSuccess') {
      const acks=CONSEQUENCE_EVENTS.critSuccessAck;
      setTimeout(()=>addFeedEntry(acks[Math.floor(Math.random()*acks.length)],'consequence'),1200);
      state.lastCallOutcome=null;
    }
    Sound.startAmbientHum();
    checkFatigue();
    // Assign shadow crew for probies at shift start
    if (getRankId()==='probie' && state.track!=='ems') {
      state.shadowCrewId=assignShadowCrewId();
      const m=state.roster.find(r=>r.id===state.shadowCrewId);
      if (m) {
        const ltName={'Truck 7':'Delgado','Engine 12':'Tibbets','Squad 4':'Kessler'}[state.unit]||'the Lieutenant';
        addFeedEntry(`<strong>Lt. ${ltName}:</strong> "${state.name.split(' ').pop()}, you're on ${m.name.split(' ').pop()}'s hip today. Watch everything. Don't freelance."`,'action');
      }
    } else if (getRankId()==='ems_candidate') {
      state.shadowCrewId='priya';
      addFeedEntry(`<strong>Priya:</strong> "You're riding with me today. Watch what I do. Ask questions when we're not on scene."`,'action');
    }
    // Decrement exam cooldown
    if ((state.examCooldown||0)>0) {
      state.examCooldown--;
      if (state.examCooldown===0) addFeedEntry('Exam resit cooldown over — you may prepare for the next sitting.','consequence');
    }
    // Vacancy countdown
    if (state.examResult==='pass' && state.vacancyCountdown!==null) {
      if (state.vacancyCountdown>0) {
        state.vacancyCountdown--;
        if (state.vacancyCountdown===0) {
          state.vacancyCountdown=null;
          setTimeout(()=>showVacancyEvent(state.examTargetRank||'lieutenant'),1500);
        } else {
          addFeedEntry(`You are #${state.eligibilityRank} on the ${state.examTargetRank||'promotion'} eligibility list. Watching for vacancies.`,'consequence');
        }
      }
    }
    applyShiftStartConsequences();
    saveGame();
  }

  // ===== v2: PERSISTENT CONSEQUENCES =====
  function applyShiftStartConsequences() {
    const c=state.condition||(state.condition={stress:0,injury:null,ptsdRisk:0,counseling:0});
    // Suspension from a disciplinary hearing
    if (state._suspendedNextShift) {
      state._suspendedNextShift=false;
      state.actionsRemaining=1;
      el('actions-remaining')&&(el('actions-remaining').textContent=1);
      addFeedEntry('⚖️ <strong>Suspended from active duties this shift.</strong> Desk, drills, and a lot of pointed silence.','consequence');
    }
    // Injury: reduced capacity while healing
    if (c.injury) {
      state.actionsRemaining=Math.max(1,(state.actionsRemaining||3)-1);
      el('actions-remaining')&&(el('actions-remaining').textContent=state.actionsRemaining);
      addFeedEntry(`🩹 <strong>${c.injury.name}</strong> — ${c.injury.shiftsLeft} shift${c.injury.shiftsLeft===1?'':'s'} until cleared. Reduced capacity this shift.`,'consequence');
    }
    // Stress states
    if (c.stress>=90) {
      setTimeout(()=>showCounselingEvent(),1200);
    } else if (c.stress>=70) {
      addFeedEntry(`⚠ Stress is high (${c.stress}/100). It's starting to show — sleep isn't working, and the tones make your chest tight. The Firebell, home, or the chaplain would help.`,'consequence');
      applyStats({morale:-2});
    }
    // Disciplinary hearing
    if ((state.discipline?.points||0)>=6) {
      setTimeout(()=>showDisciplinaryHearing(),1600);
    }
  }

  function showCounselingEvent() {
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent='MANDATORY REFERRAL';
    el('crew-event-portrait-area').innerHTML='<span style="font-size:32px">🕯️</span>';
    el('crew-event-title').textContent='The Chaplain\'s Office';
    el('crew-event-desc').textContent='Chaplain Sheffield closes the door behind you. Someone — Delgado, probably, or Whitaker — flagged it. The dreams, the short fuse, the way you flinched at the tones last shift. This isn\'t optional anymore.';
    el('crew-event-speech').textContent='"You carry other people\'s worst days for a living. Nobody carries that alone forever — not you, not Whitfield, not anyone who ever sat in that chair. So. Talk, or sit quietly. Both count."';
    const choices=el('crew-event-choices'); choices.innerHTML='';
    [
      { text:'Talk. Actually talk — the calls, the dreams, all of it.', label:'-40 Stress, +Morale', fx:()=>{ addStress(state,-40); state.condition.counseling++; state.condition.ptsdRisk=Math.max(0,(state.condition.ptsdRisk||0)-20); applyStats({morale:5}); recordHistory(state,'condition','Counseling session with Chaplain Sheffield — it helped.'); } },
      { text:'Sit quietly for the hour. It\'s something.', label:'-20 Stress', fx:()=>{ addStress(state,-20); state.condition.counseling++; recordHistory(state,'condition','Sat with the chaplain. Said nothing. Still counted.'); } },
      { text:'"I\'m fine." Leave early.', label:'Stress stays, +PTSD risk', fx:()=>{ state.condition.ptsdRisk=Math.min(100,(state.condition.ptsdRisk||0)+15); applyStats({morale:-3}); recordHistory(state,'condition','Walked out of the chaplain\'s office. The door didn\'t slam, but it wanted to.'); } },
    ].forEach(opt=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${opt.text}</span><span class="choice-effect">${opt.label}</span>`;
      btn.onclick=()=>{ opt.fx(); renderHUD('shift-hud-stats'); hideModal('modal-crew-event'); saveGame(); };
      choices.appendChild(btn);
    });
    showModal('modal-crew-event');
  }

  function showDisciplinaryHearing() {
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent='DISCIPLINARY HEARING';
    el('crew-event-portrait-area').innerHTML='<span style="font-size:32px">⚖️</span>';
    el('crew-event-title').textContent='Headquarters — Room 4';
    el('crew-event-desc').textContent='A long table, three uniforms, and a folder of your recent fireground decisions with the reckless ones flagged in red. Kade sits at the end — he came, which means something, but he isn\'t smiling.';
    el('crew-event-speech').textContent='"This isn\'t about one call. It\'s a pattern of risk the department can\'t underwrite. What we decide today depends a great deal on what you say next."';
    const trust=state.whitfieldTrust??50;
    const choices=el('crew-event-choices'); choices.innerHTML='';
    [
      { text:'Own the pattern — no excuses, present your corrective plan', label:'Best outcome scales with Kade\'s trust',
        fx:()=>{ if (trust>=60) { applyStats({reputation:-2}); addFeedEntry('⚖️ Written reprimand only — Kade spoke for you. "Don\'t make me do that twice."','consequence'); recordHistory(state,'discipline','Disciplinary hearing: written reprimand. Kade vouched.'); }
                 else { applyStats({reputation:-5,morale:-3}); state._suspendedNextShift=true; addFeedEntry('⚖️ One-shift suspension of duties. It could have been worse — barely.','consequence'); recordHistory(state,'discipline','Disciplinary hearing: one-shift suspension.'); } } },
      { text:'Defend every call — the outcomes justified the risks', label:'High risk, high variance',
        fx:()=>{ if (Math.random()<0.3+(trust/200)) { applyStats({reputation:2,command:2}); addFeedEntry('⚖️ The board, astonishingly, buys it. "Results matter. So does luck. Know the difference."','consequence'); recordHistory(state,'discipline','Disciplinary hearing: defended and cleared.'); }
                 else { applyStats({reputation:-8,morale:-4}); state._suspendedNextShift=true; changeWhitfieldTrust(-10); addFeedEntry('⚖️ The defense reads as exactly the attitude they\'re worried about. Suspension, and Kade\'s jaw is set.','consequence'); recordHistory(state,'discipline','Disciplinary hearing: defense rejected — suspension.'); } } },
    ].forEach(opt=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${opt.text}</span><span class="choice-effect">${opt.label}</span>`;
      btn.onclick=()=>{ opt.fx(); state.discipline.points=0; state.discipline.hearings=(state.discipline.hearings||0)+1; renderHUD('shift-hud-stats'); hideModal('modal-crew-event'); saveGame(); };
      choices.appendChild(btn);
    });
    showModal('modal-crew-event');
  }

  function showLODDEvent(member) {
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent='LINE OF DUTY DEATH';
    const src=(CREW_EVENTS[member.id]||[]).find(e=>e.portrait);
    el('crew-event-portrait-area').innerHTML=src?buildPortraitSVG(src.portrait,'#64748b',90):'<span style="font-size:32px">🖤</span>';
    el('crew-event-title').textContent=`${member.name}`;
    el('crew-event-desc').textContent=`The collapse took the floor out from under everyone — but it was ${member.name.split(' ').pop()} who didn't come out. The bells ring the four fives. The house goes quiet in a way it has never been quiet before.`;
    el('crew-event-speech').textContent='Kade, voice level by force of will: "We will grieve like a family, and we will work like professionals, because that is what they would demand of us. Bunker gear on the flag. Last alarm at nineteen hundred."';
    const choices=el('crew-event-choices'); choices.innerHTML='';
    const btn=document.createElement('button'); btn.className='menu-btn primary';
    btn.textContent='Stand for the Last Alarm.';
    btn.onclick=()=>{
      hideModal('modal-crew-event'); saveGame();
    };
    choices.appendChild(btn);
    showModal('modal-crew-event');
  }

  function triggerLODD() {
    // Choose from assigned crew if possible, else any non-officer active member
    const pool=state.roster.filter(m=>m.status!=='fallen'&&(_assignedCrew.includes(m.id)||_assignedCrew.length===0)&&!/Chief|OIC/.test(m.role||''));
    if (!pool.length) return false;
    const member=pool[Math.floor(Math.random()*pool.length)];
    member.status='fallen';
    const idx=state.roster.findIndex(m=>m.id===member.id);
    if (idx>=0) state.roster.splice(idx,1);
    state.memorial.push({ id:member.id, name:member.name, role:member.role, unit:member.unit, shift:state.shiftNumber, call:_callType.name });
    addStress(state, 30);
    state.condition.ptsdRisk=Math.min(100,(state.condition.ptsdRisk||0)+25);
    applyStats({morale:-10});
    state.roster.forEach(m=>{ if((state.crewStates||{})[m.id]!=='confident') state.crewStates[m.id]='shaken'; });
    recordHistory(state,'lodd',`LINE OF DUTY DEATH — ${member.name} (${member.role}, ${member.unit}), lost at the ${_callType.name}, Shift ${state.shiftNumber}.`);
    setTimeout(()=>showLODDEvent(member), 2200);
    return true;
  }

  function resumeShift() { showFirehouseScreen(); Sound.startAmbientHum(); resolveCommandConflicts(); }

  function showFirehouseScreen() {
    showScreen('screen-firehouse');
    const rank=getCurrentRank();
    el('shift-name').textContent=state.name;
    el('shift-rank').textContent=rank.label;
    el('shift-number').textContent=state.shiftNumber;
    el('hud-calls-count').textContent=state.totalCalls||0;
    const unitBadge=el('shift-unit-badge');
    unitBadge.textContent=state.unit||'Truck 7';
    unitBadge.style.display=state.rankIndex>=2?'':'none';
    const transferBtn=el('btn-transfer');
    transferBtn.style.display=(state.rankIndex>=4&&state.track!=='ems')?'':'none';
    transferBtn.onclick=showUnitTransfer;
    el('floor-shift-status').textContent='STANDBY';
    el('actions-remaining').textContent=state.actionsRemaining;
    renderHUD('shift-hud-stats');
    renderShiftFeed();
    renderComplicationBanner();
    renderProbieStandingBar();
    renderRankSpecificRooms();
    wireShiftButtons();
    checkRoomAvailability();
  }

  function renderProbieStandingBar() {
    const wrap = el('probie-standing-bar');
    if (!wrap) return;
    const rid = getRankId();
    if (rid !== 'probie') { wrap.classList.add('hidden'); return; }
    wrap.classList.remove('hidden');
    const score = state.probieScore||0;
    el('probie-bar-inner').style.width = Math.min(100,score)+'%';
    el('probie-score-val').textContent = Math.min(100,score);
    el('probie-week-num').textContent = state.probieWeek||1;
  }

  function renderRankSpecificRooms() {
    const rid = getRankId();

    // Reset all standard rooms to defaults first
    const roomDefaults = [
      { elemId:'room-drill',    action:'drill',     icon:'🚒', name:'Apparatus Bay',  sub:'Company Drill' },
      { elemId:'room-gym',      action:'gym',       icon:'💪', name:'Gym',            sub:'Fitness Training' },
      { elemId:'room-kitchen',  action:'meal',      icon:'🍳', name:'Kitchen',        sub:'Crew Meal' },
      { elemId:'room-office',   action:'study',     icon:'📋', name:'Watch Office',   sub:'Study SOGs' },
      { elemId:'room-bunkroom', action:'paperwork', icon:'🗂️', name:'Bunk Room',      sub:'Paperwork' },
    ];
    roomDefaults.forEach(d=>{
      const r=el(d.elemId); if(!r) return;
      r.dataset.action=d.action;
      const ico=r.querySelector('.room-icon'); if(ico) ico.textContent=d.icon;
      const nm=r.querySelector('.room-name');  if(nm) nm.textContent=d.name;
      const sb=r.querySelector('.room-sub');   if(sb) sb.textContent=d.sub;
      r.classList.remove('rank-room');
    });

    // Officer room override for LT, Captain, BC
    const officerCfg=OFFICER_ROOM_CONFIGS[rid];
    if (officerCfg) {
      officerCfg.forEach(d=>{
        const r=el(d.elemId); if(!r) return;
        r.dataset.action=d.action;
        const ico=r.querySelector('.room-icon'); if(ico) ico.textContent=d.icon;
        const nm=r.querySelector('.room-name');  if(nm) nm.textContent=d.name;
        const sb=r.querySelector('.room-sub');   if(sb) sb.textContent=d.sub;
        r.classList.add('rank-room');
      });
    }

    // Exam override: show exam entry when eligible and not on a resit cooldown
    if (state.examEligible && !state.examResult && (state.examCooldown||0)<=0) {
      const officeRoom=el('room-office'); if(officeRoom) {
        officeRoom.dataset.action='sit_exam';
        const ico=officeRoom.querySelector('.room-icon'); if(ico) ico.textContent='📋';
        const nm=officeRoom.querySelector('.room-name');  if(nm) nm.textContent='Civil Service Exam';
        const sb=officeRoom.querySelector('.room-sub');   if(sb) sb.textContent=`Readiness: ${state.examReadiness||0}%`;
        officeRoom.classList.add('rank-room');
      }
    } else if (state.examEligible && !state.examResult && (state.examCooldown||0)>0) {
      const officeRoom=el('room-office'); if(officeRoom) {
        officeRoom.dataset.action='study';
        const ico=officeRoom.querySelector('.room-icon'); if(ico) ico.textContent='📋';
        const nm=officeRoom.querySelector('.room-name');  if(nm) nm.textContent='Watch Office';
        const sb=officeRoom.querySelector('.room-sub');   if(sb) sb.textContent=`Exam resit in ${state.examCooldown} shift${state.examCooldown===1?'':'s'}`;
        officeRoom.classList.remove('rank-room');
      }
    }

    // Rank-specific side room (slot A)
    const roomA = el('room-rank-a');
    if (!roomA) return;
    const rankRoomConfig = {
      'driver_engineer': { action:'apparatus_check', icon:'🔧', name:'Apparatus Check', sub:'Pre-Shift Inspection' },
      'paramedic':       { action:'hospital_panel',  icon:'🏥', name:'Hospital Liaison', sub:'Rapport: '+(state.hospitalRapport||50) },
      'pic':             { action:'hospital_panel',  icon:'🏥', name:'Hospital Liaison', sub:'Rapport: '+(state.hospitalRapport||50) },
      'field_chief':     { action:'hospital_panel',  icon:'🏥', name:'Hospital Liaison', sub:'Rapport: '+(state.hospitalRapport||50) },
    };
    const cfg=rankRoomConfig[rid];
    if (!cfg) { roomA.classList.add('hidden'); return; }
    roomA.classList.remove('hidden');
    roomA.dataset.action=cfg.action;
    el('rank-room-a-icon').textContent=cfg.icon;
    el('rank-room-a-name').textContent=cfg.name;
    el('rank-room-a-sub').textContent=cfg.sub;
  }

  function renderComplicationBanner() {
    const banner=el('complication-banner');
    const comps=state.currentComplications||[];
    if (comps.length===0) { banner.classList.add('hidden'); return; }
    banner.classList.remove('hidden');
    banner.innerHTML=comps.map(c=>`${c.icon} ${c.label}`).join('  ·  ');
  }

  function wireShiftButtons() {
    document.querySelectorAll('.room').forEach(r=>{r.onclick=()=>handleRoomAction(r.dataset.action);});
    el('btn-end-shift').onclick=showShiftSummary;
    el('btn-roster').onclick=showRoster;
    el('btn-log').onclick=showLog;
    el('close-roster').onclick=()=>hideModal('modal-roster');
    el('close-log').onclick=()=>hideModal('modal-log');
    el('btn-accept-promotion').onclick=()=>{hideModal('modal-promotion');showFirehouseScreen();};
    el('btn-to-offduty').onclick=goToOffDuty;
  }

  function checkRoomAvailability() {
    document.querySelectorAll('.room').forEach(r=>r.classList.remove('used'));
    if (state.actionsRemaining<=0) {
      document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
    }
  }

  function handleRoomAction(action) {
    if (action==='dispatch') { launchIncidentCommand(); return; }
    if (action==='apparatus_check') { showApparatusCheck(()=>{}); return; }
    if (action==='crew_conflict') { showConflictEvent(getRankId()); return; }
    if (action==='house_mgmt') { showHouseMgmt(); return; }
    if (action==='bc_legacy') { showBCLegacyEvent(); return; }
    if (action==='hospital_panel') { showHospitalPanel(); return; }
    if (action==='exam_prep') { handleExamPrep(); return; }
    if (action==='sit_exam') { triggerWrittenExam(); return; }
    if (action==='lt_drill') { showLTDrillFocus(); return; }
    if (action==='lt_inspection') { handleLTInspection(); return; }
    if (action==='lt_briefing'||action==='cap_briefing'||action==='bc_briefing') { handleShiftBriefingAttend(); return; }
    if (action==='lt_shiftlog') { handleShiftLogWrite(); return; }
    if (action==='lt_counsel') { showCounselCrewModal(); return; }
    if (state.actionsRemaining<=0) return;
    const actionData=SHIFT_ACTIONS[action]; if (!actionData) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const deltas=applyStats(actionData.effect);
    renderHUD('shift-hud-stats');
    const dialogue=actionData.dialogues[Math.floor(Math.random()*actionData.dialogues.length)];
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>${actionData.name}: ${dialogue}`,'action');
    const deltaStr=formatDeltas(deltas);
    if (deltaStr) addFeedEntry(deltaStr,'stat');
    addToLog(`${actionData.name} — ${dialogue}`,'positive');
    maybeBanter(action==='drill'?'drill':(action==='rest'||action==='meal')?'rest':'downtime');
    // Handle meal: reset fatigue
    if (action==='meal') {
      state.shiftsWithoutMeal=0;
      state.roster.forEach(m=>{
        if ((state.crewStates||{})[m.id]==='fatigued') state.crewStates[m.id]='normal';
      });
    }
    const room=document.querySelector(`.room[data-action="${action}"]`);
    if (room) room.classList.add('used');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  function renderShiftFeed() {
    const feed=el('shift-feed'); feed.innerHTML='';
    (state.shiftLog||[]).forEach(e=>{
      const d=document.createElement('div'); d.className=`feed-entry ${e.type||'system'}`; d.innerHTML=e.text; feed.appendChild(d);
    });
    feed.scrollTop=feed.scrollHeight;
  }

  function addFeedEntry(text, type) {
    const feed=el('shift-feed'); if (!feed) return;
    const div=document.createElement('div'); div.className=`feed-entry ${type}`; div.innerHTML=text;
    feed.appendChild(div); feed.scrollTop=feed.scrollHeight;
    if (!state.shiftLog) state.shiftLog=[];
    state.shiftLog.push({text,type});
  }

  // v2: crew banter (DLC banter pack). Light flavor lines with small effects.
  function maybeBanter(context, callType) {
    if (!state) return;
    if (state._banterThisScreen) return;          // max one line per screen visit
    let pool=null;
    if (context==='dispatch') {
      const cat=banterCategoryForCall(callType);
      pool=cat?BANTER.dispatch[cat]:null;
    } else pool=BANTER[context];
    if (!pool||!pool.length) return;
    const b=pool[Math.floor(Math.random()*pool.length)];
    if (Math.random()>(b.chance??0.4)) return;
    if (b.maxRankIndex!==undefined && state.rankIndex>b.maxRankIndex) return;
    state._banterThisScreen=true;
    setTimeout(()=>{ state._banterThisScreen=false; },100);
    addFeedEntry(`<span class="banter-line">💬 ${b.line}</span>`,'action');
    if (b.effect) { applyStats(b.effect); renderHUD('shift-hud-stats'); }
    if (b.stress) addStress(state,b.stress);
  }

  // Scripted call dialogue assumes the original officers lead each company.
  // If the player now commands a unit (or its old officer has left / moved up),
  // reassign that officer's lines so the radio traffic stays consistent.
  function adaptCallDialogue(lines) {
    const officerMap={ 'Kessler':{id:'kessler',unit:'Squad 4'}, 'Delgado':{id:'delgado',unit:'Truck 7'}, 'Tibbets':{id:'tibbets',unit:'Engine 12'} };
    const playerLast=(state.name||'').split(' ').pop();
    return (lines||[]).map(l=>{
      const off=officerMap[l.speaker];
      if (!off) return l;
      if (state.officerCompany===off.unit) return {...l, speaker:`Lt. ${playerLast} (you)`};
      const member=state.roster.find(m=>m.id===off.id);
      if (!member) {
        const senior=state.roster.find(m=>m.unit===off.unit);
        return senior?{...l, speaker:senior.name.split(' ').pop()}:l;
      }
      return l;
    });
  }

  // ===== INCIDENT COMMAND — MODULE VARS =====
  let _callType=null, _sizeUpModifier=0, _assignedCrew=[], _tacticalModifier=0;
  // Rank-differentiated call system
  let _callMode=null;       // 'shadow'|'role'|'de'|'ems_diag'|'captain'|'bc'|null (standard)
  let _modeStatMod=null;    // when set, replaces standard statMod in resolveCall
  let _callModeLabel=null;  // when set, replaces modifier label in dice arena

  function launchIncidentCommand(forcedCallType) {
    _callType=forcedCallType||pickCallForUnit();
    _sizeUpModifier=0; _assignedCrew=[]; _tacticalModifier=0;
    _callMode=null; _modeStatMod=null; _callModeLabel=null;

    const weatherPenalty=(state.currentComplications||[]).some(c=>c.id==='bad_weather')?2:0;
    const equipPenalty=(state.currentComplications||[]).some(c=>c.id==='equipment_issue')?1:0;
    _callType._weatherPenalty=weatherPenalty;
    _callType._equipPenalty=equipPenalty;
    // v2: reset dynamic-incident state (call type objects are shared)
    _callType._stagesRun=false; _callType._stageModifier=0; _callType._stageSeverity=0;

    const address=_callType.addresses[Math.floor(Math.random()*_callType.addresses.length)];
    const details=_callType.details[Math.floor(Math.random()*_callType.details.length)];
    _callType._address=address; _callType._details=details;

    Sound.playRadioStatic();
    showScreen('screen-call');

    el('call-alert-text').textContent=`${_callType.badge} — ${address}`;
    el('call-type-badge').textContent=_callType.badge;
    el('call-address').textContent=address;
    el('call-details').textContent=details;
    el('call-units').textContent=`Units: ${_callType.units}`;
    el('ashfall-map-container').innerHTML=buildAshfallMap(_callType.id);

    // Stats preview
    renderCallStatsPreview();

    // Dialogue
    const dialogBox=el('call-dialogue'); dialogBox.innerHTML='';
    adaptCallDialogue(_callType.dialogue).forEach((line,i)=>{
      setTimeout(()=>{
        const div=document.createElement('div'); div.className='dialogue-line';
        div.innerHTML=`<span class="speaker">${line.speaker}:</span>${line.line}`;
        dialogBox.appendChild(div); dialogBox.scrollTop=dialogBox.scrollHeight;
      },i*650);
    });

    // Reset ALL panels
    ['call-step-1','call-step-2','call-step-3','dice-arena','outcome-panel','selection-summary',
     'call-shadow','call-role','call-de','call-ems-diag','call-captain-board','call-bc-board'].forEach(id=>{
      const e=el(id); if(e) e.classList.add('hidden');
    });

    // Route based on rank
    routeCallByRank();
  }

  function routeCallByRank() {
    const rid=getRankId();
    const track=state.track||'suppression';
    if (track==='ems') {
      if (rid==='ems_candidate') return showShadowCallMode(true);
      if (rid==='paramedic')     return showEMSDiagnosticMode();
      if (rid==='pic')           { el('call-step-1').classList.remove('hidden'); showStep1(); return; }
      if (rid==='field_chief')   return showBCStrategicMode();
    }
    // Suppression
    if (rid==='probie')           return showShadowCallMode(false);
    if (rid==='firefighter')      return showFFRoleMode();
    if (rid==='driver_engineer')  return showDEApparatusMode();
    if (rid==='captain')          return showCaptainCommandMode();
    if (rid==='battalion_chief')  return showBCStrategicMode();
    // Lieutenant and fallback: existing 3-step
    el('call-step-1').classList.remove('hidden');
    showStep1();
  }

  // ===== SHADOW CALL MODE (probie / ems_candidate) =====
  function showShadowCallMode(isEMS) {
    _callMode='shadow';
    el('call-shadow').classList.remove('hidden');

    // Determine shadowed member
    let shadowId=state.shadowCrewId;
    if (!shadowId) shadowId = isEMS ? 'priya' : assignShadowCrewId();
    state.shadowCrewId=shadowId;
    const member=state.roster.find(r=>r.id===shadowId)||state.roster[0];
    const cs=(state.crewStates||{})[member.id]||'normal';
    const stateColor=CREW_STATE_COLORS[cs]||'#3d5080';

    el('shadow-crew-label').textContent=`following ${member.name}`;
    el('shadow-assignment-banner').innerHTML=`<div class="shadow-banner-inner">
      ${buildPortraitSVG(member.initials,stateColor,44)}
      <div class="shadow-banner-text">
        <div class="shadow-banner-name">${member.name}</div>
        <div class="shadow-banner-role">${member.role} · Bond ${member.bond}</div>
        <div class="shadow-banner-order">"Stay with me. Watch what I do. Don't touch anything unless I tell you."</div>
      </div>
    </div>`;

    const tacCat=CALL_TACTIC_MAP[_callType.id]||'admin';
    const catKey=isEMS?'medical':{fire:'fire',rescue:'rescue',water:'rescue',medical:'medical',hazmat:'hazmat',admin:'admin'}[tacCat]||'fire';
    const choices=SHADOW_CALL_CHOICES[catKey]||SHADOW_CALL_CHOICES.fire;

    const choicesEl=el('shadow-choices'); choicesEl.innerHTML='';
    choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice shadow-choice-btn';
      const riskClass=choice.risk?'risk-high':'risk-low';
      const txt=choice.text.replace(/\[crew\]/g,member.name.split(' ').pop()||member.name);
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${txt}</span><span class="step-choice-risk ${riskClass}">${choice.risk?'HIGH RISK':'SAFE'}</span></div>
        <span class="step-choice-mod">${choice.effectLabel}</span>`;
      btn.onclick=()=>{
        _callType._shadowChoice=choice;
        _callType._shadowedMember=member;
        if (choice.knowledgeDelta) applyStats({knowledge:choice.knowledgeDelta});
        // Stat mod from shadowed member effectiveness
        const memberStateBonus=(cs==='confident'?1:cs==='fatigued'?-1:0);
        _modeStatMod=Math.floor((member.bond-30)/25)+memberStateBonus;
        _sizeUpModifier=choice.modifier>1?1:Math.round(choice.modifier);
        _tacticalModifier=0; _assignedCrew=[member.id];
        const modSign=_modeStatMod>=0?'+':'';
        _callModeLabel=`${member.name.split(' ').pop()} effectiveness: ${modSign}${_modeStatMod}  |  Choice: ${choice.modifier>0?'+':''}${choice.modifier}`;
        const sum=el('selection-summary'); sum.classList.remove('hidden');
        sum.innerHTML=`<div class="summary-entry">Shadowing: <strong>${member.name}</strong></div>
          <div class="summary-entry">Your approach: <strong>${txt.slice(0,55)}${txt.length>55?'…':''}</strong></div>
          <div class="summary-entry" style="color:var(--text-dim)">${member.name.split(' ').pop()} effectiveness: <strong style="color:var(--accent-amber)">${modSign}${_modeStatMod}</strong></div>`;
        el('call-shadow').classList.add('hidden');
        showDiceArena({text:choice.id,modifier:choice.modifier});
      };
      choicesEl.appendChild(btn);
    });
  }

  function assignShadowCrewId() {
    const unit=state.unit||'Engine 12';
    const phys=state.stats.physical, know=state.stats.knowledge;
    // Pick shadow based on unit assignment + weaker stat
    if (unit==='Truck 7') {
      return phys<know ? 'solano' : 'delgado';
    } else if (unit==='Squad 4') {
      return phys<know ? 'ortega' : 'kessler';
    } else if (unit==='Engine 12') {
      return phys<know ? 'tibbets' : 'whitaker';
    } else if (unit==='Ambulance 9') {
      return 'priya';
    }
    const fallbacks=state.roster.filter(r=>r.id!=='kade'&&r.id!=='whitfield');
    return (fallbacks[0]||state.roster[0]).id;
  }

  // ===== FF ROLE EXECUTION MODE =====
  function showFFRoleMode() {
    _callMode='role';
    el('call-role').classList.remove('hidden');

    const possible=FF_ROLE_ASSIGNMENTS[_callType.id]||['search_rescue'];
    const roleId=possible[Math.floor(Math.random()*possible.length)];
    const roleData=FF_ROLE_DISPLAY[roleId]||FF_ROLE_DISPLAY.search_rescue;
    _callType._ffRole=roleId; _callType._ffRoleData=roleData;

    // Determine LT name
    const ltName={Truck81:'Delgado','Truck 7':'Delgado','Engine 12':'Whitaker','Squad 4':'Kessler','Ambulance 9':'Sorensen'}[state.unit]||'the LT';

    el('role-assignment-card').innerHTML=`<div class="role-assign-header">
      <span class="role-assign-icon">${roleData.icon}</span>
      <div class="role-assign-body">
        <div class="role-assign-label">${roleData.label.toUpperCase()}</div>
        <div class="role-assign-lt">Lt. ${ltName}: ${roleData.ltOrder}</div>
      </div>
    </div>
    <div class="role-stat-hint">Key stats for this role: <strong>${roleData.statPrimary}</strong> + <strong>${roleData.statSecondary}</strong></div>`;

    const pStat=state.stats[roleData.statPrimary]||50;
    const sStat=state.stats[roleData.statSecondary]||50;
    _modeStatMod=Math.floor(((pStat+sStat)/2-50)/20);

    const choices=FF_ROLE_CHOICES[roleId]||FF_ROLE_CHOICES.search_rescue;
    const choicesEl=el('role-choices'); choicesEl.innerHTML='';
    choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice';
      const riskClass=choice.risk?'risk-high':'risk-low';
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${choice.text}</span><span class="step-choice-risk ${riskClass}">${choice.label}</span></div>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{});
        _sizeUpModifier=Math.round(choice.modifier);
        _tacticalModifier=0; _assignedCrew=[];
        const modSign=_modeStatMod>=0?'+':'';
        _callModeLabel=`Role: ${roleData.label}  |  Approach ${choice.modifier>=0?'+':''}${choice.modifier}  |  Stats ${modSign}${_modeStatMod}`;
        const sum=el('selection-summary'); sum.classList.remove('hidden');
        sum.innerHTML=`<div class="summary-entry">Role assigned: <strong>${roleData.icon} ${roleData.label}</strong></div>
          <div class="summary-entry">Your approach: <strong>${choice.label}</strong></div>`;
        renderHUD('shift-hud-stats');
        el('call-role').classList.add('hidden');
        showDiceArena({text:choice.label,modifier:choice.modifier});
      };
      choicesEl.appendChild(btn);
    });
  }

  // ===== DRIVER ENGINEER APPARATUS MODE =====
  function showDEApparatusMode() {
    _callMode='de';
    el('call-de').classList.remove('hidden');
    const isTruck=['high_rise','structure_fire','house_fire_children','building_collapse'].includes(_callType.id);
    _modeStatMod=Math.floor((state.stats.knowledge-50)/20);

    el('de-exterior-banner').innerHTML=`<div class="de-banner-inner">
      <div class="de-banner-icon">🚒</div>
      <div class="de-banner-text">
        <div class="de-banner-label">EXTERIOR OPERATIONS — YOU ARE AT THE APPARATUS</div>
        <div class="de-banner-desc">Your interior crew depends on your pump decisions. Wrong pressure = injury risk. ${isTruck?'Aerial positioning affects roof operations.':''}</div>
      </div>
    </div>`;

    el('de-step-pump').classList.remove('hidden');
    el('de-step-position').classList.add('hidden');

    const pumpEl=el('de-pump-choices'); pumpEl.innerHTML='';
    DE_PUMP_OPTIONS.forEach(opt=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice de-choice-btn';
      const riskClass='risk-'+opt.risk.toLowerCase().split(' ')[0];
      btn.innerHTML=`<div class="step-choice-main"><span class="de-choice-icon">${opt.icon}</span><span class="step-choice-text">${opt.label}</span><span class="step-choice-risk ${riskClass}">${opt.risk}</span></div>
        <div class="step-choice-desc">${opt.desc}</div>
        <div class="de-choice-note">${opt.note}</div>`;
      btn.onclick=()=>{
        _callType._dePump=opt; applyStats(opt.effect||{});
        _sizeUpModifier=opt.modifier;
        if (isTruck) {
          el('de-step-pump').classList.add('hidden');
          el('de-step-position').classList.remove('hidden');
          el('de-step-position-label').textContent='AERIAL POSITIONING';
          const posEl=el('de-position-choices'); posEl.innerHTML='';
          DE_AERIAL_OPTIONS.forEach(aopt=>{
            const abtn=document.createElement('button'); abtn.className='choice-btn step-choice de-choice-btn';
            const arisk='risk-'+aopt.risk.toLowerCase().split(' ')[0];
            abtn.innerHTML=`<div class="step-choice-main"><span class="de-choice-icon">${aopt.icon}</span><span class="step-choice-text">${aopt.label}</span><span class="step-choice-risk ${arisk}">${aopt.risk}</span></div>
              <div class="step-choice-desc">${aopt.desc}</div>`;
            abtn.onclick=()=>{
              applyStats(aopt.effect||{}); _tacticalModifier=aopt.modifier; _assignedCrew=[];
              _callModeLabel=`Pump ${opt.modifier>=0?'+':''}${opt.modifier}  |  Aerial ${aopt.modifier>=0?'+':''}${aopt.modifier}  |  Knowledge ${_modeStatMod>=0?'+':''}${_modeStatMod}`;
              const sum=el('selection-summary'); sum.classList.remove('hidden');
              sum.innerHTML=`<div class="summary-entry">Pump: <strong>${opt.icon} ${opt.label}</strong></div>
                <div class="summary-entry">Aerial: <strong>${aopt.icon} ${aopt.label}</strong></div>`;
              renderHUD('shift-hud-stats');
              el('call-de').classList.add('hidden');
              showDiceArena({text:aopt.label,modifier:aopt.modifier});
            };
            posEl.appendChild(abtn);
          });
        } else {
          _tacticalModifier=0; _assignedCrew=[];
          _callModeLabel=`Pump ${opt.modifier>=0?'+':''}${opt.modifier}  |  Knowledge ${_modeStatMod>=0?'+':''}${_modeStatMod}`;
          const sum=el('selection-summary'); sum.classList.remove('hidden');
          sum.innerHTML=`<div class="summary-entry">Pump pressure: <strong>${opt.icon} ${opt.label}</strong></div>`;
          renderHUD('shift-hud-stats');
          el('call-de').classList.add('hidden');
          showDiceArena({text:opt.label,modifier:opt.modifier});
        }
      };
      pumpEl.appendChild(btn);
    });
  }

  // ===== EMS DIAGNOSTIC MODE (paramedic) =====
  function showEMSDiagnosticMode() {
    _callMode='ems_diag';
    el('call-ems-diag').classList.remove('hidden');
    _modeStatMod=Math.floor((state.stats.knowledge-50)/20);

    const cat=EMS_DIAGNOSTIC_CATEGORY_MAP[_callType.id]||'cardiac';
    const steps=EMS_DIAGNOSTIC_STEPS[cat]||EMS_DIAGNOSTIC_STEPS.cardiac;
    const presentations={
      cardiac:'Male, 60s. Diaphoretic. Chest pressure, not pain. Brief LOC. BP 92/60, HR 110.',
      arrest:'Male, 58. Unresponsive. Bystander CPR. Witnessed collapse — cardiac mechanism.',
      trauma:'Female, 30s. Restrained driver, airbag deployed. GCS 13. Chest tenderness.',
      tox:'Worker. Eye irritation, rhinorrhea, bronchospasm. Chemical exposure, product unknown.',
      mci:'Multiple patients. One unconscious, one screaming, one walking. Scene is dynamic.',
    };
    el('ems-patient-card').innerHTML=`<div class="ems-patient-label">PATIENT PRESENTATION</div>
      <div class="ems-patient-text">${presentations[cat]||presentations.cardiac}</div>`;

    let currentStep=0, totalMod=0;
    function renderDiagStep() {
      const step=steps[currentStep];
      el('ems-diag-step-label').textContent=step.stepLabel;
      const choicesEl=el('ems-diag-choices'); choicesEl.innerHTML='';
      step.choices.forEach(choice=>{
        const btn=document.createElement('button'); btn.className='choice-btn step-choice';
        btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${choice.text}</span></div>
          <span class="step-choice-mod">${choice.label}</span>`;
        btn.onclick=()=>{
          applyStats(choice.effect||{}); totalMod+=choice.modifier; currentStep++;
          if (currentStep>=steps.length) {
            _sizeUpModifier=Math.round(totalMod/steps.length);
            _tacticalModifier=0; _assignedCrew=[];
            const qual=_sizeUpModifier>1?'Excellent':_sizeUpModifier>0?'Good':_sizeUpModifier<0?'Poor':'Adequate';
            _callModeLabel=`Clinical assessment: ${qual} (${_sizeUpModifier>=0?'+':''}${_sizeUpModifier})  |  Knowledge ${_modeStatMod>=0?'+':''}${_modeStatMod}`;
            const sum=el('selection-summary'); sum.classList.remove('hidden');
            sum.innerHTML=`<div class="summary-entry">Clinical assessment quality: <strong>${qual}</strong></div>
              <div class="summary-entry">Diagnostic modifier: <strong>${_sizeUpModifier>=0?'+':''}${_sizeUpModifier}</strong></div>`;
            renderHUD('shift-hud-stats');
            el('call-ems-diag').classList.add('hidden');
            showDiceArena({text:'Clinical Assessment',modifier:_sizeUpModifier});
          } else { renderDiagStep(); }
        };
        choicesEl.appendChild(btn);
      });
    }
    renderDiagStep();
  }

  // ===== CAPTAIN COMMAND BOARD =====
  function showCaptainCommandMode() {
    _callMode='captain';
    el('call-captain-board').classList.remove('hidden');
    _modeStatMod=Math.floor((state.stats.command-50)/20);

    el('captain-board-intro').innerHTML=`<div class="captain-board-header">
      <div class="captain-board-badge">${_callType.difficulty==='hard'?'WORKING FIRE — COMMAND':'INCIDENT COMMAND'}</div>
      <div class="captain-board-desc">You are scene commander. Your Lieutenants are awaiting sector assignments.</div>
    </div>`;

    const ltA=state.unit==='Truck 7'?state.name:'Whitaker';
    const ltB=state.unit==='Engine 12'?state.name:'Delgado';
    el('captain-company-panels').innerHTML=`
      <div class="cap-company-panel"><div class="cap-company-label">TRUCK 7</div><div class="cap-company-lt">Lt. ${ltA}</div><div class="cap-company-status cap-standby">Standing by</div></div>
      <div class="cap-company-panel"><div class="cap-company-label">ENGINE 12</div><div class="cap-company-lt">Lt. ${ltB}</div><div class="cap-company-status cap-standby">Standing by</div></div>`;

    const choicesEl=el('captain-sector-choices'); choicesEl.innerHTML='';
    CAPTAIN_SECTOR_CHOICES.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice';
      const riskClass=choice.risk?'risk-high':'risk-low';
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${choice.label}</span>${choice.risk?`<span class="step-choice-risk ${riskClass}">HIGH RISK</span>`:''}</div>
        <div class="step-choice-desc">${choice.desc}</div>
        <div class="step-choice-desc" style="color:var(--text-dim);font-size:10px;margin-top:2px">${choice.note}</div>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{}); _sizeUpModifier=choice.modifier; _tacticalModifier=0; _assignedCrew=[];
        _callModeLabel=`Deployment ${choice.modifier>=0?'+':''}${choice.modifier}  |  Command ${_modeStatMod>=0?'+':''}${_modeStatMod}`;
        const sum=el('selection-summary'); sum.classList.remove('hidden');
        sum.innerHTML=`<div class="summary-entry">Sector assignment: <strong>${choice.label}</strong></div>
          <div class="summary-entry" style="color:var(--text-dim)">${choice.note}</div>`;
        renderHUD('shift-hud-stats');
        el('call-captain-board').classList.add('hidden');
        showDiceArena({text:choice.label,modifier:choice.modifier});
      };
      choicesEl.appendChild(btn);
    });
  }

  // ===== BC STRATEGIC BOARD =====
  function showBCStrategicMode() {
    _callMode='bc';
    el('call-bc-board').classList.remove('hidden');
    _modeStatMod=Math.floor(((state.stats.command+state.stats.leadership)/2-50)/20);

    el('bc-board-intro').innerHTML=`<div class="bc-board-header">
      <div class="bc-status-badge">DISTRICT INCIDENT COMMAND</div>
      <div class="bc-status-detail">
        <div class="bc-status-line">📍 Incident: <strong>${_callType.name}</strong></div>
        <div class="bc-status-line">🚒 Companies: Engine 12, Truck 7, Squad 4</div>
        <div class="bc-status-line" id="bc-clock-line">⏱ T+0:00 — IC not established</div>
      </div>
    </div>`;

    el('bc-status-row').innerHTML='<div class="bc-status-unit">All companies staged. Awaiting your command decision.</div>';

    const choicesEl=el('bc-command-choices'); choicesEl.innerHTML='';
    BC_INCIDENT_COMMAND_CHOICES.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice';
      const riskClass=choice.risk?'risk-high':'risk-low';
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${choice.label}</span>${choice.risk?`<span class="step-choice-risk ${riskClass}">ESCALATE</span>`:''}</div>
        <div class="step-choice-desc">${choice.desc}</div>
        <div class="step-choice-desc" style="color:var(--text-dim);font-size:10px;margin-top:2px">${choice.note}</div>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{}); _sizeUpModifier=choice.modifier; _tacticalModifier=0; _assignedCrew=[];
        _callModeLabel=`IC decision ${choice.modifier>=0?'+':''}${choice.modifier}  |  Command+Leadership ${_modeStatMod>=0?'+':''}${_modeStatMod}`;
        const sum=el('selection-summary'); sum.classList.remove('hidden');
        sum.innerHTML=`<div class="summary-entry">IC decision: <strong>${choice.label}</strong></div>
          <div class="summary-entry" style="color:var(--text-dim)">${choice.note}</div>`;
        renderHUD('shift-hud-stats');
        el('call-bc-board').classList.add('hidden');
        showDiceArena({text:choice.label,modifier:choice.modifier});
      };
      choicesEl.appendChild(btn);
    });
  }

  function renderCallStatsPreview() {
    const preview=el('call-stats-preview'); preview.innerHTML=`<div class="csp-title">Key Stats</div>`;
    _callType.primaryStats.forEach((stat,i)=>{
      const row=document.createElement('div'); row.className='csp-row';
      row.innerHTML=`<span class="csp-stat-name">${_callType.statLabels[i]}</span><span class="csp-stat-val" style="color:${STAT_COLORS[stat]}">${state.stats[stat]}</span>`;
      preview.appendChild(row);
    });
    if (_callType._weatherPenalty) {
      const w=document.createElement('div'); w.className='csp-bond-bonus'; w.style.color='#ef4444';
      w.textContent=`−${_callType._weatherPenalty} Weather Penalty`; preview.appendChild(w);
    }
    if (_callType._equipPenalty) {
      const e=document.createElement('div'); e.className='csp-bond-bonus'; e.style.color='#f59e0b';
      e.textContent=`−${_callType._equipPenalty} Equipment Issue`; preview.appendChild(e);
    }
  }

  function showStep1() {
    el('call-step-1').classList.remove('hidden');
    ['call-step-2','call-step-3','dice-arena','outcome-panel'].forEach(id=>el(id).classList.add('hidden'));
    el('selection-summary').classList.add('hidden');

    const choicesEl=el('sizeup-choices'); choicesEl.innerHTML='';
    SIZE_UP_OPTIONS.forEach(opt=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice';
      const riskClass='risk-'+opt.risk.split(' ')[0].toLowerCase();
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${opt.text}</span><span class="step-choice-risk ${riskClass}">${opt.risk}</span></div>
        <span class="step-choice-mod">${opt.label}</span>
        <div class="step-choice-desc">${opt.desc}</div>`;
      btn.onclick=()=>{ _sizeUpModifier=opt.modifier; showStep2(opt); };
      choicesEl.appendChild(btn);
    });
  }

  function showStep2(sizeUpChoice) {
    el('call-step-1').classList.add('hidden');
    el('call-step-2').classList.remove('hidden');
    _assignedCrew=[];
    const confirmBtn=el('btn-confirm-crew');
    confirmBtn.disabled=true;

    const grid=el('crew-assignment-grid'); grid.innerHTML='';
    // Only your own company can be assigned to your call, plus EMS support
    // (medics cross company lines). Command staff (BC, Deputy Commissioner)
    // are never line-assignable. Membership follows each member's *current*
    // unit, so promotions/transfers (e.g. an officer moving up to Captain)
    // correctly drop them from the list.
    const assignablePool=state.roster.filter(member=>
      member.unit===state.unit || member.unit==='Ambulance 9'
    );
    assignablePool.forEach(member=>{
      const crewState=(state.crewStates||{})[member.id]||'normal';
      const stateColor=CREW_STATE_COLORS[crewState]||'#3d5080';
      const portrait=buildPortraitSVG(member.initials, stateColor, 40);
      const card=document.createElement('div'); card.className='crew-assign-card';
      card.innerHTML=`${portrait}<div class="crew-assign-name">${member.name.split(' ')[1]||member.name}</div>
        <div class="crew-assign-state state-${crewState}">${crewState}</div>
        <div class="crew-assign-bond">Bond ${member.bond}</div>`;
      if (crewState==='injured') {
        card.style.opacity='0.35'; card.style.cursor='not-allowed';
        card.title='Injured — unavailable';
      } else {
        card.onclick=()=>{
          if (card.classList.contains('selected')) {
            card.classList.remove('selected'); _assignedCrew=_assignedCrew.filter(id=>id!==member.id);
          } else if (_assignedCrew.length<2) {
            card.classList.add('selected'); _assignedCrew.push(member.id);
          }
          confirmBtn.disabled=_assignedCrew.length===0;
        };
      }
      grid.appendChild(card);
    });

    confirmBtn.onclick=()=>showStep3(sizeUpChoice);
  }

  function showStep3(sizeUpChoice) {
    el('call-step-2').classList.add('hidden');
    el('call-step-3').classList.remove('hidden');

    // Bond bonus from assigned crew
    const bondBonus=_assignedCrew.reduce((sum,id)=>{
      const m=state.roster.find(r=>r.id===id);
      return sum+(m?Math.floor(m.bond/20):0);
    },0);
    _callType._bondBonus=bondBonus;

    // Crew state modifier (+1 confident, -1 fatigued)
    const stateModifier=_assignedCrew.reduce((sum,id)=>{
      const s=(state.crewStates||{})[id]||'normal';
      return sum+(s==='confident'?1:s==='fatigued'?-1:0);
    },0);
    _callType._stateModifier=stateModifier;

    // Show selection summary
    const summary=el('selection-summary');
    summary.classList.remove('hidden');
    summary.innerHTML=`<div class="summary-entry">Size-up: <strong>${sizeUpChoice.text.split(' —')[0]}</strong></div>
      <div class="summary-entry">Crew: <strong>${_assignedCrew.map(id=>state.roster.find(r=>r.id===id)?.name.split(' ')[1]||id).join(', ')||'None'}</strong></div>
      ${bondBonus>0?`<div class="summary-entry text-success">Bond +${bondBonus}</div>`:''}
      ${stateModifier!==0?`<div class="summary-entry ${stateModifier>0?'text-success':'text-danger'}">Crew state ${stateModifier>0?'+':''}${stateModifier}</div>`:''}`;

    const tacticCat=CALL_TACTIC_MAP[_callType.id]||'admin';
    const tactics=CALL_TACTICS[tacticCat]||CALL_TACTICS.admin;

    const choicesEl=el('tactical-choices'); choicesEl.innerHTML='';
    tactics.forEach(tactic=>{
      const btn=document.createElement('button'); btn.className='choice-btn step-choice';
      const riskClass='risk-'+tactic.risk.split(' ')[0].toLowerCase();
      btn.innerHTML=`<div class="step-choice-main"><span class="step-choice-text">${tactic.text}</span><span class="step-choice-risk ${riskClass}">${tactic.risk}</span></div>
        <span class="step-choice-mod">${tactic.label}</span>`;
      btn.onclick=()=>{ _tacticalModifier=tactic.modifier; _callType._risk=(tactic.risk||'').split(' ')[0].toLowerCase(); showDiceArena(tactic); };
      choicesEl.appendChild(btn);
    });
  }

  // v2: run development stages with countdown timers before the dice roll.
  function runIncidentStages(stages, idx, tacticalChoice) {
    if (idx>=stages.length) { showDiceArena(tacticalChoice); return; }
    const stage=stages[idx];
    const secs=STAGE_TIMER_BY_DIFFICULTY[state.settings?.difficulty||'standard']||12;
    Sound.playTensionRiser();
    el('incident-stage-title').textContent=stage.title;
    el('incident-stage-victim').textContent='⚠ '+(stage.victim||'Conditions deteriorating');
    el('incident-stage-text').textContent=stage.situation;
    const noteEl=el('incident-stage-note'); noteEl.classList.add('hidden');
    const choicesEl=el('incident-stage-choices'); choicesEl.innerHTML='';
    const bar=el('incident-stage-timer');
    bar.style.transition='none'; bar.style.width='100%';
    let done=false, timeoutId=null;

    const finishStage=(choice, timedOut)=>{
      if (done) return; done=true;
      clearTimeout(timeoutId);
      _callType._stageModifier=(_callType._stageModifier||0)+(choice.mod||0);
      _callType._stageSeverity=(_callType._stageSeverity||0)+((choice.mod||0)<0?1:0)+(timedOut?1:0);
      if (choice.stress) addStress(state, choice.stress);
      choicesEl.querySelectorAll('button').forEach(b=>b.disabled=true);
      noteEl.classList.remove('hidden');
      noteEl.textContent=choice.note||choice.text;
      addToLog(`DEVELOPMENT — ${stage.title}: ${timedOut?'no decision in time':choice.text}`, (choice.mod||0)>=0?'positive':'negative');
      setTimeout(()=>{
        hideModal('modal-incident-stage');
        runIncidentStages(stages, idx+1, tacticalChoice);
      }, 1600);
    };

    stage.choices.forEach(c=>{
      const btn=document.createElement('button'); btn.className='choice-btn incident-choice';
      btn.innerHTML=`<span>${c.text}</span><span class="incident-choice-mod">${c.mod>0?'+'+c.mod:c.mod<0?c.mod:'±0'}</span>`;
      btn.onclick=()=>finishStage(c,false);
      choicesEl.appendChild(btn);
    });

    showModal('modal-incident-stage');
    requestAnimationFrame(()=>{ requestAnimationFrame(()=>{
      bar.style.transition=`width ${secs}s linear`; bar.style.width='0%';
    });});
    timeoutId=setTimeout(()=>finishStage(stage.timeoutChoice||{mod:-2,stress:2,note:'The moment passed undecided.'}, true), secs*1000);
  }

  function showDiceArena(tacticalChoice) {
    // v2: dynamic incidents — developments interrupt before the roll
    if (!_callType._stagesRun) {
      _callType._stagesRun=true;
      const stages=pickStages(_callType, state);
      if (stages.length) { runIncidentStages(stages, 0, tacticalChoice); return; }
    }
    el('call-step-3').classList.add('hidden');
    el('dice-arena').classList.remove('hidden');

    // Update summary with tactical choice
    const summary=el('selection-summary');
    const tEntry=document.createElement('div'); tEntry.className='summary-entry';
    tEntry.innerHTML=`Tactic: <strong>${tacticalChoice.text.split(' —')[0]}</strong>`;
    summary.appendChild(tEntry);

    const modParts=[];
    if (_sizeUpModifier!==0) modParts.push(`Size-up ${_sizeUpModifier>0?'+':''}${_sizeUpModifier}`);
    if (_tacticalModifier!==0) modParts.push(`Tactic ${_tacticalModifier>0?'+':''}${_tacticalModifier}`);
    if (_callType._stageModifier) modParts.push(`Command ${_callType._stageModifier>0?'+':''}${_callType._stageModifier}`);
    if (_callType._bondBonus>0) modParts.push(`Bond +${_callType._bondBonus}`);
    if (_callType._stateModifier!==0) modParts.push(`Crew ${_callType._stateModifier>0?'+':''}${_callType._stateModifier}`);
    if (_callType._weatherPenalty) modParts.push(`Weather −${_callType._weatherPenalty}`);
    if (_callType._equipPenalty) modParts.push(`Equip −${_callType._equipPenalty}`);
    // Specialist bonus visible in modifier label
    if (state.specialist) {
      const tacCat=CALL_TACTIC_MAP[_callType.id]||'admin';
      let sb=0;
      if (state.specialist==='rescue'&&(tacCat==='rescue'||tacCat==='water')) sb=2;
      if (state.specialist==='hazmat'&&(_callType.id==='hazmat'||_callType.id==='gas_leak')) sb=2;
      if (state.specialist==='aerial'&&(tacCat==='fire'||_callType.id==='high_rise')) sb=1;
      if (sb>0) modParts.push(`Specialist +${sb}`);
    }
    el('dice-modifier-label').textContent=_callModeLabel||modParts.join('  |  ');

    const die1=el('die1'), die2=el('die2');
    die1.textContent='?'; die2.textContent='?';
    die1.classList.remove('rolling','landed'); die2.classList.remove('rolling','landed');
    el('btn-roll').disabled=false;
    el('btn-roll').onclick=rollDice;
  }

  function rollDice() {
    el('btn-roll').disabled=true; Sound.playTensionRiser();
    const die1=el('die1'), die2=el('die2');
    die1.classList.add('rolling'); die2.classList.add('rolling');
    let count=0;
    const iv=setInterval(()=>{
      die1.textContent=Math.ceil(Math.random()*6); die2.textContent=Math.ceil(Math.random()*6);
      if (++count>20) {
        clearInterval(iv);
        const d1=Math.ceil(Math.random()*6), d2=Math.ceil(Math.random()*6);
        die1.textContent=d1; die2.textContent=d2;
        die1.classList.remove('rolling'); die1.classList.add('landed');
        die2.classList.remove('rolling'); die2.classList.add('landed');
        resolveCall(d1+d2);
      }
    },85);
  }

  function resolveCall(roll) {
    const callType=_callType;
    // Use mode-specific stat mod when set, otherwise standard calculation
    const statMod=_modeStatMod!==null?_modeStatMod:
      Math.floor((callType.primaryStats.reduce((s,k)=>s+state.stats[k],0)/callType.primaryStats.length-50)/20);
    // Specialist bonus
    let specialistBonus=0;
    if (state.specialist) {
      const tacCat=CALL_TACTIC_MAP[callType.id]||'admin';
      if (state.specialist==='rescue'&&(tacCat==='rescue'||tacCat==='water')) specialistBonus=2;
      if (state.specialist==='hazmat'&&(callType.id==='hazmat'||callType.id==='gas_leak')) specialistBonus=2;
      if (state.specialist==='aerial'&&(tacCat==='fire'||callType.id==='high_rise')) specialistBonus=1;
    }
    // v2: Kessler arc perk — squad-style instincts on rescue work
    if (state.perk_rescue_insight) {
      const tacCat=CALL_TACTIC_MAP[callType.id]||'admin';
      if (tacCat==='rescue'||tacCat==='water') specialistBonus+=1;
    }
    const totalMod=statMod+_sizeUpModifier+_tacticalModifier+(_callType._bondBonus||0)+(_callType._stateModifier||0)
                   -(_callType._weatherPenalty||0)-(_callType._equipPenalty||0)+specialistBonus
                   +(_callType._stageModifier||0);
    const effective=Math.max(2,Math.min(12,roll+totalMod));
    const thresh=getOutcomeThresholds(callType.difficulty||'medium');
    let outcome, outcomeKey;
    if (effective>=thresh.crit)    { outcome=callType.outcomes.critSuccess; outcomeKey='critSuccess'; }
    else if (effective>=thresh.success) { outcome=callType.outcomes.success; outcomeKey='success'; }
    else if (effective>=thresh.partial) { outcome=callType.outcomes.partial; outcomeKey='partial'; }
    else                               { outcome=callType.outcomes.failure; outcomeKey='failure'; }

    state.totalCalls=(state.totalCalls||0)+1;
    el('hud-calls-count')&&(el('hud-calls-count').textContent=state.totalCalls);

    // Probie score tracking
    if (getRankId()==='probie') {
      const probieCallDelta={critSuccess:25,success:15,partial:5,failure:-10}[outcomeKey]||0;
      state.probieScore=Math.max(0,Math.min(100,(state.probieScore||0)+probieCallDelta));
      renderProbieStandingBar();
    }

    // Consequence tracking
    const whitfieldDeltas={critSuccess:8,success:3,partial:0,failure:-5};
    changeWhitfieldTrust(whitfieldDeltas[outcomeKey]||0);
    if (outcomeKey==='failure') { state.consecutiveFailures=(state.consecutiveFailures||0)+1; state.lastCallOutcome='failure'; }
    else { state.consecutiveFailures=0; state.lastCallOutcome=outcomeKey; }
    if (!state.shiftCallOutcomes) state.shiftCallOutcomes=[];
    state.shiftCallOutcomes.push({callName:callType.name,outcomeKey,label:outcome.label});

    // v2: career record (read by the oral board and the career history screen)
    if (!state.record) state.record={saves:0,critSuccesses:0,failures:0,mistakes:[],commendations:[]};
    if (outcomeKey==='critSuccess') {
      state.record.critSuccesses++;
      state.record.saves++;
      recordHistory(state,'call',`${callType.name} — ${outcome.label}`);
    } else if (outcomeKey==='failure') {
      state.record.failures++;
      state.record.mistakes.push({shift:state.shiftNumber,call:callType.name,note:outcome.text.split('.')[0]+'.'});
      if (state.record.mistakes.length>5) state.record.mistakes.shift();
      recordHistory(state,'call',`${callType.name} — ${outcome.label}`);
    }

    // v2: persistent consequences — stress, injury, discipline, LODD
    addStress(state, {critSuccess:-3,success:-1,partial:4,failure:8}[outcomeKey]||0);
    if ((outcomeKey==='failure'||outcomeKey==='partial') && !state.condition.injury) {
      const severity=Math.min(1, 0.3+((_callType._stageSeverity||0)*0.25)+(outcomeKey==='failure'?0.25:0));
      const injury=rollInjury(state, severity);
      if (injury) {
        state.condition.injury=injury;
        applyStats(injury.penalty);
        recordHistory(state,'condition',`Injured at the ${callType.name}: ${injury.name} (${injury.shiftsLeft} shift${injury.shiftsLeft===1?'':'s'}).`);
        setTimeout(()=>addFeedEntry(`🩹 You didn't walk away clean — <strong>${injury.name}</strong>. Limited duty for ${injury.shiftsLeft} shift${injury.shiftsLeft===1?'':'s'}.`,'consequence'),900);
      }
    }
    if (outcomeKey==='failure' && (_callType._risk==='high'||_callType._risk==='very')) {
      state.discipline.points=(state.discipline.points||0)+2;
      if (state.discipline.points>=6) setTimeout(()=>addFeedEntry('⚖️ Word from HQ: your fireground decisions are getting formal attention.','consequence'),1100);
    }
    if (outcomeKey==='failure' && (_callType._stageSeverity||0)>=2 && Math.random()<0.06) {
      triggerLODD();
    }

    // Update crew states
    updateCrewStatesAfterCall(outcomeKey);

    setTimeout(()=>{
      el('dice-arena').classList.add('hidden');
      const panel=el('outcome-panel'); panel.classList.remove('hidden');
      const classMap={critSuccess:'critical-success',success:'success',partial:'partial',failure:'failure'};
      el('outcome-label').textContent=outcome.label;
      el('outcome-label').className=`outcome-label ${classMap[outcomeKey]}`;
      el('outcome-desc').textContent=outcome.text;
      const deltas=applyStats(outcome.stats);
      renderHUD('shift-hud-stats');
      el('outcome-stats').innerHTML=formatDeltas(deltas);

      // Shadow mode: post-call feedback from shadowed member
      if (_callMode==='shadow' && callType._shadowedMember) {
        const member=callType._shadowedMember;
        const choice=callType._shadowChoice||{};
        const feedbackLines=SHADOW_FEEDBACK_POOL[outcomeKey]||SHADOW_FEEDBACK_POOL.partial;
        const line=feedbackLines[Math.floor(Math.random()*feedbackLines.length)];
        const feedDiv=document.createElement('div'); feedDiv.className='shadow-post-feedback';
        feedDiv.innerHTML=`<div class="shadow-feedback-speaker">${member.name}:</div>
          <div class="shadow-feedback-text">"${line}"</div>`;
        el('outcome-stats').after(feedDiv);
        // Probie score + bond update
        const probieGain=({critSuccess:choice.probieBonus||10,success:(choice.probieBonus||10)*0.7,partial:(choice.probieBonus||10)*0.4,failure:3})[outcomeKey]||3;
        state.probieScore=Math.min(100,(state.probieScore||0)+Math.round(probieGain));
        if (outcomeKey==='critSuccess'||outcomeKey==='success') {
          member.bond=Math.min(100,member.bond+(choice.bondDelta||3));
        } else if (outcomeKey==='failure') {
          member.bond=Math.max(0,member.bond-2);
        }
        renderProbieStandingBar();
      }

      // FF role mode: LT feedback
      if (_callMode==='role' && callType._ffRoleData) {
        const ltName={Truck81:'Delgado','Truck 7':'Delgado','Engine 12':'Whitaker','Squad 4':'Kessler','Ambulance 9':'Sorensen'}[state.unit]||'the LT';
        const ltLines={critSuccess:`"That's exactly how I needed that role executed."`,
          success:`"Good execution on your role. Keep it up."`,
          partial:`"You got the job done. We'll talk about the hesitation in debrief."`,
          failure:`"That role needed more from you. Come find me after the rig's cleaned."`};
        const ltDiv=document.createElement('div'); ltDiv.className='shadow-post-feedback';
        ltDiv.innerHTML=`<div class="shadow-feedback-speaker">Lt. ${ltName}:</div>
          <div class="shadow-feedback-text">${ltLines[outcomeKey]||ltLines.partial}</div>`;
        el('outcome-stats').after(ltDiv);
      }

      addToLog(`CALL — ${callType.name}: ${outcome.label}`,outcomeKey==='failure'?'negative':'positive');
      adjustBondAfterCall(callType,outcomeKey);
      if (outcomeKey==='critSuccess'||outcomeKey==='success') Sound.playSuccessSting();
      else if (outcomeKey==='failure') Sound.playFailureSting();
      saveGame(); checkPromotionEligibility(); checkWhitfieldTrustEvents();
      if (state.consecutiveFailures>=3) setTimeout(()=>showPerformanceReview(),1200);
    },500);

    el('btn-return-to-shift').onclick=()=>{
      const returnFn=()=>{
        Sound.stopAmbientHum();
        showFirehouseScreen(); Sound.startAmbientHum();
        addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Returned from ${callType.name}.`,'call');
        maybeBanter('dispatch', callType);
      };
      if (state.track==='ems') {
        showSorensenDebrief(outcomeKey, callType.name, returnFn);
      } else {
        returnFn();
      }
    };
  }

  function updateCrewStatesAfterCall(outcomeKey) {
    if (!state.crewStates) state.crewStates={};
    _assignedCrew.forEach(id=>{
      if (outcomeKey==='critSuccess') {
        state.crewStates[id]='confident';
      } else if (outcomeKey==='failure') {
        // Critical failure: 25% chance injury
        if (Math.random()<0.25) state.crewStates[id]='injured';
        else state.crewStates[id]='conflicted';
      }
    });
    // Heal injured members after 1-2 shifts (tracked via a simple flag per member)
    state.roster.forEach(m=>{
      if ((state.crewStates[m.id]==='injured') && !_assignedCrew.includes(m.id)) {
        if (!m._injuredShifts) m._injuredShifts=0;
        m._injuredShifts++;
        if (m._injuredShifts>=2) { state.crewStates[m.id]='normal'; m._injuredShifts=0; }
      }
    });
  }

  function checkFatigue() {
    if (!state.crewStates) state.crewStates={};
    state.shiftsWithoutMeal=(state.shiftsWithoutMeal||0)+1;
    if (state.shiftsWithoutMeal>=3) {
      state.roster.forEach(m=>{
        if ((state.crewStates[m.id]||'normal')==='normal') state.crewStates[m.id]='fatigued';
      });
    }
  }

  function adjustBondAfterCall(callType, outcomeKey) {
    const delta={critSuccess:4,success:2,partial:0,failure:-2}[outcomeKey]||0;
    if (delta===0) return;
    const unitCrewMap={'Truck 7':'delgado','Squad 4':'kessler','Engine 12':'whitaker','Ambulance 9':'priya'};
    const primaryCrewId=unitCrewMap[state.unit];
    if (primaryCrewId) {
      const m=state.roster.find(r=>r.id===primaryCrewId);
      if (m) m.bond=Math.max(0,Math.min(100,m.bond+delta));
    }
    _assignedCrew.forEach(id=>{
      const m=state.roster.find(r=>r.id===id);
      if (m) m.bond=Math.max(0,Math.min(100,m.bond+Math.floor(delta/2)));
    });
  }

  function checkWhitfieldTrustEvents() {
    const bt=state.whitfieldTrust||50;
    if (bt<30&&!state._perfReviewPending&&state.consecutiveFailures<3) {
      state._perfReviewPending=true;
      setTimeout(()=>showPerformanceReview(),1500);
    } else if (bt>=80&&!state._commendationShown) {
      state._commendationShown=true;
      addFeedEntry('★ Chief Kade commends your leadership. High CO Trust achieved.','consequence');
    }
  }

  // ===== ROSTER =====
  function showRoster() {
    const grid=el('roster-grid'); grid.innerHTML='';
    state.roster.forEach(m=>{
      const crewState=(state.crewStates||{})[m.id]||'normal';
      const stateColor=CREW_STATE_COLORS[crewState]||'#3d5080';
      const portrait=buildPortraitSVG(m.initials||m.name.split(' ').map(n=>n[0]).join(''), stateColor, 48);
      const card=document.createElement('div'); card.className='roster-card';
      const stateBadgeColor={normal:'#3d5080',fatigued:'#f59e0b',injured:'#ef4444',conflicted:'#a855f7',confident:'#22c55e'}[crewState]||'#3d5080';
      card.innerHTML=`<div class="roster-avatar-svg">${portrait}</div>
        <div class="roster-info">
          <div class="roster-name">${m.name}<span class="roster-state-badge" style="background:${stateBadgeColor}22;color:${stateBadgeColor};border:1px solid ${stateBadgeColor}44">${crewState}</span></div>
          <div class="roster-role">${m.role}</div>
          <div class="roster-unit">${m.unit}</div>
          <div class="roster-bond"><div class="bond-label">Bond: <span>${m.bond}</span>/100</div>
            <div class="bond-bar-wrap"><div class="bond-bar" style="width:${m.bond}%"></div></div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    showModal('modal-roster');
  }

  // ===== LOG =====
  function showLog() {
    const content=el('log-content'); content.innerHTML='';
    (state.shiftLog||[]).forEach(e=>{
      const div=document.createElement('div'); div.className=`log-entry ${e.type||'neutral'}`; div.innerHTML=e.text; content.appendChild(div);
    });
    showModal('modal-log');
  }

  // ===== SHIFT SUMMARY =====
  function showShiftSummary() {
    Sound.stopAmbientHum();
    const outcomes=state.shiftCallOutcomes||[];
    let score=0;
    outcomes.forEach(o=>{
      if (o.outcomeKey==='critSuccess') score+=30;
      else if (o.outcomeKey==='success') score+=20;
      else if (o.outcomeKey==='partial') score+=8;
      else score-=10;
    });
    const statTotal=Object.values(state.statDeltas||{}).reduce((s,v)=>s+v,0);
    score+=Math.max(0,statTotal);
    let grade, gradeLabel;
    if (score>=80)      { grade='S'; gradeLabel='Outstanding'; }
    else if (score>=55) { grade='A'; gradeLabel='Excellent'; }
    else if (score>=35) { grade='B'; gradeLabel='Good'; }
    else if (score>=15) { grade='C'; gradeLabel='Average'; }
    else                { grade='D'; gradeLabel='Below Standard'; }

    el('summary-shift-num').textContent=state.shiftNumber;
    const gradeBadge=el('summary-grade');
    gradeBadge.textContent=grade; gradeBadge.className=`summary-grade-badge grade-${grade}`;
    el('summary-grade-label').textContent=gradeLabel;

    const deltas=state.statDeltas||{};
    const statOrder=['physical','knowledge','morale','reputation','leadership','command'];
    const statChangesEl=el('summary-stat-changes'); statChangesEl.innerHTML='';
    statOrder.forEach(k=>{
      const d=deltas[k]||0;
      const row=document.createElement('div'); row.className='summary-stat-row';
      const cls=d>0?'summary-delta-pos':d<0?'summary-delta-neg':'summary-delta-zero';
      row.innerHTML=`<span class="sname">${k.charAt(0).toUpperCase()+k.slice(1)}</span><span class="${cls}">${d>0?'+':''}${d||'—'}</span>`;
      statChangesEl.appendChild(row);
    });

    const curEl=el('summary-current-stats'); curEl.innerHTML='';
    statOrder.forEach(k=>{
      const row=document.createElement('div'); row.className='summary-stat-row';
      row.innerHTML=`<span class="sname">${k.charAt(0).toUpperCase()+k.slice(1)}</span><span style="color:${STAT_COLORS[k]};font-weight:700">${state.stats[k]}</span>`;
      curEl.appendChild(row);
    });

    const hlEl=el('summary-highlights'); hlEl.innerHTML='';
    if (outcomes.length===0) {
      hlEl.innerHTML='<div class="highlight-box">No calls this shift.</div>';
    } else {
      const best=outcomes.reduce((b,o)=>{
        const rank={critSuccess:3,success:2,partial:1,failure:0};
        return (rank[o.outcomeKey]||0)>(rank[b.outcomeKey]||0)?o:b;
      });
      hlEl.innerHTML=`<div class="highlight-box">Best call: <strong>${best.callName}</strong> — ${best.label}</div>`;
      if (state.consecutiveFailures>=2) {
        const warn=document.createElement('div'); warn.className='highlight-box'; warn.style.borderLeftColor='var(--danger)';
        warn.textContent=`⚠ ${state.consecutiveFailures} back-to-back hard calls. Consider drilling.`;
        hlEl.appendChild(warn);
      }
      const whitfieldStatus=state.whitfieldTrust<30?'⚠ CO Trust critical — Kade is watching.':state.whitfieldTrust>80?'★ CO Trust high — Kade confident in you.':'';
      if (whitfieldStatus) { const b=document.createElement('div'); b.className='highlight-box'; b.textContent=whitfieldStatus; hlEl.appendChild(b); }
    }

    const reactions=SHIFT_GRADE_REACTIONS[grade]||SHIFT_GRADE_REACTIONS.C;
    el('crew-reaction-bubble').textContent=reactions[Math.floor(Math.random()*reactions.length)];

    // Probie weekly review (every 3 shifts)
    if (getRankId()==='probie' && state.shiftNumber>0 && state.shiftNumber%3===0) {
      const pScore=state.probieScore||0;
      const pass=pScore>=50;
      const pReviewBox=document.getElementById('summary-highlights');
      if (pReviewBox) {
        const prDiv=document.createElement('div'); prDiv.className='probie-review-panel';
        const pGrade=pass?'PASS':'FAIL';
        prDiv.innerHTML=`<div class="probie-review-label">⭐ WEEKLY PROBIE REVIEW — Week ${state.probieWeek||1}</div>
          <div class="probie-review-grade ${pass?'probie-review-pass':'probie-review-fail'}">${pGrade}</div>
          <div class="probie-review-text">${pass?'"You\'re meeting the standard. Keep it up." — Chief Kade':'⚠ Below standard this week. Two consecutive failures triggers a Kade meeting.'}</div>`;
        pReviewBox.appendChild(prDiv);
        state.probieWeek=(state.probieWeek||1)+1;
        state.probieScore=0; // reset for next week
        if (!pass) {
          state.probieReviewCount=(state.probieReviewCount||0)+1;
          changeWhitfieldTrust(-8);
          if (state.probieReviewCount>=2) {
            setTimeout(()=>{
              addFeedEntry('⚠ Chief Kade requests a meeting. Two consecutive failed probie reviews.','consequence');
              changeWhitfieldTrust(-10);
            },1500);
          }
        } else {
          state.probieReviewCount=0;
          changeWhitfieldTrust(5);
        }
      }
    }

    showScreen('screen-summary');
    el('btn-to-offduty').onclick=goToOffDuty;
  }

  // ===== OFF-DUTY =====
  function goToOffDuty() {
    el('offduty-shift-num').textContent=state.shiftNumber;
    const statsEl=el('offduty-stats'); statsEl.innerHTML='';
    const statOrder=['physical','knowledge','morale','reputation','leadership','command'];
    statOrder.forEach(k=>{
      const div=document.createElement('div'); div.className='od-stat';
      div.innerHTML=`<span class="od-stat-name">${k.slice(0,4).toUpperCase()}</span><span class="od-stat-val" style="color:${STAT_COLORS[k]}">${state.stats[k]}</span>`;
      statsEl.appendChild(div);
    });
    document.querySelectorAll('.location-card').forEach(card=>{
      card.onclick=()=>handleOffDutyChoice(card.dataset.loc);
    });
    showScreen('screen-offduty');
  }

  function handleOffDutyChoice(loc) {
    let effects={}, bondTargetId=null;
    if (loc==='firebell') {
      effects={morale:state.perk_firebell_family?14:10};
      addStress(state, state.perk_firebell_family?-14:-10);
      const idx=Math.floor(Math.random()*state.roster.length);
      bondTargetId=state.roster[idx].id;
      state.roster[idx].bond=Math.min(100,state.roster[idx].bond+5);
      if (Math.random()<0.4) { applyStats(effects); saveGame(); showFirebellEvent(); return; }
    } else if (loc==='home') {
      effects={morale:15,physical:5};
      addStress(state,-12);
    } else if (loc==='training') {
      effects={physical:10,knowledge:5,morale:-5};
      addStress(state,-2);
    }
    applyStats(effects); saveGame();
    if (Math.random()<0.4) pickAndShowCrewEvent(()=>proceedToNextShift());
    else proceedToNextShift();
  }

  function showFirebellEvent() {
    const event=FIREBELL_EVENTS[Math.floor(Math.random()*FIREBELL_EVENTS.length)];
    if (event.crewId===null) state.roster.forEach(m=>{m.bond=Math.min(100,m.bond+(event.bondDelta||6));});
    else { const member=state.roster.find(r=>r.id===event.crewId); if(member) member.bond=Math.min(100,member.bond+(event.bondDelta||6)); }
    applyStats(event.effect||{});
    const portraitArea=el('crew-event-portrait-area');
    portraitArea.innerHTML=event.portrait?buildPortraitSVG(event.portrait,event.border||'#ef4444',90):'<span style="font-size:32px">🍺</span>';
    el('crew-event-title').textContent=event.title;
    el('crew-event-desc').textContent=event.desc;
    el('crew-event-speech').textContent=event.dialogue;
    const choices=el('crew-event-choices'); choices.innerHTML='';
    const btn=document.createElement('button'); btn.className='menu-btn primary';
    btn.textContent='That\'s a good night.';
    btn.onclick=()=>{hideModal('modal-crew-event'); setTimeout(()=>pickAndShowCrewEvent(()=>proceedToNextShift()),200);};
    choices.appendChild(btn); saveGame(); showModal('modal-crew-event');
  }

  function pickAndShowCrewEvent(callback) {
    // v2: story arcs take priority when a stage is unlocked
    if (maybeShowArcEvent(callback)) return;
    const memberIds=['kade','kessler','delgado','whitaker','ortega','priya','tibbets','lindqvist','solano','whitfield','brennan'];
    const memberId=memberIds[Math.floor(Math.random()*memberIds.length)];
    const events=CREW_EVENTS[memberId];
    if (!events||events.length===0) { callback(); return; }
    showCrewEvent(events[Math.floor(Math.random()*events.length)], callback);
  }

  // ===== v2: CHARACTER STORY ARCS =====
  function maybeShowArcEvent(callback) {
    if (!state.arcs) state.arcs={};
    const eligible=[];
    for (const [charId, arc] of Object.entries(CHARACTER_ARCS)) {
      const member=state.roster.find(m=>m.id===charId);
      if (!member) continue;                          // character left the house
      const prog=state.arcs[charId]||{stage:0,done:false};
      if (prog.done||prog.stage>=arc.stages.length) continue;
      const stage=arc.stages[prog.stage];
      if ((member.bond||0)>=stage.minBond) eligible.push({charId,arc,stage,prog,member});
    }
    if (!eligible.length) return false;
    if (Math.random()>0.55) return false;             // arcs surface often, not always
    const pick=eligible[Math.floor(Math.random()*eligible.length)];
    showArcEvent(pick, callback);
    return true;
  }

  function showArcEvent({charId, arc, stage, prog, member}, callback) {
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent=`STORY — ${arc.title.toUpperCase()}`;
    const portraitArea=el('crew-event-portrait-area');
    // borrow the character's portrait from their crew events, if one exists
    const src=(CREW_EVENTS[charId]||[]).find(e=>e.portrait);
    portraitArea.innerHTML=src?buildPortraitSVG(src.portrait,arc.border,90):'<span style="font-size:32px">🔥</span>';
    el('crew-event-title').textContent=`${arc.title} — ${stage.title}`;
    el('crew-event-desc').textContent=stage.desc;
    el('crew-event-speech').textContent=stage.dialogue;
    const choices=el('crew-event-choices'); choices.innerHTML='';
    stage.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${choice.text}</span><span class="choice-effect">${choice.effectLabel||''}</span>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{});
        if (choice.stress) addStress(state, choice.stress);
        member.bond=Math.max(0,Math.min(100,(member.bond||0)+(choice.bondDelta||0)));
        if (choice.houseMorale) state.roster.forEach(m=>{m.bond=Math.min(100,(m.bond||0)+3);});
        if (choice.commendation) {
          if (!state.record) state.record={saves:0,critSuccesses:0,failures:0,mistakes:[],commendations:[]};
          state.record.commendations.push(choice.commendation);
        }
        if (choice.advance) {
          prog.stage=(prog.stage||0)+1;
          recordHistory(state,'arc',`${arc.title}: ${stage.title} — ${choice.text}`);
          if (prog.stage>=arc.stages.length) {
            prog.done=true;
            const perk=ARC_COMPLETION_PERKS[charId];
            if (perk) {
              state[`perk_${perk.perk}`]=true;
              recordHistory(state,'arc',`ARC COMPLETE — ${arc.title}. ${perk.text}`);
              setTimeout(()=>addFeedEntry(`⭐ Story complete: <strong>${arc.title}</strong> — ${perk.text}`,'consequence'),300);
            }
          }
        } else {
          recordHistory(state,'arc',`${arc.title}: ${stage.title} — declined (${choice.text})`);
        }
        state.arcs[charId]=prog;
        hideModal('modal-crew-event'); saveGame(); setTimeout(callback,200);
      };
      choices.appendChild(btn);
    });
    showModal('modal-crew-event');
  }

  function showCrewEvent(event, callback) {
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent='CREW EVENT';
    const portraitArea=el('crew-event-portrait-area');
    portraitArea.innerHTML=buildPortraitSVG(event.portrait,event.border||'#ef4444',90);
    el('crew-event-title').textContent=event.title;
    el('crew-event-desc').textContent=event.desc;
    el('crew-event-speech').textContent=event.dialogue;
    const choices=el('crew-event-choices'); choices.innerHTML='';
    event.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${choice.text}</span><span class="choice-effect">${formatEffectLabel(choice.effectLabel)}</span>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{});
        const memberEntry=Object.entries(CREW_EVENTS).find(([,evts])=>evts.some(e=>e.id===event.id));
        if (memberEntry) {
          const m=state.roster.find(r=>r.id===memberEntry[0]);
          if (m) m.bond=Math.min(100,m.bond+(choice.bondDelta||5));
          // Resolve conflicted state on positive crew event
          if ((state.crewStates||{})[memberEntry[0]]==='conflicted') state.crewStates[memberEntry[0]]='normal';
        }
        hideModal('modal-crew-event'); saveGame(); setTimeout(callback,200);
      };
      choices.appendChild(btn);
    });
    showModal('modal-crew-event');
  }

  function proceedToNextShift() {
    state.shiftNumber++; state.shiftLog=[]; state.statDeltas={}; state.shiftCallOutcomes=[];
    state._perfReviewPending=false;
    // v2: healing + natural stress decay between shifts
    if (state.condition?.injury) {
      state.condition.injury.shiftsLeft--;
      if (state.condition.injury.shiftsLeft<=0) {
        recordHistory(state,'condition',`Cleared for full duty — ${state.condition.injury.name} healed.`);
        state.condition.injury=null;
      }
    }
    addStress(state,-3);
    saveGame(); startShift();
  }

  // ===== PERFORMANCE REVIEW =====
  function showPerformanceReview() {
    if (!state) return;
    const rev=CONSEQUENCE_EVENTS.performanceReview;
    const content=el('performance-review-content'); content.innerHTML='';
    const loreDiv=document.createElement('div'); loreDiv.className='lore-box';
    loreDiv.innerHTML=`<p>${rev.dialogue}</p><cite>— Chief Kade</cite>`;
    content.appendChild(loreDiv);
    const choicesEl=el('performance-review-choices'); choicesEl.innerHTML='';
    rev.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${choice.text}</span><span class="choice-effect">${formatEffectLabel(choice.effectLabel)}</span>`;
      btn.onclick=()=>{
        applyStats(choice.effect||{});
        state.consecutiveFailures=0; state._perfReviewPending=false;
        changeWhitfieldTrust(5);
        hideModal('modal-performance-review');
        renderHUD('shift-hud-stats'); saveGame();
      };
      choicesEl.appendChild(btn);
    });
    showModal('modal-performance-review');
  }

  // ===== UNIT TRANSFER =====
  function showUnitTransfer() {
    document.querySelectorAll('.unit-card').forEach(c=>{
      c.classList.toggle('selected',c.dataset.unit===state.unit);
      c.onclick=()=>{
        document.querySelectorAll('.unit-card').forEach(x=>x.classList.remove('selected'));
        c.classList.add('selected');
        state.unit=c.dataset.unit;
        const unitBadge=el('shift-unit-badge');
        if (unitBadge) unitBadge.textContent=state.unit;
        hideModal('modal-unit-transfer'); saveGame();
      };
    });
    el('btn-stay-unit').onclick=()=>hideModal('modal-unit-transfer');
    showModal('modal-unit-transfer');
  }

  // ===== PROMOTION =====
  function checkPromotionEligibility() {
    const ranks=getRanks();
    const nextIdx=state.rankIndex+1;
    if (nextIdx>=ranks.length) return;
    const nextRank=ranks[nextIdx];
    if (!nextRank.thresholds) return;
    const allStats=Object.entries(nextRank.thresholds).every(([stat,thresh])=>state.stats[stat]>=thresh);
    const callsOk=(state.totalCalls||0)>=(nextRank.callsRequired||0);
    if (!allStats||!callsOk) return;

    // EMS + early suppression: auto-promote
    const autoRanks=['probie','firefighter','paramedic'];
    if (autoRanks.includes(nextRank.id)) {
      state.rankIndex=nextIdx; saveGame();
      if (nextRank.id==='firefighter'&&!state.specialistChosen) {
        setTimeout(()=>showSpecialistTraining(),1200);
      } else {
        const promoData=PROMOTION_DATA[nextRank.id];
        if (!promoData) return;
        setTimeout(()=>{
          el('promotion-content').innerHTML=`<div class="promo-rank">${promoData.title}</div><p class="promo-desc">${promoData.desc}</p><p class="promo-desc" style="font-style:italic;font-size:12px;color:var(--text-dim)">${promoData.unit}</p>`;
          el('shift-rank').textContent=nextRank.label;
          showModal('modal-promotion');
        },800);
      }
      return;
    }

    // All ranks from DE upward: require civil service exam
    if (state.examEligible||state.examResult==='pass') return;
    if ((state.examCooldown||0)>0) return;
    state.examEligible=true; state.examTargetRank=nextRank.id;
    state.examReadiness=state.examReadiness||0;
    saveGame();
    setTimeout(()=>showExamEligibleNotification(nextRank),1000);
  }

  function doFinalPromotion(nextRankId, company, story) {
    recordHistory(state,'promotion',`Promoted to ${nextRankId.replace(/_/g,' ')} — ${company||state.unit||'Firehouse 12'}.`);
    const ranks=getRanks();
    const nextRank=ranks.find(r=>r.id===nextRankId);
    if (!nextRank) return;
    state.rankIndex=ranks.indexOf(nextRank);
    if (company) { state.unit=company; state.officerCompany=company; }
    applyOfficerDeparture(story);
    state.examEligible=false; state.examTargetRank=null;
    state.examReadiness=0; state.examResult=null;
    state.eligibilityRank=null; state.vacancyCountdown=null;
    saveGame();
    if (el('shift-rank')) el('shift-rank').textContent=nextRank.label;
    const unitBadge=el('shift-unit-badge');
    if (unitBadge) unitBadge.textContent=state.unit||'';
    renderRankSpecificRooms();
    renderHUD('shift-hud-stats');
  }

  // ===== PROBIE TASKS MODAL =====
  function showProbieTasksModal(callback) {
    const tasks = [...PROBIE_TASKS].sort(()=>Math.random()-0.5).slice(0,3);
    const completed = new Set();
    const list = el('probie-tasks-list'); list.innerHTML='';
    el('probie-task-week').textContent = state.probieWeek||1;

    tasks.forEach(task=>{
      const item=document.createElement('div'); item.className='probie-task-item';
      item.innerHTML=`<span class="probie-task-icon">${task.icon}</span>
        <span class="probie-task-text">${task.text}</span>
        <span class="probie-task-check">✓</span>`;
      item.onclick=()=>{
        if (completed.has(task.id)) return;
        completed.add(task.id); item.classList.add('completed');
        applyStats({[task.stat]:task.delta});
        const ps = Math.min(100,(state.probieScore||0)+15);
        state.probieScore=ps;
        renderProbieStandingBar();
        saveGame();
      };
      list.appendChild(item);
    });

    el('btn-complete-probie-tasks').onclick=()=>{
      hideModal('modal-probie-tasks');
      callback();
    };
    el('btn-skip-probie-tasks').onclick=()=>{
      changeWhitfieldTrust(-5);
      state.roster.forEach(m=>{m.bond=Math.max(0,m.bond-3);});
      applyStats({reputation:-3});
      addToLog('Probie tasks skipped — crew bond and CO trust took a hit.','negative');
      hideModal('modal-probie-tasks');
      callback();
    };
    showModal('modal-probie-tasks');
  }

  // ===== SPECIALIST TRAINING MODAL =====
  function showSpecialistTraining() {
    let selected = null;
    const cards = el('specialist-cards'); cards.innerHTML='';
    SPECIALIST_TRAINING_OPTIONS.forEach(opt=>{
      const card=document.createElement('div'); card.className='specialist-card';
      card.innerHTML=`<div class="specialist-card-icon">${opt.icon}</div>
        <div class="specialist-card-body">
          <div class="specialist-card-label">${opt.label}</div>
          <div class="specialist-card-desc">${opt.desc}</div>
          <div class="specialist-card-bonus">${opt.details}</div>
        </div>`;
      card.onclick=()=>{
        document.querySelectorAll('.specialist-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected'); selected=opt;
        el('btn-confirm-specialist').disabled=false;
      };
      cards.appendChild(card);
    });
    el('btn-confirm-specialist').disabled=true;
    el('btn-confirm-specialist').onclick=()=>{
      if (!selected) return;
      state.specialist=selected.id;
      state.specialistChosen=true;
      applyStats(selected.statBonus);
      renderHUD('shift-hud-stats');
      addToLog(`Specialist path: ${selected.label}. ${selected.details}`,'positive');
      if (selected.unlockDE) {
        addToLog('Aerial Operations path: Driver Engineer exam unlocked early.','positive');
      }
      saveGame();
      hideModal('modal-specialist');
      const promoData=PROMOTION_DATA['firefighter'];
      el('promotion-content').innerHTML=`<div class="promo-rank">${promoData.title}</div><p class="promo-desc">${promoData.desc}</p><p class="promo-desc" style="font-style:italic;font-size:12px;color:var(--text-dim)">${promoData.unit}</p>`;
      el('shift-rank').textContent='Firefighter';
      showModal('modal-promotion');
    };
    showModal('modal-specialist');
  }

  // ===== DE APPARATUS CHECK =====
  function showApparatusCheck(callback) {
    const items = APPARATUS_CHECK_ITEMS;
    const faults = [];
    const list = el('apparatus-list'); list.innerHTML='';
    const faultsEl = el('apparatus-faults'); faultsEl.innerHTML='';
    let checkIdx=0;

    items.forEach(item=>{
      const div=document.createElement('div'); div.className='apparatus-item'; div.id='app-item-'+item.id;
      div.innerHTML=`<span class="apparatus-icon">${item.icon}</span>
        <div style="flex:1"><div class="apparatus-label">${item.label}</div></div>
        <span class="apparatus-status pending-status" id="app-status-${item.id}">PENDING</span>`;
      list.appendChild(div);
    });

    function runCheck() {
      if (checkIdx>=items.length) {
        el('btn-apparatus-done').disabled=false;
        if (faults.length===0) {
          faultsEl.innerHTML='<div style="color:var(--success);font-size:12px;padding:4px 0">✓ All systems nominal — cleared for service.</div>';
          applyStats({knowledge:2,reputation:1});
        } else {
          applyStats({knowledge:1});
        }
        return;
      }
      const item=items[checkIdx]; checkIdx++;
      const div=el('app-item-'+item.id);
      div.classList.add('checking');
      setTimeout(()=>{
        div.classList.remove('checking');
        const hasFault=Math.random()<item.faultChance;
        if (hasFault) {
          div.classList.add('fault');
          el('app-status-'+item.id).textContent='FAULT'; el('app-status-'+item.id).className='apparatus-status fault-status';
          const faultRow=document.createElement('div'); faultRow.className='fault-fix-row';
          faultRow.innerHTML=`<span class="fault-fix-label">${item.label}: ${item.faultDesc}</span>
            <button class="fault-fix-btn" id="fix-${item.id}">FIX NOW (uses 1 action)</button>`;
          faultsEl.appendChild(faultRow);
          faults.push(item.id);
          el('fix-'+item.id).onclick=()=>{
            if (state.actionsRemaining<=0) {
              Toast.show('No actions left', 'You are out of actions this shift — this fault stays open.', 'warning');
              try { Sound.playFailureSting(); } catch(e) {}
              return;
            }
            state.actionsRemaining--;
            el('actions-remaining') && (el('actions-remaining').textContent=state.actionsRemaining);
            el('fix-'+item.id).textContent='FIXED ✓'; el('fix-'+item.id).className='fault-fix-btn fixed';
            div.classList.remove('fault'); div.classList.add('clear');
            el('app-status-'+item.id).textContent='REPAIRED'; el('app-status-'+item.id).className='apparatus-status clear-status';
            applyStats({knowledge:2,reputation:2}); renderHUD('shift-hud-stats');
            addToLog(`Apparatus fault repaired: ${item.label}.`,'positive');
          };
        } else {
          div.classList.add('clear');
          el('app-status-'+item.id).textContent='CLEAR'; el('app-status-'+item.id).className='apparatus-status clear-status';
        }
        setTimeout(runCheck, 280);
      }, 350);
    }

    el('btn-apparatus-done').disabled=true;
    el('btn-apparatus-done').onclick=()=>{
      if (faults.length>0) {
        addToLog(`${faults.length} unfixed apparatus fault(s) on shift — complication risk increased.`,'negative');
        if (!state.currentComplications) state.currentComplications=[];
        state.currentComplications.push({id:'equipment_issue',label:'Apparatus Fault',icon:'🔧',desc:'Unfixed fault on apparatus.',effect:{dispatchPenalty:1}});
      }
      hideModal('modal-apparatus'); callback();
    };
    showModal('modal-apparatus');
    setTimeout(runCheck, 300);
  }

  // ===== LT SHIFT TONE =====
  function showLTShiftTone(callback) {
    let selected=null;
    const opts = el('lt-tone-options'); opts.innerHTML='';
    LT_BRIEFING_TONES.forEach(tone=>{
      const card=document.createElement('div'); card.className='lt-tone-card';
      card.innerHTML=`<div class="lt-tone-icon">${tone.icon}</div>
        <div class="lt-tone-body">
          <div class="lt-tone-label">${tone.label}</div>
          <div class="lt-tone-desc">${tone.desc}</div>
          <div class="lt-tone-note">${tone.note}</div>
        </div>`;
      card.onclick=()=>{
        document.querySelectorAll('.lt-tone-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected'); selected=tone;
        el('btn-confirm-lt-tone').disabled=false;
      };
      opts.appendChild(card);
    });
    el('btn-confirm-lt-tone').disabled=true;
    el('btn-confirm-lt-tone').onclick=()=>{
      if (!selected) return;
      state.shiftTone=selected.id;
      applyStats(selected.effect||{});
      if (selected.extraAction) state.actionsRemaining++;
      renderHUD('shift-hud-stats');
      addToLog(`Shift briefing tone set: ${selected.label}. ${selected.note}`,'action');
      saveGame();
      hideModal('modal-lt-tone'); callback();
    };
    showModal('modal-lt-tone');
  }

  // ===== CAPTAIN AFD BRIEFING =====
  function showCaptainAFDBriefing(callback) {
    const directive=CAPTAIN_AFD_DIRECTIVES[state.shiftNumber % CAPTAIN_AFD_DIRECTIVES.length];
    const box=el('captain-directive-box');
    box.innerHTML=`<div class="captain-directive-icon">${directive.icon}</div>
      <div class="captain-directive-label">AFD DIRECTIVE — SHIFT ${state.shiftNumber}</div>
      <div class="captain-directive-text">${directive.directive}</div>`;
    const choicesEl=el('captain-briefing-choices'); choicesEl.innerHTML='';
    directive.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='captain-choice-btn';
      btn.innerHTML=`<span>${choice.text}</span><span class="captain-choice-note">${choice.note}</span>`;
      btn.onclick=()=>{
        changeWhitfieldTrust(choice.whitfieldDelta||0);
        applyStats({morale:choice.moraleDelta||0,reputation:choice.repDelta||0});
        renderHUD('shift-hud-stats');
        addToLog(`AFD Directive — ${choice.text}`,'action');
        saveGame();
        hideModal('modal-captain-briefing'); callback();
      };
      choicesEl.appendChild(btn);
    });
    showModal('modal-captain-briefing');
  }

  // ===== BC DISTRICT STAFFING =====
  function showBCDistrictStaffing(callback) {
    const grid=el('bc-stations-grid'); grid.innerHTML='';
    const vacancyPanel=el('bc-vacancy-panel');
    vacancyPanel.classList.add('hidden');
    const resolved=new Set();

    // Randomly assign 1-2 vacancies
    const stations=[...BC_DISTRICT_STATIONS];
    const vacancyCount=Math.random()<0.4?2:Math.random()<0.7?1:0;
    const vacancies=new Set();
    while(vacancies.size<vacancyCount) vacancies.add(Math.floor(Math.random()*stations.length));

    stations.forEach((stn,idx)=>{
      const hasVacancy=vacancies.has(idx);
      const card=document.createElement('div');
      card.className='bc-station-card'+(hasVacancy?' has-vacancy':'');
      card.innerHTML=`<div class="bc-station-icon">${stn.icon}</div>
        <div class="bc-station-name">${stn.name}</div>
        <div class="bc-station-unit">${stn.unit}</div>
        <div class="bc-station-status ${hasVacancy?'status-vacancy':'status-nominal'}">${hasVacancy?'VACANCY':'NOMINAL'}</div>`;
      if (hasVacancy) {
        card.onclick=()=>showVacancyDecision(stn, card, resolved);
      }
      grid.appendChild(card);
    });

    el('btn-bc-district-done').onclick=()=>{
      const unresolved=vacancyCount-resolved.size;
      if (unresolved>0) {
        applyStats({reputation:-2}); changeWhitfieldTrust(-3);
        addToLog(`${unresolved} district vacancy left unresolved this shift.`,'negative');
      } else if (vacancyCount>0) {
        applyStats({command:2}); changeWhitfieldTrust(2);
        addToLog('District staffing resolved. All stations covered.','positive');
      }
      renderHUD('shift-hud-stats'); saveGame();
      hideModal('modal-bc-district'); callback();
    };
    showModal('modal-bc-district');
  }

  function showVacancyDecision(stn, card, resolved) {
    el('bc-vacancy-station').textContent=stn.name;
    const choicesEl=el('bc-vacancy-choices'); choicesEl.innerHTML='';
    el('bc-vacancy-panel').classList.remove('hidden');
    BC_STAFFING_DECISIONS.forEach(dec=>{
      const btn=document.createElement('button'); btn.className='bc-choice-btn';
      btn.innerHTML=`<span>${dec.label}</span><span class="bc-choice-risk ${dec.risk.toLowerCase()}">${dec.risk} RISK</span>`;
      btn.onclick=()=>{
        changeWhitfieldTrust(dec.whitfieldDelta||0);
        applyStats({morale:dec.moraleDelta||0});
        if (dec.complicationChance && Math.random()<dec.complicationChance) {
          state.currentComplications.push({id:'understaffed',label:'Short-Staffed Station',icon:'👥',desc:'Running short at a district station.',effect:{actionsReduced:0}});
        }
        resolved.add(stn.id);
        card.classList.remove('has-vacancy'); card.classList.add('resolved');
        card.querySelector('.bc-station-status').className='bc-station-status status-nominal';
        card.querySelector('.bc-station-status').textContent='COVERED';
        el('bc-vacancy-panel').classList.add('hidden');
        addToLog(`${stn.name} vacancy: ${dec.label}.`,'action');
        saveGame();
      };
      choicesEl.appendChild(btn);
    });
  }

  // ===== CONFLICT / ESCALATION SYSTEM (LT -> Captain -> Battalion Chief) =====
  // Odds are shown on every choice. On failure, the player can retry once
  // (at reduced odds) or refer it up the chain. If the escalation lands on a
  // tier the player doesn't currently hold, an NPC officer resolves it
  // off-screen at a baseline chance — with a small cost to the player's own
  // standing, since it reflects on how they originally handled it.
  const CONFLICT_NEXT_TIER={ lieutenant:'captain', captain:'battalion_chief' };
  const CONFLICT_TIER_LABEL={ lieutenant:'Lieutenant', captain:'Captain', battalion_chief:'Battalion Chief' };
  let _conflictAttempt=0;

  function showConflictEvent(tier, next, presetEvent) {
    const cb=next||(()=>{});
    const pool=CONFLICT_EVENTS[tier]||CONFLICT_EVENTS.lieutenant;
    const event=presetEvent||pool[Math.floor(Math.random()*pool.length)];
    _conflictAttempt=0;
    renderConflictEvent(tier, event, cb);
  }

  function renderConflictEvent(tier, event, next) {
    const titleEl=el('conflict-modal-title');
    if (titleEl) titleEl.textContent=`CONFLICT — ${(CONFLICT_TIER_LABEL[tier]||tier).toUpperCase()} DECISION`;
    el('conflict-desc').textContent=event.desc;
    el('conflict-speech').textContent=event.dialogue;
    const choicesEl=el('conflict-choices'); choicesEl.innerHTML='';
    event.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span class="choice-chance">${Math.round(choice.chance*100)}%</span><span>${choice.text}</span>`;
      btn.onclick=()=>resolveConflictChoice(tier, event, choice, next);
      choicesEl.appendChild(btn);
    });
    showModal('modal-crew-conflict');
  }

  function resolveConflictChoice(tier, event, choice, next) {
    const resolved=Math.random()<choice.chance;
    const outcome=resolved?choice.success:choice.failure;
    applyStats(outcome.effect||{});
    if (outcome.whitfieldDelta) changeWhitfieldTrust(outcome.whitfieldDelta);
    renderHUD('shift-hud-stats');
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>${resolved?'✓ Resolved':'✗ Unresolved'} — ${event.title}: ${outcome.text}`, resolved?'action':'consequence');
    addToLog(`Conflict (${CONFLICT_TIER_LABEL[tier]||tier}) — ${choice.text.slice(0,40)}… ${resolved?'resolved':'unresolved'}.`, resolved?'positive':'negative');
    saveGame();
    if (resolved) { hideModal('modal-crew-conflict'); next(); return; }
    showConflictFollowup(tier, event, next);
  }

  function showConflictFollowup(tier, event, next) {
    const nextTier=CONFLICT_NEXT_TIER[tier]||null;
    el('conflict-desc').textContent='It didn\'t resolve. What now?';
    el('conflict-speech').textContent='';
    const choicesEl=el('conflict-choices'); choicesEl.innerHTML='';
    if (_conflictAttempt<1) {
      const retryBtn=document.createElement('button'); retryBtn.className='choice-btn';
      retryBtn.innerHTML=`<span>Handle it again yourself</span><span class="choice-effect">Odds drop after a failed attempt</span>`;
      retryBtn.onclick=()=>{
        _conflictAttempt++;
        const retryEvent={...event, choices:event.choices.map(c=>({...c, chance:Math.max(0.1, c.chance-0.2)}))};
        renderConflictEvent(tier, retryEvent, next);
      };
      choicesEl.appendChild(retryBtn);
    }
    const escalateBtn=document.createElement('button'); escalateBtn.className='choice-btn';
    if (nextTier) {
      escalateBtn.innerHTML=`<span>Refer it up the chain — to the ${CONFLICT_TIER_LABEL[nextTier]}</span><span class="choice-effect">Out of your hands now</span>`;
      escalateBtn.onclick=()=>{ hideModal('modal-crew-conflict'); escalateConflict(nextTier, next); };
    } else {
      escalateBtn.innerHTML=`<span>Accept it — there's nowhere higher to send this</span><span class="choice-effect">Final consequence applies</span>`;
      escalateBtn.onclick=()=>{ hideModal('modal-crew-conflict'); applyTerminalConflictConsequence(next); };
    }
    choicesEl.appendChild(escalateBtn);
    showModal('modal-crew-conflict');
  }

  function escalateConflict(tier, next) {
    const cb=next||(()=>{});
    if (getRankId()===tier) {
      // The player now holds this rank — it's a live decision for them.
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>⚠ An unresolved conflict has landed on your desk.`,'consequence');
      setTimeout(()=>showConflictEvent(tier, cb),800);
    } else {
      resolveEscalationAutomatically(tier, cb);
    }
  }

  function resolveEscalationAutomatically(tier, next) {
    const cb=next||(()=>{});
    const baseline={captain:0.65, battalion_chief:0.8}[tier]??0.7;
    const resolved=Math.random()<baseline;
    const tierLabel=CONFLICT_TIER_LABEL[tier]||tier;
    if (resolved) {
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>The ${tierLabel} steps in and resolves it. It shouldn't have had to go that far — a mark against how you originally handled it.`,'consequence');
      addToLog(`Conflict escalated to ${tierLabel} and resolved there.`,'negative');
      applyStats({reputation:-2, command:-1});
      changeWhitfieldTrust(-2);
      saveGame(); cb(); return;
    }
    const nextTier=CONFLICT_NEXT_TIER[tier]||null;
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Even the ${tierLabel} can't put it to bed.${nextTier?' It goes over their head too.':''}`,'consequence');
    saveGame();
    if (nextTier) escalateConflict(nextTier, cb);
    else applyTerminalConflictConsequence(cb);
  }

  function applyTerminalConflictConsequence(next) {
    const cb=next||(()=>{});
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>☠ It never got fixed. Someone requests a transfer over it — the kind of thing that follows a house for a long time.`,'consequence');
    addToLog('Conflict escalated all the way up and was never resolved. Lasting damage to house morale.','negative');
    applyStats({morale:-8, reputation:-6, command:-3});
    changeWhitfieldTrust(-8);
    saveGame(); cb();
  }

  // Pure random per-shift chance a conflict surfaces at the player's own tier.
  function maybeConflictEvent(rid, next) {
    const cb=next||(()=>{});
    if (!CONFLICT_EVENTS[rid] || Math.random()>=0.15) { cb(); return; }
    showConflictEvent(rid, cb);
  }

  // ===== SEEK ADVICE EVENTS (bottom-up, pure random per shift) =====
  function pickAdviceVisitor(rid) {
    let pool=[];
    if (rid==='lieutenant') pool=state.roster.filter(m=>m.unit===state.unit && m.role==='Firefighter');
    else if (rid==='captain') pool=state.roster.filter(m=>m.role==='Lieutenant');
    else if (rid==='battalion_chief') {
      pool=state.roster.filter(m=>m.role==='Captain');
      if (!pool.length) pool=state.roster.filter(m=>m.role==='Lieutenant');
    }
    return pool.length ? pool[Math.floor(Math.random()*pool.length)] : null;
  }

  function maybeSeekAdviceEvent(rid, next) {
    const cb=next||(()=>{});
    if (!SEEK_ADVICE_PROMPTS[rid] || Math.random()>=0.22) { cb(); return; }
    const visitor=pickAdviceVisitor(rid);
    if (!visitor) { cb(); return; }
    showSeekAdviceEvent(rid, visitor, cb);
  }

  function showSeekAdviceEvent(rid, visitor, next) {
    const prompts=SEEK_ADVICE_PROMPTS[rid]||SEEK_ADVICE_PROMPTS.lieutenant;
    const prompt=prompts[Math.floor(Math.random()*prompts.length)];
    const tagEl=el('crew-event-tag'); if (tagEl) tagEl.textContent='SEEKING YOUR COUNSEL';
    el('crew-event-portrait-area').innerHTML=buildPortraitSVG(visitor.initials||visitor.name.split(' ').map(n=>n[0]).join(''), visitor.color||'#3b82f6', 90);
    el('crew-event-title').textContent=prompt.title;
    el('crew-event-desc').textContent=`${visitor.name} ${prompt.desc}`;
    el('crew-event-speech').textContent=prompt.dialogue;
    const choicesEl=el('crew-event-choices'); choicesEl.innerHTML='';
    getCounselApproaches().forEach(ap=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${ap.label}</span><span class="choice-effect">${ap.desc}</span>`;
      btn.onclick=()=>{
        applyStats(ap.effect||{});
        visitor.bond=Math.min(100, visitor.bond+(ap.bondDelta||5));
        if ((state.crewStates[visitor.id]||'normal')!=='normal') state.crewStates[visitor.id]=ap.resolveState||'normal';
        renderHUD('shift-hud-stats');
        addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>${prompt.title}: ${visitor.name} — "${ap.label}" approach.`,'action');
        addToLog(`${visitor.name} sought you out — ${ap.label} approach.`,'positive');
        hideModal('modal-crew-event'); saveGame();
        next();
      };
      choicesEl.appendChild(btn);
    });
    showModal('modal-crew-event');
  }

  // ===== HOUSE MANAGEMENT (Captain rank) =====
  function showHouseMgmt() {
    if (state.actionsRemaining<=0) return;
    // Simple inline action for now — show a brief feed entry and give small stat boost
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const actions=[
      {text:'Approved 3 leave requests — crew morale improved.', effect:{morale:4}},
      {text:'Submitted equipment procurement request. Response time: 2-4 weeks.', effect:{reputation:3,command:2}},
      {text:'Roster gap filled — overtime approved for Friday.', effect:{reputation:2}},
      {text:'Monthly report submitted to Kade — numbers looking strong.', effect:{reputation:4,command:2}, whitfield:4},
    ];
    const a=actions[Math.floor(Math.random()*actions.length)];
    applyStats(a.effect); if(a.whitfield) changeWhitfieldTrust(a.whitfield);
    renderHUD('shift-hud-stats');
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>House Management: ${a.text}`,'action');
    addToLog(`House management: ${a.text}`,'positive');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  // ===== HOSPITAL PANEL (EMS ranks) =====
  function showHospitalPanel() {
    if (state.actionsRemaining<=0) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const rapport=state.hospitalRapport??50;
    const events=[
      {text:'Met with the Crestbridge receiving team. Documentation process improved.',rapport:5,effect:{knowledge:3,reputation:2}},
      {text:'Followed up on a complex patient handoff from last shift. Appreciated by the ER team.',rapport:8,effect:{reputation:3,knowledge:2}},
      {text:'Advocated for faster ambulance bay turnaround. Modest improvement this shift.',rapport:4,effect:{leadership:2}},
      {text:'Consulted with a specialist on a recurring patient presentation.',rapport:3,effect:{knowledge:5}},
    ];
    const e=events[Math.floor(Math.random()*events.length)];
    state.hospitalRapport=Math.min(100,(state.hospitalRapport||50)+e.rapport);
    applyStats(e.effect); renderHUD('shift-hud-stats');
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Hospital Liaison: ${e.text} (Rapport +${e.rapport})`,'action');
    addToLog(`Hospital liaison: ${e.text}`,'positive');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  // ===== BC LEGACY EVENT =====
  function showBCLegacyEvent() {
    if (state.actionsRemaining<=0) return;
    const event=BC_LEGACY_EVENTS[state.shiftNumber % BC_LEGACY_EVENTS.length];
    el('bc-legacy-desc').textContent=event.desc;
    el('bc-legacy-score').textContent=state.legacyScore||0;
    const choicesEl=el('bc-legacy-choices'); choicesEl.innerHTML='';
    event.choices.forEach(choice=>{
      const btn=document.createElement('button'); btn.className='choice-btn';
      btn.innerHTML=`<span>${choice.text}</span><span class="choice-effect">${choice.label}</span>`;
      btn.onclick=()=>{
        state.actionsRemaining--;
        el('actions-remaining').textContent=state.actionsRemaining;
        state.legacyScore=(state.legacyScore||0)+(choice.legacyDelta||0);
        if (choice.whitfieldDelta) changeWhitfieldTrust(choice.whitfieldDelta);
        if (choice.moraleDelta) applyStats({morale:choice.moraleDelta});
        if (choice.commandDelta) applyStats({command:choice.commandDelta});
        if (choice.publicDelta) applyStats({reputation:choice.publicDelta});
        renderHUD('shift-hud-stats');
        el('bc-legacy-score').textContent=state.legacyScore;
        addToLog(`BC Legacy: ${choice.text.slice(0,60)}… (Legacy ${choice.legacyDelta>=0?'+':''}${choice.legacyDelta})`,'action');
        saveGame(); hideModal('modal-bc-legacy');
        if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
      };
      choicesEl.appendChild(btn);
    });
    el('bc-legacy-score').textContent=state.legacyScore||0;
    showModal('modal-bc-legacy');
  }

  // ===== CIVIL SERVICE EXAM SYSTEM =====
  function showExamEligibleNotification(nextRank) {
    const rankLabels={driver_engineer:"Driver Engineer's",lieutenant:"Lieutenant's",captain:"Captain's",battalion_chief:"Battalion Chief's"};
    const label=rankLabels[nextRank.id]||nextRank.label+"'s";
    el('exam-eligible-rank').textContent=label+" Civil Service Exam";
    el('exam-eligible-icon').textContent=nextRank.id==='battalion_chief'?'⭐':'📋';
    el('exam-eligible-desc').textContent=`You meet the minimum requirements to sit the ${label} examination. You can take the exam at any time — but preparation matters. Prep sessions sharpen your instincts: during the written exam they can rule out wrong answers before you commit. The written is 10 scenario questions (70% to pass) that adapt to how well you're doing; the oral board has read your career file — expect them to bring it up.`;
    el('exam-prep-bar-pre').style.width=(state.examReadiness||0)+'%';
    el('exam-prep-val-pre').textContent=state.examReadiness||0;
    el('btn-acknowledge-exam').onclick=()=>{
      hideModal('modal-exam-eligible');
      addFeedEntry('Civil service exam is now available. Prep sessions raise your readiness — higher readiness means better odds on each question.','consequence');
      renderRankSpecificRooms(); saveGame();
    };
    showModal('modal-exam-eligible');
  }

  function handleExamPrep() {
    if (state.actionsRemaining<=0) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const gain=25;
    state.examReadiness=Math.min(100,(state.examReadiness||0)+gain);
    applyStats({knowledge:2}); renderHUD('shift-hud-stats');
    renderRankSpecificRooms();
    const msg=state.examReadiness>=80?` <strong>You're well prepared — walk in confident.</strong>`:state.examReadiness>=60?` <strong>Good preparation. Head to the exam when ready.</strong>`:'';
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Exam prep session. Readiness now ${state.examReadiness}%.${msg}`,'action');
    addToLog(`Exam prep — readiness at ${state.examReadiness}%.`,'positive');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  function triggerWrittenExam() {
    if ((state.examCooldown||0)>0) {
      addFeedEntry(`You're still cooling down from the last attempt — resit available in ${state.examCooldown} shift${state.examCooldown===1?'':'s'}.`,'consequence');
      return;
    }
    showExamStartModal();
  }

  function getReadinessProb(readiness) {
    if (readiness <= 20) return 0.20 + Math.random() * 0.10;
    if (readiness <= 40) return 0.35 + Math.random() * 0.10;
    if (readiness <= 60) return 0.50 + Math.random() * 0.15;
    if (readiness <= 80) return 0.70 + Math.random() * 0.10;
    return 0.85 + Math.random() * 0.10;
  }

  function getReadinessFlavour(readiness) {
    if (readiness <= 20) return "You haven't studied. This is a gamble.";
    if (readiness <= 40) return "You've done some reading. It might be enough.";
    if (readiness <= 60) return "You're moderately prepared. Expect some tough questions.";
    if (readiness <= 80) return "You're well prepared. Trust your training.";
    return "You know this material cold. Walk in confident.";
  }

  function showExamStartModal() {
    const readiness = state.examReadiness || 0;
    const rankLabels = {driver_engineer:"Driver Engineer's", lieutenant:"Lieutenant's", captain:"Captain's", battalion_chief:"Battalion Chief's"};
    const rankId = state.examTargetRank || 'lieutenant';
    const label = rankLabels[rankId] || 'Civil Service';
    el('exam-start-title').textContent = label + ' Exam';
    el('exam-start-readiness-val').textContent = readiness + '%';
    el('exam-start-flavour').textContent = getReadinessFlavour(readiness);
    const bar = el('exam-start-readiness-bar');
    bar.style.width = readiness + '%';
    bar.style.background = readiness < 30 ? '#ef4444' : readiness < 60 ? '#f59e0b' : '#3b82f6';
    el('btn-exam-start-confirm').onclick = () => {
      hideModal('modal-exam-start');
      showWrittenExam(rankId);
    };
    const prepBtn = el('btn-exam-start-prep');
    if (readiness >= 100 || (state.actionsRemaining || 0) <= 0) {
      prepBtn.disabled = true;
      prepBtn.textContent = readiness >= 100 ? '📚 Already Fully Prepared' : '📚 No Actions Remaining';
    } else {
      prepBtn.disabled = false;
      prepBtn.textContent = '📚 Prep Session (+25%) — uses 1 action';
      prepBtn.onclick = () => { hideModal('modal-exam-start'); handleExamPrep(); };
    }
    showModal('modal-exam-start');
  }

  function showWrittenExam(rankId) {
    // v2: adaptive session — your actual answers matter, prep gives insight, no repeats between sittings
    const session=createWrittenSession(state, rankId, 10);
    let q=null, answered=false;

    const rankTitles={driver_engineer:"Driver Engineer's",lieutenant:"Lieutenant's",captain:"Captain's",battalion_chief:"Battalion Chief's",pic:"Paramedic in Charge",field_chief:"EMS Field Chief's"};
    el('exam-written-title').textContent=(rankTitles[rankId]||"Civil Service")+' Written Exam';
    el('exam-total-q').textContent=String(session.length);

    function renderQuestion() {
      q=nextQuestion(session);
      if (!q) { finish(); return; }
      answered=false;
      el('exam-q-progress').textContent=`Q ${session.asked.length+1} / ${session.length}`;
      el('exam-running-score').textContent=session.correctCount;
      el('exam-q-text').textContent=q.q;
      el('exam-q-feedback').classList.add('hidden');
      el('btn-exam-next').disabled=true;

      const insightIdx=readinessInsight(state,q);
      const opts=el('exam-q-options'); opts.innerHTML='';
      if ((q.tier||1)>=3) {
        const tag=document.createElement('div'); tag.className='exam-tier-tag';
        tag.textContent='★ ADVANCED MATERIAL'; opts.appendChild(tag);
      }
      q.options.forEach((opt,i)=>{
        const btn=document.createElement('button'); btn.className='exam-option-btn';
        btn.textContent=`${String.fromCharCode(65+i)}. ${opt}`;
        if (i===insightIdx) {
          btn.classList.add('insight-eliminated'); btn.disabled=true;
          btn.textContent+='   — ruled out during your prep';
        }
        btn.onclick=()=>{
          if (answered) return;
          answered=true;
          const correct=answerQuestion(session,q,i);
          document.querySelectorAll('.exam-option-btn').forEach((b,bi)=>{
            b.disabled=true;
            if (bi===q.correct) b.classList.add('correct');
            else if (bi===i&&!correct) b.classList.add('incorrect');
          });
          const fb=el('exam-q-feedback'); fb.classList.remove('hidden');
          fb.className='exam-q-feedback '+(correct?'correct':'incorrect');
          fb.innerHTML=(correct?'✓ Correct. ':'✗ Incorrect. ')+`<span class="exam-explain">${q.explain||''}</span>`;
          el('btn-exam-next').disabled=false;
          el('btn-exam-next').textContent=session.asked.length<session.length?'Next Question →':'Submit Exam →';
        };
        opts.appendChild(btn);
      });
    }

    function finish() {
      const result=finishWrittenSession(state,session);
      saveGame();
      hideModal('modal-exam-written');
      showOralBoard(rankId, result);
    }

    el('btn-exam-next').onclick=()=>{
      if (session.asked.length>=session.length) finish();
      else renderQuestion();
    };

    renderQuestion();
    showModal('modal-exam-written');
  }

  function showOralBoard(rankId, writtenResult) {
    // v2: the board has read your file — career-record scenarios mixed with fresh bank material,
    // visible panelist reactions, and your actual choices decide the score.
    const board=buildOralBoard(state, rankId);
    const maxOral=board.length*3;
    let currentS=0, oralPoints=0;
    const stressed=(state.condition?.stress||0)>=70;
    let stressApplied=false;

    function renderScenario() {
      const s=board[currentS];
      el('oral-q-progress').textContent=`Q ${currentS+1} / ${board.length}`;
      el('oral-panelist').innerHTML=`<span class="oral-panelist-name">${s.panelist}</span><span class="oral-panelist-label">${s.career?'Board Member — your file is open':'Panel Member'}</span>`;
      el('oral-q-text').textContent=s.question;
      const choices=el('oral-q-choices'); choices.innerHTML='';
      s.choices.forEach(c=>{
        const btn=document.createElement('button'); btn.className='choice-btn';
        btn.innerHTML=`<span>${c.text}</span>`;
        btn.onclick=()=>{
          document.querySelectorAll('#oral-q-choices .choice-btn').forEach(b=>b.disabled=true);
          let scored=c.score;
          let stressNote='';
          if (stressed && !stressApplied && scored>0 && Math.random()<0.5) {
            stressApplied=true; scored=Math.max(0,scored-1);
            stressNote=' (Your hands are not quite steady — the answer lands weaker than you meant it.)';
          }
          oralPoints+=scored;
          applyStats({[c.stat]: scored}); renderHUD('shift-hud-stats');
          const fb=document.createElement('div');
          fb.className='oral-react '+(scored>=2?'good':'bad');
          fb.textContent=(scored>=2?(s.reactGood||'The panel nods.'):(s.reactBad||'The panel exchanges glances.'))+stressNote;
          choices.appendChild(fb);
          const next=document.createElement('button'); next.className='menu-btn primary'; next.style.marginTop='10px';
          next.textContent=currentS<board.length-1?'Next Question →':'Conclude the Board →';
          next.onclick=()=>{
            currentS++;
            if (currentS>=board.length) {
              markOralSeen(state,board); saveGame();
              hideModal('modal-exam-oral');
              resolveExam(writtenResult, oralPoints, maxOral);
            } else renderScenario();
          };
          choices.appendChild(next);
        };
        choices.appendChild(btn);
      });
    }

    renderScenario();
    showModal('modal-exam-oral');
  }

  function resolveExam(writtenResult, oralPoints, maxOral) {
    const writtenScore=writtenResult.score;
    const writtenTotal=writtenResult.total||10;
    const writtenPass=writtenScore>=Math.ceil(writtenTotal*0.7);
    const reviewNote=(writtenResult.missedTopics&&writtenResult.missedTopics.length)
      ?`<div class="exam-review-note">📖 Study guide — areas to review: <strong>${writtenResult.missedTopics.join(', ')}</strong></div>`:'';
    const tierNote=(writtenResult.peakTier>=3)
      ?`<div class="exam-tier-note">★ The examiners pushed you into advanced material.</div>`:'';
    const oralPass=oralPoints>=(maxOral*0.5);
    const pass=writtenPass&&oralPass;

    const body=el('exam-result-body');
    if (pass) {
      const listRank=Math.ceil(Math.random()*5);
      state.examResult='pass';
      state.eligibilityRank=listRank;
      state.vacancyCountdown=1+Math.floor(Math.random()*5); // 1-5 shifts
      recordHistory(state,'exam',`Passed the ${state.examTargetRank||'promotion'} civil service exam — written ${writtenScore}/${writtenTotal}, oral board ${oralPoints}/${maxOral}. Eligibility list #${listRank}.`);
      saveGame();
      body.innerHTML=`
        <div class="exam-result-pass">PASS</div>
        <div class="exam-result-scores">
          <div class="exam-score-row"><span>Written</span><span>${writtenScore}/${writtenTotal}</span></div>
          <div class="exam-score-row"><span>Oral Board</span><span>${oralPoints}/${maxOral}</span></div>
        </div>
        ${tierNote}
        <div class="exam-result-list">
          <div class="exam-list-label">ELIGIBILITY LIST POSITION</div>
          <div class="exam-list-rank">#${listRank}</div>
          <div class="exam-list-note">You are ranked #${listRank} on the ${state.examTargetRank||'promotion'} eligibility list. A vacancy will be offered within the next ${state.vacancyCountdown} shift${state.vacancyCountdown===1?'':'s'}.</div>
        </div>
        ${reviewNote}`;
      Sound.playSuccessSting();
    } else {
      state.examResult=null; state.examEligible=true; // still eligible, cooling down
      state.examFailCount=(state.examFailCount||0)+1;
      state.examReadiness=0;
      state.examCooldown=state.examFailCount>=2?6:3;
      recordHistory(state,'exam',`Did not pass the ${state.examTargetRank||'promotion'} exam — written ${writtenScore}/${writtenTotal}, oral board ${oralPoints}/${maxOral}.`);
      saveGame();
      const cooldownMsg=state.examFailCount>=2?'Second failure — you must wait a full career year (6 shifts) before resitting.':'You may resit after 3 shifts of additional prep.';
      body.innerHTML=`
        <div class="exam-result-fail">NOT PASSED</div>
        <div class="exam-result-scores">
          <div class="exam-score-row"><span>Written</span><span class="${writtenPass?'':'score-fail'}">${writtenScore}/${writtenTotal} — ${writtenPass?'Pass':'Below 70%'}</span></div>
          <div class="exam-score-row"><span>Oral Board</span><span class="${oralPass?'':'score-fail'}">${oralPoints}/${maxOral} — ${oralPass?'Pass':'Below 50%'}</span></div>
        </div>
        ${reviewNote}
        <div class="exam-result-note">⚠ ${cooldownMsg}</div>`;
      Sound.playFailureSting();
    }
    el('btn-exam-result-ok').onclick=()=>{
      hideModal('modal-exam-result');
      renderRankSpecificRooms();
    };
    showModal('modal-exam-result');
  }

  // ===== VACANCY + PROMOTION CEREMONY =====
  function pickVacancyStory() {
    // Random company, then a random (but lore-consistent) departure for its
    // current officer. Skip variants whose officer is no longer on the roster.
    const pool=VACANCY_STORIES
      .map(c=>({company:c.company, variants:c.variants.filter(v=>!v.departerId||state.roster.some(m=>m.id===v.departerId))}))
      .filter(c=>c.variants.length>0);
    if (!pool.length) return { company: state.unit, story:'A command vacancy has opened.', ceremony:'Kade pins the badge himself.', departureNote:null };
    const entry=pool[Math.floor(Math.random()*pool.length)];
    const v=entry.variants[Math.floor(Math.random()*entry.variants.length)];
    return {...v, company: entry.company};
  }

  function applyOfficerDeparture(story) {
    if (!story||!story.departerId||!story.departure) return;
    const idx=state.roster.findIndex(r=>r.id===story.departerId);
    if (idx<0) return;
    const m=state.roster[idx];
    if (story.departure.type==='remove') {
      state.roster.splice(idx,1);
      addToLog(`${m.name} has left Firehouse 12.`,'neutral');
    } else if (story.departure.type==='promote') {
      m.role=story.departure.role||m.role;
      m.unit=story.departure.unit||m.unit;
      addToLog(`${m.name} is now ${m.role}, ${m.unit}.`,'neutral');
    }
  }

  // Repair for older saves: the player was promoted into a company but the
  // incumbent Lieutenant was never moved. Resolve it with a random logical exit.
  function resolveCommandConflicts() {
    if (!state||!state.officerCompany||!Array.isArray(state.roster)) return;
    const rank=getRanks()[state.rankIndex];
    if (!rank||rank.id!=='lieutenant') return;
    const incumbent=state.roster.find(m=>m.role==='Lieutenant'&&m.unit===state.officerCompany);
    if (!incumbent) return;
    const entry=VACANCY_STORIES.find(c=>c.company===state.officerCompany);
    const variants=entry?entry.variants.filter(v=>v.departerId===incumbent.id):[];
    const v=variants.length
      ? variants[Math.floor(Math.random()*variants.length)]
      : { departerId:incumbent.id, departure:{type:'remove'} };
    applyOfficerDeparture(v);
    const updated=state.roster.find(m=>m.id===incumbent.id);
    addFeedEntry(updated
      ? `★ ${incumbent.name} promoted to ${updated.role} — ${state.officerCompany} is yours.`
      : `★ ${incumbent.name} has departed — ${state.officerCompany} is yours.`,'consequence');
    saveGame();
  }

  function showVacancyEvent(rankId) {
    const story=pickVacancyStory();
    const body=el('vacancy-body');
    const rankLabels={driver_engineer:'Driver Engineer',lieutenant:'Lieutenant',captain:'Captain',battalion_chief:'Battalion Chief'};
    const rankLabel=rankLabels[rankId]||rankId;
    body.innerHTML=`
      <div class="vacancy-rank-label">${rankLabel.toUpperCase()} — POSITION OPEN</div>
      <div class="vacancy-story-text">${story.story}</div>
      <div class="speech-bubble vacancy-ceremony">${story.ceremony}</div>
      ${story.departureNote?`<div class="vacancy-departure">${story.departureNote}</div>`:''}
      <div class="vacancy-detail"><strong>Assigned Company:</strong> ${story.company}</div>
      <div class="vacancy-detail"><strong>List Rank:</strong> #${state.eligibilityRank} — your score secured this assignment.</div>`;
    el('btn-accept-vacancy').onclick=()=>{
      hideModal('modal-vacancy');
      showPromoCeremony(rankId, story);
    };
    showModal('modal-vacancy');
  }

  function showPromoCeremony(rankId, story) {
    const rankLabels={driver_engineer:'DRIVER ENGINEER',lieutenant:'LIEUTENANT',captain:'CAPTAIN',battalion_chief:'BATTALION CHIEF'};
    const rankLabel=rankLabels[rankId]||rankId.toUpperCase();
    const company=story?story.company:state.unit;
    el('promo-ceremony-rank').textContent=rankLabel;
    el('promo-ceremony-company').textContent=company;
    el('promo-ceremony-badge').textContent={driver_engineer:'🔧',lieutenant:'⭐',captain:'🏅',battalion_chief:'🔱'}[rankId]||'⭐';

    const ceremonyTexts={
      driver_engineer:`Chief Kade hands you the apparatus key. "The rig is yours. The pump is yours. Everyone on that rig is yours. Never forget the weight of that."`,
      lieutenant:`Kade pins the badge. "Lieutenant." He steps back and looks at you. "I've watched you earn this. Don't waste it." The crew lines up. Not because anyone told them to.`,
      captain:`The promotion is quiet. Kade's office, handshake, the badge. "Captain." Delgado shakes your hand. "Same job, heavier responsibility. You'll be fine." You know he means it.`,
      battalion_chief:`Kade pins the bugles himself. "Battalion 6." He pauses. "I've watched you become a firefighter, an officer, and now a chief. These people — they're yours to lead. Don't let them down." You don't plan to.`,
    };
    el('promo-ceremony-body').innerHTML=`<div class="ceremony-speech">${ceremonyTexts[rankId]||'Congratulations on your promotion.'}</div>`;

    // Only crew still on the roster show up to your ceremony
    const reactions={
      ortega:'"Well deserved."',
      kessler:'(nods once — that\'s enough from Kessler)',
      whitaker:'Handshake so firm your knuckles crack.',
      delgado:'Quiet smile. "Don\'t forget where you came from."',
      tibbets:'"About time."',
      priya:'"Try not to make us look bad, Lieutenant."',
      brennan:'"Huh. They finally got one right."',
    };
    const crew=state.roster.filter(m=>reactions[m.id]).slice(0,5);
    el('promo-ceremony-crew').innerHTML=crew.map(m=>`<div class="ceremony-crew-line"><strong>${m.name.split(' ').pop()}:</strong> ${reactions[m.id]}</div>`).join('');

    el('btn-promo-ceremony-done').onclick=()=>{
      hideModal('modal-promo-ceremony');
      doFinalPromotion(rankId, company, story);
      addToLog(`★ Promoted to ${rankLabel} — assigned to ${company}.`,'critical');
      addFeedEntry(`★ PROMOTED: ${rankLabel} — ${company}`,'consequence');
      Sound.playSuccessSting();
    };
    showModal('modal-promo-ceremony');
  }

  // ===== LT OFFICER ACTIONS =====
  function showLTDrillFocus() {
    if (state.actionsRemaining<=0) return;
    let selected=null;
    const grid=el('drill-types-grid'); grid.innerHTML='';
    DRILL_TYPES.forEach(dt=>{
      const card=document.createElement('div'); card.className='drill-type-card';
      card.innerHTML=`<div class="drill-type-icon">${dt.icon}</div>
        <div class="drill-type-body">
          <div class="drill-type-label">${dt.label}</div>
          <div class="drill-type-desc">${dt.desc}</div>
          <div class="drill-type-effect">${Object.entries(dt.effect).map(([k,v])=>`+${v} ${k.charAt(0).toUpperCase()+k.slice(1)}`).join(', ')}</div>
        </div>`;
      card.onclick=()=>{
        document.querySelectorAll('.drill-type-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected'); selected=dt;
        el('btn-confirm-drill').disabled=false;
      };
      grid.appendChild(card);
    });
    el('btn-confirm-drill').disabled=true;
    el('btn-confirm-drill').onclick=()=>{
      if (!selected) return;
      hideModal('modal-lt-drill');
      state.actionsRemaining--;
      el('actions-remaining').textContent=state.actionsRemaining;
      applyStats(selected.effect);
      // Crew bonus
      state.roster.forEach(m=>{
        for (const [k,v] of Object.entries(selected.crewBonus||{})) {
          if (k==='morale') applyStats({morale:Math.floor(v/state.roster.length+1)});
        }
        // Reduce fatigue
        if ((state.crewStates[m.id]||'normal')==='fatigued') {
          state.crewStates[m.id]='normal';
        }
      });
      renderHUD('shift-hud-stats');
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Company Drill: ${selected.label} — led by Lt. ${state.name.split(' ').pop()}. ${Object.entries(selected.effect).map(([k,v])=>`+${v} ${k.charAt(0).toUpperCase()+k.slice(1)}`).join(', ')}.`,'action');
      addToLog(`LT Drill: ${selected.label}.`,'positive');
      changeWhitfieldTrust(2); saveGame();
      if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
    };
    showModal('modal-lt-drill');
  }

  function handleLTInspection() {
    if (state.actionsRemaining<=0) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const findIssue=Math.random()<0.35;
    if (findIssue) {
      const issues=['SCBA bottle low on Engine 12 — submitted maintenance request.','Hydraulic fluid trace on Truck 7 turntable — placed aerial on limited status.','Expired EMS supplies in bay kit — restocked from supplies room.','Loose coupling on attack line — replaced before shift.'];
      const issue=issues[Math.floor(Math.random()*issues.length)];
      applyStats({knowledge:3,reputation:3}); changeWhitfieldTrust(3);
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Equipment Inspection: Issue found — ${issue}`,'action');
      addToLog(`Equipment inspection: issue found — ${issue}`,'positive');
    } else {
      applyStats({reputation:2,knowledge:1});
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Equipment Inspection: All gear checks nominal. Apparatus bay inspection complete.`,'action');
      addToLog('Equipment inspection: all nominal.','positive');
    }
    renderHUD('shift-hud-stats'); saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  function handleShiftBriefingAttend() {
    if (state.actionsRemaining<=0) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    const briefs=[
      {text:'Captain runs through district activity — three calls in the last 24 hours, all routine. "Keep the crew sharp."',effect:{knowledge:2,leadership:2}},
      {text:'BC stops in for an unscheduled inspection. You impress them with the company\'s readiness.',effect:{reputation:4,command:2},whitfield:3},
      {text:'Pre-shift weather advisory — heavy rain expected. Adjust for road conditions and extended response times.',effect:{knowledge:3,morale:-1}},
      {text:'Captain shares a debrief from a sister company\'s complex call last shift. Lessons for your crew.',effect:{knowledge:3,leadership:2}},
    ];
    const b=briefs[Math.floor(Math.random()*briefs.length)];
    applyStats(b.effect); if(b.whitfield) changeWhitfieldTrust(b.whitfield);
    renderHUD('shift-hud-stats');
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Shift Briefing: ${b.text}`,'action');
    addToLog(`Shift briefing: ${b.text}`,'positive');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  function handleShiftLogWrite() {
    if (state.actionsRemaining<=0) return;
    state.actionsRemaining--;
    el('actions-remaining').textContent=state.actionsRemaining;
    applyStats({reputation:3,command:2}); changeWhitfieldTrust(1);
    renderHUD('shift-hud-stats');
    addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>Shift Log: Report written, signed, filed. Kade will see it in the morning.`,'action');
    addToLog('Shift log written.','positive');
    saveGame();
    if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
  }

  // Who a given rank is allowed to counsel. Lieutenants only counsel their
  // own company. Captains oversee every company plus the Lieutenants running
  // them. Battalion Chiefs oversee everyone, including Captains. Command
  // staff above the player's own chain (Battalion Chief, Deputy Commissioner)
  // are never counsel targets.
  function getCounselPool(rankId) {
    const excludedRoles=['Battalion Chief','Deputy Commissioner'];
    const base=state.roster.filter(m=>!excludedRoles.includes(m.role));
    if (rankId==='lieutenant') return base.filter(m=>m.unit===state.unit);
    return base; // captain, battalion_chief, and fallback see the full house
  }

  function showCounselCrewModal() {
    if (state.actionsRemaining<=0) return;
    const rid=getRankId();
    const pool=getCounselPool(rid);
    const crewEl=el('counsel-crew-list'); crewEl.innerHTML='';
    let selectedMember=null, selectedApproach=null;
    el('btn-confirm-counsel').disabled=true;
    el('counsel-approaches').style.display='none';
    const introEl=document.querySelector('#modal-counsel-crew p');
    if (introEl) {
      introEl.textContent = rid==='lieutenant'
        ? 'Select a member of your company and an approach. Works best when a member is Fatigued or Conflicted.'
        : rid==='captain'
        ? 'Select any crew member or Lieutenant in the house and an approach.'
        : 'Select any crew member, Lieutenant, or Captain in the district and an approach.';
    }

    pool.forEach(m=>{
      const cs=(state.crewStates[m.id]||'normal');
      const card=document.createElement('div'); card.className='counsel-crew-card';
      const stateColor={normal:'#3d5080',fatigued:'#f59e0b',injured:'#ef4444',conflicted:'#a855f7',confident:'#22c55e'}[cs]||'#3d5080';
      const showTag=rid!=='lieutenant'; // spans multiple companies/ranks — clarify who's who
      card.innerHTML=`<span class="counsel-crew-name">${m.name}${showTag?` <span class="counsel-crew-tag">${m.role} · ${m.unit}</span>`:''}</span><span class="roster-state-badge" style="background:${stateColor}22;color:${stateColor};border:1px solid ${stateColor}44">${cs}</span>`;
      card.onclick=()=>{
        document.querySelectorAll('.counsel-crew-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected'); selectedMember=m;
        el('counsel-approaches').style.display='block';
        renderCounselApproaches(m, cs, (ap)=>{ selectedApproach=ap; el('btn-confirm-counsel').disabled=false; });
      };
      crewEl.appendChild(card);
    });

    el('btn-confirm-counsel').onclick=()=>{
      if (!selectedMember||!selectedApproach) return;
      hideModal('modal-counsel-crew');
      state.actionsRemaining--;
      el('actions-remaining').textContent=state.actionsRemaining;
      applyStats(selectedApproach.effect||{});
      selectedMember.bond=Math.min(100,selectedMember.bond+(selectedApproach.bondDelta||5));
      if ((state.crewStates[selectedMember.id]||'normal')!=='normal') {
        state.crewStates[selectedMember.id]=selectedApproach.resolveState||'normal';
      }
      renderHUD('shift-hud-stats');
      addFeedEntry(`<span class="feed-time">${shiftTimeLabel()}</span>One-on-one with ${selectedMember.name}: "${selectedApproach.label}" approach. Bond +${selectedApproach.bondDelta||5}.`,'action');
      addToLog(`Counseled ${selectedMember.name} — ${selectedApproach.label}.`,'positive');
      changeWhitfieldTrust(1); saveGame();
      if (state.actionsRemaining<=0) document.querySelectorAll('.room:not([data-action="dispatch"])').forEach(r=>r.classList.add('used'));
    };
    showModal('modal-counsel-crew');
  }

  function getCounselApproaches() {
    return [
      { id:'supportive', label:'Supportive',   desc:'"I\'m here if you need to talk. No judgment." Empathetic approach.', effect:{morale:4},  bondDelta:8,  resolveState:'normal' },
      { id:'firm',       label:'Firm',         desc:'"I need you at full capacity. Here\'s what we\'re going to do." Direct.', effect:{leadership:3}, bondDelta:4, resolveState:'normal' },
      { id:'practical',  label:'Practical',    desc:'"Let\'s look at what\'s driving this and fix it step by step." Solution-focused.', effect:{knowledge:2,morale:3}, bondDelta:6, resolveState:'normal' },
    ];
  }

  function renderCounselApproaches(member, crewState, onSelect) {
    const approaches=getCounselApproaches();
    const container=el('counsel-approach-options'); container.innerHTML='';
    approaches.forEach(ap=>{
      const btn=document.createElement('button'); btn.className='lt-tone-card';
      btn.innerHTML=`<div class="lt-tone-icon">${ap.id==='supportive'?'🤝':ap.id==='firm'?'✋':'🔧'}</div>
        <div class="lt-tone-body"><div class="lt-tone-label">${ap.label}</div><div class="lt-tone-desc">${ap.desc}</div></div>`;
      btn.onclick=()=>{
        document.querySelectorAll('#counsel-approach-options .lt-tone-card').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
        onSelect(ap);
      };
      container.appendChild(btn);
    });
  }

  // ===== SAVE / LOAD SYSTEM =====
  function toggleSaveLoadMenu() {
    const m=el('modal-save-load');
    if (!m) return;
    if (!m.classList.contains('hidden')) { hideModal('modal-save-load'); return; }
    refreshIngameSlots();
    renderDifficultyRow();
    showModal('modal-save-load');
    el('close-save-load').onclick=()=>hideModal('modal-save-load');
    el('btn-resume-from-save').onclick=()=>hideModal('modal-save-load');
    const recBtn=el('btn-career-record');
    if (recBtn) recBtn.onclick=()=>{ hideModal('modal-save-load'); showCareerRecord(); };
  }

  // ===== v2: DIFFICULTY PICKER =====
  function renderDifficultyRow() {
    const row=el('difficulty-row'); if (!row) return;
    row.innerHTML='';
    const current=state?.settings?.difficulty||'standard';
    for (const [id,d] of Object.entries(DIFFICULTY_SETTINGS)) {
      const btn=document.createElement('button');
      btn.className='slot-btn difficulty-btn'+(id===current?' active':'');
      btn.textContent=d.label;
      btn.onclick=()=>{
        state.settings.difficulty=id;
        recordHistory(state,'system',`Difficulty set to ${d.label}.`);
        saveGame(); renderDifficultyRow();
      };
      row.appendChild(btn);
    }
    const desc=el('difficulty-desc');
    if (desc) desc.textContent=DIFFICULTY_SETTINGS[state?.settings?.difficulty||'standard'].desc;
  }

  // ===== v2: CAREER RECORD SCREEN =====
  function showCareerRecord() {
    if (!state) return;
    const rec=state.record||{}; const c=state.condition||{};
    const statsEl=el('career-record-stats');
    const cell=(label,val,color)=>`<div class="cr-stat"><div class="cr-stat-val"${color?` style="color:${color}"`:''}>${val}</div><div class="cr-stat-label">${label}</div></div>`;
    statsEl.innerHTML=
      cell('Shifts', state.shiftNumber||1)+
      cell('Calls Run', state.totalCalls||0)+
      cell('Exceptional', rec.critSuccesses||0, '#22c55e')+
      cell('Saves', rec.saves||0, '#3b82f6')+
      cell('Setbacks', rec.failures||0, '#ef4444')+
      cell('Exam Attempts', (state.examFailCount||0)+((state.examResult==='pass'||state.rankIndex>1)?1:0));
    const condEl=el('career-record-condition');
    const stressCol=c.stress>=70?'#ef4444':c.stress>=40?'#f59e0b':'#22c55e';
    condEl.innerHTML=`<div class="save-load-section-label">CONDITION</div>
      <div class="cr-cond-row">Stress <div class="cr-bar"><div class="cr-bar-fill" style="width:${c.stress||0}%;background:${stressCol}"></div></div> ${c.stress||0}/100</div>
      ${c.injury?`<div class="cr-cond-note">🩹 ${c.injury.name} — ${c.injury.shiftsLeft} shift${c.injury.shiftsLeft===1?'':'s'} remaining</div>`:''}
      ${(state.discipline?.points||0)>0?`<div class="cr-cond-note">⚖️ Discipline file: ${state.discipline.points} point${state.discipline.points===1?'':'s'}${state.discipline.hearings?` · ${state.discipline.hearings} hearing${state.discipline.hearings===1?'':'s'}`:''}</div>`:''}`;
    const comEl=el('career-record-commendations');
    comEl.innerHTML=(rec.commendations&&rec.commendations.length)
      ?`<div class="save-load-section-label" style="margin-top:10px">COMMENDATIONS</div>`+rec.commendations.map(x=>`<div class="cr-commendation">🎖️ ${x}</div>`).join('')
      :'';
    const memEl=el('career-record-memorial');
    memEl.innerHTML=(state.memorial&&state.memorial.length)
      ?`<div class="save-load-section-label" style="margin-top:10px">IN MEMORIAM</div>`+state.memorial.map(x=>`<div class="cr-memorial">🖤 ${x.name} — ${x.role}, ${x.unit}. Shift ${x.shift}, ${x.call}.</div>`).join('')
      :'';
    const tl=el('career-record-timeline'); tl.innerHTML='';
    const icons={call:'🚒',exam:'📋',arc:'⭐',condition:'🩹',discipline:'⚖️',lodd:'🖤',system:'⚙️',promotion:'🏅'};
    [...(state.history||[])].reverse().slice(0,80).forEach(h=>{
      const d=document.createElement('div'); d.className='cr-timeline-entry cr-'+(h.type||'system');
      d.innerHTML=`<span class="cr-tl-shift">S${h.shift}</span><span class="cr-tl-icon">${icons[h.type]||'•'}</span><span class="cr-tl-text">${h.text}</span>`;
      tl.appendChild(d);
    });
    if (!tl.children.length) tl.innerHTML='<div style="color:var(--text-dim);font-size:12px">Your story starts with the next call.</div>';
    el('close-career-record').onclick=()=>hideModal('modal-career-record');
    showModal('modal-career-record');
  }

  async function refreshIngameSlots() {
    const grid=el('ingame-slots-grid'); if (!grid) return;
    grid.innerHTML='<div style="color:var(--text-dim);font-size:12px">Loading slots…</div>';
    const slots=await window.electronAPI.listSlots();
    renderSlotCards(grid, slots, true);
  }

  function renderSlotCards(container, slots, inGame) {
    container.innerHTML='';
    slots.forEach(({slot,meta})=>{
      const card=document.createElement('div'); card.className='save-slot-card';
      if (meta) {
        const d=new Date(meta.savedAt); const dateStr=isNaN(d)?'—':d.toLocaleDateString()+' '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
        card.innerHTML=`<div class="slot-num">Slot ${slot}</div>
          <div class="slot-char-name">${meta.name}</div>
          <div class="slot-meta">${meta.rank||'—'} · ${meta.track||'—'} · ${meta.unit||'—'}</div>
          <div class="slot-meta">Shift ${meta.shiftNumber||'—'}</div>
          <div class="slot-date">${dateStr}</div>
          <div class="slot-buttons">
            ${inGame?`<button class="slot-btn slot-save-btn" data-slot="${slot}">Save Here</button>`:''}
            <button class="slot-btn slot-load-btn" data-slot="${slot}">Load</button>
          </div>`;
      } else {
        card.innerHTML=`<div class="slot-num">Slot ${slot}</div>
          <div class="slot-empty">— Empty —</div>
          ${inGame?`<button class="slot-btn slot-save-btn" data-slot="${slot}">Save Here</button>`:''}`;
      }
      container.appendChild(card);
    });

    container.querySelectorAll('.slot-save-btn').forEach(btn=>{
      btn.onclick=async()=>{
        if (!state) return;
        const slot=parseInt(btn.dataset.slot);
        const rankLabel=getCurrentRank()?.label||'';
        let res;
        try { res = await window.electronAPI.saveSlot(slot, {...state, rankLabel}); }
        catch(err) { res = { success:false, error: err && err.message }; }
        if (!res || !res.success) {
          Toast.saveFailed(res && res.error);
          btn.textContent='Failed'; btn.disabled=false;
          setTimeout(()=>{ btn.textContent='Save Here'; },1800);
          return;
        }
        btn.textContent='Saved ✓'; btn.disabled=true;
        setTimeout(()=>refreshIngameSlots(),600);
      };
    });
    container.querySelectorAll('.slot-load-btn').forEach(btn=>{
      btn.onclick=async()=>{
        if (!confirm('Load this save? Current progress will be lost.')) return;
        const slot=parseInt(btn.dataset.slot);
        const save=await window.electronAPI.loadSlot(slot);
        if (!save) return;
        state=migrateState(save);
        hideModal('modal-save-load');
        if (state.phase==='academy') resumeAcademy();
        else resumeShift();
      };
    });
  }

  async function initLoadGameScreen() {
    showScreen('screen-load-game');
    el('back-from-load').onclick=initMenu;
    const grid=el('load-slots-grid'); if (!grid) return;
    grid.innerHTML='<div style="color:var(--text-dim);padding:20px">Loading…</div>';
    const slots=await window.electronAPI.listSlots();
    renderSlotCards(grid, slots, false);
  }

  // ===== SORENSEN DEBRIEF (EMS calls) =====
  function showSorensenDebrief(outcomeKey, callName, callback) {
    if (state.track !== 'ems') { callback(); return; }
    const options=SORENSEN_DEBRIEF[outcomeKey]||SORENSEN_DEBRIEF.success;
    const pick=options[Math.floor(Math.random()*options.length)];
    el('sorensen-debrief-title').textContent=`After: ${callName}`;
    el('sorensen-debrief-speech').textContent=pick.text;
    const choicesEl=el('sorensen-debrief-choices'); choicesEl.innerHTML='';
    const btn=document.createElement('button'); btn.className='menu-btn primary';
    btn.textContent='Acknowledged. ›';
    btn.onclick=()=>{
      applyStats(pick.effect||{});
      const sorensen=state.roster.find(r=>r.id==='sorensen');
      if (sorensen) sorensen.bond=Math.min(100,sorensen.bond+(pick.bondDelta||0));
      // Hospital rapport
      const hospEvent=EMS_HOSPITAL_EVENTS[outcomeKey];
      if (hospEvent) {
        state.hospitalRapport=Math.max(0,Math.min(100,(state.hospitalRapport||50)+hospEvent.rapportDelta));
        renderHospitalRapport();
      }
      renderHUD('shift-hud-stats');
      addToLog(`Sorensen debrief: ${pick.text.slice(0,60)}…`, outcomeKey==='failure'?'negative':'positive');
      saveGame(); hideModal('modal-sorensen-debrief'); callback();
    };
    choicesEl.appendChild(btn);
    showModal('modal-sorensen-debrief');
  }

  // ===== SAVE / LOAD =====
  // Most call sites fire this without awaiting, so a failure has to announce
  // itself rather than being returned to a caller that ignores it.
  async function saveGame() {
    if (!state) return { success: false, error: 'no career loaded' };
    let res;
    try {
      res = await window.electronAPI.saveGame(state);
    } catch (err) {
      res = { success: false, error: err && err.message };
    }
    if (!res || !res.success) Toast.saveFailed(res && res.error);
    return res || { success: false };
  }

  // ===== APP SETTINGS (volume/mute — persist independently of career saves) =====
  async function loadAppSettings() {
    let settings;
    try { settings = await window.electronAPI.loadSettings(); }
    catch(e) { settings = { volume: 70, muted: false }; }
    Sound.setVolume(settings.volume ?? 70);
    Sound.setMuted(!!settings.muted);
    const muteBtn = el('btn-mute');
    if (muteBtn) {
      muteBtn.textContent = Sound.isMuted() ? '🔇' : '🔊';
      muteBtn.classList.toggle('muted', Sound.isMuted());
    }
  }
  // Settings are written to disk on a trailing debounce. Dragging the volume
  // slider fires `input` continuously, and writing settings.json on every event
  // meant one disk write per pixel of travel. Discrete changes (the mute button,
  // the mute checkbox) pass immediate:true so they land straight away, and any
  // pending write is flushed before the window goes away so a change made in the
  // last quarter-second is never lost.
  let _settingsTimer = null;
  function writeAppSettings() {
    _settingsTimer = null;
    Promise.resolve(window.electronAPI.saveSettings({
      volume: Sound.getVolume(),
      muted: Sound.isMuted(),
    })).then(res => {
      if (!res || res.success === false) {
        Toast.show('Settings not saved',
          `Your audio settings will reset next launch${res && res.error ? ' — ' + res.error : ''}.`,
          'warning');
      }
    }).catch(() => {
      Toast.show('Settings not saved', 'Your audio settings will reset next launch.', 'warning');
    });
  }
  function persistAppSettings(opts) {
    if (_settingsTimer) { clearTimeout(_settingsTimer); _settingsTimer = null; }
    if (opts && opts.immediate) { writeAppSettings(); return; }
    _settingsTimer = setTimeout(writeAppSettings, 300);
  }
  function flushAppSettings() {
    if (_settingsTimer) { clearTimeout(_settingsTimer); writeAppSettings(); }
  }
  window.addEventListener('beforeunload', flushAppSettings);
  // beforeunload does not fire reliably when the window is closed via the custom
  // titlebar, so catch the tab going away as well.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushAppSettings();
  });

  async function initSettingsAndCredits() {
    const versionEls = document.querySelectorAll('.app-version-display');
    try {
      const v = await window.electronAPI.getAppVersion();
      versionEls.forEach(elx => elx.textContent = `v${v}`);
    } catch(e) { /* non-fatal — version display is cosmetic */ }

    const btnSettings = el('btn-settings');
    if (btnSettings) btnSettings.onclick = () => {
      const slider = el('settings-volume-slider');
      const val = el('settings-volume-val');
      const muteChk = el('settings-mute-checkbox');
      if (slider) slider.value = Sound.getVolume();
      if (val) val.textContent = Sound.getVolume();
      if (muteChk) muteChk.checked = Sound.isMuted();
      showModal('modal-settings');
    };
    el('close-settings')?.addEventListener('click', () => hideModal('modal-settings'));
    el('settings-volume-slider')?.addEventListener('input', (e) => {
      const v = Number(e.target.value);
      Sound.setVolume(v);
      const val = el('settings-volume-val'); if (val) val.textContent = v;
      persistAppSettings();
    });
    el('settings-mute-checkbox')?.addEventListener('change', (e) => {
      Sound.setMuted(e.target.checked);
      const muteBtn = el('btn-mute');
      if (muteBtn) { muteBtn.textContent = Sound.isMuted()?'🔇':'🔊'; muteBtn.classList.toggle('muted', Sound.isMuted()); }
      persistAppSettings({ immediate: true });
    });

    const btnCredits = el('btn-credits');
    if (btnCredits) btnCredits.onclick = () => showModal('modal-credits');
    el('close-credits')?.addEventListener('click', () => hideModal('modal-credits'));
  }

  // ===== BOOT =====
  async function init() {
    await loadAppSettings();
    await initMenu();
    initSettingsAndCredits();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', ()=>Game.init());
