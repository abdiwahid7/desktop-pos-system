/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    dbQuery: (query: string, params?: any[]) => Promise<any[]>;
    dbRun: (query: string, params?: any[]) => Promise<{ id: number; changes: number }>;
    dbGet: (query: string, params?: any[]) => Promise<any>;
    onMenuAction: (callback: (event: any, action: string) => void) => void;
    removeMenuActionListener: () => void;
    platform: string;
    getVersion: () => Promise<string>;
  };
}