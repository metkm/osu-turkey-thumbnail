declare module 'osureplayparser' {
  export interface replayData {
    timeSinceLastAction: number,
    x: number,
    y: number,
    keyPressedBitwise: number,
    keysPressed: {
      K1: boolean,
      K2: boolean,
      M1: boolean,
      M2: boolean
    }
  }

  export interface replay {
    gameMode: number,
    gameVersion: number,
    beatmapMD5: string,
    playerName: string,
    number_300s: number,
    number_100s: number,
    number_50s: number,
    gekis: number,
    katus: number,
    misses: number,
    score: number,
    max_combo: number,
    perfect_combo: number,
    mods: number,
    life_bar: string,
    timestamp: string,
    replay_length: number,
    replay_data: replayData[],
    raw_replay_data: string
  }

  declare interface replayParser {
    parseReplay: (path: string) => replay
  }

  declare let parser: replayParser
  export default parser
}