import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  fetchCatFact: (callback: (data: string) => void) =>
    ipcRenderer.on("fetch-cat-fact", (_event, value) => callback(value)),
  catFact: (value: string) => ipcRenderer.send("cat-fact", value),
  notificationFrequency: (value: string) =>
    ipcRenderer.send("set-notification-frequency", value),
});
