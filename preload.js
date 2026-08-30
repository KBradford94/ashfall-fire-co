const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Autosave (slot 0 = career.json)
  saveGame:   (data)        => ipcRenderer.invoke('save-game', data),
  loadGame:   ()            => ipcRenderer.invoke('load-game'),
  deleteSave: ()            => ipcRenderer.invoke('delete-save'),
  // Manual save slots (1-3)
  saveSlot:   (slot, data)  => ipcRenderer.invoke('save-slot',  { slot, data }),
  loadSlot:   (slot)        => ipcRenderer.invoke('load-slot',  { slot }),
  listSlots:  ()            => ipcRenderer.invoke('list-slots'),
  // App settings (volume/mute) — persisted independently of career saves
  loadSettings: ()          => ipcRenderer.invoke('load-settings'),
  saveSettings: (settings)  => ipcRenderer.invoke('save-settings', settings),
  getAppVersion: ()         => ipcRenderer.invoke('get-app-version'),
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow:    () => ipcRenderer.send('window-close'),
});
