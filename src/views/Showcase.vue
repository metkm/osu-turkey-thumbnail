<script setup lang="ts">
import { toPng } from 'html-to-image';
import { ref } from 'vue';
import { getBeatmapv1, getPlayer } from '../api';
import { replayObject } from '../types/general';
import { Player, v1BeatmapObject } from '../types/osuApi';

const thumbnail = ref<HTMLElement>();
const replayFile = ref<replayObject>();
const beatmapInfo = ref<v1BeatmapObject>();
const playerInfo = ref<Player>();

const prepareReplay = async () => {
  replayFile.value = await window.replay.read();
  if (!replayFile.value) return;

  beatmapInfo.value = await getBeatmapv1(replayFile.value.beatmapMD5);
  playerInfo.value = await getPlayer(beatmapInfo.value.creator);
}

const downloadThumbnail = async () => {
  const dataUrl = await toPng(thumbnail.value!);

  const descText = `
[Mapping Showcase] ${beatmapInfo.value?.artist} - ${beatmapInfo.value?.title} mapped by ${playerInfo.value?.username}

Beatmap: https://osu.ppy.sh/beatmapsets/${beatmapInfo.value?.beatmapset_id}#osu/${beatmapInfo.value?.beatmapset_id}
Mapset by: https://osu.ppy.sh/users/${playerInfo.value?.id}

Skin:`;
  await window.fs.downloadThumbnail({ dataUrl, descText });
}

</script>

<template>
  <div class="flex flex-col w-full h-full items-center gap-2">
    <div class="w-full flex justify-end gap-2" style="max-width: 1280px;">
      <button class="button" @click="prepareReplay">Select Replay File</button>
      <button class="button" @click="downloadThumbnail">Download Thumbnail</button>
    </div>
    <div v-if="playerInfo" ref="thumbnail" class="thumbnail px-0">
      <div class="flex flex-1">
        <div class="flex flex-grow flex-col p-10 justify-between">
          <div>
            <p class="text-7xl">{{ beatmapInfo?.title }}</p>
            <p class="text-4xl ml-2">{{ beatmapInfo?.artist }}</p>
          </div>
          <div>
            <p class="text-4xl m-2">Mapped By</p>
            <div class="flex items-center">
              <img class="w-24 h-24 rounded-lg object-cover" :src="playerInfo?.avatar_url">
              <p class="text-6xl ml-4">{{ playerInfo?.username }}</p>
            </div>
          </div>
        </div>
        <img :src="`https://assets.ppy.sh/beatmaps/${beatmapInfo?.beatmapset_id}/covers/cover@2x.jpg`" class="w-2/6 object-cover" />
      </div>
    </div>
  </div>
</template>
