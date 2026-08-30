// ===== HUD RENDERING =====
// DEAD CODE — confirmed by import-graph check (2026-08-14 adoption audit) that
// nothing imports this file. HUD rendering lives inline in game.js (renderHUD()
// and friends) instead. Safe to delete — flagged rather than deleted because
// this sandbox's filesystem mount doesn't permit deleting files in this project
// folder; delete it yourself locally, or ask Claude again once approvals work.
import { STAT_COLORS } from '../engine/career.js';

let getState;
const el = id => document.getElementById(id);
const STAT_ORDER = ['physical', 'knowledge', 'morale', 'reputation', 'leadership', 'command'];
const STAT_LABELS = { physical:'PHYS', knowledge:'KNOW', morale:'MORAL', reputation:'REP', leadership:'LEAD', command:'CMD' };

export function initHUD(deps) {
  getState = deps.getState;
}

export function renderHUD(hudId) {
  const state = getState(); if (!state) return;
  const hud = el(hudId); if (!hud) return;
  hud.innerHTML = '';
  for (const key of STAT_ORDER) {
    const val = state.stats[key], color = STAT_COLORS[key];
    const div = document.createElement('div');
    div.className = `hud-stat stat-${key}`;
    div.innerHTML = `<span class="hud-stat-name">${STAT_LABELS[key]}</span>
      <div class="hud-stat-bar-wrap"><div class="hud-stat-bar" style="width:${val}%;background:${color}"></div></div>
      <span class="hud-stat-val" style="color:${color}">${val}</span>`;
    hud.appendChild(div);
  }
  renderWhitfieldTrust();
  renderHospitalRapport();
}

export function renderWhitfieldTrust() {
  const state = getState();
  const bar = el('whitfield-trust-bar'), val = el('whitfield-trust-val');
  if (!bar) return;
  const bt = state ? (state.whitfieldTrust || 50) : 50;
  bar.style.width = bt + '%';
  bar.style.background = bt < 30 ? '#ef4444' : bt > 80 ? '#22c55e' : '#f59e0b';
  if (val) val.textContent = bt;
}

export function renderHospitalRapport() {
  const state = getState();
  const bar = el('rapport-bar-inner'), val = el('rapport-val');
  const wrap = el('hospital-rapport-bar');
  if (!wrap) return;
  if (!state || state.track !== 'ems' || state.rankIndex < 2) { wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  const r = state.hospitalRapport ?? 50;
  if (bar) { bar.style.width = r + '%'; bar.style.background = r < 30 ? '#ef4444' : r > 70 ? '#3b82f6' : '#60a5fa'; }
  if (val) val.textContent = r;
}

export function changeWhitfieldTrust(delta) {
  const state = getState(); if (!state) return;
  state.whitfieldTrust = Math.max(0, Math.min(100, (state.whitfieldTrust || 50) + delta));
  renderWhitfieldTrust();
}

export function applyStats(changes) {
  const state = getState(); if (!state) return {};
  const deltas = {};
  for (const [key, delta] of Object.entries(changes)) {
    if (!(key in state.stats)) continue;
    const before = state.stats[key];
    state.stats[key] = Math.max(0, Math.min(100, state.stats[key] + delta));
    const actual = state.stats[key] - before;
    if (actual !== 0) deltas[key] = actual;
  }
  for (const [k, v] of Object.entries(deltas)) {
    if (!state.statDeltas) state.statDeltas = {};
    state.statDeltas[k] = (state.statDeltas[k] || 0) + v;
  }
  return deltas;
}

export function formatDeltas(deltas) {
  return Object.entries(deltas).filter(([, v]) => v !== 0)
    .map(([k, v]) => `<span class="${v > 0 ? 'stat-up' : 'stat-down'}">${v > 0 ? '+' : ''}${v} ${k.charAt(0).toUpperCase() + k.slice(1)}</span>`)
    .join('  ');
}
