import { BrowserWindow } from "electron";

export function loadWindow(window: BrowserWindow) {
  process.env.DEV ? 
  window.loadURL("http://localhost:3000") : 
  window.loadFile("./index.html")
}