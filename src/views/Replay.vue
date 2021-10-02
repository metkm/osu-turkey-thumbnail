<script setup lang="ts">
import { ref } from "vue";
import { toPng } from "html-to-image";
import { getBeatmapv1, getPlayer, getReplayInfo } from "../api";
import { BeatmapScoreObject, v1BeatmapObject, Player } from "../types/osuApi";

const replayInfo = ref<BeatmapScoreObject>();
const beatmapInfo = ref<v1BeatmapObject>()
const playerInfo = ref<Player>();
const thumbnail = ref<HTMLElement>();

const prepareReplay = async () => {
  const replay = await window.replay.read();
  if (!replay) return;

  const [beatmap, player] = await Promise.all([
    getBeatmapv1(replay.beatmapMD5), getPlayer(replay.playerName)
  ])

  beatmapInfo.value = beatmap;
  playerInfo.value = player;
  replayInfo.value = await getReplayInfo(beatmap.beatmap_id, player.id);
}
const downloadThumbnail = async () => {
  const dataUrl = await toPng(thumbnail.value!, {
    width: 1366,
    height: 768,
  });

  var a = document.createElement("a");
  a.href = dataUrl;
  a.download = "thumbnail.png";
  a.click();
}
</script>

<template>
  <div id="Replay" class="flex flex-col gap-2 items-center w-full h-full">
    <div class="flex gap-2" >
      <button class="button" @click="prepareReplay"> Select Replay File </button>
      <button class="button" @click="downloadThumbnail"> Download Thumbnail </button>
    </div>
    <div id="thumbnail" ref="thumbnail" class="thumbnail relative bg-white">
      <!-- metadata -->
      <div class="gap-8 flex flex-1 justify-end items-end w-6/7" v-if="replayInfo">
        <div class="stat-container mr-10">
          <p class="stat">Acc</p>
          <p class="value"> {{ (replayInfo.score.accuracy * 100).toFixed(2) }} </p>
        </div>
        <div class="stat-container">
          <p class="stat">Combo</p>
          <p class="value"> {{ replayInfo.score.max_combo }} </p>
        </div>
        <div class="stat-container">
          <p class="stat">Acc</p>
          <p class="value"> {{ replayInfo.score.pp ? parseInt(replayInfo.score.pp) : 'Loved' }} </p>
        </div>
      </div>
      <!-- metadata -->

      <!-- cover -->
      <div class="cover relative flex justify-center items-center">
        <p class="absolute text-8xl text-white z-10"> {{ beatmapInfo?.title }} </p>
        <div class="absolute w-full h-full bg-black bg-opacity-80" />
        <img 
          :src="`https://assets.ppy.sh/beatmaps/${beatmapInfo?.beatmapset_id}/covers/cover.jpg`"
          class="w-full h-full object-cover">
      </div>
      <!-- cover -->

      <!-- bottom -->
      <div class="flex flex-1 items-center justify-start w-6/7">
        <img class="w-24 h-24 rounded-lg object-cover" :src="playerInfo?.avatar_url">
        <p class="text-6xl ml-5"> {{ playerInfo?.username }} </p>
        <div>
          {{ replayInfo?.score.mods }}
        </div>
      </div>
      <!-- bottom -->
    </div>
  </div>
</template>
