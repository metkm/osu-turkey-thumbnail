import axios from "axios";
import { v1BeatmapObject, BeatmapScoreObject, Player } from "./types/osuApi";

const mods = {
  "NM": 0,
  "NF": 1 << 0,
  "EZ": 1 << 1,
  "HD": 1 << 3,
  "HR": 1 << 4,
  "SD": 1 << 5,
  "DT": 1 << 6,
  "RX": 1 << 7,
  "HT": 1 << 8,
  "NC": 1 << 9,
  "FL": 1 << 10,
  "AP": 1 << 11
}

export async function getBeatmapv1(md5: string): Promise<v1BeatmapObject> {
  return (await axios.get("https://osu.ppy.sh/api/get_beatmaps", {
    params: {
      h: md5,
      k: import.meta.env.VITE_KEY
    }
  })).data[0]
}

export async function getPlayer(playerName: string): Promise<Player> {
  return (await axios.get(`https://osu.ppy.sh/api/v2/users/${playerName}`, {
    params: { key: "username" }
  })).data
}

export async function getReplayInfo(beatmapId: number, playerId: number): Promise<BeatmapScoreObject> {
  return (await axios.get(`https://osu.ppy.sh/api/v2/beatmaps/${beatmapId}/scores/users/${playerId}`)).data;
}

export function parseMods(modsEnum: number): string[] {
  var parsedMods = []
  for (const [mod, num] of Object.entries(mods)) {
    if (num & modsEnum) {
      parsedMods.push(mod);
    }
  }

  return parsedMods;
}
