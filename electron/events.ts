import osuReplayParser from "osureplayparser";
import { BrowserWindow, dialog, ipcMain, nativeImage } from "electron";
import { writeFile } from "fs";

const window = BrowserWindow.getFocusedWindow()!;

ipcMain.handle("readReplay", () => {
  let replayFile = dialog.showOpenDialogSync({
    title: "Replay File",
    filters: [{ name: "Replay File", extensions: ["osr"] }],
    properties: ["openFile"],
  });

  if (!replayFile) return;
  let replayPath = replayFile[0];

  return osuReplayParser.parseReplay(replayPath);
})

ipcMain.handle("downloadThumbnail", (event, args) => {
  var paths = dialog.showOpenDialogSync({
    title: "Save thumbnail file",
    properties: ["openDirectory"]
  });

  if (!paths) return;
  var path = paths[0];

  var nativeImg = nativeImage.createFromDataURL(args.dataUrl);
  var pngBuffer = nativeImg.toPNG();

  writeFile(`${path}\\thumbnail.png`, pngBuffer, () => {});
  writeFile(`${path}\\desc.txt`, args.descText, () => {});
})

ipcMain.on("minimize", () => window.minimize());
ipcMain.on("maximize", () => window.isMaximized() ? window.unmaximize() : window.maximize());
ipcMain.on("close", () => window.close());
