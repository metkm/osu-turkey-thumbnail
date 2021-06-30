<template>
  <div class="UpdateNotification" style="transform: translateY(200px);">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "UpdateNotification",
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    window.update.update((messageFromElectron) => {
      this.message = messageFromElectron;
      this.startAnimation();
    });
  },
  methods: {
    startAnimation() {
      anime({
        targets: ".UpdateNotification",
        translateY: 0,
        complete: () => {
          setTimeout(() => {
            anime({
              targets: ".UpdateNotification",
              translateY: 200
            });
          }, 3000);
        },
      });
    },
  },
};
</script>

<style>
.UpdateNotification {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  z-index: 4;

  width: 300px;

  background-color: #181818;
  color: white;
}
</style>
