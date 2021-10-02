<script setup lang="ts">
const readReplay = async () => {
  const replay = await window.replay.read();
  if (!replay) return;

  console.log(replay)
}
</script>

<template>
  <div id="Replay">
    <div class="flex gap-2" >
      <button class="button" @click="readReplay"> Select Replay File </button>
      <button class="button"> Download Thumbnail </button>
    </div>
    <div id="thumbnail">

    </div>
  </div>
</template>
