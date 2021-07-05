const { ipcMain, dialog } = require("electron");
const osureplayparser = require("osureplayparser");
const { readdirSync, lstatSync } = require("fs");

function readReplay(path) {
  return osureplayparser.parseReplay(path);
}

function registerReplay(browserWindow) {
  ipcMain.on("readReplay", () => {
    replayFile = dialog.showOpenDialogSync({
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
    replayFolderPath = dialog.showOpenDialogSync({
      title: "Replay Folder",
      properties: ["openDirectory"],
    })[0];
    

    folderContents = readdirSync(replayFolderPath);

    var replayContents = []
    folderContents.forEach(file => {
      var filePath = `${replayFolderPath}\\${file}`

      if (!lstatSync(filePath).isFile() && !filePath.endsWith(".osr")) {
        return
      }

      replayContent = readReplay(filePath)
      replayContents.push(replayContent["playerName"])
    })
    browserWindow.webContents.send("replayFiles", replayContents)
  });
}

function registerEvents(browserWindow) {
  registerReplay(browserWindow);
}

exports.registerEvents = registerEvents;
