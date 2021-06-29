<template>
  <div id="nav">
    <div class="buttons">
      <router-link to="/">Replay</router-link>
      <router-link to="/vs">Vs</router-link>
      <router-link to="/knockout">Knockout</router-link>
      <LoginButton />
      <LogoutButton />
    </div>
  </div>
  <router-view/>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue"
import LogoutButton from "@/components/LogoutButton.vue"
import axios from 'axios'

export default {
  name: "App",
  mounted() {
    axios.defaults.baseURL = "https://osu.ppy.sh/api/v2";
    axios.defaults.headers.common["Authorization"] = `Bearer ${this.$store.getters.getTokens.accessToken}`

    axios.interceptors.response.use(response => response, (error) => {
      if (error.response.status == 401) {
        console.log("response returned: ", error.response.status)
        this.$store.dispatch("refreshTokens");
      }
    })
    
    window.app.message(message => console.log(message));
  },
  components: {
    LoginButton,
    LogoutButton
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
