<script setup lang="ts">
import { ref } from "vue";
const updateDownloaded = ref(false);

window.irc.updateDownloaded(() => {
  updateDownloaded.value = true;
})

const updateApp = () => {
  window.irc.updateApp();
}
</script>

<template>
  <div class="absolute bottom-0 inset-x-0 p-4 flex items-center gap-4">
    <div class="button w-1/2" @click="updateApp">
      Update Now
    </div>
    <p class="font-semibold"> Update downloaded. </p>
  </div>
</template>
