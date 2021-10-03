import { app, BrowserWindow } from "electron";
import { registerEvents } from "./events";
import { registerProtocols } from "./protocols";
import { loadWindow } from "./utils";
import { autoUpdater } from "electron-updater";

async function main() {
  await app.whenReady();
  const window = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    autoHideMenuBar: true,
    title: "osu! Turkey Thumbnail",
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
      webSecurity: false
    }
  })

  window.webContents.once("did-finish-load", () => {
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.once("update-available", (updateInfo) => {
      window.webContents.send("message", `Update available. Starting to download version: ${updateInfo.version}`);
    })
    autoUpdater.once("update-downloaded", () => {
      window.webContents.send("message", "Update Downloaded. Will be installed on quit.")
    })
  })

  loadWindow(window);
  registerEvents();
  registerProtocols(window);
}

main();
