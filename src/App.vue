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
input, button {
  outline: none;
}
body::-webkit-scrollbar {
  display: none;
}
img {
  object-fit: cover;
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
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: 5px;

  overflow: hidden;
}
.settings {
  display: flex;
  margin: 5px;

  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
}
</style>
