import { app, BrowserWindow, ipcMain } from "electron";
import { loadWindow } from "./utils";
import { autoUpdater } from "electron-updater";

async function main() {
  await app.whenReady();
  const window = new BrowserWindow({
    minWidth: 1000,
    minHeight: 800,
    autoHideMenuBar: true,
    show: false,
    title: "osu! Turkey Thumbnail",
    titleBarStyle: "hidden",
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
      window.webContents.send("updateDownloaded");
      ipcMain.once("updateApp", () => autoUpdater.quitAndInstall(false, true));
    })
  })

  await loadWindow(window);
  import("./events")
  import("./protocols")
}

main();
