export interface replayData {
  timeSinceLastAction: number
  x: number
  y: number
  keyPressedBitwise: number
  keysPressed: {
    K1: boolean
    K2: boolean
    M1: boolean
    M2: boolean
  };
}

export interface replayObject {
  gameMode: number
  gameVersion: number
  beatmapMD5: string
  playerName: string
  number_300s: number
  number_100s: number
  number_50s: number
  gekis: number
  katus: number
  misses: number
  score: number
  max_combo: number
  perfect_combo: number
  mods: number
  life_bar: string
  timestamp: string
  replay_length: number
  replay_data: replayData[]
  raw_replay_data: string
}

export interface tokens {
  access_token: string
  refresh_token: string
}

export interface replay {
  read: () => replayObject
}

export interface irc {
  code: (callback: (code: string) => void) => void
  message: (callback: (message: string) => void) => void
}

export interface fs {
  downloadThumbnail: (content: {dataUrl: string, descText: string}) => Promise<void>
}

export interface titleBar {
  event: (event: "minimize" | "maximize" | "close") => void
}

declare global {
  interface Window {
    replay: replay
    irc: irc
    fs: fs
    titleBar: titleBar
  }
}
