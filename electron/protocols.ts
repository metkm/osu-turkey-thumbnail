import { BrowserWindow, protocol } from "electron";
import { loadWindow } from "./utils";

const window = BrowserWindow.getFocusedWindow()!;

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
