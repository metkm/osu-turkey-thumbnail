<template>
  <div id="nav">
    <div class="buttons">
      <router-link @click="activeBtn = 'btn1'" :class="{buttonActive: activeBtn == 'btn1'}" class="link" to="/">Replay</router-link>
      <router-link @click="activeBtn = 'btn2'" :class="{buttonActive: activeBtn == 'btn2'}" class="link" to="/vs">Vs</router-link>
      <router-link @click="activeBtn = 'btn3'" :class="{buttonActive: activeBtn == 'btn3'}" class="link" to="/knockout">Knockout</router-link>
      <LoginButton />
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";

export default {
  name: "Navbar",
  data() {
    return {
      activeBtn: ""
    }
  },
  components: {
    LoginButton,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.link {
  margin: 5px;
  padding: 5px 5px 5px 8px;
  /* background-color: #353535; */
  color: black;

  border: 2px solid black;
  box-sizing: border-box;

  display: flex;
  align-items: flex-end;

  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  
  /* flex stuff */
  flex: 1 0 20%;

  transition-duration: 500ms;
}
.buttonActive {
  background-color: var(--red-button);
  color: white;
}

#nav {
  padding: 10px;
}
</style>