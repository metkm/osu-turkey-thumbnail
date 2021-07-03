const { contextBridge, ipcRenderer, nativeImage } = require("electron");
const { writeFile, accessSync, mkdirSync } = require("fs");

contextBridge.exposeInMainWorld("app", {
  message: callback => {
    ipcRenderer.on("message", (event, args) => callback(args))
  },
})

contextBridge.exposeInMainWorld("replay", {
  sendReplayRequest: () => {
    ipcRenderer.send("readReplay");
  },
  receiveReplayRequest: (callback) => {
    ipcRenderer.once("replay", (_, replay) => callback(replay))
  }
});

contextBridge.exposeInMainWorld("tokens", {
  receiveToken: (callback) => {
    ipcRenderer.once("accessToken", (_, tokens) => callback(tokens))
  },
  sendRefreshToken: (refreshToken) => {
    ipcRenderer.send("sendRefreshToken", refreshToken);
  },
  receiveNewTokens: (callback) => {
    ipcRenderer.once("refreshToken", (_, tokens) => callback(tokens))
  }
})

contextBridge.exposeInMainWorld("fs", {
  downFromDataUrl: (dataUrl) => {
    var nativeImg = nativeImage.createFromDataURL(dataUrl);
    var pngBuffer = nativeImg.toPNG();

    try {
      accessSync('./output');
    } catch (err) {
      mkdirSync("./output")
    }

    writeFile("./output/Thumbnail.png", pngBuffer, err => {});
  },
  writeDesc: (text) => {
    try {
      accessSync("./output");
    } catch {
      mkdirSync("./output");
    }

    writeFile("./output/text.txt", text, err => {})
  }
})

contextBridge.exposeInMainWorld("update", {
  update: callback => {
    ipcRenderer.on("notification", (event, message) => callback(message))
  },
})
