import osuReplayParser from "osureplayparser";
import { dialog, ipcMain } from "electron";

export function registerEvents() {
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
}