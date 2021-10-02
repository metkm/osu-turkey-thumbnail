import axios from "axios";
import { v1BeatmapObject, BeatmapScoreObject, Player } from "./types/osuApi";

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
