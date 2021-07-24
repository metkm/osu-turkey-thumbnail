const { ipcMain, dialog } = require("electron");
const osureplayparser = require("osureplayparser");
const { Worker } = require("worker_threads");

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
    
    const worker = new Worker(`${__dirname}/replayWorker.js`);
    worker.postMessage({
      fullPath: replayFolderPath
    });
    worker.on("message", result => {
      browserWindow.webContents.send("replayFiles", result)
    })
  });
}

function registerEvents(browserWindow) {
  registerReplay(browserWindow);
}

exports.registerEvents = registerEvents;
