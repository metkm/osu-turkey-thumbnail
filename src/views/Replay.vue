<script setup lang="ts">
import { ref } from "vue";
import { toPng } from "html-to-image";
import { getBeatmapv1, getPlayer, getReplayInfo, parseMods } from "../api";
import { BeatmapScoreObject, v1BeatmapObject, Player } from "../types/osuApi";
import { notify } from "../plugins/notification";
import { replayObject } from "../types/general";
import { useStore } from "vuex";

const store = useStore();
const replayFile = ref<replayObject>();
const replayInfo = ref<BeatmapScoreObject>();
const beatmapInfo = ref<v1BeatmapObject>()
const playerInfo = ref<Player>();
const thumbnail = ref<HTMLElement>();
const liveplay = ref(false);

const baseUrl = import.meta.env.BASE_URL

const prepareReplay = async () => {
  replayFile.value = await window.replay.read();
  if (!replayFile.value) return;

  [beatmapInfo.value, playerInfo.value] = await Promise.all([
    getBeatmapv1(replayFile.value.beatmapMD5), getPlayer(replayFile.value.playerName)
  ])

  try {
    replayInfo.value = await getReplayInfo(beatmapInfo.value.beatmap_id, playerInfo.value.id);
  } catch {
    notify("Can't get user replay info from the beatmap. Falling back to replayFile info");
  }
}

const downloadThumbnail = async () => {
  const dataUrl = await toPng(thumbnail.value!);

  var mods = parseMods(replayFile.value!.mods).join("");
  if (mods) mods += " ";

  var pp = replayInfo.value?.score.pp ? `${parseInt(replayInfo.value.score.pp)}pp` : 'Loved';
  var accuracy = replayInfo.value?.score.accuracy ? (replayInfo.value!.score.accuracy * 100).toFixed(2) : "null";
  var lp = liveplay.value ? `[Liveplay] ` : '';

  var comb = replayFile.value?.max_combo != beatmapInfo.value?.max_combo ? `${replayFile.value?.max_combo}/${beatmapInfo.value?.max_combo}x` : `FC`;

  var descText = `
${lp}${playerInfo.value?.username} ${store.state.separator} ${beatmapInfo.value?.title} [${beatmapInfo.value?.version}] ${accuracy}% ${mods}${comb} ${pp}

Oyuncu: https://osu.ppy.sh/users/${playerInfo.value?.id}
Beatmap: https://osu.ppy.sh/beatmapsets/${beatmapInfo.value?.beatmapset_id}#osu/${beatmapInfo.value?.beatmapset_id}
Skin: 

Playlerinizin kanala atılmasını istiyorsanız: https://forms.gle/Emy3cj8AivSkJRF47
Lütfen her playinizi değil, atmaya değer olan playlerinizi atın.`;

  await window.fs.downloadThumbnail({ dataUrl, descText });
  notify("Saved thumbnail and description")
}

</script>

<template>
  <div id="Replay" class="flex flex-col gap-2 items-center w-full h-full">
    <div class="flex w-full" style="max-width: 1280px;">
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

    <div ref="thumbnail" class="thumbnail">
      <img v-if="beatmapInfo?.mode == 1" :src="`${baseUrl}gamemodes/taiko.png`" class="mode" />
      <img v-if="beatmapInfo?.mode == 2" :src="`${baseUrl}gamemodes/ctb.png`" class="mode" />
      <img v-if="beatmapInfo?.mode == 3" :src="`${baseUrl}gamemodes/mania.png`" class="mode" />
      
      <div class="flex flex-1 items-end w-11/12">
        <img v-if="liveplay" class="absolute h-24 w-24" src="../assets/twitchIcon.svg">
        <div class="flex flex-1 justify-end -my-2 -mr-12">
          <div class="stat-wrapper mr-10">
            <p class="text-3xl ml-4">Acc</p>
            <p class="text-7xl" contenteditable="true"> {{
              replayInfo ? (replayInfo.score.accuracy * 100).toFixed(2) :
                "null"
            }} </p>
          </div>
          <div class="stat-wrapper">
            <p class="text-3xl ml-4">Combo</p>
            <p class="text-7xl" :style="{ color: replayFile?.max_combo == beatmapInfo?.max_combo ? '#FF3A3B' : 'black' }"
              contenteditable="true"> {{ replayFile?.max_combo }} </p>
          </div>
          <div class="stat-wrapper">
            <p class="text-3xl ml-4">PP</p>
            <p class="text-7xl" contenteditable="true"> {{
              replayInfo?.score.pp ? parseInt(replayInfo.score.pp) :
              "Loved"
            }} </p>
          </div>
        </div>
      </div>

      <div class="cover my-1 relative">
        <p class="absolute z-20 inset-0 flex items-center justify-center p-10 title"> {{ beatmapInfo?.title }} </p>
        <div class="absolute z-10 inset-0 bg-black bg-opacity-80" />
        <img :src="`https://assets.ppy.sh/beatmaps/${beatmapInfo?.beatmapset_id}/covers/cover.jpg`"
          class="absolute object-cover w-full h-full inset-0">
      </div>

      <div class="flex flex-1 items-center gap-10 w-11/12">
        <img class="w-24 h-24 rounded-lg object-cover" :src="playerInfo?.avatar_url">
        <p class="text-6xl"> {{ playerInfo?.username }} </p>
        <div class="flex flex-1 items-center justify-end">
          <template v-for="mod in replayInfo?.score.mods">
            <img class="max-h-28 h-full" :src="`${baseUrl}modIcons/${mod}.png`">
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
