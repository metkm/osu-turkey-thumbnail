const { contextBridge, ipcRenderer } = require("electron");
const html2canvas = require("html2canvas");

contextBridge.exposeInMainWorld("app", {
  version: callback => {
    ipcRenderer.once("version", (event, args) => callback(args))
  }
})

contextBridge.exposeInMainWorld("replay", {
  sendReplayRequest: () => {
    ipcRenderer.send("readReplay");
  },
  receiveReplayRequest: (callback) => {
    ipcRenderer.once("replay", (_, replay) => callback(replay))
  }
});

contextBridge.exposeInMainWorld("htmlToCanvas", {
  downloadCanvas: () => {
    html2canvas(document.getElementById("thumbnail"), {
      allowTaint : true })
    .then(canvas => {
      var base64image = canvas.toDataURL("image/png");

      var aelement = document.createElement("a");
      aelement.download = "Thumbnail.png";
      aelement.href = base64image;
      aelement.click();

      delete aelement
    })
  }
})

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
