<script setup lang="ts">
import { events } from "./notification";
import { ref } from "vue";

const notifications = ref<{ message: string }[]>([])

events.on("notify", (content: string) => {
  notifications.value.push({ message: content });

  setTimeout(() => {
    let index = notifications.value.findIndex(val => val.message == content);
    notifications.value.splice(index, 1);
  }, 5000)
})

window.irc.message((message) => events.emit("notify", message))
</script>

<template>
  <transition-group tag="div" class="absolute bottom-5 flex flex-col gap-2" name="notif" appear>
    <template v-for="(notification, index) in notifications" :key="index">
      <div class="bg-gray-800 flex items-center border-l-4 border-green-600 rounded p-2 font-semibold h-14 w-96">
        <p>{{ notification.message }}</p>
      </div>
    </template>
  </transition-group>
</template>

<style>
.notif-enter-active, .notif-move {
  transition: all 500ms ease;
}
.notif-leave-active {
  transition: all 500ms ease;
  position: absolute;
}
.notif-enter-from {
  transform: translateY(400%);
}
.notif-leave-to {
  transform: translateY(400%);
}
</style>
