import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const electronAPI = {
  ipcRenderer: {
    sendMessage(channel: string, value: string) {
      ipcRenderer.send(channel, value);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
  },
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);

export type ElectronAPI = typeof electronAPI;
