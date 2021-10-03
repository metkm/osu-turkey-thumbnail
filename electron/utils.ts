import { BrowserWindow } from "electron";

export function loadWindow(window: BrowserWindow): Promise<void> {
  return new Promise(resolve => {
    window.once("ready-to-show", () => {
      window.show();
      resolve();
    });

    process.env.DEV ? 
    window.loadURL("http://localhost:3000") : 
    window.loadFile("./index.html")
  })
}