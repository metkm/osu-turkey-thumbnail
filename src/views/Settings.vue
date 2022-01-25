<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const sepValue = ref(store.state.seperator);

const setSeperator = ({ target }: Event) => {
  const inputElement = target as HTMLInputElement;
  store.dispatch("setSeperator", inputElement.value);
}
</script>

<template>
  <div id="Settings" class="p-2">
    <div class="flex gap-2 items-center">
      <p class="font-semibold">Seperator</p>
      <input v-model="sepValue" @input="setSeperator" type="text" class="bg-gray-800 p-2 rounded-lg">
    </div>
  </div>
</template>
