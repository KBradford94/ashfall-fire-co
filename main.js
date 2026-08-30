const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const SAVE_DIR = path.join(app.getPath('userData'), 'saves');
const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');
const DEFAULT_SETTINGS = { volume: 70, muted: false };

// Returns true if the save directory exists (or was created). Never throws —
// an unwritable userData path must degrade to a reported save failure, not an
// unhandled rejection thrown back through the IPC channel.
function ensureSaveDir() {
  try {
    if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR, { recursive: true });
    return true;
  } catch (err) {
    console.error('[save] cannot create save directory:', err.message);
    return false;
  }
}

// Human-readable reason for a failed write, so the renderer can show the player
// something more useful than "save failed".
function describeWriteError(err) {
  switch (err.code) {
    case 'EACCES':
    case 'EPERM':  return 'the save file is read-only or in use by another program';
    case 'ENOSPC': return 'the disk is full';
    case 'EBUSY':  return 'the save file is locked by another program';
    case 'EROFS':  return 'the drive is read-only';
    default:       return err.message;
  }
}

// Writes JSON to disk atomically: serialise, write to a temp file, then rename
// over the target. A crash or a full disk mid-write leaves the previous save
// intact rather than a half-written file. Never throws.
function safeWriteJSON(filePath, data) {
  let json;
  try {
    json = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error(`[save] could not serialise save data:`, err.message);
    return { success: false, error: 'the save data could not be serialised' };
  }
  const tmpPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tmpPath, json);
    fs.renameSync(tmpPath, filePath);
    return { success: true };
  } catch (err) {
    console.error(`[save] failed to write ${filePath}:`, err.message);
    try { if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); } catch (_) {}
    return { success: false, error: describeWriteError(err) };
  }
}

let mainWindow = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 750,
    backgroundColor: '#0a0e1a',
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  win.once('ready-to-show', () => {
    win.show();
    win.maximize();
  });

  win.on('closed', () => { if (mainWindow === win) mainWindow = null; });

  mainWindow = win;
  return win;
}

// Only one copy of the game may run at a time. Two instances would both write
// to the same career.json and the last writer would silently win, destroying a
// career. A second launch focuses the window that is already open instead.
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    ensureSaveDir();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: save game
ipcMain.handle('save-game', async (event, saveData) => {
  if (!ensureSaveDir()) {
    return { success: false, error: 'the save folder could not be created' };
  }
  return safeWriteJSON(path.join(SAVE_DIR, 'career.json'), saveData);
});

// Reads and parses a save file. On corruption, quarantines the bad file to
// <name>.corrupt-<timestamp>.bak (so nothing is silently destroyed) and
// returns null rather than throwing, so the renderer sees "no save" instead
// of crashing the IPC call.
function safeReadSave(filePath) {
  if (!fs.existsSync(filePath)) return null;
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[save] corrupt save file at ${filePath}:`, err.message);
    try {
      const backupPath = `${filePath}.corrupt-${Date.now()}.bak`;
      fs.renameSync(filePath, backupPath);
      console.error(`[save] quarantined corrupt save to ${backupPath}`);
    } catch (renameErr) {
      console.error('[save] failed to quarantine corrupt save:', renameErr.message);
    }
    return null;
  }
}

// IPC: load game
ipcMain.handle('load-game', async () => {
  ensureSaveDir();
  const filePath = path.join(SAVE_DIR, 'career.json');
  return safeReadSave(filePath);
});

// IPC: delete save
ipcMain.handle('delete-save', async () => {
  const filePath = path.join(SAVE_DIR, 'career.json');
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return { success: true };
  } catch (err) {
    console.error('[save] failed to delete save:', err.message);
    return { success: false, error: describeWriteError(err) };
  }
});

// IPC: manual save slots (slot = 1, 2, or 3)
ipcMain.handle('save-slot', async (event, { slot, data }) => {
  if (!ensureSaveDir()) {
    return { success: false, error: 'the save folder could not be created' };
  }
  const filePath = path.join(SAVE_DIR, `career_slot${slot}.json`);
  // Store slim metadata alongside full save
  const meta = {
    name: data.name || 'Unknown',
    rank: data.rankLabel || '',
    track: data.track || 'suppression',
    unit: data.unit || '',
    shiftNumber: data.shiftNumber || 1,
    savedAt: new Date().toISOString(),
  };
  return safeWriteJSON(filePath, { meta, save: data });
});

ipcMain.handle('load-slot', async (event, { slot }) => {
  ensureSaveDir();
  const filePath = path.join(SAVE_DIR, `career_slot${slot}.json`);
  const raw = safeReadSave(filePath);
  if (!raw) return null;
  return raw.save || raw; // supports old format
});

ipcMain.handle('list-slots', async () => {
  ensureSaveDir();
  const slots = [];
  for (let i = 1; i <= 3; i++) {
    const filePath = path.join(SAVE_DIR, `career_slot${i}.json`);
    if (fs.existsSync(filePath)) {
      const raw = safeReadSave(filePath);
      // raw is null when the file was unreadable/corrupt and has been quarantined —
      // keep meta null so the UI correctly treats the slot as empty, not occupied.
      slots.push({ slot: i, meta: raw ? (raw.meta || { name: '—', rank: '—', savedAt: null }) : null });
    } else {
      slots.push({ slot: i, meta: null });
    }
  }
  return slots;
});

// IPC: app-level settings (volume/mute) — separate from career saves so they
// persist independently of whether a career exists yet.
ipcMain.handle('load-settings', async () => {
  if (!fs.existsSync(SETTINGS_PATH)) return { ...DEFAULT_SETTINGS };
  try {
    const raw = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
    return { ...DEFAULT_SETTINGS, ...raw };
  } catch (err) {
    console.error('[settings] corrupt settings.json, using defaults:', err.message);
    return { ...DEFAULT_SETTINGS };
  }
});

ipcMain.handle('save-settings', async (event, settings) => {
  return safeWriteJSON(SETTINGS_PATH, { ...DEFAULT_SETTINGS, ...settings });
});

// IPC: app version, for the settings/credits screen
ipcMain.handle('get-app-version', () => app.getVersion());

// IPC: window controls
ipcMain.on('window-minimize', () => BrowserWindow.getFocusedWindow()?.minimize());
ipcMain.on('window-maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on('window-close', () => BrowserWindow.getFocusedWindow()?.close());
