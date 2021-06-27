const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  protocol,
} = require("electron");
const path = require("path");
const osureplayparser = require("osureplayparser");
const axios = require("axios");

require("dotenv").config();

axios.defaults.baseURL = "https://osu.ppy.sh/api/v2";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

let axiosAuth = axios.create({
  baseURL: "https://osu.ppy.sh"
})

function readReplay(path) {
  return osureplayparser.parseReplay(path);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false
    },
  });

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("version", app.getVersion())
  })

  if (process.env.DEV) {
    mainWindow.loadURL("http://localhost:8080/");
  } else {
    mainWindow.loadFile(`${__dirname}../../dist/index.html`);
  }
  mainWindow.maximize();
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

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
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "osuthumbnail://auth",
      })
      .then((resp) => {
        mainWindow.webContents.send("accessToken", resp.data);
      })
      .catch((err) => console.log(err.response.data));
  });

  ipcMain.on("sendRefreshToken", (event, refreshToken) => {
    axiosAuth
      .post("/oauth/token", {
        client_id: 8137,
        client_secret: process.env.CLIENT_SECRET,
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

  ipcMain.on("readReplay", (event) => {
    dialog
      .showOpenDialog({
        title: "Replay File",
        filters: [
          {
            name: "Replay File",
            extensions: ["osr"],
          },
        ],
        properties: ["openFile"],
      })
      .then((ReplayFile) => {
        if (ReplayFile.canceled) {
          return;
        }
        var path = ReplayFile.filePaths[0];
        event.reply("replay", readReplay(path));
      });
  });
});

app.on("activate", function() {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});
