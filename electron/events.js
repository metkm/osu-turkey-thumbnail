const { ipcMain, dialog } = require("electron");
const { readReplay, readReplays } = require("./replay");

function registerReplay(browserWindow) {
  ipcMain.on("readReplay", () => {
    var replayFile = dialog.showOpenDialogSync({
      title: "Replay File",
      filters: [{ name: "Replay File", extensions: ["osr"] }],
      properties: ["openFile"],
    });

    if (!replayFile) {
      return;
    }

    var path = replayFile[0];
    var replay = readReplay(path);

    browserWindow.webContents.send("replayFile", replay);
  });

  ipcMain.on("readReplaysFolder", () => {
    var replayFolderPath = dialog.showOpenDialogSync({
      title: "Replay Folder",
      properties: ["openDirectory"],
    })[0];
    
    readReplays(replayFolderPath).then(replayContents => {
      browserWindow.webContents.send("replayFiles", replayContents);
    })
  });
}

function registerEvents(browserWindow) {
  registerReplay(browserWindow);
}

exports.registerEvents = registerEvents;
