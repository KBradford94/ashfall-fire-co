// ===== SCREEN RENDERING HELPERS =====
import { NEIGHBORHOODS, CALL_NEIGHBORHOOD_BIAS } from '../data/roster.js';

export function buildAshfallMap(callTypeId) {
  const nh = NEIGHBORHOODS;
  const biasKey = CALL_NEIGHBORHOOD_BIAS[callTypeId] || 'wicker_park';
  const biasNh = nh[biasKey];
  const dotX = biasNh ? biasNh.x + biasNh.w / 2 : 130;
  const dotY = biasNh ? biasNh.y + biasNh.h / 2 : 200;
  let rects = '', labels = '';
  for (const [key, n] of Object.entries(nh)) {
    const isActive = key === biasKey;
    const fill = isActive ? 'rgba(200,40,30,0.18)' : '#192033';
    const stroke = isActive ? '#c8281e' : '#2a3550';
    rects += `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" fill="${fill}" stroke="${stroke}" stroke-width="1" rx="2"/>`;
    const lx = n.x + n.w / 2, ly = n.y + n.h / 2 + (n.h < 44 ? 4 : 0);
    const col = isActive ? '#e8edf8' : '#8fa3c8', fw = isActive ? '700' : '400';
    const words = n.label.split(' ');
    if (words.length === 1) {
      labels += `<text x="${lx}" y="${ly}" font-size="7" fill="${col}" font-weight="${fw}" text-anchor="middle" font-family="Segoe UI">${n.label}</text>`;
    } else {
      const mid = Math.ceil(words.length / 2);
      labels += `<text x="${lx}" y="${ly - 4}" font-size="7" fill="${col}" font-weight="${fw}" text-anchor="middle" font-family="Segoe UI">${words.slice(0, mid).join(' ')}</text>`;
      labels += `<text x="${lx}" y="${ly + 5}" font-size="7" fill="${col}" font-weight="${fw}" text-anchor="middle" font-family="Segoe UI">${words.slice(mid).join(' ')}</text>`;
    }
  }
  return `<svg viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg" width="190" height="150" preserveAspectRatio="xMidYMid meet" style="display:block;border-radius:4px">
    <rect width="300" height="360" fill="#080c18"/>
    <path d="M228,0 L300,0 L300,360 L248,360 L228,300 Z" fill="#0d1f3c" opacity="0.7"/>
    <text x="264" y="180" font-size="8" fill="#1a3a5c" font-weight="700" text-anchor="middle" transform="rotate(-90,264,180)" font-family="Segoe UI">LAKE ASHFALL</text>
    <path d="M40,158 L100,155 L130,145 L170,145 L200,135 L230,132" stroke="#0d2440" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M40,158 L100,155 L130,145 L170,145 L200,135 L230,132" stroke="#1a3a5c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${rects}${labels}
    <circle class="incident-ring" cx="${dotX}" cy="${dotY}" r="8" fill="none" stroke="#c8281e" stroke-width="2" opacity="0.8"/>
    <circle class="incident-dot" cx="${dotX}" cy="${dotY}" r="6" fill="#c8281e"/>
    <circle cx="${dotX}" cy="${dotY}" r="3" fill="#fff" opacity="0.9"/>
    <text x="12" y="18" font-size="9" fill="#4a5a7a" font-weight="700" font-family="Segoe UI">N ↑</text>
  </svg>`;
}

export function buildPortraitSVG(initials, borderColor, size = 60) {
  const r = size / 2 - 3;
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#192033" stroke="${borderColor}" stroke-width="3"/>
    <text x="${size / 2}" y="${size / 2 + 6}" font-size="${size * 0.28}" font-weight="700" fill="${borderColor}" text-anchor="middle" font-family="Segoe UI">${initials}</text>
  </svg>`;
}

export function generateFireParticles() {
  const container = document.getElementById('fire-particles');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `position:absolute;bottom:0;left:${Math.random() * 100}%;width:${2 + Math.random() * 3}px;height:${6 + Math.random() * 14}px;background:linear-gradient(to top,#c8281e,#f59e0b,transparent);border-radius:50% 50% 0 0;opacity:${0.3 + Math.random() * 0.5};animation:spark-rise ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite;`;
    container.appendChild(spark);
  }
  if (!document.getElementById('spark-style')) {
    const s = document.createElement('style'); s.id = 'spark-style';
    s.textContent = '@keyframes spark-rise{0%{transform:translateY(0) scaleX(1);opacity:.6;}70%{opacity:.3;}100%{transform:translateY(-120px) scaleX(0.3);opacity:0;}}';
    document.head.appendChild(s);
  }
}
