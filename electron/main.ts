import { app, BrowserWindow } from "electron";
import { registerEvents } from "./events";
import { registerProtocols } from "./protocols";
import { loadWindow } from "./utils";

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

  loadWindow(window);
  registerEvents();
  registerProtocols(window);
}

main();
