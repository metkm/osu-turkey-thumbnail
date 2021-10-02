import { app, BrowserWindow } from "electron";

async function main() {
  await app.whenReady();
  const window = new BrowserWindow({
    minWidth: 800,
    minHeight: 800,
    autoHideMenuBar: true,
    title: "osu! Turkey Thumbnail"
  })

  process.env.DEV ? 
  window.loadURL("http://localhost:3000") : 
  window.loadFile("./index.html")

}

main();
