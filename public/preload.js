const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Database operations
  dbQuery: (query, params) => ipcRenderer.invoke('db-query', query, params),
  dbRun: (query, params) => ipcRenderer.invoke('db-run', query, params),
  dbGet: (query, params) => ipcRenderer.invoke('db-get', query, params),
  
  // Menu actions
  onMenuAction: (callback) => ipcRenderer.on('menu-action', callback),
  removeMenuActionListener: () => ipcRenderer.removeAllListeners('menu-action'),
  
  // System info
  platform: process.platform,
  
  // App info
  getVersion: () => ipcRenderer.invoke('get-version')
});

// Remove the loading text
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});