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
  }
})

contextBridge.exposeInMainWorld("fs", {
  downloadThumbnail: async (content: {dataUrl: string, descText: string}) => {
    await ipcRenderer.invoke("downloadThumbnail", content)
  }
})
