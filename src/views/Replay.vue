<script setup lang="ts">
import { ref } from "vue";
import { toPng } from "html-to-image";
import { getBeatmapv1, getPlayer, getReplayInfo } from "../api";
import { BeatmapScoreObject, v1BeatmapObject, Player } from "../types/osuApi";
import { notify } from "../plugins/notification";

const replayInfo = ref<BeatmapScoreObject>();
const beatmapInfo = ref<v1BeatmapObject>()
const playerInfo = ref<Player>();
const thumbnail = ref<HTMLElement>();
const liveplay = ref(false);

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
  const dataUrl = await toPng(thumbnail.value!);
  
  var mods = replayInfo.value?.score.mods.join("");
  if (mods) mods += " ";
  var pp = replayInfo.value?.score.pp ? `${parseInt(replayInfo.value.score.pp)}pp` : 'Loved';
  var accuracy = (replayInfo.value!.score.accuracy * 100).toFixed(2);
  var descText = `
${liveplay.value ? `[Liveplay] ` : ''}${playerInfo.value?.username} - ${beatmapInfo.value?.title} [${beatmapInfo.value?.version}] ${accuracy}% ${mods}${replayInfo.value?.score.max_combo}x ${pp}

Oyuncu: https://osu.ppy.sh/users/${playerInfo.value?.id}
Beatmap: https://osu.ppy.sh/beatmapsets/${beatmapInfo.value?.beatmapset_id}#osu/${beatmapInfo.value?.beatmapset_id}
Skin: 
`

  await window.fs.downloadThumbnail({ dataUrl, descText });
  notify("Saved thumbnail and description")
}
const getImageUrl = (name: string) => {
  return import.meta.env.DEV ? `/modIcons/${name}.png` : `./modIcons/${name}.png`
}
</script>

<template>
  <div id="Replay" class="flex flex-col gap-2 items-center w-full h-full">
    <div class="flex w-full" style="max-width: 1280px;" >
      <div class="flex font-semibold mr-auto">
        <label class="flex items-center gap-1" for="liveplay">
          <input v-model="liveplay" type="checkbox" class="checkbox" id="liveplay">
          Liveplay
        </label>
      </div>
      <div class="flex gap-2">
        <button class="button" @click="prepareReplay"> Select Replay File </button>
        <button class="button" @click="downloadThumbnail"> Download Thumbnail </button>
      </div>
    </div>

    <div v-if="replayInfo" ref="thumbnail" class="thumbnail">
      
      <div class="flex flex-1 items-end w-11/12">
        <img v-if="liveplay" class="absolute h-24 w-24" src="../assets/twitchIcon.svg">
        <div class="flex flex-1 justify-end -my-2 -mr-12">
          <div class="stat-wrapper mr-10">
            <p class="text-3xl ml-4">Acc</p>
            <p class="text-7xl"> {{ (replayInfo.score.accuracy * 100).toFixed(2) }} </p>
          </div>
          <div class="stat-wrapper">
            <p class="text-3xl ml-4">Combo</p>
            <p class="text-7xl"> {{ replayInfo.score.max_combo }} </p>
          </div>
          <div class="stat-wrapper">
            <p class="text-3xl ml-4">PP</p>
            <p class="text-7xl"> {{ replayInfo.score.pp ? parseInt(replayInfo.score.pp) : 'Loved' }} </p>
          </div>
        </div>
      </div>

      <div class="cover my-1 relative">
        <p class="absolute z-20 title"> {{ beatmapInfo?.title }} </p>
        <div class="absolute z-10 inset-0 bg-black bg-opacity-80" />
        <img 
          :src="`https://assets.ppy.sh/beatmaps/${beatmapInfo?.beatmapset_id}/covers/cover.jpg`"
          class="absolute object-cover w-full h-full inset-0"
        >
      </div>

      <div class="flex flex-1 items-center gap-10 w-11/12">
        <img class="w-24 h-24 rounded-lg object-cover" :src="playerInfo?.avatar_url">
        <p class="text-6xl"> {{ playerInfo?.username }} </p>
        <div class="flex flex-1 items-center justify-end">
          <template v-for="mod in replayInfo?.score.mods">
            <img class="max-h-28 h-full" :src="getImageUrl(mod)" >
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
