<template>
  <div id="nav">
    <div class="buttons">
      <router-link to="/">Replay</router-link>
      <router-link to="/vs">Vs</router-link>
      <router-link to="/knockout">Knockout</router-link>
      <LoginButton />
    </div>
  </div>
  <router-view/>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue"
import axios from 'axios'

export default {
  name: "App",
  mounted() {
    axios.defaults.baseURL = "https://osu.ppy.sh/api/v2"

    window.app.version(version => console.log(version))
  },
  components: {
    LoginButton
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0px;

  width: 100%;
  max-width: 100%;

  height: 100%;
  max-height: 100%;

  box-sizing: border-box;  
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

#nav {
  padding: 10px;
}

a, button {
  padding: 15px 10px 15px 10px;
  margin: 5px;

  color: white;

  border: none;
  border-radius: 5px;
  background-color: #181818;
  box-sizing: border-box;
  text-decoration: none;

  /* flex stuff */
  flex-grow: 1;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
}
</style>
