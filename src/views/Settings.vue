<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const sepValue = ref(store.state.separator);

const setSeparator = ({ target }: Event) => {
  const inputElement = target as HTMLInputElement;
  store.dispatch("setSeparator", inputElement.value);
}
</script>

<template>
  <div id="Settings" class="p-2">
    <div class="flex gap-2 items-center">
      <p class="font-semibold">Separator</p>
      <input v-model="sepValue" @input="setSeparator" type="text" class="bg-gray-800 p-2 rounded-lg">
    </div>
  </div>
</template>
