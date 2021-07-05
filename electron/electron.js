const { app, BrowserWindow, ipcMain, protocol } = require("electron");
const { autoUpdater } = require("electron-updater");
const { registerEvents } = require("./events");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

axios.defaults.baseURL = "https://osu.ppy.sh/api/v2";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

const clientSecret = process.env.CLIENT_SECRET
// process.env.CLIENT_SECRET

let axiosAuth = axios.create({
  baseURL: "https://osu.ppy.sh",
});


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("message", app.getVersion());
  })

  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on("update-available", () => {
    mainWindow.webContents.send("notification", "Update found. Downloading...")
  })

  autoUpdater.on("update-downloaded", () => {
    mainWindow.webContents.send("notification", "Update downloaded. Will be installed on app quit.")
  })

  if (process.env.DEV) {
    mainWindow.loadURL("http://localhost:8080/");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(`${__dirname}../../dist/index.html`);
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();
  registerEvents(mainWindow)

  protocol.registerHttpProtocol("osuthumbnail", (request) => {
    if (process.env.DEV) {
      mainWindow.loadURL("http://localhost:8080/");
    } else {
      mainWindow.loadFile(`${__dirname}../../dist/index.html`);
    }

    var url = new URL(request.url);
    var args = new URLSearchParams(url.search);
    var code = args.get("code");
    
    if (!code) {
      return;
    }

    // auth
    axiosAuth
      .post("/oauth/token", {
        client_id: 8137,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "osuthumbnail://auth",
      })
      .then((resp) => {
        mainWindow.webContents.send("accessToken", resp.data);
      })
      .catch((err) => mainWindow.webContents.send("message", err.response.data));
  });

  ipcMain.on("sendRefreshToken", (event, refreshToken) => {
    axiosAuth
      .post("/oauth/token", {
        client_id: 8137,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      })
      .then((response) => {
        mainWindow.webContents.send("refreshToken", response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  });
});

app.on("activate", function() {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});
