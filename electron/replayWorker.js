const replayParser = require("osureplayparser");
const { parentPort } = require("worker_threads");
const { readdirSync, lstatSync } = require("fs");

parentPort.on("message", data => {

  /**
   * @type {Array}
   */
  const files = readdirSync(data.path);

  let replayContents = [];
  files.forEach(file => {
    let fullPath = `${data.path}\\${file}`;

    if (!lstatSync(fullPath).isFile() && !fullPath.endsWith(".osr")) {
      return
    }

    let replayContent = replayParser.parseReplay(fullPath);
    replayContents.push(replayContent["playerName"]);
  });

  parentPort.postMessage(replayContents);
  process.exit();
})
