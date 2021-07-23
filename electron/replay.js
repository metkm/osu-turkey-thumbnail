const path = require("path");
const replayParser = require("osureplayparser");
const { Worker } = require("worker_threads");
const { readFileSync } = require("fs");

function readReplay(path) {
  return replayParser.parseReplay(path);
}

/**
 * 
 * @param {Array} folderPath
 * 
 * @returns {Promise}
 */
function readReplays(folderPath) {
  return new Promise(resolve => {
    const workerContents = readFileSync(path.resolve(__dirname, "replayWorker.js"), { encoding: "utf-8" });
    const worker = new Worker(workerContents, { eval: true });

    worker.postMessage({
      path: folderPath
    })
    worker.on("message", replayContent => resolve(replayContent));
  })
}

module.exports = {
  readReplay, readReplays
}
