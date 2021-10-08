import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("replay", {
  read: async () => {
    const replay = await ipcRenderer.invoke("readReplay");
    return replay;
  }
})

contextBridge.exposeInMainWorld("irc", {
  code: (callback: (code: string) => void) => {
    ipcRenderer.on("code", (_, code) => callback(code));
  },
  message: (callback: (message: string) => void) => {
    ipcRenderer.on("message", (_, message) => callback(message));
  },
  updateDownloaded: (callback: (message: string) => void) => {
    ipcRenderer.on("updateDownloaded", (_, message) => callback(message));
  },
  updateApp: () => {
    ipcRenderer.send("updateApp");
  }
})

contextBridge.exposeInMainWorld("fs", {
  downloadThumbnail: async (content: {dataUrl: string, descText: string}) => {
    await ipcRenderer.invoke("downloadThumbnail", content)
  }
})

contextBridge.exposeInMainWorld("titleBar", {
  event: (event: string) => ipcRenderer.send(event)
})
