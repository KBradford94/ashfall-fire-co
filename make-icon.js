// Generates a 256x256 PNG fire badge icon using only Node.js built-ins
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const W = 256, H = 256;

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  let c = 0xFFFFFFFF;
  for (const b of buf) c = table[(c ^ b) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

// Generate pixel data (RGBA)
const pixels = Buffer.alloc(W * H * 4);

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = a;
}

function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

function fillCircle(cx, cy, r, ro, ri, col, col2) {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (d <= r) {
        // anti-alias at edge
        const aa = Math.max(0, Math.min(1, r - d + 0.5));
        // ring gradient
        const t = Math.max(0, Math.min(1, (d - ri) / Math.max(1, ro - ri)));
        const [r1, g1, b1] = col;
        const [r2, g2, b2] = col2 || col;
        setPixel(x, y, lerp(r1,r2,t), lerp(g1,g2,t), lerp(b1,b2,t), Math.round(255 * aa));
      }
    }
  }
}

function drawRing(cx, cy, inner, outer, col) {
  for (let y = Math.floor(cy - outer); y <= Math.ceil(cy + outer); y++) {
    for (let x = Math.floor(cx - outer); x <= Math.ceil(cx + outer); x++) {
      const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (d >= inner - 0.5 && d <= outer + 0.5) {
        const aa = Math.min(1, Math.min(d - (inner - 1), (outer + 1) - d));
        const a = Math.max(0, Math.min(1, aa));
        const [r, g, b] = col;
        setPixel(x, y, r, g, b, Math.round(255 * a));
      }
    }
  }
}

// Fill background (dark navy)
for (let i = 0; i < W * H; i++) {
  pixels[i*4+3] = 0; // transparent
}

// Main circle background
fillCircle(128, 128, 122, 0, 0, [13, 18, 37], null);

// Gold outer ring
drawRing(128, 128, 112, 122, [245, 158, 11]);

// Red inner ring
drawRing(128, 128, 102, 106, [200, 40, 30]);

// Simple flame shape using ellipses
// Base flame (red)
for (let y = 55; y <= 160; y++) {
  for (let x = 70; x <= 186; x++) {
    const fx = (x - 128) / 58;
    const fy = (y - 107.5) / 52.5;
    const t = (y - 55) / 105;
    const fw = 1 - t * 0.7;
    if (fx * fx + fy * fy <= fw * fw) {
      const flameT = Math.max(0, (y - 55) / 105);
      const r = lerp(255, 200, flameT);
      const g = lerp(120, 40, flameT);
      const b = lerp(0, 30, flameT);
      setPixel(x, y, r, g, b, 230);
    }
  }
}
// Inner flame (amber/gold)
for (let y = 72; y <= 148; y++) {
  for (let x = 88; x <= 168; x++) {
    const fx = (x - 128) / 40;
    const fy = (y - 110) / 38;
    const t = (y - 72) / 76;
    const fw = 1 - t * 0.75;
    if (fx * fx + fy * fy <= fw * fw) {
      const r = lerp(255, 245, t);
      const g = lerp(200, 158, t);
      const b = lerp(0, 11, t);
      setPixel(x, y, r, g, b, 220);
    }
  }
}

// Number "51" using simple pixel font
function drawText51(startX, startY, size, r, g, b) {
  // Simple scalable number drawing using horizontal bars
  const sw = Math.round(size * 0.18);    // stroke width
  const nw = Math.round(size * 0.44);    // number width
  const nh = Math.round(size * 0.72);    // number height

  function bar(x, y, w, h) {
    for (let dy = y; dy < y + h; dy++) for (let dx = x; dx < x + w; dx++) setPixel(dx, dy, r, g, b, 255);
  }

  // "5"
  const sx = startX;
  bar(sx, startY, nw, sw);                         // top
  bar(sx, startY, sw, nh/2+sw/2);                 // left-top
  bar(sx, startY + nh/2 - sw/2, nw, sw);           // middle
  bar(sx + nw - sw, startY + nh/2, sw, nh/2+sw/2); // right-bottom
  bar(sx, startY + nh - sw, nw, sw);               // bottom

  // "1"
  const ox = startX + nw + Math.round(size * 0.1);
  bar(ox + nw/2 - sw/2, startY, sw, nh);           // vertical
  bar(ox + nw/2 - sw*1.5, startY, sw*1.5, sw);     // top-left serif
  bar(ox, startY + nh - sw, nw, sw);               // base
}

drawText51(76, 174, 60, 245, 158, 11);

// Build raw PNG scanlines (no filter byte=0 for each row)
const scanlines = [];
for (let y = 0; y < H; y++) {
  scanlines.push(0); // filter type: None
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    scanlines.push(pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
  }
}

const rawData = Buffer.from(scanlines);
const compressed = zlib.deflateSync(rawData, { level: 6 });

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // RGBA
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

const png = Buffer.concat([
  sig,
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0))
]);

fs.writeFileSync(path.join(__dirname, 'build', 'icon.png'), png);
console.log('Icon PNG generated:', png.length, 'bytes');
