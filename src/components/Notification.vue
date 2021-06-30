<template>
  <div class="notification" style="transform: translateY(200px);">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  name: "Notification",
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
        targets: ".notification",
        translateY: 0,
        easing: "easeOutExpo",
        complete: () => {
          setTimeout(() => {
            anime({
              targets: ".notification",
              translateY: 200,
              easing: "easeOutExpo"
            });
          }, 5000);
        },
      });
    },
  },
};
</script>

<style>
.notification {
  position: fixed;
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 5px;
  z-index: 4;

  width: 300px;

  background-color: #181818;
  color: white;
}
</style>
