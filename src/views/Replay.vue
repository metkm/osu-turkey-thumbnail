<script setup lang="ts">
import { getBeatmapv1, getPlayer, getReplayInfo } from "../api";
// import { vv1BeatmapObject } from "../types/osuApi";

const prepareReplay = async () => {
  const replay = await window.replay.read();
  if (!replay) return;

  const [beatmap, player] = await Promise.all([
    getBeatmapv1(replay.beatmapMD5), getPlayer(replay.playerName)
  ])

  const replayInfo = await getReplayInfo(beatmap.beatmap_id, player.id);
  console.log(replayInfo);
}
</script>

<template>
  <div id="Replay">
    <div class="flex gap-2" >
      <button class="button" @click="prepareReplay"> Select Replay File </button>
      <button class="button"> Download Thumbnail </button>
    </div>
    <div id="thumbnail">

    </div>
  </div>
</template>
