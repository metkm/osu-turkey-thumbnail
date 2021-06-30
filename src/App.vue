<template>
  <Navbar />
  <router-view/>

  <Notification />
</template>

<script>

import Notification from "@/components/Notification.vue";
import Navbar from "@/components/Nav.vue";
import axios from 'axios';

export default {
  name: "App",
  mounted() {
    axios.defaults.baseURL = "https://osu.ppy.sh/api/v2";

    if(this.$store.getters.isLogged) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.getters.getTokens.accessToken}`;
      axios.get("/me")
      .catch(() => this.$store.dispatch("refreshTokens"))
    }
    
    window.app.message(message => console.log(message));
  },
  components: {
    Notification,
    Navbar
  }
}
</script>

<style>
:root {
  --red-button: #ff3a3b
}
html, body {
  margin: 0;
  padding: 0px;

  width: 100%;
  max-width: 100%;

  height: 100%;
  max-height: 100%;

  box-sizing: border-box;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100%;
  max-height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
}
</style>
