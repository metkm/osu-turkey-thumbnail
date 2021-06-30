const { contextBridge, ipcRenderer, nativeImage } = require("electron");
const { writeFile, accessSync, mkdirSync } = require("fs");

function getMetadata(score) {
  var accuracy = score.accuracy * 100;
  accuracy = accuracy.toFixed(2);

  return {
    accuracyValue: accuracy,
    ppValue: parseInt(score.pp),
    comboValue: score.max_combo
  }
}

contextBridge.exposeInMainWorld("app", {
  message: callback => {
    ipcRenderer.on("message", (event, args) => callback(args))
  },
})

contextBridge.exposeInMainWorld("replay", {
  sendReplayRequest: () => {
    ipcRenderer.send("readReplay");
  },
  receiveReplayRequest: (callback) => {
    ipcRenderer.once("replay", (_, replay) => callback(replay))
  }
});

contextBridge.exposeInMainWorld("tokens", {
  receiveToken: (callback) => {
    ipcRenderer.once("accessToken", (_, tokens) => callback(tokens))
  },
  sendRefreshToken: (refreshToken) => {
    ipcRenderer.send("sendRefreshToken", refreshToken);
  },
  receiveNewTokens: (callback) => {
    ipcRenderer.once("refreshToken", (_, tokens) => callback(tokens))
  }
})

contextBridge.exposeInMainWorld("fs", {
  downFromDataUrl: (dataUrl) => {
    var nativeImg = nativeImage.createFromDataURL(dataUrl);
    var pngBuffer = nativeImg.toPNG();

    try {
      accessSync('./output');
    } catch (err) {
      mkdirSync("./output")
    }

    writeFile("./output/Thumbnail.png", pngBuffer, err => {});
  },
  writeDesc: (beatmapInfo, replayInfo, player) => {
    var score = replayInfo.score;
    var { accuracyValue, ppValue, comboValue } = getMetadata(score);
    var modsString = "";
    score.mods.forEach(mod => modsString += mod);

    try {
      accessSync('./output');
    } catch (err) {
      mkdirSync("./output")
    }

    writeFile("./output/text.txt", `
# Baslik
${player.username} - ${beatmapInfo.title} [${beatmapInfo.version}] ${accuracyValue}% ${modsString ? modsString : ''} ${comboValue}x ${ppValue}pp

# Aciklama
Oyuncu: https://osu.ppy.sh/users/${player.id}
Beatmap: https://osu.ppy.sh/beatmapsets/${beatmapInfo.beatmapset_id}#osu/${beatmapInfo.beatmap_id}
Skin: 
    `, err => {})
  }
})

contextBridge.exposeInMainWorld("update", {
  update: callback => {
    ipcRenderer.on("notification", (event, message) => callback(message))
  },
})
