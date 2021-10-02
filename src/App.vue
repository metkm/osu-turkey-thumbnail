<script setup lang="ts">

</script>

<template>
  <div class="flex gap-2">
    <router-link class="link" to="/">
      Replay
    </router-link>
  </div>
  <router-view v-slot="{ Component }" >
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
