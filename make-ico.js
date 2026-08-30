// Generates a valid .ico file from our badge PNG data
// ICO format: header + directory + image data (BMP or PNG)
const fs = require('fs');
const path = require('path');

// Read our PNG
const pngData = fs.readFileSync(path.join(__dirname, 'build', 'icon.png'));
const pngSize = pngData.length;

// ICO file format:
// - ICONDIR header: 6 bytes (reserved=0, type=1, count=1)
// - ICONDIRENTRY: 16 bytes per image
//   - width (1 byte, 0=256)
//   - height (1 byte, 0=256)
//   - colorCount (1 byte, 0=no palette)
//   - reserved (1 byte, 0)
//   - planes (2 bytes, 1)
//   - bitCount (2 bytes, 32)
//   - bytesInRes (4 bytes)
//   - imageOffset (4 bytes, = 6 + 16 = 22)
// - Image data (PNG bytes)

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);   // reserved
header.writeUInt16LE(1, 2);   // type = 1 (ICO)
header.writeUInt16LE(1, 4);   // count = 1

const entry = Buffer.alloc(16);
entry[0] = 0;    // width = 256
entry[1] = 0;    // height = 256
entry[2] = 0;    // color count
entry[3] = 0;    // reserved
entry.writeUInt16LE(1, 4);    // planes
entry.writeUInt16LE(32, 6);   // bit count
entry.writeUInt32LE(pngSize, 8);  // bytes in res
entry.writeUInt32LE(22, 12);  // image offset = 6 + 16

const ico = Buffer.concat([header, entry, pngData]);
const outPath = path.join(__dirname, 'build', 'icon.ico');
fs.writeFileSync(outPath, ico);
console.log('ICO created:', outPath, ico.length, 'bytes');
