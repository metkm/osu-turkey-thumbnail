<template>
  <button v-if="$store.getters.isLogged" v-on:click="logout" class="logout">Logout</button>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$store.dispatch("clearTokens")
    }
  }
}
</script>

<style>
.logout {
  background-color: #ff3a3b;
}
</style>