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
  <transition name="update">
    <div class="absolute bottom-0 inset-x-0 p-4 flex items-center gap-4" v-if="updateDownloaded">
      <div class="button w-1/2" @click="updateApp">
        Update now
      </div>
    </div>
  </transition>
</template>

<style>
.update-enter-active, .update-leave-active {
  transition: all 500ms ease;
}
.update-enter-from, .update-leave-to {
  transform: translateY(100%);
}
</style>
