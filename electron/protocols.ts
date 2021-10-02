import { BrowserWindow, protocol } from "electron";
import { loadWindow } from "./utils";

export function registerProtocols(window: BrowserWindow) {
  protocol.registerHttpProtocol("osuthumbnail", async (request) => {
    loadWindow(window);

    let url = new URL(request.url);
    let args = new URLSearchParams(url.search);
    let code = args.get("code");
    
    if (!code) return;

    window.webContents.once("did-finish-load", () => {
      window.webContents.send("code", code);
    })
  })
}