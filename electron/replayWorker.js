const replayParser = require("osureplayparser");
const { parentPort } = require("worker_threads");
const { readdirSync, lstatSync } = require("fs");

parentPort.on("message", data => {
  const files = readdirSync(data.fullPath);

  var replayContents = []
  files.forEach(file => {
    var filePath = `${data.fullPath}\\${file}`;
    if (!lstatSync(filePath).isFile() && !filePath.endsWith(".osr")) return;

    var replayContent = replayParser.parseReplay(filePath);
    replayContents.push(replayContent["playerName"]);
  })

  parentPort.postMessage(replayContents)
})
